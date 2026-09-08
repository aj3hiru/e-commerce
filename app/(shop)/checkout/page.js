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

  const delivery = total >= 500 ? 0 : 40;
  const grandTotal = total + delivery;

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
        body: JSON.stringify({ items, address, payment, subtotal: total, delivery, total: grandTotal }),
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
          <div className="row total">
            <span>Total</span>
            <span>₹{grandTotal}</span>
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
