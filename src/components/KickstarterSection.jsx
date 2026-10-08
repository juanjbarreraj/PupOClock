import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { Volume2 } from "lucide-react";
import { KICKSTARTER } from "../content/relaunch";

/**
 * The Kickstarter teaser: Brian's video on the left, the Kickstarter logo and
 * the launch date on the right, on a white band between the hero and
 * "Who we are".
 *
 * The video plays muted on its own while it is on screen and pauses when it
 * scrolls away (browsers only allow muted autoplay). "Watch with sound"
 * restarts it from the beginning with sound and the normal player controls.
 * It is only downloaded when the section gets close to the screen, so it
 * costs nothing for visitors who never scroll this far.
 *
 * Files: public/video/kickstarter.mp4 and its poster image.
 */
/** 720p for desktop, 480p for phones: same clip, about half the download. */
const VIDEO = "/video/kickstarter.mp4";
const VIDEO_SMALL = "/video/kickstarter-sm.mp4";
const POSTER = "/video/kickstarter-poster.webp";

/** Visitors who asked their browser to save data get the poster and a play
 *  button instead of an autoplaying preview. */
const saveData = () =>
  typeof navigator !== "undefined" && Boolean(/** @type {any} */ (navigator).connection?.saveData);
const KS_GREEN = "#05CE78";

/**
 * The three League of Pups dogs that peek over the top edge of the video as
 * the section scrolls into view, and duck back down as it scrolls away.
 * `left` and `w` are percentages of the video's width; `from`/`to` are the
 * scroll-progress window in which each one pops up, so they rise in turn.
 */
const PEEKERS = [
  { src: "/images/home/peek-dog-1.webp", left: 4, w: 21, from: 0.12, to: 0.3 },
  { src: "/images/home/peek-dog-2.webp", left: 33, w: 34, from: 0.18, to: 0.36 },
  { src: "/images/home/peek-dog-3.webp", left: 75, w: 20, from: 0.24, to: 0.42 },
];

/** One dog, rising from behind the video's top edge with the scroll. */
function Peeker({ dog, progress }) {
  const y = useTransform(progress, [dog.from, dog.to, 0.8, 0.95], ["105%", "0%", "0%", "105%"]);
  const rotate = useTransform(progress, [dog.from, dog.to], [8, 0]);
  return (
    <motion.img
      src={dog.src}
      alt=""
      draggable="false"
      loading="lazy"
      className="absolute bottom-0 h-auto max-w-none select-none"
      style={{ left: `${dog.left}%`, width: `${dog.w}%`, y, rotate, transformOrigin: "50% 100%" }}
    />
  );
}

/**
 * Hand-drawn green doodles that draw themselves in when the section shows
 * up: two arrows pointing at the video, and a burst of lines by the button.
 */
const draw = (delay) => ({
  initial: { pathLength: 0, opacity: 0 },
  whileInView: { pathLength: 1, opacity: 1 },
  viewport: { once: true, margin: "-60px" },
  transition: { pathLength: { duration: 0.55, delay, ease: "easeOut" }, opacity: { duration: 0.01, delay } },
});
/** @type {import("framer-motion").SVGMotionProps<SVGPathElement>} */
const doodle = { fill: "none", stroke: KS_GREEN, strokeWidth: 7, strokeLinecap: "round", strokeLinejoin: "round" };

