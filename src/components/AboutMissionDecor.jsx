import { motion } from "framer-motion";

/* ── Tiny brand SVGs ── */
export function Paw({ size = 36, color = "#00A9D6", opacity = 0.12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={{ opacity }}>
      <ellipse cx="20" cy="12" rx="7" ry="9" fill={color} />
      <ellipse cx="44" cy="12" rx="7" ry="9" fill={color} />
      <ellipse cx="10" cy="28" rx="6" ry="8" fill={color} />
      <ellipse cx="54" cy="28" rx="6" ry="8" fill={color} />
      <path d="M32 20 C16 20 10 32 12 44 C14 54 22 58 32 58 C42 58 50 54 52 44 C54 32 48 20 32 20 Z" fill={color} />
    </svg>
  );
}

export function Bone({ size = 40, color = "#FFCD10", opacity = 0.12 }) {
  return (
    <svg width={size} height={size * 0.4} viewBox="0 0 80 32" fill="none" style={{ opacity }}>
      <circle cx="12" cy="10" r="8" fill={color} />
      <circle cx="12" cy="22" r="8" fill={color} />
      <circle cx="68" cy="10" r="8" fill={color} />
      <circle cx="68" cy="22" r="8" fill={color} />
      <rect x="16" y="8" width="48" height="16" rx="4" fill={color} />
    </svg>
  );
}

export function Ball({ size = 30, opacity = 0.12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" style={{ opacity }}>
      <circle cx="30" cy="30" r="28" fill="#FF4633" />
      <path d="M8 20 Q20 28 8 40" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M52 20 Q40 28 52 40" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function Treat({ size = 30, color = "#A88100", opacity = 0.12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" style={{ opacity }}>
      <rect x="10" y="10" width="40" height="40" rx="14" fill={color} />
      <circle cx="24" cy="26" r="3" fill="white" opacity="0.6" />
      <circle cx="38" cy="34" r="3" fill="white" opacity="0.6" />
      <circle cx="30" cy="44" r="2.5" fill="white" opacity="0.5" />
    </svg>
  );
}

/* ── Floating wrapper — fades in on scroll, then drifts slowly ── */
function Float({ children, style, delay = 0, duration = 10 }) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={style}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 1.4, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, 4, -4, 0] }}
        transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ── Subtle paw-print trail connecting the three cards (desktop only) ── */
export function PawTrail() {
  return (
    <svg
      viewBox="0 0 1000 120"
      preserveAspectRatio="none"
      className="hidden md:block absolute left-0 right-0 w-full pointer-events-none"
      style={{ top: "42%", height: 120, zIndex: 0 }}
    >
      <path
        d="M10,85 Q250,15 500,60 Q750,105 990,35"
        stroke="#00A9D6"
        strokeWidth="3"
        strokeDasharray="2 16"
        strokeLinecap="round"
        fill="none"
        opacity="0.3"
      />
    </svg>
  );
}

/* ── Full background decor layer for the mission section ── */
export default function MissionDecor() {
  return (
    <>
      {/* Corner gradient blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,169,214,0.09) 0%, transparent 70%)", transform: "translate(-35%, -35%)" }} />
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,205,16,0.10) 0%, transparent 70%)", transform: "translate(35%, -35%)" }} />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,70,51,0.07) 0%, transparent 70%)", transform: "translate(-35%, 35%)" }} />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,169,214,0.08) 0%, transparent 70%)", transform: "translate(35%, 35%)" }} />

      {/* Light dot texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(rgba(0,169,214,0.05) 1.5px, transparent 1.5px)", backgroundSize: "30px 30px" }}
      />

      {/* Floating pet objects — kept along the edges, away from text and cards */}
      <Float style={{ left: "2%", top: "8%" }} delay={0.3} duration={11}><Paw size={48} color="#00A9D6" opacity={0.11} /></Float>
      <Float style={{ left: "4%", top: "48%" }} delay={1.1} duration={9}><Bone size={46} color="#FFCD10" opacity={0.14} /></Float>
      <Float style={{ left: "2%", bottom: "8%" }} delay={0.7} duration={12}><Ball size={34} opacity={0.11} /></Float>
      <Float style={{ right: "3%", top: "10%" }} delay={0.5} duration={10}><Bone size={50} color="#FF4633" opacity={0.10} /></Float>
      <Float style={{ right: "2%", top: "46%" }} delay={1.4} duration={8}><Treat size={34} opacity={0.13} /></Float>
      <Float style={{ right: "4%", bottom: "10%" }} delay={0.9} duration={13}><Paw size={54} color="#FFCD10" opacity={0.12} /></Float>
      <Float style={{ left: "20%", top: "3%" }} delay={1.7} duration={9}><Ball size={24} opacity={0.09} /></Float>
      <Float style={{ right: "20%", bottom: "3%" }} delay={1.2} duration={11}><Paw size={30} color="#FF4633" opacity={0.09} /></Float>
    </>
  );
}