import React from "react";

export const GalleryEmpty = () => (
  <div className="gallery-empty gallery-fade-up" style={{ "--delay": "420ms" }}>
    <div className="gallery-empty-frame" aria-hidden="true">
      <span className="gallery-viewfinder" />
      <span className="gallery-empty-scan" />
    </div>
    <p>Photos coming soon.</p>
  </div>
);
