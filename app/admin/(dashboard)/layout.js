import { redirect } from "next/navigation";
import Link from "next/link";
import { getSessionCustomer } from "@/lib/auth";
import AdminLogoutButton from "@/components/AdminLogoutButton";
import { AdmIcons } from "@/components/admin/AdmIcons";
import AdminTopSearch from "@/components/admin/AdminTopSearch";
import { SITE } from "@/lib/siteData";

export default async function AdminDashboardLayout({ children }) {
  const customer = await getSessionCustomer();
  if (!customer) redirect("/login");
  if (customer.role !== "admin") redirect("/account");

  return (
    <div className="adm-shell">
      <aside className="adm-sidebar">
        <Link href="/admin" className="adm-brand">
          <div className="adm-brand-icon">
            <AdmIcons.Boxes width={19} height={19} />
          </div>
          <span>{SITE.name}</span>
        </Link>

        <div className="adm-nav-section">
          <div className="adm-nav-title">Main</div>
          <Link href="/admin" className="adm-nav-link">
            <AdmIcons.Dashboard /> Dashboard
          </Link>
        </div>

        <div className="adm-nav-section">
          <div className="adm-nav-title">Manage Products</div>
          <Link href="/admin/products" className="adm-nav-link">
            <AdmIcons.Boxes /> All Products
          </Link>
          <Link href="/admin/products/new" className="adm-nav-link">
            <AdmIcons.Plus /> Add Product
          </Link>
        </div>

        <div className="adm-nav-section">
          <div className="adm-nav-title">Sales</div>
          <Link href="/admin/orders" className="adm-nav-link">
            <AdmIcons.Receipt /> Orders
          </Link>
        </div>

        <div className="adm-nav-section">
          <div className="adm-nav-title">System</div>
          <Link href="/" target="_blank" className="adm-nav-link">
            <AdmIcons.Store /> View Store
          </Link>
          <AdminLogoutButton />
        </div>
      </aside>

      <div className="adm-main">
        <header className="adm-topnav">
          <div className="adm-page-heading">
            <h1>E-commerce Dashboard</h1>
            <p>A live overview of your store</p>
          </div>
          <div className="adm-topnav-right">
            <AdminTopSearch />
            <div className="adm-user">
              <span className="avatar">{customer.name?.[0]?.toUpperCase() || "A"}</span>
              <div className="info">
                <div className="name">{customer.name}</div>
                <div className="role">Admin</div>
              </div>
            </div>
          </div>
        </header>

        <div className="adm-content">{children}</div>
      </div>
    </div>
  );
}
