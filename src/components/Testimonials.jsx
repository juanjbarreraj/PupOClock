import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import WhiteSectionWrapper from "./WhiteSectionWrapper";
import ScrollPeekDog from "./ScrollPeekDog";

const testimonials = [
  {
    quote: "Being a dog mom to Bella, I always seek ways to improve her care and keep things fun. Pup O'clock's first box was a delightful surprise! The responsibility contract is a great way to involve the whole family in Bella's care. Pup O'clock enriches our lives.",
    name: "Bella's Dog Mom",
  },
  {
    quote: "Pup O'clock's first box is a huge hit. The responsibility contract got Aaliyah to understand the commitment needed to care for our dog, Luna. It is a wonderful subscription that teaches valuable lessons while keeping my daughter entertained and engaged.",
    name: "Aaliyah's Mom",
  },
  {
    quote: "As a dad where our dog, Max, is part of the family, Pup O'clock is wonderful. The first box was packed with engaging and fun items. The vet book is particularly useful. Plus, there was a treat for Max too. Pup O'clock is a must-have for any dog-loving household.",
    name: "Max's Dog Dad",
  },
  {
    quote: "My son is absolutely obsessed with the trading card in each box. The cards are not only fun, but they teach him about different breeds and how to care for our own pup. Pup O'clock is a hit in our house.",
    name: "Liam's Dad",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [ref, visible] = useScrollReveal();
  const [dir, setDir] = useState(1);

  const go = (next) => {
    setDir(next > current ? 1 : -1);
    setCurrent((next + testimonials.length) % testimonials.length);
  };
  const prev = () => go(current - 1);
  const next = () => go(current + 1);

  return (
    <WhiteSectionWrapper className="w-full py-20">
      <ScrollPeekDog />
      <div ref={ref} className="max-w-4xl mx-auto px-6 text-center relative" style={{ zIndex: 2 }}>

        <motion.img
          src="/images/home/dog-owners-love-poc.png"
          alt="Dog Owners Love Pup O'Clock"
          className={`mx-auto mb-10 max-w-xs reveal-scale${visible ? " visible" : ""}`}
        />

        <div
          className={`relative bg-[#00A9D6] rounded-3xl p-8 md:p-12 shadow-2xl text-white overflow-hidden reveal reveal-delay-1${visible ? " visible" : ""}`}
        >
          {/* Background shimmer */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.12) 0%, transparent 60%)",
            }}
          />

          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={current}
              custom={dir}
              initial={{ opacity: 0, x: dir * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -60 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10"
            >
              <p className="text-lg md:text-xl italic mb-6 leading-relaxed">
                "{testimonials[current].quote}"
              </p>
              <p className="font-extrabold text-xl" style={{ fontFamily: "'Poppins', sans-serif" }}>
                {testimonials[current].name}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-4 mt-10">
            <motion.button
              onClick={prev}
              className="btn-press bg-white text-[#00A9D6] rounded-full p-3 shadow-lg"
              whileHover={{ scale: 1.15, boxShadow: "0 8px 24px rgba(0,0,0,0.18)" }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 320, damping: 20 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              onClick={next}
              className="btn-press bg-white text-[#00A9D6] rounded-full p-3 shadow-lg"
              whileHover={{ scale: 1.15, boxShadow: "0 8px 24px rgba(0,0,0,0.18)" }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 320, damping: 20 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>

          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => go(i)}
                animate={{ width: i === current ? 28 : 10 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="h-2.5 rounded-full bg-white"
                style={{ opacity: i === current ? 1 : 0.4 }}
              />
            ))}
          </div>
        </div>

        <motion.a
          href="/subscribe"
          className={`btn-press btn-yellow inline-block mt-12 text-[#1a1a2e] font-extrabold text-lg px-10 py-4 rounded-full reveal reveal-delay-2${visible ? " visible" : ""}`}
          style={{
            fontFamily: "var(--font-display)",
            boxShadow: "0 8px 28px rgba(255,205,16,0.45)",
          }}
        >
          Join the League
        </motion.a>
      </div>
    </WhiteSectionWrapper>
  );
}