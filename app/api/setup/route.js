import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getSql, isDbConfigured } from "@/lib/db";
import { CATEGORIES, PRODUCTS, POPULAR_PRODUCTS } from "@/lib/siteData";

// Visit /api/setup?key=YOUR_KEY once (after setting DB_HOST, DB_USER, DB_PASSWORD,
// DB_NAME and SETUP_KEY environment variables) to create tables and load starter
// data. Safe to call more than once — it skips seeding if data already exists.
export async function GET(request) {
  if (!isDbConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "No database connected yet. Set DB_HOST, DB_USER, DB_PASSWORD and DB_NAME environment variables, then redeploy and try this URL again.",
      },
      { status: 400 }
    );
  }

  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");
  const expectedKey = process.env.SETUP_KEY;
  if (expectedKey && key !== expectedKey) {
    return NextResponse.json({ ok: false, error: "Invalid or missing setup key." }, { status: 401 });
  }

  const sql = getSql();

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        slug VARCHAR(191) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL
      )
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS subcategories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        category_id INT,
        slug VARCHAR(191) NOT NULL,
        name VARCHAR(255) NOT NULL,
        UNIQUE KEY uniq_cat_slug (category_id, slug),
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
      )
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        slug VARCHAR(191) UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
        brand VARCHAR(255),
        category_id INT,
        subcategory_id INT,
        img TEXT,
        images JSON,
        mrp DECIMAL(10,2) NOT NULL,
        sp DECIMAL(10,2) NOT NULL,
        qty_label VARCHAR(100),
        per_unit VARCHAR(100),
        description TEXT,
        stock INT DEFAULT 0,
        rating DECIMAL(3,2) DEFAULT 4,
        reviews JSON,
        featured BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES categories(id),
        FOREIGN KEY (subcategory_id) REFERENCES subcategories(id)
      )
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS customers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(30),
        username VARCHAR(100) UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(20) DEFAULT 'customer',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    // Migration safety net: adds columns if this table was created by an
    // older version of this route, before they existed. Ignored if a
    // column is already present.
    try {
      await sql`ALTER TABLE customers ADD COLUMN role VARCHAR(20) DEFAULT 'customer'`;
    } catch {
      // column already exists — nothing to do
    }
    try {
      await sql`ALTER TABLE customers ADD COLUMN username VARCHAR(100) UNIQUE`;
    } catch {
      // column already exists — nothing to do
    }

    // Provision (or promote) the admin account from env vars, every time
    // this route is visited, so it stays in sync even after the first run.
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminUsername = process.env.ADMIN_USERNAME || null;
    if (adminEmail && adminPassword) {
      const [existingAdmin] = await sql`SELECT id FROM customers WHERE email = ${adminEmail}`;
      if (existingAdmin) {
        await sql`UPDATE customers SET role = 'admin', username = ${adminUsername} WHERE id = ${existingAdmin.id}`;
      } else {
        const hash = await bcrypt.hash(adminPassword, 10);
        await sql`
          INSERT INTO customers (name, email, phone, username, password_hash, role)
          VALUES ('Admin', ${adminEmail}, NULL, ${adminUsername}, ${hash}, 'admin')
        `;
      }
    }

    await sql`
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_number VARCHAR(50) UNIQUE NOT NULL,
        customer_id INT,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(30) NOT NULL,
        address TEXT NOT NULL,
        city VARCHAR(100) NOT NULL,
        pincode VARCHAR(20) NOT NULL,
        payment_method VARCHAR(30) NOT NULL,
        subtotal DECIMAL(10,2) NOT NULL,
        delivery_fee DECIMAL(10,2) NOT NULL,
        total DECIMAL(10,2) NOT NULL,
        status VARCHAR(30) DEFAULT 'placed',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (customer_id) REFERENCES customers(id)
      )
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT,
        product_id INT,
        title VARCHAR(255) NOT NULL,
        qty INT NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id)
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS brands (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        slug VARCHAR(191) UNIQUE NOT NULL,
        logo TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS coupons (
        id INT AUTO_INCREMENT PRIMARY KEY,
        code VARCHAR(50) UNIQUE NOT NULL,
        type VARCHAR(10) NOT NULL,
        value DECIMAL(10,2) NOT NULL,
        min_order_amount DECIMAL(10,2) DEFAULT 0,
        max_discount DECIMAL(10,2),
        expiry_date DATE,
        status VARCHAR(20) DEFAULT 'active',
        usage_count INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS product_reviews (
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_id INT NOT NULL,
        customer_id INT,
        customer_name VARCHAR(255) NOT NULL,
        rating INT NOT NULL,
        text TEXT,
        status VARCHAR(20) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
        FOREIGN KEY (customer_id) REFERENCES customers(id)
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS activity_logs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        admin_id INT,
        admin_name VARCHAR(255),
        action VARCHAR(255) NOT NULL,
        details TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS business_settings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        setting_key VARCHAR(100) UNIQUE NOT NULL,
        setting_value TEXT
      )
    `;

    // Migration safety net for columns added after products/customers already existed.
    try {
      await sql`ALTER TABLE products ADD COLUMN brand_id INT NULL`;
    } catch {
      // column already exists
    }
    try {
      await sql`ALTER TABLE products ADD COLUMN badge_tag VARCHAR(20) DEFAULT 'none'`;
    } catch {
      // column already exists
    }
    try {
      await sql`ALTER TABLE customers ADD COLUMN status VARCHAR(20) DEFAULT 'active'`;
    } catch {
      // column already exists
    }
    try {
      await sql`ALTER TABLE orders ADD COLUMN coupon_code VARCHAR(50)`;
    } catch {
      // column already exists
    }
    try {
      await sql`ALTER TABLE orders ADD COLUMN discount DECIMAL(10,2) DEFAULT 0`;
    } catch {
      // column already exists
    }

    // ── Billing / POS support ────────────────────────────────────────────────
    // Products: barcode/SKU scanning, GST, HSN code, physical vs digital stock handling.
    for (const stmt of [
      `ALTER TABLE products ADD COLUMN sku VARCHAR(100)`,
      `ALTER TABLE products ADD COLUMN barcode VARCHAR(100)`,
      `ALTER TABLE products ADD COLUMN gst_rate DECIMAL(5,2) DEFAULT 0`,
      `ALTER TABLE products ADD COLUMN hsn_code VARCHAR(20)`,
      `ALTER TABLE products ADD COLUMN product_type VARCHAR(20) DEFAULT 'physical'`,
      `ALTER TABLE products ADD COLUMN status VARCHAR(20) DEFAULT 'active'`,
    ]) {
      try { await sql([stmt]); } catch { /* column already exists */ }
    }
    try {
      await sql`CREATE UNIQUE INDEX idx_products_barcode ON products (barcode)`;
    } catch { /* index already exists, or barcode has duplicate NULLs — fine either way */ }

    // Orders: offline/POS sales alongside online ones. Address fields only make
    // sense for online (delivery) orders, so they're relaxed to nullable here.
    for (const stmt of [
      `ALTER TABLE orders MODIFY COLUMN phone VARCHAR(30) NULL`,
      `ALTER TABLE orders MODIFY COLUMN address TEXT NULL`,
      `ALTER TABLE orders MODIFY COLUMN city VARCHAR(100) NULL`,
      `ALTER TABLE orders MODIFY COLUMN pincode VARCHAR(20) NULL`,
      `ALTER TABLE orders ADD COLUMN order_type VARCHAR(20) DEFAULT 'online'`,
      `ALTER TABLE orders ADD COLUMN is_guest BOOLEAN DEFAULT FALSE`,
      `ALTER TABLE orders ADD COLUMN paid_amount DECIMAL(10,2) DEFAULT 0`,
      `ALTER TABLE orders ADD COLUMN gst_amount DECIMAL(10,2) DEFAULT 0`,
      `ALTER TABLE orders ADD COLUMN payment_status VARCHAR(20) DEFAULT 'Paid'`,
      `ALTER TABLE orders ADD COLUMN promised_date DATE`,
    ]) {
      try { await sql([stmt]); } catch { /* column already exists */ }
    }

    // Customers: online (storefront signup) vs offline (created at the till).
    try {
      await sql`ALTER TABLE customers ADD COLUMN customer_type VARCHAR(20) DEFAULT 'online'`;
    } catch { /* column already exists */ }
    try {
      await sql`ALTER TABLE customers MODIFY COLUMN email VARCHAR(255) NULL`;
    } catch { /* already nullable, or a unique-null edge case — fine */ }

    // Coupons: which scope they apply to (needed for POS coupon matching).
    for (const stmt of [
      `ALTER TABLE coupons ADD COLUMN applies_to VARCHAR(20) DEFAULT 'all'`,
      `ALTER TABLE coupons ADD COLUMN product_id INT NULL`,
      `ALTER TABLE coupons ADD COLUMN category_id INT NULL`,
      `ALTER TABLE coupons ADD COLUMN subcategory_id INT NULL`,
      `ALTER TABLE coupons ADD COLUMN number_of_times INT DEFAULT NULL`,
    ]) {
      try { await sql([stmt]); } catch { /* column already exists */ }
    }

    // Split payments per order (Cash + Card + UPI on the same bill).
    await sql`
      CREATE TABLE IF NOT EXISTS order_payments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        payment_method VARCHAR(20) NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
      )
    `;

    // Dues / credit tracking for POS sales not paid in full.
    await sql`
      CREATE TABLE IF NOT EXISTS credits (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        customer_id INT NULL,
        customer_name VARCHAR(255) NOT NULL,
        customer_phone VARCHAR(30),
        amount DECIMAL(10,2) NOT NULL,
        promised_date DATE,
        status VARCHAR(20) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        paid_at TIMESTAMP NULL,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
        FOREIGN KEY (customer_id) REFERENCES customers(id)
      )
    `;

    // Seed default business settings (INSERT IGNORE = won't overwrite if admin already changed them)
    const defaultSettings = [
      ["store_name", "Cmart Ready"],
      ["support_phone", "+91 98765 43210"],
      ["support_email", "support@cmartready.in"],
      ["address", "Andheri West, Mumbai, India"],
      ["delivery_slot_text", "Today 12:00 PM - 03:00 PM"],
      ["festive_banner_text", "FESTIVE CELEBRATIONS"],
      ["order_id_prefix", "ORD"],
      ["order_sequence_next", "1"],
      ["pos_print_mode", "both"],
      ["printer_format", "thermal_80"],
      ["shortcut_complete_sale", "F2"],
      ["shortcut_print", "F3"],
      ["shortcut_new_sale", "F4"],
    ];
    for (const [key, value] of defaultSettings) {
      await sql`INSERT IGNORE INTO business_settings (setting_key, setting_value) VALUES (${key}, ${value})`;
    }

    const existing = await sql`SELECT COUNT(*) AS count FROM categories`;
    if (Number(existing[0].count) > 0) {
      return NextResponse.json({ ok: true, message: "Tables already set up and seeded. Nothing more to do." });
    }

    const categoryIdBySlug = {};
    for (const cat of CATEGORIES) {
      const [row] = await sql`
        INSERT INTO categories (slug, name) VALUES (${cat.slug}, ${cat.name})
      `;
      categoryIdBySlug[cat.slug] = row.id;

      for (const sub of cat.subcategories) {
        const [subRow] = await sql`
          INSERT INTO subcategories (category_id, slug, name)
          VALUES (${row.id}, ${sub.slug}, ${sub.name})
        `;
        categoryIdBySlug[`${cat.slug}::${sub.slug}`] = subRow.id;
      }
    }

    let seededProducts = 0;
    for (const p of PRODUCTS) {
      const categoryId = categoryIdBySlug[p.category] || null;
      const subcategoryId = p.subcategory ? categoryIdBySlug[`${p.category}::${p.subcategory}`] || null : null;
      const featured = POPULAR_PRODUCTS.some((pp) => pp.title === p.title);

      await sql`
        INSERT IGNORE INTO products
          (slug, title, brand, category_id, subcategory_id, img, images, mrp, sp, qty_label, per_unit, description, stock, rating, reviews, featured)
        VALUES
          (${p.slug}, ${p.title}, ${p.brand}, ${categoryId}, ${subcategoryId}, ${p.img},
           ${JSON.stringify(p.images)}, ${p.mrp}, ${p.sp}, ${p.qty || null}, ${p.perUnit || null},
           ${p.description}, ${p.stock}, ${p.rating}, ${JSON.stringify(p.reviews)}, ${featured})
      `;
      seededProducts++;
    }

    return NextResponse.json({
      ok: true,
      message: "Database set up and seeded successfully.",
      categories: CATEGORIES.length,
      products: seededProducts,
    });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err.message || err) }, { status: 500 });
  }
}
