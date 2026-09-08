"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/orders")
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) setOrders(data.orders);
        else setError(data.error || "Could not load orders.");
      })
      .catch(() => setError("Network error loading orders."));
  }, []);

  return (
    <div>
      <div className="admin-header">
        <h1>Orders</h1>
      </div>

      {error && <div className="admin-card" style={{ color: "#c62828" }}>{error}</div>}

      <div className="admin-card">
        {!orders ? (
          <p style={{ color: "var(--muted)", fontSize: 13.5 }}>Loading…</p>
        ) : orders.length === 0 ? (
          <p style={{ color: "var(--muted)", fontSize: 13.5 }}>No orders yet.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Customer</th>
                <th>City</th>
                <th>Payment</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td>#{o.order_number}</td>
                  <td>{o.name}</td>
                  <td>{o.city}</td>
                  <td style={{ textTransform: "uppercase" }}>{o.payment_method}</td>
                  <td>₹{Number(o.total).toFixed(0)}</td>
                  <td><span className={`status-badge ${o.status}`}>{o.status}</span></td>
                  <td>{new Date(o.created_at).toLocaleDateString()}</td>
                  <td><Link href={`/admin/orders/${o.id}`}>View →</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
