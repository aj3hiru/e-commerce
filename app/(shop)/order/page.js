"use client";
import { useState } from "react";
import Link from "next/link";

export default function OrderTrackingPage() {
  const [orderId, setOrderId] = useState("");
  const [result, setResult] = useState(null);

  const handleTrack = (e) => {
    e.preventDefault();
    if (!orderId.trim()) return;
    setResult({
      id: orderId.trim(),
      status: "Out for Delivery",
      steps: ["Order Placed", "Packed", "Shipped", "Out for Delivery", "Delivered"],
      currentStep: 3,
      eta: "Today, by 8:00 PM",
    });
  };

  return (
    <div className="page-container">
      <div className="breadcrumb">
        <Link href="/">Home</Link>
        <span className="sep">/</span>
        <span className="current">Track Order</span>
      </div>
      <div className="simple-page">
        <h1>Track Your Order</h1>

        <form className="track-input-row" onSubmit={handleTrack}>
          <input
            type="text"
            placeholder="Enter your Order ID (e.g. CMR482913)"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
          />
          <button type="submit">Track</button>
        </form>

        {result && (
          <div className="account-card">
            <h3>Order #{result.id}</h3>
            <div className="account-row"><span>Status</span><span>{result.status}</span></div>
            <div className="account-row"><span>Estimated Delivery</span><span>{result.eta}</span></div>
            <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
              {result.steps.map((step, i) => (
                <div key={step} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5 }}>
                  <span
                    style={{
                      width: 10, height: 10, borderRadius: "50%", flexShrink: 0,
                      background: i <= result.currentStep ? "var(--green)" : "#e5e7eb",
                    }}
                  />
                  <span style={{ color: i <= result.currentStep ? "var(--text)" : "var(--muted)", fontWeight: i === result.currentStep ? 700 : 400 }}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
