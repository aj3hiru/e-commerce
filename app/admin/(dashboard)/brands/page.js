"use client";
import { useEffect, useState } from "react";

export default function AdminBrandsPage() {
  const [brands, setBrands] = useState(null);
  const [error, setError] = useState("");
  const [newName, setNewName] = useState("");
  const [editing, setEditing] = useState(null);

  const load = () => {
    fetch("/api/admin/brands")
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) setBrands(data.brands);
        else setError(data.error || "Could not load brands.");
      })
      .catch(() => setError("Network error."));
  };

  useEffect(load, []);

  const addBrand = async (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const res = await fetch("/api/admin/brands", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName.trim() }),
    });
    const data = await res.json();
    if (data.ok) { setNewName(""); load(); }
    else alert(data.error || "Could not add brand.");
  };

  const saveEdit = async () => {
    const res = await fetch(`/api/admin/brands/${editing.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editing.name }),
    });
    const data = await res.json();
    if (data.ok) { setEditing(null); load(); }
    else alert(data.error || "Could not save.");
  };

  const remove = async (id, name) => {
    if (!confirm(`Delete "${name}"? Products using it will just lose the brand tag.`)) return;
    const res = await fetch(`/api/admin/brands/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.ok) load();
    else alert(data.error || "Could not delete.");
  };

  if (error) return <div className="gd-card"><div className="gd-card-body" style={{ color: "#ef4444" }}>{error}</div></div>;
  if (!brands) return <p style={{ color: "var(--gray-500)" }}>Loading…</p>;

  return (
    <div>
      <div className="section-label"><i className="fas fa-copyright" /> Brands</div>

      <div className="gd-card">
        <div className="gd-card-body">
          <h5 style={{ fontWeight: 700, marginBottom: 12 }}>Add Brand</h5>
          <form onSubmit={addBrand} style={{ display: "flex", gap: 10 }}>
            <input
              type="text"
              placeholder="Brand name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              style={{ flex: 1, border: "1px solid var(--gray-300)", borderRadius: 6, padding: "8px 12px", fontSize: 14 }}
            />
            <button type="submit" className="abtn abtn-primary">Add</button>
          </form>
        </div>
      </div>

      <div className="gd-card">
        <div className="gd-card-body">
          <h5 style={{ fontWeight: 700, marginBottom: 12 }}>All Brands ({brands.length})</h5>
          {brands.length === 0 ? (
            <p style={{ color: "var(--gray-500)" }}>No brands yet.</p>
          ) : (
            <table className="atable">
              <thead><tr><th>Name</th><th>Products</th><th>Actions</th></tr></thead>
              <tbody>
                {brands.map((b) => (
                  <tr key={b.id}>
                    <td>
                      {editing?.id === b.id ? (
                        <input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} style={{ border: "1px solid var(--gray-300)", borderRadius: 4, padding: "4px 8px" }} />
                      ) : b.name}
                    </td>
                    <td>{b.product_count}</td>
                    <td>
                      {editing?.id === b.id ? (
                        <div style={{ display: "flex", gap: 8 }}>
                          <button onClick={saveEdit} style={{ color: "var(--primary)", fontWeight: 700, background: "none", border: "none", cursor: "pointer" }}>Save</button>
                          <button onClick={() => setEditing(null)} style={{ color: "var(--gray-500)", background: "none", border: "none", cursor: "pointer" }}>Cancel</button>
                        </div>
                      ) : (
                        <div style={{ display: "flex", gap: 8 }}>
                          <button onClick={() => setEditing({ id: b.id, name: b.name })} style={{ color: "var(--primary)", fontWeight: 700, background: "none", border: "none", cursor: "pointer" }}>Edit</button>
                          <button onClick={() => remove(b.id, b.name)} style={{ color: "#ef4444", fontWeight: 700, background: "none", border: "none", cursor: "pointer" }}>Delete</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
