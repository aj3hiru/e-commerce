import { NextResponse } from "next/server";
import { withTransaction } from "@/lib/db";
import { getSessionCustomer } from "@/lib/auth";

const VALID_METHODS = ["Cash", "Card", "UPI", "Other"];

// Allocates the next order number using the same prefix + running-sequence
// pattern as the original PHP (`ORD-000123`), locked with FOR UPDATE so two
// simultaneous checkouts can never collide on the same number.
async function nextOrderNumber(sql) {
  const [prefixRow] = await sql`SELECT setting_value FROM business_settings WHERE setting_key = 'order_id_prefix' FOR UPDATE`;
  const [seqRow] = await sql`SELECT setting_value FROM business_settings WHERE setting_key = 'order_sequence_next' FOR UPDATE`;
  const prefix = prefixRow?.setting_value || "ORD";
  const next = parseInt(seqRow?.setting_value, 10) || 1;

  if (seqRow) {
    await sql`UPDATE business_settings SET setting_value = ${String(next + 1)} WHERE setting_key = 'order_sequence_next'`;
  } else {
    await sql`INSERT INTO business_settings (setting_key, setting_value) VALUES ('order_sequence_next', ${String(next + 1)})`;
  }
  return `${prefix}-${String(next).padStart(6, "0")}`;
}

