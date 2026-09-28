import { motion } from "framer-motion";
import { Hammer } from "lucide-react";
import Seo from "../components/Seo";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { usePageTransition } from "../components/PageTransition";

/**
 * Who We Help — placeholder.
 *
 * The page is under construction. It deliberately makes no claims about who
 * Pup O'Clock helps: the real content has not been supplied yet, and the
 * earlier draft copy was removed because it was not confirmed by the client.
 * The route is flagged `noindex` in src/seo/siteMeta.js so search engines do
 * not index a placeholder; remove that flag when the real page ships.
 */
export default function WhoWeHelp() {
  const transitionTo = usePageTransition();
  const ease = [0.22, 1, 0.36, 1];

  return (
    <div className="min-h-screen bg-pet-pattern flex flex-col">
      <Seo path="/who-we-help" />
      <Navbar />

      <section className="flex-1 flex items-center justify-center px-6 py-20 md:py-28">
        <motion.div
          className="bg-white rounded-3xl overflow-hidden text-center max-w-xl w-full"
          style={{ boxShadow: "0 24px 70px rgba(0,0,0,0.22)" }}
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease }}
        >
          {/* Brand accent bar */}
          <div className="flex h-2">
            <div className="flex-1" style={{ background: "#00A9D6" }} />
            <div className="flex-1" style={{ background: "#FFCD10" }} />
            <div className="flex-1" style={{ background: "#FF4633" }} />
          </div>

          <div className="px-8 md:px-12 py-12 md:py-14">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: "rgba(255,205,16,0.22)" }}
            >
              <Hammer className="w-7 h-7" style={{ color: "#1a1a2e" }} aria-hidden="true" />
            </div>

            <p
              className="text-xs font-extrabold uppercase tracking-[0.28em] mb-3"
              style={{ fontFamily: "'Poppins', sans-serif", color: "#00A9D6" }}
            >
              Who We Help
            </p>

            <h1
              className="font-normal text-[#1a1a2e] leading-tight mb-5"
              style={{
                fontFamily: "var(--font-display)",
                fontSynthesis: "none",
                fontSize: "clamp(2rem, 6vw, 3rem)",
              }}
            >
              Website under construction
            </h1>

            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-9">
              We are still building this page. Please check back soon!
            </p>

            <a
              href="/"
              onClick={(e) => { e.preventDefault(); transitionTo("/"); }}
              className="btn-yellow btn-press inline-block text-[#1a1a2e] font-bold uppercase text-sm px-10 py-4 rounded-full"
              style={{ boxShadow: "0 8px 28px rgba(255,205,16,0.45)" }}
            >
              Back to Home
            </a>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
