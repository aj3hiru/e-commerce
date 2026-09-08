"use client";
import { useRouter } from "next/navigation";
import { AdmIcons } from "./admin/AdmIcons";

export default function AdminLogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  return (
    <button type="button" onClick={handleLogout} className="adm-nav-link" style={{ width: "100%", border: "none", background: "none", cursor: "pointer", color: "#c62828" }}>
      <AdmIcons.Logout /> Logout
    </button>
  );
}
