"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SITE } from "@/lib/siteData";

export default function AdminShell({ customer, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(true);
  const [ordersOpen, setOrdersOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href, exact = false) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  const initial = customer?.name?.[0]?.toUpperCase() || "A";

  return (
    <div className="admin-scope">
      <div className="admin-container">
        <div className={`sidebar-overlay ${sidebarOpen ? "active" : ""}`} onClick={() => setSidebarOpen(false)} />

        <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
          <div className="sidebar-header">
            <Link href="/admin" className="brand">
              <div className="brand-icon">
                <i className="fas fa-cube" />
              </div>
              <span>{SITE.name}</span>
            </Link>
            <button className="close-sidebar" onClick={() => setSidebarOpen(false)}>
              <i className="fas fa-times" />
            </button>
          </div>

          <nav className="admin-sidebar-nav">
            <div className="nav-section">
              <div className="nav-title">Main</div>
              <Link href="/admin" className={`nav-link ${isActive("/admin", true) ? "active" : ""}`}>
                <i className="fas fa-home" /> Dashboard
              </Link>
            </div>

            <div className="nav-section">
              <div className="nav-title">Manage Products</div>
              <div className="nav-parent-row">
                <Link href="/admin/products" className={`nav-link ${isActive("/admin/products") ? "active" : ""}`}>
                  <i className="fas fa-boxes" /> All Products
                </Link>
                <button type="button" className={`nav-expand-btn ${productsOpen ? "open" : ""}`} onClick={() => setProductsOpen((o) => !o)}>
                  <i className="fas fa-chevron-down" />
                </button>
              </div>
              <div className={`nav-submenu ${productsOpen ? "open" : ""}`}>
                <Link href="/admin/products/new" className={`nav-link ${isActive("/admin/products/new") ? "active" : ""}`}>
                  <i className="fas fa-plus-square" /> Add Product
                </Link>
              </div>
            </div>

            <div className="nav-section">
              <div className="nav-title">Manage Orders</div>
              <div className="nav-parent-row">
                <Link href="/admin/orders" className={`nav-link ${isActive("/admin/orders") ? "active" : ""}`}>
                  <i className="fas fa-receipt" /> All Orders
                </Link>
                <button type="button" className={`nav-expand-btn ${ordersOpen ? "open" : ""}`} onClick={() => setOrdersOpen((o) => !o)}>
                  <i className="fas fa-chevron-down" />
                </button>
              </div>
              <div className={`nav-submenu ${ordersOpen ? "open" : ""}`}>
                <Link href="/admin/orders?status=placed" className="nav-link">
                  <i className="fas fa-hourglass-half" /> Pending Orders
                </Link>
                <Link href="/admin/orders?status=shipped" className="nav-link">
                  <i className="fas fa-truck-loading" /> In Progress
                </Link>
                <Link href="/admin/orders?status=delivered" className="nav-link">
                  <i className="fas fa-truck" /> Delivered Orders
                </Link>
                <Link href="/admin/orders?status=cancelled" className="nav-link">
                  <i className="fas fa-ban" /> Canceled Orders
                </Link>
              </div>
            </div>

            <div className="nav-section">
              <div className="nav-title">System</div>
              <Link href="/" target="_blank" className="nav-link">
                <i className="fas fa-store" /> View Store
              </Link>
              <button type="button" onClick={handleLogout} className="nav-link" style={{ width: "100%", border: "none", background: "none", cursor: "pointer", color: "#ef4444" }}>
                <i className="fas fa-sign-out-alt" /> Logout
              </button>
            </div>
          </nav>
        </aside>

        <main className="main-content">
          <header className="top-nav">
            <div className="nav-left">
              <button className="menu-toggle" onClick={() => setSidebarOpen(true)}>
                <i className="fas fa-bars" />
              </button>
              <span className="sitename-mob">{SITE.name}</span>
              <div className="page-heading-mini">
                <h1>E-commerce Dashboard</h1>
                <p>A live overview of your store</p>
              </div>
            </div>
            <div className="nav-right">
              <div className="gsearch-wrap">
                <i className="fas fa-search gsearch-icon" />
                <input
                  type="text"
                  className="gsearch-input"
                  placeholder="Order ID, name, mobile…"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.target.value.trim()) {
                      router.push(`/admin/orders?search=${encodeURIComponent(e.target.value.trim())}`);
                    }
                  }}
                />
              </div>
              <div className="header-user-wrap">
                <button className="header-user" type="button" onClick={() => setUserMenuOpen((o) => !o)}>
                  <div className="avatar">{initial}</div>
                  <div className="info">
                    <div className="name">{customer?.name || "Admin"}</div>
                    <div className="role">Admin</div>
                  </div>
                </button>
                <ul className={`header-user-menu ${userMenuOpen ? "show" : ""}`}>
                  <li>
                    <button type="button" className="dropdown-item" onClick={handleLogout}>
                      <i className="fas fa-sign-out-alt" /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </header>

          <div className="content-wrapper">{children}</div>
        </main>
      </div>
    </div>
  );
}
