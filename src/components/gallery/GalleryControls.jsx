import React from "react";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
];

// Category filters and the newest/oldest toggle.
export const GalleryControls = ({
  categories,
  activeCategory,
  onCategoryChange,
  order,
  onOrderChange,
  showSort,
}) => {
  if (categories.length === 0 && !showSort) return null;

  return (
    <div className="gallery-controls gallery-fade-up" style={{ "--delay": "420ms" }}>
      <div className="gallery-filters" role="group" aria-label="Filter by category">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`gallery-chip ${activeCategory === cat ? "active" : ""}`}
            aria-pressed={activeCategory === cat}
            onClick={() => onCategoryChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {showSort && (
        <div className="gallery-sort" role="group" aria-label="Sort by date">
          <span className="gallery-sort-label">Sort</span>
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className={order === opt.value ? "active" : ""}
              aria-pressed={order === opt.value}
              onClick={() => onOrderChange(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
