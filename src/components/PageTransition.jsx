import { createContext, useContext, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const TransitionContext = createContext(null);

export function usePageTransition() {
  return useContext(TransitionContext);
}

export default function PageTransition({ children }) {
  const navigate = useNavigate();
  const [phase, setPhase] = useState("idle"); // idle | covering | revealing
  const pendingPath = useRef(null);

  const transitionTo = useCallback((to) => {
    if (pendingPath.current) return;
    pendingPath.current = to;
    setPhase("covering");
  }, []);

  // Called when the cover-in animation finishes
  const onCoverComplete = () => {
    if (phase !== "covering") return;
    navigate(pendingPath.current);
    pendingPath.current = null;
    // Very short tick so the new page renders under the overlay
    setTimeout(() => setPhase("revealing"), 40);
  };

  // Called when the reveal-out animation finishes
  const onRevealComplete = () => {
    if (phase === "revealing") setPhase("idle");
  };

  const overlayVisible = phase === "covering" || phase === "revealing";

  return (
    <TransitionContext.Provider value={transitionTo}>
      {children}

      <AnimatePresence>
        {overlayVisible && (
          <motion.div
            key="page-overlay"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={phase === "covering" ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.02 }}
            onAnimationComplete={phase === "covering" ? onCoverComplete : onRevealComplete}
            transition={{
              duration: phase === "covering" ? 0.65 : 0.75,
              ease: phase === "covering" ? [0.4, 0, 0.2, 1] : [0.22, 1, 0.36, 1],
            }}
            style={{
              position: "fixed",
              inset: 0,
              background: "#ffffff",
              zIndex: 9999,
              pointerEvents: "all",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Branded logo in center with dramatic entrance */}
            <motion.img
              src="https://media.base44.com/images/public/6a2c05717732611268059817/2f3d3cbc3_67fec3342e0a509a395ec33d_open-graph-2025_Pupoclock-logo-removebg-preview.png"
              alt=""
              initial={{ opacity: 0, scale: 0.7, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: -15 }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              style={{ width: 220, filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.12))" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}