import Link from "next/link";
import { notFound } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import { getSql, isDbConfigured } from "@/lib/db";

export const dynamic = "force-dynamic";

async function getCategories() {
  if (!isDbConfigured()) return [];
  const sql = getSql();
  return sql`SELECT id, name FROM categories ORDER BY name`;
}

async function getBrands() {
  if (!isDbConfigured()) return [];
  const sql = getSql();
  return sql`SELECT id, name FROM brands ORDER BY name`;
}

async function getProduct(id) {
  if (!isDbConfigured()) return null;
  const sql = getSql();
  const [row] = await sql`SELECT * FROM products WHERE id = ${id}`;
  return row || null;
}

export default async function EditProductPage({ params }) {
  const { id } = await params;
  const [categories, brands, product] = await Promise.all([getCategories(), getBrands(), getProduct(id)]);
  if (!product) notFound();

  return (
    <div>
      <div className="section-label" style={{ margin: "0 0 1rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span><i className="fas fa-edit" /> Edit Product</span>
        <Link href="/admin/products" className="abtn">← Back to Products</Link>
      </div>
      <ProductForm categories={categories} brands={brands} initial={product} productId={id} />
    </div>
  );
}
