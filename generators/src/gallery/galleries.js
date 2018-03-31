import $ from 'domtastic'
import PhotoSwipe from 'photoswipe'
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default'
import * as S from '../_utils/settings'

// Galleries manager.
//
// Merely a PhotoSwipe wrapper with support for multi-galleries.
// Adapted from http://photoswipe.com/documentation/getting-started.html.
// TODO: simplify, refactor using RxJS, ramda or something.
export default class Galleries {
  constructor() {
    this.galleryElements = []
    this.galleryLayouts = []
    this.galleryNextUUID = 0
  }

  // @private
  // Create slide objects collection.
  normalizeImageAsItem(el) {
    const linkEl = el.children[0]
    const size = linkEl.attributes['data-size'].value.split('x')
    const item = {
      src: linkEl.attributes.href.value,
      w: parseInt(size[0], 10),
      h: parseInt(size[1], 10)
    }
    // TODO: shitty code, adapt to my own use-case
    if (el.children.length) {
      item.title = el.children[0].attributes.title.value
    }
    if (linkEl.children.length > 0) {
      item.msrc = linkEl.children[0].attributes.src.value
    }
    item.el = el // save link to element for getThumbBoundsFn
    return item
  }

  // @private
  // Parse slide data (url, title, size ...) from DOM elements.
  parseThumbnailElements(el) {
    const thumbElements = $(el).find(`.${S.galleryImageClass}`)
    return thumbElements.map(this.normalizeImageAsItem)
  }

  // @private
  // Triggered upon user clicking a thumbnail. Opens PhotoSwipe instance.
  onThumbnailsClick(e) {
    e = e || window.event
    const eTarget = e.target || e.srcElement
    const clickedImage = $(eTarget).closest(`.${S.galleryImageClass}`)
    if (!clickedImage.length) return
    e.preventDefault ? e.preventDefault() : e.returnValue = false
    // find index of clicked item by looping through all child nodes
    // alternatively, you may define index via data- attribute
    const clickedGallery = $(eTarget).closest(`.${S.galleryCategoryClass}`)
    const images = clickedImage.siblings().concat(clickedImage)
    const numImages = images.length
    // domtastic#indexOf hasn't qualified for production use just yet…
    // @see https://github.com/webpro/DOMtastic/issues/55
    const index = [...clickedImage[0].parentNode.children].indexOf(clickedImage[0])
    if (index >= 0 && index < numImages) this.openPhotoSwipe(index, clickedGallery[0])
    return false
  }

  // @private
  // Parse picture index and gallery index from URL (#&pid=1&gid=2).
  photoswipeParseHash() {
    const hash = window.location.hash.substring(1)
    let params = {}
    if (hash.length < 5) return params
    const vars = hash.split('&')
    for (let i = 0; i < vars.length; i++) {
      if (!vars[i]) continue
      const pair = vars[i].split('=')
      if (pair.length < 2) continue
      params[pair[0]] = pair[1]
    }
    return params
  }

  // @private
  // Open a registered PhotoSwipe instance.
  openPhotoSwipe(index, galleryElement, disableAnimation, fromURL) {
    const pswpElement = $('.pswp')[0]
    const items = this.parseThumbnailElements(galleryElement)
    const uuid = galleryElement.attributes['data-pswp-uid'].value

    // define options (if needed)
    const options = {
      // define gallery index (for URL)
      galleryUID: uuid,
      getThumbBoundsFn: function(index) {
        // See Options -> getThumbBoundsFn section of documentation for more info
        // TODO: use domtastic here
        const thumbnail = items[index].el.getElementsByTagName('img')[0] // find thumbnail
        const pageYScroll = window.pageYOffset || document.documentElement.scrollTop
        const rect = thumbnail.getBoundingClientRect()
        return {
          x: rect.left,
          y: rect.top + pageYScroll,
          w: rect.width
        }
      }
    }

    // PhotoSwipe opened from URL
    if (fromURL) {
      if (options.galleryPIDs) {
        // parse real index when custom PIDs are used
        // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
        for (var j = 0; j < items.length; j++) {
          if (items[j].pid == index) {
            options.index = j
            break
          }
        }
      } else {
        // in URL indexes start from 1
        options.index = parseInt(index, 10) - 1
      }
    } else {
      options.index = parseInt(index, 10)
    }

    // exit if index not found
    if (isNaN(options.index)) return
    if (disableAnimation) options.showAnimationDuration = 0

    // Pass data to PhotoSwipe and initialize it
    const gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options)
    gallery.init()
  }

  // @private
  // Parse URL and open gallery if it matches #&pid=3&gid=1.
  initPhotoSwipeFromHash() {
    const hashData = this.photoswipeParseHash()
    if (hashData.pid && hashData.gid) {
      const gid = parseInt(hashData.gid, 10)
      this.openPhotoSwipe(hashData.pid, this.galleryElements[gid], true, true)
    }
  }

  // @private
  // Register a new PhotoSwipe instance bound to a specific selector.
  initPhotoSwipeFromDOM(gallerySelector, galleryLayout) {
    this.galleryElements.push(gallerySelector)
    this.galleryLayouts.push(galleryLayout)
    gallerySelector.setAttribute('data-pswp-uid', this.galleryNextUUID++)
    gallerySelector.onclick = this.onThumbnailsClick.bind(this)
  }

  // @public
  // TODO: remove eventually (still used in index.js)
  closest(el, fn) {
    return el && ( fn(el) ? el : this.closest(el.parentNode, fn) )
  }

  // @public
  // @param [Node] gallerySelector - a native DOM node
  // @param [Node] galleryLayout - wrapped selector, eg. Masonry wrapper
  // TODO: support adding multiple galleries at once, something like
  // [...gallerySelector].map(this.initPhotoSwipeFromDOM)
  add(gallerySelector, galleryLayout) {
    this.initPhotoSwipeFromDOM(gallerySelector, galleryLayout)
  }

  // @public
  openFromUrl(gid) {
    this.initPhotoSwipeFromHash()
  }

  map(fn) {
    this.galleryElements.map((el, i) => {
      return fn(this.galleryElements[i], this.galleryLayouts[i])
    })
  }
}
