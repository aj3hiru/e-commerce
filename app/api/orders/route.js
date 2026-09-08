import { NextResponse } from "next/server";
import { getSql, isDbConfigured } from "@/lib/db";
import { getSessionCustomerId } from "@/lib/auth";

function generateOrderNumber() {
  return "CMR" + Math.floor(100000 + Math.random() * 900000);
}

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { items, address, payment, subtotal, delivery, total } = body;

  if (!items || items.length === 0) {
    return NextResponse.json({ ok: false, error: "Cart is empty." }, { status: 400 });
  }
  if (!address?.name || !address?.phone || !address?.line || !address?.city || !address?.pincode) {
    return NextResponse.json({ ok: false, error: "Delivery address is incomplete." }, { status: 400 });
  }

  const orderNumber = generateOrderNumber();

  if (!isDbConfigured()) {
    // Graceful fallback so checkout still works before a database is connected.
    return NextResponse.json({ ok: true, orderNumber, persisted: false });
  }

  const sql = getSql();

  try {
    const customerId = await getSessionCustomerId();

    const [order] = await sql`
      INSERT INTO orders
        (order_number, customer_id, name, phone, address, city, pincode, payment_method, subtotal, delivery_fee, total)
      VALUES
        (${orderNumber}, ${customerId}, ${address.name}, ${address.phone}, ${address.line}, ${address.city},
         ${address.pincode}, ${payment}, ${subtotal}, ${delivery}, ${total})
    `;

    for (const item of items) {
      await sql`
        INSERT INTO order_items (order_id, product_id, title, qty, price)
        VALUES (${order.id}, NULL, ${item.title}, ${item.qty}, ${item.sp})
      `;
    }

    return NextResponse.json({ ok: true, orderNumber, persisted: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err.message || err) }, { status: 500 });
  }
}
