"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.target);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: form.get("identifier"), password: form.get("password") }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Login failed. Please try again.");
        setLoading(false);
        return;
      }
      router.push(data.role === "admin" ? "/admin" : "/account");
      router.refresh();
    } catch {
      setError("Network error — please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="auth-wrap">
        <div className="auth-card">
          <h1>Welcome Back</h1>
          <p className="sub">Login to your Cmart Ready account</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email / Mobile Number / Username</label>
              <input name="identifier" type="text" placeholder="you@example.com / 98765xxxxx / username" required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input name="password" type="password" placeholder="••••••••" required />
            </div>
            {error && <p style={{ color: "#c62828", fontSize: 13, marginBottom: 12 }}>{error}</p>}
            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? "Logging in…" : "Login"}
            </button>
          </form>

          <div className="auth-divider">or</div>

          <p className="auth-switch">
            New to Cmart Ready? <Link href="/register">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
