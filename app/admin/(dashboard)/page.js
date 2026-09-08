"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) setStats(data);
        else setError(data.error || "Could not load stats.");
      })
      .catch(() => setError("Network error loading dashboard."));
  }, []);

  return (
    <div>
      <div className="admin-header">
        <h1>Dashboard</h1>
      </div>

      {error && <div className="admin-card" style={{ color: "#c62828" }}>{error}</div>}

      {stats && (
        <>
          <div className="admin-stats-grid">
            <div className="admin-stat-card">
              <div className="label">Total Products</div>
              <div className="value">{stats.products}</div>
            </div>
            <div className="admin-stat-card">
              <div className="label">Total Orders</div>
              <div className="value">{stats.orders}</div>
            </div>
            <div className="admin-stat-card">
              <div className="label">Total Customers</div>
              <div className="value">{stats.customers}</div>
            </div>
            <div className="admin-stat-card">
              <div className="label">Total Revenue</div>
              <div className="value">₹{stats.revenue.toFixed(0)}</div>
            </div>
          </div>

          <div className="admin-card">
            <h2>Recent Orders</h2>
            {stats.recentOrders.length === 0 ? (
              <p style={{ color: "var(--muted)", fontSize: 13.5 }}>No orders yet.</p>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Order #</th>
                    <th>Customer</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentOrders.map((o) => (
                    <tr key={o.id}>
                      <td>#{o.order_number}</td>
                      <td>{o.name}</td>
                      <td>₹{Number(o.total).toFixed(0)}</td>
                      <td><span className={`status-badge ${o.status}`}>{o.status}</span></td>
                      <td><Link href={`/admin/orders/${o.id}`}>View →</Link></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
}
