import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";

const DOG_IMG = "/images/decorations/IMG_6367.webp";

/**
 * ScrollPeekDog — a long horizontal dog that peeks in from the right edge
 * based on the scroll progress of its parent section.
 * Place inside a `position: relative` section; content above should be z-10+.
 *
 * Timeline: hidden → slides in (25–50%) → holds max peek (50–65%) → retreats → hidden.
 * Max reveal stops at the first visible part of the white belly (~58% of the image).
 */
export default function ScrollPeekDog() {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 55, damping: 18, mass: 0.6 });
  const x = useTransform(smooth, [0, 0.25, 0.5, 0.65, 1], ["103%", "103%", "42%", "42%", "103%"]);
  const rotate = useTransform(smooth, [0.25, 0.5, 0.65, 1], [3, -1.5, -1.5, 3]);

  if (reduced) return null;

  return (
    <div
      ref={ref}
      className="hidden md:block absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      <motion.img
        src={DOG_IMG}
        alt=""
        draggable="false"
        className="absolute right-0 top-1/2 w-64 md:w-[440px] max-w-none"
        style={{
          x,
          rotate,
          y: "-50%",
          transformOrigin: "right center",
          filter: "drop-shadow(-8px 10px 18px rgba(0,0,0,0.14))",
          willChange: "transform",
        }}
      />
    </div>
  );
}