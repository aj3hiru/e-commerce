import { NextResponse } from "next/server";
import { getSql, isDbConfigured } from "@/lib/db";
import { getSessionCustomer } from "@/lib/auth";

export async function GET(request) {
  const admin = await getSessionCustomer();
  if (!admin || admin.role !== "admin") {
    return NextResponse.json({ ok: false, error: "Not authorized." }, { status: 401 });
  }
  if (!isDbConfigured()) {
    return NextResponse.json({ ok: false, error: "Database not connected." }, { status: 503 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const search = searchParams.get("search");

  const sql = getSql();
  let rows;
  if (status) {
    rows = await sql`SELECT * FROM orders WHERE status = ${status} ORDER BY created_at DESC LIMIT 100`;
  } else if (search) {
    const like = `%${search}%`;
    rows = await sql`
      SELECT * FROM orders
      WHERE order_number LIKE ${like} OR name LIKE ${like} OR phone LIKE ${like}
      ORDER BY created_at DESC LIMIT 100
    `;
  } else {
    rows = await sql`SELECT * FROM orders ORDER BY created_at DESC LIMIT 100`;
  }

  return NextResponse.json({ ok: true, orders: rows });
}
