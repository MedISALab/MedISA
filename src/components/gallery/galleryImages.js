// Every image in src/assets/img/gallery/, keyed by file name.
const context = require.context("../../assets/img/gallery", false, /\.(jpe?g|png|webp|gif)$/i);

export const galleryImages = context.keys().reduce((acc, key) => {
  acc[key.replace("./", "")] = context(key);
  return acc;
}, {});
