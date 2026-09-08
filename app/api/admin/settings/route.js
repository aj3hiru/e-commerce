import { NextResponse } from "next/server";
import { getSql, isDbConfigured } from "@/lib/db";
import { getSessionCustomer } from "@/lib/auth";
import { getSettings } from "@/lib/settings";
import { logActivity } from "@/lib/activityLog";

export async function GET() {
  const admin = await getSessionCustomer();
  if (!admin || admin.role !== "admin") {
    return NextResponse.json({ ok: false, error: "Not authorized." }, { status: 401 });
  }
  const settings = await getSettings();
  return NextResponse.json({ ok: true, settings });
}

export async function PUT(request) {
  const admin = await getSessionCustomer();
  if (!admin || admin.role !== "admin") {
    return NextResponse.json({ ok: false, error: "Not authorized." }, { status: 401 });
  }
  if (!isDbConfigured()) {
    return NextResponse.json({ ok: false, error: "Database not connected." }, { status: 503 });
  }

  const body = await request.json().catch(() => ({}));
  const sql = getSql();

  try {
    for (const [key, value] of Object.entries(body)) {
      await sql`
        INSERT INTO business_settings (setting_key, setting_value) VALUES (${key}, ${value})
        ON DUPLICATE KEY UPDATE setting_value = ${value}
      `;
    }
    await logActivity(admin, "Updated business settings");
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err.message || err) }, { status: 500 });
  }
}
