import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionShapes } from "./DecorativeShapes";
import { usePageTransition } from "./PageTransition";

/**
 * What's in a box.
 *
 * Centered stack: title and copy, then the open box popping in with three
 * sticker badges snapping on around it, then the six items that ship in every
 * box, each with its own product shot. Images live in public/images/home/box/
 * and have transparent backgrounds so they sit on the white cards without a
 * halo. The order below is the order on the page.
 */
/**
 * The hand of trading cards, one of every card, in left-to-right order. The
 * middle entries sit on top of the fan (later wins a tie), so Pup is just
 * right of centre and the backs are on the ends. The fan angle and spacing
 * scale with the count (see CardHand), and when spread the outer cards run
 * past the edge of the tile on purpose: the hand is for variety, not a
 * gallery.
 */
const TRADING_CARDS = [
  { src: "/images/home/box/cards/back-villains.webp", alt: "Villains League of Pups trading card, back" },
  { src: "/images/home/box/cards/tick.webp", alt: "Tick villain trading card" },
  { src: "/images/home/box/cards/wirefence.webp", alt: "Wire Fence villain trading card" },
  { src: "/images/home/box/cards/flea.webp", alt: "Flea villain trading card" },
  { src: "/images/home/box/cards/dani.webp", alt: "Dani trading card" },
  { src: "/images/home/box/cards/teddy.webp", alt: "Teddy trading card, a curious dog who loves to read" },
  { src: "/images/home/box/cards/pup.webp", alt: "Pup trading card, a funny dog always trying to help everyone" },
  { src: "/images/home/box/cards/tori.webp", alt: "Tori trading card, always coming up with exciting games" },
  { src: "/images/home/box/cards/daisy.webp", alt: "Daisy trading card" },
  { src: "/images/home/box/cards/shady.webp", alt: "Shady trading card" },
  { src: "/images/home/box/cards/steak.webp", alt: "Steak trading card" },
  { src: "/images/home/box/cards/back-league.webp", alt: "League of Pups trading card, back" },
];

const BOX_ITEMS = [
  {
    img: "/images/home/box/sodapup-toys.webp",
    label: "2 SodaPup Toys",
    blurb: "Two durable enrichment toys to chew, chase, and stuff with treats.",
    accent: "#00A9D6",
  },
  {
    img: "/images/home/box/givepet-treats.webp",
    label: "GivePet Treats",
    blurb: "Premium training treats from a brand that gives back to shelter dogs.",
    accent: "#FF4633",
  },
  {
    img: "/images/home/box/stickers-magnets.webp",
    label: "Stickers & Magnets",
    blurb: "League of Pups stickers and magnets for water bottles, fridges, and notebooks.",
    accent: "#FFCD10",
  },
  {
    hand: TRADING_CARDS,
    label: "Trading Cards",
    blurb: "A new League of Pups card to collect every month.",
    accent: "#FFCD10",
  },
  {
    img: "/images/home/box/bandana.webp",
    label: "Bandana",
    blurb: "A themed Pup O'Clock bandana so your dog can show off the month's look.",
    accent: "#00A9D6",
  },
  {
    img: "/images/home/box/magazine.webp",
    label: "The Magazine",
    blurb: "The only magazine for kids and pups: a training plan, comic, games, recipe, crafts, and activities.",
    accent: "#FF4633",
  },
];

/**
 * The three facts, styled as die-cut stickers stuck around the box. `place`
 * positions them on md+ screens; on phones they fall into a row under the box.
 */
const FACT_STICKERS = [
  {
    text: "6 items every month",
    bg: "#00A9D6",
    color: "#ffffff",
    rotate: -8,
    place: "md:left-0 md:top-[8%]",
  },
  {
    text: "Made for kids & dogs",
    bg: "#FFCD10",
    color: "#1a1a2e",
    rotate: 6,
    place: "md:right-0 md:top-[38%]",
  },
  {
    text: "A new theme each box",
    bg: "#FF4633",
    color: "#ffffff",
    rotate: -5,
    place: "md:left-[4%] md:bottom-[10%]",
  },
];

