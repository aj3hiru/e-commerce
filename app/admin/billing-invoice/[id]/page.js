"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { SITE } from "@/lib/siteData";

const fmt = (n) => Number(n || 0).toFixed(2);

export default function InvoicePage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/admin/orders/${id}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.ok) setData(d);
        else setError(d.error || "Order not found.");
      })
      .catch(() => setError("Network error loading invoice."));
  }, [id]);

  if (error) return <p style={{ padding: "2rem", fontFamily: "sans-serif" }}>{error}</p>;
  if (!data) return <p style={{ padding: "2rem", fontFamily: "sans-serif" }}>Loading…</p>;

  const { order, items, payments, credit } = data;
  const subtotal = Number(order.subtotal) || items.reduce((s, i) => s + Number(i.price) * Number(i.qty), 0);
  const discount = Number(order.discount) || 0;
  const totalGst = Number(order.gst_amount) || 0;
  const cgst = totalGst / 2;
  const sgst = totalGst / 2;
  const grandTotal = Number(order.total) || 0;

  let paidAmount = order.paid_amount !== null && order.paid_amount !== undefined ? Number(order.paid_amount) : grandTotal;
  if (credit) paidAmount += Number(credit.amount_paid || 0);
  const due = Math.max(0, grandTotal - paidAmount);
  const isFullyPaid = credit ? credit.status === "paid" : due <= 0.004;

  const paymentBreakdown = {};
  for (const p of payments || []) {
    paymentBreakdown[p.payment_method] = (paymentBreakdown[p.payment_method] || 0) + Number(p.amount);
  }
  const breakdownEntries = Object.entries(paymentBreakdown);

  return (
    <div className="invoice-box">
      <div className="invoice-head">
        <div>
          <h1>{SITE.name}</h1>
          <div className="biz-line">{SITE.address}</div>
          {SITE.supportPhone && <div className="biz-line">Tel: {SITE.supportPhone}</div>}
        </div>
        <div className="meta">
          <div className="invoice-title-badge">Tax Invoice</div>
          <div>Invoice #: <strong>{order.order_number}</strong></div>
          <div>Date: {new Date(order.created_at).toLocaleString("en-IN")}</div>
        </div>
      </div>

      <div className="invoice-parties">
        <div className="block">
          <h6>Billed To</h6>
          <div>{order.name || "Walk-in Customer"}</div>
          {order.phone && <div>{order.phone}</div>}
        </div>
        <div className="block" style={{ textAlign: "right" }}>
          <h6>Order Type</h6>
          <div style={{ textTransform: "capitalize" }}>{order.order_type || "online"} · {order.payment_method}</div>
        </div>
      </div>

      <table className="inv-table">
        <thead>
          <tr><th>Item</th><th>Qty</th><th>Price</th><th style={{ textAlign: "right" }}>Amount</th></tr>
        </thead>
        <tbody>
          {items.map((it) => (
            <tr key={it.id}>
              <td>{it.title}</td>
              <td>{it.qty}</td>
              <td>₹{fmt(it.price)}</td>
              <td style={{ textAlign: "right" }}>₹{fmt(Number(it.price) * Number(it.qty))}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="inv-totals">
        <div><span>Subtotal</span><span>₹{fmt(subtotal)}</span></div>
        {discount > 0 && <div><span>Discount</span><span>-₹{fmt(discount)}</span></div>}
        {totalGst > 0 && (
          <>
            <div><span>CGST</span><span>+₹{fmt(cgst)}</span></div>
            <div><span>SGST</span><span>+₹{fmt(sgst)}</span></div>
          </>
        )}
        <div className="grand"><span>Grand Total</span><span>₹{fmt(grandTotal)}</span></div>

        {breakdownEntries.length > 1 ? (
          breakdownEntries.map(([method, amt]) => (
            <div key={method}><span>{method} Paid</span><span>₹{fmt(amt)}</span></div>
          ))
        ) : (
          <div><span>Paid</span><span>₹{fmt(paidAmount)}</span></div>
        )}

        {isFullyPaid ? (
          <div style={{ color: "#10b981", fontWeight: 700 }}><span>Status</span><span>✓ Fully Paid</span></div>
        ) : (
          <div className="due"><span>Due</span><span>₹{fmt(due)}</span></div>
        )}
      </div>

      <p style={{ textAlign: "center", color: "#6b7280", fontSize: "0.8125rem", marginTop: "2rem" }}>
        Thank you for shopping with {SITE.name}!
      </p>

      <div className="no-print" style={{ textAlign: "center", marginTop: "1.5rem" }}>
        <button onClick={() => window.print()} className="print-btn">Print</button>
      </div>

      <style jsx global>{`
        body { font-family: 'Inter', sans-serif; background: #f3f4f6; color: #1f2937; margin: 0; }
      `}</style>
      <style jsx>{`
        .invoice-box { max-width: 800px; margin: 2rem auto; background: #fff; padding: 2.5rem; border-radius: 0.5rem; box-shadow: 0 0.15rem 1.75rem rgba(58,59,69,.1); }
        .invoice-head { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #7c3aed; padding-bottom: 1.5rem; margin-bottom: 1.5rem; }
        .invoice-head h1 { font-size: 1.6rem; font-weight: 800; color: #7c3aed; margin: 0; }
        .invoice-head .biz-line { font-size: 0.8125rem; color: #6b7280; margin-top: 0.15rem; }
        .invoice-head .meta { text-align: right; font-size: 0.875rem; color: #6b7280; }
        .invoice-title-badge { display: inline-block; background: #ede9fe; color: #6d28d9; font-weight: 700; font-size: 0.8125rem; padding: 0.25rem 0.75rem; border-radius: 9999px; margin-bottom: 0.4rem; }
        .invoice-parties { display: flex; justify-content: space-between; margin-bottom: 2rem; gap: 2rem; }
        .invoice-parties .block h6 { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: #9ca3af; margin-bottom: 0.4rem; }
        .inv-table { width: 100%; border-collapse: collapse; margin-bottom: 1.5rem; }
        .inv-table th { background: #f9fafb; text-align: left; padding: 0.7rem 0.9rem; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.03em; color: #6b7280; border-bottom: 1px solid #e5e7eb; }
        .inv-table td { padding: 0.7rem 0.9rem; border-bottom: 1px solid #f3f4f6; font-size: 0.9rem; }
        .inv-totals { max-width: 340px; margin-left: auto; }
        .inv-totals div { display: flex; justify-content: space-between; padding: 0.35rem 0; font-size: 0.9rem; }
        .inv-totals .grand { font-weight: 800; font-size: 1.125rem; border-top: 2px solid #1f2937; padding-top: 0.6rem; margin-top: 0.3rem; }
        .inv-totals .due { color: #ef4444; font-weight: 700; }
        .print-btn { background: #7c3aed; color: #fff; border: none; padding: 0.6rem 1.5rem; border-radius: 0.5rem; font-weight: 700; cursor: pointer; }
        @media print { .no-print { display: none; } .invoice-box { box-shadow: none; margin: 0; } body { background: #fff; } }
      `}</style>
    </div>
  );
}
