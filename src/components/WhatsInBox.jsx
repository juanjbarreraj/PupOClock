import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionShapes } from "./DecorativeShapes";
import { usePageTransition } from "./PageTransition";
import { heroSources } from "./HeroBox";

/**
 * What's in a box.
 *
 * Centered stack: title and copy, then the open box popping in with three
 * sticker badges snapping on around it, then the six items that ship in every
 * box, each with its own product shot. Images live in public/images/home/box/
 * and have transparent backgrounds so they sit on the white cards without a
 * halo. The order below is the order on the page: the reading and collecting
 * items first (magazine, trading cards, bandana, stickers), then the toys and
 * treats at the bottom.
 */
/**
 * The hand of trading cards, one of every card, in left-to-right order. The
 * middle entries sit on top of the fan (later wins a tie), so Pup is just
 * right of centre and the backs are on the ends. The fan angle and spacing
 * scale with the count (see CardHand), and when spread the outer cards run
 * past the edge of the tile on purpose: the hand is for variety, not a
 * gallery.
 */
// Tile-sized copies (public/images/home/box/sm/, max 420px): the cards show at
// ~124px wide, so the full-size files would be wasted bandwidth.
const TRADING_CARDS = [
  { src: "/images/home/box/sm/back-villains.webp", alt: "Villains League of Pups trading card, back" },
  { src: "/images/home/box/sm/tick.webp", alt: "Tick villain trading card" },
  { src: "/images/home/box/sm/wirefence.webp", alt: "Wire Fence villain trading card" },
  { src: "/images/home/box/sm/flea.webp", alt: "Flea villain trading card" },
  { src: "/images/home/box/sm/dani.webp", alt: "Dani trading card" },
  { src: "/images/home/box/sm/teddy.webp", alt: "Teddy trading card, a curious dog who loves to read" },
  { src: "/images/home/box/sm/pup.webp", alt: "Pup trading card, a funny dog always trying to help everyone" },
  { src: "/images/home/box/sm/tori.webp", alt: "Tori trading card, always coming up with exciting games" },
  { src: "/images/home/box/sm/daisy.webp", alt: "Daisy trading card" },
  { src: "/images/home/box/sm/shady.webp", alt: "Shady trading card" },
  { src: "/images/home/box/sm/steak.webp", alt: "Steak trading card" },
  { src: "/images/home/box/sm/back-league.webp", alt: "League of Pups trading card, back" },
];

/** The two toys in the first tile. They play on hover (or tap): see ToyPair. */
const TOYS = {
  plush: { src: "/images/home/box/sm/toy-plush.webp", alt: "A plush Pup dog toy" },
  bone: { src: "/images/home/box/sm/toy-lickmat.webp", alt: "A blue hot-air-balloon lick mat for dogs" },
};

/**
 * The magazine opens on hover (or tap): see MagazineFlip. `pages` are the
 * spreads inside it. The comic lands first, behind the cover, and then the
 * rest fan out around it (games, training missions, play with your pup), so it
 * reads as a whole magazine rather than a comic book. Order matters: page 1
 * ends up in front.
 */
/** The tile is at most ~300px wide, so the cover and comic reuse the
 *  size-matched copies made for the hero instead of their full-size files. */
const TILE_SIZES = "(max-width: 767px) 70vw, 300px";
const MAGAZINE = {
  cover: { ...heroSources("/images/home/box/magazine-cover.webp", 30), sizes: TILE_SIZES, alt: "The Pup O'Clock magazine, the only magazine for kids and pups" },
  pages: [
    { ...heroSources("/images/home/box/magazine-spread.webp", 40), sizes: TILE_SIZES, alt: "A League of Pups comic spread from the magazine" },
    { src: "/images/home/box/magazine-games.webp", alt: "Games and puzzle pages from the magazine" },
    { src: "/images/home/box/magazine-missions.webp", alt: "Training mission and detective report pages from the magazine" },
    { src: "/images/home/box/magazine-play.webp", alt: "Play with your pup activity pages from the magazine" },
  ],
};

