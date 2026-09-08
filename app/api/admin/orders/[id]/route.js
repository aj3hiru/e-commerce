import { NextResponse } from "next/server";
import { getSql, isDbConfigured } from "@/lib/db";
import { isAdminSession } from "@/lib/auth";

export async function GET(request, { params }) {
  if (!(await isAdminSession())) {
    return NextResponse.json({ ok: false, error: "Not authorized." }, { status: 401 });
  }
  const { id } = await params;
  const sql = getSql();
  const [order] = await sql`SELECT * FROM orders WHERE id = ${id}`;
  if (!order) return NextResponse.json({ ok: false, error: "Order not found." }, { status: 404 });
  const items = await sql`SELECT * FROM order_items WHERE order_id = ${id}`;
  return NextResponse.json({ ok: true, order, items });
}

export async function PUT(request, { params }) {
  if (!(await isAdminSession())) {
    return NextResponse.json({ ok: false, error: "Not authorized." }, { status: 401 });
  }
  if (!isDbConfigured()) {
    return NextResponse.json({ ok: false, error: "Database not connected." }, { status: 503 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const { status } = body;

  const sql = getSql();
  try {
    await sql`UPDATE orders SET status = ${status} WHERE id = ${id}`;
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err.message || err) }, { status: 500 });
  }
}
