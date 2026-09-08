"use client";
import { useEffect, useState } from "react";

export default function AdminUsersPage() {
  const [admins, setAdmins] = useState(null);
  const [error, setError] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState("");

  const load = () => {
    fetch("/api/admin/users")
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) setAdmins(data.admins);
        else setError(data.error || "Could not load users.");
      })
      .catch(() => setError("Network error."));
  };

  useEffect(load, []);

  const promote = async (e) => {
    e.preventDefault();
    if (!newEmail.trim()) return;
    setAdding(true);
    setAddError("");
    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: newEmail.trim() }),
    });
    const data = await res.json();
    setAdding(false);
    if (data.ok) { setNewEmail(""); load(); }
    else setAddError(data.error || "Could not promote user.");
  };

  const demote = async (id, name) => {
    if (!confirm(`Remove admin access for "${name}"? They'll become a regular customer.`)) return;
    const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.ok) load();
    else alert(data.error || "Could not update.");
  };

  if (error) return <div className="gd-card"><div className="gd-card-body" style={{ color: "#ef4444" }}>{error}</div></div>;
  if (!admins) return <p style={{ color: "var(--gray-500)" }}>Loading…</p>;

  return (
    <div>
      <div className="section-label"><i className="fas fa-user" /> Users Manager</div>

      <div className="gd-card">
        <div className="gd-card-body">
          <h5 style={{ fontWeight: 700, marginBottom: 8 }}>Add Admin</h5>
          <p style={{ fontSize: 13, color: "var(--gray-500)", marginBottom: 12 }}>
            The person must already have a customer account (they can register at /register first). Enter their email to grant admin access.
          </p>
          <form onSubmit={promote} style={{ display: "flex", gap: 10 }}>
            <input
              type="email"
              placeholder="customer@example.com"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              style={{ flex: 1, border: "1px solid var(--gray-300)", borderRadius: 6, padding: "8px 12px", fontSize: 14 }}
            />
            <button type="submit" className="abtn abtn-primary" disabled={adding}>{adding ? "Adding…" : "Grant Admin"}</button>
          </form>
          {addError && <p style={{ color: "#ef4444", fontSize: 13, marginTop: 8 }}>{addError}</p>}
        </div>
      </div>

      <div className="gd-card">
        <div className="gd-card-body">
          <h5 style={{ fontWeight: 700, marginBottom: 12 }}>Current Admins ({admins.length})</h5>
          <table className="atable">
            <thead><tr><th>Name</th><th>Email</th><th>Username</th><th>Since</th><th>Actions</th></tr></thead>
            <tbody>
              {admins.map((a) => (
                <tr key={a.id}>
                  <td>{a.name}</td>
                  <td>{a.email}</td>
                  <td>{a.username || "—"}</td>
                  <td>{new Date(a.created_at).toLocaleDateString()}</td>
                  <td>
                    <button onClick={() => demote(a.id, a.name)} style={{ color: "#ef4444", fontWeight: 700, background: "none", border: "none", cursor: "pointer", fontSize: 13 }}>
                      Remove Admin Access
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
