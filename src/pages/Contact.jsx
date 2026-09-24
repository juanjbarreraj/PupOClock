import { useState } from "react";
import { motion } from "framer-motion";
import Seo from "../components/Seo";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SectionDivider from "../components/SectionDivider";
import FloatingObjects from "../components/FloatingObjects";
import BrandCloud from "../components/BrandCloud";
import { Send, Mail, MessageCircle, User } from "lucide-react";

// ── Floating decoration wrapper ────────────────────────────────────────────────
function FloatingPet({ children, style, delay = 0, duration = 7 }) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={style}
      animate={{ y: [0, -14, 0], rotate: [0, 4, -4, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {children}
    </motion.div>
  );
}

function Paw({ size = 32, color = "#00A9D6", opacity = 0.18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={{ opacity }}>
      <ellipse cx="20" cy="12" rx="7" ry="9" fill={color} />
      <ellipse cx="44" cy="12" rx="7" ry="9" fill={color} />
      <ellipse cx="10" cy="28" rx="6" ry="8" fill={color} />
      <ellipse cx="54" cy="28" rx="6" ry="8" fill={color} />
      <path d="M32 20 C16 20 10 32 12 44 C14 54 22 58 32 58 C42 58 50 54 52 44 C54 32 48 20 32 20 Z" fill={color} />
    </svg>
  );
}

function Bone({ size = 36, color = "#FFCD10", opacity = 0.15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 32" fill="none" style={{ opacity }}>
      <circle cx="12" cy="10" r="8" fill={color} />
      <circle cx="12" cy="22" r="8" fill={color} />
      <circle cx="68" cy="10" r="8" fill={color} />
      <circle cx="68" cy="22" r="8" fill={color} />
      <rect x="16" y="8" width="48" height="16" rx="4" fill={color} />
    </svg>
  );
}

function Ball({ size = 28, opacity = 0.14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" style={{ opacity }}>
      <circle cx="30" cy="30" r="28" fill="#FF4633" />
      <path d="M8 20 Q20 28 8 40" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M52 20 Q40 28 52 40" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  );
}

// ── Staggered fade-up helper ───────────────────────────────────────────────────
const fadeUp = (delay = 0, distance = 40) => ({
  initial: { opacity: 0, y: distance },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 1.0, delay, ease: [0.22, 1, 0.36, 1] },
});


// ── Page ──────────────────────────────────────────────────────────────────────
export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [focused, setFocused] = useState(null);
  const submitted = status === "success";

  // Delivered by Netlify Forms — see docs/contact-form-setup.md
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ "form-name": "contact", ...form }).toString(),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const inputClass = (field) =>
    `w-full pl-11 pr-4 py-3.5 rounded-xl border-2 bg-gray-50 text-gray-700 text-sm font-medium placeholder-gray-300 focus:outline-none focus:bg-white resize-none transition-all duration-300 ${
      focused === field
        ? "border-[#00A9D6] shadow-[0_0_0_4px_rgba(0,169,214,0.12)] bg-white"
        : "border-gray-100 hover:border-gray-200"
    }`;

  return (
    <div className="min-h-screen bg-white">
      <Seo path="/contact" />
      <Navbar />

      {/* ── Hero ── */}
      <section className="bg-pet-pattern relative overflow-hidden pb-0" style={{ minHeight: "340px" }}>
        {/* Brand clouds */}
        <BrandCloud index={0} duration={26} amplitude={10} opacity={0.75} style={{ left: "-14px", top: "16%", width: 176 }} />
        <BrandCloud index={3} duration={22} delay={2} amplitude={8} opacity={0.7} style={{ right: "3%", top: "8px", width: 150 }} />

        {/* Floating hero decorations */}
        <FloatingPet style={{ right: "7%", top: "28%", zIndex: 1 }} delay={0.6} duration={8}>
          <Paw size={48} color="#ffffff" opacity={0.25} />
        </FloatingPet>
        <FloatingPet style={{ left: "5%", bottom: "20%", zIndex: 1 }} delay={1.3} duration={10}>
          <Bone size={52} color="#ffffff" opacity={0.2} />
        </FloatingPet>
        <FloatingPet style={{ right: "22%", bottom: "16%", zIndex: 1 }} delay={0.9} duration={7}>
          <Ball size={34} opacity={0.25} />
        </FloatingPet>
        <FloatingPet style={{ left: "15%", top: "20%", zIndex: 1 }} delay={2} duration={9}>
          <Paw size={32} color="#ffffff" opacity={0.15} />
        </FloatingPet>

        <div className="max-w-4xl mx-auto px-6 pt-20 pb-24 text-center relative z-10">
          <motion.p
            className="text-xs font-extrabold uppercase tracking-[0.35em] text-white/70 mb-4"
            style={{ fontFamily: "'Poppins', sans-serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            We'd love to hear from you
          </motion.p>
          <motion.h1
            className="font-extrabold text-white leading-[1.02] mb-6"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3.2rem, 9vw, 6rem)",
            }}
            initial={{ opacity: 0, y: 40, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            Contact Us
          </motion.h1>
          <motion.p
            className="text-white/90 text-lg max-w-lg mx-auto font-medium leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            Questions about subscriptions, products, or partnerships? Drop us a message, we're here to help!
          </motion.p>
        </div>

        {/* Animated wave bottom */}
        <motion.div
          className="absolute bottom-0 left-0 w-full overflow-hidden"
          style={{ lineHeight: 0, marginBottom: "-2px" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <svg viewBox="0 0 1440 80" className="w-full" style={{ display: "block" }} preserveAspectRatio="none">
            <path d="M0,50 Q80,10 160,42 Q260,72 360,42 Q460,12 560,42 Q660,72 760,42 Q860,12 960,42 Q1060,72 1160,42 Q1260,12 1360,42 Q1410,56 1440,48 L1440,80 L0,80 Z" fill="white" />
          </svg>
        </motion.div>
      </section>

      {/* ── Main content ── */}
      <section className="relative overflow-hidden bg-white pt-4 pb-20 px-6" style={{ marginTop: "-2px" }}>

        {/* Background blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,169,214,0.08) 0%, transparent 70%)", transform: "translate(-40%, -40%)" }} />
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,205,16,0.08) 0%, transparent 70%)", transform: "translate(40%, -40%)" }} />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,169,214,0.06) 0%, transparent 70%)", transform: "translate(35%, 35%)" }} />
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,70,51,0.05) 0%, transparent 70%)" }} />

        {/* Interactive floating objects */}
        <FloatingObjects count={18} />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 xl:gap-20 items-start">

            {/* ── Left column ── */}
            <div className="flex flex-col gap-8">

              {/* Heading */}
              <motion.div {...fadeUp(0)}>
                <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-[#00A9D6] mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Get in Touch
                </p>
                <h2
                  className="font-normal text-[#1a1a2e] leading-tight mb-4"
                  style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.9rem, 4vw, 2.8rem)" }}
                >
                  We're Here for You & Your Pup
                </h2>
                <p className="text-gray-500 text-base leading-relaxed max-w-md">
                  Whether you have questions about your subscription box, need help with a product, or want to explore a partnership, our team is always happy to hear from families like yours.
                </p>
              </motion.div>

              {/* Mascot photo */}
              <motion.div {...fadeUp(0.12)} className="relative">
                <div
                  className="absolute inset-0 rounded-3xl pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at 40% 60%, rgba(0,169,214,0.14) 0%, transparent 72%)", transform: "scale(1.1)" }}
                />
                <motion.div
                  className="relative rounded-3xl overflow-hidden shadow-2xl"
                  style={{ maxWidth: 420, border: "3px solid rgba(0,169,214,0.18)" }}
                  whileHover={{ scale: 1.02, boxShadow: "0 24px 60px rgba(0,169,214,0.22)", transition: { duration: 0.4 } }}
                >
                  <img
                    src="/images/contact/Mannipuphd.webp"
                    alt="Brian Manni with the Pup O'Clock mascot"
                    className="w-full h-auto object-cover"
                    style={{ display: "block" }}
                  />

                </motion.div>
              </motion.div>



            </div>

            {/* ── Right column: form ── */}
            <motion.div {...fadeUp(0.18)}>
              {!submitted ? (
                <div
                  className="bg-white rounded-3xl overflow-hidden"
                  style={{
                    boxShadow: "0 32px 80px rgba(0,169,214,0.14), 0 8px 24px rgba(0,0,0,0.08)",
                    border: "2px solid rgba(0,169,214,0.14)",
                  }}
                >
                  {/* Gradient top bar */}
                  <div className="h-2 w-full bg-[#FF4633]" />

                  <div className="p-8 md:p-10">
                    <div className="mb-8">
                      <h3
                        className="text-2xl font-extrabold text-[#1a1a2e] mb-2"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        Send Us a Message
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Fill out the form below and we'll get back to you as soon as possible!
                      </p>
                    </div>

                    <form name="contact" onSubmit={handleSubmit} className="space-y-5">
                      {/* Honeypot — hidden from humans, catches naive bots */}
                      <p className="hidden" aria-hidden="true">
                        <label>
                          Don't fill this out: <input name="bot-field" tabIndex={-1} autoComplete="off" />
                        </label>
                      </p>
                      {/* Name */}
                      <div>
                        <label className="block text-[10px] font-extrabold uppercase tracking-[0.2em] text-gray-400 mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                          Your Name
                        </label>
                        <div className="relative">
                          <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200 ${focused === "name" ? "text-[#00A9D6]" : "text-gray-300"}`} />
                          <input
                            type="text"
                            required
                            maxLength={200}
                            name="name"
                            placeholder="Jane Smith"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            onFocus={() => setFocused("name")}
                            onBlur={() => setFocused(null)}
                            className={inputClass("name")}
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-[10px] font-extrabold uppercase tracking-[0.2em] text-gray-400 mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200 ${focused === "email" ? "text-[#00A9D6]" : "text-gray-300"}`} />
                          <input
                            type="email"
                            required
                            maxLength={200}
                            name="email"
                            placeholder="jane@example.com"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            onFocus={() => setFocused("email")}
                            onBlur={() => setFocused(null)}
                            className={inputClass("email")}
                          />
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-[10px] font-extrabold uppercase tracking-[0.2em] text-gray-400 mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                          Message
                        </label>
                        <div className="relative">
                          <MessageCircle className={`absolute left-4 top-4 w-4 h-4 transition-colors duration-200 ${focused === "message" ? "text-[#00A9D6]" : "text-gray-300"}`} />
                          <textarea
                            required
                            rows={5}
                            maxLength={5000}
                            name="message"
                            placeholder="Tell us what's on your mind…"
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                            onFocus={() => setFocused("message")}
                            onBlur={() => setFocused(null)}
                            className={inputClass("message")}
                          />
                        </div>
                      </div>

                      {/* Submit */}
                      <motion.button
                        type="submit"
                        disabled={status === "sending"}
                        className="btn-yellow btn-press w-full flex items-center justify-center gap-2.5 text-[#1a1a2e] font-normal uppercase text-sm py-4 rounded-xl disabled:opacity-60 disabled:cursor-wait"
                        style={{ boxShadow: "0 6px 24px rgba(255,205,16,0.45)" }}
                      >
                        <Send className="w-4 h-4" />
                        {status === "sending" ? "Sending…" : "Send Message"}
                      </motion.button>

                      {status === "error" && (
                        <p role="alert" className="text-sm font-bold text-[#FF4633] text-center">
                          Something went wrong sending your message. Please try again, or email us
                          directly at <a href="mailto:info@pupoclock.com" className="underline">info@pupoclock.com</a>.
                        </p>
                      )}
                    </form>
                  </div>
                </div>
              ) : (
                <motion.div
                  className="bg-white rounded-3xl overflow-hidden text-center"
                  style={{ boxShadow: "0 32px 80px rgba(0,169,214,0.14), 0 8px 24px rgba(0,0,0,0.08)", border: "2px solid rgba(0,169,214,0.14)" }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="h-2 w-full bg-[#FF4633]" />
                  <div className="p-12 md:p-16">
                    <motion.div
                      className="text-6xl mb-6"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
                    >
                      🐾
                    </motion.div>
                    <h2 className="text-3xl font-extrabold text-[#1a1a2e] mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      Message Sent!
                    </h2>
                    <p className="text-gray-500 text-base max-w-sm mx-auto mb-8 leading-relaxed">
                      Thanks for reaching out! We'll get back to you as soon as possible. 🐶
                    </p>
                    <motion.button
                      onClick={() => { setStatus("idle"); setForm({ name: "", email: "", message: "" }); }}
                      className="btn-yellow btn-press inline-flex items-center gap-2 text-[#1a1a2e] font-normal uppercase text-xs px-8 py-3.5 rounded-full"
                      style={{ boxShadow: "0 6px 24px rgba(255,205,16,0.45)" }}
                    >
                      Send Another
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>

          </div>
        </div>
      </section>

      <SectionDivider direction="up" color="#00A9D6" />
      <Footer />
    </div>
  );
}