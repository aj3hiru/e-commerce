import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getSql, isDbConfigured } from "@/lib/db";
import { createSession } from "@/lib/auth";

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { name, email, phone, username, password } = body;

  if (!name || !email || !phone || !username || !password) {
    return NextResponse.json(
      { ok: false, error: "Name, email, phone, username and password are all required." },
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
    const [existingEmail] = await sql`SELECT id FROM customers WHERE email = ${email}`;
    if (existingEmail) {
      return NextResponse.json({ ok: false, error: "An account with this email already exists." }, { status: 409 });
    }
    const [existingUsername] = await sql`SELECT id FROM customers WHERE username = ${username}`;
    if (existingUsername) {
      return NextResponse.json({ ok: false, error: "This username is already taken." }, { status: 409 });
    }
    const [existingPhone] = await sql`SELECT id FROM customers WHERE phone = ${phone}`;
    if (existingPhone) {
      return NextResponse.json({ ok: false, error: "An account with this mobile number already exists." }, { status: 409 });
    }

    const hash = await bcrypt.hash(password, 10);
    const [row] = await sql`
      INSERT INTO customers (name, email, phone, username, password_hash)
      VALUES (${name}, ${email}, ${phone}, ${username}, ${hash})
    `;

    await createSession(row.id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err.message || err) }, { status: 500 });
  }
}
