import { NextResponse } from "next/server";
import { getSql, isDbConfigured } from "@/lib/db";
import { getSessionCustomer } from "@/lib/auth";
import { logActivity } from "@/lib/activityLog";

export async function PUT(request, { params }) {
  const admin = await getSessionCustomer();
  if (!admin || admin.role !== "admin") {
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
    await sql`UPDATE product_reviews SET status = ${status} WHERE id = ${id}`;
    await logActivity(admin, `Review ${status}`, `id: ${id}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err.message || err) }, { status: 500 });
  }
}

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
  try {
    await sql`DELETE FROM product_reviews WHERE id = ${id}`;
    await logActivity(admin, "Deleted review", `id: ${id}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err.message || err) }, { status: 500 });
  }
}
