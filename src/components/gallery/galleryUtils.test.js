import {
  buildPhotos,
  formatDate,
  getCategories,
  getYearSpan,
  groupPhotos,
  parseDate,
  sortPhotos,
  titleFromFile,
} from "./galleryUtils";

const images = {
  "a.jpg": "a-src",
  "b.jpg": "b-src",
  "c.jpg": "c-src",
  "d.jpg": "d-src",
  "zz-unlisted_photo.png": "z-src",
};

const entries = [
  { file: "a.jpg", date: "2024-05", category: "Talks" },
  { file: "b.jpg", date: "2026-10-12", category: "Conferences" },
  { file: "c.jpg" },
  { file: "d.jpg", date: "2024-05" },
];

const files = (photos) => photos.map((p) => p.file);

beforeEach(() => jest.spyOn(console, "warn").mockImplementation(() => {}));
afterEach(() => console.warn.mockRestore());

describe("parseDate / formatDate", () => {
  test("accepts year, month and day precision", () => {
    expect(formatDate(parseDate("2026"))).toBe("2026");
    expect(formatDate(parseDate("2026-10"))).toBe("Oct 2026");
    expect(formatDate(parseDate("2026-10-12"))).toBe("12 Oct 2026");
  });

  test("rejects invalid dates", () => {
    expect(parseDate("Oct 2026")).toBeNull();
    expect(parseDate("2026-13")).toBeNull();
    expect(parseDate("")).toBeNull();
  });
});

test("titleFromFile turns file names into titles", () => {
  expect(titleFromFile("lab-outing_2026.jpg")).toBe("Lab Outing 2026");
});

describe("buildPhotos", () => {
  test("keeps list order, then adds unlisted images alphabetically", () => {
    const photos = buildPhotos(entries, images);
    expect(files(photos)).toEqual(["a.jpg", "b.jpg", "c.jpg", "d.jpg", "zz-unlisted_photo.png"]);
    expect(photos[4].title).toBe("Zz Unlisted Photo");
  });

  test("skips entries whose image is missing and warns", () => {
    const photos = buildPhotos([{ file: "missing.jpg" }], {});
    expect(photos).toEqual([]);
    expect(console.warn).toHaveBeenCalled();
  });
});

describe("sortPhotos", () => {
  const photos = buildPhotos(entries, images);

  test("newest first, ties keep list order, undated last", () => {
    expect(files(sortPhotos(photos, "newest"))).toEqual([
      "b.jpg", "a.jpg", "d.jpg", "c.jpg", "zz-unlisted_photo.png",
    ]);
  });

  test("oldest first", () => {
    expect(files(sortPhotos(photos, "oldest"))).toEqual([
      "a.jpg", "d.jpg", "b.jpg", "c.jpg", "zz-unlisted_photo.png",
    ]);
  });

  test("manual keeps the list order", () => {
    expect(files(sortPhotos(photos, "manual"))).toEqual(files(photos));
  });
});

describe("groupPhotos", () => {
  const photos = sortPhotos(buildPhotos(entries, images), "newest");

  test("groups by year with Undated last", () => {
    const groups = groupPhotos(photos, "year");
    expect(groups.map((g) => g.label)).toEqual(["2026", "2024", "Undated"]);
    expect(files(groups[1].photos)).toEqual(["a.jpg", "d.jpg"]);
  });

  test("groups by month", () => {
    const groups = groupPhotos(photos, "month");
    expect(groups.map((g) => g.label)).toEqual(["October 2026", "May 2024", "Undated"]);
  });

  test("none returns a single unlabeled group", () => {
    const groups = groupPhotos(photos, "none");
    expect(groups).toHaveLength(1);
    expect(groups[0].label).toBeNull();
  });
});

test("getCategories and getYearSpan", () => {
  const photos = buildPhotos(entries, images);
  expect(getCategories(photos)).toEqual(["All", "Talks", "Conferences"]);
  expect(getYearSpan(photos)).toBe("2024 — 2026");
  expect(getCategories([])).toEqual([]);
});
