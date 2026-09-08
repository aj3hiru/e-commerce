import Link from "next/link";
import ProductForm from "@/components/admin/ProductForm";
import { getSql, isDbConfigured } from "@/lib/db";

export const dynamic = "force-dynamic";

async function getCategories() {
  if (!isDbConfigured()) return [];
  const sql = getSql();
  return sql`SELECT id, name FROM categories ORDER BY name`;
}

export default async function NewProductPage() {
  const categories = await getCategories();

  return (
    <div>
      <div className="admin-header">
        <h1>Add Product</h1>
        <Link href="/admin/products" className="admin-btn secondary">← Back to Products</Link>
      </div>
      <ProductForm categories={categories} />
    </div>
  );
}
