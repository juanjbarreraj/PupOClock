import { useCallback, useEffect, useRef, useState } from "react";
import { finishIntro, isIntroPlaying } from "./introState";

/**
 * The homepage intro.
 *
 * A 2.6 s clip (public/intro/): starting on the "PUP O'CLOCK" logo filling the
 * screen, the box swooshes back to its spot, turns to face the camera, puffs up and the lid pops open. As it opens, the month's
 * contents burst out of the box (real product images, animated here rather
 * than in the video so they stay sharp), then the whole layer fades away and
 * the hero animates in underneath. When the clip ends its last frame holds
 * for a moment while stickers slap down on both sides of the box.
 *
 * Plays once per tab session, homepage only, never with reduced motion: see
 * introState.js. If the video cannot play (autoplay blocked, slow network,
 * a missing file) the intro simply gets out of the way.
 *
 * Timings are in seconds of the clip. If the clip is replaced, re-measure
 * BURST_AT (the moment the lid is open) and MOUTH (where the box opening sits
 * in the frame, as fractions of the video's width and height).
 */
const BURST_AT = 1.79;
const MOUTH = { x: 0.5, y: 0.6 };
/** How long the last frame holds after the clip ends, for the sticker slap. */
const HOLD_MS = 800;
/** Gap kept between every burst item and the edge of the screen, in px. */
const EDGE = 14;
/** The open box's left and right edges in the clip's last frame, as fractions of its width. */
const BOX = { x0: 0.35, x1: 0.655 };

/**
 * Size unit for the burst and the stickers. It follows the screen, not the
 * video: on a portrait phone the video is wider than the screen, so sizing
 * from it would make everything huge.
 */
function burstUnit(vw, vh) {
  return Math.min(vw, vh * 1.7) * (vh > vw ? 1.9 : 1);
}
/** How long the video may take to start before the intro gives up. */
const START_TIMEOUT_MS = 2500;
/** Hard cap, whatever happens. */
const MAX_MS = 7000;
/** Must match the opacity transition on .intro in src/index.css. */
const EXIT_MS = 650;

/**
 * What bursts out of the box. `a` is the direction in degrees (0 = right,
 * -90 = straight up) and `d` how far along it, as a fraction of the free space
 * between the box and the edge of the screen in that direction, so the layout
 * scales to any screen. `w` is the width as a fraction of the burst unit (see
 * startBurst), `ar` the image's height / width, `r` the final tilt and `t` the
 * stagger in seconds. Final positions are then clamped so every item, rotated,
 * stays fully on screen.
 */
/* All intro images come from public/images/home/box/sm/: copies of the
   product shots capped at 420px, which is all these small, brief items need.
   Regenerate them there if a product image changes. */
const BURST = [
  { src: "/images/home/box/sm/magazine-cover.webp", ar: 1.262, a: -112, d: 0.8, w: 0.12, r: -14, t: 0.0 },
  { src: "/images/home/box/sm/lick-mat.webp", ar: 1.256, a: -64, d: 0.8, w: 0.09, r: 12, t: 0.02 },
  { src: "/images/home/box/sm/givepet-treats.webp", ar: 1.289, a: -150, d: 0.72, w: 0.08, r: -18, t: 0.04 },
  { src: "/images/home/box/sm/toy-plush.webp", ar: 1.044, a: -24, d: 0.72, w: 0.1, r: 16, t: 0.03 },
  { src: "/images/home/box/sm/bandana.webp", ar: 1.36, a: -170, d: 0.6, w: 0.1, r: -22, t: 0.06 },
  { src: "/images/home/box/sm/pup.webp", ar: 1.399, a: -90, d: 0.95, w: 0.065, r: 6, t: 0.01 },
  { src: "/images/home/box/sm/shady.webp", ar: 1.399, a: -100, d: 0.55, w: 0.065, r: -10, t: 0.05 },
  { src: "/images/home/box/sm/daisy.webp", ar: 1.399, a: -128, d: 0.95, w: 0.06, r: -20, t: 0.07 },
  { src: "/images/home/box/sm/dani.webp", ar: 1.399, a: -78, d: 0.55, w: 0.06, r: 14, t: 0.08 },
  { src: "/images/home/box/sm/teddy.webp", ar: 1.399, a: -140, d: 0.95, w: 0.06, r: -8, t: 0.09 },
  { src: "/images/home/box/sm/tori.webp", ar: 1.399, a: -50, d: 0.98, w: 0.06, r: 18, t: 0.1 },
  { src: "/images/home/box/sm/steak.webp", ar: 1.399, a: -36, d: 0.92, w: 0.06, r: -12, t: 0.11 },
  { src: "/images/home/box/sm/flea.webp", ar: 1.399, a: -158, d: 0.98, w: 0.06, r: 22, t: 0.12 },
  { src: "/images/home/box/sm/tick.webp", ar: 1.399, a: -12, d: 0.95, w: 0.06, r: -16, t: 0.12 },
  { src: "/images/home/box/sm/wirefence.webp", ar: 1.399, a: -118, d: 0.5, w: 0.06, r: 8, t: 0.13 },
  { src: "/images/home/box/sm/back-league.webp", ar: 1.399, a: -6, d: 0.62, w: 0.06, r: 24, t: 0.14 },
  { src: "/images/home/box/sm/back-villains.webp", ar: 1.399, a: -176, d: 0.88, w: 0.06, r: -26, t: 0.14 },
  { src: "/images/home/box/sm/yellow-face.webp", ar: 0.793, a: -134, d: 0.7, w: 0.06, r: -12, t: 0.16 },
  { src: "/images/home/box/sm/teddy-sit.webp", ar: 1.495, a: -30, d: 0.55, w: 0.045, r: 8, t: 0.17 },
  { src: "/images/home/box/sm/ball.webp", ar: 0.932, a: -82, d: 0.72, w: 0.035, r: 0, t: 0.18 },
];

