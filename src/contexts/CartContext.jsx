import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem("raynott_cart");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("raynott_cart", JSON.stringify(items));
    } catch {}
  }, [items]);

  const addItem = (product, qty = 1) => {
    const id = product._id || product.id;
    setItems((prev) => {
      const exists = prev.find((it) => it.id === id);
      if (exists) {
        return prev.map((it) =>
          it.id === id ? { ...it, qty: it.qty + qty } : it
        );
      }
      const newItem = {
        id,
        title: product.name || product.title || product.titleText || "Product",
        price: Number(product.price ?? product.amount ?? 0) || 0,
        image: product.imgurl || product.image || product.img || "",
        qty,
      };
      return [newItem, ...prev];
    });
  };

  const remove = (id) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const updateQty = (id, qty) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, qty: Math.max(1, qty) } : it))
    );
  };

  const clear = () => setItems([]);

  const total = items.reduce((s, it) => s + it.price * it.qty, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, remove, updateQty, clear, total }}
    >
      {children}
    </CartContext.Provider>
  );
}

// named hook (import with { useCart })
export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};
