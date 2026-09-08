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

  if (error) return <div className="admin-card" style={{ color: "#c62828" }}>{error}</div>;
  if (!data) return <p style={{ color: "var(--muted)" }}>Loading…</p>;

  const { order, items } = data;

  return (
    <div>
      <div className="admin-header">
        <h1>Order #{order.order_number}</h1>
        <Link href="/admin/orders" className="admin-btn secondary">← Back to Orders</Link>
      </div>

      <div className="admin-card">
        <h2>Status</h2>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {STATUSES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => updateStatus(s)}
              disabled={saving}
              className={s === order.status ? "admin-btn" : "admin-btn secondary"}
              style={{ textTransform: "capitalize" }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="admin-card">
        <h2>Delivery Details</h2>
        <div className="account-row"><span>Name</span><span>{order.name}</span></div>
        <div className="account-row"><span>Phone</span><span>{order.phone}</span></div>
        <div className="account-row"><span>Address</span><span>{order.address}, {order.city} — {order.pincode}</span></div>
        <div className="account-row"><span>Payment Method</span><span style={{ textTransform: "uppercase" }}>{order.payment_method}</span></div>
        <div className="account-row"><span>Order Date</span><span>{new Date(order.created_at).toLocaleString()}</span></div>
      </div>

      <div className="admin-card">
        <h2>Items</h2>
        <table className="admin-table">
          <thead>
            <tr><th>Item</th><th>Qty</th><th>Price</th><th>Total</th></tr>
          </thead>
          <tbody>
            {items.map((it) => (
              <tr key={it.id}>
                <td>{it.title}</td>
                <td>{it.qty}</td>
                <td>₹{Number(it.price)}</td>
                <td>₹{(Number(it.price) * it.qty).toFixed(0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: 16, borderTop: "1px solid var(--border)", paddingTop: 14 }}>
          <div className="row"><span>Subtotal</span><span>₹{Number(order.subtotal).toFixed(0)}</span></div>
          <div className="row"><span>Delivery</span><span>₹{Number(order.delivery_fee).toFixed(0)}</span></div>
          <div className="row total"><span>Total</span><span>₹{Number(order.total).toFixed(0)}</span></div>
        </div>
      </div>
    </div>
  );
}
