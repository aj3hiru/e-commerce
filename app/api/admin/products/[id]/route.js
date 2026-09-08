import { NextResponse } from "next/server";
import { getSql, isDbConfigured } from "@/lib/db";
import { getSessionCustomer } from "@/lib/auth";
import { logActivity } from "@/lib/activityLog";

export async function GET(request, { params }) {
  const admin = await getSessionCustomer();
  if (!admin || admin.role !== "admin") {
    return NextResponse.json({ ok: false, error: "Not authorized." }, { status: 401 });
  }
  const { id } = await params;
  const sql = getSql();
  const [row] = await sql`SELECT * FROM products WHERE id = ${id}`;
  if (!row) return NextResponse.json({ ok: false, error: "Product not found." }, { status: 404 });
  return NextResponse.json({ ok: true, product: row });
}

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
  const { title, brandId, categoryId, img, mrp, sp, qtyLabel, perUnit, description, stock, featured, badgeTag } = body;

  const sql = getSql();

  let brandName = null;
  if (brandId) {
    const [brandRow] = await sql`SELECT name FROM brands WHERE id = ${brandId}`;
    brandName = brandRow?.name || null;
  }

  try {
    await sql`
      UPDATE products SET
        title = ${title}, brand = ${brandName}, brand_id = ${brandId || null}, category_id = ${categoryId || null},
        img = ${img || null}, mrp = ${mrp}, sp = ${sp}, qty_label = ${qtyLabel || null},
        per_unit = ${perUnit || null}, description = ${description || null}, stock = ${stock || 0},
        featured = ${!!featured}, badge_tag = ${badgeTag || "none"}
      WHERE id = ${id}
    `;
    await logActivity(admin, "Updated product", title);
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
    const [row] = await sql`SELECT title FROM products WHERE id = ${id}`;
    await sql`DELETE FROM products WHERE id = ${id}`;
    await logActivity(admin, "Deleted product", row?.title || `id: ${id}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err.message || err) }, { status: 500 });
  }
}