/** Existing decoration assets drifting around the box (desktop only). */
const DRIFTERS = [
  { src: "/images/decorations/IMG_6373.png", cls: "animate-float-slow", style: { left: "-2%", top: "22%", width: 64 } },
  { src: "/images/decorations/IMG_6377.png", cls: "animate-float-medium", style: { right: "2%", top: "6%", width: 54 } },
  { src: "/images/decorations/IMG_6375.png", cls: "animate-float-gentle", style: { right: "-1%", bottom: "16%", width: 58 } },
  { src: "/images/decorations/IMG_6376.png", cls: "animate-float-medium", style: { left: "22%", bottom: "-2%", width: 44 } },
  { src: "/images/decorations/IMG_6374.png", cls: "animate-float-slow", style: { right: "20%", bottom: "0%", width: 60 } },
];

const ease = [0.22, 1, 0.36, 1];
const pop = { type: "spring", stiffness: 190, damping: 15, mass: 0.9 };

function FactSticker({ sticker, index, reduce }) {
  return (
    <motion.li
      className={`md:absolute md:pointer-events-auto ${sticker.place}`}
      style={{ rotate: sticker.rotate }}
      initial={reduce ? false : { scale: 0, opacity: 0, rotate: sticker.rotate - 25 }}
      whileInView={{ scale: 1, opacity: 1, rotate: sticker.rotate }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ ...pop, stiffness: 320, damping: 17, delay: 0.55 + index * 0.18 }}
      whileHover={{ scale: 1.08, rotate: 0, transition: { duration: 0.35, ease } }}
    >
      <span
        className="block rounded-2xl px-5 py-2.5 md:px-6 md:py-3 uppercase whitespace-nowrap text-base md:text-lg leading-none"
        style={{
          background: sticker.bg,
          color: sticker.color,
          fontFamily: "var(--font-display)",
          fontWeight: 400,
          fontSynthesis: "none",
          letterSpacing: "0.04em",
          border: "4px solid #ffffff",
          boxShadow: "0 0 0 2px rgba(0,0,0,0.12), 0 14px 28px rgba(0,0,0,0.22)",
        }}
      >
        {sticker.text}
      </span>
    </motion.li>
  );
}

/**
 * A fanned hand of cards that spreads side by side on hover. Tapping toggles
 * the spread for touch screens, where there is no hover.
 */
function CardHand({ cards }) {
  const [open, setOpen] = useState(false);
  const mid = (cards.length - 1) / 2;
  // Keep the whole fan inside roughly the same arc however many cards there are.
  const handVars = /** @type {React.CSSProperties} */ (
    /** @type {unknown} */ ({
      "--fan": `${Math.min(13, 72 / cards.length)}deg`,
      "--gap": `${Math.min(26, 150 / cards.length)}%`,
    })
  );
  return (
    <button
      type="button"
      className={`card-hand${open ? " is-open" : ""}`}
      style={handVars}
      onClick={() => setOpen((o) => !o)}
      aria-pressed={open}
      aria-label={open ? "Stack the trading cards" : "Spread the trading cards"}
    >
      {cards.map((card, i) => {
        const slot = i - mid;
        // CSS custom properties are not in React's CSSProperties type.
        const vars = /** @type {React.CSSProperties} */ (
          /** @type {unknown} */ ({ "--i": slot, "--abs": Math.abs(slot) })
        );
        return (
          <span key={i} className="card-hand__card" style={vars}>
            <img src={card.src} alt={card.alt} loading="lazy" draggable="false" />
          </span>
        );
      })}
    </button>
  );
}

function ItemCard({ item, index }) {
  return (
    <motion.article
      className="group h-full"
      initial={{ opacity: 0, y: 56, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.95, delay: 0.1 + index * 0.12, ease }}
    >
      <motion.div
        className="relative bg-white rounded-[1.75rem] overflow-hidden h-full flex flex-col"
        style={{
          border: `2px solid ${item.accent}35`,
          boxShadow: "0 12px 36px rgba(0,0,0,0.14)",
        }}
        whileHover={{
          y: -10,
          boxShadow: `0 30px 60px rgba(0,0,0,0.2), 0 0 0 3px ${item.accent}`,
          transition: { duration: 0.5, ease },
        }}
      >
        {/* Number badge */}
        <span
          className="absolute top-4 left-4 z-10 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white"
          style={{ background: item.accent, fontFamily: "'Poppins', sans-serif" }}
          aria-hidden="true"
        >
          {index + 1}
        </span>

        {/* Product shot */}
        <div
          className="relative w-full flex items-center justify-center px-6 pt-10 pb-4 h-56 md:h-64"
          style={{
            background: `radial-gradient(ellipse at 50% 65%, ${item.accent}22 0%, transparent 70%)`,
          }}
        >
          {item.hand ? (
            <CardHand cards={item.hand} />
          ) : (
            <img
              src={item.img}
              alt={item.label}
              loading="lazy"
              className="max-h-full max-w-full object-contain transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              style={{ filter: "drop-shadow(0 12px 20px rgba(0,0,0,0.16))" }}
            />
          )}
        </div>

        {/* Accent bar */}
        <div className="relative h-1.5 w-full overflow-hidden flex-shrink-0" style={{ background: `${item.accent}55` }}>
          <div
            className="absolute inset-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ background: item.accent, transformOrigin: "center" }}
          />
        </div>

        {/* Copy */}
        <div className="px-6 pt-5 pb-6 flex-1 flex flex-col text-left">
          <h3
            className="font-extrabold text-xl md:text-2xl leading-tight mb-2"
            style={{ color: item.accent, fontFamily: "'Poppins', sans-serif" }}
          >
            {item.label}
          </h3>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">{item.blurb}</p>
        </div>
      </motion.div>
    </motion.article>
  );
}

