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
  const admins = await sql`SELECT id, name, email, username, created_at FROM customers WHERE role = 'admin' ORDER BY created_at`;
  return NextResponse.json({ ok: true, admins });
}

export async function POST(request) {
  const admin = await getSessionCustomer();
  if (!admin || admin.role !== "admin") {
    return NextResponse.json({ ok: false, error: "Not authorized." }, { status: 401 });
  }
  if (!isDbConfigured()) {
    return NextResponse.json({ ok: false, error: "Database not connected." }, { status: 503 });
  }

  const body = await request.json().catch(() => ({}));
  const { email } = body;
  if (!email) {
    return NextResponse.json({ ok: false, error: "Enter the email of an existing customer to promote." }, { status: 400 });
  }

  const sql = getSql();
  const [customer] = await sql`SELECT id FROM customers WHERE email = ${email}`;
  if (!customer) {
    return NextResponse.json({ ok: false, error: "No customer account found with this email. They must register first." }, { status: 404 });
  }

  await sql`UPDATE customers SET role = 'admin' WHERE id = ${customer.id}`;
  return NextResponse.json({ ok: true });
}
