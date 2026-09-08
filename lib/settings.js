import { getSql, isDbConfigured } from "./db";
import { SITE } from "./siteData";

const DEFAULTS = {
  store_name: SITE.name,
  support_phone: SITE.supportPhone,
  support_email: SITE.supportEmail,
  address: SITE.address,
  delivery_slot_text: "Today 12:00 PM - 03:00 PM",
  festive_banner_text: "FESTIVE CELEBRATIONS",
};

export async function getSettings() {
  if (!isDbConfigured()) return { ...DEFAULTS };
  try {
    const sql = getSql();
    const rows = await sql`SELECT setting_key, setting_value FROM business_settings`;
    const dbSettings = Object.fromEntries(rows.map((r) => [r.setting_key, r.setting_value]));
    return { ...DEFAULTS, ...dbSettings };
  } catch {
    return { ...DEFAULTS };
  }
}
