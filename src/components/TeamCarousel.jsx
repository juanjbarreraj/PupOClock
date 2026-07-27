import { useState, useRef } from "react";
import { motion, useMotionValue, animate, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const team = [
  {
    name: "Brian & Luca Manni",
    role: "CEO and Co-Founder",
    img: "/images/team/2d950593-010e-4745-84c3-65d0c6472ea8.png",
    pos: "center 30%",
    quote: "My son Luca and I founded Pup O'Clock in 2024. Since that time we have fine tuned the company to include Education, Enrichment and Entertainment thereby fostering a child's forever relationship with their dog. In addition, our team includes Dr. Daisy, a UK based Veterinarian and Tori Mistick, a Certified Enrichment Expert.",
    accent: "#00A9D6",
    bg: "linear-gradient(145deg, #e8f9ff 0%, #c8effa 100%)",
  },
  {
    name: "Dr. Daisy May",
    role: "Veterinarian",
    img: "/images/team/DrDaisy.png",
    quote: "Dr. Daisy is a Veterinary Surgeon with Distinction, specializing in canine nutrition and responsible pet ownership. She ensures every Pup O'Clock box contains safe, vet-approved content that supports the health and happiness of your dog.",
    accent: "#FF4633",
    bg: "linear-gradient(145deg, #fff0f4 0%, #ffd6e3 100%)",
  },
  {
    name: "Christopher Breakwell",
    role: "Executive Advisor",
    img: "/images/team/ChrisBreakwell.png",
    quote: "A versatile executive with a career spanning banking, entertainment, and entrepreneurship. After senior roles at National City Bank and JP Morgan, Chris founded 31st Street Studios, producing 30+ film and TV projects. He now advises startups and drives strategic growth.",
    accent: "#FFCD10",
    bg: "linear-gradient(145deg, #fffce8 0%, #fff0b0 100%)",
  },
  {
    name: "Tori Mistick",
    role: "Canine Enrichment Specialist",
    img: "/images/team/SD7swNSc.jpg",
    quote: "Tori is a certified canine enrichment specialist and founder of Wear Wag Repeat. A QVC Program Host reaching millions of households, her science-backed enrichment expertise has been featured in The Wall Street Journal, Good Morning America, and Good Housekeeping.",
    accent: "#00A9D6",
    bg: "linear-gradient(145deg, #e8f9ff 0%, #c8effa 100%)",
  },
  {
    name: "Pup",
    role: "Mascot",
    img: "/images/team/bd43f6d8-d222-41a2-9b90-497cc8ebd84e.png",
    hoverImg: "/images/team/a4433166-9574-495f-be1d-b1c313a6a0e6.png",
    quote: "Every tail wag, every happy bark — that's what we're here for. Bringing joy to kids and pups everywhere, one box at a time.",
    accent: "#FFCD10",
    bg: "linear-gradient(145deg, #fffce8 0%, #fff0b0 100%)",
  },
];

function getPos(index, current, total) {
  let diff = index - current;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
}

const CARD_W = 760;
const CARD_H = 380;
const SIDE_SCALE = 0.75;
const SIDE_W = CARD_W * SIDE_SCALE;
const GAP = 24;
const SIDE_X = CARD_W / 2 + SIDE_W / 2 + GAP;

function DesktopCard({ member, isCenter, onClickSide }) {
  return (
    <div
      className="flex h-full"
      onClick={!isCenter ? onClickSide : undefined}
      style={{ cursor: isCenter ? "default" : "pointer" }}
    >
      {/* Image column — fixed width, full height */}
      <div
        className="flex-shrink-0 relative overflow-hidden group"
        style={{
          width: 260,
          background: `radial-gradient(ellipse at 50% 55%, ${member.accent}22 0%, transparent 70%)`,
        }}
      >
        <img
          src={member.img}
          alt={member.name}
          className="absolute inset-0 w-full h-full drop-shadow-lg"
          style={{ objectFit: "cover", objectPosition: member.pos || "center top" }}
        />
        {member.hoverImg && (
          <img
            src={member.hoverImg}
            alt={member.name}
            className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out"
            style={{ objectFit: "cover", objectPosition: member.pos || "center top" }}
          />
        )}
      </div>

      {/* Text column */}
      <div className="flex-1 flex flex-col justify-center px-10 py-8 overflow-hidden">
        <h3
          className="font-extrabold text-[#1a1a2e] leading-none mb-1"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)" }}
        >
          {member.name}
        </h3>

        <p
          className="font-bold uppercase tracking-[0.14em] mb-5 text-xs"
          style={{ color: member.accent, fontFamily: "'Poppins', sans-serif" }}
        >
          {member.role}
        </p>

        <div className="flex items-center gap-2 mb-4">
          <div className="h-px w-8 rounded-full" style={{ background: member.accent }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: member.accent }} />
        </div>

        <p className="text-gray-600 text-sm leading-relaxed" style={{ lineHeight: "1.75" }}>
          {member.quote}
        </p>
      </div>
    </div>
  );
}

