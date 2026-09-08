import Link from "next/link";
import { getSessionCustomer } from "@/lib/auth";
import { getSql } from "@/lib/db";
import LogoutButton from "@/components/LogoutButton";

export const dynamic = "force-dynamic";

async function getAccountData() {
  const customer = await getSessionCustomer();
  if (!customer) return null;

  const sql = getSql();
  const orders = await sql`
    SELECT order_number, total, status, created_at
    FROM orders WHERE customer_id = ${customer.id}
    ORDER BY created_at DESC LIMIT 10
  `;

  return { customer, orders };
}

export default async function AccountPage() {
  const data = await getAccountData();

  return (
    <div className="page-container">
      <div className="breadcrumb">
        <Link href="/">Home</Link>
        <span className="sep">/</span>
        <span className="current">My Account</span>
      </div>
      <div className="simple-page">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h1 style={{ marginBottom: 0 }}>My Account</h1>
          {data && <LogoutButton />}
        </div>

        {!data ? (
          <div className="account-card" style={{ marginTop: 20 }}>
            <h3>You're not logged in</h3>
            <p style={{ fontSize: 13.5, color: "var(--muted)", marginBottom: 16 }}>
              Login or create an account to see your profile and order history.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <Link href="/login" className="auth-submit" style={{ display: "inline-block", width: "auto", padding: "10px 22px" }}>
                Login
              </Link>
              <Link href="/register" style={{ display: "inline-block", padding: "10px 22px", border: "1px solid var(--border)", borderRadius: 6, fontWeight: 700, fontSize: 14 }}>
                Register
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="account-card" style={{ marginTop: 20 }}>
              <h3>Profile</h3>
              <div className="account-row"><span>Name</span><span>{data.customer.name}</span></div>
              <div className="account-row"><span>Email</span><span>{data.customer.email}</span></div>
              <div className="account-row"><span>Phone</span><span>{data.customer.phone || "Not set"}</span></div>
            </div>

            <div className="account-card">
              <h3>Recent Orders</h3>
              {data.orders.length === 0 ? (
                <p style={{ fontSize: 13.5, color: "var(--muted)" }}>No orders yet.</p>
              ) : (
                data.orders.map((o) => (
                  <div className="account-row" key={o.order_number}>
                    <span>#{o.order_number}</span>
                    <span>₹{Number(o.total).toFixed(0)} — {o.status}</span>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        <div className="account-card">
          <h3>Quick Links</h3>
          {data?.customer?.role === "admin" && (
            <div className="account-row"><Link href="/admin">Admin Panel</Link><span>→</span></div>
          )}
          <div className="account-row"><Link href="/order">Track an Order</Link><span>→</span></div>
          <div className="account-row"><Link href="/wishlist">My Wishlist</Link><span>→</span></div>
          <div className="account-row"><Link href="/cart">My Cart</Link><span>→</span></div>
        </div>
      </div>
    </div>
  );
}
