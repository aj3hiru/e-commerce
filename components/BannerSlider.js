"use client";
import { useEffect, useRef, useState } from "react";
import { BANNER_SLIDES } from "@/lib/siteData";

export default function BannerSlider() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);
  const touchStartX = useRef(0);

  const goTo = (i) => {
    const next = (i + BANNER_SLIDES.length) % BANNER_SLIDES.length;
    setCurrent(next);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % BANNER_SLIDES.length);
    }, 4000);
    return () => clearInterval(timerRef.current);
  }, []);

  const restart = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % BANNER_SLIDES.length);
    }, 4000);
  };

  const onTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };
  const onTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 40) {
      goTo(current + (diff > 0 ? 1 : -1));
      restart();
    }
  };

  return (
    <div className="banner-slider" id="bannerSlider" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      {BANNER_SLIDES.map((slide, i) => (
        <div key={slide.cls} className={`slide ${slide.cls} ${i === current ? "active" : ""}`}>
          <span className="badge">{slide.badge}</span>
          <div className="slide-copy">
            <h2>
              {slide.title[0]}
              <br />
              {slide.title[1]}
            </h2>
            <p>{slide.sub}</p>
            <a href="#" className="pill-btn">SHOP NOW</a>
          </div>
          <div className="slide-visual">{slide.emoji}</div>
        </div>
      ))}
      <div className="slider-dots">
        {BANNER_SLIDES.map((slide, i) => (
          <button
            key={slide.cls}
            className={`dot ${i === current ? "active" : ""}`}
            aria-label={`Slide ${i + 1}`}
            onClick={() => { goTo(i); restart(); }}
          />
        ))}
        <span className="counter">{current + 1}/{BANNER_SLIDES.length}</span>
      </div>
    </div>
  );
}
