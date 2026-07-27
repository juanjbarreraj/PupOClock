import { Facebook, Instagram } from "lucide-react";
import { usePageTransition } from "./PageTransition";

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
            <ul className="space-y-2 text-sm">
              <li><a href="/about" onClick={(e) => handleNav(e, "/about")} className="hover:opacity-75 transition">About Us</a></li>
              <li><a href="/contact" onClick={(e) => handleNav(e, "/contact")} className="hover:opacity-75 transition">Contact Us</a></li>
              <li><a href="/privacy" onClick={(e) => handleNav(e, "/privacy")} className="hover:opacity-75 transition">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-extrabold uppercase mb-4 text-sm tracking-wider" style={{ fontFamily: "'Poppins', sans-serif" }}>Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/subscribe" onClick={(e) => handleNav(e, "/subscribe")} className="hover:opacity-75 transition">Pup O'Clock Box</a></li>
              <li><a href="/swag" onClick={(e) => handleNav(e, "/swag")} className="hover:opacity-75 transition">Swag</a></li>
            </ul>
          </div>

          {/* Be Social */}
          <div>
            <h4 className="font-extrabold uppercase mb-4 text-sm tracking-wider" style={{ fontFamily: "'Poppins', sans-serif" }}>Be Social</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://www.facebook.com/profile.php?id=61559979823020" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:opacity-75 transition">
                  <Facebook className="w-4 h-4" /> Facebook
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/pupoclock_/" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:opacity-75 transition">
                  <Instagram className="w-4 h-4" /> Instagram
                </a>
              </li>
              <li>
                <a href="https://www.tiktok.com/@pupoclock" target="_blank" rel="noreferrer" className="hover:opacity-75 transition">🎵 TikTok</a>
              </li>
              <li>
                <a href="https://x.com/PupOclock_" target="_blank" rel="noreferrer" className="hover:opacity-75 transition">🐦 X / Twitter</a>
              </li>
              <li>
                <a href="https://www.youtube.com/channel/UC7Dxym4-DMp7PxB7aj-yj5A" target="_blank" rel="noreferrer" className="hover:opacity-75 transition">▶️ YouTube</a>
              </li>
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
          © Pup O'Clock All Rights Reserved 2025.
        </p>
      </div>
    </footer>
  );
}