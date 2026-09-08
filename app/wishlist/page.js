"use client";
import Link from "next/link";
import { useCart } from "@/components/CartContext";
import ProductCard from "@/components/ProductCard";

export default function WishlistPage() {
  const { wishlist } = useCart();

  return (
    <div className="page-container">
      <div className="breadcrumb">
        <Link href="/">Home</Link>
        <span className="sep">/</span>
        <span className="current">Wishlist</span>
      </div>
      <div className="category-header">
        <h1>My Wishlist</h1>
      </div>

      {wishlist.length === 0 ? (
        <div className="empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.7 21a2 2 0 01-3.4 0" />
          </svg>
          <p>Your wishlist is empty. Save items you love from any product page.</p>
        </div>
      ) : (
        <div className="product-grid" style={{ paddingBottom: 40 }}>
          {wishlist.map((p) => (
            <ProductCard key={p.title} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
