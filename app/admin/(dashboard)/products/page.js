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
      <div className="section-label" style={{ margin: "0 0 1rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span><i className="fas fa-boxes" /> Products</span>
        <Link href="/admin/products/new" className="abtn abtn-primary"><i className="fas fa-plus" /> Add Product</Link>
      </div>

      {error && <div className="gd-card"><div className="gd-card-body" style={{ color: "#ef4444" }}>{error}</div></div>}

      <div className="gd-card">
        <div className="gd-card-body">
          {!products ? (
            <p style={{ color: "var(--gray-500)" }}>Loading…</p>
          ) : products.length === 0 ? (
            <p style={{ color: "var(--gray-500)" }}>No products yet. Add your first one.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table className="atable">
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
                      <td>{p.img && <img src={p.img} alt={p.title} style={{ width: 44, height: 44, borderRadius: 6, objectFit: "cover" }} />}</td>
                      <td>{p.title}</td>
                      <td>{p.category_name || "—"}</td>
                      <td>₹{Number(p.sp)} <span style={{ color: "var(--gray-400)", textDecoration: "line-through", fontSize: 12 }}>₹{Number(p.mrp)}</span></td>
                      <td>{p.stock}</td>
                      <td>{p.featured ? "Yes" : "No"}</td>
                      <td>
                        <div style={{ display: "flex", gap: 10 }}>
                          <Link href={`/admin/products/${p.id}/edit`} style={{ color: "var(--primary)", fontWeight: 700, fontSize: 13 }}>Edit</Link>
                          <button type="button" onClick={() => handleDelete(p.id, p.title)} style={{ color: "#ef4444", fontWeight: 700, fontSize: 13, background: "none", border: "none", cursor: "pointer" }}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
