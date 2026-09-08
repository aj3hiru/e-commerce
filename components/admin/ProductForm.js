"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductForm({ categories, brands, initial, productId }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isEdit = Boolean(productId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.target);
    const payload = {
      title: form.get("title"),
      brandId: form.get("brandId") || null,
      categoryId: form.get("categoryId") || null,
      img: form.get("img"),
      mrp: Number(form.get("mrp")),
      sp: Number(form.get("sp")),
      qtyLabel: form.get("qtyLabel"),
      perUnit: form.get("perUnit"),
      description: form.get("description"),
      stock: Number(form.get("stock")),
      featured: form.get("featured") === "on",
      badgeTag: form.get("badgeTag") || "none",
    };

    try {
      const res = await fetch(isEdit ? `/api/admin/products/${productId}` : "/api/admin/products", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Something went wrong.");
        setLoading(false);
        return;
      }
      router.push("/admin/products");
      router.refresh();
    } catch {
      setError("Network error — please try again.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="aform-card">
      <div className="aform-grid">
        <div className="aform-group">
          <label>Product Title *</label>
          <input name="title" type="text" defaultValue={initial?.title} required />
        </div>
        <div className="aform-group">
          <label>Brand</label>
          <select name="brandId" defaultValue={initial?.brand_id || ""}>
            <option value="">— None —</option>
            {brands.map((b) => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="aform-grid">
        <div className="aform-group">
          <label>Category</label>
          <select name="categoryId" defaultValue={initial?.category_id || ""}>
            <option value="">— None —</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div className="aform-group">
          <label>Badge Tag</label>
          <select name="badgeTag" defaultValue={initial?.badge_tag || "none"}>
            <option value="none">— None —</option>
            <option value="new">New</option>
            <option value="best">Best Seller</option>
            <option value="hot">Hot</option>
            <option value="featured">Featured</option>
          </select>
        </div>
      </div>

      <div className="aform-group">
        <label>Image URL</label>
        <input name="img" type="url" placeholder="https://..." defaultValue={initial?.img} />
      </div>

      <div className="aform-grid">
        <div className="aform-group">
          <label>MRP (₹) *</label>
          <input name="mrp" type="number" step="0.01" defaultValue={initial?.mrp} required />
        </div>
        <div className="aform-group">
          <label>Selling Price (₹) *</label>
          <input name="sp" type="number" step="0.01" defaultValue={initial?.sp} required />
        </div>
      </div>

      <div className="aform-grid">
        <div className="aform-group">
          <label>Quantity Label (e.g. "500 g")</label>
          <input name="qtyLabel" type="text" defaultValue={initial?.qty_label} />
        </div>
        <div className="aform-group">
          <label>Per Unit Price (e.g. "₹99.80 / 100 g")</label>
          <input name="perUnit" type="text" defaultValue={initial?.per_unit} />
        </div>
      </div>

      <div className="aform-group">
        <label>Description</label>
        <textarea name="description" rows={3} defaultValue={initial?.description} />
      </div>

      <div className="aform-grid">
        <div className="aform-group">
          <label>Stock Quantity</label>
          <input name="stock" type="number" defaultValue={initial?.stock ?? 20} />
        </div>
        <div className="aform-group" style={{ justifyContent: "center" }}>
          <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
            <input name="featured" type="checkbox" defaultChecked={initial?.featured} style={{ width: "auto" }} />
            Show in "Popular Products" on homepage
          </label>
        </div>
      </div>

      {error && <p style={{ color: "#ef4444", fontSize: 13, margin: "10px 0" }}>{error}</p>}

      <button type="submit" className="abtn abtn-primary" disabled={loading}>
        {loading ? "Saving…" : isEdit ? "Save Changes" : "Add Product"}
      </button>
    </form>
  );
}
