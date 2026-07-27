/**
 * SectionDivider — smooth curved wave between blue pattern and white sections.
 * direction: "down" = blue above → white below (wave points down into white)
 *            "up"   = white above → blue below (wave points up into blue)
 */
export default function SectionDivider({ direction = "down", color = "#ffffff" }) {
  if (direction === "down") {
    return (
      <div className="w-full overflow-hidden bg-pet-pattern" style={{ marginTop: "-2px", display: "block", lineHeight: 0 }}>
        <svg viewBox="0 0 1440 64" className="w-full" style={{ display: "block", marginBottom: "-2px" }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path
            d="M0,64 L0,24 C240,0 480,0 720,28 C960,56 1200,56 1440,24 L1440,64 Z"
            fill={color}
          />
        </svg>
      </div>
    );
  }
  return (
    <div className="w-full overflow-hidden bg-pet-pattern" style={{ marginBottom: "-2px", display: "block", lineHeight: 0 }}>
      <svg viewBox="0 0 1440 64" className="w-full" style={{ display: "block", marginTop: "-2px" }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path
          d="M0,0 L0,40 C240,64 480,64 720,36 C960,8 1200,8 1440,40 L1440,0 Z"
          fill="white"
        />
      </svg>
    </div>
  );
}