import { NextResponse } from "next/server";
import { getSql, isDbConfigured } from "@/lib/db";
import { getSessionCustomer } from "@/lib/auth";

function pad(n) {
  return String(n).padStart(2, "0");
}
function toDateStr(d) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
function addDays(d, n) {
  const copy = new Date(d);
  copy.setDate(copy.getDate() + n);
  return copy;
}

function resolveRange(range, fromParam, toParam) {
  const today = new Date();
  const todayStr = toDateStr(today);

  switch (range) {
    case "yesterday": {
      const y = toDateStr(addDays(today, -1));
      return { from: y, to: y, label: "Yesterday" };
    }
    case "7days":
      return { from: toDateStr(addDays(today, -6)), to: todayStr, label: "Last 7 Days" };
    case "this_month": {
      const monthStart = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-01`;
      return { from: monthStart, to: todayStr, label: "This Month" };
    }
    case "prev_month": {
      const prevMonthDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const prevMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
      return {
        from: toDateStr(prevMonthDate),
        to: toDateStr(prevMonthEnd),
        label: "Previous Month",
      };
    }
    case "custom": {
      let from = fromParam || todayStr;
      let to = toParam || todayStr;
      if (new Date(to) < new Date(from)) [from, to] = [to, from];
      return { from, to, label: `${from} – ${to}` };
    }
    case "today":
    default:
      return { from: todayStr, to: todayStr, label: "Today" };
  }
}

export async function GET(request) {
  const admin = await getSessionCustomer();
  if (!admin || admin.role !== "admin") {
    return NextResponse.json({ ok: false, error: "Not authorized." }, { status: 401 });
  }
  if (!isDbConfigured()) {
    return NextResponse.json({ ok: false, error: "Database not connected." }, { status: 503 });
  }

  const { searchParams } = new URL(request.url);
  const range = searchParams.get("range") || "today";
  const { from, to, label } = resolveRange(range, searchParams.get("from"), searchParams.get("to"));
  const rangeStart = `${from} 00:00:00`;
  const rangeEnd = `${to} 23:59:59`;

  const sql = getSql();

  const [totalRow] = await sql`SELECT COUNT(*) AS c FROM orders WHERE created_at BETWEEN ${rangeStart} AND ${rangeEnd}`;
  const [placedRow] = await sql`SELECT COUNT(*) AS c FROM orders WHERE status='placed' AND created_at BETWEEN ${rangeStart} AND ${rangeEnd}`;
  const [packedRow] = await sql`SELECT COUNT(*) AS c FROM orders WHERE status='packed' AND created_at BETWEEN ${rangeStart} AND ${rangeEnd}`;
  const [shippedRow] = await sql`SELECT COUNT(*) AS c FROM orders WHERE status='shipped' AND created_at BETWEEN ${rangeStart} AND ${rangeEnd}`;
  const [deliveredRow] = await sql`SELECT COUNT(*) AS c FROM orders WHERE status='delivered' AND created_at BETWEEN ${rangeStart} AND ${rangeEnd}`;
  const [cancelledRow] = await sql`SELECT COUNT(*) AS c FROM orders WHERE status='cancelled' AND created_at BETWEEN ${rangeStart} AND ${rangeEnd}`;

  const [earningRow] = await sql`SELECT COALESCE(SUM(total),0) AS s FROM orders WHERE status != 'cancelled' AND created_at BETWEEN ${rangeStart} AND ${rangeEnd}`;
  const [cashRow] = await sql`SELECT COALESCE(SUM(total),0) AS s FROM orders WHERE payment_method='cod' AND created_at BETWEEN ${rangeStart} AND ${rangeEnd}`;
  const [upiRow] = await sql`SELECT COALESCE(SUM(total),0) AS s FROM orders WHERE payment_method='upi' AND created_at BETWEEN ${rangeStart} AND ${rangeEnd}`;
  const [cardRow] = await sql`SELECT COALESCE(SUM(total),0) AS s FROM orders WHERE payment_method='card' AND created_at BETWEEN ${rangeStart} AND ${rangeEnd}`;

  const [productsRow] = await sql`SELECT COUNT(*) AS c FROM products`;
  const [outOfStockRow] = await sql`SELECT COUNT(*) AS c FROM products WHERE stock <= 0`;
  const [categoriesRow] = await sql`SELECT COUNT(*) AS c FROM categories`;
  const [customersRow] = await sql`SELECT COUNT(*) AS c FROM customers WHERE role != 'admin'`;

  const recentOrders = await sql`
    SELECT * FROM orders WHERE created_at BETWEEN ${rangeStart} AND ${rangeEnd}
    ORDER BY created_at DESC LIMIT 8
  `;

  return NextResponse.json({
    ok: true,
    range,
    rangeLabel: label,
    from,
    to,
    orders: {
      total: Number(totalRow.c),
      placed: Number(placedRow.c),
      packed: Number(packedRow.c),
      shipped: Number(shippedRow.c),
      delivered: Number(deliveredRow.c),
      cancelled: Number(cancelledRow.c),
    },
    earning: Number(earningRow.s),
    payments: {
      cash: Number(cashRow.s),
      upi: Number(upiRow.s),
      card: Number(cardRow.s),
    },
    overview: {
      totalProducts: Number(productsRow.c),
      outOfStock: Number(outOfStockRow.c),
      totalCategories: Number(categoriesRow.c),
      totalCustomers: Number(customersRow.c),
    },
    recentOrders,
  });
}
