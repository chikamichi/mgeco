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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = gallery_vendors_c4192c9318bfbf28c621;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _domtastic = __webpack_require__(8);

var _domtastic2 = _interopRequireDefault(_domtastic);

var _photoswipe = __webpack_require__(10);

var _photoswipe2 = _interopRequireDefault(_photoswipe);

var _photoswipeUiDefault = __webpack_require__(9);

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
  }, {
    key: 'onThumbnailsClick',


    // @private
    // Triggered upon user clicking a thumbnail. Opens PhotoSwipe instance.
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
  }, {
    key: 'openPhotoSwipe',


    // @private
    // Open a registered PhotoSwipe instance.
    value: function openPhotoSwipe(index, galleryElement, disableAnimation, fromURL) {
      // galleryElement = galleryElement[0]
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
  }, {
    key: 'initPhotoSwipeFromHash',


    // @private
    // Parse URL and open gallery if it matches #&pid=3&gid=1.
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
    value: function initPhotoSwipeFromDOM(gallerySelector) {
      this.galleryElements.push(gallerySelector);
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
    // TODO: support adding multiple galleries at once, something like
    // [...gallerySelector].map(this.initPhotoSwipeFromDOM)

  }, {
    key: 'add',
    value: function add(gallerySelector) {
      this.initPhotoSwipeFromDOM(gallerySelector);
    }

    // @public

  }, {
    key: 'openFromUrl',
    value: function openFromUrl(gid) {
      this.initPhotoSwipeFromHash();
    }
  }]);

  return Galleries;
}();

exports.default = Galleries;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(185);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(187);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(194);

/***/ }),
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Rx = __webpack_require__(4);

var _Rx2 = _interopRequireDefault(_Rx);

var _masonryLayout = __webpack_require__(3);

var _masonryLayout2 = _interopRequireDefault(_masonryLayout);

var _imagesloaded = __webpack_require__(2);

var _imagesloaded2 = _interopRequireDefault(_imagesloaded);

var _galleries = __webpack_require__(1);

var _galleries2 = _interopRequireDefault(_galleries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: use newly installed domtastic instead
var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

// TODO: move to shared module
var galleryClass = 'c-gallery';
var $gallery = $('.' + galleryClass);
var galleryCategoryClass = 'c-gallery-category';
var $galleryCategoriesImages = $$('.' + galleryCategoryClass + '__images');
var galleryImageClass = 'c-gallery__image';
var galleryImageClassLoading = galleryImageClass + '--loading';
var galleryImageClassLoaded = galleryImageClass + '--loaded';
var $galleryImages = $$('.' + galleryImageClass);

var galleries = new _galleries2.default();

// Reveals an image (which is expected to be fully loaded) within the specified
// gallery, and update that gallery's layout.
function revealImage(image, gallery) {
  var imageEl = galleries.closest(image.img, function (el) {
    return el.classList && el.classList.contains(galleryImageClass);
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
  var relatedCategoryCheck = function relatedCategoryCheck(el) {
    return el.classList && el.classList.contains(galleryCategoryClass);
  };
  var galleryCategory = galleries.closest(galleryCategoryImages, relatedCategoryCheck);

  // Let's create a Masonry layout for the gallery's images.
  var gallery = new _masonryLayout2.default(galleryCategoryImages, {
    itemSelector: 'a',
    columnWidth: 276
  });

  // Masonry's layout is set. Let's display images placeholders aka. "loading"
  // boxes.
  var images = gallery.element.querySelectorAll('.' + galleryImageClass);
  images.forEach(function (image) {
    image.classList.add(galleryImageClassLoading);
  });

  // Time to setup our PhotoSwipe instance.
  galleries.add(galleryCategory);

  // Start loading and revealing gallery's images.
  var imgLoad = (0, _imagesloaded2.default)(galleryCategoryImages);
  imgLoad.on('progress', function (instance, image) {
    revealImage(image, gallery);
  });

  // ImagesLoaded exposes weirdos jQuery.Deferred objects.
  // As we're mostly interested in the "done" event anyway, let's wrap in an
  // Rx.Observable to notify about the loading completion.
  return _Rx2.default.Observable.fromEvent(imgLoad, 'done').take(1);
}

// Load first gallery eagerly, then lazy-schedule the remaining ones.
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
    galleries.openFromUrl();
  });
});

/***/ }),
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(180);

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(190);

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(191);

/***/ })
/******/ ]);