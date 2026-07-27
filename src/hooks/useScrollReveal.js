import { useEffect, useRef, useState } from "react";

// Upgraded: lower threshold + larger rootMargin so reveals trigger earlier
// and feel more intentional as the user scrolls.
export function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: options.threshold || 0.08, rootMargin: options.rootMargin || "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return /** @type {[import("react").MutableRefObject<any>, boolean]} */ ([ref, visible]);
}