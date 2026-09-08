import { NextResponse } from "next/server";
import { getSql, isDbConfigured } from "@/lib/db";
import { CATEGORIES, PRODUCTS, POPULAR_PRODUCTS } from "@/lib/siteData";

// Visit /api/setup?key=YOUR_KEY once (after creating a Postgres DB in Vercel's
// Storage tab and setting a SETUP_KEY environment variable) to create tables
// and load starter data. Safe to call more than once — it skips seeding if
// data already exists.
export async function GET(request) {
  if (!isDbConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "No database connected yet. Go to your Vercel project → Storage tab → Create Database (Postgres/Neon), then redeploy and try this URL again.",
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
        id SERIAL PRIMARY KEY,
        slug TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL
      )
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS subcategories (
        id SERIAL PRIMARY KEY,
        category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
        slug TEXT NOT NULL,
        name TEXT NOT NULL,
        UNIQUE(category_id, slug)
      )
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        slug TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL,
        brand TEXT,
        category_id INTEGER REFERENCES categories(id),
        subcategory_id INTEGER REFERENCES subcategories(id),
        img TEXT,
        images JSONB DEFAULT '[]',
        mrp NUMERIC NOT NULL,
        sp NUMERIC NOT NULL,
        qty_label TEXT,
        per_unit TEXT,
        description TEXT,
        stock INTEGER DEFAULT 0,
        rating NUMERIC DEFAULT 4,
        reviews JSONB DEFAULT '[]',
        featured BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT now()
      )
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS customers (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        phone TEXT,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT now()
      )
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        order_number TEXT UNIQUE NOT NULL,
        customer_id INTEGER REFERENCES customers(id),
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        address TEXT NOT NULL,
        city TEXT NOT NULL,
        pincode TEXT NOT NULL,
        payment_method TEXT NOT NULL,
        subtotal NUMERIC NOT NULL,
        delivery_fee NUMERIC NOT NULL,
        total NUMERIC NOT NULL,
        status TEXT DEFAULT 'placed',
        created_at TIMESTAMP DEFAULT now()
      )
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS order_items (
        id SERIAL PRIMARY KEY,
        order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
        product_id INTEGER REFERENCES products(id),
        title TEXT NOT NULL,
        qty INTEGER NOT NULL,
        price NUMERIC NOT NULL
      )
    `;

    const existing = await sql`SELECT COUNT(*)::int AS count FROM categories`;
    if (existing[0].count > 0) {
      return NextResponse.json({ ok: true, message: "Tables already set up and seeded. Nothing more to do." });
    }

    const categoryIdBySlug = {};
    for (const cat of CATEGORIES) {
      const [row] = await sql`
        INSERT INTO categories (slug, name) VALUES (${cat.slug}, ${cat.name})
        RETURNING id
      `;
      categoryIdBySlug[cat.slug] = row.id;

      for (const sub of cat.subcategories) {
        const [subRow] = await sql`
          INSERT INTO subcategories (category_id, slug, name)
          VALUES (${row.id}, ${sub.slug}, ${sub.name})
          RETURNING id
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
        INSERT INTO products
          (slug, title, brand, category_id, subcategory_id, img, images, mrp, sp, qty_label, per_unit, description, stock, rating, reviews, featured)
        VALUES
          (${p.slug}, ${p.title}, ${p.brand}, ${categoryId}, ${subcategoryId}, ${p.img},
           ${JSON.stringify(p.images)}, ${p.mrp}, ${p.sp}, ${p.qty || null}, ${p.perUnit || null},
           ${p.description}, ${p.stock}, ${p.rating}, ${JSON.stringify(p.reviews)}, ${featured})
        ON CONFLICT (slug) DO NOTHING
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
