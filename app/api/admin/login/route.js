import { NextResponse } from "next/server";
import { createAdminSession } from "@/lib/auth";

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { password } = body;

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return NextResponse.json(
      { ok: false, error: "Admin panel not configured. Set ADMIN_PASSWORD environment variable." },
      { status: 503 }
    );
  }

  if (password !== adminPassword) {
    return NextResponse.json({ ok: false, error: "Incorrect password." }, { status: 401 });
  }

  await createAdminSession();
  return NextResponse.json({ ok: true });
}
