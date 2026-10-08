import { motion } from "framer-motion";

// New Pup O'Clock cloud asset set
export const CLOUD_ASSETS = [
  "/images/decorations/nube1-removebg-preview.webp",
  "/images/decorations/nube2-removebg-preview.webp",
  "/images/decorations/nube3-removebg-preview.webp",
  "/images/decorations/nube4-removebg-preview.webp",
  "/images/decorations/nube5-removebg-preview.webp",
];

/**
 * BrandCloud — a single branded cloud with a subtle, clean floating drift.
 * Used for hero decorations outside the SWAG cloud field.
 */
export default function BrandCloud({ index = 0, style, duration = 26, delay = 0, amplitude = 12, opacity = 0.85 }) {
  return (
    <motion.img
      src={CLOUD_ASSETS[index % CLOUD_ASSETS.length]}
      alt=""
      draggable="false"
      className="absolute pointer-events-none select-none"
      style={{ opacity, ...style }}
      animate={{ y: [0, -amplitude, 0], x: [0, amplitude * 0.5, 0] }}
      transition={{ repeat: Infinity, duration, delay, ease: "easeInOut" }}
    />
  );
}