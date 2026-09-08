"use client";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function OrdersContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const search = searchParams.get("search");
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams();
    if (status) params.set("status", status);
    if (search) params.set("search", search);
    const qs = params.toString();
    fetch(`/api/admin/orders${qs ? `?${qs}` : ""}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) setOrders(data.orders);
        else setError(data.error || "Could not load orders.");
      })
      .catch(() => setError("Network error loading orders."));
  }, [status, search]);

  return (
    <div>
      <div className="section-label" style={{ margin: "0 0 1rem" }}>
        <i className="fas fa-receipt" /> Orders
        {status && <span> — <span style={{ textTransform: "capitalize" }}>{status}</span></span>}
        {search && <span> — Search: "{search}"</span>}
      </div>

      {status || search ? (
        <Link href="/admin/orders" className="abtn" style={{ display: "inline-block", marginBottom: 16 }}>
          <i className="fas fa-times" /> Clear filter
        </Link>
      ) : null}

      {error && <div className="gd-card"><div className="gd-card-body" style={{ color: "#ef4444" }}>{error}</div></div>}

      <div className="gd-card">
        <div className="gd-card-body">
          {!orders ? (
            <p style={{ color: "var(--gray-500)" }}>Loading…</p>
          ) : orders.length === 0 ? (
            <p style={{ color: "var(--gray-500)" }}>No orders found.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table className="atable">
                <thead>
                  <tr>
                    <th>Order #</th>
                    <th>Customer</th>
                    <th>City</th>
                    <th>Payment</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id}>
                      <td>{o.order_number}</td>
                      <td>{o.name}</td>
                      <td>{o.city}</td>
                      <td style={{ textTransform: "uppercase" }}>{o.payment_method}</td>
                      <td>₹{Number(o.total).toFixed(2)}</td>
                      <td><span className={`abadge ${o.status}`}>{o.status}</span></td>
                      <td>{new Date(o.created_at).toLocaleDateString()}</td>
                      <td><Link href={`/admin/orders/${o.id}`} style={{ color: "var(--primary)", fontWeight: 700 }}>View →</Link></td>
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

export default function AdminOrdersPage() {
  return (
    <Suspense fallback={<p style={{ color: "var(--gray-500)" }}>Loading…</p>}>
      <OrdersContent />
    </Suspense>
  );
}
