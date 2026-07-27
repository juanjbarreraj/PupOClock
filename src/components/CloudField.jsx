import { useEffect, useRef, useState } from "react";
import { CLOUD_ASSETS } from "./BrandCloud";

const MIN_VX = 12;
const MAX_SPEED = 42;
const REPEL_RADIUS = 110;
const PAD = 2;

/**
 * CloudField — free-floating animated clouds contained inside a section.
 * Parent must be `position: relative`; content above should be z-10+.
 * Clouds drift + bob continuously, bounce off the field edges,
 * and drift gently away from the cursor on desktop.
 *
 * `bottomInset` keeps clouds clear of a bottom separator (e.g. white wave).
 */
export default function CloudField({ bottomInset = 56 }) {
  const containerRef = useRef(null);
  const stRef = useRef({ objs: [], nodes: {}, mouse: { x: -9999, y: -9999 }, visible: false, raf: 0, last: 0 });
  const [items, setItems] = useState([]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const n = isMobile ? 6 : 10;
    const [minS, maxS] = isMobile ? [64, 120] : [90, 180];

    const list = Array.from({ length: n }, (_, i) => ({
      id: i,
      asset: i % CLOUD_ASSETS.length,
      size: Math.round(minS + Math.random() * (maxS - minS)),
      fx: 0.02 + Math.random() * 0.9,
      fy: 0.04 + Math.random() * 0.8,
    }));
    setItems(list);
    if (reduced) return;

    const st = stRef.current;
    st.objs = list.map((o) => ({
      id: o.id,
      size: o.size,
      fx: o.fx,
      fy: o.fy,
      x: -1,
      y: -1,
      // Cloud motion: dominant horizontal drift + gentle vertical wander
      vx: (Math.random() < 0.5 ? -1 : 1) * (MIN_VX + Math.random() * 18),
      vy: (Math.random() < 0.5 ? -1 : 1) * (3 + Math.random() * 6),
      bobAmp: 5 + Math.random() * 8,
      bobFreq: 0.4 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
      shown: false,
    }));

    function tick(now) {
      st.raf = 0;
      const el = containerRef.current;
      if (!el || !st.visible) return;
      const rect = el.getBoundingClientRect();
      const dt = Math.min((now - st.last) / 1000, 0.05);
      st.last = now;
      const t = now / 1000;

      if (rect.width > 60 && rect.height > 60) {
        const mx = st.mouse.x - rect.left;
        const my = st.mouse.y - rect.top;

        for (const o of st.objs) {
          const node = st.nodes[o.id];
          if (!node) continue;
          const h = o.size * 0.62; // clouds are wider than tall
          if (o.x < 0) {
            o.x = Math.min(o.fx * rect.width, rect.width - o.size - PAD);
            o.y = Math.min(o.fy * rect.height, rect.height - h - PAD);
          }

          // Gentle wander
          o.vx += (Math.random() - 0.5) * 26 * dt;
          o.vy += (Math.random() - 0.5) * 14 * dt;

          // Cursor proximity — soft drift away (desktop only)
          if (finePointer) {
            const cx = o.x + o.size / 2;
            const cy = o.y + h / 2;
            const dx = cx - mx;
            const dy = cy - my;
            const R = o.size / 2 + REPEL_RADIUS;
            const d2 = dx * dx + dy * dy;
            if (d2 < R * R && d2 > 0.01) {
              const d = Math.sqrt(d2);
              const push = (1 - d / R) * 320 * dt;
              o.vx += (dx / d) * push;
              o.vy += (dy / d) * push;
            }
          }

          // Speed limits — keep drift alive but calm
          const speed = Math.hypot(o.vx, o.vy);
          if (speed > MAX_SPEED) {
            const s = 1 - (1 - MAX_SPEED / speed) * 0.08;
            o.vx *= s;
            o.vy *= s;
          }
          if (Math.abs(o.vx) < MIN_VX) o.vx = MIN_VX * Math.sign(o.vx || 1);

          o.x += o.vx * dt;
          o.y += o.vy * dt;

          // Bounce inside the field
          const maxX = rect.width - o.size - PAD;
          const maxY = rect.height - h - PAD;
          if (o.x < PAD) { o.x = PAD; o.vx = Math.abs(o.vx); }
          else if (o.x > maxX) { o.x = maxX; o.vx = -Math.abs(o.vx); }
          if (o.y < PAD) { o.y = PAD; o.vy = Math.abs(o.vy); }
          else if (o.y > maxY) { o.y = maxY; o.vy = -Math.abs(o.vy); }

          // Gentle bobbing on top of the drift
          const bob = Math.sin(t * o.bobFreq * Math.PI + o.phase) * o.bobAmp;
          node.style.transform = `translate3d(${o.x}px, ${o.y + bob}px, 0)`;
          if (!o.shown) { o.shown = true; node.style.opacity = "0.92"; }
        }
      }

      st.raf = requestAnimationFrame(tick);
    }

    const onMouse = (e) => { st.mouse.x = e.clientX; st.mouse.y = e.clientY; };
    if (finePointer) window.addEventListener("mousemove", onMouse, { passive: true });

    const io = new IntersectionObserver(([entry]) => {
      st.visible = entry.isIntersecting;
      if (st.visible && !st.raf) {
        st.last = performance.now();
        st.raf = requestAnimationFrame(tick);
      }
    });
    if (containerRef.current) io.observe(containerRef.current);

    return () => {
      if (st.raf) cancelAnimationFrame(st.raf);
      st.raf = 0;
      io.disconnect();
      if (finePointer) window.removeEventListener("mousemove", onMouse);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute left-0 right-0 top-0 overflow-hidden pointer-events-none"
      style={{ bottom: bottomInset, zIndex: 0 }}
      aria-hidden="true"
    >
      {items.map((o) => (
        <div
          key={o.id}
          ref={(n) => { stRef.current.nodes[o.id] = n; }}
          className="absolute left-0 top-0 select-none"
          style={{ width: o.size, opacity: 0, transition: "opacity 0.8s ease", willChange: "transform" }}
        >
          <img src={CLOUD_ASSETS[o.asset]} alt="" draggable="false" className="w-full h-auto" />
        </div>
      ))}
    </div>
  );
}