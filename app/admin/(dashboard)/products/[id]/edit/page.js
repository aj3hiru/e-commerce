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

async function getProduct(id) {
  if (!isDbConfigured()) return null;
  const sql = getSql();
  const [row] = await sql`SELECT * FROM products WHERE id = ${id}`;
  return row || null;
}

export default async function EditProductPage({ params }) {
  const { id } = await params;
  const [categories, product] = await Promise.all([getCategories(), getProduct(id)]);
  if (!product) notFound();

  return (
    <div>
      <div className="admin-header">
        <h1>Edit Product</h1>
        <Link href="/admin/products" className="admin-btn secondary">← Back to Products</Link>
      </div>
      <ProductForm categories={categories} initial={product} productId={id} />
    </div>
  );
}
