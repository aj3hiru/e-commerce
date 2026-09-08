"use client";
import { useRouter } from "next/navigation";

export default function AdminLogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      style={{
        background: "none",
        border: "1px solid rgba(255,255,255,0.2)",
        borderRadius: 6,
        padding: "9px 14px",
        fontSize: 13,
        fontWeight: 700,
        color: "#fff",
        width: "100%",
      }}
    >
      Logout
    </button>
  );
}
