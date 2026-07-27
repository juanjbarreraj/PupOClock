import { useState, useRef } from "react";
import { Search, X, ShoppingBag } from "lucide-react";
import { motion, useInView } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SwagHero from "../components/SwagHero";
import { CartProvider, useCart } from "../components/swag/CartContext";
import ProductModal from "../components/swag/ProductModal";
import CartDrawer from "../components/swag/CartDrawer";
import FloatingObjects from "../components/FloatingObjects";
import FiltersPanel from "../components/swag/FiltersPanel";
import ImageCarousel from "../components/swag/ImageCarousel";
import { PRODUCTS } from "../components/swag/products";

const YELLOW_BG = "https://media.base44.com/images/public/6a2c05717732611268059817/b8224af3a_backgroundyellow.png";

const parsePrice = (p) => parseFloat(p.replace(/[^0-9.]/g, ""));

// ── Animated product card ────────────────────────────────────────────────────
function ProductCard({ item, index, onClick }) {
  const isApparel = item.category === "APPAREL";
  return (
    <motion.div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter") onClick(); }}
      className="group text-left w-full rounded-3xl overflow-hidden bg-white cursor-pointer flex flex-col"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, boxShadow: "0 20px 48px rgba(0,169,214,0.18), 0 4px 16px rgba(0,0,0,0.08)" }}
      whileTap={{ scale: 0.98 }}
      style={{
        border: "2px solid #f0f0f0",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      }}
    >
      <div className="overflow-hidden aspect-square relative bg-white p-3">
        <ImageCarousel images={item.images} alt={item.name} />
        <div
          className="absolute top-3 left-3 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full text-white pointer-events-none"
          style={{
            fontFamily: "'Poppins', sans-serif",
            background: isApparel ? "#00A9D6" : "#FF4633",
          }}
        >
          {item.category}
        </div>
      </div>
      <div className="p-4 pb-5 flex-1 flex flex-col">
        <h3
          className="font-extrabold text-gray-800 text-sm leading-snug mb-1 group-hover:text-[#00A9D6] transition-colors duration-200"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          {item.name}
        </h3>
        <p className="font-extrabold text-[#1a1a2e] text-base mb-1.5" style={{ fontFamily: "'Poppins', sans-serif" }}>
          {item.price}
        </p>
        <p className="text-xs text-gray-400 leading-relaxed flex-1">{item.description}</p>
        <span className="mt-2 text-[10px] font-extrabold uppercase tracking-wide text-[#00A9D6] opacity-0 group-hover:opacity-100 transition-opacity duration-200 self-end" style={{ fontFamily: "'Poppins', sans-serif" }}>
          View →
        </span>
      </div>
    </motion.div>
  );
}

