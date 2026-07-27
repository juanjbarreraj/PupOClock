import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { HeroShapes } from "./DecorativeShapes";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  const stagger = (i) => ({
    initial: { opacity: 0, y: 48, scale: 0.96 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 1.1, delay: 0.15 + i * 0.18, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section ref={ref} className="w-full bg-pet-pattern relative overflow-hidden">
      <HeroShapes />
      <div
        className="max-w-6xl mx-auto px-5 md:px-6 py-10 md:py-14 flex flex-col md:flex-row items-center gap-8 md:gap-10 relative"
        style={{ zIndex: 2 }}
      >
        {/* Box Image — dramatic parallax entrance */}
        <motion.div
          className="flex-1 flex justify-center"
          style={{ y: imgY }}
          initial={{ opacity: 0, scale: 0.85, y: 60 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.img
            src="https://cdn.prod.website-files.com/665f63081692354b822eb1c0/67ec0b1b45ca7fce1967fb03_25133_PupOClock-Box-Comp_1200.png"
            alt="Pup O'Clock Box"
            className="w-full max-w-xl"
            style={{ filter: "drop-shadow(0 32px 64px rgba(0,0,0,0.28))" }}
            whileHover={{ scale: 1.06, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }}
          />
        </motion.div>

        {/* Text — staggered */}
        <motion.div className="flex-1 text-white" style={{ y: textY }}>
          <motion.h1
            className="font-extrabold mb-8"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 9vw, 5.4rem)",
              lineHeight: 1.08,
              letterSpacing: "0.06em",
              color: "#ffffff",
              textShadow: "3px 3px 0 rgba(0,0,0,0.18)",
            }}
            {...stagger(0)}
          >
            The only<br />
            subscription <span style={{ fontSize: "1.35em", color: "#FFCD10" }}>box!</span><br />
            designed for<br />
            <span style={{ display: "inline-block", margin: "0 0.35em" }}>Kids</span>
            <span style={{ display: "inline-block" }}>and</span>
            <span style={{ display: "inline-block", margin: "0 0.35em" }}>Dogs</span>
          </motion.h1>
          <motion.p className="text-lg font-bold mb-1" {...stagger(1)}>
            Vet-Approved Enrichment, Delivered Monthly.
          </motion.p>
          <motion.p className="text-base mb-6" {...stagger(2)}>
            Join a community of families using science-based training tools and games to build a
            happier, calmer home. Every box supports shelter dogs in need.
          </motion.p>
          <motion.p className="text-base font-bold mb-1" {...stagger(3)}>
            Experience the $99+ Value Flagship Box for Just $34.99!
          </motion.p>
          <motion.p className="text-base mb-1" {...stagger(4)}>Not satisfied? No Problem.</motion.p>
          <motion.p className="text-base mb-10" {...stagger(5)}>Shipping is always Free!</motion.p>

          <div className="flex justify-center md:justify-start">
            <motion.a
              href="/subscribe"
              className="btn-press btn-yellow inline-block text-[#1a1a2e] font-extrabold text-sm md:text-lg px-6 md:px-10 py-4 rounded-full whitespace-nowrap"
              style={{
                fontFamily: "var(--font-display)",
                boxShadow: "0 12px 40px rgba(255,205,16,0.5)",
              }}
              initial={{ opacity: 0, y: 38, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.0, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
            >
              Get On Pup O'Clock Time!
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}