import { NextResponse } from "next/server";
import { getSql, isDbConfigured } from "@/lib/db";

export async function POST(request) {
  if (!isDbConfigured()) {
    return NextResponse.json({ ok: false, error: "Coupons unavailable right now." }, { status: 503 });
  }

  const body = await request.json().catch(() => ({}));
  const { code, subtotal } = body;
  if (!code) {
    return NextResponse.json({ ok: false, error: "Enter a coupon code." }, { status: 400 });
  }

  const sql = getSql();
  const [coupon] = await sql`SELECT * FROM coupons WHERE code = ${code.toUpperCase()} AND status = 'active'`;

  if (!coupon) {
    return NextResponse.json({ ok: false, error: "Invalid or inactive coupon code." }, { status: 404 });
  }

  if (coupon.expiry_date && new Date(coupon.expiry_date) < new Date()) {
    return NextResponse.json({ ok: false, error: "This coupon has expired." }, { status: 400 });
  }

  if (Number(subtotal) < Number(coupon.min_order_amount || 0)) {
    return NextResponse.json({
      ok: false,
      error: `Minimum order of ₹${Number(coupon.min_order_amount).toFixed(0)} required for this coupon.`,
    }, { status: 400 });
  }

  let discount;
  if (coupon.type === "percent") {
    discount = (Number(subtotal) * Number(coupon.value)) / 100;
    if (coupon.max_discount) discount = Math.min(discount, Number(coupon.max_discount));
  } else {
    discount = Number(coupon.value);
  }
  discount = Math.min(discount, Number(subtotal));

  return NextResponse.json({ ok: true, code: coupon.code, type: coupon.type, value: Number(coupon.value), discount: Math.round(discount * 100) / 100 });
}
