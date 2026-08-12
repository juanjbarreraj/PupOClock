import { motion } from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { SectionShapes } from "./DecorativeShapes";
import { BRAND_STATEMENT } from "../content/brand";

const items = [
  { icon: "🌱", text: "Grow. Play. Connect. Together." },
  { icon: "🐾", text: "Created by experts. Approved by kids. Loved by dogs." },
  { icon: "🏠", text: "Every box sold helps a shelter dog in need." },
];

export default function WhoWeAre() {
  const [ref, visible] = useScrollReveal();

  return (
    <section className="w-full bg-pet-pattern py-14 md:py-20 relative overflow-hidden">
      <SectionShapes colorA="#00A9D6" colorB="#FFCD10" colorC="#ffffff" />
      <div
        ref={ref}
        className="max-w-4xl mx-auto px-6 text-center text-white relative"
        style={{ zIndex: 2 }}
      >
        <h2
          className={`text-4xl md:text-5xl font-extrabold mb-6 uppercase reveal${visible ? " visible" : ""}`}
          style={{
            fontFamily: "var(--font-display)",
            letterSpacing: "0.06em",
            color: "#FFCD10",
            textShadow: "3px 3px 0 rgba(0,0,0,0.18)",
          }}
        >
          who we are
        </h2>
        {/* The brand-approved positioning statement, verbatim. It lives here as
            visible, indexable copy rather than in a meta tag — see the note in
            src/content/brand.js. */}
        <p className={`text-lg mb-4 reveal reveal-delay-1${visible ? " visible" : ""}`}>
          {BRAND_STATEMENT}
        </p>
        <p className={`text-lg mb-10 reveal reveal-delay-2${visible ? " visible" : ""}`}>
          Each month, you'll receive a themed box full of enrichment, training, and fun surprises!
          Loved by kids and dogs alike - this is not your typical box of dog toys!
        </p>
        <motion.a
          href="/subscribe"
          className={`btn-press btn-yellow inline-block text-[#1a1a2e] font-extrabold text-lg px-10 py-4 rounded-full reveal reveal-delay-3${visible ? " visible" : ""}`}
          style={{
            fontFamily: "var(--font-display)",
            boxShadow: "0 8px 28px rgba(255,205,16,0.45)",
          }}
        >
          Get your first box
        </motion.a>

        <div className="flex flex-col md:flex-row justify-center gap-8 mt-16 text-white font-bold text-lg">
          {items.map((item, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 reveal reveal-delay-${i + 3}${visible ? " visible" : ""}`}
            >
              <span className="text-3xl">{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}