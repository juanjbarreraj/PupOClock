import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Plus, Minus, ExternalLink, Ruler } from "lucide-react";
import { useCart } from "./CartContext";
import ImageCarousel from "./ImageCarousel";

export default function ProductModal({ product, onClose }) {
  const hasSizes = product.sizeOptions && product.sizeOptions.length > 0;
  const [qty, setQty] = useState(product.quantity || 1);
  const [size, setSize] = useState(
    hasSizes ? (product.sizeOptions.includes("M") ? "M" : product.sizeOptions[0]) : null
  );
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  // The Shopify variant for the chosen size (hats etc. have a single variant)
  const selected = hasSizes ? product.sizes.find((s) => s.label === size) : product.sizes[0];
  const soldOut = !selected?.available;

  // Lock page scroll while modal is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  const price = parseFloat(selected.price.replace(/[^0-9.]/g, ""));
  const isApparel = product.category === "APPAREL";
  const accent = isApparel ? "#00A9D6" : "#FF4633";

  const handleAdd = () => {
    if (soldOut) return;
    const name = hasSizes ? `${product.name} (${size})` : product.name;
    addItem({ ...product, name, variantId: selected.variantId, price: selected.price }, qty);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto pointer-events-auto"
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>

              <div className="flex flex-col sm:flex-row">
                {/* Image / carousel */}
                <div
                  className="sm:w-80 flex-shrink-0 flex items-center justify-center p-6 sm:sticky sm:top-0 sm:self-start"
                  style={{
                    background: `radial-gradient(ellipse at 50% 60%, ${accent}14 0%, transparent 75%), #f8f9fa`,
                    minHeight: 280,
                  }}
                >
                  <ImageCarousel
                    images={product.images}
                    alt={product.name}
                    imgClassName="w-full max-w-[250px] object-contain drop-shadow-lg"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 p-6 sm:p-8">
                  {/* Category badge */}
                  <span
                    className="inline-block text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full mb-3 text-white"
                    style={{ fontFamily: "'Poppins', sans-serif", background: accent }}
                  >
                    {product.category}
                  </span>

                  <h2
                    className="font-extrabold text-[#1a1a2e] text-xl leading-snug mb-1"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {product.name}
                  </h2>

                  <p
                    className="font-extrabold text-2xl mb-3"
                    style={{ color: accent, fontFamily: "'Poppins', sans-serif" }}
                  >
                    {selected.price}
                  </p>

                  <p className="text-sm text-gray-500 leading-relaxed mb-5">
                    {product.description}
                  </p>

                  {/* Size selector — apparel only */}
                  {hasSizes && (
                    <div className="mb-5">
                      <p className="text-xs font-extrabold uppercase tracking-wide text-gray-500 mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        Size
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        {product.sizes.map((s) => (
                          <button
                            key={s.label}
                            onClick={() => setSize(s.label)}
                            title={s.available ? undefined : "Sold out"}
                            className="w-11 h-11 rounded-xl font-extrabold text-sm transition-all duration-200"
                            style={{
                              fontFamily: "'Poppins', sans-serif",
                              background: size === s.label ? accent : "#fff",
                              color: size === s.label ? "#fff" : s.available ? "#4b5563" : "#c7cbd1",
                              border: size === s.label ? `2px solid ${accent}` : "2px solid #e5e7eb",
                              boxShadow: size === s.label ? `0 4px 14px ${accent}55` : "none",
                              textDecoration: s.available ? "none" : "line-through",
                            }}
                          >
                            {s.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quantity selector */}
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-xs font-extrabold uppercase tracking-wide text-gray-500" style={{ fontFamily: "'Poppins', sans-serif" }}>Qty</span>
                    <div className="flex items-center gap-2 border-2 border-gray-200 rounded-full px-1 py-0.5">
                      <button
                        onClick={() => setQty(Math.max(1, qty - 1))}
                        className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5 text-gray-600" />
                      </button>
                      <span className="w-7 text-center font-extrabold text-sm text-gray-800">{qty}</span>
                      <button
                        onClick={() => setQty(qty + 1)}
                        className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5 text-gray-600" />
                      </button>
                    </div>
                    <span className="text-sm text-gray-400 font-bold">
                      Total: <span className="text-gray-700">${(price * qty).toFixed(2)}</span>
                    </span>
                  </div>

                  {/* Add to cart */}
                  <motion.button
                    onClick={handleAdd}
                    disabled={soldOut}
                    className="w-full py-3.5 rounded-full font-extrabold uppercase tracking-wide text-sm flex items-center justify-center gap-2 text-white transition-colors disabled:cursor-not-allowed"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      background: soldOut ? "#9ca3af" : added ? "#22c55e" : accent,
                    }}
                    whileHover={soldOut ? undefined : { scale: 1.02 }}
                    whileTap={soldOut ? undefined : { scale: 0.97 }}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    {soldOut ? "Sold Out" : added ? "Added!" : "Add to Cart"}
                  </motion.button>

                  {/* View on Shopify */}
                  <a
                    href={product.shopifyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 w-full py-2.5 rounded-full border-2 border-gray-200 font-extrabold uppercase tracking-wide text-xs text-gray-500 hover:border-gray-300 hover:text-gray-700 flex items-center justify-center gap-1.5 transition-colors"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    <ExternalLink className="w-3 h-3" />
                    View on Shopify
                  </a>

                  {/* Dimensions */}
                  <div className="mt-6 pt-5 border-t border-gray-100">
                    <p className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wide text-gray-500 mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      <Ruler className="w-3.5 h-3.5" />
                      {product.category === "HAT" ? "Details" : "Size Guide"}
                    </p>
                    <p className="text-xs text-gray-400 leading-relaxed" style={{ whiteSpace: "pre-line" }}>
                      {product.dimensionsText}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}