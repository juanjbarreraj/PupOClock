import { motion } from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal";
import WhiteSectionWrapper from "./WhiteSectionWrapper";

export default function Characters() {
  const [ref, visible] = useScrollReveal();

  return (
    <WhiteSectionWrapper className="w-full py-14 md:py-20 overflow-hidden">
      <div ref={ref} className="max-w-6xl mx-auto px-6 relative" style={{ zIndex: 2 }}>
        <div className="flex flex-col md:flex-row items-center gap-12">

          {/* Text — slides in from left */}
          <div className="flex-1 text-center md:text-left">
            <h2
              className={`text-4xl md:text-5xl font-extrabold text-[#00A9D6] mb-4 uppercase reveal-left${visible ? " visible" : ""}`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              Characters inspired by real dogs!
            </h2>
            <h3
              className={`text-2xl font-extrabold text-gray-800 mb-4 reveal-left reveal-delay-1${visible ? " visible" : ""}`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              Meet the League of Pups!
            </h3>
            <p className={`text-gray-600 text-lg mb-4 reveal-left reveal-delay-2${visible ? " visible" : ""}`}>
              A team of extraordinary shelter dogs on a mission to better our communities through
              education and empowerment. Together, we are creating a better world for people and
              pets!
            </p>
            <p className={`text-gray-600 text-lg mb-10 reveal-left reveal-delay-3${visible ? " visible" : ""}`}>
              With each box sold, we give back to local shelters.
            </p>
            <motion.a
              href="/subscribe"
              className={`btn-press btn-yellow inline-block text-[#1a1a2e] font-normal text-lg px-10 py-4 rounded-full reveal-left reveal-delay-4${visible ? " visible" : ""}`}
              style={{ boxShadow: "0 8px 28px rgba(255,205,16,0.45)" }}
            >
              Get your first box
            </motion.a>
          </div>

          {/* Image — slides in from right */}
          <motion.div
            className={`flex-1 flex justify-center reveal-right reveal-delay-2${visible ? " visible" : ""}`}
            whileHover={{ scale: 1.03, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
          >
            <div className="relative">
              <div
                className="absolute inset-0 -m-8 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at 50% 55%, rgba(0,169,214,0.14) 0%, rgba(255,205,16,0.08) 55%, transparent 80%)",
                  filter: "blur(20px)",
                }}
              />
              <div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-4/5 h-8 rounded-full pointer-events-none"
                style={{ background: "rgba(0,169,214,0.14)", filter: "blur(14px)" }}
              />
              <img
                src="/images/decorations/WhatsApp_Image_2026-07-08_at_185229-removebg-preview.png"
                alt="League of Pups"
                className="w-full max-w-lg relative"
                style={{ filter: "drop-shadow(0 16px 40px rgba(0,169,214,0.2))" }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </WhiteSectionWrapper>
  );
}