"use client";
import { useEffect, useState, use } from "react";
import Link from "next/link";

const STATUSES = ["placed", "packed", "shipped", "delivered", "cancelled"];

export default function AdminOrderDetailPage({ params }) {
  const { id } = use(params);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const load = () => {
    fetch(`/api/admin/orders/${id}`)
      .then((res) => res.json())
      .then((d) => {
        if (d.ok) setData(d);
        else setError(d.error || "Could not load order.");
      })
      .catch(() => setError("Network error."));
  };

  useEffect(load, [id]);

  const updateStatus = async (status) => {
    setSaving(true);
    const res = await fetch(`/api/admin/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const d = await res.json();
    setSaving(false);
    if (d.ok) load();
    else alert(d.error || "Could not update status.");
  };

  if (error) return <div className="gd-card"><div className="gd-card-body" style={{ color: "#ef4444" }}>{error}</div></div>;
  if (!data) return <p style={{ color: "var(--gray-500)" }}>Loading…</p>;

  const { order, items } = data;

  return (
    <div>
      <div className="section-label" style={{ margin: "0 0 1rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span><i className="fas fa-receipt" /> Order {order.order_number}</span>
        <Link href="/admin/orders" className="abtn">← Back to Orders</Link>
      </div>

      <div className="gd-card">
        <div className="gd-card-body">
          <h5 style={{ fontWeight: 700, marginBottom: 12 }}>Status</h5>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {STATUSES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => updateStatus(s)}
                disabled={saving}
                className={`abtn ${s === order.status ? "abtn-primary" : ""}`}
                style={{ textTransform: "capitalize" }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="gd-card">
        <div className="gd-card-body">
          <h5 style={{ fontWeight: 700, marginBottom: 12 }}>Delivery Details</h5>
          <table className="atable">
            <tbody>
              <tr><td style={{ fontWeight: 600, width: 160 }}>Name</td><td>{order.name}</td></tr>
              <tr><td style={{ fontWeight: 600 }}>Phone</td><td>{order.phone}</td></tr>
              <tr><td style={{ fontWeight: 600 }}>Address</td><td>{order.address}, {order.city} — {order.pincode}</td></tr>
              <tr><td style={{ fontWeight: 600 }}>Payment Method</td><td style={{ textTransform: "uppercase" }}>{order.payment_method}</td></tr>
              <tr><td style={{ fontWeight: 600 }}>Order Date</td><td>{new Date(order.created_at).toLocaleString()}</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="gd-card">
        <div className="gd-card-body">
          <h5 style={{ fontWeight: 700, marginBottom: 12 }}>Items</h5>
          <table className="atable">
            <thead>
              <tr><th>Item</th><th>Qty</th><th>Price</th><th>Total</th></tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it.id}>
                  <td>{it.title}</td>
                  <td>{it.qty}</td>
                  <td>₹{Number(it.price)}</td>
                  <td>₹{(Number(it.price) * it.qty).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: 16, borderTop: "1px solid var(--gray-200)", paddingTop: 14, maxWidth: 300, marginLeft: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", fontSize: 14 }}><span>Subtotal</span><span>₹{Number(order.subtotal).toFixed(2)}</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", fontSize: 14 }}><span>Delivery</span><span>₹{Number(order.delivery_fee).toFixed(2)}</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0 0", fontSize: 16, fontWeight: 700, borderTop: "1px solid var(--gray-200)", marginTop: 4 }}><span>Total</span><span>₹{Number(order.total).toFixed(2)}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
