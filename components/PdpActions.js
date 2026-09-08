"use client";
import { useState } from "react";
import { CartIcon, HeartIcon } from "./Icons";
import { useCart } from "./CartContext";

export default function PdpActions({ product }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);
  const outOfStock = product.stock <= 0;

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div>
      <div className="pdp-actions">
        {!outOfStock && (
          <div className="pdp-stepper">
            <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
              −
            </button>
            <span>{qty}</span>
            <button type="button" onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity">
              +
            </button>
          </div>
        )}
        <button className="pdp-addcart" onClick={handleAdd} disabled={outOfStock}>
          <CartIcon />
          {outOfStock ? "Out of Stock" : "Add to Cart"}
        </button>
        <button
          type="button"
          className={`pdp-wishlist ${wished ? "active" : ""}`}
          onClick={() => setWished((w) => !w)}
          aria-label="Toggle wishlist"
        >
          <HeartIcon fill={wished ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" />
        </button>
      </div>
      {added && <p className="pdp-added-msg">Added {qty} item{qty > 1 ? "s" : ""} to cart ✓</p>}
    </div>
  );
}
