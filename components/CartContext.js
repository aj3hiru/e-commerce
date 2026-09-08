"use client";
import { createContext, useContext, useState, useCallback } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const addItem = useCallback((product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.title === product.title);
      if (existing) {
        return prev.map((i) =>
          i.title === product.title ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  }, []);

  const removeItem = useCallback((title) => {
    setItems((prev) => prev.filter((i) => i.title !== title));
  }, []);

  const updateQty = useCallback((title, qty) => {
    setItems((prev) =>
      prev.map((i) => (i.title === title ? { ...i, qty: Math.max(1, qty) } : i))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const toggleWishlist = useCallback((product) => {
    setWishlist((prev) => {
      const exists = prev.find((i) => i.title === product.title);
      if (exists) return prev.filter((i) => i.title !== product.title);
      return [...prev, product];
    });
  }, []);

  const isWished = useCallback(
    (title) => wishlist.some((i) => i.title === title),
    [wishlist]
  );

  const count = items.reduce((sum, i) => sum + i.qty, 0);
  const total = items.reduce((sum, i) => sum + i.qty * (i.sp || 0), 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        count,
        total,
        wishlist,
        toggleWishlist,
        isWished,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
