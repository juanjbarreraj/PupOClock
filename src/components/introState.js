import { useSyncExternalStore } from "react";
import { INTRO_ENABLED } from "../content/features";

/**
 * Whether the homepage intro is playing, shared between the intro itself
 * (IntroOverlay) and the hero, which holds its own entrance until the intro
 * hands over.
 *
 * The decision is made once, when the app first loads:
 *  - INTRO_ENABLED is on (src/content/features.js),
 *  - the visitor landed on the homepage,
 *  - they have not already seen it in this browser tab (sessionStorage),
 *  - their device is not set to reduce motion.
 *
 * index.html runs the same checks in a tiny inline script so the very first
 * paint is the intro's yellow, not a flash of white or of the page.
 */

const SEEN_KEY = "pup-intro-seen";
const HTML_CLASS = "pup-intro";

function decide() {
  if (!INTRO_ENABLED || typeof window === "undefined") return false;
  try {
    if (window.location.pathname !== "/") return false;
    if (window.sessionStorage.getItem(SEEN_KEY)) return false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    return true;
  } catch {
    // Storage blocked (private mode, strict settings): skip rather than risk
    // replaying the intro on every visit.
    return false;
  }
}

let playing = decide();
const listeners = new Set();

// The inline script in index.html may have added the class on its own checks.
// If the app decided otherwise (for example INTRO_ENABLED is off), undo it so
// the page can scroll.
if (!playing && typeof document !== "undefined") {
  document.documentElement.classList.remove(HTML_CLASS);
}

export function isIntroPlaying() {
  return playing;
}

/** Ends the intro: remembers it for this tab and releases the hero. */
export function finishIntro() {
  if (!playing) return;
  playing = false;
  try {
    window.sessionStorage.setItem(SEEN_KEY, "1");
  } catch {
    /* ignore */
  }
  document.documentElement.classList.remove(HTML_CLASS);
  listeners.forEach((fn) => fn());
}

function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/** True once the intro is over, or straight away when it is not playing. */
export function useIntroDone() {
  return useSyncExternalStore(subscribe, () => !playing, () => true);
}
