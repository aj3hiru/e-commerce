import { NextResponse } from "next/server";
import { getSql, isDbConfigured } from "@/lib/db";
import { getSessionCustomer } from "@/lib/auth";

export async function POST(request) {
  const customer = await getSessionCustomer();
  if (!customer) {
    return NextResponse.json({ ok: false, error: "Please login to write a review." }, { status: 401 });
  }
  if (!isDbConfigured()) {
    return NextResponse.json({ ok: false, error: "Reviews unavailable right now." }, { status: 503 });
  }

  const body = await request.json().catch(() => ({}));
  const { productSlug, rating, text } = body;
  if (!productSlug || !rating) {
    return NextResponse.json({ ok: false, error: "Rating is required." }, { status: 400 });
  }

  const sql = getSql();
  const [product] = await sql`SELECT id FROM products WHERE slug = ${productSlug}`;
  if (!product) {
    return NextResponse.json({ ok: false, error: "Product not found." }, { status: 404 });
  }

  try {
    await sql`
      INSERT INTO product_reviews (product_id, customer_id, customer_name, rating, text, status)
      VALUES (${product.id}, ${customer.id}, ${customer.name}, ${rating}, ${text || null}, 'pending')
    `;
    return NextResponse.json({ ok: true, message: "Thanks! Your review is pending approval." });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err.message || err) }, { status: 500 });
  }
}
