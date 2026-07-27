import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Mini image switcher for products with alternate views.
export default function ImageCarousel({ images, alt, imgClassName = "w-full h-full object-contain" }) {
  const [index, setIndex] = useState(0);
  const multiple = images.length > 1;

  const go = (e, dir) => {
    e.stopPropagation();
    setIndex((i) => (i + dir + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <img src={images[index]} alt={alt} className={imgClassName} />
      {multiple && (
        <>
          <button
            onClick={(e) => go(e, -1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:bg-white hover:scale-110 transition-all"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={(e) => go(e, 1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:bg-white hover:scale-110 transition-all"
            aria-label="Next image"
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setIndex(i); }}
                className="w-2 h-2 rounded-full transition-all"
                style={{ background: i === index ? "#00A9D6" : "#d1d5db", transform: i === index ? "scale(1.25)" : "scale(1)" }}
                aria-label={`Image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}