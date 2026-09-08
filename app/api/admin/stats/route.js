import { NextResponse } from "next/server";
import { getSql, isDbConfigured } from "@/lib/db";
import { isAdminSession } from "@/lib/auth";

export async function GET() {
  if (!(await isAdminSession())) {
    return NextResponse.json({ ok: false, error: "Not authorized." }, { status: 401 });
  }
  if (!isDbConfigured()) {
    return NextResponse.json({ ok: false, error: "Database not connected." }, { status: 503 });
  }

  const sql = getSql();
  const [productCount] = await sql`SELECT COUNT(*)::int AS count FROM products`;
  const [orderCount] = await sql`SELECT COUNT(*)::int AS count FROM orders`;
  const [customerCount] = await sql`SELECT COUNT(*)::int AS count FROM customers`;
  const [revenue] = await sql`SELECT COALESCE(SUM(total), 0) AS total FROM orders`;
  const recentOrders = await sql`SELECT * FROM orders ORDER BY created_at DESC LIMIT 5`;

  return NextResponse.json({
    ok: true,
    products: productCount.count,
    orders: orderCount.count,
    customers: customerCount.count,
    revenue: Number(revenue.total),
    recentOrders,
  });
}
