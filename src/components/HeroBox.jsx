import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * The hero "exploding box".
 *
 * The filled box (public/images/home/box/box-full.webp) sits at the bottom and
 * more of the month's contents float above it, each item springing into place
 * on load and then drifting gently. Every floating item is exported from its
 * own high-resolution source file at roughly 3x its on-screen size, so it
 * stays sharp on retina screens. Do not swap in smaller files. The browser
 * is served a size-matched copy of each one: see sources() below.
 *
 * Deliberately NOT floating: the SodaPup logo/toys and the treat bag. The
 * treat bag appears once, inside the box image itself.
 *
 * Positions are percentages of a 2:3 stage so the layout holds at any width
 * (left/w are % of stage width, top is % of stage height). The box image takes
 * the bottom ~70% of the stage; keep the big items in the top 30%.
 * `z` orders the layers (the box is z 20).
 */
const ITEMS = [
  // The magazine, either side
  { src: "/images/home/box/magazine-cover.webp", alt: "The Pup O'Clock magazine, the only magazine for kids and pups", left: 0, top: 3, w: 30, rot: -10, z: 24, float: "slow" },
  { src: "/images/home/box/magazine-spread.webp", alt: "An open comic spread from the magazine", left: 60, top: 5, w: 40, rot: 8, z: 22, float: "gentle" },

  // Trading cards fanned across the top, Shady and Pup face up
  { src: "/images/home/box/cards/back-villains.webp", alt: "", left: 27, top: 3, w: 17, rot: -24, z: 23, float: "slow" },
  { src: "/images/home/box/cards/back-league.webp", alt: "", left: 33, top: 1, w: 17, rot: -11, z: 24, float: "slow" },
  { src: "/images/home/box/cards/shady.webp", alt: "Shady trading card", left: 40, top: 0, w: 17, rot: 3, z: 25, float: "slow" },
  { src: "/images/home/box/cards/pup.webp", alt: "Pup trading card", left: 48, top: 2, w: 17, rot: 17, z: 26, float: "slow" },

  // Tucked in beside the box
  { src: "/images/home/box/bandana.webp", alt: "A Pup O'Clock bandana", left: 1, top: 30, w: 15, rot: 12, z: 26, float: "medium" },
  { src: "/images/home/box/stickers/yellow-face.webp", alt: "", left: 84, top: 27, w: 15, rot: -8, z: 28, float: "gentle" },

  // Stickers scattered around
  { src: "/images/home/box/stickers/logo.webp", alt: "Pup O'Clock logo sticker", left: 0, top: 0, w: 18, rot: -10, z: 27, float: "medium" },
  { src: "/images/home/box/stickers/group.webp", alt: "League of Pups sticker", left: 81, top: 0, w: 19, rot: 7, z: 27, float: "slow" },
  { src: "/images/home/box/stickers/brown.webp", alt: "", left: 20, top: 0, w: 10, rot: -8, z: 22, float: "gentle" },
  { src: "/images/home/box/stickers/cream.webp", alt: "", left: 68, top: 0, w: 11, rot: 10, z: 28, float: "medium" },
  { src: "/images/home/box/stickers/teddy-sit.webp", alt: "", left: 27, top: 19, w: 10, rot: -6, z: 26, float: "slow" },
  { src: "/images/home/box/stickers/ball.webp", alt: "", left: 44, top: 19, w: 6, rot: 0, z: 26, float: "medium" },
  { src: "/images/home/box/stickers/shady-sit.webp", alt: "", left: 55, top: 17, w: 9, rot: 4, z: 27, float: "gentle" },
  { src: "/images/home/box/stickers/pup-sit.webp", alt: "", left: 67, top: 19, w: 13, rot: 6, z: 26, float: "gentle" },
];

const FLOAT_CLASS = {
  // Translate-only drifts (src/index.css). Do not use the animate-float-*
  // classes here: they rotate and scale, which blurs the artwork.
  slow: "hero-drift-slow",
  medium: "hero-drift-medium",
  gentle: "hero-drift-gentle",
};

