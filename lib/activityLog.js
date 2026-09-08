import { getSql, isDbConfigured } from "./db";

export async function logActivity(admin, action, details = "") {
  if (!isDbConfigured()) return;
  try {
    const sql = getSql();
    await sql`
      INSERT INTO activity_logs (admin_id, admin_name, action, details)
      VALUES (${admin?.id || null}, ${admin?.name || "Unknown"}, ${action}, ${details})
    `;
  } catch {
    // logging must never break the main request
  }
}
