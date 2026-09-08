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
  const rows = await sql`SELECT * FROM orders ORDER BY created_at DESC LIMIT 100`;
  return NextResponse.json({ ok: true, orders: rows });
}
