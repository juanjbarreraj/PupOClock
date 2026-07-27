import { useEffect, useRef, useState } from "react";

// New Pup O'Clock decoration asset set
const ASSETS = [
  "/images/decorations/IMG_6378.png", // target / arrows
  "/images/decorations/IMG_6379.png", // brown dog face
  "/images/decorations/IMG_6381.png", // yellow dog face
  "/images/decorations/IMG_6377.png", // blue scribble star
  "/images/decorations/IMG_6373.png", // yellow tennis ball
  "/images/decorations/IMG_6374.png", // blue loop scribble
  "/images/decorations/IMG_6375.png", // yellow scribble star
  "/images/decorations/IMG_6376.png", // red scribble star
  "/images/decorations/IMG_6382.png", // cream owl face
];

const MIN_SPEED = 14;
const MAX_SPEED = 60;
const REPEL_RADIUS = 80;
const EDGE_PAD = 4;

/**
 * FloatingObjects — interactive wandering decoration layer for white sections.
 * Parent must be `position: relative`. Content above should have z-index >= 10.
 */
export default function FloatingObjects({ count = 18 }) {
  const containerRef = useRef(null);
  const stRef = useRef({ objs: [], nodes: {}, mouse: { x: -9999, y: -9999 }, visible: false, raf: 0, last: 0 });
  const [items, setItems] = useState([]);
  const [assetMap, setAssetMap] = useState({});
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const n = isMobile ? Math.min(count, ASSETS.length) : count;
    const [minS, maxS] = isMobile ? [22, 44] : [32, 70];

    const list = Array.from({ length: n }, (_, i) => ({
      id: i,
      size: Math.round(minS + Math.random() * (maxS - minS)),
      fx: 0.03 + Math.random() * 0.9,
      fy: 0.05 + Math.random() * 0.85,
    }));
    setItems(list);
    // Even distribution: cycle through the asset set
    setAssetMap(Object.fromEntries(list.map((o, i) => [o.id, i % ASSETS.length])));
    setReduced(isReduced);
    if (isReduced) return;

    const st = stRef.current;
    st.objs = list.map((o) => ({
      id: o.id,
      size: o.size,
      fx: o.fx,
      fy: o.fy,
      x: -1,
      y: -1,
      vx: (Math.random() < 0.5 ? -1 : 1) * (MIN_SPEED + Math.random() * 22),
      vy: (Math.random() < 0.5 ? -1 : 1) * (MIN_SPEED + Math.random() * 22),
      shown: false,
    }));

    function tick(now) {
      st.raf = 0;
      const el = containerRef.current;
      if (!el || !st.visible) return;
      const rect = el.getBoundingClientRect();
      const dt = Math.min((now - st.last) / 1000, 0.05);
      st.last = now;

      if (rect.width > 40 && rect.height > 40) {
        const mx = st.mouse.x - rect.left;
        const my = st.mouse.y - rect.top;

        for (const o of st.objs) {
          const node = st.nodes[o.id];
          if (!node) continue;
          if (o.x < 0) {
            o.x = Math.min(o.fx * rect.width, rect.width - o.size - EDGE_PAD);
            o.y = Math.min(o.fy * rect.height, rect.height - o.size - EDGE_PAD);
          }

          // Gentle wander
          o.vx += (Math.random() - 0.5) * 60 * dt;
          o.vy += (Math.random() - 0.5) * 60 * dt;

          // Cursor proximity — gently drift away (desktop only)
          if (finePointer) {
            const cx = o.x + o.size / 2;
            const cy = o.y + o.size / 2;
            const dx = cx - mx;
            const dy = cy - my;
            const R = o.size / 2 + REPEL_RADIUS;
            const d2 = dx * dx + dy * dy;
            if (d2 < R * R && d2 > 0.01) {
              const d = Math.sqrt(d2);
              const push = (1 - d / R) * 700 * dt;
              o.vx += (dx / d) * push;
              o.vy += (dy / d) * push;
            }
          }

          // Speed limits — keep motion alive but calm
          const speed = Math.hypot(o.vx, o.vy);
          if (speed > MAX_SPEED) {
            const s = 1 - (1 - MAX_SPEED / speed) * 0.08;
            o.vx *= s;
            o.vy *= s;
          } else if (speed < MIN_SPEED && speed > 0.01) {
            const s = MIN_SPEED / speed;
            o.vx *= s;
            o.vy *= s;
          }

          o.x += o.vx * dt;
          o.y += o.vy * dt;

          // Bounce inside the white section's invisible walls
          const maxX = rect.width - o.size - EDGE_PAD;
          const maxY = rect.height - o.size - EDGE_PAD;
          if (o.x < EDGE_PAD) { o.x = EDGE_PAD; o.vx = Math.abs(o.vx); }
          else if (o.x > maxX) { o.x = maxX; o.vx = -Math.abs(o.vx); }
          if (o.y < EDGE_PAD) { o.y = EDGE_PAD; o.vy = Math.abs(o.vy); }
          else if (o.y > maxY) { o.y = maxY; o.vy = -Math.abs(o.vy); }

          node.style.transform = `translate3d(${o.x}px, ${o.y}px, 0)`;
          if (!o.shown) { o.shown = true; node.style.opacity = "1"; }
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
     
  }, []);

  // Click → morph into a random different object from the set
  const swap = (id) => {
    setAssetMap((m) => {
      const cur = m[id];
      let next = Math.floor(Math.random() * (ASSETS.length - 1));
      if (next >= cur) next++;
      return { ...m, [id]: next };
    });
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      {items.map((o) => (
        <div
          key={o.id}
          ref={(n) => { stRef.current.nodes[o.id] = n; }}
          onClick={() => swap(o.id)}
          className="absolute pointer-events-auto cursor-pointer select-none"
          style={
            reduced
              ? { left: `${o.fx * 100}%`, top: `${o.fy * 100}%`, width: o.size, height: o.size }
              : { left: 0, top: 0, width: o.size, height: o.size, opacity: 0, transition: "opacity 0.7s ease", willChange: "transform" }
          }
        >
          <img
            key={assetMap[o.id]}
            src={ASSETS[assetMap[o.id]]}
            alt=""
            draggable="false"
            className="w-full h-full object-contain fo-pop"
          />
        </div>
      ))}
    </div>
  );
}