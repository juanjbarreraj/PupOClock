import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── SVG Pet Icons ────────────────────────────────────────────────────────────
// Each returns an SVG at a given size/color

function PawSVG({ size, color, opacity }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" style={{ opacity }}>
      <ellipse cx="50" cy="72" rx="22" ry="18" fill={color} />
      <ellipse cx="30" cy="52" rx="10" ry="13" fill={color} />
      <ellipse cx="70" cy="52" rx="10" ry="13" fill={color} />
      <ellipse cx="22" cy="38" rx="8" ry="10" fill={color} />
      <ellipse cx="78" cy="38" rx="8" ry="10" fill={color} />
      <ellipse cx="50" cy="38" rx="8" ry="10" fill={color} />
      {/* highlight */}
      <ellipse cx="43" cy="66" rx="7" ry="5" fill="rgba(255,255,255,0.3)" />
    </svg>
  );
}

function BoneSVG({ size, color, opacity }) {
  return (
    <svg width={size} height={size * 0.55} viewBox="0 0 160 88" fill="none" style={{ opacity }}>
      <rect x="34" y="28" width="92" height="32" rx="16" fill={color} />
      <circle cx="28" cy="22" r="18" fill={color} />
      <circle cx="28" cy="66" r="18" fill={color} />
      <circle cx="132" cy="22" r="18" fill={color} />
      <circle cx="132" cy="66" r="18" fill={color} />
      <ellipse cx="44" cy="36" rx="8" ry="5" fill="rgba(255,255,255,0.28)" />
    </svg>
  );
}

function TennisBallSVG({ size, color, opacity }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" style={{ opacity }}>
      <circle cx="50" cy="50" r="46" fill={color} />
      <path d="M 14 30 Q 50 50 14 70" stroke="white" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.55" />
      <path d="M 86 30 Q 50 50 86 70" stroke="white" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.55" />
      <ellipse cx="36" cy="34" rx="10" ry="6" fill="rgba(255,255,255,0.25)" transform="rotate(-20 36 34)" />
    </svg>
  );
}

function TreatSVG({ size, color, opacity }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" style={{ opacity }}>
      <rect x="28" y="20" width="44" height="60" rx="12" fill={color} />
      <rect x="20" y="36" width="60" height="28" rx="10" fill={color} />
      <circle cx="50" cy="50" r="10" fill="rgba(255,255,255,0.3)" />
      <line x1="50" y1="20" x2="50" y2="80" stroke="rgba(255,255,255,0.18)" strokeWidth="3" />
      <line x1="20" y1="50" x2="80" y2="50" stroke="rgba(255,255,255,0.18)" strokeWidth="3" />
      <ellipse cx="40" cy="36" rx="6" ry="4" fill="rgba(255,255,255,0.22)" />
    </svg>
  );
}

function ToyRingSVG({ size, color, opacity }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" style={{ opacity }}>
      <circle cx="50" cy="50" r="40" stroke={color} strokeWidth="16" fill="none" />
      <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.22)" strokeWidth="4" fill="none" />
      <ellipse cx="32" cy="28" rx="8" ry="4" fill="rgba(255,255,255,0.28)" transform="rotate(-35 32 28)" />
    </svg>
  );
}

function StarSVG({ size, color, opacity }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" style={{ opacity }}>
      <polygon
        points="50,8 61,36 92,36 68,56 77,84 50,66 23,84 32,56 8,36 39,36"
        fill={color}
      />
      <polygon
        points="50,8 61,36 92,36 68,56 77,84 50,66 23,84 32,56 8,36 39,36"
        fill="rgba(255,255,255,0.18)"
        clipPath="inset(0 50% 0 0)"
      />
      <ellipse cx="40" cy="32" rx="7" ry="4" fill="rgba(255,255,255,0.3)" transform="rotate(-20 40 32)" />
    </svg>
  );
}

// Object type definitions — cycling order for click interaction
const OBJECT_CYCLE = ["paw", "bone", "ball", "treat", "ring", "star"];

const OBJECT_LABELS = {
  paw: "Dog Paw",
  bone: "Bone",
  ball: "Tennis Ball",
  treat: "Treat",
  ring: "Toy Ring",
  star: "Gold Star",
};

function renderPetObject(type, size, color, opacity) {
  switch (type) {
    case "paw":   return <PawSVG size={size} color={color} opacity={opacity} />;
    case "bone":  return <BoneSVG size={size} color={color} opacity={opacity} />;
    case "ball":  return <TennisBallSVG size={size} color={color} opacity={opacity} />;
    case "treat": return <TreatSVG size={size} color={color} opacity={opacity} />;
    case "ring":  return <ToyRingSVG size={size} color={color} opacity={opacity} />;
    case "star":  return <StarSVG size={size} color={color} opacity={opacity} />;
    default:      return <PawSVG size={size} color={color} opacity={opacity} />;
  }
}