export async function POST(request) {
  const admin = await getSessionCustomer();
  if (!admin || admin.role !== "admin") {
    return NextResponse.json({ ok: false, error: "Not authorized." }, { status: 401 });
  }

  const input = await request.json().catch(() => ({}));
  const items = Array.isArray(input.items) ? input.items : [];
  let customerId = parseInt(input.customer_id, 10) || 0;
  let customerName = String(input.customer_name || "").trim();
  let customerPhone = String(input.customer_phone || "").trim();
  const isGuest = !!input.is_guest;
  const promisedDate = input.promised_date || null;
  const couponCode = String(input.coupon_code || "").toUpperCase().trim();

  if (items.length === 0) {
    return NextResponse.json({ ok: false, error: "Cart is empty." }, { status: 400 });
  }

  // Sanitize payment rows (supports split payment across methods).
  const paymentsInput = Array.isArray(input.payments) ? input.payments : [];
  let payments = [];
  for (const p of paymentsInput) {
    const method = VALID_METHODS.includes(p?.method) ? p.method : "Other";
    const amt = Math.round((Number(p?.amount) || 0) * 100) / 100;
    if (amt > 0) payments.push({ method, amount: amt });
  }
  if (payments.length === 0) payments.push({ method: "Cash", amount: 0 });

  try {
    const result = await withTransaction(async (sql) => {
      // Re-fetch authoritative product data — never trust client-sent prices.
      const lineItems = [];
      let subtotal = 0;
      for (const it of items) {
        const pid = parseInt(it?.product_id, 10) || 0;
        const qty = Math.max(1, parseInt(it?.qty, 10) || 1);
        const [product] = await sql`SELECT * FROM products WHERE id = ${pid}`;
        if (!product) continue;

        const mrp = Number(product.mrp) || 0;
        const sp = Number(product.sp) || 0;
        let unitPrice = sp > 0 && sp < mrp ? sp : mrp;

        // Staff on this internal billing screen may manually override the
        // price (negotiated deals, damaged-item discount, etc.) — honored
        // here since this endpoint is only reachable by authenticated staff,
        // unlike the public storefront checkout which never trusts client
        // prices.
        if (it?.price_override !== null && it?.price_override !== undefined && Number(it.price_override) >= 0) {
          unitPrice = Number(it.price_override);
        }

        lineItems.push({ product, qty, unitPrice, lineTotal: unitPrice * qty });
        subtotal += unitPrice * qty;
      }

      if (lineItems.length === 0) {
        throw Object.assign(new Error("No valid products in cart."), { userFacing: true });
      }

      // Coupon validation & discount calculation — server-side, authoritative.
      let discount = 0;
      let coupon = null;
      if (couponCode) {
        const [c] = await sql`SELECT * FROM coupons WHERE code = ${couponCode} AND status = 'active'`;
        if (c && (c.number_of_times === null || c.number_of_times === undefined || Number(c.usage_count) < Number(c.number_of_times))) {
          let eligibleTotal = 0;
          for (const li of lineItems) {
            let matches = false;
            if (c.applies_to === "all") matches = true;
            else if (c.applies_to === "product" && li.product.id === c.product_id) matches = true;
            else if (c.applies_to === "category" && li.product.category_id === c.category_id) matches = true;
            else if (c.applies_to === "subcategory" && li.product.subcategory_id === c.subcategory_id) matches = true;
            if (matches) eligibleTotal += li.lineTotal;
          }
          if (eligibleTotal > 0) {
            discount =
              c.type === "percentage"
                ? eligibleTotal * (Number(c.value) / 100)
                : Math.min(Number(c.value), eligibleTotal);
            if (c.max_discount) discount = Math.min(discount, Number(c.max_discount));
            coupon = c;
          }
        }
      }

      let grandTotal = Math.max(0, subtotal - discount);

      // GST — proportional to whatever discount share landed on each line.
      let totalGst = 0;
      for (const li of lineItems) {
        const discountShare = subtotal > 0 ? discount * (li.lineTotal / subtotal) : 0;
        const taxableValue = Math.max(0, li.lineTotal - discountShare);
        li.gstAmount = taxableValue * ((Number(li.product.gst_rate) || 0) / 100);
        totalGst += li.gstAmount;
      }
      grandTotal += totalGst;

      // Resolve / create the customer.
      if (isGuest) {
        customerId = 0;
        customerName = "Guest";
        customerPhone = "";
      } else if (customerId > 0) {
        const [existing] = await sql`SELECT id, name, phone FROM customers WHERE id = ${customerId}`;
        if (existing) {
          customerName = existing.name;
          customerPhone = customerPhone || existing.phone;
        }
      } else if (customerName !== "") {
        const emailStub = `walkin_${Date.now()}_${Math.floor(Math.random() * 10000)}@pos.local`;
        const [row] = await sql`
          INSERT INTO customers (name, email, phone, password_hash, customer_type, status)
          VALUES (${customerName}, ${emailStub}, ${customerPhone || null}, '', 'offline', 'active')
        `;
        customerId = row.id;
      } else {
        customerName = "Walk-in Customer";
      }

      // How much was actually received right now?
      let paidAmount = payments.reduce((s, p) => s + p.amount, 0);
      paidAmount = Math.min(paidAmount, grandTotal);
      const dueAmount = Math.round((grandTotal - paidAmount) * 100) / 100;
      const paymentStatus = dueAmount > 0.004 ? "Unpaid" : "Paid";

      if (isGuest && dueAmount > 0.004) {
        throw Object.assign(
          new Error("Guest bills must be paid in full. Turn off Guest Bill to record a due amount against a customer."),
          { userFacing: true }
        );
      }
      if (!isGuest && dueAmount > 0.004 && !customerId && !customerName) {
        throw Object.assign(
          new Error("This sale has a due amount — please select an existing customer or enter a walk-in customer name so it can be tracked."),
          { userFacing: true }
        );
      }

      const distinctMethods = [...new Set(payments.map((p) => p.method))];
      const paymentMethod = distinctMethods.length === 1 ? distinctMethods[0] : "Split";

      const orderNumber = await nextOrderNumber(sql);

      const [orderRow] = await sql`
        INSERT INTO orders
          (order_number, customer_id, name, phone, payment_method, subtotal, discount, total, paid_amount, gst_amount,
           payment_status, status, order_type, is_guest, coupon_code, promised_date)
        VALUES
          (${orderNumber}, ${customerId || null}, ${customerName}, ${customerPhone || null}, ${paymentMethod},
           ${subtotal}, ${discount}, ${grandTotal}, ${paidAmount}, ${totalGst},
           ${paymentStatus}, 'delivered', 'offline', ${isGuest ? 1 : 0}, ${coupon ? coupon.code : null}, ${promisedDate})
      `;
      const orderId = orderRow.id;

      for (const p of payments) {
        if (p.amount <= 0) continue;
        await sql`INSERT INTO order_payments (order_id, payment_method, amount) VALUES (${orderId}, ${p.method}, ${p.amount})`;
      }

      for (const li of lineItems) {
        await sql`
          INSERT INTO order_items (order_id, product_id, title, qty, price)
          VALUES (${orderId}, ${li.product.id}, ${li.product.title}, ${li.qty}, ${li.unitPrice})
        `;
        if ((li.product.product_type || "physical") === "physical" && li.product.stock !== null) {
          await sql`UPDATE products SET stock = GREATEST(stock - ${li.qty}, 0) WHERE id = ${li.product.id}`;
        }
      }

      if (dueAmount > 0.004) {
        await sql`
          INSERT INTO credits (order_id, customer_id, customer_name, customer_phone, amount, promised_date, status)
          VALUES (${orderId}, ${customerId || null}, ${customerName}, ${customerPhone || null}, ${dueAmount}, ${promisedDate}, 'pending')
        `;
      }

      if (coupon) {
        await sql`UPDATE coupons SET usage_count = usage_count + 1 WHERE code = ${coupon.code}`;
      }

      await sql`
        INSERT INTO activity_logs (admin_id, admin_name, action, details)
        VALUES (${admin.id}, ${admin.name}, 'POS Sale', ${`${orderNumber} — ₹${grandTotal.toFixed(2)}${dueAmount > 0 ? `, ₹${dueAmount.toFixed(2)} due` : ""} via ${paymentMethod}`})
      `;

      return { orderId, orderNumber, discount, gst: totalGst, due: dueAmount, grandTotal };
    });

    return NextResponse.json({ ok: true, order_id: result.orderId, order_number: result.orderNumber, ...result });
  } catch (err) {
    const message = err?.userFacing ? err.message : `Checkout failed: ${err?.message || err}`;
    return NextResponse.json({ ok: false, error: message }, { status: err?.userFacing ? 400 : 500 });
  }
}
