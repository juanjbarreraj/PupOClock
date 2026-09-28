import { useState } from "react";
import Seo from "../components/Seo";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollPeekDog from "../components/ScrollPeekDog";
// Shared with the FAQPage structured data in src/seo/siteMeta.js, so the
// markup can never claim an answer that is not on the page.
import { FAQS as faqs } from "../content/faqs";

function FAQItem({ faq, index, isOpen, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl overflow-hidden"
      style={{
        background: isOpen ? "rgba(255,255,255,0.98)" : "rgba(255,255,255,0.9)",
        border: isOpen ? "2px solid rgba(0,169,214,0.45)" : "2px solid rgba(255,255,255,0.55)",
        backdropFilter: "blur(10px)",
        boxShadow: isOpen
          ? "0 12px 40px rgba(0,169,214,0.22), 0 4px 12px rgba(0,0,0,0.08)"
          : "0 4px 16px rgba(0,0,0,0.08)",
        transition: "border-color 0.35s ease, background 0.35s ease, box-shadow 0.35s ease",
      }}
    >
      <button
        className="w-full flex justify-between items-center px-6 py-5 text-left gap-4"
        onClick={onToggle}
      >
        <span
          className="font-extrabold text-[#1a1a2e] text-base md:text-lg leading-snug"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          {faq.q}
        </span>
        <motion.span
          className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
          animate={{
            background: isOpen ? "#00A9D6" : "rgba(0,169,214,0.12)",
            scale: isOpen ? 1.1 : 1,
          }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "flex" }}
          >
            <ChevronDown className="w-4 h-4" style={{ color: isOpen ? "#fff" : "#00A9D6" }} />
          </motion.span>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0, y: -8 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-6 pb-7 pt-1">
              <div className="h-px w-full mb-5" style={{ background: "rgba(0,169,214,0.2)" }} />
              <p className="text-gray-600 text-base leading-relaxed">{faq.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState(null);
  const toggle = (i) => setOpen(open === i ? null : i);

  return (
    <div className="min-h-screen bg-pet-pattern">
      <Seo path="/faq" />
      <Navbar />

      <section className="py-16 md:py-24 px-4 relative overflow-hidden">
        <ScrollPeekDog />
        <div className="max-w-2xl mx-auto relative z-10">

          {/* Header */}
          <div className="text-center mb-14">
            <motion.p
              className="text-xs font-extrabold uppercase tracking-[0.3em] text-white/70 mb-3"
              style={{ fontFamily: "'Poppins', sans-serif" }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              Got Questions?
            </motion.p>
            <motion.h1
              className="font-extrabold uppercase text-white leading-none mb-4"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3rem, 10vw, 5.5rem)",
              }}
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              FAQ
            </motion.h1>
            <motion.p
              className="text-white/85 text-base md:text-lg font-medium max-w-md mx-auto"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              Everything you need to know about Pup O'Clock.
            </motion.p>
            <motion.div
              className="flex items-center justify-center gap-2 mt-6"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.35, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="h-px w-14 rounded-full bg-white/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#FFCD10]" />
              <div className="h-px w-14 rounded-full bg-white/40" />
            </motion.div>
          </div>

          {/* FAQ Cards */}
          <div className="space-y-3.5">
            {faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} isOpen={open === i} onToggle={() => toggle(i)} />
            ))}
          </div>

          {/* CTA */}
          <motion.div
            className="text-center mt-14"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-white/80 text-sm mb-5 font-medium">Still have questions?</p>
            <motion.a
              href="/contact"
              className="btn-yellow btn-press inline-block text-[#1a1a2e] font-bold uppercase text-sm px-10 py-4 rounded-full"
              style={{ boxShadow: "0 8px 28px rgba(255,205,16,0.45)" }}
            >
              Contact Us
            </motion.a>
          </motion.div>

        </div>
      </section>

      <Footer />
    </div>
  );
}