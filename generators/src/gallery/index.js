import $ from 'domtastic'
import Rx from 'rxjs/Rx'
import Masonry from 'masonry-layout'
import imagesLoaded from 'imagesloaded'
import Galleries from './galleries.js'
import * as S from '../_utils/settings'

const galleries = new Galleries()

// Reveals an image (which is expected to be fully loaded) within the specified
// gallery, and update that gallery's layout.
function revealImage(image, galleryCategory) {
  const imageEl = galleries.closest(image.img, (el) => {
    return (el.classList && el.classList.contains(S.galleryImageClass))
  })
  imageEl.classList.remove(S.galleryImageClassLoading)
  imageEl.classList.add(S.galleryImageClassLoaded)
  galleryCategory.classList.remove(S.galleryCategoryClassLoading)
}

// Each gallery category acts as an independent "gallery" on its own: its images
// are loaded then displayed in a Masonry layout handled as a PhotoSwipe
// instance.
// TODO: tweak PhotoSwipe instances to display link to prev/next gallery category.
function loadGalleryCategoryImages(galleryCategoryImages) {
  const relatedCategoryCheck = (el) => el.classList && el.classList.contains(S.galleryCategoryClass)
  const galleryCategory = galleries.closest(galleryCategoryImages, relatedCategoryCheck)

  galleryCategory.classList.add(S.galleryCategoryClassLoading)

  // Let's create a Masonry layout for the gallery's images.
  const gallery = new Masonry(galleryCategoryImages, {
    itemSelector: '.c-gallery__image',
    columnWidth: S.galleryThumbnailWidth,
    gutter: S.galleryThumbnailSpacing
  })

  // Schedule re-rendering upon window's dimensions changing but with a slight
  // delay to accomodate for Masonry's own re-rendering (which fails, that's
  // why we're enforcing our own ^^).
  $(window).on('resize', () => {
    window.setTimeout(gallery.layout.bind(gallery), 1000)
  })

  // Masonry's layout is set. Let's display images placeholders aka. "loading"
  // boxes.
  const images = gallery.element.querySelectorAll(`.${S.galleryImageClass}`)
  images.forEach((image) => {
    image.classList.add(S.galleryImageClassLoading)
  })

  // Time to setup our PhotoSwipe instance.
  galleries.add(galleryCategory, gallery)

  // Start loading and revealing gallery's images.
  const imgLoad = imagesLoaded(galleryCategoryImages)
  imgLoad.on('progress', (instance, image) => {
    revealImage(image, galleryCategory)
  })

  // ImagesLoaded exposes weirdos jQuery.Deferred objects.
  // As we're mostly interested in the "done" event anyway, let's wrap in an
  // Rx.Observable to notify about the loading completion.
  return Rx.Observable.fromEvent(imgLoad, 'done').take(1)
}

// Load first gallery eagerly, then lazy-schedule the remaining ones.
const $galleryCategoriesImages = $(`.${S.galleryCategoryClass}__images`)
const categories = Array.from($galleryCategoriesImages)
loadGalleryCategoryImages(categories.shift()).subscribe(
  () => {},
  // TODO: handle errors?
  (err) => console.log,
  () => {
    const loadingRemaining = categories.map(loadGalleryCategoryImages)
    Rx.Observable.forkJoin(loadingRemaining).subscribe(
      () => {},
      // TODO: handle errors?
      (err) => console.log,
      () => {
        galleries.map((galleryEl, galleryLayout) => {
          window.setTimeout(() => galleryLayout.layout.bind(galleryLayout), 0)
        })
        galleries.openFromUrl()
      }
    )
  }
)
