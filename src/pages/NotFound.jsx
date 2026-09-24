import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Seo from "../components/Seo";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Seo path="/404" />
      <Navbar />

      <section className="flex-1 flex items-center justify-center px-6 py-24 relative overflow-hidden">
        {/* Soft brand blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,169,214,0.08) 0%, transparent 70%)", transform: "translate(-40%, -40%)" }} />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,205,16,0.10) 0%, transparent 70%)", transform: "translate(35%, 35%)" }} />

        <motion.div
          className="text-center relative z-10 max-w-md"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-7xl mb-6" aria-hidden="true">🐾</p>
          <h1
            className="font-normal text-[#1a1a2e] mb-3"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 8vw, 5rem)" }}
          >
            404
          </h1>
          <h2 className="text-xl font-extrabold text-[#1a1a2e] mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
            This page ran off the leash!
          </h2>
          <p className="text-gray-500 leading-relaxed mb-8">
            We couldn't find the page you're looking for. Let's get you back to the pack.
          </p>
          <Link
            to="/"
            className="btn-yellow btn-press inline-flex items-center gap-2 text-[#1a1a2e] font-normal uppercase text-sm px-8 py-4 rounded-full"
            style={{ boxShadow: "0 6px 24px rgba(255,205,16,0.45)" }}
          >
            Back to Home
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
