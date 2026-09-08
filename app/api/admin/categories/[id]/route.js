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
  const { name, isSubcategory } = body;
  if (!name) {
    return NextResponse.json({ ok: false, error: "Name is required." }, { status: 400 });
  }

  const sql = getSql();

  try {
    if (isSubcategory) {
      await sql`UPDATE subcategories SET name = ${name} WHERE id = ${id}`;
    } else {
      await sql`UPDATE categories SET name = ${name} WHERE id = ${id}`;
    }
    await logActivity(admin, `Updated ${isSubcategory ? "subcategory" : "category"}`, name);
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
  const { searchParams } = new URL(request.url);
  const isSubcategory = searchParams.get("sub") === "1";

  const sql = getSql();
  try {
    if (isSubcategory) {
      await sql`DELETE FROM subcategories WHERE id = ${id}`;
    } else {
      await sql`DELETE FROM categories WHERE id = ${id}`;
    }
    await logActivity(admin, `Deleted ${isSubcategory ? "subcategory" : "category"}`, `id: ${id}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err.message || err) }, { status: 500 });
  }
}
