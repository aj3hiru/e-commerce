"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
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
          <h1>Welcome Back</h1>
          <p className="sub">Login to your Cmart Ready account</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email or Mobile Number</label>
              <input type="text" placeholder="you@example.com" required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="••••••••" required />
            </div>
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
