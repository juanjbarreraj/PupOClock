import { createContext, useContext, useEffect, useState } from "react";
import { PRODUCTS } from "./products";
import { CART_KEY, reviveCart, serializeCart } from "./cartStorage";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  // Lazy hydration: restore once, before the first persist effect can run,
  // so a valid stored cart is never overwritten by the initial empty state.
  const [items, setItems] = useState(() => {
    let raw = null;
    try {
      raw = window.localStorage.getItem(CART_KEY);
    } catch {
      return []; // storage unavailable (private mode) — in-memory cart only
    }
    const revived = reviveCart(raw, PRODUCTS);
    if (revived === null) {
      // Malformed beyond recovery — clear it so it can't break future visits
      try { window.localStorage.removeItem(CART_KEY); } catch { /* ignore */ }
      return [];
    }
    return revived;
  });
  const [isOpen, setIsOpen] = useState(false);

  // Persist whenever the cart changes. An emptied cart removes the key
  // (rather than storing an empty object) so storage stays clean.
  useEffect(() => {
    try {
      if (items.length === 0) window.localStorage.removeItem(CART_KEY);
      else window.localStorage.setItem(CART_KEY, JSON.stringify(serializeCart(items)));
    } catch {
      // Quota/private-mode failures are non-fatal; the cart still works in memory
    }
  }, [items]);

  const addItem = (product, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.name === product.name);
      if (existing) {
        return prev.map((i) => i.name === product.name ? { ...i, qty: i.qty + qty } : i);
      }
      return [...prev, { ...product, qty }];
    });
    setIsOpen(true);
  };

  const removeItem = (name) => setItems((prev) => prev.filter((i) => i.name !== name));

  const updateQty = (name, qty) => {
    if (qty < 1) { removeItem(name); return; }
    setItems((prev) => prev.map((i) => i.name === name ? { ...i, qty } : i));
  };

  const total = items.reduce((sum, i) => sum + parseFloat(i.price.replace(/[^0-9.]/g, "")) * i.qty, 0);
  const count = items.reduce((sum, i) => sum + i.qty, 0);

  // Build a Shopify cart permalink from the items' variant IDs
  const checkoutUrl = items.length === 0
    ? "https://pupoclockshop.myshopify.com/cart"
    : "https://pupoclockshop.myshopify.com/cart/" + items.map((i) => `${i.variantId}:${i.qty}`).join(",");

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, total, count, isOpen, setIsOpen, checkoutUrl }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
