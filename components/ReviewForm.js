"use client";
import { useState } from "react";

export default function ReviewForm({ productSlug }) {
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productSlug, rating, text }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Could not submit review.");
      } else {
        setMessage(data.message || "Thanks for your review!");
        setText("");
        setRating(5);
      }
    } catch {
      setError("Network error — please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (message) {
    return <p style={{ color: "var(--green-dark)", fontSize: 13.5, marginBottom: 24, fontWeight: 600 }}>{message}</p>;
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 28, maxWidth: 480 }}>
      <div className="form-group">
        <label>Your Rating</label>
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))} style={{ width: 100 }}>
          {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} ★</option>)}
        </select>
      </div>
      <div className="form-group">
        <label>Your Review (optional)</label>
        <textarea rows={3} value={text} onChange={(e) => setText(e.target.value)} placeholder="Share your experience with this product…" />
      </div>
      {error && <p style={{ color: "#c62828", fontSize: 13, marginBottom: 10 }}>{error}</p>}
      <button type="submit" className="auth-submit" style={{ width: "auto", padding: "10px 24px" }} disabled={loading}>
        {loading ? "Submitting…" : "Submit Review"}
      </button>
    </form>
  );
}
