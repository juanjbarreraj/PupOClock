import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

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