"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AdmIcons } from "@/components/admin/AdmIcons";

const RANGES = [
  { key: "today", label: "Today" },
  { key: "yesterday", label: "Yesterday" },
  { key: "7days", label: "7 Days" },
  { key: "this_month", label: "This Month" },
  { key: "prev_month", label: "Previous Month" },
];

function StatCard({ color, Icon, label, value }) {
  return (
    <div className="adm-stat-card">
      <div className="adm-stat-icon" style={{ background: color }}>
        <Icon />
      </div>
      <div>
        <div className="adm-stat-label">{label}</div>
        <div className="adm-stat-value">{value}</div>
      </div>
    </div>
  );
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

  if (error) return <div className="adm-card" style={{ color: "#c62828" }}>{error}</div>;
  if (!data) return <p style={{ color: "var(--adm-gray-500)" }}>Loading…</p>;

  return (
    <div>
      <div className="adm-range-bar">
        <span className="adm-range-label">Showing: <strong>{data.rangeLabel}</strong></span>
        {RANGES.map((r) => (
          <button
            key={r.key}
            type="button"
            className={`adm-range-btn ${range === r.key ? "active" : ""}`}
            onClick={() => handleRangeClick(r.key)}
          >
            {r.label}
          </button>
        ))}
        <form className="adm-range-custom" onSubmit={handleCustomApply}>
          <input type="date" value={customFrom} onChange={(e) => setCustomFrom(e.target.value)} required />
          <span style={{ fontSize: 12, color: "var(--adm-gray-500)" }}>to</span>
          <input type="date" value={customTo} onChange={(e) => setCustomTo(e.target.value)} required />
          <button type="submit">Apply</button>
        </form>
      </div>

      <div className="adm-section-label">Online Platform</div>
      <div className="adm-stats-row">
        <StatCard color="#1cc88a" Icon={AdmIcons.Cart} label="Total Orders" value={data.orders.total} />
        <StatCard color="#1cc88a" Icon={AdmIcons.Clock} label="Pending Orders" value={data.orders.placed} />
        <StatCard color="#1cc88a" Icon={AdmIcons.Truck} label="In Progress" value={data.orders.packed + data.orders.shipped} />
        <StatCard color="#1cc88a" Icon={AdmIcons.Check} label="Delivered Orders" value={data.orders.delivered} />
      </div>
      <div className="adm-stats-row" style={{ marginTop: 16 }}>
        <StatCard color="#e74a5b" Icon={AdmIcons.Ban} label="Canceled Orders" value={data.orders.cancelled} />
        <StatCard color="#36b9cc" Icon={AdmIcons.Users} label="Total Customers" value={data.overview.totalCustomers} />
      </div>

      <div className="adm-section-label">Earnings &amp; Payment Method ({data.rangeLabel})</div>
      <div className="adm-stats-row">
        <StatCard color="#e74a5b" Icon={AdmIcons.Rupee} label={`Earning (${data.rangeLabel})`} value={`₹${data.earning.toFixed(2)}`} />
        <StatCard color="#1cc88a" Icon={AdmIcons.Cash} label="Cash on Delivery" value={`₹${data.payments.cash.toFixed(2)}`} />
        <StatCard color="#4361ee" Icon={AdmIcons.Mobile} label="UPI" value={`₹${data.payments.upi.toFixed(2)}`} />
        <StatCard color="#36b9cc" Icon={AdmIcons.Card} label="Card" value={`₹${data.payments.card.toFixed(2)}`} />
      </div>

      <div className="adm-section-label">Store Overview</div>
      <div className="adm-stats-row">
        <StatCard color="#4361ee" Icon={AdmIcons.Boxes} label="Total Products" value={data.overview.totalProducts} />
        <StatCard color="#e74a5b" Icon={AdmIcons.BoxOpen} label="Out of Stock" value={data.overview.outOfStock} />
        <StatCard color="#4361ee" Icon={AdmIcons.List} label="Total Categories" value={data.overview.totalCategories} />
        <StatCard color="#36b9cc" Icon={AdmIcons.Users} label="Total Customers" value={data.overview.totalCustomers} />
      </div>

      <div className="adm-card">
        <h2><AdmIcons.Clock width={16} height={16} /> Recent Orders <span style={{ color: "var(--adm-gray-400)", fontWeight: 400, fontSize: 12.5 }}>({data.rangeLabel})</span></h2>
        {data.recentOrders.length === 0 ? (
          <p style={{ color: "var(--adm-gray-500)", fontSize: 13.5 }}>No orders in this period.</p>
        ) : (
          <table className="adm-table">
            <thead>
              <tr><th>Order #</th><th>Customer</th><th>Total</th><th>Payment</th><th>Status</th><th>Date</th></tr>
            </thead>
            <tbody>
              {data.recentOrders.map((o) => (
                <tr key={o.id}>
                  <td><Link href={`/admin/orders/${o.id}`} style={{ color: "var(--adm-primary)", fontWeight: 700 }}>#{o.order_number}</Link></td>
                  <td>{o.name}</td>
                  <td>₹{Number(o.total).toFixed(0)}</td>
                  <td style={{ textTransform: "uppercase" }}>{o.payment_method}</td>
                  <td><span className={`adm-badge ${o.status}`}>{o.status}</span></td>
                  <td>{new Date(o.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
