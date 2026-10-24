// Pure helpers for turning gallery data into sorted, grouped photos.

const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS_LONG = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const warn = (message) => {
  if (process.env.NODE_ENV !== "production") console.warn(`[Gallery] ${message}`);
};

// "2026" | "2026-10" | "2026-10-12" -> { year, month, day, sortKey }
export const parseDate = (value) => {
  if (!value) return null;
  const match = String(value).trim().match(/^(\d{4})(?:-(\d{1,2}))?(?:-(\d{1,2}))?$/);
  if (!match) return null;

  const year = Number(match[1]);
  const month = match[2] ? Number(match[2]) : null;
  const day = match[3] ? Number(match[3]) : null;
  if ((month && (month < 1 || month > 12)) || (day && (day < 1 || day > 31))) return null;

  return { year, month, day, sortKey: year * 10000 + (month || 0) * 100 + (day || 0) };
};

// { year: 2026, month: 10, day: 12 } -> "12 Oct 2026"
export const formatDate = (date) => {
  if (!date) return "";
  if (date.day) return `${date.day} ${MONTHS_SHORT[date.month - 1]} ${date.year}`;
  if (date.month) return `${MONTHS_SHORT[date.month - 1]} ${date.year}`;
  return String(date.year);
};

// "lab-outing_2026.jpg" -> "Lab Outing 2026"
export const titleFromFile = (file) =>
  file
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

// Merge data entries with the images found on disk.
// Listed photos keep their list order; unlisted images follow alphabetically.
export const buildPhotos = (entries, images) => {
  const listed = [];
  entries.forEach((entry) => {
    if (!images[entry.file]) {
      warn(`"${entry.file}" is listed in data/gallery.js but not found in assets/img/gallery/.`);
      return;
    }
    const date = parseDate(entry.date);
    if (entry.date && !date) {
      warn(`"${entry.file}" has an unrecognised date "${entry.date}". Use YYYY, YYYY-MM or YYYY-MM-DD.`);
    }
    listed.push({
      file: entry.file,
      src: images[entry.file],
      title: entry.title || titleFromFile(entry.file),
      date,
      dateLabel: formatDate(date),
      category: entry.category || null,
      description: entry.description || "",
      featured: Boolean(entry.featured),
    });
  });

  const listedFiles = new Set(listed.map((p) => p.file));
  const unlisted = Object.keys(images)
    .filter((file) => !listedFiles.has(file))
    .sort()
    .map((file) => ({
      file,
      src: images[file],
      title: titleFromFile(file),
      date: null,
      dateLabel: "",
      category: null,
      description: "",
      featured: false,
    }));

  return [...listed, ...unlisted];
};

export const getCategories = (photos) => {
  const categories = [...new Set(photos.map((p) => p.category).filter(Boolean))];
  return categories.length > 0 ? ["All", ...categories] : [];
};

// order: "newest" | "oldest" | "manual". Undated photos always go last.
// Photos with the same date keep their list order.
export const sortPhotos = (photos, order) => {
  if (order === "manual") return photos;
  const direction = order === "oldest" ? 1 : -1;
  return photos
    .map((photo, index) => ({ photo, index }))
    .sort((a, b) => {
      if (!a.photo.date || !b.photo.date) {
        if (a.photo.date) return -1;
        if (b.photo.date) return 1;
        return a.index - b.index;
      }
      return (a.photo.date.sortKey - b.photo.date.sortKey) * direction || a.index - b.index;
    })
    .map(({ photo }) => photo);
};

// groupBy: "year" | "month" | "none". Groups appear in the order of the photos given.
export const groupPhotos = (photos, groupBy) => {
  if (groupBy === "none") return [{ key: "all", label: null, photos }];

  const groups = new Map();
  photos.forEach((photo) => {
    let key = "undated";
    let label = "Undated";
    if (photo.date) {
      if (groupBy === "month" && photo.date.month) {
        key = `${photo.date.year}-${photo.date.month}`;
        label = `${MONTHS_LONG[photo.date.month - 1]} ${photo.date.year}`;
      } else {
        key = String(photo.date.year);
        label = String(photo.date.year);
      }
    }
    if (!groups.has(key)) groups.set(key, { key, label, photos: [] });
    groups.get(key).photos.push(photo);
  });

  // Keep "Undated" at the end even when sorting manually
  const result = [...groups.values()];
  const undated = result.findIndex((g) => g.key === "undated");
  if (undated !== -1) result.push(result.splice(undated, 1)[0]);
  return result;
};

// "2019 — 2026" for the page header
export const getYearSpan = (photos) => {
  const years = photos.filter((p) => p.date).map((p) => p.date.year);
  if (years.length === 0) return "";
  const min = Math.min(...years);
  const max = Math.max(...years);
  return min === max ? String(min) : `${min} — ${max}`;
};
