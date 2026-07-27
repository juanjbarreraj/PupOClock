import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TeamCarousel from "../components/TeamCarousel";
import { usePageTransition } from "../components/PageTransition";
import { PawTrail } from "../components/AboutMissionDecor";
import FloatingObjects from "../components/FloatingObjects";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] },
});

const fadeLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -36 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] },
});

const values = [
  { img: "https://media.base44.com/images/public/6a2c05717732611268059817/4f6e0ac1f_familyhd.png", label: "Family First", desc: "Everything we do is designed to bring kids and dogs closer together through shared adventures.", accent: "#00A9D6" },
  { img: "https://media.base44.com/images/public/6a2c05717732611268059817/f1d9f8775_boxhd.png", label: "Curated with Care", desc: "Every item in our boxes is vet-approved, safety-tested, and selected with love for your furry family member.", accent: "#FF4633" },
  { img: "https://media.base44.com/images/public/6a2c05717732611268059817/81fc37c86_Shelterhd.png", label: "Give Back", desc: "With every subscription, we donate to animal shelters, helping more pups find their forever homes.", accent: "#FFCD10" },
];

export default function About() {
  const transitionTo = usePageTransition();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── Hero ── */}
      <section className="bg-pet-pattern relative overflow-hidden pb-0">
        <svg viewBox="0 0 220 120" className="absolute left-0 bottom-0 w-44 opacity-30 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <path d="M180,90 Q200,90 200,72 Q200,56 180,53 Q182,28 156,25 Q140,6 116,14 Q94,2 76,16 Q50,9 42,32 Q18,32 16,54 Q4,58 4,73 Q4,89 24,90 Z" fill="white" />
        </svg>
        <svg viewBox="0 0 180 110" className="absolute right-0 top-0 w-40 opacity-25 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <path d="M150,82 Q168,82 168,65 Q168,50 152,47 Q154,24 130,21 Q118,5 98,11 Q80,2 66,13 Q44,8 37,27 Q16,27 15,47 Q4,51 4,65 Q4,79 20,82 Z" fill="white" />
        </svg>

        <div className="max-w-3xl mx-auto px-6 py-20 text-center relative z-10">
          <motion.p
            className="text-xs font-extrabold uppercase tracking-[0.3em] text-white/70 mb-4"
            style={{ fontFamily: "'Poppins', sans-serif" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            Get to know
          </motion.p>
          <motion.h1
            className="font-extrabold uppercase text-white leading-none mb-5"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 9vw, 5.5rem)",
            }}
            initial={{ opacity: 0, y: 28, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Pup O'Clock
          </motion.h1>
          <motion.p
            className="text-white/85 text-lg max-w-xl mx-auto font-medium leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            Teaching kids to love, care for, and bond with their family dog, one monthly box at a time.
          </motion.p>
        </div>

        {/* Wave into white */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden" style={{ lineHeight: 0, marginBottom: "-2px" }}>
          <svg viewBox="0 0 1440 64" className="w-full" style={{ display: "block" }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,42 Q120,10 240,36 Q360,62 480,36 Q600,10 720,36 Q840,62 960,36 Q1080,10 1200,36 Q1320,62 1440,36 L1440,64 L0,64 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── Mission / Values ── */}
      <section className="relative bg-white py-20 md:py-24 px-6 overflow-hidden">
        <FloatingObjects count={18} />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-14">
            <motion.p
              className="text-xs font-extrabold uppercase tracking-[0.28em] text-[#00A9D6] mb-3"
              style={{ fontFamily: "'Poppins', sans-serif" }}
              {...fadeUp(0)}
            >
              Our Mission
            </motion.p>
            <motion.h2
              className="font-normal text-[#1a1a2e] leading-tight mb-5"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.9rem, 5vw, 3rem)" }}
              {...fadeUp(0.18)}
            >
              Kids, Dogs &amp; Family
            </motion.h2>
            <motion.p className="text-gray-500 text-base leading-relaxed max-w-2xl mx-auto" {...fadeUp(0.34)}>
              Pup O'Clock was born from a simple idea: that the bond between a child and their dog is one of the most powerful, joyful relationships in the world. We create monthly subscription boxes that turn that bond into an adventure, teaching responsibility, empathy, and unconditional love.
            </motion.p>

          </div>

          <div className="relative">
            <PawTrail />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {values.map((v, i) => (
              <motion.div
                key={v.label}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 flex flex-col"
                style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
                initial={{ opacity: 0, y: 80, scale: 0.9, rotateX: 8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1.1, delay: 0.15 + i * 0.2, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                  boxShadow: `0 28px 60px rgba(0,0,0,0.13), 0 0 0 2px ${v.accent}55`,
                  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                }}
              >
                {/* Image with parallax-style scale on scroll */}
                <motion.div
                  className="w-full overflow-hidden"
                  style={{ height: 380 }}
                  initial={{ opacity: 0, scale: 1.15 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 1.4, delay: 0.1 + i * 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  <img
                    src={v.img}
                    alt={v.label}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ transformOrigin: "center center" }}
                  />
                </motion.div>
                {/* Top accent bar — brightens on hover */}
                <div
                  className="h-1 w-full flex-shrink-0 opacity-60 transition-all duration-500 group-hover:opacity-100 group-hover:h-1.5"
                  style={{ background: v.accent }}
                />
                <div className="p-6 text-center flex-1 flex flex-col justify-center">
                  <h3 className="font-extrabold text-[#1a1a2e] text-lg mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    {v.label}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            ))}
            </div>
          </div>

          <motion.div className="mt-14 text-center" {...fadeUp(0.45)}>
            <motion.a
              href="/subscribe"
              onClick={(e) => { e.preventDefault(); transitionTo("/subscribe"); }}
              className="btn-yellow btn-press inline-flex items-center gap-2 text-[#1a1a2e] font-extrabold uppercase text-sm px-10 py-4 rounded-full"
              style={{
                fontFamily: "var(--font-display)",
                boxShadow: "0 8px 28px rgba(255,205,16,0.45)",
              }}
            >
              Get Your First Box
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ── Team section ── */}
      <section className="relative bg-white pb-4 overflow-hidden">
        <div className="h-1.5 w-full bg-[#FF4633] relative z-10" />
        <FloatingObjects count={9} />
        <div className="relative z-10">
          <TeamCarousel />
        </div>
      </section>

      {/* Wave back into footer */}
      <div className="bg-pet-pattern overflow-hidden" style={{ lineHeight: 0, marginBottom: "-2px" }}>
        <svg viewBox="0 0 1440 64" className="w-full" style={{ display: "block", marginTop: "-2px" }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,0 L0,40 C240,64 480,64 720,36 C960,8 1200,8 1440,40 L1440,0 Z" fill="white" />
        </svg>
      </div>

      <Footer />
    </div>
  );
}