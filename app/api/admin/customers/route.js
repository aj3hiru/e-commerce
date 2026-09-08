import { NextResponse } from "next/server";
import { getSql, isDbConfigured } from "@/lib/db";
import { getSessionCustomer } from "@/lib/auth";

export async function GET() {
  const admin = await getSessionCustomer();
  if (!admin || admin.role !== "admin") {
    return NextResponse.json({ ok: false, error: "Not authorized." }, { status: 401 });
  }
  if (!isDbConfigured()) {
    return NextResponse.json({ ok: false, error: "Database not connected." }, { status: 503 });
  }

  const sql = getSql();
  const customers = await sql`
    SELECT c.id, c.name, c.email, c.phone, c.username, c.role, c.status, c.created_at,
      (SELECT COUNT(*) FROM orders o WHERE o.customer_id = c.id) AS order_count,
      (SELECT COALESCE(SUM(total), 0) FROM orders o WHERE o.customer_id = c.id) AS total_spent
    FROM customers c
    WHERE c.role != 'admin'
    ORDER BY c.created_at DESC
  `;
  return NextResponse.json({ ok: true, customers });
}
