import { NextResponse } from "next/server";
import { getSql, isDbConfigured } from "@/lib/db";
import { getSessionCustomer } from "@/lib/auth";

export async function GET() {
  const __admin = await getSessionCustomer();
  if (!__admin || __admin.role !== "admin") {
    return NextResponse.json({ ok: false, error: "Not authorized." }, { status: 401 });
  }
  if (!isDbConfigured()) {
    return NextResponse.json({ ok: false, error: "Database not connected." }, { status: 503 });
  }

  const sql = getSql();
  const rows = await sql`SELECT * FROM orders ORDER BY created_at DESC LIMIT 100`;
  return NextResponse.json({ ok: true, orders: rows });
}
