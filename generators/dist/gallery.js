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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = gallery_vendors_f37a132da04408f09efb;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(165);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(167);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(170);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(171);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(174);

/***/ }),
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Rx$Observable;

var _Rx = __webpack_require__(5);

var _Rx2 = _interopRequireDefault(_Rx);

var _masonryLayout = __webpack_require__(2);

var _masonryLayout2 = _interopRequireDefault(_masonryLayout);

var _imagesloaded = __webpack_require__(1);

var _imagesloaded2 = _interopRequireDefault(_imagesloaded);

var _photoswipe = __webpack_require__(4);

var _photoswipe2 = _interopRequireDefault(_photoswipe);

var _photoswipeUiDefault = __webpack_require__(3);

var _photoswipeUiDefault2 = _interopRequireDefault(_photoswipeUiDefault);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

var galleryClass = 'c-gallery';
var $gallery = $('.' + galleryClass);
var galleryCategoryClass = 'c-gallery-category';
var $galleryCategoriesImages = $$('.' + galleryCategoryClass + '__images');
var galleryImageClass = 'c-gallery__image';
var galleryImageClassLoading = galleryImageClass + '--loading';
var galleryImageClassLoaded = galleryImageClass + '--loaded';
var $galleryImages = $$('.' + galleryImageClass);

function closest(el, fn) {
    return el && (fn(el) ? el : closest(el.parentNode, fn));
};

// Reveals an image (which is expected to be fully loaded) within the specified
// gallery, and update that gallery's layout.
function revealImage(image, gallery) {
    var imageEl = closest(image.img, function (el) {
        return el.classList && el.classList.contains(galleryImageClass);
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
    var gallery = new _masonryLayout2.default(galleryCategoryImages, {
        itemSelector: 'a',
        columnWidth: 276
    });

    var relatedCategoryCheck = function relatedCategoryCheck(el) {
        return el.classList && el.classList.contains(galleryCategoryClass);
    };
    var galleryCategory = closest(galleryCategoryImages, relatedCategoryCheck);

    // Start loading and tracking gallery's images, and laying them out.
    // Images are hidden at first, and will be revealed when all images are fully
    // loaded, so that the PhotoSwipe instance has everything gathered up before
    // spawning itself (otherwise one may click on an image and just be redirected
    // to the image itself instead of seeing the gallery).
    var imgLoad = (0, _imagesloaded2.default)(galleryCategoryImages);

    // Upon the gallery category's full images set being loaded, start revealing
    // them all in a nice, smooth effect.
    imgLoad.on('done', function (instance) {
        var images$ = _Rx2.default.Observable.from(instance.images);
        var timing$ = _Rx2.default.Observable.interval(100);
        var stream$ = images$.zip(timing$, function (a, b) {
            return a;
        });
        stream$.subscribe(function (image) {
            return revealImage(image, gallery);
        });
    });

    // TODO: Create the observable below without take(1), subscribe the code above
    // then return .take(1)
    // ImagesLoaded exposes weirdos jQuery.Deferred objects.
    // As we're mostly interested in the "done" event anyway, let's wrap in an
    // Rx.Observable to notify about the loading completion.
    return _Rx2.default.Observable.fromEvent(imgLoad, 'done').take(1);
}

var initPhotoSwipeFromDOM = function initPhotoSwipeFromDOM(gallerySelector) {
    // parse slide data (url, title, size ...) from DOM elements
    // (children of gallerySelector)
    var parseThumbnailElements = function parseThumbnailElements(el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;

        for (var i = 0; i < numNodes; i++) {

            figureEl = thumbElements[i]; // <figure> element

            // include only element nodes
            if (figureEl.nodeType !== 1) {
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
            if (figureEl.children.length) {
                // <figcaption> content
                item.title = figureEl.children[0].getAttribute('title');
            }

            if (linkEl.children.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                item.msrc = linkEl.children[0].getAttribute('src');
            }

            item.el = figureEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }

        return items;
    };

    // triggers when user clicks on thumbnail
    var onThumbnailsClick = function onThumbnailsClick(e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        var eTarget = e.target || e.srcElement;

        // find root element of slide
        var clickedListItem = closest(eTarget, function (el) {
            return el.classList && el.classList.contains(galleryImageClass);
        });

        if (!clickedListItem) {
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
            if (childNodes[i].nodeType !== 1) {
                continue;
            }

            if (childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }

        if (index >= 0) {
            // open PhotoSwipe if valid index found
            openPhotoSwipe(index, clickedGallery);
        }
        return false;
    };

    // parse picture index and gallery index from URL (#&pid=1&gid=2)
    var photoswipeParseHash = function photoswipeParseHash() {
        var hash = window.location.hash.substring(1),
            params = {};

        if (hash.length < 5) {
            return params;
        }

        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if (!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');
            if (pair.length < 2) {
                continue;
            }
            params[pair[0]] = pair[1];
        }

        if (params.gid) {
            params.gid = parseInt(params.gid, 10);
        }

        return params;
    };

    var openPhotoSwipe = function openPhotoSwipe(index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;

        items = parseThumbnailElements(galleryElement);

        // define options (if needed)
        options = {

            // define gallery index (for URL)
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),

            getThumbBoundsFn: function getThumbBoundsFn(index) {
                // See Options -> getThumbBoundsFn section of documentation for more info
                var thumbnail = items[index].el.getElementsByTagName('img')[0],
                    // find thumbnail
                pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect();

                return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
            }

        };

        // PhotoSwipe opened from URL
        if (fromURL) {
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
        if (isNaN(options.index)) {
            return;
        }

        if (disableAnimation) {
            options.showAnimationDuration = 0;
        }

        // Pass data to PhotoSwipe and initialize it
        gallery = new _photoswipe2.default(pswpElement, _photoswipeUiDefault2.default, items, options);
        gallery.init();
    };

    // loop through all gallery elements and bind events
    var galleryElements = document.querySelectorAll(gallerySelector);

    for (var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i + 1);
        galleryElements[i].onclick = onThumbnailsClick;
    }

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    var hashData = photoswipeParseHash();
    if (hashData.pid && hashData.gid) {
        openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
    }
};

var loading = Array.from($galleryCategoriesImages).map(loadGalleryCategoryImages);
var loadingObserver$ = (_Rx$Observable = _Rx2.default.Observable).forkJoin.apply(_Rx$Observable, _toConsumableArray(loading));
window.ps = initPhotoSwipeFromDOM;
loadingObserver$.subscribe(function () {},
// TODO: handle errors?
function (err) {
    return console.log;
}, function () {
    initPhotoSwipeFromDOM('.' + galleryClass);
});

/***/ })
/******/ ]);