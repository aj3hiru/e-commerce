"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState("");

  const load = () => {
    fetch("/api/admin/reviews")
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) setReviews(data.reviews);
        else setError(data.error || "Could not load reviews.");
      })
      .catch(() => setError("Network error."));
  };

  useEffect(load, []);

  const setStatus = async (id, status) => {
    const res = await fetch(`/api/admin/reviews/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    if (data.ok) load();
    else alert(data.error || "Could not update.");
  };

  const remove = async (id) => {
    if (!confirm("Delete this review?")) return;
    const res = await fetch(`/api/admin/reviews/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.ok) load();
    else alert(data.error || "Could not delete.");
  };

  if (error) return <div className="gd-card"><div className="gd-card-body" style={{ color: "#ef4444" }}>{error}</div></div>;
  if (!reviews) return <p style={{ color: "var(--gray-500)" }}>Loading…</p>;

  return (
    <div>
      <div className="section-label"><i className="fas fa-star-half-alt" /> Product Reviews ({reviews.length})</div>

      <div className="gd-card">
        <div className="gd-card-body">
          {reviews.length === 0 ? (
            <p style={{ color: "var(--gray-500)" }}>No reviews submitted yet.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table className="atable">
                <thead>
                  <tr><th>Product</th><th>Customer</th><th>Rating</th><th>Review</th><th>Status</th><th>Date</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {reviews.map((r) => (
                    <tr key={r.id}>
                      <td><Link href={`/product/${r.product_slug}`} target="_blank" style={{ color: "var(--primary)" }}>{r.product_title}</Link></td>
                      <td>{r.customer_name}</td>
                      <td>{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</td>
                      <td style={{ maxWidth: 260 }}>{r.text || <em style={{ color: "var(--gray-400)" }}>No comment</em>}</td>
                      <td>
                        <span className={`abadge ${r.status === "approved" ? "delivered" : r.status === "rejected" ? "cancelled" : "placed"}`}>{r.status}</span>
                      </td>
                      <td>{new Date(r.created_at).toLocaleDateString()}</td>
                      <td>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                          {r.status !== "approved" && (
                            <button onClick={() => setStatus(r.id, "approved")} style={{ color: "#10b981", fontWeight: 700, background: "none", border: "none", cursor: "pointer", fontSize: 13 }}>Approve</button>
                          )}
                          {r.status !== "rejected" && (
                            <button onClick={() => setStatus(r.id, "rejected")} style={{ color: "#f59e0b", fontWeight: 700, background: "none", border: "none", cursor: "pointer", fontSize: 13 }}>Reject</button>
                          )}
                          <button onClick={() => remove(r.id)} style={{ color: "#ef4444", fontWeight: 700, background: "none", border: "none", cursor: "pointer", fontSize: 13 }}>Delete</button>
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
