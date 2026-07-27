import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import CloudField from "./CloudField";
import BrandCloud from "./BrandCloud";

const BASE = "https://cdn.prod.website-files.com/665f63081692354b822eb1c0/";
const FALLBACK = "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80";

function FloatingBone({ style, delay = 0, size = 48, color = "#00A9D6" }) {
  return (
    <motion.svg viewBox="0 0 80 32" xmlns="http://www.w3.org/2000/svg" className="absolute pointer-events-none" style={{ width: size, ...style }}
      animate={{ y: [0, -18, 0], rotate: [0, 10, 0], x: [0, 8, 0] }}
      transition={{ repeat: Infinity, duration: 10 + delay, delay, ease: "easeInOut" }}
    >
      <rect x="18" y="11" width="44" height="10" rx="5" fill={color} opacity="0.75" />
      <circle cx="12" cy="10" r="8" fill={color} opacity="0.75" />
      <circle cx="12" cy="22" r="8" fill={color} opacity="0.75" />
      <circle cx="68" cy="10" r="8" fill={color} opacity="0.75" />
      <circle cx="68" cy="22" r="8" fill={color} opacity="0.75" />
    </motion.svg>
  );
}

function FloatingBall({ style, delay = 0, size = 40, color = "#FF4633" }) {
  return (
    <motion.svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" className="absolute pointer-events-none" style={{ width: size, ...style }}
      animate={{ y: [0, -20, 0], x: [0, 8, 0], rotate: [0, 28, 0] }}
      transition={{ repeat: Infinity, duration: 11 + delay, delay, ease: "easeInOut" }}
    >
      <circle cx="20" cy="20" r="19" fill={color} opacity="0.7" />
      <path d="M6,14 Q20,8 34,14" stroke="white" strokeWidth="2" fill="none" opacity="0.5" strokeLinecap="round" />
      <path d="M4,22 Q20,16 36,22" stroke="white" strokeWidth="2" fill="none" opacity="0.5" strokeLinecap="round" />
    </motion.svg>
  );
}

function FloatingPaw({ style, delay = 0, size = 36, color = "#00A9D6" }) {
  return (
    <motion.svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" className="absolute pointer-events-none" style={{ width: size, ...style }}
      animate={{ y: [0, -14, 0], rotate: [0, -12, 0], x: [0, 6, 0] }}
      transition={{ repeat: Infinity, duration: 13 + delay, delay, ease: "easeInOut" }}
    >
      <ellipse cx="25" cy="32" rx="13" ry="11" fill={color} opacity="0.65" />
      <ellipse cx="11" cy="20" rx="6" ry="8" fill={color} opacity="0.65" />
      <ellipse cx="39" cy="20" rx="6" ry="8" fill={color} opacity="0.65" />
      <ellipse cx="21" cy="14" rx="5" ry="7" fill={color} opacity="0.65" />
      <ellipse cx="29" cy="14" rx="5" ry="7" fill={color} opacity="0.65" />
    </motion.svg>
  );
}

function FloatingStar({ style, delay = 0, size = 28, color = "#FF4633" }) {
  return (
    <motion.svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" className="absolute pointer-events-none" style={{ width: size, ...style }}
      animate={{ y: [0, -16, 0], scale: [1, 1.22, 1], rotate: [0, 22, 0] }}
      transition={{ repeat: Infinity, duration: 8 + delay, delay, ease: "easeInOut" }}
    >
      <polygon points="25,5 30,18 44,18 33,27 37,41 25,32 13,41 17,27 6,18 20,18" fill={color} opacity="0.7" />
    </motion.svg>
  );
}