/**
 * The stickers that slap down once the box is open: three on each side of the
 * box, in the empty space below the floating items, so they read as part of
 * the same burst. `side` is -1 (left) or 1 (right); x and y place the sticker
 * inside that side's free area (0 = nearest the box / level with the box
 * opening, 1 = screen edge / bottom). `w` is the width as a fraction of the
 * burst unit, `r` the tilt. They land in this order, alternating sides.
 */
const SLAP = [
  { src: "/images/home/box/sm/logo.webp", ar: 0.78, side: -1, x: 0.45, y: 0.1, w: 0.085, r: -8 },
  { src: "/images/home/box/sm/group.webp", ar: 1.058, side: 1, x: 0.45, y: 0.12, w: 0.075, r: 9 },
  { src: "/images/home/box/sm/shady-sit.webp", ar: 1.831, side: -1, x: 0.75, y: 0.4, w: 0.04, r: 6 },
  { src: "/images/home/box/sm/cream.webp", ar: 0.841, side: 1, x: 0.72, y: 0.42, w: 0.06, r: -10 },
  { src: "/images/home/box/sm/brown.webp", ar: 1.034, side: -1, x: 0.35, y: 0.7, w: 0.055, r: 12 },
  { src: "/images/home/box/sm/pup-sit.webp", ar: 0.933, side: 1, x: 0.38, y: 0.7, w: 0.055, r: -6 },
];

