"use client";
import { CartIcon } from "./Icons";
import { useCart } from "./CartContext";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const off = product.mrp - product.sp;

  return (
    <div className="product-card">
      <div className="img-wrap">
        <img src={product.img} alt={product.title} />
      </div>
      <div className="title">{product.title}</div>
      <div className="price-row">
        <div className="prices">
          <span className="label">MRP</span>
          <span className="mrp">₹{product.mrp}</span>
          <span className="sp">₹{product.sp}</span>
        </div>
        <div className="off-badge">₹{off}<small>OFF</small></div>
      </div>
      <div className="qty-cart">
        <div className="qty-box">
          {product.qty}
          {product.perUnit && <small>({product.perUnit})</small>}
        </div>
        <button className="add-cart" onClick={() => addItem(product)}>
          <CartIcon />
          ADD TO CART
        </button>
      </div>
    </div>
  );
}