export default function SwagHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const dogY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 35]);

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ minHeight: "520px" }}>
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 60% 50%, rgba(255,255,255,0.25) 0%, transparent 65%)" }}
      />

      {/* Free-floating animated cloud field — contained above the bottom wave */}
      <CloudField bottomInset={60} />

      {/* Floating objects */}
      <FloatingBone style={{ left: "2%", top: "18%" }} delay={0} size={52} color="#00A9D6" />
      <FloatingBone style={{ right: "3%", bottom: "22%" }} delay={1.5} size={38} color="#FF4633" />
      <FloatingBall style={{ left: "12%", bottom: "14%" }} delay={0.5} size={44} color="#FF4633" />
      <FloatingBall style={{ right: "8%", top: "28%" }} delay={2} size={34} color="#00A9D6" />
      <FloatingPaw style={{ left: "6%", top: "55%" }} delay={1} size={40} color="#1a1a2e" />
      <FloatingPaw style={{ right: "2%", top: "12%" }} delay={3} size={30} color="#00A9D6" />
      <FloatingStar style={{ left: "22%", top: "14%" }} delay={0.8} size={28} color="#FF4633" />
      <FloatingStar style={{ right: "14%", bottom: "18%" }} delay={2.5} size={22} color="#00A9D6" />

      {/* Content */}
      <div className="max-w-6xl mx-auto px-8 py-14 flex flex-col md:flex-row items-center min-h-[520px]">

        {/* Left */}
        <motion.div className="flex-1 z-10 md:pr-4 flex flex-col justify-center relative items-center md:items-start text-center md:text-left" style={{ y: textY }}>
          <motion.img
            src={BASE + "667f544040840f974380d688_Pup%20Web%20Blue%20Tennis%20Ball%20Dk%20Grey%20Air%20310%20x%20104.png"}
            alt=""
            className="w-20 mb-5 opacity-90"
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          />

          <motion.h1
            className="font-extrabold leading-none mb-3"
            style={{ fontFamily: "var(--font-display)" }}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="block" style={{ fontSize: "clamp(3.5rem, 10vw, 7rem)", color: "#00A9D6", letterSpacing: "-1px" }}>
              SWAG
            </span>
            <span className="block text-[#1a1a2e]" style={{ fontSize: "clamp(2.2rem, 6vw, 4.5rem)", letterSpacing: "-0.5px" }}>
              For Your
            </span>
            <span className="block" style={{ fontSize: "clamp(2.8rem, 8vw, 6rem)", color: "#FF4633", fontStyle: "italic", letterSpacing: "-1px" }}>
              Pack
            </span>
          </motion.h1>

          <motion.p
            className="text-[#1a1a2e]/70 font-bold text-base md:text-lg max-w-xs mt-2 leading-snug"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            Official Pup O'Clock gear for kids, dogs & the whole family.
          </motion.p>

          <motion.div
            className="flex items-center justify-center md:justify-start gap-2 mt-6"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.45, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="h-1 w-10 rounded-full bg-[#00A9D6]" />
            <div className="h-1 w-4 rounded-full bg-[#FF4633]" />
            <div className="h-1 w-2 rounded-full bg-[#1a1a2e]/30" />
          </motion.div>
        </motion.div>

        {/* Right */}
        <div className="flex-1 flex justify-center md:justify-end items-center relative mt-6 md:mt-0" style={{ minHeight: "400px" }}>
          <BrandCloud index={2} duration={28} amplitude={12} opacity={0.95} style={{ zIndex: 0, width: "105%", right: "-8%", top: "8%" }} />
          <BrandCloud index={4} duration={22} delay={3} amplitude={9} opacity={0.85} style={{ zIndex: 0, width: "42%", left: "-4%", bottom: "10%" }} />

          <motion.img
            src="https://media.base44.com/images/public/6a2c05717732611268059817/e7d351778_swagpopoclock.webp"
            alt="Pup Plush Dog Toy"
            className="relative drop-shadow-2xl"
            style={{ zIndex: 1, width: "clamp(280px, 38vw, 460px)", y: dogY }}
            initial={{ opacity: 0, scale: 0.88, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            onError={(e) => { e.target.src = FALLBACK; }}
          />
        </div>
      </div>

      {/* Wave */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ lineHeight: 0 }}>
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 60, marginBottom: "-2px" }}>
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}