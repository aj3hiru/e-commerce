"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push("/account");
    }, 600);
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
              <input type="text" placeholder="Your full name" required />
            </div>
            <div className="form-group">
              <label>Mobile Number</label>
              <input type="tel" placeholder="10-digit mobile number" required pattern="[0-9]{10}" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="you@example.com" required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="Create a password" required minLength={6} />
            </div>
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
