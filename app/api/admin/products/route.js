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
  const rows = await sql`
    SELECT p.*, c.name AS category_name
    FROM products p
    LEFT JOIN categories c ON c.id = p.category_id
    ORDER BY p.id DESC
  `;
  return NextResponse.json({ ok: true, products: rows });
}

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[():,]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function POST(request) {
  if (!(await isAdminSession())) {
    return NextResponse.json({ ok: false, error: "Not authorized." }, { status: 401 });
  }
  if (!isDbConfigured()) {
    return NextResponse.json({ ok: false, error: "Database not connected." }, { status: 503 });
  }

  const body = await request.json().catch(() => ({}));
  const { title, brand, categoryId, img, mrp, sp, qtyLabel, perUnit, description, stock, featured } = body;

  if (!title || !mrp || !sp) {
    return NextResponse.json({ ok: false, error: "Title, MRP and Selling Price are required." }, { status: 400 });
  }

  const sql = getSql();
  const slug = slugify(title);

  try {
    const [row] = await sql`
      INSERT INTO products
        (slug, title, brand, category_id, img, images, mrp, sp, qty_label, per_unit, description, stock, rating, reviews, featured)
      VALUES
        (${slug}, ${title}, ${brand || null}, ${categoryId || null}, ${img || null}, ${JSON.stringify(img ? [img] : [])},
         ${mrp}, ${sp}, ${qtyLabel || null}, ${perUnit || null}, ${description || null}, ${stock || 0}, 4, '[]', ${!!featured})
    `;
    return NextResponse.json({ ok: true, id: row.id });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err.message || err) }, { status: 500 });
  }
}
