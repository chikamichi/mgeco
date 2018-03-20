import Rx from 'rxjs/Rx';
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';
import Galleries from './galleries.js'

// TODO: use newly installed domtastic instead
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// TODO: move to shared module
const galleryClass = 'c-gallery'
const $gallery = $(`.${galleryClass}`);
const galleryCategoryClass = 'c-gallery-category'
const $galleryCategoriesImages = $$(`.${galleryCategoryClass}__images`);
const galleryImageClass = 'c-gallery__image'
const galleryImageClassLoading = `${galleryImageClass}--loading`
const galleryImageClassLoaded = `${galleryImageClass}--loaded`
const $galleryImages = $$(`.${galleryImageClass}`);

const galleries = new Galleries()

// Reveals an image (which is expected to be fully loaded) within the specified
// gallery, and update that gallery's layout.
function revealImage(image, gallery) {
  const imageEl = galleries.closest(image.img, function(el) {
    return (el.classList && el.classList.contains(galleryImageClass));
  });
  gallery.appended(image);
  imageEl.classList.remove(galleryImageClassLoading);
  imageEl.classList.add(galleryImageClassLoaded);
}

// Each gallery category acts as an independent "gallery" on its own: its images
// are loaded then displayed in a Masonry layout handled as a PhotoSwipe
// instance.
// TODO: tweak PhotoSwipe instances to display link to prev/next gallery category.
function loadGalleryCategoryImages(galleryCategoryImages) {
  const relatedCategoryCheck = (el) => el.classList && el.classList.contains(galleryCategoryClass)
  const galleryCategory = galleries.closest(galleryCategoryImages, relatedCategoryCheck)

  // Let's create a Masonry layout for the gallery's images.
  const gallery = new Masonry(galleryCategoryImages, {
    itemSelector: 'a',
    columnWidth: 276
  })

  // Masonry's layout is set. Let's display images placeholders aka. "loading"
  // boxes.
  const images = gallery.element.querySelectorAll(`.${galleryImageClass}`)
  images.forEach((image) => {
    image.classList.add(galleryImageClassLoading)
  })

  // Time to setup our PhotoSwipe instance.
  galleries.add(galleryCategory);

  // Start loading and revealing gallery's images.
  const imgLoad = imagesLoaded(galleryCategoryImages)
  imgLoad.on('progress', function(instance, image) {
    revealImage(image, gallery)
  })

  // ImagesLoaded exposes weirdos jQuery.Deferred objects.
  // As we're mostly interested in the "done" event anyway, let's wrap in an
  // Rx.Observable to notify about the loading completion.
  return Rx.Observable.fromEvent(imgLoad, 'done').take(1)
}

// Load first gallery eagerly, then lazy-schedule the remaining ones.
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
        galleries.openFromUrl()
      }
    )
  }
);