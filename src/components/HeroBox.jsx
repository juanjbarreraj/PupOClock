import { motion, useReducedMotion } from "framer-motion";

/**
 * The hero "exploding box".
 *
 * Replaces the old flat product render with a live composition: the open box
 * sits at the bottom and the month's contents burst up out of it, each item
 * springing into place on load and then drifting gently. Everything is a
 * real product shot from public/images/home/box/, so swapping an item is a
 * matter of changing a path below.
 *
 * Positions are percentages of a 2:3 stage so the layout holds at any width
 * (left/w are % of stage width, top is % of stage height). The box takes the
 * bottom ~57% of the stage; keep the big items in the top 45%.
 * `z` orders the layers (the box is z 20; put things that should sit inside
 * or behind the lid below it).
 */
const ITEMS = [
  // Big pieces, tallest in the middle like a fountain
  { src: "/images/home/box/sodapup-toys.webp", alt: "Two SodaPup enrichment toys", left: 29, top: 0, w: 38, rot: -6, z: 25, float: "medium" },
  { src: "/images/home/box/magazine-cover.webp", alt: "The Pup O'Clock magazine, the only magazine for kids and pups", left: 0, top: 11, w: 33, rot: -12, z: 26, float: "slow" },
  { src: "/images/home/box/magazine-spread.webp", alt: "An open comic spread from the magazine", left: 56, top: 15, w: 44, rot: 8, z: 22, float: "gentle" },
  { src: "/images/home/box/givepet-treats.webp", alt: "GivePet training treats", left: 68, top: 34, w: 21, rot: 6, z: 24, float: "gentle" },
  { src: "/images/home/box/bandana.webp", alt: "A Pup O'Clock bandana", left: 1, top: 45, w: 18, rot: 12, z: 26, float: "medium" },

  // Trading cards, fanned
  { src: "/images/home/box/cards/back-villains.webp", alt: "", left: 8, top: 37, w: 15, rot: -26, z: 23, float: "slow" },
  { src: "/images/home/box/cards/back-league.webp", alt: "", left: 14, top: 35, w: 15, rot: -12, z: 24, float: "slow" },
  { src: "/images/home/box/cards/pup.webp", alt: "Pup trading card", left: 21, top: 34, w: 15, rot: 3, z: 25, float: "slow" },

  // Stickers scattered around
  { src: "/images/home/box/stickers/logo.webp", alt: "Pup O'Clock logo sticker", left: 0, top: 0, w: 18, rot: -10, z: 27, float: "medium" },
  { src: "/images/home/box/stickers/group.webp", alt: "League of Pups sticker", left: 78, top: 0, w: 22, rot: 8, z: 27, float: "slow" },
  { src: "/images/home/box/stickers/brown.webp", alt: "", left: 23, top: 4, w: 9, rot: -8, z: 24, float: "gentle" },
  { src: "/images/home/box/stickers/cream.webp", alt: "", left: 66, top: 3, w: 9, rot: 12, z: 24, float: "medium" },
  { src: "/images/home/box/stickers/ball.webp", alt: "", left: 52, top: 29, w: 6, rot: 0, z: 26, float: "medium" },
  { src: "/images/home/box/stickers/teddy-sit.webp", alt: "", left: 30, top: 27, w: 11, rot: -6, z: 26, float: "slow" },
  { src: "/images/home/box/stickers/pup-sit.webp", alt: "", left: 45, top: 30, w: 12, rot: 5, z: 26, float: "gentle" },
  { src: "/images/home/box/stickers/yellow-face.webp", alt: "", left: 86, top: 46, w: 12, rot: -8, z: 28, float: "gentle" },
];

const FLOAT_CLASS = {
  slow: "animate-float-slow",
  medium: "animate-float-medium",
  gentle: "animate-float-gentle",
};

export default function HeroBox() {
  const reduce = useReducedMotion();
  const spring = { type: "spring", stiffness: 150, damping: 16, mass: 0.9 };

  return (
    <div
      className="relative w-full max-w-xl mx-auto select-none"
      style={{ aspectRatio: "2 / 3" }}
      aria-label="A Pup O'Clock box with toys, treats, trading cards, a bandana, stickers, and the magazine bursting out of it"
      role="img"
    >
      {/* Items bursting out */}
      {ITEMS.map((item, i) => (
        <motion.div
          key={item.src + i}
          className="absolute"
          style={{ left: `${item.left}%`, top: `${item.top}%`, width: `${item.w}%`, zIndex: item.z }}
          initial={reduce ? false : { opacity: 0, y: "140%", scale: 0.3, rotate: item.rot + 30 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
          transition={{ ...spring, delay: 0.45 + i * 0.06 }}
        >
          <div className={reduce ? "" : FLOAT_CLASS[item.float]} style={{ animationDelay: `${-i * 1.3}s` }}>
            <img
              src={item.src}
              alt={item.alt}
              draggable="false"
              className="w-full h-auto block"
              style={{ transform: `rotate(${item.rot}deg)`, filter: "drop-shadow(0 14px 22px rgba(0,0,0,0.28))" }}
            />
          </div>
        </motion.div>
      ))}

      {/* The box */}
      <motion.img
        src="/images/home/box/open-box.webp"
        alt=""
        draggable="false"
        className="absolute left-1/2 bottom-0 w-[72%] h-auto block"
        style={{ x: "-50%", zIndex: 20, filter: "drop-shadow(0 32px 60px rgba(0,0,0,0.3))" }}
        initial={reduce ? false : { opacity: 0, scale: 0.8, y: 60 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}
