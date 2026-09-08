import { NextResponse } from "next/server";
import { getSql, isDbConfigured } from "@/lib/db";
import { getSessionCustomer } from "@/lib/auth";
import { logActivity } from "@/lib/activityLog";

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export async function GET() {
  const admin = await getSessionCustomer();
  if (!admin || admin.role !== "admin") {
    return NextResponse.json({ ok: false, error: "Not authorized." }, { status: 401 });
  }
  if (!isDbConfigured()) {
    return NextResponse.json({ ok: false, error: "Database not connected." }, { status: 503 });
  }

  const sql = getSql();
  const brands = await sql`
    SELECT b.*, (SELECT COUNT(*) FROM products p WHERE p.brand_id = b.id) AS product_count
    FROM brands b ORDER BY b.name
  `;
  return NextResponse.json({ ok: true, brands });
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
  const { name, logo } = body;
  if (!name) {
    return NextResponse.json({ ok: false, error: "Name is required." }, { status: 400 });
  }

  const sql = getSql();
  const slug = slugify(name);

  try {
    const [row] = await sql`INSERT INTO brands (name, slug, logo) VALUES (${name}, ${slug}, ${logo || null})`;
    await logActivity(admin, "Created brand", name);
    return NextResponse.json({ ok: true, id: row.id });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err.message || err) }, { status: 500 });
  }
}
