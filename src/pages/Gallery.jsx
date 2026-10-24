import React, { useCallback, useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import { gallery, galleryConfig } from "../data/gallery";
import { galleryImages } from "../components/gallery/galleryImages";
import {
  buildPhotos,
  getCategories,
  getYearSpan,
  groupPhotos,
  sortPhotos,
} from "../components/gallery/galleryUtils";
import { GalleryHeader } from "../components/gallery/GalleryHeader";
import { GalleryControls } from "../components/gallery/GalleryControls";
import { GalleryGroup } from "../components/gallery/GalleryGroup";
import { GalleryLightbox } from "../components/gallery/GalleryLightbox";
import { GalleryEmpty } from "../components/gallery/GalleryEmpty";
import "../components/gallery/Gallery.css";

const allPhotos = buildPhotos(gallery, galleryImages);
const categories = getCategories(allPhotos);
const yearSpan = getYearSpan(allPhotos);
const showSort =
  galleryConfig.allowVisitorSort &&
  galleryConfig.order !== "manual" &&
  allPhotos.some((p) => p.date);

const Gallery = () => {
  const [category, setCategory] = useState("All");
  const [order, setOrder] = useState(galleryConfig.order);
  const [activeIndex, setActiveIndex] = useState(null);

  const groups = useMemo(() => {
    const filtered =
      category === "All" ? allPhotos : allPhotos.filter((p) => p.category === category);
    return groupPhotos(sortPhotos(filtered, order), galleryConfig.groupBy);
  }, [category, order]);

  // Flattened list drives the lightbox; startIndexes map each group into it
  const { photos, startIndexes } = useMemo(() => {
    const starts = [];
    let offset = 0;
    groups.forEach((g) => {
      starts.push(offset);
      offset += g.photos.length;
    });
    return { photos: groups.flatMap((g) => g.photos), startIndexes: starts };
  }, [groups]);

  const close = useCallback(() => setActiveIndex(null), []);
  const step = useCallback(
    (dir) => setActiveIndex((i) => (i + dir + photos.length) % photos.length),
    [photos.length]
  );

  return (
    <section className="gallery-page">
      <GalleryHeader total={allPhotos.length} yearSpan={yearSpan} />

      <Container>
        {allPhotos.length > 0 && (
          <GalleryControls
            categories={categories}
            activeCategory={category}
            onCategoryChange={setCategory}
            order={order}
            onOrderChange={setOrder}
            showSort={showSort}
          />
        )}

        {photos.length === 0 ? (
          <GalleryEmpty />
        ) : (
          // Re-keying replays the reveal animation when the filter or sort changes
          <div key={`${category}-${order}`}>
            {groups.map((group, i) => (
              <GalleryGroup
                key={group.key}
                group={group}
                startIndex={startIndexes[i]}
                showHeader={galleryConfig.groupBy !== "none"}
                onOpen={setActiveIndex}
              />
            ))}
          </div>
        )}
      </Container>

      {activeIndex !== null && (
        <GalleryLightbox photos={photos} index={activeIndex} onClose={close} onStep={step} />
      )}
    </section>
  );
};

export default Gallery;
