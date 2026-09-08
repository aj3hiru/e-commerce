"use client";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartContext";

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" {...props}>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [placed, setPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [payment, setPayment] = useState("cod");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [couponInput, setCouponInput] = useState("");
  const [coupon, setCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);

  const delivery = total >= 500 ? 0 : 40;
  const discount = coupon?.discount || 0;
  const grandTotal = Math.max(0, total + delivery - discount);

  const applyCoupon = async () => {
    if (!couponInput.trim()) return;
    setCouponLoading(true);
    setCouponError("");
    try {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponInput.trim(), subtotal: total }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setCouponError(data.error || "Invalid coupon.");
        setCoupon(null);
      } else {
        setCoupon(data);
        setCouponError("");
      }
    } catch {
      setCouponError("Network error — please try again.");
    } finally {
      setCouponLoading(false);
    }
  };

  const removeCoupon = () => {
    setCoupon(null);
    setCouponInput("");
    setCouponError("");
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.target);
    const address = {
      name: form.get("name"),
      phone: form.get("phone"),
      line: form.get("address"),
      city: form.get("city"),
      pincode: form.get("pincode"),
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items, address, payment, subtotal: total, delivery,
          discount, couponCode: coupon?.code || null, total: grandTotal,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Something went wrong placing your order. Please try again.");
        setLoading(false);
        return;
      }
      setOrderNumber(data.orderNumber);
      setPlaced(true);
      clearCart();
    } catch {
      setError("Network error — please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  if (placed) {
    return (
      <div className="page-container">
        <div className="order-success">
          <div className="check-circle">
            <CheckIcon />
          </div>
          <h1>Order Placed Successfully!</h1>
          <p>
            Your order <strong>#{orderNumber}</strong> has been placed and will be delivered soon.
            A confirmation has been sent to your registered contact.
          </p>
          <Link href="/" className="home-link">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <p>Your cart is empty — add items before checking out.</p>
          <Link href="/" style={{ display: "inline-block", marginTop: 16, background: "var(--green)", color: "#fff", padding: "12px 28px", borderRadius: 6, fontWeight: 700 }}>
            Go to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="breadcrumb">
        <Link href="/">Home</Link>
        <span className="sep">/</span>
        <Link href="/cart">Cart</Link>
        <span className="sep">/</span>
        <span className="current">Checkout</span>
      </div>
      <div className="category-header">
        <h1>Checkout</h1>
      </div>

      <form className="checkout-grid" onSubmit={handlePlaceOrder}>
        <div>
          <div className="checkout-section">
            <h2>Delivery Address</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input name="name" type="text" placeholder="Your full name" required />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input name="phone" type="tel" placeholder="10-digit mobile number" required pattern="[0-9]{10}" />
              </div>
            </div>
            <div className="form-group">
              <label>Address</label>
              <textarea name="address" rows={3} placeholder="House no, street, area" required />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input name="city" type="text" placeholder="City" required />
              </div>
              <div className="form-group">
                <label>Pincode</label>
                <input name="pincode" type="text" placeholder="6-digit pincode" required pattern="[0-9]{6}" />
              </div>
            </div>
          </div>

          <div className="checkout-section">
            <h2>Payment Method</h2>
            <div className="payment-options">
              <label className="payment-option">
                <input type="radio" name="paymentMethod" checked={payment === "cod"} onChange={() => setPayment("cod")} />
                Cash on Delivery
              </label>
              <label className="payment-option">
                <input type="radio" name="paymentMethod" checked={payment === "upi"} onChange={() => setPayment("upi")} />
                UPI (Google Pay / PhonePe / Paytm)
              </label>
              <label className="payment-option">
                <input type="radio" name="paymentMethod" checked={payment === "card"} onChange={() => setPayment("card")} />
                Credit / Debit Card
              </label>
            </div>
          </div>
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          {items.map((item) => (
            <div className="order-summary-item" key={item.title}>
              <span className="name">{item.title} × {item.qty}</span>
              <span>₹{item.sp * item.qty}</span>
            </div>
          ))}
          <div className="row" style={{ marginTop: 10 }}>
            <span>Subtotal</span>
            <span>₹{total}</span>
          </div>
          <div className="row">
            <span>Delivery</span>
            <span>{delivery === 0 ? "FREE" : `₹${delivery}`}</span>
          </div>

          <div style={{ margin: "12px 0" }}>
            {coupon ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--green-light)", padding: "8px 12px", borderRadius: 6, fontSize: 13 }}>
                <span style={{ color: "var(--green-dark)", fontWeight: 700 }}>
                  🏷️ {coupon.code} applied
                </span>
                <button type="button" onClick={removeCoupon} style={{ color: "#c62828", fontWeight: 700, background: "none", border: "none", cursor: "pointer" }}>Remove</button>
              </div>
            ) : (
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  type="text"
                  placeholder="Coupon code"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                  style={{ flex: 1, border: "1px solid var(--border)", borderRadius: 6, padding: "8px 10px", fontSize: 13 }}
                />
                <button type="button" onClick={applyCoupon} disabled={couponLoading} style={{ whiteSpace: "nowrap", background: "var(--green)", color: "#fff", border: "none", borderRadius: 6, padding: "0 16px", fontWeight: 700, fontSize: 13 }}>
                  {couponLoading ? "Checking…" : "Apply"}
                </button>
              </div>
            )}
            {couponError && <p style={{ color: "#c62828", fontSize: 12, marginTop: 6 }}>{couponError}</p>}
          </div>

          {discount > 0 && (
            <div className="row" style={{ color: "var(--green-dark)" }}>
              <span>Discount</span>
              <span>−₹{discount.toFixed(2)}</span>
            </div>
          )}

          <div className="row total">
            <span>Total</span>
            <span>₹{grandTotal.toFixed(2)}</span>
          </div>
          {error && <p style={{ color: "#c62828", fontSize: 13, marginTop: 10 }}>{error}</p>}
          <button type="submit" className="place-order-btn" disabled={loading}>
            {loading ? "Placing Order…" : "Place Order"}
          </button>
        </div>
      </form>
    </div>
  );
}