/**
 * The stickers, laid out as if stuck on the tile. x and y are the sticker's
 * centre as a % of the tile, w its width as a % of the tile, r its tilt. They
 * slap down in this order, so the logo goes last and lands on top.
 */
const STICKERS = [
  { src: "/images/home/box/sm/group.webp", x: 17, y: 42, w: 25, r: -9 },
  { src: "/images/home/box/sm/cream.webp", x: 34, y: 16, w: 15, r: -10 },
  { src: "/images/home/box/sm/brown.webp", x: 66, y: 15, w: 14, r: 12 },
  { src: "/images/home/box/sm/yellow-face.webp", x: 84, y: 34, w: 22, r: 10 },
  { src: "/images/home/box/sm/pup-sit.webp", x: 80, y: 78, w: 20, r: 7 },
  { src: "/images/home/box/sm/ball.webp", x: 60, y: 86, w: 9, r: 0 },
  { src: "/images/home/box/sm/teddy-sit.webp", x: 30, y: 82, w: 11, r: -6 },
  { src: "/images/home/box/sm/logo.webp", x: 50, y: 50, w: 36, r: -6 },
];

const BOX_ITEMS = [
  {
    magazine: MAGAZINE,
    label: "The Magazine",
    blurb: "The only magazine for kids and pups: a training plan, comic, games, recipe, crafts, and activities.",
    accent: "#FF4633",
  },
  {
    hand: TRADING_CARDS,
    label: "Trading Cards",
    blurb: "A new League of Pups card to collect every month.",
    accent: "#FFCD10",
  },
  {
    img: "/images/home/box/sm/bandana.webp",
    label: "Bandana",
    blurb: "A themed Pup O'Clock bandana so your dog can show off the month's look.",
    accent: "#00A9D6",
  },
  {
    stickers: STICKERS,
    label: "Stickers & Magnets",
    blurb: "League of Pups stickers and magnets for water bottles, fridges, and notebooks.",
    accent: "#FFCD10",
  },
  {
    toys: TOYS,
    label: "2 Toys",
    blurb: "Two toys to chew, tug, fetch, and play with together.",
    accent: "#00A9D6",
  },
  {
    img: "/images/home/box/sm/givepet-treats.webp",
    label: "Pet Treats",
    blurb: "Premium training treats from a brand that gives back to shelter dogs.",
    accent: "#FF4633",
  },
];

/**
 * The chore chart magnet, shown as a wide feature tile under the six items.
 * Its days are columns, its chores are rows; COLS and ROWS are each cell's
 * centre as a fraction of the image (measured from the print file).
 */
const CHORE_CHART = {
  src: "/images/home/box/chore-chart.webp",
  alt: "The Pup O'Clock chore chart magnet: potty time, food time, water checks, exercise, training, play and hygiene, Monday to Sunday",
  label: "Chore Chart Magnet",
  blurb:
    "A weekly chore chart for the fridge. Kids check off potty time, food, water, exercise, training, play and hygiene, so caring for the dog becomes a habit the whole family can see.",
  accent: "#8E6FD6",
};
const CHORE_COLS = [0.3548, 0.4461, 0.5374, 0.6288, 0.7201, 0.8114, 0.9049];
const CHORE_ROWS = [0.3567, 0.4431, 0.5298, 0.6164, 0.7036, 0.7904, 0.8778];
/** Which cells get a check, as [row, column]: a kid's busy week, Monday to Thursday. */
const CHORE_CHECKS = [
  [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0],
  [0, 1], [1, 1], [2, 1], [3, 1], [5, 1],
  [0, 2], [1, 2], [2, 2], [4, 2], [5, 2], [6, 2],
  [0, 3], [1, 3], [2, 3], [3, 3],
];

/**
 * The three facts, styled as die-cut stickers stuck around the box. `place`
 * positions them on md+ screens; on phones they fall into a row under the box.
 */
