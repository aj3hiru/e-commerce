"use client";
import { useEffect, useState } from "react";

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState(null);
  const [error, setError] = useState("");

  const load = () => {
    fetch("/api/admin/customers")
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) setCustomers(data.customers);
        else setError(data.error || "Could not load customers.");
      })
      .catch(() => setError("Network error."));
  };

  useEffect(load, []);

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "blocked" ? "active" : "blocked";
    const res = await fetch(`/api/admin/customers/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    const data = await res.json();
    if (data.ok) load();
    else alert(data.error || "Could not update.");
  };

  if (error) return <div className="gd-card"><div className="gd-card-body" style={{ color: "#ef4444" }}>{error}</div></div>;
  if (!customers) return <p style={{ color: "var(--gray-500)" }}>Loading…</p>;

  return (
    <div>
      <div className="section-label"><i className="fas fa-user-friends" /> Customer List ({customers.length})</div>

      <div className="gd-card">
        <div className="gd-card-body">
          {customers.length === 0 ? (
            <p style={{ color: "var(--gray-500)" }}>No customers yet.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table className="atable">
                <thead>
                  <tr>
                    <th>Name</th><th>Email</th><th>Phone</th><th>Orders</th><th>Total Spent</th><th>Status</th><th>Joined</th><th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((c) => (
                    <tr key={c.id}>
                      <td>{c.name}{c.username && <div style={{ fontSize: 11, color: "var(--gray-400)" }}>@{c.username}</div>}</td>
                      <td>{c.email}</td>
                      <td>{c.phone || "—"}</td>
                      <td>{c.order_count}</td>
                      <td>₹{Number(c.total_spent).toFixed(2)}</td>
                      <td>
                        <span className={`abadge ${c.status === "blocked" ? "cancelled" : "delivered"}`}>{c.status || "active"}</span>
                      </td>
                      <td>{new Date(c.created_at).toLocaleDateString()}</td>
                      <td>
                        <button
                          type="button"
                          onClick={() => toggleStatus(c.id, c.status)}
                          className="abtn"
                          style={c.status === "blocked" ? {} : { color: "#ef4444", borderColor: "#ef4444" }}
                        >
                          {c.status === "blocked" ? "Unblock" : "Block"}
                        </button>
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