// ── Main page inner (needs cart context) ─────────────────────────────────────
function SwagInner() {
  const [filters, setFilters] = useState({ colors: [], types: [], sort: null, onSale: false });
  const [query, setQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const controlsRef = useRef(null);
  const controlsInView = useInView(controlsRef, { once: true, margin: "-60px" });
  const { count, setIsOpen } = useCart();

  let filtered = PRODUCTS.filter((p) => {
    const q = query.toLowerCase().trim();
    const matchesSearch = !q || [p.name, p.category, p.description].some((s) => s && s.toLowerCase().includes(q));
    const matchesColor = filters.colors.length === 0 || filters.colors.includes(p.color);
    const matchesType =
      filters.types.length === 0 ||
      filters.types.includes(p.type) ||
      (filters.types.includes("accessory") && p.category === "ACCESSORY");
    const matchesSale = !filters.onSale || p.onSale;
    return matchesSearch && matchesColor && matchesType && matchesSale;
  });

  if (filters.sort === "price_asc") filtered = [...filtered].sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
  if (filters.sort === "price_desc") filtered = [...filtered].sort((a, b) => parsePrice(b.price) - parsePrice(a.price));

  const saleEmpty = filters.onSale && filtered.length === 0;

  return (
    <div className="min-h-screen bg-white">
      {/* ── Yellow decorated top: navbar + hero share one background ── */}
      <div
        className="relative"
        style={{
          backgroundImage: `url('${YELLOW_BG}')`,
          backgroundColor: "#FFCD10",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        <Navbar transparent />
        <SwagHero />
      </div>

      {/* Floating cart button */}
      {count > 0 && (
        <motion.button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-5 py-3.5 rounded-full text-white font-extrabold text-sm shadow-2xl"
          style={{
            fontFamily: "'Poppins', sans-serif",
            background: "linear-gradient(135deg, #00A9D6 0%, #0099b8 100%)",
            boxShadow: "0 8px 28px rgba(0,169,214,0.45)",
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
        >
          <ShoppingBag className="w-4 h-4" />
          Cart · {count}
        </motion.button>
      )}

      {/* ── Products section ── */}
      <section
        className="relative"
        style={{ background: "linear-gradient(180deg, #ffffff 0%, #f8fdff 60%, #ffffff 100%)" }}
      >
        <FloatingObjects count={54} />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 15% 20%, rgba(0,169,214,0.04) 0%, transparent 40%),
                              radial-gradient(circle at 85% 60%, rgba(255,205,16,0.05) 0%, transparent 40%),
                              radial-gradient(circle at 50% 90%, rgba(255,70,51,0.04) 0%, transparent 35%)`,
          }}
        />

        <div className="max-w-7xl mx-auto px-6 py-14 relative z-10">

          {/* Section header */}
          <motion.div
            className="text-center mb-10 px-2"
            style={{ overflow: "visible" }}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-[#00A9D6] mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Official Merchandise
            </p>
            <h2
              className="font-extrabold text-[#1a1a2e] mx-auto"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.6rem, 4.5vw, 2.8rem)",
                lineHeight: 1.25,
                padding: "0.1em 0.25em 0.15em",
                overflow: "visible",
                whiteSpace: "normal",
              }}
            >
              Shop the Collection
            </h2>
            <div className="flex items-center justify-center gap-2 mt-3">
              <div className="h-px w-10 rounded-full bg-[#FFCD10]" />
              <div className="w-2 h-2 rounded-full bg-[#FF4633]" />
              <div className="h-px w-10 rounded-full bg-[#FFCD10]" />
            </div>
          </motion.div>

          {/* Search + filters */}
          <motion.div
            ref={controlsRef}
            className="flex flex-col sm:flex-row gap-3 mb-8 sm:justify-between sm:items-center"
            initial={{ opacity: 0, y: 14 }}
            animate={controlsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products…"
                className="w-full pl-11 pr-10 py-3 rounded-full border-2 border-gray-200 bg-white text-sm font-bold text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#00A9D6] transition-colors shadow-sm"
              />
              {query && (
                <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <FiltersPanel filters={filters} onChange={setFilters} />
          </motion.div>

          {filtered.length > 0 && (
            <motion.p className="text-xs font-bold text-gray-400 mb-5 uppercase tracking-wide" initial={{ opacity: 0 }} animate={controlsInView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}>
              {filtered.length} product{filtered.length !== 1 ? "s" : ""}
            </motion.p>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <div className="text-5xl mb-4">🐾</div>
              {saleEmpty ? (
                <p className="font-bold text-lg">No items are currently on sale.</p>
              ) : (
                <>
                  <p className="font-bold text-lg">No products found.</p>
                  <p className="text-sm mt-1">Try a different search or filter.</p>
                </>
              )}
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
            {filtered.map((item, i) => (
              <ProductCard key={item.id} item={item} index={i} onClick={() => setSelectedProduct(item)} />
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Modals / Drawer */}
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
      <CartDrawer />
    </div>
  );
}

export default function Swag() {
  return (
    <CartProvider>
      <SwagInner />
    </CartProvider>
  );
}