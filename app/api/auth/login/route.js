import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getSql, isDbConfigured } from "@/lib/db";
import { createSession } from "@/lib/auth";

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { identifier, password } = body;

  if (!identifier || !password) {
    return NextResponse.json(
      { ok: false, error: "Email/mobile/username and password are required." },
      { status: 400 }
    );
  }

  if (!isDbConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Database not connected yet. Ask the site owner to set up the database." },
      { status: 503 }
    );
  }

  const sql = getSql();

  try {
    const [customer] = await sql`
      SELECT id, password_hash, role, status FROM customers
      WHERE email = ${identifier} OR phone = ${identifier} OR username = ${identifier}
    `;
    if (!customer) {
      return NextResponse.json({ ok: false, error: "No account found with this email, mobile or username." }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, customer.password_hash);
    if (!valid) {
      return NextResponse.json({ ok: false, error: "Incorrect password." }, { status: 401 });
    }

    if (customer.status === "blocked") {
      return NextResponse.json({ ok: false, error: "Your account has been blocked. Please contact support." }, { status: 403 });
    }

    await createSession(customer.id);
    return NextResponse.json({ ok: true, role: customer.role || "customer" });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err.message || err) }, { status: 500 });
  }
}
