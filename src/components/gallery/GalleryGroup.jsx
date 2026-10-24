import React from "react";
import { GalleryCard } from "./GalleryCard";
import { useInView } from "./useInView";

// A dated section (e.g. "2026") with its own grid of photos.
// startIndex is the position of the first photo in the full, flattened list.
export const GalleryGroup = ({ group, startIndex, showHeader, onOpen }) => {
  const [ref, inView] = useInView();
  const count = group.photos.length;

  return (
    <section
      ref={ref}
      className={`gallery-group ${inView ? "is-visible" : ""}`}
      aria-label={group.label || "Photos"}
    >
      {showHeader && group.label && (
        <header className="gallery-group-header">
          <span className="gallery-group-dot" aria-hidden="true" />
          <h2 className="gallery-group-label">{group.label}</h2>
          <span className="gallery-group-count">
            {count} {count === 1 ? "photo" : "photos"}
          </span>
          <span className="gallery-group-line" aria-hidden="true" />
        </header>
      )}

      <div className="gallery-grid">
        {group.photos.map((photo, idx) => (
          <GalleryCard
            key={photo.file}
            photo={photo}
            index={idx}
            onOpen={() => onOpen(startIndex + idx)}
          />
        ))}
      </div>
    </section>
  );
};
