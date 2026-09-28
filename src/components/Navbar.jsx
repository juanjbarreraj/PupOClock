import { useState, useEffect } from "react";
import { Menu, X as CloseIcon, Instagram, Facebook, Youtube, Twitter, Info, HelpCircle, ShoppingBag, Mail, Star, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePageTransition } from "./PageTransition";
import TikTok from "./icons/TikTok";
import { HEADER_SOCIALS } from "../content/social";
import { SWAG_ENABLED, WHO_WE_HELP_ENABLED } from "../content/features";

/** icon name (src/content/social.js) -> component */
const SOCIAL_ICONS = {
  instagram: Instagram,
  facebook: Facebook,
  tiktok: TikTok,
  youtube: Youtube,
  x: Twitter,
};

/**
 * Primary navigation.
 *
 * `children` renders as a hover/focus reveal on desktop that slides out from
 * behind its parent, and as an indented entry in the mobile menu.
 */
const navLinks = [
  {
    to: "/about",
    label: "About",
    icon: Info,
    color: "#00A9D6",
    // With no children, About renders as a plain link with no dropdown.
    children: WHO_WE_HELP_ENABLED ? [{ to: "/who-we-help", label: "Who We Help", icon: Users }] : [],
  },
  { to: "/faq", label: "FAQ", icon: HelpCircle, color: "#FF4633" },
  { to: "/swag", label: "Swag", icon: ShoppingBag, color: "#FFCD10", hidden: !SWAG_ENABLED },
  { to: "/contact", label: "Contact Us", icon: Mail, color: "#00A9D6" },
  { to: "/subscribe", label: "Subscriptions", icon: Star, color: "#FFCD10", highlight: true },
].filter((link) => !link.hidden);

/**
 * The mobile menu renders as one flat list, with children indented under their
 * parent. Built up front with a uniform shape so the list has a single type
 * rather than a union of parent-shaped and child-shaped rows.
 *
 * @typedef {Object} MobileRow
 * @property {string} to
 * @property {string} label
 * @property {any} icon
 * @property {boolean} highlight
 * @property {boolean} nested
 */

/** @type {MobileRow[]} */
const mobileRows = navLinks.flatMap((link) => [
  {
    to: link.to,
    label: link.label,
    icon: link.icon,
    highlight: Boolean(link.highlight),
    nested: false,
  },
  ...(link.children || []).map((child) => ({
    to: child.to,
    label: child.label,
    icon: child.icon,
    highlight: false,
    nested: true,
  })),
]);

/**
 * Desktop nav item. When it has children, hovering or focusing it slides the
 * child out from behind the label: the wrapper grows from zero height with
 * overflow hidden while the child translates down from -100%, so the word reads
 * as though it had been tucked in behind its parent.
 */
