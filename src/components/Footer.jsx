import { Facebook, Instagram, Youtube, Twitter } from "lucide-react";
import { usePageTransition } from "./PageTransition";
import TikTok from "./icons/TikTok";
import { SOCIALS } from "../content/social";
import { SWAG_ENABLED } from "../content/features";

/** icon name (src/content/social.js) -> component */
const SOCIAL_ICONS = {
  instagram: Instagram,
  facebook: Facebook,
  tiktok: TikTok,
  youtube: Youtube,
  x: Twitter,
};

export default function Footer() {
  const transitionTo = usePageTransition();

  const handleNav = (e, to) => {
    e.preventDefault();
    transitionTo(to);
  };

  return (
    <footer
      className="w-full bg-pet-pattern pt-14 pb-8"
      style={{}}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-white mb-10">
          {/* Logo */}
          <div className="col-span-2 md:col-span-1 flex flex-col items-start">
            <img
              src="/images/branding/PupO-clock_Website_HeaderLogo-01.webp"
              alt="Pup O'Clock Logo"
              className="h-20 mb-4"
            />
            <p className="text-white font-bold text-lg">Kids, Dogs, &amp; family!</p>
          </div>

          {/* Discover */}
          <div>
            <h4 className="font-extrabold uppercase mb-4 text-sm tracking-wider" style={{ fontFamily: "'Poppins', sans-serif" }}>Discover</h4>
            {/* Descriptive anchor text on every page: this footer is the most
                consistent internal-link signal Google has for which pages
                matter and what each one is about. */}
            <ul className="space-y-2 text-sm">
              <li><a href="/about" onClick={(e) => handleNav(e, "/about")} className="hover:opacity-75 transition">About Us</a></li>
              <li><a href="/who-we-help" onClick={(e) => handleNav(e, "/who-we-help")} className="hover:opacity-75 transition">Who We Help</a></li>
              <li><a href="/faq" onClick={(e) => handleNav(e, "/faq")} className="hover:opacity-75 transition">FAQ</a></li>
              <li><a href="/contact" onClick={(e) => handleNav(e, "/contact")} className="hover:opacity-75 transition">Contact Us</a></li>
              <li><a href="/privacy" onClick={(e) => handleNav(e, "/privacy")} className="hover:opacity-75 transition">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-extrabold uppercase mb-4 text-sm tracking-wider" style={{ fontFamily: "'Poppins', sans-serif" }}>Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/subscribe" onClick={(e) => handleNav(e, "/subscribe")} className="hover:opacity-75 transition">Subscription Boxes</a></li>
              {SWAG_ENABLED && (
                <li><a href="/swag" onClick={(e) => handleNav(e, "/swag")} className="hover:opacity-75 transition">Swag Store</a></li>
              )}
            </ul>
          </div>

          {/* Be Social */}
          <div>
            <h4 className="font-extrabold uppercase mb-4 text-sm tracking-wider" style={{ fontFamily: "'Poppins', sans-serif" }}>Be Social</h4>
            <ul className="space-y-2 text-sm">
              {SOCIALS.map((social) => {
                const Icon = SOCIAL_ICONS[social.icon];
                return (
                  <li key={social.icon}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Pup O'Clock on ${social.label}`}
                      className="flex items-center gap-2 hover:opacity-75 transition"
                    >
                      <Icon className="w-4 h-4" /> {social.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Footer Dog Illustration — winks on hover */}
        <div className="flex justify-center mb-6">
          <div
            className="relative cursor-pointer transition-transform duration-300 hover:scale-105 group"
            style={{ height: "10.5rem" }}
          >
            <img
              src="/images/branding/IMG_6364.png"
              alt="Pup Illustration"
              className="h-full transition-opacity duration-200 group-hover:opacity-0"
            />
            <img
              src="/images/branding/IMG_6365.png"
              alt=""
              aria-hidden="true"
              className="h-full absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            />
          </div>
        </div>

        <p className="text-center text-white text-sm opacity-80">
          © Pup O'Clock All Rights Reserved {new Date().getFullYear()}.
        </p>
      </div>
    </footer>
  );
}