import crypto from "crypto";
import { cookies } from "next/headers";

const SECRET = process.env.AUTH_SECRET || "cmart-dev-secret-change-me";
const COOKIE_NAME = "cmart_session";

function sign(value) {
  const hmac = crypto.createHmac("sha256", SECRET).update(value).digest("hex");
  return `${value}.${hmac}`;
}

function verify(signed) {
  if (!signed) return null;
  const idx = signed.lastIndexOf(".");
  if (idx === -1) return null;
  const value = signed.slice(0, idx);
  const sig = signed.slice(idx + 1);
  const expected = crypto.createHmac("sha256", SECRET).update(value).digest("hex");
  if (sig.length !== expected.length) return null;
  const ok = crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
  return ok ? value : null;
}

export async function createSession(customerId) {
  const store = await cookies();
  store.set(COOKIE_NAME, sign(String(customerId)), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
}

export async function getSessionCustomerId() {
  const store = await cookies();
  const raw = store.get(COOKIE_NAME)?.value;
  const value = verify(raw);
  return value ? Number(value) : null;
}

export async function destroySession() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}