export default function TeamCarousel() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);
  const [showAlt, setShowAlt] = useState(false);
  const dragX = useMotionValue(0);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const isDragging = useRef(false);

  const go = (idx) => {
    const next = (idx + team.length) % team.length;
    setDir(next > current ? 1 : -1);
    setCurrent(next);
    setShowAlt(false);
    animate(dragX, 0, { duration: 0 });
  };
  const prev = () => go(current - 1);
  const next = () => go(current + 1);

  const SWIPE_THRESHOLD = 50;

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isDragging.current = false;
  };
  const handleTouchMove = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.touches[0].clientX - touchStartX.current;
    const dy = e.touches[0].clientY - touchStartY.current;
    if (!isDragging.current && Math.abs(dy) > Math.abs(dx)) return;
    isDragging.current = true;
    e.preventDefault();
    dragX.set(dx);
  };
  const handleTouchEnd = () => {
    if (!isDragging.current) { touchStartX.current = null; return; }
    const dx = dragX.get();
    if (dx < -SWIPE_THRESHOLD) next();
    else if (dx > SWIPE_THRESHOLD) prev();
    else animate(dragX, 0, { type: "spring", stiffness: 300, damping: 30 });
    touchStartX.current = null;
    isDragging.current = false;
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      {/* Section header */}
      <motion.div
        className="text-center mb-14 px-6"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-[#00A9D6] mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
          Who Is Pup O'Clock?
        </p>
        <h2
          className="font-extrabold text-[#1a1a2e] leading-none"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.8rem, 6vw, 5rem)" }}
        >
          Meet Our Team
        </h2>
        <motion.div
          className="flex justify-center mt-5"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="h-1.5 w-20 rounded-full bg-[#FF4633]" />
        </motion.div>
      </motion.div>

      {/* ── Desktop carousel ── */}
      <div className="hidden md:flex items-center justify-center relative" style={{ height: CARD_H + 60 }}>
        {team.map((member, i) => {
          const pos = getPos(i, current, team.length);
          const isCenter = pos === 0;
          const isVisible = Math.abs(pos) <= 1;
          if (!isVisible) return null;

          const xOffset = pos * SIDE_X;
          const scale = isCenter ? 1 : SIDE_SCALE;
          const opacity = isCenter ? 1 : 0.42;
          const blur = isCenter ? 0 : 3;
          const zIndex = isCenter ? 20 : 10;

          return (
            <motion.div
              key={member.name}
              animate={{ x: xOffset, scale, opacity, filter: `blur(${blur}px)` }}
              transition={{ type: "spring", stiffness: 240, damping: 30 }}
              className="absolute rounded-[2rem] overflow-hidden shadow-2xl"
              style={{
                width: CARD_W,
                height: CARD_H,
                background: member.bg,
                cursor: isCenter ? "default" : "pointer",
                zIndex,
                boxShadow: isCenter
                  ? `0 32px 80px ${member.accent}30, 0 8px 24px rgba(0,0,0,0.12)`
                  : "0 8px 32px rgba(0,0,0,0.1)",
              }}
              whileHover={!isCenter ? { opacity: 0.58, transition: { duration: 0.25 } } : {}}
            >
              <div className="h-1.5 w-full flex-shrink-0" style={{ background: member.accent }} />
              <DesktopCard member={member} isCenter={isCenter} onClickSide={() => go(i)} />
            </motion.div>
          );
        })}

        {/* Arrows */}
        <motion.button
          onClick={prev}
          className="absolute z-30 w-12 h-12 rounded-full bg-white shadow-xl border border-gray-100 flex items-center justify-center"
          style={{ left: `calc(50% - ${SIDE_X + SIDE_W / 2 + 28}px)`, top: "50%", transform: "translateY(-50%)" }}
          whileHover={{ scale: 1.15, boxShadow: "0 8px 24px rgba(0,0,0,0.18)" }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft className="w-5 h-5 text-gray-500" />
        </motion.button>
        <motion.button
          onClick={next}
          className="absolute z-30 w-12 h-12 rounded-full bg-white shadow-xl border border-gray-100 flex items-center justify-center"
          style={{ right: `calc(50% - ${SIDE_X + SIDE_W / 2 + 28}px)`, top: "50%", transform: "translateY(-50%)" }}
          whileHover={{ scale: 1.15, boxShadow: "0 8px 24px rgba(0,0,0,0.18)" }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight className="w-5 h-5 text-gray-500" />
        </motion.button>
      </div>

      {/* ── Mobile ── */}
      <div
        className="md:hidden px-5 touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ userSelect: "none" }}
      >
        <div style={{ overflow: "hidden" }}>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={current}
              custom={dir}
              style={{ x: dragX, background: team[current].bg }}
              initial={{ opacity: 0, x: dir * 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -80 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl overflow-hidden shadow-xl"
            >
              <div className="h-1.5 w-full" style={{ background: team[current].accent }} />
              <div
                className="relative flex items-center justify-center px-4 pt-5"
                style={{ height: 320, background: `radial-gradient(ellipse at 50% 55%, ${team[current].accent}22 0%, transparent 70%)` }}
                onClick={() => team[current].hoverImg && setShowAlt((v) => !v)}
              >
                <img
                  src={team[current].img}
                  alt={team[current].name}
                  style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center bottom" }}
                  className={`drop-shadow-xl transition-opacity duration-500 ease-in-out ${showAlt && team[current].hoverImg ? "opacity-0" : "opacity-100"}`}
                />
                {team[current].hoverImg && (
                  <img
                    src={team[current].hoverImg}
                    alt={team[current].name}
                    style={{ width: "calc(100% - 2rem)", height: "calc(100% - 1.25rem)", objectFit: "contain", objectPosition: "center bottom" }}
                    className={`absolute bottom-0 left-4 drop-shadow-xl transition-opacity duration-500 ease-in-out ${showAlt ? "opacity-100" : "opacity-0"}`}
                  />
                )}
              </div>
              <div className="px-7 pb-8 pt-4">
                <h3 className="font-extrabold text-[#1a1a2e] text-2xl leading-none mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {team[current].name}
                </h3>
                <p className="font-bold uppercase tracking-widest text-xs mb-4" style={{ color: team[current].accent, fontFamily: "'Poppins', sans-serif" }}>
                  {team[current].role}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">{team[current].quote}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-4 mt-6">
          <motion.button onClick={prev} className="w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center" whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.9 }}>
            <ChevronLeft className="w-5 h-5 text-gray-500" />
          </motion.button>
          <div className="flex gap-2">
            {team.map((m, i) => (
              <motion.button key={i} onClick={() => go(i)} animate={{ width: i === current ? 28 : 8 }} transition={{ duration: 0.3 }} style={{ height: 8, borderRadius: 9999, background: i === current ? m.accent : "#d1d5db" }} />
            ))}
          </div>
          <motion.button onClick={next} className="w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center" whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.9 }}>
            <ChevronRight className="w-5 h-5 text-gray-500" />
          </motion.button>
        </div>
      </div>

      {/* Desktop dots + name pills */}
      <div className="hidden md:flex flex-col items-center gap-4 mt-10 px-6">
        <div className="flex items-center gap-3">
          {team.map((m, i) => (
            <motion.button key={i} onClick={() => go(i)} animate={{ width: i === current ? 32 : 8 }} transition={{ duration: 0.3 }} style={{ height: 8, borderRadius: 9999, background: i === current ? m.accent : "#d1d5db" }} />
          ))}
        </div>
        <div className="flex justify-center gap-3 flex-wrap">
          {team.map((m, i) => (
            <motion.button
              key={i}
              onClick={() => go(i)}
              className="text-xs font-extrabold uppercase tracking-widest px-5 py-2 rounded-full border-2"
              animate={{
                borderColor: i === current ? m.accent : "#e5e7eb",
                color: i === current ? m.accent : "#9ca3af",
                background: i === current ? `${m.accent}12` : "transparent",
                scale: i === current ? 1.05 : 1,
              }}
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.3 }}
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {m.name}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}