import { motion } from "framer-motion";
import { SectionShapes } from "./DecorativeShapes";
import { usePageTransition } from "./PageTransition";

const boxItems = [
  {
    img: "https://cdn.prod.website-files.com/665f63081692354b822eb1c0/67ead7bdadc5611d1b2f900a_inabox-treats-accessories.png",
    label: "Treats & Accessories",
    accent: "#00A9D6",
  },
  {
    img: "https://cdn.prod.website-files.com/665f63081692354b822eb1c0/67ead7a47b00abc3392ca4d3_inabox-stickers-tradingcards.png",
    label: "Stickers & Trading Cards",
    accent: "#FF4633",
  },
  {
    img: "https://cdn.prod.website-files.com/665f63081692354b822eb1c0/67ead78f6f386bfed8c9969e_inabox-booklets.png",
    label: "Booklets & Activities",
    accent: "#FFCD10",
  },
];

const ease = [0.22, 1, 0.36, 1];

function BoxCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 70, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.05, delay: 0.35 + index * 0.22, ease }}
      className="group relative"
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="bg-white rounded-[1.75rem] overflow-hidden h-full flex flex-col"
        style={{
          border: `2px solid ${item.accent}35`,
          boxShadow: "0 12px 36px rgba(0,0,0,0.14)",
        }}
        whileHover={{
          y: -14,
          scale: 1.025,
          boxShadow: `0 36px 72px rgba(0,0,0,0.22), 0 0 0 3px ${item.accent}, 0 0 46px ${item.accent}55`,
          transition: { duration: 0.55, ease },
        }}
        whileTap={{ scale: 0.99 }}
      >
        {/* Image — no inner zoom, always fully visible */}
        <div className="relative">
          <img
            src={item.img}
            alt={item.label}
            className="w-full block"
            style={{ objectFit: "contain", objectPosition: "center center" }}
          />
          {/* Soft accent tint sweep on hover */}
          <div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{ background: `linear-gradient(to top, ${item.accent}14 0%, transparent 45%)` }}
          />
        </div>

        {/* Accent bar — brightens & thickens feel on hover */}
        <div className="relative h-1.5 w-full overflow-hidden flex-shrink-0" style={{ background: `${item.accent}55` }}>
          <div
            className="absolute inset-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ background: item.accent, transformOrigin: "center" }}
          />
        </div>

        {/* Label */}
        <div className="py-6 px-5 flex-1 flex items-center justify-center">
          <p
            className="font-extrabold text-xl md:text-2xl leading-tight transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5"
            style={{ color: item.accent, fontFamily: "var(--font-display)" }}
          >
            {item.label}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function WhatsInBox() {
  const transitionTo = usePageTransition();

  return (
    <section className="w-full bg-pet-pattern py-24 relative overflow-hidden">
      <SectionShapes flip colorA="#00A9D6" colorB="#ffffff" colorC="#FFCD10" />

      <div className="max-w-[88rem] mx-auto px-5 md:px-10 text-center relative" style={{ zIndex: 2 }}>
        {/* Title */}
        <motion.h2
          className="text-4xl md:text-6xl font-extrabold text-white mb-5 uppercase"
          style={{ fontFamily: "var(--font-display)" }}
          initial={{ opacity: 0, y: 44 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.0, ease }}
        >
          What's in a box?
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="text-white/90 text-lg md:text-xl mb-14 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.95, delay: 0.18, ease }}
        >
          Each month, you'll get a box chock full of amazing goodies to help every member of the
          family connect with your dog in a responsible, meaningful way!
        </motion.p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-10 mb-14">
          {boxItems.map((item, i) => (
            <BoxCard key={item.label} item={item} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.a
          href="/subscribe"
          onClick={(e) => { e.preventDefault(); transitionTo("/subscribe"); }}
          className="btn-press btn-yellow inline-block text-[#1a1a2e] font-extrabold text-lg px-12 py-4.5 rounded-full cursor-pointer"
          style={{
            fontFamily: "var(--font-display)",
            boxShadow: "0 10px 32px rgba(255,205,16,0.5)",
            padding: "1.15rem 3rem",
          }}
          initial={{ opacity: 0, y: 34, scale: 0.94 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, delay: 1.0, ease }}
        >
          Get your first box
        </motion.a>
      </div>
    </section>
  );
}