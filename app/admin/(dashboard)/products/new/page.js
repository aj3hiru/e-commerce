import Link from "next/link";
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

export default async function NewProductPage() {
  const [categories, brands] = await Promise.all([getCategories(), getBrands()]);

  return (
    <div>
      <div className="section-label" style={{ margin: "0 0 1rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span><i className="fas fa-plus-square" /> Add Product</span>
        <Link href="/admin/products" className="abtn">← Back to Products</Link>
      </div>
      <ProductForm categories={categories} brands={brands} />
    </div>
  );
}