export default function WhatsInBox() {
  const transitionTo = usePageTransition();
  const reduce = useReducedMotion();

  return (
    <section id="whats-in-a-box" className="w-full bg-pet-pattern py-24 relative overflow-hidden">
      <SectionShapes flip colorA="#00A9D6" colorB="#ffffff" colorC="#FFCD10" />

      <div className="max-w-[88rem] mx-auto px-5 md:px-10 relative text-center" style={{ zIndex: 2 }}>
        {/* Title + copy */}
        <motion.div
          className="text-white max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 44 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.0, ease }}
        >
          <p
            className="text-xs font-bold uppercase tracking-[0.25em] opacity-85 mb-4"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Every month
          </p>
          <h2
            className="text-4xl md:text-6xl uppercase mb-5 leading-none"
            style={{ fontFamily: "var(--font-display)", fontSynthesis: "none", textShadow: "3px 3px 0 rgba(0,0,0,0.18)" }}
          >
            What's in a box?
          </h2>
          <p className="text-white/90 text-lg md:text-xl leading-relaxed">
            Each month, you'll get a box chock full of amazing goodies to help every member of the
            family connect with your dog in a responsible, meaningful way!
          </p>
        </motion.div>

        {/* The box stage: open box, sticker facts, and drifting decorations */}
        <div className="relative max-w-4xl mx-auto mt-10 md:mt-14 mb-16 lg:mb-20">
          {DRIFTERS.map((d) => (
            <img
              key={d.src}
              src={d.src}
              alt=""
              aria-hidden="true"
              className={`hidden md:block absolute pointer-events-none select-none ${d.cls}`}
              style={d.style}
            />
          ))}

          <motion.img
            src="/images/home/box/open-box.webp"
            alt="An open Pup O'Clock box with toys, treats, trading cards, a bandana, stickers, and the magazine"
            className="relative w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto"
            style={{ filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.3))" }}
            initial={reduce ? false : { scale: 0.55, opacity: 0, y: 60 }}
            whileInView={{ scale: 1, opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ ...pop, delay: 0.15 }}
            whileHover={{ scale: 1.04, rotate: -1, transition: { duration: 0.7, ease } }}
          />

          <ul
            className="flex flex-wrap justify-center gap-3 mt-6 md:mt-0 md:block md:absolute md:inset-0 md:pointer-events-none list-none p-0 m-0"
            aria-label="Box highlights"
          >
            {FACT_STICKERS.map((s, i) => (
              <FactSticker key={s.text} sticker={s} index={i} reduce={reduce} />
            ))}
          </ul>
        </div>

        {/* The six items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-14">
          {BOX_ITEMS.map((item, i) => (
            <ItemCard key={item.label} item={item} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.a
          href="/subscribe"
          onClick={(e) => { e.preventDefault(); transitionTo("/subscribe"); }}
          className="btn-press btn-yellow inline-block text-[#1a1a2e] font-bold text-lg rounded-full cursor-pointer"
          style={{ boxShadow: "0 10px 32px rgba(255,205,16,0.5)", padding: "1.15rem 3rem" }}
          initial={{ opacity: 0, y: 34, scale: 0.94 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, delay: 0.3, ease }}
        >
          Get your first box
        </motion.a>
      </div>
    </section>
  );
}
