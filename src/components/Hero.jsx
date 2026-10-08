import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { HeroShapes } from "./DecorativeShapes";
import HeroBox from "./HeroBox";
import { usePageTransition } from "./PageTransition";
import { RELAUNCH, SIGNUP_ANCHOR } from "../content/relaunch";
import { useIntroDone } from "./introState";

/** The signup lives on the Subscriptions page; ScrollToTop scrolls to the
 *  anchor once the page has rendered. */
const SIGNUP_HREF = `/subscribe#${SIGNUP_ANCHOR}`;

export default function Hero() {
  const ref = useRef(null);
  const transitionTo = usePageTransition();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  // While the homepage intro plays, everything waits at `initial` and starts
  // the moment the intro hands over (see introState.js).
  const ready = useIntroDone();

  const stagger = (i) => ({
    initial: { opacity: 0, y: 48, scale: 0.96 },
    animate: ready ? { opacity: 1, y: 0, scale: 1 } : undefined,
    transition: { duration: 1.1, delay: 0.15 + i * 0.18, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section ref={ref} className="w-full bg-pet-pattern relative overflow-hidden">
      <HeroShapes />
      <div
        className="max-w-6xl mx-auto px-5 md:px-6 py-10 md:py-14 flex flex-col md:flex-row items-center gap-8 md:gap-10 relative"
        style={{ zIndex: 2 }}
      >
        {/* The box and its contents bursting out — see HeroBox for the layers */}
        <motion.div className="flex-1 w-full flex justify-center" style={{ y: imgY }}>
          <HeroBox />
        </motion.div>

        {/* Text — staggered */}
        <motion.div className="flex-1 text-white" style={{ y: textY }}>
          <motion.h1
            className="font-extrabold mb-10"
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
          {/* The sales copy that used to sit here (pricing, free shipping, the
              satisfaction line) was removed while box sales are paused, since
              none of it is true right now. The hero CTA below points at the
              November relaunch signup instead of Shopify checkout. */}

          <div className="flex justify-center md:justify-start">
            <motion.a
              href={SIGNUP_HREF}
              onClick={(e) => { e.preventDefault(); transitionTo(SIGNUP_HREF); }}
              className="btn-press btn-yellow inline-block text-[#1a1a2e] font-bold text-sm md:text-lg px-6 md:px-10 py-4 rounded-full whitespace-nowrap"
              style={{ boxShadow: "0 12px 40px rgba(255,205,16,0.5)" }}
              initial={{ opacity: 0, y: 38, scale: 0.92 }}
              animate={ready ? { opacity: 1, y: 0, scale: 1 } : undefined}
              transition={{ duration: 1.0, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
            >
              {RELAUNCH.heroCta}
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}