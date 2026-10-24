import React, { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "react-bootstrap-icons";

const SWIPE_THRESHOLD = 50;

const pad = (n) => String(n).padStart(2, "0");

// Full-screen viewer. Each photo fades in and comes into focus.
// Supports arrow keys, Escape, and swiping on touch screens.
export const GalleryLightbox = ({ photos, index, onClose, onStep }) => {
  const closeRef = useRef(null);
  const touchStartX = useRef(null);
  const photo = photos[index];
  const hasMultiple = photos.length > 1;

  // Keyboard controls, scroll lock and focus handling
  useEffect(() => {
    const previousFocus = document.activeElement;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      previousFocus?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onStep(1);
      else if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onStep]);

  // Preload neighbours so stepping feels instant
  useEffect(() => {
    if (!hasMultiple) return;
    [index - 1, index + 1].forEach((i) => {
      const next = photos[(i + photos.length) % photos.length];
      new Image().src = next.src;
    });
  }, [index, photos, hasMultiple]);

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > SWIPE_THRESHOLD) onStep(dx < 0 ? 1 : -1);
    touchStartX.current = null;
  };

  const stop = (handler) => (e) => {
    e.stopPropagation();
    handler();
  };

  if (!photo) return null;
  const meta = [photo.dateLabel, photo.category].filter(Boolean).join(" · ");

  return (
    <div
      className="gallery-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={photo.title}
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="gallery-lightbox-hud" aria-hidden="true">
        <span>MedISA · Gallery</span>
        <span>
          IMG {pad(index + 1)} / {pad(photos.length)}
        </span>
      </div>

      <button
        ref={closeRef}
        type="button"
        className="gallery-lightbox-btn gallery-lightbox-close"
        onClick={stop(onClose)}
        aria-label="Close"
      >
        <X size={26} />
      </button>

      {hasMultiple && (
        <button
          type="button"
          className="gallery-lightbox-btn gallery-lightbox-nav prev"
          onClick={stop(() => onStep(-1))}
          aria-label="Previous photo"
        >
          <ChevronLeft size={22} />
        </button>
      )}

      <figure key={photo.file} className="gallery-lightbox-figure" onClick={(e) => e.stopPropagation()}>
        <div className="gallery-lightbox-frame">
          <img src={photo.src} alt={photo.title} />
          <span className="gallery-viewfinder" aria-hidden="true" />
        </div>
        <figcaption>
          <span className="gallery-lightbox-title">{photo.title}</span>
          {meta && <span className="gallery-lightbox-meta">{meta}</span>}
          {photo.description && <p className="gallery-lightbox-description">{photo.description}</p>}
        </figcaption>
      </figure>

      {hasMultiple && (
        <button
          type="button"
          className="gallery-lightbox-btn gallery-lightbox-nav next"
          onClick={stop(() => onStep(1))}
          aria-label="Next photo"
        >
          <ChevronRight size={22} />
        </button>
      )}
    </div>
  );
};
