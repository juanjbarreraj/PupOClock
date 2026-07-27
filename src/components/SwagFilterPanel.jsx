import { useState, useRef, useEffect } from "react";
import { SlidersHorizontal, ChevronRight, ChevronLeft, X, Check } from "lucide-react";

const BREED_ICONS = {
  "Golden Retriever": (active) => (
    <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6 flex-shrink-0">
      <ellipse cx="20" cy="26" rx="13" ry="8" fill={active ? "white" : "#00A9D6"} opacity="0.9"/>
      <circle cx="20" cy="14" r="8" fill={active ? "white" : "#00A9D6"}/>
      <ellipse cx="11" cy="16" rx="4" ry="6" fill={active ? "white" : "#00A9D6"} opacity="0.75" transform="rotate(-10 11 16)"/>
      <ellipse cx="29" cy="16" rx="4" ry="6" fill={active ? "white" : "#00A9D6"} opacity="0.75" transform="rotate(10 29 16)"/>
      <circle cx="17" cy="13" r="1.5" fill={active ? "#00A9D6" : "white"}/>
      <circle cx="23" cy="13" r="1.5" fill={active ? "#00A9D6" : "white"}/>
      <circle cx="17.5" cy="13.5" r="0.7" fill="#333"/>
      <circle cx="23.5" cy="13.5" r="0.7" fill="#333"/>
      <ellipse cx="20" cy="17" rx="2" ry="1.3" fill="#5a3a1a"/>
      <path d="M33 22 Q39 16 37 12" stroke={active ? "white" : "#00A9D6"} strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.85"/>
    </svg>
  ),
  "French Bulldog": (active) => (
    <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6 flex-shrink-0">
      <ellipse cx="20" cy="27" rx="12" ry="7" fill={active ? "white" : "#00A9D6"} opacity="0.9"/>
      <rect x="10" y="8" width="20" height="16" rx="7" fill={active ? "white" : "#00A9D6"}/>
      <polygon points="10,14 5,5 13,10" fill={active ? "white" : "#00A9D6"} opacity="0.85"/>
      <polygon points="30,14 35,5 27,10" fill={active ? "white" : "#00A9D6"} opacity="0.85"/>
      <circle cx="16" cy="14" r="2" fill={active ? "#00A9D6" : "white"}/>
      <circle cx="24" cy="14" r="2" fill={active ? "#00A9D6" : "white"}/>
      <circle cx="16.5" cy="14.5" r="0.9" fill="#333"/>
      <circle cx="24.5" cy="14.5" r="0.9" fill="#333"/>
      <ellipse cx="20" cy="19.5" rx="2" ry="1.2" fill="#444"/>
    </svg>
  ),
  "German Shepherd": (active) => (
    <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6 flex-shrink-0">
      <ellipse cx="19" cy="27" rx="13" ry="7" fill={active ? "white" : "#00A9D6"} opacity="0.9"/>
      <ellipse cx="20" cy="13" rx="8" ry="7" fill={active ? "white" : "#00A9D6"}/>
      <polygon points="13,10 10,2 17,8" fill={active ? "white" : "#00A9D6"} opacity="0.9"/>
      <polygon points="27,10 30,2 23,8" fill={active ? "white" : "#00A9D6"} opacity="0.9"/>
      <circle cx="16.5" cy="12" r="1.5" fill={active ? "#00A9D6" : "white"}/>
      <circle cx="23.5" cy="12" r="1.5" fill={active ? "#00A9D6" : "white"}/>
      <circle cx="17" cy="12.5" r="0.7" fill="#333"/>
      <circle cx="24" cy="12.5" r="0.7" fill="#333"/>
      <ellipse cx="20" cy="17.5" rx="1.5" ry="1" fill="#333"/>
      <path d="M32 24 Q38 20 36 14" stroke={active ? "white" : "#00A9D6"} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.8"/>
    </svg>
  ),
  "Labrador Retriever": (active) => (
    <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6 flex-shrink-0">
      <ellipse cx="20" cy="27" rx="13" ry="8" fill={active ? "white" : "#00A9D6"} opacity="0.9"/>
      <circle cx="20" cy="14" r="9" fill={active ? "white" : "#00A9D6"}/>
      <ellipse cx="10" cy="17" rx="4" ry="5.5" fill={active ? "white" : "#00A9D6"} opacity="0.7"/>
      <ellipse cx="30" cy="17" rx="4" ry="5.5" fill={active ? "white" : "#00A9D6"} opacity="0.7"/>
      <circle cx="17" cy="13" r="1.8" fill={active ? "#00A9D6" : "white"}/>
      <circle cx="23" cy="13" r="1.8" fill={active ? "#00A9D6" : "white"}/>
      <circle cx="17.5" cy="13.5" r="0.8" fill="#333"/>
      <circle cx="23.5" cy="13.5" r="0.8" fill="#333"/>
      <ellipse cx="20" cy="18" rx="2.5" ry="1.5" fill="#333"/>
      <path d="M33 23 Q39 19 37 13" stroke={active ? "white" : "#00A9D6"} strokeWidth="3.5" strokeLinecap="round" fill="none" opacity="0.8"/>
    </svg>
  ),
  "Poodle": (active) => (
    <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6 flex-shrink-0">
      <circle cx="20" cy="28" r="7" fill={active ? "white" : "#00A9D6"} opacity="0.85"/>
      <circle cx="13" cy="30" r="4" fill={active ? "white" : "#00A9D6"} opacity="0.7"/>
      <circle cx="27" cy="30" r="4" fill={active ? "white" : "#00A9D6"} opacity="0.7"/>
      <circle cx="20" cy="13" r="8" fill={active ? "white" : "#00A9D6"}/>
      <circle cx="11" cy="15" r="4.5" fill={active ? "white" : "#00A9D6"} opacity="0.8"/>
      <circle cx="29" cy="15" r="4.5" fill={active ? "white" : "#00A9D6"} opacity="0.8"/>
      <circle cx="20" cy="6" r="4" fill={active ? "white" : "#00A9D6"} opacity="0.9"/>
      <circle cx="17" cy="13" r="1.5" fill={active ? "#00A9D6" : "white"}/>
      <circle cx="23" cy="13" r="1.5" fill={active ? "#00A9D6" : "white"}/>
      <circle cx="17.5" cy="13.5" r="0.7" fill="#333"/>
      <circle cx="23.5" cy="13.5" r="0.7" fill="#333"/>
      <ellipse cx="20" cy="17" rx="1.2" ry="1" fill="#333"/>
    </svg>
  ),
  "Chihuahua": (active) => (
    <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6 flex-shrink-0">
      <ellipse cx="20" cy="29" rx="9" ry="6" fill={active ? "white" : "#00A9D6"} opacity="0.9"/>
      <circle cx="20" cy="15" r="10" fill={active ? "white" : "#00A9D6"}/>
      <polygon points="10,12 4,2 14,9" fill={active ? "white" : "#00A9D6"} opacity="0.9"/>
      <polygon points="30,12 36,2 26,9" fill={active ? "white" : "#00A9D6"} opacity="0.9"/>
      <circle cx="16" cy="14" r="3" fill={active ? "#00A9D6" : "white"}/>
      <circle cx="24" cy="14" r="3" fill={active ? "#00A9D6" : "white"}/>
      <circle cx="16.5" cy="14.5" r="1.5" fill="#333"/>
      <circle cx="24.5" cy="14.5" r="1.5" fill="#333"/>
      <ellipse cx="20" cy="19" rx="1.2" ry="0.9" fill="#333"/>
    </svg>
  ),
  "Dachshund": (active) => (
    <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6 flex-shrink-0">
      <ellipse cx="21" cy="26" rx="16" ry="6" fill={active ? "white" : "#00A9D6"} opacity="0.9"/>
      <ellipse cx="10" cy="20" rx="7" ry="6" fill={active ? "white" : "#00A9D6"}/>
      <ellipse cx="6" cy="22" rx="5" ry="3" fill={active ? "white" : "#00A9D6"} opacity="0.8"/>
      <ellipse cx="14" cy="17" rx="3.5" ry="5" fill={active ? "white" : "#00A9D6"} opacity="0.7"/>
      <circle cx="9" cy="19" r="1.8" fill={active ? "#00A9D6" : "white"}/>
      <circle cx="9.5" cy="19.5" r="0.8" fill="#333"/>
      <ellipse cx="3" cy="22.5" rx="1.5" ry="1" fill="#333"/>
      <path d="M36 24 Q39 20 37 16" stroke={active ? "white" : "#00A9D6"} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.85"/>
    </svg>
  ),
  "Beagle": (active) => (
    <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6 flex-shrink-0">
      <ellipse cx="20" cy="27" rx="13" ry="7.5" fill={active ? "white" : "#00A9D6"} opacity="0.9"/>
      <circle cx="20" cy="14" r="8.5" fill={active ? "white" : "#00A9D6"}/>
      <ellipse cx="10" cy="18" rx="4" ry="7" fill={active ? "white" : "#00A9D6"} opacity="0.7" transform="rotate(-8 10 18)"/>
      <ellipse cx="30" cy="18" rx="4" ry="7" fill={active ? "white" : "#00A9D6"} opacity="0.7" transform="rotate(8 30 18)"/>
      <circle cx="16.5" cy="13" r="2" fill={active ? "#00A9D6" : "white"}/>
      <circle cx="23.5" cy="13" r="2" fill={active ? "#00A9D6" : "white"}/>
      <circle cx="17" cy="13.5" r="0.9" fill="#333"/>
      <circle cx="24" cy="13.5" r="0.9" fill="#333"/>
      <ellipse cx="20" cy="18" rx="2.5" ry="1.8" fill="#333"/>
      <path d="M33 23 Q38 17 35 12" stroke={active ? "white" : "#00A9D6"} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.8"/>
    </svg>
  ),
  "Husky": (active) => (
    <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6 flex-shrink-0">
      <ellipse cx="20" cy="27" rx="13" ry="8" fill={active ? "white" : "#00A9D6"} opacity="0.9"/>
      <circle cx="20" cy="13" r="9" fill={active ? "white" : "#00A9D6"}/>
      <polygon points="12,10 9,1 16,8" fill={active ? "white" : "#00A9D6"} opacity="0.95"/>
      <polygon points="28,10 31,1 24,8" fill={active ? "white" : "#00A9D6"} opacity="0.95"/>
      <circle cx="16.5" cy="12" r="2.2" fill={active ? "#00A9D6" : "white"}/>
      <circle cx="23.5" cy="12" r="2.2" fill={active ? "#00A9D6" : "white"}/>
      <circle cx="17" cy="12.5" r="1" fill="#4a90d9"/>
      <circle cx="24" cy="12.5" r="1" fill="#4a90d9"/>
      <ellipse cx="20" cy="17.5" rx="2" ry="1.3" fill="#333"/>
      <path d="M33 22 Q40 15 34 9 Q30 5 27 10" stroke={active ? "white" : "#00A9D6"} strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.8"/>
    </svg>
  ),
  "Corgi": (active) => (
    <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6 flex-shrink-0">
      <ellipse cx="20" cy="29" rx="14" ry="6" fill={active ? "white" : "#00A9D6"} opacity="0.9"/>
      <ellipse cx="20" cy="14" rx="10" ry="8" fill={active ? "white" : "#00A9D6"}/>
      <polygon points="11,11 7,1 15,9" fill={active ? "white" : "#00A9D6"} opacity="0.95"/>
      <polygon points="29,11 33,1 25,9" fill={active ? "white" : "#00A9D6"} opacity="0.95"/>
      <circle cx="16" cy="13" r="2" fill={active ? "#00A9D6" : "white"}/>
      <circle cx="24" cy="13" r="2" fill={active ? "#00A9D6" : "white"}/>
      <circle cx="16.5" cy="13.5" r="0.9" fill="#333"/>
      <circle cx="24.5" cy="13.5" r="0.9" fill="#333"/>
      <ellipse cx="20" cy="18.5" rx="1.8" ry="1.2" fill="#333"/>
      <ellipse cx="20" cy="21.5" rx="1.5" ry="1.2" fill="#FF4633" opacity="0.9"/>
    </svg>
  ),
};

