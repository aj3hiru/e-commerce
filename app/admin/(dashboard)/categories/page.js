"use client";
import { useEffect, useState } from "react";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [error, setError] = useState("");
  const [newCatName, setNewCatName] = useState("");
  const [newSubName, setNewSubName] = useState("");
  const [newSubParent, setNewSubParent] = useState("");
  const [editing, setEditing] = useState(null); // { id, name, isSubcategory }

  const load = () => {
    fetch("/api/admin/categories")
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          setCategories(data.categories);
          setSubcategories(data.subcategories);
        } else setError(data.error || "Could not load categories.");
      })
      .catch(() => setError("Network error."));
  };

  useEffect(load, []);

  const addCategory = async (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    const res = await fetch("/api/admin/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newCatName.trim() }),
    });
    const data = await res.json();
    if (data.ok) { setNewCatName(""); load(); }
    else alert(data.error || "Could not add category.");
  };

  const addSubcategory = async (e) => {
    e.preventDefault();
    if (!newSubName.trim() || !newSubParent) return;
    const res = await fetch("/api/admin/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newSubName.trim(), parentId: newSubParent }),
    });
    const data = await res.json();
    if (data.ok) { setNewSubName(""); load(); }
    else alert(data.error || "Could not add subcategory.");
  };

  const saveEdit = async () => {
    const res = await fetch(`/api/admin/categories/${editing.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editing.name, isSubcategory: editing.isSubcategory }),
    });
    const data = await res.json();
    if (data.ok) { setEditing(null); load(); }
    else alert(data.error || "Could not save.");
  };

  const remove = async (id, isSubcategory, name) => {
    if (!confirm(`Delete "${name}"? Products in it won't be deleted, just unlinked.`)) return;
    const res = await fetch(`/api/admin/categories/${id}${isSubcategory ? "?sub=1" : ""}`, { method: "DELETE" });
    const data = await res.json();
    if (data.ok) load();
    else alert(data.error || "Could not delete.");
  };

  if (error) return <div className="gd-card"><div className="gd-card-body" style={{ color: "#ef4444" }}>{error}</div></div>;
  if (!categories) return <p style={{ color: "var(--gray-500)" }}>Loading…</p>;

  return (
    <div>
      <div className="section-label"><i className="fas fa-list" /> Manage Categories</div>

      <div className="gd-card">
        <div className="gd-card-body">
          <h5 style={{ fontWeight: 700, marginBottom: 12 }}>Add Category</h5>
          <form onSubmit={addCategory} style={{ display: "flex", gap: 10 }}>
            <input
              type="text"
              placeholder="Category name"
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              style={{ flex: 1, border: "1px solid var(--gray-300)", borderRadius: 6, padding: "8px 12px", fontSize: 14 }}
            />
            <button type="submit" className="abtn abtn-primary">Add</button>
          </form>
        </div>
      </div>

      <div className="gd-card">
        <div className="gd-card-body">
          <h5 style={{ fontWeight: 700, marginBottom: 12 }}>Categories ({categories.length})</h5>
          <table className="atable">
            <thead><tr><th>Name</th><th>Slug</th><th>Actions</th></tr></thead>
            <tbody>
              {categories.map((c) => (
                <tr key={c.id}>
                  <td>
                    {editing?.id === c.id && !editing.isSubcategory ? (
                      <input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} style={{ border: "1px solid var(--gray-300)", borderRadius: 4, padding: "4px 8px" }} />
                    ) : c.name}
                  </td>
                  <td>{c.slug}</td>
                  <td>
                    {editing?.id === c.id && !editing.isSubcategory ? (
                      <div style={{ display: "flex", gap: 8 }}>
                        <button onClick={saveEdit} style={{ color: "var(--primary)", fontWeight: 700, background: "none", border: "none", cursor: "pointer" }}>Save</button>
                        <button onClick={() => setEditing(null)} style={{ color: "var(--gray-500)", background: "none", border: "none", cursor: "pointer" }}>Cancel</button>
                      </div>
                    ) : (
                      <div style={{ display: "flex", gap: 8 }}>
                        <button onClick={() => setEditing({ id: c.id, name: c.name, isSubcategory: false })} style={{ color: "var(--primary)", fontWeight: 700, background: "none", border: "none", cursor: "pointer" }}>Edit</button>
                        <button onClick={() => remove(c.id, false, c.name)} style={{ color: "#ef4444", fontWeight: 700, background: "none", border: "none", cursor: "pointer" }}>Delete</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="gd-card">
        <div className="gd-card-body">
          <h5 style={{ fontWeight: 700, marginBottom: 12 }}>Add Subcategory</h5>
          <form onSubmit={addSubcategory} style={{ display: "flex", gap: 10 }}>
            <select value={newSubParent} onChange={(e) => setNewSubParent(e.target.value)} style={{ border: "1px solid var(--gray-300)", borderRadius: 6, padding: "8px 12px", fontSize: 14 }}>
              <option value="">Select Category</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <input
              type="text"
              placeholder="Subcategory name"
              value={newSubName}
              onChange={(e) => setNewSubName(e.target.value)}
              style={{ flex: 1, border: "1px solid var(--gray-300)", borderRadius: 6, padding: "8px 12px", fontSize: 14 }}
            />
            <button type="submit" className="abtn abtn-primary">Add</button>
          </form>
        </div>
      </div>

      <div className="gd-card">
        <div className="gd-card-body">
          <h5 style={{ fontWeight: 700, marginBottom: 12 }}>Subcategories ({subcategories.length})</h5>
          <table className="atable">
            <thead><tr><th>Name</th><th>Parent Category</th><th>Actions</th></tr></thead>
            <tbody>
              {subcategories.map((s) => (
                <tr key={s.id}>
                  <td>
                    {editing?.id === s.id && editing.isSubcategory ? (
                      <input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} style={{ border: "1px solid var(--gray-300)", borderRadius: 4, padding: "4px 8px" }} />
                    ) : s.name}
                  </td>
                  <td>{categories.find((c) => c.id === s.category_id)?.name || "—"}</td>
                  <td>
                    {editing?.id === s.id && editing.isSubcategory ? (
                      <div style={{ display: "flex", gap: 8 }}>
                        <button onClick={saveEdit} style={{ color: "var(--primary)", fontWeight: 700, background: "none", border: "none", cursor: "pointer" }}>Save</button>
                        <button onClick={() => setEditing(null)} style={{ color: "var(--gray-500)", background: "none", border: "none", cursor: "pointer" }}>Cancel</button>
                      </div>
                    ) : (
                      <div style={{ display: "flex", gap: 8 }}>
                        <button onClick={() => setEditing({ id: s.id, name: s.name, isSubcategory: true })} style={{ color: "var(--primary)", fontWeight: 700, background: "none", border: "none", cursor: "pointer" }}>Edit</button>
                        <button onClick={() => remove(s.id, true, s.name)} style={{ color: "#ef4444", fontWeight: 700, background: "none", border: "none", cursor: "pointer" }}>Delete</button>
                      </div>
                    )}
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
