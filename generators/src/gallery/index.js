import Rx from 'rxjs/Rx';
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';
import PhotoSwipe from 'photoswipe';
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const galleryClass = 'c-gallery'
const $gallery = $(`.${galleryClass}`);
const galleryCategoryClass = 'c-gallery-category'
const $galleryCategoriesImages = $$(`.${galleryCategoryClass}__images`);
const galleryImageClass = 'c-gallery__image'
const galleryImageClassLoading = `${galleryImageClass}--loading`
const galleryImageClassLoaded = `${galleryImageClass}--loaded`
const $galleryImages = $$(`.${galleryImageClass}`);

function closest(el, fn) {
  return el && ( fn(el) ? el : closest(el.parentNode, fn) );
};

// Reveals an image (which is expected to be fully loaded) within the specified
// gallery, and update that gallery's layout.
function revealImage(image, gallery) {
  const imageEl = closest(image.img, function(el) {
    return (el.classList && el.classList.contains(galleryImageClass));
  });
  gallery.appended(image);
  // gallery.layout();
  imageEl.classList.remove(galleryImageClassLoading);
  imageEl.classList.add(galleryImageClassLoaded);
}

// Each gallery category acts as an independent "gallery" on its own: its images
// are loaded then displayed in a Masonry layout handled as a PhotoSwipe
// instance.
// TODO: tweak PhotoSwipe instances to display link to prev/next gallery category.
// @param [Masonry] galleryCategoryImages - a Masonry instance
function loadGalleryCategoryImages(galleryCategoryImages) {
  const gallery = new Masonry(galleryCategoryImages, {
    itemSelector: 'a',
    columnWidth: 276
  })

  const relatedCategoryCheck = (el) => el.classList && el.classList.contains(galleryCategoryClass)
  const galleryCategory = closest(galleryCategoryImages, relatedCategoryCheck)

  // Start loading and tracking gallery's images, and laying them out.
  // Images are hidden at first, and will be revealed when all images are fully
  // loaded, so that the PhotoSwipe instance has everything gathered up before
  // spawning itself (otherwise one may click on an image and just be redirected
  // to the image itself instead of seeing the gallery).
  const imgLoad = imagesLoaded(galleryCategoryImages)

  // Upon the gallery category's full images set being loaded, start revealing
  // them all in a nice, smooth effect.
  imgLoad.on('done', function(instance) {
    const images$ = Rx.Observable.from(instance.images);
    const timing$ = Rx.Observable.interval(100);
    const stream$ = images$.zip(timing$, function(a, b) { return a; });
    stream$.subscribe(
      (image) => revealImage(image, gallery)
    )
  })

  // TODO: Create the observable below without take(1), subscribe the code above
  // then return .take(1)
  // ImagesLoaded exposes weirdos jQuery.Deferred objects.
  // As we're mostly interested in the "done" event anyway, let's wrap in an
  // Rx.Observable to notify about the loading completion.
  return Rx.Observable.fromEvent(imgLoad, 'done').take(1)
}