export default function IntroOverlay() {
  const [active] = useState(isIntroPlaying);
  const [phase, setPhase] = useState("play"); // play | burst | exit | gone
  const [burst, setBurst] = useState(null);
  const [slap, setSlap] = useState(null);
  const videoRef = useRef(null);
  const stage = useRef({ burst: false, exit: false });

  const exit = useCallback(() => {
    if (stage.current.exit) return;
    stage.current.exit = true;
    finishIntro(); // the hero starts its entrance while this layer fades
    setPhase("exit");
    window.setTimeout(() => setPhase("gone"), EXIT_MS);
  }, []);

  const startBurst = useCallback(() => {
    if (stage.current.burst || stage.current.exit) return;
    stage.current.burst = true;
    const rect = videoRef.current?.getBoundingClientRect();
    if (!rect) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const mx = rect.left + rect.width * MOUTH.x;
    const my = rect.top + rect.height * MOUTH.y;
    const unit = burstUnit(vw, vh);
    // Free space around the box opening, per direction.
    const room = { left: mx - EDGE, right: vw - mx - EDGE, up: my - EDGE, down: vh - my - EDGE };
    const items = BURST.map((item) => {
      let w = item.w * unit;
      let h = w * item.ar;
      const rad = (item.a * Math.PI) / 180;
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      // Half the size of the rotated item's bounding box.
      const rr = (item.r * Math.PI) / 180;
      let hw = (Math.abs(w * Math.cos(rr)) + Math.abs(h * Math.sin(rr))) / 2;
      let hh = (Math.abs(w * Math.sin(rr)) + Math.abs(h * Math.cos(rr))) / 2;
      // Shrink anything that could not fit at all (very small screens).
      const fit = Math.min(1, (vw - 2 * EDGE) / (2 * hw * 3), (vh - 2 * EDGE) / (2 * hh * 3));
      w *= fit; h *= fit; hw *= fit; hh *= fit;
      const rx = (cos < 0 ? room.left : room.right) - hw;
      const ry = (sin < 0 ? room.up : room.down) - hh;
      let x = mx + cos * item.d * Math.max(rx, 0);
      let y = my + sin * item.d * Math.max(ry, 0);
      x = Math.min(Math.max(x, EDGE + hw), vw - EDGE - hw);
      y = Math.min(Math.max(y, EDGE + hh), vh - EDGE - hh);
      return { ...item, width: w, tx: x - mx, ty: y - my };
    });
    setBurst({ x: mx, y: my, items });
    setPhase("burst");
  }, []);

  const startSlap = useCallback(() => {
    if (stage.current.exit) return;
    const rect = videoRef.current?.getBoundingClientRect();
    if (!rect) {
      exit();
      return;
    }
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const unit = burstUnit(vw, vh);
    const boxL = rect.left + rect.width * BOX.x0;
    const boxR = rect.left + rect.width * BOX.x1;
    const top = rect.top + rect.height * MOUTH.y;
    const gap = unit * 0.02;
    setSlap(
      SLAP.map((st) => {
        const w = st.w * unit;
        const h = w * st.ar;
        const x0 = st.side < 0 ? boxL - gap : boxR + gap;
        const x1 = st.side < 0 ? EDGE : vw - EDGE;
        let x = x0 + (x1 - x0) * st.x;
        // Keep clear of the "Skip intro" button along the bottom.
        const bottom = vh - EDGE - 64;
        let y = top + (bottom - top) * st.y;
        const hw = (Math.max(w, h) * 1.1) / 2;
        x = Math.min(Math.max(x, EDGE + hw), vw - EDGE - hw);
        y = Math.min(Math.max(y, EDGE + hw), bottom - hw);
        return { ...st, width: w, left: x, top: y };
      }),
    );
    window.setTimeout(exit, HOLD_MS);
  }, [exit]);

  useEffect(() => {
    if (!active) return undefined;
    const video = videoRef.current;
    if (!video) return undefined;

    let raf = 0;
    let started = false;
    const tick = () => {
      if (video.currentTime >= BURST_AT) startBurst();
      if (!stage.current.exit) raf = requestAnimationFrame(tick);
    };
    const onPlaying = () => {
      started = true;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };
    const onKey = (e) => {
      if (e.key === "Escape") exit();
    };

    // Fetch the burst images while the video plays, so they are ready when
    // the lid opens.
    [...BURST, ...SLAP].forEach((item) => {
      const img = new Image();
      img.src = item.src;
    });

    video.addEventListener("playing", onPlaying);
    video.addEventListener("ended", startSlap);
    video.addEventListener("error", exit);
    window.addEventListener("keydown", onKey);
    video.play()?.catch(exit);

    const giveUp = window.setTimeout(() => {
      if (!started) exit();
    }, START_TIMEOUT_MS);
    const cap = window.setTimeout(exit, MAX_MS);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(giveUp);
      window.clearTimeout(cap);
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("ended", startSlap);
      video.removeEventListener("error", exit);
      window.removeEventListener("keydown", onKey);
    };
  }, [active, exit, startBurst, startSlap]);

  if (!active || phase === "gone") return null;

  return (
    <div className={`intro${phase === "exit" ? " is-exiting" : ""}`}>
      <video
        aria-hidden="true"
        ref={videoRef}
        className="intro__video"
        muted
        playsInline
        preload="auto"
        poster="/intro/pup-intro-poster.webp"
        disablePictureInPicture
      >
        <source src="/intro/pup-intro.webm" type="video/webm" />
        <source src="/intro/pup-intro.mp4" type="video/mp4" />
      </video>

      {slap && (
        <div className="intro__slaps" aria-hidden="true">
          {slap.map((st, i) => (
            <img
              key={st.src}
              src={st.src}
              alt=""
              draggable="false"
              className="intro__sticker"
              style={/** @type {import("react").CSSProperties} */ ({
                left: st.left,
                top: st.top,
                width: st.width,
                "--r": `${st.r}deg`,
                animationDelay: `${i * 0.07}s`,
              })}
            />
          ))}
        </div>
      )}

      {burst && (
        <div className="intro__burst" style={{ left: burst.x, top: burst.y }} aria-hidden="true">
          {burst.items.map((item) => (
            <img
              key={item.src}
              src={item.src}
              alt=""
              draggable="false"
              className="intro__item"
              style={/** @type {import("react").CSSProperties} */ ({
                width: item.width,
                "--tx": `${item.tx}px`,
                "--ty": `${item.ty}px`,
                "--r": `${item.r}deg`,
                animationDelay: `${item.t}s`,
              })}
            />
          ))}
        </div>
      )}

      <button type="button" className="intro__skip" onClick={exit}>
        Skip intro
      </button>
    </div>
  );
}
