import FloatingObjects from "./FloatingObjects";

/**
 * WhiteSectionWrapper
 * Wraps white/light sections with:
 * - Soft brand-color corner gradients
 * - Interactive floating Pup O'Clock objects
 */
export default function WhiteSectionWrapper({ children, className = "", style = {}, objectCount = 18 }) {
  return (
    <div className={`relative overflow-hidden bg-white ${className}`} style={style}>
      {/* Corner glow — top-left blue */}
      <div
        className="absolute -top-20 -left-20 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,169,214,0.10) 0%, transparent 70%)" }}
      />
      {/* Corner glow — bottom-right yellow */}
      <div
        className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,205,16,0.10) 0%, transparent 70%)" }}
      />
      {/* Corner glow — top-right pink */}
      <div
        className="absolute -top-16 -right-16 w-56 h-56 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,70,51,0.07) 0%, transparent 70%)" }}
      />

      <FloatingObjects count={objectCount} />

      {children}
    </div>
  );
}