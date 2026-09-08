import { NextResponse } from "next/server";
import { getSql, isDbConfigured } from "@/lib/db";
import { getSessionCustomer } from "@/lib/auth";
import { logActivity } from "@/lib/activityLog";

export async function GET() {
  const admin = await getSessionCustomer();
  if (!admin || admin.role !== "admin") {
    return NextResponse.json({ ok: false, error: "Not authorized." }, { status: 401 });
  }
  if (!isDbConfigured()) {
    return NextResponse.json({ ok: false, error: "Database not connected." }, { status: 503 });
  }

  const sql = getSql();
  const coupons = await sql`SELECT * FROM coupons ORDER BY created_at DESC`;
  return NextResponse.json({ ok: true, coupons });
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
  const { code, type, value, minOrderAmount, maxDiscount, expiryDate } = body;

  if (!code || !type || !value) {
    return NextResponse.json({ ok: false, error: "Code, type and value are required." }, { status: 400 });
  }

  const sql = getSql();
  try {
    const [row] = await sql`
      INSERT INTO coupons (code, type, value, min_order_amount, max_discount, expiry_date)
      VALUES (${code.toUpperCase()}, ${type}, ${value}, ${minOrderAmount || 0}, ${maxDiscount || null}, ${expiryDate || null})
    `;
    await logActivity(admin, "Created coupon", code.toUpperCase());
    return NextResponse.json({ ok: true, id: row.id });
  } catch (err) {
    const msg = String(err.message || err);
    if (msg.includes("Duplicate")) {
      return NextResponse.json({ ok: false, error: "This coupon code already exists." }, { status: 409 });
    }
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
