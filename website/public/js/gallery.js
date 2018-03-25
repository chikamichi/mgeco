var gallery =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = gallery_vendors_c4192c9318bfbf28c621;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(180);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
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
var baseFontSize = 16; // px
var gridSpacing = 24; // px
var gridMaxWidth = 1200; // px
var sidebarWidth = 275; // px
var mainAreaOffset = 3; // em
var nbImagesPerRow = 3;

// Reflects c-gallery__image's margin-bottom.
// @see website/static-src/css/components/_components.gallery.scss
var galleryThumbnailSpacing = exports.galleryThumbnailSpacing = 6; // px

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
var galleryWidth = gridMaxWidth - (sidebarWidth + 2 * gridSpacing / 2) - mainAreaOffset * baseFontSize;
var thumbnailWidth = (galleryWidth - (nbImagesPerRow - 1) * galleryThumbnailSpacing) / nbImagesPerRow;
var galleryThumbnailWidth = exports.galleryThumbnailWidth = Math.round(thumbnailWidth);

var galleryClass = exports.galleryClass = 'c-gallery';
var galleryCategoryClass = exports.galleryCategoryClass = 'c-gallery-category';
var galleryCategoryClassLoading = exports.galleryCategoryClassLoading = galleryCategoryClass + '--loading';
var galleryImageClass = exports.galleryImageClass = 'c-gallery__image';
var galleryImageClassLoading = exports.galleryImageClassLoading = galleryImageClass + '--loading';
var galleryImageClassLoaded = exports.galleryImageClassLoaded = galleryImageClass + '--loaded';

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _domtastic = __webpack_require__(1);

var _domtastic2 = _interopRequireDefault(_domtastic);

var _photoswipe = __webpack_require__(11);

var _photoswipe2 = _interopRequireDefault(_photoswipe);

var _photoswipeUiDefault = __webpack_require__(10);

var _photoswipeUiDefault2 = _interopRequireDefault(_photoswipeUiDefault);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// TODO: move to shared module
var galleryClass = 'c-gallery';
var galleryCategoryClass = 'c-gallery-category';
var galleryImageClass = 'c-gallery__image';
var galleryImageClassLoading = galleryImageClass + '--loading';
var galleryImageClassLoaded = galleryImageClass + '--loaded';

// Galleries manager.
//
// Merely a PhotoSwipe wrapper with support for multi-galleries.
// Adapted from http://photoswipe.com/documentation/getting-started.html.
// TODO: simplify, refactor using RxJS, ramda or something.

