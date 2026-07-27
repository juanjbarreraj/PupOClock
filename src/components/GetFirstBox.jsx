import { motion } from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal";
import WhiteSectionWrapper from "./WhiteSectionWrapper";

export default function GetFirstBox() {
  const [ref, visible] = useScrollReveal();

  return (
    <WhiteSectionWrapper className="w-full py-24 text-center" objectCount={9}>
      <div ref={ref} className="max-w-2xl mx-auto px-6 relative" style={{ zIndex: 2 }}>
        <h2
          className={`text-4xl md:text-5xl font-extrabold text-[#00A9D6] mb-6 uppercase reveal${visible ? " visible" : ""}`}
          style={{ fontFamily: "var(--font-display)" }}
        >
          Get your first box today!
        </h2>
        <p className={`text-gray-600 text-lg mb-10 reveal reveal-delay-1${visible ? " visible" : ""}`}>
          Kids, Dogs, &amp; Family! Join thousands of families building happier homes with Pup
          O'Clock!
        </p>
        <motion.a
          href="/subscribe"
          className={`btn-press btn-yellow inline-block text-[#1a1a2e] font-extrabold text-xl px-14 py-5 rounded-full reveal-scale reveal-delay-2${visible ? " visible" : ""}`}
          style={{
            fontFamily: "var(--font-display)",
            boxShadow: "0 10px 36px rgba(255,205,16,0.5)",
          }}
        >
          Subscribe now
        </motion.a>
      </div>
    </WhiteSectionWrapper>
  );
}