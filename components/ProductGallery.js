"use client";
import { useState, useRef } from "react";

export default function ProductGallery({ images, title }) {
  const [active, setActive] = useState(0);
  const touchStartX = useRef(0);

  const onTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };
  const onTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 40) {
      setActive((a) => {
        const next = a + (diff > 0 ? 1 : -1);
        return Math.max(0, Math.min(images.length - 1, next));
      });
    }
  };

  return (
    <div>
      <div className="pdp-gallery-main" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <img src={images[active]} alt={title} />
      </div>
      {images.length > 1 && (
        <div className="pdp-thumbs">
          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              className={`pdp-thumb ${i === active ? "active" : ""}`}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
            >
              <img src={src} alt={`${title} ${i + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
