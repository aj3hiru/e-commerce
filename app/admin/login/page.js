"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.target);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: form.get("password") }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Login failed.");
        setLoading(false);
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Network error — please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-wrap">
      <div className="admin-login-card">
        <h1>Admin Panel</h1>
        <p>Cmart Ready — Store Management</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Admin Password</label>
            <input name="password" type="password" placeholder="••••••••" required autoFocus />
          </div>
          {error && <p style={{ color: "#c62828", fontSize: 13, marginBottom: 12 }}>{error}</p>}
          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? "Logging in…" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
