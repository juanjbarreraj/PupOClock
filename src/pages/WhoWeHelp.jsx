import { motion } from "framer-motion";
import Seo from "../components/Seo";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RelaunchSignup from "../components/RelaunchSignup";
import FloatingObjects from "../components/FloatingObjects";
import { salesPaused } from "../content/relaunch";

/**
 * Who We Help.
 *
 * Every claim on this page is already made elsewhere on the site (About, the
 * Give Back section, the League of Pups section, and the FAQ). Nothing about
 * the business is invented here.
 *
 * TODO for Pup O'Clock: the shelter block deliberately does not name partner
 * shelters, because the site does not currently name any. Once the list is
 * confirmed, add the names (and ideally logos) to `GROUPS[2]` below. Naming real
 * partners is the single biggest credibility upgrade available to this page.
 */

const GROUPS = [
  {
    id: "kids",
    eyebrow: "The kids",
    title: "Children learning to care for a dog",
    accent: "#00A9D6",
    img: "/images/about/familyhd.webp",
    body: [
      "Pup O'Clock is built for children roughly four to twelve years old, and for the parents who want them genuinely involved rather than just watching.",
      "Each box turns caring for the family dog into something a child does rather than something done around them: activities to complete, guides to read, and a responsibility contract the whole family signs. Along the way it teaches responsibility, empathy, and unconditional love.",
    ],
  },
  {
    id: "dogs",
    eyebrow: "The dogs",
    title: "The family dog at the center of it",
    accent: "#FF4633",
    img: "/images/about/boxhd.webp",
    body: [
      "Every item in the box is vet-approved, safety-tested, and chosen for the dog as much as for the child.",
      "Enrichment, training tools and games are the point, not an afterthought: a dog whose brain and body are properly occupied is a calmer dog, and a calmer dog makes for a happier home.",
    ],
  },
  {
    id: "shelters",
    eyebrow: "The shelters",
    title: "Neighborhood shelters doing the hard work",
    accent: "#FFCD10",
    img: "/images/about/Shelterhd.webp",
    body: [
      "A portion of the proceeds from each box goes to a growing list of neighborhood shelters we have partnered with, supporting their work of keeping animals safe and cared for.",
      "The League of Pups, the characters your family meets inside the box, are inspired by real shelter dogs. The dogs who need homes are the ones teaching the lessons.",
    ],
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function WhoWeHelp() {
  return (
    <div className="min-h-screen bg-white">
      <Seo path="/who-we-help" />
      <Navbar />

      {/* ── Hero ── */}
      <section className="bg-pet-pattern relative overflow-hidden pb-0">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center relative z-10">
          <motion.p
            className="text-xs font-extrabold uppercase tracking-[0.3em] text-white/70 mb-4"
            style={{ fontFamily: "'Poppins', sans-serif" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            Our purpose
          </motion.p>
          <motion.h1
            className="font-extrabold uppercase text-white leading-none mb-5"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.6rem, 8vw, 5rem)" }}
            initial={{ opacity: 0, y: 28, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Who We Help
          </motion.h1>
          <motion.p
            className="text-white/85 text-lg max-w-xl mx-auto font-medium leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            Three groups, one box. The children learning to care for a dog, the dog they are
            learning on, and the shelters looking after the dogs still waiting for a family.
          </motion.p>
        </div>

        {/* Wave into white */}
        <div
          className="absolute bottom-0 left-0 w-full overflow-hidden"
          style={{ lineHeight: 0, marginBottom: "-2px" }}
        >
          <svg
            viewBox="0 0 1440 64"
            className="w-full"
            style={{ display: "block" }}
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              d="M0,42 Q120,10 240,36 Q360,62 480,36 Q600,10 720,36 Q840,62 960,36 Q1080,10 1200,36 Q1320,62 1440,36 L1440,64 L0,64 Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* ── The three groups ── */}
      <section className="relative bg-white py-16 md:py-24 px-6 overflow-hidden">
        <FloatingObjects count={14} />

        <div className="max-w-5xl mx-auto relative z-10 space-y-16 md:space-y-24">
          {GROUPS.map((group, i) => (
            <motion.div
              key={group.id}
              id={group.id}
              className={`flex flex-col ${i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-8 md:gap-14`}
              {...fadeUp(0)}
            >
              <div className="flex-1 w-full">
                <div
                  className="rounded-3xl overflow-hidden"
                  style={{ boxShadow: "0 18px 50px rgba(0,0,0,0.12)" }}
                >
                  <img
                    src={group.img}
                    alt={group.title}
                    className="w-full object-cover"
                    style={{ height: 340 }}
                    loading="lazy"
                  />
                  <div className="h-1.5 w-full" style={{ background: group.accent }} />
                </div>
              </div>

              <div className="flex-1">
                <p
                  className="text-xs font-extrabold uppercase tracking-[0.28em] mb-3"
                  style={{ fontFamily: "'Poppins', sans-serif", color: group.accent }}
                >
                  {group.eyebrow}
                </p>
                <h2
                  className="font-normal text-[#1a1a2e] leading-tight mb-4"
                  style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.6rem, 4vw, 2.4rem)" }}
                >
                  {group.title}
                </h2>
                {group.body.map((para, idx) => (
                  <p key={idx} className="text-gray-500 text-base leading-relaxed mb-4 last:mb-0">
                    {para}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Wave back into the signup / footer ── */}
      <div className="bg-pet-pattern overflow-hidden" style={{ lineHeight: 0, marginBottom: "-2px" }}>
        <svg
          viewBox="0 0 1440 64"
          className="w-full"
          style={{ display: "block", marginTop: "-2px" }}
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path d="M0,0 L0,40 C240,64 480,64 720,36 C960,8 1200,8 1440,40 L1440,0 Z" fill="white" />
        </svg>
      </div>

      {salesPaused && <RelaunchSignup />}

      <Footer />
    </div>
  );
}
