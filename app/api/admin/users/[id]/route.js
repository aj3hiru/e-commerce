import { NextResponse } from "next/server";
import { getSql, isDbConfigured } from "@/lib/db";
import { getSessionCustomer } from "@/lib/auth";

export async function DELETE(request, { params }) {
  const admin = await getSessionCustomer();
  if (!admin || admin.role !== "admin") {
    return NextResponse.json({ ok: false, error: "Not authorized." }, { status: 401 });
  }
  if (!isDbConfigured()) {
    return NextResponse.json({ ok: false, error: "Database not connected." }, { status: 503 });
  }

  const { id } = await params;
  const sql = getSql();

  const [{ count }] = await sql`SELECT COUNT(*) AS count FROM customers WHERE role = 'admin'`;
  if (Number(count) <= 1) {
    return NextResponse.json({ ok: false, error: "Can't remove the last admin account." }, { status: 400 });
  }

  await sql`UPDATE customers SET role = 'customer' WHERE id = ${id}`;
  return NextResponse.json({ ok: true });
}
