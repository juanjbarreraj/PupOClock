import { useState, useRef, useEffect } from "react";
import { SlidersHorizontal, X, Check } from "lucide-react";

const COLORS = [
  { label: "White", value: "white" },
  { label: "Black", value: "black" },
];

const TYPES = [
  { label: "Shirt", value: "shirt" },
  { label: "Polo", value: "polo" },
  { label: "Sweatshirt", value: "sweatshirt" },
  { label: "Hoodie", value: "hoodie" },
  { label: "Hat", value: "hat" },
  { label: "Accessory", value: "accessory" },
];

const PRICE = [
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
];

function Section({ title, children }) {
  return (
    <div className="px-4 py-3 border-b border-gray-50 last:border-b-0">
      <p className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
        {title}
      </p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border-2 text-xs font-extrabold transition-all duration-200 ${
        active
          ? "bg-[#00A9D6] border-[#00A9D6] text-white shadow-sm"
          : "bg-white border-gray-200 text-gray-600 hover:border-[#00A9D6] hover:text-[#00A9D6]"
      }`}
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {active && <Check className="w-3 h-3" />}
      {children}
    </button>
  );
}

// filters: { colors: [], types: [], sort: null, onSale: false }
export default function FiltersPanel({ filters, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const toggleIn = (key, value) => {
    const list = filters[key];
    onChange({
      ...filters,
      [key]: list.includes(value) ? list.filter((v) => v !== value) : [...list, value],
    });
  };

  const activeCount =
    filters.colors.length + filters.types.length + (filters.sort ? 1 : 0) + (filters.onSale ? 1 : 0);

  const clearAll = () => onChange({ colors: [], types: [], sort: null, onSale: false });

  return (
    <div className="flex items-center gap-3 flex-shrink-0" ref={ref}>
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full border-2 font-extrabold text-sm transition-all duration-200 whitespace-nowrap ${
            open || activeCount > 0
              ? "bg-[#00A9D6] border-[#00A9D6] text-white shadow-md"
              : "bg-white border-gray-200 text-gray-600 hover:border-[#00A9D6] hover:text-[#00A9D6]"
          }`}
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {activeCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-white text-[#00A9D6] text-[10px] font-extrabold flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </button>

        {open && (
          <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
            <Section title="Color">
              {COLORS.map((c) => (
                <Chip key={c.value} active={filters.colors.includes(c.value)} onClick={() => toggleIn("colors", c.value)}>
                  {c.label}
                </Chip>
              ))}
            </Section>

            <Section title="Product Type">
              {TYPES.map((t) => (
                <Chip key={t.value} active={filters.types.includes(t.value)} onClick={() => toggleIn("types", t.value)}>
                  {t.label}
                </Chip>
              ))}
            </Section>

            <Section title="Price">
              {PRICE.map((p) => (
                <Chip
                  key={p.value}
                  active={filters.sort === p.value}
                  onClick={() => onChange({ ...filters, sort: filters.sort === p.value ? null : p.value })}
                >
                  {p.label}
                </Chip>
              ))}
            </Section>

            <Section title="Sale / Discount">
              <Chip active={filters.onSale} onClick={() => onChange({ ...filters, onSale: !filters.onSale })}>
                On Sale
              </Chip>
            </Section>

            {activeCount > 0 && (
              <div className="px-4 py-3 bg-gray-50">
                <button
                  onClick={clearAll}
                  className="w-full text-xs font-bold text-gray-400 hover:text-red-400 transition-colors text-center"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {activeCount > 0 && (
        <button
          onClick={clearAll}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-red-50 hover:text-red-400 text-gray-500 rounded-full text-xs font-bold transition-colors"
        >
          <X className="w-3 h-3" />
          Clear
        </button>
      )}
    </div>
  );
}