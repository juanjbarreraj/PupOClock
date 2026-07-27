import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Plus, Minus, Trash2, ExternalLink } from "lucide-react";
import { useCart } from "./CartContext";

const FALLBACK = "/images/home/tshirt-fallback.jpg";

export default function CartDrawer() {
  const { items, removeItem, updateQty, total, isOpen, setIsOpen, checkoutUrl } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-white shadow-2xl flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#00A9D6]" />
                <h2
                  className="font-extrabold text-[#1a1a2e] text-lg"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Your Cart
                </h2>
                {items.length > 0 && (
                  <span className="w-5 h-5 rounded-full bg-[#FF4633] text-white text-[10px] font-extrabold flex items-center justify-center">
                    {items.reduce((s, i) => s + i.qty, 0)}
                  </span>
                )}
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 && (
                <div className="text-center py-16 text-gray-400">
                  <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="font-bold">Your cart is empty</p>
                  <p className="text-sm mt-1">Add some swag for your pack!</p>
                </div>
              )}

              {items.map((item) => {
                const price = parseFloat(item.price.replace(/[^0-9.]/g, ""));
                return (
                  <motion.div
                    key={item.name}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex gap-4 items-start"
                  >
                    {/* Thumbnail */}
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.currentTarget.src = FALLBACK; }}
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p
                        className="font-extrabold text-[#1a1a2e] text-sm leading-snug truncate"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        {item.name}
                      </p>
                      <p className="text-[#00A9D6] font-extrabold text-sm mt-0.5">
                        ${(price * item.qty).toFixed(2)}
                      </p>
                      {/* Qty row */}
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-1 border border-gray-200 rounded-full px-1">
                          <button
                            onClick={() => updateQty(item.name, item.qty - 1)}
                            className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                          >
                            <Minus className="w-2.5 h-2.5 text-gray-500" />
                          </button>
                          <span className="w-5 text-center text-xs font-bold text-gray-700">{item.qty}</span>
                          <button
                            onClick={() => updateQty(item.name, item.qty + 1)}
                            className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                          >
                            <Plus className="w-2.5 h-2.5 text-gray-500" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.name)}
                          className="text-gray-300 hover:text-red-400 transition-colors ml-auto"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-gray-100 space-y-3">
                {/* Total */}
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-500 text-sm">Subtotal</span>
                  <span
                    className="font-extrabold text-[#1a1a2e] text-lg"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    ${total.toFixed(2)}
                  </span>
                </div>

                <p className="text-xs text-gray-400 text-center">
                  Shipping & taxes calculated at checkout
                </p>

                {/* Checkout CTA */}
                <a
                  href={checkoutUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-full font-extrabold uppercase tracking-wide text-sm text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    background: "linear-gradient(135deg, #00A9D6 0%, #0099b8 100%)",
                    boxShadow: "0 6px 20px rgba(0,169,214,0.4)",
                  }}
                >
                  <ExternalLink className="w-4 h-4" />
                  Checkout on Shopify
                </a>

                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2.5 text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors uppercase tracking-wide"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}