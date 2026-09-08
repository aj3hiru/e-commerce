"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminProductsPage() {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState("");

  const load = () => {
    fetch("/api/admin/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) setProducts(data.products);
        else setError(data.error || "Could not load products.");
      })
      .catch(() => setError("Network error loading products."));
  };

  useEffect(load, []);

  const handleDelete = async (id, title) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.ok) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } else {
      alert(data.error || "Could not delete product.");
    }
  };

  return (
    <div>
      <div className="admin-header">
        <h1>Products</h1>
        <Link href="/admin/products/new" className="admin-btn">+ Add Product</Link>
      </div>

      {error && <div className="admin-card" style={{ color: "#c62828" }}>{error}</div>}

      <div className="admin-card">
        {!products ? (
          <p style={{ color: "var(--muted)", fontSize: 13.5 }}>Loading…</p>
        ) : products.length === 0 ? (
          <p style={{ color: "var(--muted)", fontSize: 13.5 }}>No products yet. Add your first one.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th></th>
                <th>Title</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Featured</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>{p.img && <img src={p.img} alt={p.title} />}</td>
                  <td>{p.title}</td>
                  <td>{p.category_name || "—"}</td>
                  <td>₹{Number(p.sp)} <span style={{ color: "var(--muted)", textDecoration: "line-through", fontSize: 12 }}>₹{Number(p.mrp)}</span></td>
                  <td>{p.stock}</td>
                  <td>{p.featured ? "Yes" : "No"}</td>
                  <td>
                    <div className="actions">
                      <Link href={`/admin/products/${p.id}/edit`}>Edit</Link>
                      <button type="button" className="del" onClick={() => handleDelete(p.id, p.title)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
