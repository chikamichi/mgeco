import Rx from 'rxjs/Rx';
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';
import PhotoSwipe from 'photoswipe';
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';

require('./../css/main');

// TODO:
//
// Load images asynchronously, and use Masonry#append to build the gallery
// incrementally. Display a spinner meanwhile and prevent interactions.
//
// Provide a fully-automated deployment (run npm build commands upon git pushing,
// and use GitHub hooks to fetch the latest code on the hosting server, that is).
// Support a staging env (ie. htaccess at test.mg-ecoconstruction.com).
// Use git's post-receive hook, bound to master and dev branches? => would require
// teaching git :(
//
// replace legacy js below with ES2015+lodash code

const galleryImageEl = document.getElementsByClassName('c-gallery')[0];
galleryImageEl.onclick = function(e) { e.preventDefault(); };

const galleryEl = document.getElementsByClassName('c-gallery')[0];
const imgLoad = imagesLoaded(galleryEl);
const gallery = new Masonry(galleryEl, {
  itemSelector: 'a',
  columnWidth: 288
});

// imgLoad.on('progress', function( instance, image ) {
//   if (image.isLoaded) {
//     gallery.appended(image.img);
//     gallery.layout();
//     image.img.style.opacity = 1;
//   }
// });

function closest(el, fn) {
  return el && ( fn(el) ? el : closest(el.parentNode, fn) );
};

function revealImage(image) {
  console.log(image, image.img);
  const imageEl = closest(image.img, function(el) {
    return (el.classList && el.classList.contains('c-gallery__image'));
  });
  gallery.appended(image);
  gallery.layout();
  imageEl.classList.add('loaded');
}

imgLoad.on('done', function(instance) {
  console.log(instance);

  // TODO: $images could be filled as images are loaded (.on('progress'))
  // and the whole stream could be emitted when completed (.on('done'))
  // thus the code below extracted out.
  const $images = Rx.Observable.from(instance.images);
  const $timing = Rx.Observable.interval(100);
  const $stream = $images.zip($timing, function(a, b) { return a; });
  $stream.subscribe(revealImage);

  // let revealImageStep = _.debounce(revealImage, 2000);
  // let dconsolelog = _.debounce(console.log, 500);
  // _.forEach(instance.images, function(image) {
  //   dconsolelog(image);
  //   // revealImageStep(image);
  // });

  var initPhotoSwipeFromDOM = function(gallerySelector) {

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



              if(figureEl.children.length > 1) {
                  // <figcaption> content
                  item.title = figureEl.children[1].innerHTML;
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

      // find nearest parent element
      // var closest = function closest(el, fn) {
      //     return el && ( fn(el) ? el : closest(el.parentNode, fn) );
      // };

      // triggers when user clicks on thumbnail
      var onThumbnailsClick = function(e) {
          e = e || window.event;
          e.preventDefault ? e.preventDefault() : e.returnValue = false;

          var eTarget = e.target || e.srcElement;

          // find root element of slide
          var clickedListItem = closest(eTarget, function(el) {
              return (el.classList && el.classList.contains('c-gallery__image'));
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
          gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
          gallery.init();
      };

      // loop through all gallery elements and bind events
      var galleryElements = document.querySelectorAll( gallerySelector );

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

  // execute above function
  initPhotoSwipeFromDOM('.c-gallery');

})
