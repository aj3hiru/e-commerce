import { redirect } from "next/navigation";
import Link from "next/link";
import { getSessionCustomer } from "@/lib/auth";
import AdminLogoutButton from "@/components/AdminLogoutButton";

export default async function AdminDashboardLayout({ children }) {
  const customer = await getSessionCustomer();
  if (!customer) redirect("/login");
  if (customer.role !== "admin") redirect("/account");

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
