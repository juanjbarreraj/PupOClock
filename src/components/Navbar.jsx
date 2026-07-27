import { useState, useEffect } from "react";
import { Menu, X, Instagram, Facebook, Info, HelpCircle, ShoppingBag, Mail, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePageTransition } from "./PageTransition";

const navLinks = [
  { to: "/about", label: "About", icon: Info, color: "#00A9D6" },
  { to: "/faq", label: "FAQ", icon: HelpCircle, color: "#FF4633" },
  { to: "/swag", label: "Swag", icon: ShoppingBag, color: "#FFCD10" },
  { to: "/contact", label: "Contact Us", icon: Mail, color: "#00A9D6" },
  { to: "/subscribe", label: "Start Your Subscription", icon: Star, color: "#FFCD10", highlight: true },
];

export default function Navbar({ transparent = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const transitionTo = usePageTransition();

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastY + 4 && y > 80) setHeaderHidden(true);
      else if (y < lastY - 4) setHeaderHidden(false);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (e, to) => {
    e.preventDefault();
    setMenuOpen(false);
    transitionTo(to);
  };

  return (
    <>
    <nav className={`mobile-header${headerHidden && !menuOpen ? " mobile-header-hidden" : ""} w-full ${transparent ? "bg-transparent" : "bg-pet-pattern"} px-6 py-4 flex items-center justify-between relative z-50`}>
      {/* Logo */}
      <a href="/" onClick={(e) => handleNav(e, "/")}>
        <motion.img
          src="/images/branding/PupO-clock_Website_HeaderLogo-01.webp"
          alt="Pup O'Clock Logo"
          className="h-14 w-auto"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 340, damping: 22 }}
        />
      </a>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-6">
        <div className="flex items-center gap-3 mr-2">
          <motion.a
            href="https://www.instagram.com/pupoclock_/"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 340, damping: 22 }}
          >
            <Instagram className="w-5 h-5 text-white" />
          </motion.a>
          <motion.a
            href="https://www.facebook.com/profile.php?id=61559979823020"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.2, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 340, damping: 22 }}
          >
            <Facebook className="w-5 h-5 text-white" />
          </motion.a>
        </div>
        {navLinks.map((link) => (
          <a
            key={link.to}
            href={link.to}
            onClick={(e) => handleNav(e, link.to)}
            className="relative text-white font-extrabold uppercase tracking-wide text-lg group"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {link.label}
            <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-white rounded-full transition-all duration-300 group-hover:w-full" />
          </a>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <motion.button
        className="md:hidden relative z-[110] text-white w-10 h-10 flex items-center justify-center rounded-full"
        onClick={() => setMenuOpen(!menuOpen)}
        whileTap={{ scale: 0.85 }}
        animate={{ rotate: menuOpen ? 90 : 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 22 }}
        style={{ background: menuOpen ? "rgba(0,0,0,0.18)" : "transparent" }}
      >
        <AnimatePresence mode="wait">
          {menuOpen ? (
            <motion.span
              key="close"
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.22 }}
            >
              <X className="w-7 h-7" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
              transition={{ duration: 0.22 }}
            >
              <Menu className="w-7 h-7" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="md:hidden fixed inset-0 z-[90]"
              style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              className="md:hidden fixed top-0 left-0 w-full z-[100] flex flex-col overflow-hidden"
              style={{
                background: "linear-gradient(160deg, #00A9D6 0%, #009fc0 60%, #007fa0 100%)",
                backgroundImage: "url('/images/backgrounds/newbackground.png'), linear-gradient(160deg, #00A9D6 0%, #009fc0 60%, #007fa0 100%)",
                backgroundSize: "200% auto, cover",
                backgroundRepeat: "repeat, no-repeat",
                boxShadow: "0 8px 48px rgba(0,0,0,0.35)",
              }}
              initial={{ clipPath: "ellipse(10% 5% at 95% 5%)", opacity: 0.6 }}
              animate={{ clipPath: "ellipse(150% 150% at 95% 5%)", opacity: 1 }}
              exit={{ clipPath: "ellipse(10% 5% at 95% 5%)", opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Top bar with logo + close */}
              <div className="flex items-center justify-between px-6 pt-5 pb-4">
                <img
                  src="/images/branding/PupO-clock_Website_HeaderLogo-01.webp"
                  alt="Pup O'Clock"
                  className="h-12 w-auto"
                />
                <motion.button
                  onClick={() => setMenuOpen(false)}
                  className="text-white w-9 h-9 flex items-center justify-center rounded-full"
                  style={{ background: "rgba(255,255,255,0.15)" }}
                  whileTap={{ scale: 0.85 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Divider */}
              <div className="mx-6 h-px mb-6" style={{ background: "rgba(255,255,255,0.2)" }} />

              {/* Nav Links */}
              <div className="flex flex-col px-5 pb-8 gap-2">
                {navLinks.map((link, i) => {
                  const Icon = link.icon;
                  return (
                    <motion.a
                      key={link.to}
                      href={link.to}
                      onClick={(e) => handleNav(e, link.to)}
                      className="flex items-center gap-4 px-5 py-4 rounded-2xl group relative overflow-hidden"
                      style={{
                        background: link.highlight
                          ? "linear-gradient(105deg, #FFCD10, #ffe066)"
                          : "rgba(255,255,255,0.10)",
                        border: link.highlight ? "none" : "1px solid rgba(255,255,255,0.15)",
                        textDecoration: "none",
                      }}
                      initial={{ opacity: 0, x: -60 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{
                        duration: 0.45,
                        delay: 0.18 + i * 0.08,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {/* Shine sweep on tap */}
                      <motion.div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)",
                          backgroundSize: "200% 100%",
                        }}
                        whileHover={{ backgroundPosition: ["200% 0", "-200% 0"] }}
                        transition={{ duration: 0.6 }}
                      />

                      {/* Icon circle */}
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background: link.highlight ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.18)",
                        }}
                      >
                        <Icon
                          className="w-5 h-5"
                          style={{ color: link.highlight ? "#1a1a2e" : "#fff" }}
                        />
                      </div>

                      <span
                        className="font-extrabold uppercase tracking-wide text-base"
                        style={{
                          fontFamily: "var(--font-display)",
                          color: link.highlight ? "#1a1a2e" : "#fff",
                          fontSize: link.highlight ? "0.9rem" : "1rem",
                        }}
                      >
                        {link.label}
                      </span>

                      {/* Arrow */}
                      <motion.span
                        className="ml-auto text-lg font-bold"
                        style={{ color: link.highlight ? "#1a1a2e" : "rgba(255,255,255,0.6)" }}
                        initial={{ x: 0 }}
                        whileHover={{ x: 4 }}
                      >
                        →
                      </motion.span>
                    </motion.a>
                  );
                })}
              </div>

              {/* Social icons */}
              <motion.div
                className="flex justify-center gap-5 pb-8"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <a href="https://www.instagram.com/pupoclock_/" target="_blank" rel="noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.15)" }}>
                  <Instagram className="w-5 h-5 text-white" />
                </a>
                <a href="https://www.facebook.com/profile.php?id=61559979823020" target="_blank" rel="noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.15)" }}>
                  <Facebook className="w-5 h-5 text-white" />
                </a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
    {/* Mobile-only spacer so content isn't hidden behind the fixed header */}
    <div className="mobile-header-spacer md:hidden" />
    </>
  );
}