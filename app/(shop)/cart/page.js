"use client";
import Link from "next/link";
import { useCart } from "@/components/CartContext";

function TrashIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M3 6h18M8 6V4a1 1 0 011-1h6a1 1 0 011 1v2m3 0l-1 14a2 2 0 01-2 2H7a2 2 0 01-2-2L4 6h16z" />
    </svg>
  );
}

export default function CartPage() {
  const { items, updateQty, removeItem, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="9" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2 3h2l2.6 12.4a2 2 0 002 1.6h9.7a2 2 0 002-1.6L22 7H6" />
          </svg>
          <p>Your cart is empty.</p>
          <Link href="/" className="pill-btn" style={{ display: "inline-block", marginTop: 16, background: "var(--green)", color: "#fff", padding: "12px 28px", borderRadius: 6, fontWeight: 700 }}>
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  const delivery = total >= 500 ? 0 : 40;
  const grandTotal = total + delivery;

  return (
    <div className="page-container">
      <div className="breadcrumb">
        <Link href="/">Home</Link>
        <span className="sep">/</span>
        <span className="current">Cart</span>
      </div>
      <div className="category-header">
        <h1>My Cart ({items.length} item{items.length > 1 ? "s" : ""})</h1>
      </div>

      <div className="cart-page-grid">
        <div className="cart-items">
          {items.map((item) => (
            <div className="cart-item" key={item.title}>
              <div className="thumb">
                <img src={item.img} alt={item.title} />
              </div>
              <div className="info">
                <div className="title">{item.title}</div>
                <div className="unit-price">₹{item.sp} each</div>
              </div>
              <div className="qty-controls">
                <button type="button" onClick={() => updateQty(item.title, item.qty - 1)} aria-label="Decrease">−</button>
                <span>{item.qty}</span>
                <button type="button" onClick={() => updateQty(item.title, item.qty + 1)} aria-label="Increase">+</button>
              </div>
              <div className="line-total">₹{item.sp * item.qty}</div>
              <button type="button" className="remove-btn" onClick={() => removeItem(item.title)} aria-label="Remove item">
                <TrashIcon />
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="row">
            <span>Subtotal</span>
            <span>₹{total}</span>
          </div>
          <div className="row">
            <span>Delivery</span>
            <span>{delivery === 0 ? "FREE" : `₹${delivery}`}</span>
          </div>
          {delivery > 0 && (
            <div className="row" style={{ color: "var(--green-dark)", fontSize: 12.5 }}>
              Add ₹{500 - total} more for free delivery
            </div>
          )}
          <div className="row total">
            <span>Total</span>
            <span>₹{grandTotal}</span>
          </div>
          <Link href="/checkout" className="checkout-btn">Proceed to Checkout</Link>
          <Link href="/" className="continue-link">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
}