const BREEDS = Object.keys(BREED_ICONS);

const SORT_OPTIONS = [
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Sale", value: "sale" },
];

export default function SwagFilterPanel({ sort, onSortChange, activeBreed, onBreedChange }) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState("main");
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        setView("main");
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleToggle = () => {
    if (open) { setOpen(false); setView("main"); }
    else setOpen(true);
  };

  const hasActiveFilter = sort || activeBreed;

  const activeLabel = (() => {
    if (activeBreed) return `Breed: ${activeBreed}`;
    if (sort === "price_asc") return "Price: Low to High";
    if (sort === "price_desc") return "Price: High to Low";
    if (sort === "sale") return "Sale";
    return null;
  })();

  return (
    <div className="flex items-center gap-3 flex-shrink-0" ref={ref}>
      <div className="relative">
        <button
          onClick={handleToggle}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full border-2 font-extrabold text-sm transition-all duration-200 whitespace-nowrap ${
            open || hasActiveFilter
              ? "bg-[#00A9D6] border-[#00A9D6] text-white shadow-md"
              : "bg-white border-gray-200 text-gray-600 hover:border-[#00A9D6] hover:text-[#00A9D6]"
          }`}
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          <SlidersHorizontal className="w-4 h-4" />
          {activeLabel ? activeLabel : "Filters"}
        </button>

        {open && (
          <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
            {view === "main" && (
              <div>
                <div className="px-4 pt-4 pb-2">
                  <p className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Sort &amp; Filter
                  </p>
                </div>
                <div className="divide-y divide-gray-50">
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        onSortChange(sort === opt.value ? null : opt.value);
                        onBreedChange(null);
                        setOpen(false);
                        setView("main");
                      }}
                      className="w-full flex items-center justify-between px-4 py-3 text-sm font-bold text-gray-700 hover:bg-[#f0fafe] hover:text-[#00A9D6] transition-colors"
                    >
                      {opt.label}
                      {sort === opt.value && <Check className="w-4 h-4 text-[#00A9D6]" />}
                    </button>
                  ))}
                  <button
                    onClick={() => setView("breed")}
                    className="w-full flex items-center justify-between px-4 py-3 text-sm font-bold text-gray-700 hover:bg-[#f0fafe] hover:text-[#00A9D6] transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      Filter by Breed
                      {activeBreed && (
                        <span className="text-[10px] bg-[#00A9D6] text-white rounded-full px-2 py-0.5">{activeBreed}</span>
                      )}
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
                {hasActiveFilter && (
                  <div className="px-4 pb-3 pt-1">
                    <button
                      onClick={() => { onSortChange(null); onBreedChange(null); setOpen(false); setView("main"); }}
                      className="w-full text-xs font-bold text-gray-400 hover:text-red-400 transition-colors text-center py-1"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>
            )}

            {view === "breed" && (
              <div>
                <div className="flex items-center gap-2 px-4 pt-4 pb-2 border-b border-gray-100">
                  <button onClick={() => setView("main")} className="text-gray-400 hover:text-[#00A9D6] transition-colors">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <p className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Filter by Breed
                  </p>
                </div>
                <div className="overflow-y-auto max-h-72">
                  {BREEDS.map((breed) => {
                    const isActive = activeBreed === breed;
                    return (
                      <button
                        key={breed}
                        onClick={() => {
                          onBreedChange(isActive ? null : breed);
                          onSortChange(null);
                          setOpen(false);
                          setView("main");
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold transition-colors ${
                          isActive ? "bg-[#00A9D6] text-white" : "text-gray-700 hover:bg-[#f0fafe] hover:text-[#00A9D6]"
                        }`}
                      >
                        {BREED_ICONS[breed](isActive)}
                        {breed}
                        {isActive && <Check className="w-4 h-4 ml-auto" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {hasActiveFilter && (
        <button
          onClick={() => { onSortChange(null); onBreedChange(null); }}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-red-50 hover:text-red-400 text-gray-500 rounded-full text-xs font-bold transition-colors"
        >
          <X className="w-3 h-3" />
          Clear
        </button>
      )}
    </div>
  );
}