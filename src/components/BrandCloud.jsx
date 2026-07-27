import { motion } from "framer-motion";

// New Pup O'Clock cloud asset set
export const CLOUD_ASSETS = [
  "https://media.base44.com/images/public/6a2c05717732611268059817/2f416f442_nube1-removebg-preview.png",
  "https://media.base44.com/images/public/6a2c05717732611268059817/a483324bb_nube2-removebg-preview.png",
  "https://media.base44.com/images/public/6a2c05717732611268059817/b06765982_nube3-removebg-preview.png",
  "https://media.base44.com/images/public/6a2c05717732611268059817/f878a2efc_nube4-removebg-preview.png",
  "https://media.base44.com/images/public/6a2c05717732611268059817/911e35f12_nube5-removebg-preview.png",
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