// Replicate CSS' values below before generating images and documents.
// TODO: extract values out from Sass' config.
// main issue with doing that is the galleryThumbnailWidth value is used by
// images/generator (node-rendered) but also by gallery/index.js (client-side)
// which is not going to work (no fancy sass-loader on the client side, sass
// files are no more!).
// Basically it means gallery/index.js should be *generated* from a template,
// with ${Css.galleryThumbnailWidth} transpiled/hard-coded into it, then we
// would let Webpack use it as an entry and perform its usual business of deps
// resolution & tree building to output gallery.js as expected, but with the
// hard-coded value.
const baseFontSize = 16 // px
const gridSpacing = 24 // px
const gridMaxWidth = 1200 // px
const sidebarWidth = 275 // px
const mainAreaOffset = 3 // em
const nbImagesPerRow = 3

// Reflects c-gallery__image's margin-bottom.
// @see website/static-src/css/components/_components.gallery.scss
export const galleryThumbnailSpacing = 6 // px

// Thumbnails' spacing value is constrained by the base font size and grid's
// layout & spacing. An example:
// - Site has a max-width of 1200px & sidebar is 275px + 2*$spacing/2 wide
//   ($spacing is inuitcss' grid spacing, ie. defaults to 24px).
// - Therefore the main area is 901px wide.
// - The main area has an em-based offset, converted in px through the base font
//   size. Let's say 3em == 48px.
// - Leaving N == 901 - 48 = 853 px for the gallery thumbnails to fit within.
// - Aiming at, say, X = 3 images per row, with an internal spacing of Y = 6 px
//   between thumbnails, that makes for (N - (X-1)*Y) / X = 280 px thumbnails
const galleryWidth = (gridMaxWidth - (sidebarWidth + 2 * gridSpacing/2)) - mainAreaOffset*baseFontSize
const thumbnailWidth = (galleryWidth - (nbImagesPerRow-1)*galleryThumbnailSpacing) / nbImagesPerRow
export const galleryThumbnailWidth = Math.round(thumbnailWidth)

export const galleryClass = 'c-gallery'
export const galleryCategoryClass = 'c-gallery-category'
export const galleryImageClass = 'c-gallery__image'
export const galleryImageClassLoading = `${galleryImageClass}--loading`
export const galleryImageClassLoaded = `${galleryImageClass}--loaded`
