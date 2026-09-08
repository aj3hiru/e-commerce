import { redirect } from "next/navigation";
import Link from "next/link";
import { isAdminSession } from "@/lib/auth";
import AdminLogoutButton from "@/components/AdminLogoutButton";

export default async function AdminDashboardLayout({ children }) {
  const authed = await isAdminSession();
  if (!authed) redirect("/admin/login");

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="brand">Cmart Ready Admin</div>
        <nav>
          <Link href="/admin">📊 Dashboard</Link>
          <Link href="/admin/products">📦 Products</Link>
          <Link href="/admin/orders">🧾 Orders</Link>
          <Link href="/" target="_blank">🌐 View Store</Link>
        </nav>
        <div className="logout-row">
          <AdminLogoutButton />
        </div>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