/** Stage width in CSS px at its largest (Tailwind max-w-xl). */
const STAGE_PX = 576;

/**
 * How many image pixels to supply per screen pixel. 2 means a standard
 * monitor gets the 2x copy and a retina screen gets the 4x copy.
 *
 * Both extremes look soft, for different reasons:
 *  - 1 (exact size) leaves no spare detail, so the slight tilt and growth of
 *    the drift animation blurs the item.
 *  - 5+ (one huge file) makes the GPU shrink the image with a cheap filter.
 * 2 is the sweet spot: a clean halving, with headroom for the motion.
 */
const OVERSAMPLE = 2;

/**
 * Sources for one hero image. Each has 1x to 4x copies in
 * public/images/home/box/hero/, sized from its on-screen width.
 *
 * If an item's `w` changes, regenerate the copies (they are named by density,
 * sized from `w`).
 */
function sources(src, w) {
  const name = src.split("/").pop().replace(/\.webp$/, "");
  const base = `/images/home/box/hero/${name}`;
  const px = (STAGE_PX * w) / 100;
  return {
    src: `${base}-2x.webp`,
    srcSet: [1, 2, 3, 4].map((k) => `${base}-${k}x.webp ${Math.round(px * k)}w`).join(", "),
    // Telling the browser the slot is OVERSAMPLE times wider than it is makes
    // it choose the correspondingly denser copy.
    sizes: `min(${Math.round(px * OVERSAMPLE)}px, ${w * OVERSAMPLE}vw)`,
  };
}

function FloatingItem({ item, index, reduce, spring }) {
  // The drift only starts once the entrance has finished. Starting an endless
  // animation while the item is still small makes the browser keep the small,
  // blurry texture it drew at that moment.
  const [settled, setSettled] = useState(false);
  return (
    <motion.div
      className="absolute"
      style={{ left: `${item.left}%`, top: `${item.top}%`, width: `${item.w}%`, zIndex: item.z }}
      initial={reduce ? false : { opacity: 0, y: "140%", scale: 0.3, rotate: item.rot + 30 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
      transition={{ ...spring, delay: 0.45 + index * 0.06 }}
      onAnimationComplete={() => setSettled(true)}
    >
      <div
        className={!reduce && settled ? FLOAT_CLASS[item.float] : ""}
        // A positive delay, never a negative one. Every drift keyframe starts at
        // rest, so the item eases away from exactly where it landed. A negative
        // delay starts mid-cycle and makes the item jump, which read as a
        // second animation. The varied delay keeps items from moving in step.
        style={{ animationDelay: `${0.3 + (index % 6) * 0.45}s` }}
      >
        <img
          {...sources(item.src, item.w)}
          alt={item.alt}
          draggable="false"
          className="w-full h-auto block"
          style={{ transform: `rotate(${item.rot}deg)`, filter: "drop-shadow(0 14px 22px rgba(0,0,0,0.28))" }}
        />
      </div>
    </motion.div>
  );
}

export default function HeroBox() {
  const reduce = useReducedMotion();
  const spring = { type: "spring", stiffness: 150, damping: 16, mass: 0.9 };

  return (
    <div
      className="relative w-full max-w-xl mx-auto select-none"
      style={{ aspectRatio: "2 / 3" }}
      aria-label="A Pup O'Clock box with a plush toy, chew toys, treats, trading cards, a bandana, stickers, a chore chart, and the magazine bursting out of it"
      role="img"
    >
      {/* Items bursting out */}
      {ITEMS.map((item, i) => (
        <FloatingItem key={item.src + i} item={item} index={i} reduce={reduce} spring={spring} />
      ))}

      {/* The box */}
      <motion.img
        {...sources("/images/home/box/box-full.webp", 92)}
        alt=""
        draggable="false"
        className="absolute left-1/2 bottom-0 w-[92%] h-auto block"
        style={{ x: "-50%", zIndex: 20, filter: "drop-shadow(0 32px 60px rgba(0,0,0,0.3))" }}
        initial={reduce ? false : { opacity: 0, scale: 0.8, y: 60 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}
