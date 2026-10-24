import React from "react";

// Page intro over a faint imaging grid with a slow scan line.
export const GalleryHeader = ({ total, yearSpan }) => (
  <header className="gallery-header">
    <span className="gallery-header-scan" aria-hidden="true" />
    <div className="gallery-header-inner">
      <p className="gallery-eyebrow gallery-fade-up">MedISA Lab · Moments</p>
      <h1 className="gallery-title gallery-fade-up" style={{ "--delay": "120ms" }}>
        Gallery
      </h1>
      <p className="gallery-subtitle gallery-fade-up" style={{ "--delay": "240ms" }}>
        Conferences, talks and everyday life at the Medical Image Synthesis &amp; Analysis Lab.
      </p>
      {total > 0 && (
        <p className="gallery-stats gallery-fade-up" style={{ "--delay": "360ms" }}>
          {total} {total === 1 ? "frame" : "frames"}
          {yearSpan && <> · {yearSpan}</>}
        </p>
      )}
    </div>
  </header>
);
