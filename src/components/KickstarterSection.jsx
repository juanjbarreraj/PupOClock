import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
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

export default function KickstarterSection() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [near, setNear] = useState(false);
  const [withSound, setWithSound] = useState(false);
  const [src, setSrc] = useState(VIDEO);
  const reduce = useReducedMotion();
  const autoplay = !reduce && !saveData();

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
    <section ref={sectionRef} className="w-full bg-white py-14 md:py-20" aria-labelledby="kickstarter-heading">
      <div className="max-w-6xl mx-auto px-5 md:px-6 flex flex-col md:flex-row items-center gap-10 md:gap-14">
        {/* Video */}
        <motion.div
          className="w-full md:w-[58%] relative rounded-3xl overflow-hidden bg-black"
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
          )}
        </motion.div>
      </div>
    </section>
  );
}