export default function KickstarterSection() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [near, setNear] = useState(false);
  const [withSound, setWithSound] = useState(false);
  const [src, setSrc] = useState(VIDEO);
  const reduce = useReducedMotion();
  const autoplay = !reduce && !saveData();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const peek = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.5 });

  useEffect(() => {
    setSrc(window.matchMedia("(max-width: 767px)").matches ? VIDEO_SMALL : VIDEO);
  }, []);
  const ease = [0.22, 1, 0.36, 1];

  // Attach the video source only once the section is close to the screen, so
  // the file is never requested by visitors who do not scroll this far.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || near) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNear(true);
      },
      { rootMargin: "40% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [near]);

  // Muted preview: play while at least 40% visible, pause otherwise. Once
  // the visitor turns the sound on, the video is theirs to control, except
  // that it still pauses if they scroll it out of view.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !near) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.4) {
          if (!withSound && autoplay) video.play()?.catch(() => {});
        } else if (!video.paused) {
          video.pause();
        }
      },
      { threshold: [0, 0.4] },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [near, withSound, autoplay]);

  const playWithSound = () => {
    const video = videoRef.current;
    if (!video) return;
    setWithSound(true);
    video.muted = false;
    video.loop = false;
    video.currentTime = 0;
    video.play()?.catch(() => {});
  };

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white pt-24 pb-14 md:pt-32 md:pb-20 relative overflow-hidden"
      aria-labelledby="kickstarter-heading"
    >
      <div className="max-w-6xl mx-auto px-5 md:px-6 flex flex-col md:flex-row items-center gap-10 md:gap-14">
        {/* Video, with the dogs peeking over its top edge and arrows pointing at it */}
        <div className="w-full md:w-[58%] relative">
          {!reduce && (
            <svg
              className="hidden md:block absolute -left-24 -top-24 w-28 h-28 pointer-events-none"
              viewBox="0 0 120 120"
              aria-hidden="true"
            >
              <motion.path d="M14 14 C 40 30, 62 52, 88 88" {...doodle} {...draw(0.2)} />
              <motion.path d="M62 88 L 90 90 L 88 62" {...doodle} {...draw(0.6)} />
            </svg>
          )}
          {!reduce && (
            <svg
              className="hidden md:block absolute -left-4 -top-28 w-24 h-28 pointer-events-none"
              viewBox="0 0 100 120"
              aria-hidden="true"
            >
              <motion.path d="M62 8 C 52 40, 50 64, 52 100" {...doodle} {...draw(0.35)} />
              <motion.path d="M30 80 L 52 104 L 74 82" {...doodle} {...draw(0.75)} />
            </svg>
          )}
          {!reduce && (
            <div
              className="absolute left-0 right-0 overflow-hidden pointer-events-none"
              style={{ bottom: "calc(100% - 14px)", height: "clamp(90px, 12vw, 150px)" }}
              aria-hidden="true"
            >
              {PEEKERS.map((dog) => (
                <Peeker key={dog.src} dog={dog} progress={peek} />
              ))}
            </div>
          )}
        <motion.div
          className="w-full relative rounded-3xl overflow-hidden bg-black"
          style={{ aspectRatio: "16 / 9", boxShadow: "0 24px 60px rgba(0,0,0,0.18)" }}
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease }}
        >
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            src={near ? src : undefined}
            poster={POSTER}
            muted
            loop
            playsInline
            preload="none"
            controls={withSound}
            aria-label="Brian Manni, founder of Pup O'Clock, introduces the new box"
          />
          {!withSound && (
            <button
              type="button"
              onClick={playWithSound}
              className="absolute inset-0 flex items-end justify-end p-4 md:p-5 group"
              aria-label="Watch the video with sound"
            >
              <span
                className="btn-press inline-flex items-center gap-2 rounded-full bg-white/95 text-[#1a1a2e] font-bold text-sm md:text-base px-5 py-3 transition-transform duration-300 group-hover:scale-105"
                style={{ fontFamily: "'Poppins', sans-serif", boxShadow: "0 8px 24px rgba(0,0,0,0.25)" }}
              >
                <Volume2 className="w-5 h-5" aria-hidden="true" />
                Watch with sound
              </span>
            </button>
          )}
        </motion.div>
        </div>

        {/* Kickstarter + date */}
        <motion.div
          className="w-full md:w-[42%] text-center md:text-left"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.15, ease }}
        >
          {KICKSTARTER.url ? (
            <a
              href={KICKSTARTER.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mb-6 transition-transform duration-300 hover:scale-105"
              aria-label="Pup O'Clock on Kickstarter (opens in a new tab)"
            >
              <img
                src="/images/branding/kickstarter-logo.webp"
                alt="Kickstarter"
                draggable="false"
                className="block w-auto mx-auto md:mx-0"
                style={{ height: "clamp(28px, 4vw, 44px)" }}
              />
            </a>
          ) : (
            <img
              src="/images/branding/kickstarter-logo.webp"
              alt="Kickstarter"
              draggable="false"
              className="block w-auto mx-auto md:mx-0 mb-6"
              style={{ height: "clamp(28px, 4vw, 44px)" }}
            />
          )}
          <h2
            id="kickstarter-heading"
            className="uppercase leading-none mb-5"
            style={{ fontFamily: "var(--font-display)", color: "#1a1a2e", letterSpacing: "0.04em" }}
          >
            <span className="block" style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)" }}>
              {KICKSTARTER.kicker}
            </span>
            <span className="block" style={{ fontSize: "clamp(3.6rem, 10vw, 6.5rem)", color: KS_GREEN }}>
              {KICKSTARTER.date}
            </span>
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-md mx-auto md:mx-0">
            {KICKSTARTER.line}
          </p>
          {KICKSTARTER.url && (
            <span className="relative inline-block">
            {!reduce && (
              <svg
                className="absolute -right-14 -bottom-12 w-16 h-16 pointer-events-none"
                viewBox="0 0 70 70"
                aria-hidden="true"
              >
                <motion.path d="M14 10 L 24 26" {...doodle} {...draw(0.9)} />
                <motion.path d="M34 30 L 56 30" {...doodle} {...draw(1.0)} />
                <motion.path d="M18 40 L 26 62" {...doodle} {...draw(1.1)} />
              </svg>
            )}
            <a
              href={KICKSTARTER.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-press inline-block mt-7 text-white font-bold text-base md:text-lg px-8 md:px-10 py-4 rounded-full transition-transform duration-300 hover:scale-105"
              style={{ background: KS_GREEN, boxShadow: "0 10px 28px rgba(5,206,120,0.4)", fontFamily: "'Poppins', sans-serif" }}
            >
              {KICKSTARTER.cta}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            </span>
          )}
        </motion.div>
      </div>
    </section>
  );
}
