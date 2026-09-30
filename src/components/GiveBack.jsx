import { motion } from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { SectionShapes } from "./DecorativeShapes";

export default function GiveBack() {
  const [ref, visible] = useScrollReveal();

  return (
    <section className="w-full bg-pet-pattern py-20 relative overflow-hidden">
      <SectionShapes colorA="#00A9D6" colorB="#FF4633" colorC="#ffffff" />
      <div
        ref={ref}
        className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12 relative"
        style={{ zIndex: 2 }}
      >
        {/* Text — slides in from left */}
        <div className="flex-1 text-white">
          <h2
            className={`text-4xl md:text-5xl font-extrabold mb-6 uppercase reveal-left${visible ? " visible" : ""}`}
            style={{ fontFamily: "var(--font-display)" }}
          >
            Give back with each box
          </h2>
          <p className={`text-lg mb-10 reveal-left reveal-delay-1${visible ? " visible" : ""}`}>
            A portion of our proceeds from each box goes to our growing list of neighborhood
            shelters we've partnered with to support their important work of keeping animals safe
            and cared for.
          </p>
          <motion.a
            href="/about"
            className={`btn-press btn-yellow inline-block text-[#1a1a2e] font-bold text-lg px-10 py-4 rounded-full reveal-left reveal-delay-2${visible ? " visible" : ""}`}
            style={{ boxShadow: "0 8px 28px rgba(255,205,16,0.45)" }}
          >
            Learn more about us
          </motion.a>
        </div>

        {/* Image — slides in from right with hover zoom */}
        <motion.div
          className={`flex-1 flex justify-center reveal-right reveal-delay-2${visible ? " visible" : ""}`}
        >
          <div className="overflow-hidden rounded-3xl shadow-2xl w-full max-w-md">
            <motion.img
              src="/images/about/giveback-humane-society.webp"
              alt="Three people in Pup O'Clock shirts at the Beaver County Humane Society"
              width={1500}
              height={1471}
              loading="lazy"
              className="w-full object-cover"
              whileHover={{ scale: 1.07, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}