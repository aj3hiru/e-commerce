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
  const categories = await sql`SELECT * FROM categories ORDER BY name`;
  const subcategories = await sql`SELECT * FROM subcategories ORDER BY name`;
  return NextResponse.json({ ok: true, categories, subcategories });
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
  const { name, parentId } = body;
  if (!name) {
    return NextResponse.json({ ok: false, error: "Name is required." }, { status: 400 });
  }

  const sql = getSql();
  const slug = slugify(name);

  try {
    if (parentId) {
      const [row] = await sql`INSERT INTO subcategories (category_id, slug, name) VALUES (${parentId}, ${slug}, ${name})`;
      await logActivity(admin, "Created subcategory", name);
      return NextResponse.json({ ok: true, id: row.id });
    } else {
      const [row] = await sql`INSERT INTO categories (slug, name) VALUES (${slug}, ${name})`;
      await logActivity(admin, "Created category", name);
      return NextResponse.json({ ok: true, id: row.id });
    }
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err.message || err) }, { status: 500 });
  }
}
