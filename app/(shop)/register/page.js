"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.target);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          phone: form.get("phone"),
          email: form.get("email"),
          username: form.get("username"),
          password: form.get("password"),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Could not create account. Please try again.");
        setLoading(false);
        return;
      }
      router.push("/account");
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
          <h1>Create Account</h1>
          <p className="sub">Sign up to start shopping with Cmart Ready</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input name="name" type="text" placeholder="Your full name" required />
            </div>
            <div className="form-group">
              <label>Mobile Number</label>
              <input name="phone" type="tel" placeholder="10-digit mobile number" required pattern="[0-9]{10}" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input name="email" type="email" placeholder="you@example.com" required />
            </div>
            <div className="form-group">
              <label>Username</label>
              <input name="username" type="text" placeholder="Choose a username" required minLength={3} pattern="[a-zA-Z0-9_.]+" title="Letters, numbers, underscore and dot only" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input name="password" type="password" placeholder="Create a password" required minLength={6} />
            </div>
            {error && <p style={{ color: "#c62828", fontSize: 13, marginBottom: 12 }}>{error}</p>}
            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? "Creating account…" : "Create Account"}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link href="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
