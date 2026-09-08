import { getSql, isDbConfigured } from "./db";
import * as Static from "./siteData";

function parseJson(value, fallback) {
  if (value == null) return fallback;
  if (typeof value !== "string") return value; // driver already parsed it
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function rowToProduct(row, categorySlug, subcategorySlug) {
  return {
    slug: row.slug,
    title: row.title,
    brand: row.brand,
    img: row.img,
    images: parseJson(row.images, [row.img]),
    mrp: Number(row.mrp),
    sp: Number(row.sp),
    qty: row.qty_label,
    perUnit: row.per_unit,
    description: row.description,
    stock: row.stock,
    rating: Number(row.rating),
    reviews: parseJson(row.reviews, []),
    category: categorySlug,
    subcategory: subcategorySlug,
  };
}

export async function getCategoriesWithCounts() {
  if (!isDbConfigured()) {
    return Static.CATEGORIES.map((c) => ({
      ...c,
      count: Static.getCategoryProducts(c.slug).length,
    }));
  }
  const sql = getSql();
  const cats = await sql`SELECT id, slug, name FROM categories ORDER BY id`;
  const counts = await sql`
    SELECT category_id, COUNT(*) AS count FROM products GROUP BY category_id
  `;
  const countMap = Object.fromEntries(counts.map((c) => [c.category_id, Number(c.count)]));
  return cats.map((c) => ({ slug: c.slug, name: c.name, count: countMap[c.id] || 0 }));
}

export async function getCategoryBySlug(slug) {
  if (!isDbConfigured()) {
    const cat = Static.CATEGORIES.find((c) => c.slug === slug);
    return cat || null;
  }
  const sql = getSql();
  const [cat] = await sql`SELECT id, slug, name FROM categories WHERE slug = ${slug}`;
  if (!cat) return null;
  const subs = await sql`SELECT slug, name FROM subcategories WHERE category_id = ${cat.id} ORDER BY name`;
  return { slug: cat.slug, name: cat.name, subcategories: subs };
}

export async function getCategoryProducts(categorySlug, subcategorySlug, sort) {
  if (!isDbConfigured()) {
    const products = Static.getCategoryProducts(categorySlug, subcategorySlug);
    return Static.sortProducts(products, sort);
  }
  const sql = getSql();
  const [cat] = await sql`SELECT id FROM categories WHERE slug = ${categorySlug}`;
  if (!cat) return [];

  let rows;
  if (subcategorySlug) {
    const [sub] = await sql`SELECT id FROM subcategories WHERE category_id = ${cat.id} AND slug = ${subcategorySlug}`;
    if (!sub) return [];
    rows = await sql`SELECT * FROM products WHERE subcategory_id = ${sub.id}`;
  } else {
    rows = await sql`SELECT * FROM products WHERE category_id = ${cat.id}`;
  }

  const products = rows.map((r) => rowToProduct(r, categorySlug, subcategorySlug));
  return Static.sortProducts(products, sort);
}

export async function getProductBySlug(slug) {
  if (!isDbConfigured()) {
    return Static.getProductBySlug(slug) || null;
  }
  const sql = getSql();
  const [row] = await sql`
    SELECT p.*, c.slug AS category_slug, s.slug AS subcategory_slug
    FROM products p
    LEFT JOIN categories c ON c.id = p.category_id
    LEFT JOIN subcategories s ON s.id = p.subcategory_id
    WHERE p.slug = ${slug}
  `;
  if (!row) return null;
  return rowToProduct(row, row.category_slug, row.subcategory_slug);
}

export async function getRelatedProducts(product, limit = 4) {
  if (!isDbConfigured()) {
    return Static.getRelatedProducts(product, limit);
  }
  const sql = getSql();
  const [cat] = await sql`SELECT id FROM categories WHERE slug = ${product.category}`;
  if (!cat) return [];
  const rows = await sql`
    SELECT * FROM products WHERE category_id = ${cat.id} AND slug != ${product.slug} LIMIT ${limit}
  `;
  return rows.map((r) => rowToProduct(r, product.category));
}

export async function getFeaturedProducts() {
  if (!isDbConfigured()) return Static.POPULAR_PRODUCTS;
  const sql = getSql();
  const rows = await sql`SELECT * FROM products WHERE featured = true ORDER BY id LIMIT 10`;
  return rows.map((r) => rowToProduct(r));
}

export async function getGardenProducts() {
  if (!isDbConfigured()) return Static.GARDEN_PRODUCTS;
  const sql = getSql();
  const rows = await sql`SELECT * FROM products WHERE featured = false ORDER BY id LIMIT 10`;
  return rows.map((r) => rowToProduct(r));
}

export async function getAllProductsByDiscount() {
  if (!isDbConfigured()) {
    return Static.sortProducts(Static.PRODUCTS, "discount");
  }
  const sql = getSql();
  const rows = await sql`SELECT * FROM products ORDER BY (mrp - sp) DESC`;
  return rows.map((r) => rowToProduct(r));
}

export async function getProductIdBySlug(slug) {
  if (!isDbConfigured()) return null;
  const sql = getSql();
  const [row] = await sql`SELECT id FROM products WHERE slug = ${slug}`;
  return row?.id || null;
}
