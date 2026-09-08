"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const RANGES = [
  { key: "today", label: "Today" },
  { key: "yesterday", label: "Yesterday" },
  { key: "7days", label: "7 Days" },
  { key: "this_month", label: "This Month" },
  { key: "prev_month", label: "Previous Month" },
];

const COLORS = {
  green: "#1cc88a",
  blue: "#4361ee",
  red: "#e74a5b",
  cyan: "#36b9cc",
  orange: "#f6c23e",
};

function StatCard({ color, icon, label, value, href }) {
  const bg = COLORS[color] || COLORS.blue;
  const inner = (
    <>
      <div className="stat-card-e-corner" style={{ background: bg }} />
      <div className="stat-icon-e" style={{ background: bg }}>
        <i className={`fas ${icon}`} />
      </div>
      <div>
        <div className="stat-label-e">{label}</div>
        <div className="stat-value-e">{value}</div>
      </div>
    </>
  );
  if (href) {
    return (
      <Link href={href} className="stat-card-e stat-card-e-clickable">
        {inner}
      </Link>
    );
  }
  return <div className="stat-card-e">{inner}</div>;
}

export default function AdminDashboardPage() {
  const [range, setRange] = useState("today");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const load = (r, from, to) => {
    const params = new URLSearchParams({ range: r });
    if (r === "custom") {
      params.set("from", from);
      params.set("to", to);
    }
    fetch(`/api/admin/stats?${params.toString()}`)
      .then((res) => res.json())
      .then((d) => {
        if (d.ok) setData(d);
        else setError(d.error || "Could not load dashboard.");
      })
      .catch(() => setError("Network error loading dashboard."));
  };

  useEffect(() => {
    load("today");
  }, []);

  const handleRangeClick = (r) => {
    setRange(r);
    load(r);
  };

  const handleCustomApply = (e) => {
    e.preventDefault();
    setRange("custom");
    load("custom", customFrom, customTo);
  };

  if (error) return <div className="gd-card"><div className="gd-card-body" style={{ color: "#ef4444" }}>{error}</div></div>;
  if (!data) return <p style={{ color: "var(--gray-500)" }}>Loading…</p>;

  return (
    <div>
      <div className="range-bar">
        <span className="range-bar-label">Showing: <strong>{data.rangeLabel}</strong></span>
        <div className="btn-group">
          {RANGES.map((r) => (
            <button
              key={r.key}
              type="button"
              className={`abtn ${range === r.key ? "abtn-primary" : ""}`}
              onClick={() => handleRangeClick(r.key)}
            >
              {r.label}
            </button>
          ))}
        </div>
        <form className="range-bar-custom" onSubmit={handleCustomApply}>
          <input type="date" className="adate-input" value={customFrom} onChange={(e) => setCustomFrom(e.target.value)} required />
          <span style={{ fontSize: 12, color: "var(--gray-500)" }}>to</span>
          <input type="date" className="adate-input" value={customTo} onChange={(e) => setCustomTo(e.target.value)} required />
          <button type="submit" className="abtn abtn-secondary">Apply</button>
        </form>
      </div>

      <div className="section-label"><i className="fas fa-globe" /> Online Platform</div>
      <div className="stat-row-e">
        <StatCard color="green" icon="fa-shopping-cart" label="Total Orders" value={data.orders.total} href="/admin/orders" />
        <StatCard color="green" icon="fa-hourglass-half" label="Pending Orders" value={data.orders.placed} href="/admin/orders?status=placed" />
        <StatCard color="green" icon="fa-truck-loading" label="In Progress" value={data.orders.packed + data.orders.shipped} href="/admin/orders?status=shipped" />
        <StatCard color="green" icon="fa-check-circle" label="Delivered Orders" value={data.orders.delivered} href="/admin/orders?status=delivered" />
      </div>
      <div className="stat-row-e" style={{ marginTop: 16 }}>
        <StatCard color="red" icon="fa-ban" label="Canceled Orders" value={data.orders.cancelled} href="/admin/orders?status=cancelled" />
        <StatCard color="cyan" icon="fa-user-plus" label="Total Customers" value={data.overview.totalCustomers} />
      </div>

      <div className="section-label"><i className="fas fa-hand-holding-usd" /> Earnings &amp; Payment Method ({data.rangeLabel})</div>
      <div className="stat-row-e">
        <StatCard color="red" icon="fa-rupee-sign" label={`Earning (${data.rangeLabel})`} value={`₹${data.earning.toFixed(2)}`} />
        <StatCard color="green" icon="fa-money-bill-wave" label="Cash on Delivery" value={`₹${data.payments.cash.toFixed(2)}`} />
        <StatCard color="blue" icon="fa-mobile-alt" label="UPI" value={`₹${data.payments.upi.toFixed(2)}`} />
        <StatCard color="cyan" icon="fa-credit-card" label="Card" value={`₹${data.payments.card.toFixed(2)}`} />
      </div>

      <div className="section-label"><i className="fas fa-boxes" /> Store Overview</div>
      <div className="stat-row-e">
        <StatCard color="blue" icon="fa-boxes" label="Total Products" value={data.overview.totalProducts} href="/admin/products" />
        <StatCard color="red" icon="fa-box-open" label="Out of Stock" value={data.overview.outOfStock} href="/admin/products" />
        <StatCard color="blue" icon="fa-list" label="Total Categories" value={data.overview.totalCategories} />
        <StatCard color="cyan" icon="fa-users" label="Total Customers" value={data.overview.totalCustomers} />
      </div>

      <div className="gd-card mt-3">
        <div className="gd-card-body">
          <h5 className="mb-3" style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 700, marginBottom: 12 }}>
            <i className="fas fa-clock" style={{ color: "var(--primary)" }} /> Recent Orders{" "}
            <small style={{ color: "var(--gray-500)", fontWeight: 400 }}>({data.rangeLabel})</small>
          </h5>
          {data.recentOrders.length === 0 ? (
            <p style={{ color: "var(--gray-500)", margin: 0 }}>No orders in this period.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table className="atable">
                <thead>
                  <tr><th>Order #</th><th>Customer</th><th>Total</th><th>Payment</th><th>Status</th><th>Date</th></tr>
                </thead>
                <tbody>
                  {data.recentOrders.map((o) => (
                    <tr key={o.id}>
                      <td><Link href={`/admin/orders/${o.id}`} style={{ color: "var(--primary)", fontWeight: 700 }}>{o.order_number}</Link></td>
                      <td>{o.name}</td>
                      <td>₹{Number(o.total).toFixed(2)}</td>
                      <td style={{ textTransform: "uppercase" }}>{o.payment_method}</td>
                      <td><span className={`abadge ${o.status}`}>{o.status}</span></td>
                      <td>{new Date(o.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