// ─── Single Interactive Pet Object ───────────────────────────────────────────
function PetObject({
  type = "paw",
  size = 52,
  color = "#00A9D6",
  opacity = 0.22,
  floatY = 12,
  floatDuration = 7,
  rotateDeg = 8,
  rotateDuration = 9,
  delay = 0,
  style = {},
  useSlowFloat = true,
}) {
  const [currentType, setCurrentType] = useState(type);
  const [isClicking, setIsClicking] = useState(false);
  const handleClick = useCallback(() => {
    setIsClicking(true);
    setTimeout(() => {
      const idx = OBJECT_CYCLE.indexOf(currentType);
      const next = OBJECT_CYCLE[(idx + 1) % OBJECT_CYCLE.length];
      setCurrentType(next);
      setIsClicking(false);
    }, 180);
  }, [currentType]);

  return (
    <div className="absolute" style={style}>
      <div style={{ position: "relative" }}>
        {/* The animated pet object — slower, more dramatic float */}
        <motion.div
          onClick={handleClick}
          animate={{
            y: [-(floatY / 2), floatY / 2, -(floatY / 2)],
            rotate: [-(rotateDeg / 2), rotateDeg / 2, -(rotateDeg / 2)],
          }}
          transition={{
            y: { duration: useSlowFloat ? 12 : floatDuration, delay, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: useSlowFloat ? 16 : rotateDuration, delay: delay + 0.5, repeat: Infinity, ease: "easeInOut" },
          }}
          whileHover={{
            scale: 1.22,
            filter: `drop-shadow(0 10px 28px ${color}99)`,
            transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
          }}
          whileTap={{ scale: 0.85, rotate: 18, transition: { duration: 0.35 } }}
          style={{
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            filter: `drop-shadow(0 6px 18px ${color}55)`,
            userSelect: "none",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentType + (isClicking ? "_exit" : "")}
              initial={{ scale: 0.55, rotate: -35, opacity: 0, y: 15 }}
              animate={{ scale: 1, rotate: 0, opacity: 1, y: 0 }}
              exit={{ scale: 0.55, rotate: 35, opacity: 0, y: -15 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
              {renderPetObject(currentType, size, color, opacity)}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

// ─── HeroShapes ───────────────────────────────────────────────────────────────
export function HeroShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 1, pointerEvents: "none" }}>
      <div style={{ pointerEvents: "auto" }}>
        <PetObject type="ball"  size={64} color="#FFCD10" opacity={0.9} floatY={16} floatDuration={8}  rotateDeg={12} delay={0}   style={{ top: "8%",  left: "2%" }} />
        <PetObject type="paw"   size={52} color="#ffffff" opacity={0.7} floatY={12} floatDuration={7}  rotateDeg={10} delay={1}   style={{ top: "60%", left: "1%" }} />
        <PetObject type="bone"  size={72} color="#FF4633" opacity={0.8} floatY={14} floatDuration={9}  rotateDeg={8}  delay={0.5} style={{ top: "18%", right: "3%" }} />
        <PetObject type="treat" size={46} color="#FFCD10" opacity={0.85}floatY={10} floatDuration={6}  rotateDeg={14} delay={1.5} style={{ bottom: "10%", right: "6%" }} />
        <PetObject type="ring"  size={54} color="#ffffff" opacity={0.65}floatY={10} floatDuration={10} rotateDeg={20} delay={2}   style={{ bottom: "5%", left: "12%" }} />
        <PetObject type="star"  size={40} color="#FFCD10" opacity={0.8} floatY={8}  floatDuration={7}  rotateDeg={6}  delay={0.8} style={{ top: "5%",  right: "20%" }} />
      </div>
    </div>
  );
}

// ─── SectionShapes ────────────────────────────────────────────────────────────
export function SectionShapes({ flip = false, colorA = "#00A9D6", colorB = "#FFCD10", colorC = "#FF4633" }) {
  const side = flip ? "right" : "left";
  const opp  = flip ? "left"  : "right";
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 1, pointerEvents: "none" }}>
      <div style={{ pointerEvents: "auto" }}>
        <PetObject type="paw"   size={52} color={colorA} opacity={0.8}  floatY={14} floatDuration={9}  rotateDeg={10} delay={0}   style={{ top: "8%",  [side]: "1%" }} />
        <PetObject type="bone"  size={60} color={colorB} opacity={0.8}  floatY={12} floatDuration={8}  rotateDeg={8}  delay={0.7} style={{ bottom: "8%", [opp]: "2%" }} />
        <PetObject type="ball"  size={44} color={colorC} opacity={0.85} floatY={10} floatDuration={7}  rotateDeg={12} delay={1.2} style={{ top: "45%", [opp]: "1%" }} />
        <PetObject type="treat" size={38} color={colorA} opacity={0.75} floatY={9}  floatDuration={10} rotateDeg={16} delay={1.8} style={{ top: "22%", [side]: "8%" }} />
      </div>
    </div>
  );
}