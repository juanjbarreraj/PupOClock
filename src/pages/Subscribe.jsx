import { useState } from "react";
import { motion } from "framer-motion";
import Seo from "../components/Seo";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RelaunchSignup from "../components/RelaunchSignup";
import { SectionShapes } from "../components/DecorativeShapes";
import { PLANS as plans } from "../content/plans";
import { RELAUNCH, SIGNUP_ANCHOR, salesPaused } from "../content/relaunch";

// Shared with the Product/Offer structured data in src/seo/siteMeta.js.

/** Scroll to the signup section further down this page. */
function scrollToSignup(e) {
  const target = document.getElementById(SIGNUP_ANCHOR);
  if (!target) return;
  e.preventDefault();
  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * Card shell. A checkout link when sales are live, a plain container when they
 * are paused. Written as two explicit branches rather than a dynamic tag name
 * so the JSX stays type-checkable.
 */
function CardShell({ plan, children, ...rest }) {
  if (salesPaused) return <div {...rest}>{children}</div>;
  return (
    <a href={plan.link} target="_blank" rel="noreferrer" {...rest}>
      {children}
    </a>
  );
}

function PlanCard({ plan }) {
  const [hovered, setHovered] = useState(false);
  const f = plan.featured;
  const imgH = plan.size === "lg" ? 270 : plan.size === "md" ? 245 : 200;
  const titleSize = plan.size === "lg" ? "1.65rem" : plan.size === "md" ? "1.5rem" : "1.25rem";
  const priceSize = plan.size === "lg" ? "3rem" : plan.size === "md" ? "2.7rem" : "2.2rem";

  return (
    <CardShell
      plan={plan}
      className={`relative flex flex-col ${salesPaused ? "" : "cursor-pointer"}`}
      style={{ paddingTop: "2rem", textDecoration: "none" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Floating label above the card */}
      <div
        className="absolute top-0 left-0 right-0 flex justify-center pointer-events-none z-20"
        style={{
          opacity: salesPaused || hovered ? 1 : 0,
          transform: salesPaused || hovered ? "translateY(0) scale(1)" : "translateY(16px) scale(0.95)",
          transition: "opacity 0.45s ease, transform 0.5s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <span
          className="text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full text-white"
          style={{
            fontFamily: "'Poppins', sans-serif",
            background: salesPaused ? "#1a1a2e" : plan.accent,
            boxShadow: `0 6px 24px ${salesPaused ? "rgba(26,26,46,0.35)" : `${plan.accent}66`}`,
            border: "2px solid rgba(255,255,255,0.9)",
          }}
        >
          {salesPaused ? RELAUNCH.planBadge : "Click for more information"}
        </span>
      </div>

      {/* The actual card */}
      <div
        className="relative flex flex-col rounded-3xl overflow-hidden shadow-xl"
        style={{
          background: "#fff",
          border: `${f ? "3px" : "2.5px"} solid ${hovered ? plan.accent : f ? `${plan.accent}55` : "#f0f0f0"}`,
          transform: hovered ? "scale(1.055) translateY(-10px)" : "scale(1) translateY(0)",
          boxShadow: hovered
            ? `0 32px 80px ${plan.accent}50, 0 12px 36px rgba(0,0,0,0.15)`
            : "0 6px 32px rgba(0,0,0,0.10)",
          transition: "transform 0.65s cubic-bezier(0.22,1,0.36,1), box-shadow 0.65s cubic-bezier(0.22,1,0.36,1), border-color 0.45s ease",
        }}
      >
        {/* Badge */}
        {plan.badge && (
          <div
            className="absolute top-4 right-4 z-10 text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full"
            style={{ background: plan.accent, fontFamily: "'Poppins', sans-serif" }}
          >
            {plan.badge}
          </div>
        )}

        {/* Top accent bar */}
        <div className="h-1.5 w-full flex-shrink-0" style={{ background: plan.accent }} />

        {/* Product image */}
        <div
          className="w-full flex items-center justify-center flex-shrink-0 overflow-hidden"
          style={{
            height: imgH,
            background: `radial-gradient(ellipse at 50% 60%, ${plan.accent}22 0%, transparent 75%), ${plan.accentLight}`,
          }}
        >
          <img
            src={plan.img}
            alt={`Pup O'Clock ${plan.name}`}
            className="h-full w-full object-contain"
            style={{ objectPosition: "center center", padding: "16px" }}
            loading="lazy"
          />
        </div>

        {/* Card body */}
        <div className="flex flex-col flex-1 px-7 pt-6 pb-7">
          <h3
            className="font-extrabold text-[#1a1a2e] leading-tight mb-1"
            style={{ fontFamily: "var(--font-display)", fontSize: titleSize }}
          >
            {plan.name}
          </h3>
          <div className="flex items-baseline gap-1 mb-5">
            <span
              className="font-extrabold"
              style={{ fontSize: priceSize, color: plan.accent, fontFamily: "'Poppins', sans-serif", lineHeight: 1 }}
            >
              {plan.price}
            </span>
            {plan.per && <span className="text-sm font-bold text-gray-400">{plan.per}</span>}
          </div>

          <div className="flex items-center gap-2 mb-5">
            <div className="h-px flex-1 rounded-full bg-gray-100" />
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: plan.accent }} />
            <div className="h-px flex-1 rounded-full bg-gray-100" />
          </div>

          <div className="space-y-3 flex-1">
            {plan.body.map((block, idx) => (
              <div key={idx}>
                {block.heading && (
                  <p
                    className="text-xs font-extrabold uppercase tracking-wider mb-0.5"
                    style={{ color: plan.accent, fontFamily: "'Poppins', sans-serif" }}
                  >
                    {block.heading}
                  </p>
                )}
                <p className="text-gray-600 text-sm leading-relaxed">{block.text}</p>
              </div>
            ))}
          </div>

          {salesPaused ? (
            <a
              href={`#${SIGNUP_ANCHOR}`}
              onClick={scrollToSignup}
              className="btn-yellow btn-press mt-6 block w-full text-center text-[#1a1a2e] font-bold py-3 rounded-full text-sm uppercase"
            >
              {RELAUNCH.planCta}
            </a>
          ) : (
            <div className="btn-yellow btn-press mt-6 md:hidden block w-full text-center font-bold py-3 rounded-full text-sm uppercase">
              Get Started
            </div>
          )}
        </div>
      </div>
    </CardShell>
  );
}

export default function Subscribe() {
  return (
    <div className="min-h-screen bg-[#00A9D6]">
      <Seo path="/subscribe" />
      <Navbar />
      <section className="py-20 px-6 relative bg-pet-pattern" style={{}}>
        <SectionShapes colorA="#00A9D6" colorB="#FFCD10" colorC="#FF4633" />
        <div className="max-w-6xl mx-auto relative" style={{ zIndex: 2 }}>
          {/* Header */}
          <motion.div
            className="text-center text-white mb-14"
            initial={{ opacity: 0, y: 48, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className="text-xs font-extrabold uppercase tracking-[0.25em] opacity-80 mb-3"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {salesPaused ? RELAUNCH.planBadge : "Join the Pack"}
            </p>
            <h1
              className="font-extrabold uppercase leading-none mb-4"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.6rem, 7vw, 5rem)" }}
            >
              {salesPaused ? "Subscription Boxes" : "Start Your Subscription"}
            </h1>
            <p className="text-lg opacity-90 max-w-xl mx-auto">
              {salesPaused ? RELAUNCH.planIntro : "Choose your plan and get your first box shipped free!"}
            </p>
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 70, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1.2, delay: 0.2 + i * 0.22, ease: [0.22, 1, 0.36, 1] }}
              >
                <PlanCard plan={plan} />
              </motion.div>
            ))}
          </div>

          {salesPaused && (
            <p className="text-center text-white/75 text-sm max-w-2xl mx-auto mt-10">
              {RELAUNCH.planNote}
            </p>
          )}
        </div>
      </section>

      {salesPaused && <RelaunchSignup />}

      <Footer />
    </div>
  );
}
