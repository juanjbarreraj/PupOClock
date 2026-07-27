const breeds = [
  {
    name: "All Breeds",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="20" cy="20" r="18" fill="currentColor" opacity="0.15"/>
        <text x="20" y="26" textAnchor="middle" fontSize="18" fill="currentColor">🐾</text>
      </svg>
    ),
  },
  {
    name: "Golden Retriever",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Body */}
        <ellipse cx="20" cy="26" rx="13" ry="8" fill="currentColor" opacity="0.9"/>
        {/* Head */}
        <circle cx="20" cy="14" r="8" fill="currentColor"/>
        {/* Floppy ears */}
        <ellipse cx="11" cy="16" rx="4" ry="6" fill="currentColor" opacity="0.75" transform="rotate(-10 11 16)"/>
        <ellipse cx="29" cy="16" rx="4" ry="6" fill="currentColor" opacity="0.75" transform="rotate(10 29 16)"/>
        {/* Eyes */}
        <circle cx="17" cy="13" r="1.5" fill="white"/>
        <circle cx="23" cy="13" r="1.5" fill="white"/>
        <circle cx="17.5" cy="13.5" r="0.7" fill="#333"/>
        <circle cx="23.5" cy="13.5" r="0.7" fill="#333"/>
        {/* Nose */}
        <ellipse cx="20" cy="17" rx="2" ry="1.3" fill="#5a3a1a"/>
        {/* Tail */}
        <path d="M33 22 Q39 16 37 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.85"/>
      </svg>
    ),
  },
  {
    name: "French Bulldog",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Body */}
        <ellipse cx="20" cy="27" rx="12" ry="7" fill="currentColor" opacity="0.9"/>
        {/* Head — wider/squarish */}
        <rect x="10" y="8" width="20" height="16" rx="7" fill="currentColor"/>
        {/* Bat ears */}
        <polygon points="10,14 5,5 13,10" fill="currentColor" opacity="0.85"/>
        <polygon points="30,14 35,5 27,10" fill="currentColor" opacity="0.85"/>
        {/* Eyes */}
        <circle cx="16" cy="14" r="2" fill="white"/>
        <circle cx="24" cy="14" r="2" fill="white"/>
        <circle cx="16.5" cy="14.5" r="0.9" fill="#333"/>
        <circle cx="24.5" cy="14.5" r="0.9" fill="#333"/>
        {/* Snout */}
        <ellipse cx="20" cy="19" rx="4" ry="2.5" fill="white" opacity="0.4"/>
        <ellipse cx="20" cy="19.5" rx="2" ry="1.2" fill="#444"/>
        {/* Wrinkle lines */}
        <line x1="16" y1="18" x2="18" y2="20" stroke="white" strokeWidth="0.8" opacity="0.5"/>
        <line x1="24" y1="18" x2="22" y2="20" stroke="white" strokeWidth="0.8" opacity="0.5"/>
      </svg>
    ),
  },
  {
    name: "German Shepherd",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Body */}
        <ellipse cx="19" cy="27" rx="13" ry="7" fill="currentColor" opacity="0.9"/>
        {/* Head */}
        <ellipse cx="20" cy="13" rx="8" ry="7" fill="currentColor"/>
        {/* Pointed ears */}
        <polygon points="13,10 10,2 17,8" fill="currentColor" opacity="0.9"/>
        <polygon points="27,10 30,2 23,8" fill="currentColor" opacity="0.9"/>
        {/* Inner ears */}
        <polygon points="13,10 11,4 16,8" fill="white" opacity="0.3"/>
        <polygon points="27,10 29,4 24,8" fill="white" opacity="0.3"/>
        {/* Eyes */}
        <circle cx="16.5" cy="12" r="1.5" fill="white"/>
        <circle cx="23.5" cy="12" r="1.5" fill="white"/>
        <circle cx="17" cy="12.5" r="0.7" fill="#333"/>
        <circle cx="24" cy="12.5" r="0.7" fill="#333"/>
        {/* Snout — longer/pointed */}
        <ellipse cx="20" cy="17" rx="3" ry="2" fill="currentColor" opacity="0.6"/>
        <ellipse cx="20" cy="17.5" rx="1.5" ry="1" fill="#333"/>
        {/* Tail */}
        <path d="M32 24 Q38 20 36 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.8"/>
      </svg>
    ),
  },
  {
    name: "Labrador",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Body — stocky */}
        <ellipse cx="20" cy="27" rx="13" ry="8" fill="currentColor" opacity="0.9"/>
        {/* Head — round */}
        <circle cx="20" cy="14" r="9" fill="currentColor"/>
        {/* Floppy ears */}
        <ellipse cx="10" cy="17" rx="4" ry="5.5" fill="currentColor" opacity="0.7" transform="rotate(-5 10 17)"/>
        <ellipse cx="30" cy="17" rx="4" ry="5.5" fill="currentColor" opacity="0.7" transform="rotate(5 30 17)"/>
        {/* Eyes */}
        <circle cx="17" cy="13" r="1.8" fill="white"/>
        <circle cx="23" cy="13" r="1.8" fill="white"/>
        <circle cx="17.5" cy="13.5" r="0.8" fill="#333"/>
        <circle cx="23.5" cy="13.5" r="0.8" fill="#333"/>
        {/* Wide nose */}
        <ellipse cx="20" cy="18" rx="2.5" ry="1.5" fill="#333"/>
        {/* Smile */}
        <path d="M17 20 Q20 22 23 20" stroke="white" strokeWidth="1" fill="none" opacity="0.6"/>
        {/* Tail */}
        <path d="M33 23 Q39 19 37 13" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" fill="none" opacity="0.8"/>
      </svg>
    ),
  },
  {
    name: "Poodle",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Poodle puffs on body */}
        <circle cx="20" cy="28" r="7" fill="currentColor" opacity="0.85"/>
        <circle cx="13" cy="30" r="4" fill="currentColor" opacity="0.7"/>
        <circle cx="27" cy="30" r="4" fill="currentColor" opacity="0.7"/>
        {/* Head puff */}
        <circle cx="20" cy="13" r="8" fill="currentColor"/>
        {/* Ear puffs */}
        <circle cx="11" cy="15" r="4.5" fill="currentColor" opacity="0.8"/>
        <circle cx="29" cy="15" r="4.5" fill="currentColor" opacity="0.8"/>
        {/* Top knot puff */}
        <circle cx="20" cy="6" r="4" fill="currentColor" opacity="0.9"/>
        {/* Eyes */}
        <circle cx="17" cy="13" r="1.5" fill="white"/>
        <circle cx="23" cy="13" r="1.5" fill="white"/>
        <circle cx="17.5" cy="13.5" r="0.7" fill="#333"/>
        <circle cx="23.5" cy="13.5" r="0.7" fill="#333"/>
        {/* Nose — narrow/pointy */}
        <ellipse cx="20" cy="17" rx="1.2" ry="1" fill="#333"/>
      </svg>
    ),
  },
  {
    name: "Chihuahua",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Small body */}
        <ellipse cx="20" cy="29" rx="9" ry="6" fill="currentColor" opacity="0.9"/>
        {/* Large round head */}
        <circle cx="20" cy="15" r="10" fill="currentColor"/>
        {/* Big ears */}
        <polygon points="10,12 4,2 14,9" fill="currentColor" opacity="0.9"/>
        <polygon points="30,12 36,2 26,9" fill="currentColor" opacity="0.9"/>
        {/* Inner ears */}
        <polygon points="10,12 5,4 13,9" fill="white" opacity="0.3"/>
        <polygon points="30,12 35,4 27,9" fill="white" opacity="0.3"/>
        {/* Big eyes */}
        <circle cx="16" cy="14" r="3" fill="white"/>
        <circle cx="24" cy="14" r="3" fill="white"/>
        <circle cx="16.5" cy="14.5" r="1.5" fill="#333"/>
        <circle cx="24.5" cy="14.5" r="1.5" fill="#333"/>
        <circle cx="16" cy="13.5" r="0.5" fill="white"/>
        <circle cx="24" cy="13.5" r="0.5" fill="white"/>
        {/* Tiny nose */}
        <ellipse cx="20" cy="19" rx="1.2" ry="0.9" fill="#333"/>
      </svg>
    ),
  },
  {
    name: "Dachshund",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Long body */}
        <ellipse cx="21" cy="26" rx="16" ry="6" fill="currentColor" opacity="0.9"/>
        {/* Small head */}
        <ellipse cx="10" cy="20" rx="7" ry="6" fill="currentColor"/>
        {/* Long snout */}
        <ellipse cx="6" cy="22" rx="5" ry="3" fill="currentColor" opacity="0.8"/>
        {/* Floppy ear */}
        <ellipse cx="14" cy="17" rx="3.5" ry="5" fill="currentColor" opacity="0.7"/>
        {/* Eye */}
        <circle cx="9" cy="19" r="1.8" fill="white"/>
        <circle cx="9.5" cy="19.5" r="0.8" fill="#333"/>
        {/* Nose */}
        <ellipse cx="3" cy="22.5" rx="1.5" ry="1" fill="#333"/>
        {/* Tail — upright */}
        <path d="M36 24 Q39 20 37 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.85"/>
        {/* Tiny legs */}
        <rect x="14" y="30" width="3" height="5" rx="1.5" fill="currentColor" opacity="0.7"/>
        <rect x="22" y="30" width="3" height="5" rx="1.5" fill="currentColor" opacity="0.7"/>
      </svg>
    ),
  },
  {
    name: "Beagle",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Body */}
        <ellipse cx="20" cy="27" rx="13" ry="7.5" fill="currentColor" opacity="0.9"/>
        {/* Head */}
        <circle cx="20" cy="14" r="8.5" fill="currentColor"/>
        {/* Long floppy ears */}
        <ellipse cx="10" cy="18" rx="4" ry="7" fill="currentColor" opacity="0.7" transform="rotate(-8 10 18)"/>
        <ellipse cx="30" cy="18" rx="4" ry="7" fill="currentColor" opacity="0.7" transform="rotate(8 30 18)"/>
        {/* White blaze on forehead */}
        <ellipse cx="20" cy="11" rx="3" ry="4" fill="white" opacity="0.2"/>
        {/* Eyes */}
        <circle cx="16.5" cy="13" r="2" fill="white"/>
        <circle cx="23.5" cy="13" r="2" fill="white"/>
        <circle cx="17" cy="13.5" r="0.9" fill="#333"/>
        <circle cx="24" cy="13.5" r="0.9" fill="#333"/>
        {/* Nose — wide */}
        <ellipse cx="20" cy="18" rx="2.5" ry="1.8" fill="#333"/>
        {/* Happy mouth */}
        <path d="M17 20 Q20 23 23 20" stroke="white" strokeWidth="1.2" fill="none" opacity="0.5"/>
        {/* Tail up */}
        <path d="M33 23 Q38 17 35 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.8"/>
      </svg>
    ),
  },
  {
    name: "Husky",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Body */}
        <ellipse cx="20" cy="27" rx="13" ry="8" fill="currentColor" opacity="0.9"/>
        {/* White chest */}
        <ellipse cx="20" cy="26" rx="7" ry="5" fill="white" opacity="0.25"/>
        {/* Head */}
        <circle cx="20" cy="13" r="9" fill="currentColor"/>
        {/* White face mask */}
        <ellipse cx="20" cy="15" rx="5" ry="5" fill="white" opacity="0.25"/>
        {/* Pointed ears */}
        <polygon points="12,10 9,1 16,8" fill="currentColor" opacity="0.95"/>
        <polygon points="28,10 31,1 24,8" fill="currentColor" opacity="0.95"/>
        {/* Inner ears */}
        <polygon points="12,10 10,3 15,8" fill="white" opacity="0.35"/>
        <polygon points="28,10 30,3 25,8" fill="white" opacity="0.35"/>
        {/* Striking blue-ish eyes (rendered white for icon) */}
        <circle cx="16.5" cy="12" r="2.2" fill="white"/>
        <circle cx="23.5" cy="12" r="2.2" fill="white"/>
        <circle cx="17" cy="12.5" r="1" fill="#4a90d9"/>
        <circle cx="24" cy="12.5" r="1" fill="#4a90d9"/>
        <circle cx="16.7" cy="12" r="0.4" fill="white"/>
        <circle cx="23.7" cy="12" r="0.4" fill="white"/>
        {/* Nose */}
        <ellipse cx="20" cy="17.5" rx="2" ry="1.3" fill="#333"/>
        {/* Bushy tail curled up */}
        <path d="M33 22 Q40 15 34 9 Q30 5 27 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.8"/>
      </svg>
    ),
  },
  {
    name: "Corgi",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Low wide body */}
        <ellipse cx="20" cy="29" rx="14" ry="6" fill="currentColor" opacity="0.9"/>
        {/* Head — wide */}
        <ellipse cx="20" cy="14" rx="10" ry="8" fill="currentColor"/>
        {/* Big upright ears */}
        <polygon points="11,11 7,1 15,9" fill="currentColor" opacity="0.95"/>
        <polygon points="29,11 33,1 25,9" fill="currentColor" opacity="0.95"/>
        {/* Inner ears */}
        <polygon points="11,11 8,3 14,9" fill="white" opacity="0.3"/>
        <polygon points="29,11 32,3 26,9" fill="white" opacity="0.3"/>
        {/* White face blaze */}
        <ellipse cx="20" cy="15" rx="5" ry="4" fill="white" opacity="0.2"/>
        {/* Eyes */}
        <circle cx="16" cy="13" r="2" fill="white"/>
        <circle cx="24" cy="13" r="2" fill="white"/>
        <circle cx="16.5" cy="13.5" r="0.9" fill="#333"/>
        <circle cx="24.5" cy="13.5" r="0.9" fill="#333"/>
        {/* Snout */}
        <ellipse cx="20" cy="18" rx="3.5" ry="2.5" fill="currentColor" opacity="0.6"/>
        <ellipse cx="20" cy="18.5" rx="1.8" ry="1.2" fill="#333"/>
        {/* Happy tongue */}
        <ellipse cx="20" cy="21.5" rx="1.5" ry="1.2" fill="#E8567A" opacity="0.9"/>
        {/* Stubby legs */}
        <rect x="12" y="33" width="4" height="5" rx="2" fill="currentColor" opacity="0.75"/>
        <rect x="24" y="33" width="4" height="5" rx="2" fill="currentColor" opacity="0.75"/>
      </svg>
    ),
  },
];

export default function BreedFilter({ activeBreed, onBreedChange }) {
  return (
    <div className="w-full mb-10">
      <p
        className="text-xs font-extrabold uppercase tracking-widest text-gray-400 mb-4"
        style={{ fontFamily: "'Arial Black', sans-serif" }}
      >
        Filter by Breed
      </p>
      <div className="flex flex-wrap gap-2">
        {breeds.map((breed) => {
          const isActive = activeBreed === breed.name;
          return (
            <button
              key={breed.name}
              onClick={() => onBreedChange(breed.name)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 font-bold text-xs transition-all duration-200 whitespace-nowrap ${
                isActive
                  ? "bg-[#00BFDF] border-[#00BFDF] text-white shadow-md scale-105"
                  : "bg-white border-gray-200 text-gray-600 hover:border-[#00BFDF] hover:text-[#00BFDF]"
              }`}
              style={{ fontFamily: "'Arial Black', sans-serif" }}
            >
              <span
                className={`w-6 h-6 flex-shrink-0 ${isActive ? "text-white" : "text-[#00BFDF]"}`}
              >
                {breed.icon}
              </span>
              {breed.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}