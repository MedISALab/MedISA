// ─────────────────────────────────────────────────────────────
//  Gallery content
// ─────────────────────────────────────────────────────────────
// 1. Put photos in src/assets/img/gallery/ (jpg, png, webp or gif).
//    Every image in that folder appears on the page automatically.
// 2. Optionally describe a photo below, using its exact file name.
//
// Photo fields (only `file` is required):
//   file        "miccai-2026.jpg"
//   title       Shown on the card and in the viewer.
//               Defaults to the file name ("lab-outing.jpg" -> "Lab Outing").
//   date        "2026", "2026-10" or "2026-10-12". Used for sorting and grouping.
//   category    Any label, e.g. "Conferences", "Talks", "Lab Life".
//               A filter button is created for each category used.
//   description Longer text shown in the full-screen viewer.
//   featured    true -> shown as a larger tile.
//
// Photos without a date are placed after dated ones, under "Undated".

export const galleryConfig = {
  // "newest" | "oldest" -> sort by date
  // "manual"            -> keep the order of the list below
  order: "newest",

  // "year" | "month" -> show photos in dated sections
  // "none"           -> one continuous grid
  groupBy: "year",

  // Let visitors switch between newest-first and oldest-first.
  // Ignored when order is "manual".
  allowVisitorSort: true,
};

export const gallery = [
  /*
  {
    file: "miccai-2026.jpg",
    title: "Presenting SAFE-Diff at MICCAI 2026",
    date: "2026-10-08",
    category: "Conferences",
    description: "Sneha and Nivedita presenting our work on anatomically faithful CT super-resolution.",
    featured: true,
  },
  {
    file: "lab-outing.jpg",
    title: "Lab outing",
    date: "2026-08",
    category: "Lab Life",
  },
  */
 {
    file: "2026 M.Tech Graduates.jpg",
    title: "Convocation Ceremony 2026",
    date: "2026-06-06",
    category: "Convocation",
    description: "Our M. Tech graduates 2026 Batch",
    featured: true,
  },
  {
    file: "Dinner_Apr_2026.jpg",
    title: "Lab Group Dinner",
    date: "",
    category: "Outing",
    description: "-",
    featured: true,
  },
];