function DesktopNavItem({ link, onNavigate }) {
  const [open, setOpen] = useState(false);
  const hasChildren = Array.isArray(link.children) && link.children.length > 0;

  return (
    <div
      className="relative"
      onMouseEnter={() => hasChildren && setOpen(true)}
      onMouseLeave={() => hasChildren && setOpen(false)}
      onFocus={() => hasChildren && setOpen(true)}
      onBlur={(e) => {
        if (hasChildren && !e.currentTarget.contains(e.relatedTarget)) setOpen(false);
      }}
    >
      <a
        href={link.to}
        onClick={(e) => onNavigate(e, link.to)}
        className="relative block text-white font-bold uppercase tracking-wider text-base group"
        style={{ fontFamily: "'Poppins', sans-serif" }}
        aria-haspopup={hasChildren ? "true" : undefined}
        aria-expanded={hasChildren ? open : undefined}
      >
        {link.label}
        <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-white rounded-full transition-all duration-300 group-hover:w-full" />
      </a>

      {hasChildren && (
        <AnimatePresence>
          {open && (
            <motion.div
              className="absolute left-0 top-full z-50"
              /* pt keeps the hover target contiguous with the parent link */
              style={{ paddingTop: 10, overflow: "hidden" }}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            >
              <div style={{ overflow: "hidden" }}>
                {link.children.map((child) => (
                  <motion.a
                    key={child.to}
                    href={child.to}
                    onClick={(e) => onNavigate(e, child.to)}
                    className="block whitespace-nowrap text-white font-bold uppercase tracking-wider text-sm px-4 py-2.5 rounded-xl"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      background: "#25bcf9",
                      boxShadow: "0 10px 26px rgba(0,0,0,0.18)",
                    }}
                    initial={{ y: "-110%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-110%" }}
                    transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ background: "#00A9D6" }}
                  >
                    {child.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

export default function Navbar({ transparent = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const transitionTo = usePageTransition();

  /* The header follows the reader: it slides away on scroll down and returns
     immediately on scroll up, so the navigation is always one flick away
     instead of requiring a trip back to the top of the page. */
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (y > lastY + 4 && y > 80) setHeaderHidden(true);
      else if (y < lastY - 4) setHeaderHidden(false);
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (e, to) => {
    e.preventDefault();
    setMenuOpen(false);
    transitionTo(to);
  };

  const headerClasses = [
    "mobile-header",
    headerHidden && !menuOpen ? "mobile-header-hidden" : "",
    scrolled && !menuOpen ? "mobile-header-scrolled" : "",
    "w-full",
    transparent ? "bg-transparent" : "bg-pet-pattern",
    "px-6 py-4 flex items-center justify-between relative z-50",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <nav className={headerClasses}>
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
            {HEADER_SOCIALS.map((s, i) => {
              const Icon = SOCIAL_ICONS[s.icon];
              return (
                <motion.a
                  key={s.icon}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Pup O'Clock on ${s.label}`}
                  whileHover={{ scale: 1.2, rotate: i % 2 === 0 ? 5 : -5 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 340, damping: 22 }}
                >
                  <Icon className="w-5 h-5 text-white" />
                </motion.a>
              );
            })}
          </div>

          {navLinks.map((link) => (
            <DesktopNavItem key={link.to} link={link} onNavigate={handleNav} />
          ))}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden relative z-[110] text-white w-10 h-10 flex items-center justify-center rounded-full"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
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
                <CloseIcon className="w-7 h-7" />
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
                  backgroundImage: "url('/images/backgrounds/newbackground.webp'), linear-gradient(160deg, #00A9D6 0%, #009fc0 60%, #007fa0 100%)",
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
                    aria-label="Close menu"
                    style={{ background: "rgba(255,255,255,0.15)" }}
                    whileTap={{ scale: 0.85 }}
                  >
                    <CloseIcon className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Divider */}
                <div className="mx-6 h-px mb-6" style={{ background: "rgba(255,255,255,0.2)" }} />

                {/* Nav Links */}
                <div className="flex flex-col px-5 pb-8 gap-2">
                  {mobileRows.map((link, i) => {
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
                          marginLeft: link.nested ? "1.5rem" : 0,
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
                          className="rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{
                            width: link.nested ? 32 : 40,
                            height: link.nested ? 32 : 40,
                            background: link.highlight ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.18)",
                          }}
                        >
                          <Icon
                            className={link.nested ? "w-4 h-4" : "w-5 h-5"}
                            style={{ color: link.highlight ? "#1a1a2e" : "#fff" }}
                          />
                        </div>

                        <span
                          className="font-bold uppercase tracking-wider"
                          style={{
                            fontFamily: "'Poppins', sans-serif",
                            color: link.highlight ? "#1a1a2e" : "#fff",
                            fontSize: link.highlight ? "0.9rem" : link.nested ? "0.85rem" : "1rem",
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
                  {HEADER_SOCIALS.map((s) => {
                    const Icon = SOCIAL_ICONS[s.icon];
                    return (
                      <a
                        key={s.icon}
                        href={s.url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Pup O'Clock on ${s.label}`}
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ background: "rgba(255,255,255,0.15)" }}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </a>
                    );
                  })}
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
      {/* Spacer so content is not hidden behind the fixed header. */}
      <div className="mobile-header-spacer" />
    </>
  );
}