const FACT_STICKERS = [
  {
    text: "7 items every month",
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
  { src: "/images/decorations/IMG_6373.webp", cls: "animate-float-slow", style: { left: "-2%", top: "22%", width: 64 } },
  { src: "/images/decorations/IMG_6377.webp", cls: "animate-float-medium", style: { right: "2%", top: "6%", width: 54 } },
  { src: "/images/decorations/IMG_6375.webp", cls: "animate-float-gentle", style: { right: "-1%", bottom: "16%", width: 58 } },
  { src: "/images/decorations/IMG_6376.webp", cls: "animate-float-medium", style: { left: "22%", bottom: "-2%", width: 44 } },
  { src: "/images/decorations/IMG_6374.webp", cls: "animate-float-slow", style: { right: "20%", bottom: "0%", width: 60 } },
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

/**
 * The two toys. On hover the plush shakes its head and the bone is tossed in
 * a full flip. The hover is driven by the tile's `.group` in src/index.css;
 * tapping toggles the same animation on touch screens.
 */
function ToyPair({ toys }) {
  const [playing, setPlaying] = useState(false);
  return (
    <button
      type="button"
      className={`toy-pair${playing ? " is-playing" : ""}`}
      onClick={() => setPlaying((p) => !p)}
      aria-pressed={playing}
      aria-label={playing ? "Stop playing with the toys" : "Play with the toys"}
    >
      <img className="toy-pair__plush" src={toys.plush.src} alt={toys.plush.alt} loading="lazy" draggable="false" />
      <img className="toy-pair__bone" src={toys.bone.src} alt={toys.bone.alt} loading="lazy" draggable="false" />
    </button>
  );
}

/**
 * The magazine. At rest it is the closed cover; on hover the cover swings open
 * around its spine in 3D, the comic spread lands behind it, and then each page
 * turns the same way to reveal the next one: comic, games, training missions.
 * It stays on the last page while you hover. The motion is driven by the
 * tile's `.group` in src/index.css; tapping toggles `.is-open` on touch screens.
 */
function MagazineFlip({ magazine }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      className={`mag${open ? " is-open" : ""}`}
      onClick={() => setOpen((o) => !o)}
      aria-pressed={open}
      aria-label={open ? "Close the magazine" : "Open the magazine"}
    >
      <span className="mag__pages">
        {/* Rendered last-to-first so the first page ends up on top of the stack. */}
        {magazine.pages
          .map((page, i) => ({ ...page, n: i + 1 }))
          .reverse()
          .map((page) => (
            <span key={page.src} className={`mag__page mag__page--${page.n}`}>
              <img src={page.src} srcSet={page.srcSet} sizes={page.sizes} alt={page.alt} loading="lazy" draggable="false" />
            </span>
          ))}
      </span>
      <span className="mag__book">
        <img className="mag__cover" src={magazine.cover.src} srcSet={magazine.cover.srcSet} sizes={magazine.cover.sizes} alt={magazine.cover.alt} loading="lazy" draggable="false" />
      </span>
    </button>
  );
}

/**
 * The stickers. On hover each one peels up and slaps back down, one after
 * another, with the logo landing last. It plays once per hover. Tapping
 * replays it: bumping `run` remounts the stickers, which restarts the CSS
 * animation (a class toggle alone would only play it every other tap).
 */
function StickerSlap({ stickers }) {
  const [run, setRun] = useState(0);
  return (
    <button
      type="button"
      className={`sticker-slap${run > 0 ? " is-slapping" : ""}`}
      onClick={() => setRun((n) => n + 1)}
      aria-label="Slap the stickers down"
    >
      <span key={run} className="sticker-slap__sheet">
        {stickers.map((st, i) => {
          // CSS custom properties are not in React's CSSProperties type.
          const style = /** @type {React.CSSProperties} */ (
            /** @type {unknown} */ ({
              left: `${st.x}%`,
              top: `${st.y}%`,
              width: `${st.w}%`,
              "--r": `${st.r}deg`,
              "--n": i,
            })
          );
          return (
            <img
              key={st.src}
              className="sticker-slap__item"
              src={st.src}
              alt=""
              style={style}
              loading="lazy"
              draggable="false"
            />
          );
        })}
      </span>
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
          ) : item.toys ? (
            <ToyPair toys={item.toys} />
          ) : item.magazine ? (
            <MagazineFlip magazine={item.magazine} />
          ) : item.stickers ? (
            <StickerSlap stickers={item.stickers} />
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

/**
 * The chore chart: a wide tile with check marks drawing themselves into the
 * grid, day by day, when it scrolls into view. Hovering (or tapping) plays
 * the week again; bumping `run` remounts the checks to restart the animation.
 */
function ChoreChartFeature({ item, index }) {
  const [run, setRun] = useState(0);
  return (
    <motion.article
      className="group sm:col-span-2 lg:col-span-3"
      initial={{ opacity: 0, y: 56, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.95, ease }}
      onViewportEnter={() => setRun((n) => (n === 0 ? 1 : n))}
      onMouseEnter={() => setRun((n) => n + 1)}
      onClick={() => setRun((n) => n + 1)}
    >
      <motion.div
        className="relative bg-white rounded-[1.75rem] overflow-hidden flex flex-col md:flex-row md:items-center"
        style={{ border: `2px solid ${item.accent}35`, boxShadow: "0 12px 36px rgba(0,0,0,0.14)" }}
        whileHover={{
          y: -8,
          boxShadow: `0 30px 60px rgba(0,0,0,0.2), 0 0 0 3px ${item.accent}`,
          transition: { duration: 0.5, ease },
        }}
      >
        <span
          className="absolute top-4 left-4 z-10 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white"
          style={{ background: item.accent, fontFamily: "'Poppins', sans-serif" }}
          aria-hidden="true"
        >
          {index + 1}
        </span>

        {/* The chart, with checks drawn over its cells */}
        <div
          className="relative md:w-[62%] px-6 pt-14 pb-6 md:p-10 md:pl-14"
          style={{ background: `radial-gradient(ellipse at 50% 55%, ${item.accent}22 0%, transparent 70%)` }}
        >
          <div className="relative chore-chart">
            <img
              src={item.src}
              alt={item.alt}
              loading="lazy"
              draggable="false"
              className="block w-full h-auto rounded-xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
              style={{ filter: "drop-shadow(0 16px 26px rgba(0,0,0,0.2))" }}
            />
            {run > 0 && (
              <span key={run} className="absolute inset-0" aria-hidden="true">
                {CHORE_CHECKS.map(([r, c], i) => (
                  <svg
                    key={`${r}-${c}`}
                    className="chore-chart__check"
                    viewBox="0 0 40 40"
                    style={/** @type {import("react").CSSProperties} */ ({
                      left: `${CHORE_COLS[c] * 100}%`,
                      top: `${CHORE_ROWS[r] * 100}%`,
                      "--d": `${0.15 + c * 0.32 + r * 0.05 + (i % 2) * 0.02}s`,
                    })}
                  >
                    <path d="M8 21 L17 30 L33 10" />
                  </svg>
                ))}
              </span>
            )}
          </div>
        </div>

        {/* Copy */}
        <div className="md:w-[38%] px-6 pb-7 md:py-10 md:pr-12 md:pl-2 text-left">
          <h3
            className="font-extrabold text-2xl md:text-4xl leading-tight mb-3"
            style={{ color: item.accent, fontFamily: "'Poppins', sans-serif" }}
          >
            {item.label}
          </h3>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">{item.blurb}</p>
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
            {...heroSources("/images/home/box/box-full.webp", 92)}
            alt="An open Pup O'Clock box with a plush toy, chew toys, treats, trading cards, a bandana, stickers, a chore chart, and the magazine"
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

        {/* The items, then the chore chart as a wide feature tile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-14">
          {BOX_ITEMS.map((item, i) => (
            <ItemCard key={item.label} item={item} index={i} />
          ))}
          <ChoreChartFeature item={CHORE_CHART} index={BOX_ITEMS.length} />
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