var Galleries = function () {
  function Galleries() {
    _classCallCheck(this, Galleries);

    this.galleryElements = [];
    this.galleryLayouts = [];
    this.galleryNextUUID = 0;
  }

  // @private
  // Create slide objects collection.


  _createClass(Galleries, [{
    key: 'normalizeImageAsItem',
    value: function normalizeImageAsItem(el) {
      var linkEl = el.children[0];
      var size = linkEl.attributes['data-size'].value.split('x');
      var item = {
        src: linkEl.attributes.href.value,
        w: parseInt(size[0], 10),
        h: parseInt(size[1], 10)
        // TODO: shitty code, adapt to my own use-case
      };if (el.children.length) {
        item.title = el.children[0].attributes.title.value;
      }
      if (linkEl.children.length > 0) {
        item.msrc = linkEl.children[0].attributes.src.value;
      }
      item.el = el; // save link to element for getThumbBoundsFn
      return item;
    }

    // @private
    // Parse slide data (url, title, size ...) from DOM elements.

  }, {
    key: 'parseThumbnailElements',
    value: function parseThumbnailElements(el) {
      var thumbElements = (0, _domtastic2.default)(el).find('.' + galleryImageClass);
      return thumbElements.map(this.normalizeImageAsItem);
    }

    // @private
    // Triggered upon user clicking a thumbnail. Opens PhotoSwipe instance.

  }, {
    key: 'onThumbnailsClick',
    value: function onThumbnailsClick(e) {
      e = e || window.event;
      e.preventDefault ? e.preventDefault() : e.returnValue = false;
      var eTarget = e.target || e.srcElement;
      var clickedImage = (0, _domtastic2.default)(eTarget).closest('.' + galleryImageClass);
      if (!clickedImage) return;
      // find index of clicked item by looping through all child nodes
      // alternatively, you may define index via data- attribute
      var clickedGallery = (0, _domtastic2.default)(eTarget).closest('.' + galleryCategoryClass);
      var images = clickedImage.siblings().concat(clickedImage);
      var numImages = images.length;
      // domtastic#indexOf hasn't qualified for production use just yet…
      // @see https://github.com/webpro/DOMtastic/issues/55
      var index = [].concat(_toConsumableArray(clickedImage[0].parentNode.children)).indexOf(clickedImage[0]);
      if (index >= 0 && index < numImages) this.openPhotoSwipe(index, clickedGallery[0]);
      return false;
    }

    // @private
    // Parse picture index and gallery index from URL (#&pid=1&gid=2).

  }, {
    key: 'photoswipeParseHash',
    value: function photoswipeParseHash() {
      var hash = window.location.hash.substring(1);
      var params = {};
      if (hash.length < 5) return params;
      var vars = hash.split('&');
      for (var i = 0; i < vars.length; i++) {
        if (!vars[i]) continue;
        var pair = vars[i].split('=');
        if (pair.length < 2) continue;
        params[pair[0]] = pair[1];
      }
      return params;
    }

    // @private
    // Open a registered PhotoSwipe instance.

  }, {
    key: 'openPhotoSwipe',
    value: function openPhotoSwipe(index, galleryElement, disableAnimation, fromURL) {
      var pswpElement = (0, _domtastic2.default)('.pswp')[0];
      var items = this.parseThumbnailElements(galleryElement);
      var uuid = galleryElement.attributes['data-pswp-uid'].value;

      // define options (if needed)
      var options = {
        // define gallery index (for URL)
        galleryUID: uuid,
        getThumbBoundsFn: function getThumbBoundsFn(index) {
          // See Options -> getThumbBoundsFn section of documentation for more info
          // TODO: use domtastic here
          var thumbnail = items[index].el.getElementsByTagName('img')[0]; // find thumbnail
          var pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
          var rect = thumbnail.getBoundingClientRect();
          return {
            x: rect.left,
            y: rect.top + pageYScroll,
            w: rect.width
          };
        }

        // PhotoSwipe opened from URL
      };if (fromURL) {
        if (options.galleryPIDs) {
          // parse real index when custom PIDs are used
          // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
          for (var j = 0; j < items.length; j++) {
            if (items[j].pid == index) {
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
      if (isNaN(options.index)) return;
      if (disableAnimation) options.showAnimationDuration = 0;

      // Pass data to PhotoSwipe and initialize it
      var gallery = new _photoswipe2.default(pswpElement, _photoswipeUiDefault2.default, items, options);
      gallery.init();
    }

    // @private
    // Parse URL and open gallery if it matches #&pid=3&gid=1.

  }, {
    key: 'initPhotoSwipeFromHash',
    value: function initPhotoSwipeFromHash() {
      var hashData = this.photoswipeParseHash();
      if (hashData.pid && hashData.gid) {
        var gid = parseInt(hashData.gid, 10);
        this.openPhotoSwipe(hashData.pid, this.galleryElements[gid], true, true);
      }
    }

    // @private
    // Register a new PhotoSwipe instance bound to a specific selector.

  }, {
    key: 'initPhotoSwipeFromDOM',
    value: function initPhotoSwipeFromDOM(gallerySelector, galleryLayout) {
      this.galleryElements.push(gallerySelector);
      this.galleryLayouts.push(galleryLayout);
      gallerySelector.setAttribute('data-pswp-uid', this.galleryNextUUID++);
      gallerySelector.onclick = this.onThumbnailsClick.bind(this);
    }

    // @public
    // TODO: remove eventually (still used in index.js)

  }, {
    key: 'closest',
    value: function closest(el, fn) {
      return el && (fn(el) ? el : this.closest(el.parentNode, fn));
    }

    // @public
    // @param [Node] gallerySelector - a native DOM node
    // @param [Node] galleryLayout - wrapped selector, eg. Masonry wrapper
    // TODO: support adding multiple galleries at once, something like
    // [...gallerySelector].map(this.initPhotoSwipeFromDOM)

  }, {
    key: 'add',
    value: function add(gallerySelector, galleryLayout) {
      this.initPhotoSwipeFromDOM(gallerySelector, galleryLayout);
    }

    // @public

  }, {
    key: 'openFromUrl',
    value: function openFromUrl(gid) {
      this.initPhotoSwipeFromHash();
    }
  }, {
    key: 'map',
    value: function map(fn) {
      var _this = this;

      this.galleryElements.map(function (el, i) {
        return fn(_this.galleryElements[i], _this.galleryLayouts[i]);
      });
    }
  }]);

  return Galleries;
}();

exports.default = Galleries;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(185);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(187);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(194);

/***/ }),
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _domtastic = __webpack_require__(1);

var _domtastic2 = _interopRequireDefault(_domtastic);

var _Rx = __webpack_require__(6);

var _Rx2 = _interopRequireDefault(_Rx);

var _masonryLayout = __webpack_require__(5);

var _masonryLayout2 = _interopRequireDefault(_masonryLayout);

var _imagesloaded = __webpack_require__(4);

var _imagesloaded2 = _interopRequireDefault(_imagesloaded);

var _galleries = __webpack_require__(3);

var _galleries2 = _interopRequireDefault(_galleries);

var _settings = __webpack_require__(2);

var S = _interopRequireWildcard(_settings);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var galleries = new _galleries2.default();

// Reveals an image (which is expected to be fully loaded) within the specified
// gallery, and update that gallery's layout.
function revealImage(image, galleryCategory) {
  var imageEl = galleries.closest(image.img, function (el) {
    return el.classList && el.classList.contains(S.galleryImageClass);
  });
  imageEl.classList.remove(S.galleryImageClassLoading);
  imageEl.classList.add(S.galleryImageClassLoaded);
  galleryCategory.classList.remove(S.galleryCategoryClassLoading);
}

// Each gallery category acts as an independent "gallery" on its own: its images
// are loaded then displayed in a Masonry layout handled as a PhotoSwipe
// instance.
// TODO: tweak PhotoSwipe instances to display link to prev/next gallery category.
function loadGalleryCategoryImages(galleryCategoryImages) {
  var relatedCategoryCheck = function relatedCategoryCheck(el) {
    return el.classList && el.classList.contains(S.galleryCategoryClass);
  };
  var galleryCategory = galleries.closest(galleryCategoryImages, relatedCategoryCheck);

  galleryCategory.classList.add(S.galleryCategoryClassLoading);

  // Let's create a Masonry layout for the gallery's images.
  var gallery = new _masonryLayout2.default(galleryCategoryImages, {
    itemSelector: '.c-gallery__image',
    columnWidth: S.galleryThumbnailWidth,
    gutter: S.galleryThumbnailSpacing
  });

  // Schedule re-rendering upon window's dimensions changing but with a slight
  // delay to accomodate for Masonry's own re-rendering (which fails, that's
  // why we're enforcing our own ^^).
  (0, _domtastic2.default)(window).on('resize', function () {
    window.setTimeout(gallery.layout.bind(gallery), 1000);
  });

  // Masonry's layout is set. Let's display images placeholders aka. "loading"
  // boxes.
  var images = gallery.element.querySelectorAll('.' + S.galleryImageClass);
  images.forEach(function (image) {
    image.classList.add(S.galleryImageClassLoading);
  });

  // Time to setup our PhotoSwipe instance.
  galleries.add(galleryCategory, gallery);

  // Start loading and revealing gallery's images.
  var imgLoad = (0, _imagesloaded2.default)(galleryCategoryImages);
  imgLoad.on('progress', function (instance, image) {
    revealImage(image, galleryCategory);
  });

  // ImagesLoaded exposes weirdos jQuery.Deferred objects.
  // As we're mostly interested in the "done" event anyway, let's wrap in an
  // Rx.Observable to notify about the loading completion.
  return _Rx2.default.Observable.fromEvent(imgLoad, 'done').take(1);
}

// Load first gallery eagerly, then lazy-schedule the remaining ones.
var $galleryCategoriesImages = (0, _domtastic2.default)('.' + S.galleryCategoryClass + '__images');
var categories = Array.from($galleryCategoriesImages);
loadGalleryCategoryImages(categories.shift()).subscribe(function () {},
// TODO: handle errors?
function (err) {
  return console.log;
}, function () {
  var loadingRemaining = categories.map(loadGalleryCategoryImages);
  _Rx2.default.Observable.forkJoin(loadingRemaining).subscribe(function () {},
  // TODO: handle errors?
  function (err) {
    return console.log;
  }, function () {
    galleries.map(function (galleryEl, galleryLayout) {
      window.setTimeout(function () {
        return galleryLayout.layout.bind(galleryLayout);
      }, 0);
    });
    galleries.openFromUrl();
  });
});

/***/ }),
/* 9 */,
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(190);

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(191);

/***/ })
/******/ ]);