const initPhotoSwipeFromDOM = function(gallerySelector) {
  // parse slide data (url, title, size ...) from DOM elements
  // (children of gallerySelector)
  var parseThumbnailElements = function(el) {
      var thumbElements = el.childNodes,
          numNodes = thumbElements.length,
          items = [],
          figureEl,
          linkEl,
          size,
          item;

      for(var i = 0; i < numNodes; i++) {

          figureEl = thumbElements[i]; // <figure> element

          // include only element nodes
          if(figureEl.nodeType !== 1) {
              continue;
          }

          linkEl = figureEl.children[0]; // <a> element

          size = linkEl.getAttribute('data-size').split('x');

          // create slide object
          item = {
              src: linkEl.getAttribute('href'),
              w: parseInt(size[0], 10),
              h: parseInt(size[1], 10)
          };


          // TODO: shitty code, adapt to my own use-case
          if(figureEl.children.length) {
              // <figcaption> content
              item.title = figureEl.children[0].getAttribute('title');
          }

          if(linkEl.children.length > 0) {
              // <img> thumbnail element, retrieving thumbnail url
              item.msrc = linkEl.children[0].getAttribute('src');
          }

          item.el = figureEl; // save link to element for getThumbBoundsFn
          items.push(item);
      }

      return items;
  };

  // triggers when user clicks on thumbnail
  var onThumbnailsClick = function(e) {
      e = e || window.event;
      e.preventDefault ? e.preventDefault() : e.returnValue = false;

      var eTarget = e.target || e.srcElement;

      // find root element of slide
      var clickedListItem = closest(eTarget, function(el) {
          return (el.classList && el.classList.contains(galleryImageClass));
      });

      if(!clickedListItem) {
          return;
      }

      // find index of clicked item by looping through all child nodes
      // alternatively, you may define index via data- attribute
      var clickedGallery = clickedListItem.parentNode,
          childNodes = clickedListItem.parentNode.childNodes,
          numChildNodes = childNodes.length,
          nodeIndex = 0,
          index;

      for (var i = 0; i < numChildNodes; i++) {
          if(childNodes[i].nodeType !== 1) {
              continue;
          }

          if(childNodes[i] === clickedListItem) {
              index = nodeIndex;
              break;
          }
          nodeIndex++;
      }

      if(index >= 0) {
          // open PhotoSwipe if valid index found
          openPhotoSwipe( index, clickedGallery );
      }
      return false;
  };

  // parse picture index and gallery index from URL (#&pid=1&gid=2)
  var photoswipeParseHash = function() {
      var hash = window.location.hash.substring(1),
      params = {};

      if(hash.length < 5) {
          return params;
      }

      var vars = hash.split('&');
      for (var i = 0; i < vars.length; i++) {
          if(!vars[i]) {
              continue;
          }
          var pair = vars[i].split('=');
          if(pair.length < 2) {
              continue;
          }
          params[pair[0]] = pair[1];
      }

      if(params.gid) {
          params.gid = parseInt(params.gid, 10);
      }

      return params;
  };

  var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
      var pswpElement = document.querySelectorAll('.pswp')[0],
          gallery,
          options,
          items;

      items = parseThumbnailElements(galleryElement);

      // define options (if needed)
      options = {

          // define gallery index (for URL)
          galleryUID: galleryElement.getAttribute('data-pswp-uid'),

          getThumbBoundsFn: function(index) {
              // See Options -> getThumbBoundsFn section of documentation for more info
              var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                  pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                  rect = thumbnail.getBoundingClientRect();

              return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
          }

      };

      // PhotoSwipe opened from URL
      if(fromURL) {
          if(options.galleryPIDs) {
              // parse real index when custom PIDs are used
              // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
              for(var j = 0; j < items.length; j++) {
                  if(items[j].pid == index) {
                      options.index = j;
                      break;
                  }
              }
          } else {
              // in URL indexes start from 1
              options.index = parseInt(index, 10) - 1;
          }
      } else {
          options.index = parseInt(index, 10);
      }

      // exit if index not found
      if( isNaN(options.index) ) {
          return;
      }

      if(disableAnimation) {
          options.showAnimationDuration = 0;
      }

      // Pass data to PhotoSwipe and initialize it
      gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
      gallery.init();
  };

  // loop through all gallery elements and bind events
  var galleryElements = document.querySelectorAll(gallerySelector);

  for(var i = 0, l = galleryElements.length; i < l; i++) {
      galleryElements[i].setAttribute('data-pswp-uid', i+1);
      galleryElements[i].onclick = onThumbnailsClick;
  }

  // Parse URL and open gallery if it contains #&pid=3&gid=1
  var hashData = photoswipeParseHash();
  if(hashData.pid && hashData.gid) {
      openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
  }
};

const loading = Array.from($galleryCategoriesImages).map(loadGalleryCategoryImages);
const loadingObserver$ = Rx.Observable.forkJoin(...loading)
window.ps = initPhotoSwipeFromDOM
loadingObserver$.subscribe(
  () => {},
  // TODO: handle errors?
  (err) => console.log,
  () => {
    initPhotoSwipeFromDOM(`.${galleryClass}`);
  }
);
