import { NextResponse } from "next/server";
import { getSql, isDbConfigured } from "@/lib/db";
import { getSessionCustomer } from "@/lib/auth";

// Preloads everything the POS screen needs in one round trip: active
// products (for barcode scan / search), active coupons, active customers
// (for the phone-number autocomplete), and the business settings that
// control POS behaviour (print mode, keyboard shortcuts).
export async function GET() {
  const admin = await getSessionCustomer();
  if (!admin || admin.role !== "admin") {
    return NextResponse.json({ ok: false, error: "Not authorized." }, { status: 401 });
  }
  if (!isDbConfigured()) {
    return NextResponse.json({ ok: false, error: "Database not connected." }, { status: 503 });
  }

  const sql = getSql();

  const products = await sql`
    SELECT id, title, sku, barcode, mrp, sp, gst_rate, stock, product_type, category_id, subcategory_id
    FROM products
    WHERE status = 'active' OR status IS NULL
    ORDER BY title ASC
  `;

  const coupons = await sql`
    SELECT code, type, value, min_order_amount, max_discount, applies_to, product_id, category_id, subcategory_id, usage_count, number_of_times
    FROM coupons
    WHERE status = 'active'
  `;

  const customers = await sql`
    SELECT id, name, phone FROM customers WHERE role != 'admin' AND (status = 'active' OR status IS NULL) ORDER BY name ASC
  `;

  const settingsRows = await sql`
    SELECT setting_key, setting_value FROM business_settings
    WHERE setting_key IN ('pos_print_mode', 'printer_format', 'shortcut_complete_sale', 'shortcut_print', 'shortcut_new_sale')
  `;
  const settings = Object.fromEntries(settingsRows.map((r) => [r.setting_key, r.setting_value]));

  return NextResponse.json({
    ok: true,
    products,
    coupons,
    customers,
    settings: {
      pos_print_mode: settings.pos_print_mode || "both",
      printer_format: settings.printer_format || "thermal_80",
      shortcut_complete_sale: settings.shortcut_complete_sale || "F2",
      shortcut_print: settings.shortcut_print || "F3",
      shortcut_new_sale: settings.shortcut_new_sale || "F4",
    },
  });
}
