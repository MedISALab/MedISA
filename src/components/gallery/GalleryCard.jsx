import React, { useEffect, useRef, useState } from "react";
import { useInView } from "./useInView";

// A photo tile. When scrolled into view, the image is revealed by a scan line
// sweeping top to bottom, then sharpens from a blurred state.
export const GalleryCard = ({ photo, index, onOpen }) => {
  const [ref, inView] = useInView();
  const imgRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  // Cached images can finish loading before React attaches onLoad
  useEffect(() => {
    const img = imgRef.current;
    if (inView && img?.complete && img.naturalWidth > 0) setLoaded(true);
  }, [inView]);

  const meta = [photo.dateLabel, photo.category].filter(Boolean).join(" · ");
  const classes = [
    "gallery-card",
    photo.featured && "is-featured",
    inView && "is-visible",
    inView && loaded && "is-revealed",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      ref={ref}
      type="button"
      className={classes}
      style={{ "--delay": `${(index % 4) * 110}ms` }}
      onClick={onOpen}
      aria-label={`Open ${photo.title}`}
    >
      <div className="gallery-card-media">
        {/* The image is fully clipped until revealed, so native loading="lazy"
            would never fire. Instead, start loading once the card is in view.
            onError still reveals the card so it never stays blank. */}
        <img
          ref={imgRef}
          src={inView ? photo.src : undefined}
          alt={photo.title}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
        />
      </div>
      <span className="gallery-card-scan" aria-hidden="true" />
      <span className="gallery-viewfinder" aria-hidden="true" />
      <div className="gallery-card-caption">
        <span className="gallery-card-title">{photo.title}</span>
        {meta && <span className="gallery-card-meta">{meta}</span>}
      </div>
    </button>
  );
};
