"use client";
import { useEffect, useState } from "react";

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState(null);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ code: "", type: "percent", value: "", minOrderAmount: "", maxDiscount: "", expiryDate: "" });
  const [saving, setSaving] = useState(false);

  const load = () => {
    fetch("/api/admin/coupons")
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) setCoupons(data.coupons);
        else setError(data.error || "Could not load coupons.");
      })
      .catch(() => setError("Network error."));
  };

  useEffect(load, []);

  const addCoupon = async (e) => {
    e.preventDefault();
    if (!form.code.trim() || !form.value) return;
    setSaving(true);
    const res = await fetch("/api/admin/coupons", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: form.code.trim(),
        type: form.type,
        value: Number(form.value),
        minOrderAmount: form.minOrderAmount ? Number(form.minOrderAmount) : 0,
        maxDiscount: form.maxDiscount ? Number(form.maxDiscount) : null,
        expiryDate: form.expiryDate || null,
      }),
    });
    const data = await res.json();
    setSaving(false);
    if (data.ok) {
      setForm({ code: "", type: "percent", value: "", minOrderAmount: "", maxDiscount: "", expiryDate: "" });
      load();
    } else alert(data.error || "Could not create coupon.");
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    const res = await fetch(`/api/admin/coupons/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    const data = await res.json();
    if (data.ok) load();
    else alert(data.error || "Could not update.");
  };

  const remove = async (id, code) => {
    if (!confirm(`Delete coupon "${code}"?`)) return;
    const res = await fetch(`/api/admin/coupons/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.ok) load();
    else alert(data.error || "Could not delete.");
  };

  if (error) return <div className="gd-card"><div className="gd-card-body" style={{ color: "#ef4444" }}>{error}</div></div>;

  return (
    <div>
      <div className="section-label"><i className="fas fa-percentage" /> Coupons &amp; Discounts</div>

      <div className="gd-card">
        <div className="gd-card-body">
          <h5 style={{ fontWeight: 700, marginBottom: 12 }}>Create Coupon</h5>
          <form onSubmit={addCoupon} className="aform-grid">
            <div className="aform-group">
              <label>Coupon Code *</label>
              <input type="text" placeholder="e.g. WELCOME50" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} required />
            </div>
            <div className="aform-group">
              <label>Discount Type *</label>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                <option value="percent">Percentage (%)</option>
                <option value="flat">Flat Amount (₹)</option>
              </select>
            </div>
            <div className="aform-group">
              <label>Value * {form.type === "percent" ? "(e.g. 10 for 10%)" : "(₹)"}</label>
              <input type="number" step="0.01" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} required />
            </div>
            <div className="aform-group">
              <label>Min Order Amount (₹)</label>
              <input type="number" step="0.01" value={form.minOrderAmount} onChange={(e) => setForm({ ...form, minOrderAmount: e.target.value })} />
            </div>
            {form.type === "percent" && (
              <div className="aform-group">
                <label>Max Discount Cap (₹, optional)</label>
                <input type="number" step="0.01" value={form.maxDiscount} onChange={(e) => setForm({ ...form, maxDiscount: e.target.value })} />
              </div>
            )}
            <div className="aform-group">
              <label>Expiry Date (optional)</label>
              <input type="date" value={form.expiryDate} onChange={(e) => setForm({ ...form, expiryDate: e.target.value })} />
            </div>
          </form>
          <button type="button" onClick={addCoupon} className="abtn abtn-primary" disabled={saving}>
            {saving ? "Creating…" : "Create Coupon"}
          </button>
        </div>
      </div>

      <div className="gd-card">
        <div className="gd-card-body">
          <h5 style={{ fontWeight: 700, marginBottom: 12 }}>All Coupons {coupons ? `(${coupons.length})` : ""}</h5>
          {!coupons ? (
            <p style={{ color: "var(--gray-500)" }}>Loading…</p>
          ) : coupons.length === 0 ? (
            <p style={{ color: "var(--gray-500)" }}>No coupons yet.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table className="atable">
                <thead>
                  <tr><th>Code</th><th>Type</th><th>Value</th><th>Min Order</th><th>Expiry</th><th>Used</th><th>Status</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {coupons.map((c) => (
                    <tr key={c.id}>
                      <td style={{ fontWeight: 700 }}>{c.code}</td>
                      <td style={{ textTransform: "capitalize" }}>{c.type}</td>
                      <td>{c.type === "percent" ? `${c.value}%` : `₹${Number(c.value).toFixed(0)}`}</td>
                      <td>₹{Number(c.min_order_amount).toFixed(0)}</td>
                      <td>{c.expiry_date ? new Date(c.expiry_date).toLocaleDateString() : "—"}</td>
                      <td>{c.usage_count}</td>
                      <td><span className={`abadge ${c.status === "active" ? "delivered" : "cancelled"}`}>{c.status}</span></td>
                      <td>
                        <div style={{ display: "flex", gap: 8 }}>
                          <button onClick={() => toggleStatus(c.id, c.status)} style={{ color: "var(--primary)", fontWeight: 700, background: "none", border: "none", cursor: "pointer", fontSize: 13 }}>
                            {c.status === "active" ? "Deactivate" : "Activate"}
                          </button>
                          <button onClick={() => remove(c.id, c.code)} style={{ color: "#ef4444", fontWeight: 700, background: "none", border: "none", cursor: "pointer", fontSize: 13 }}>Delete</button>
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
