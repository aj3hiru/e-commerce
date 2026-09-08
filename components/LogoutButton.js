"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      style={{
        background: "none",
        border: "1px solid var(--border)",
        borderRadius: 6,
        padding: "8px 16px",
        fontSize: 13,
        fontWeight: 700,
        color: "#c62828",
      }}
    >
      {loading ? "Logging out…" : "Logout"}
    </button>
  );
}
