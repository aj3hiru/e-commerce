import { NextResponse } from "next/server";
import { getSql, isDbConfigured } from "@/lib/db";
import { isAdminSession } from "@/lib/auth";

export async function GET(request, { params }) {
  if (!(await isAdminSession())) {
    return NextResponse.json({ ok: false, error: "Not authorized." }, { status: 401 });
  }
  const { id } = await params;
  const sql = getSql();
  const [row] = await sql`SELECT * FROM products WHERE id = ${id}`;
  if (!row) return NextResponse.json({ ok: false, error: "Product not found." }, { status: 404 });
  return NextResponse.json({ ok: true, product: row });
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
  const { title, brand, categoryId, img, mrp, sp, qtyLabel, perUnit, description, stock, featured } = body;

  const sql = getSql();
  try {
    await sql`
      UPDATE products SET
        title = ${title}, brand = ${brand || null}, category_id = ${categoryId || null},
        img = ${img || null}, mrp = ${mrp}, sp = ${sp}, qty_label = ${qtyLabel || null},
        per_unit = ${perUnit || null}, description = ${description || null}, stock = ${stock || 0},
        featured = ${!!featured}
      WHERE id = ${id}
    `;
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err.message || err) }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  if (!(await isAdminSession())) {
    return NextResponse.json({ ok: false, error: "Not authorized." }, { status: 401 });
  }
  if (!isDbConfigured()) {
    return NextResponse.json({ ok: false, error: "Database not connected." }, { status: 503 });
  }

  const { id } = await params;
  const sql = getSql();
  try {
    await sql`DELETE FROM products WHERE id = ${id}`;
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err.message || err) }, { status: 500 });
  }
}
