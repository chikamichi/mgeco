import _ from 'lodash';
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';

var gallery = document.getElementById('c-gallery');
imagesLoaded(gallery, function(instance) {
  new Masonry(instance.elements[0], {
    itemSelector: 'a',
    columnWidth: 288
  });
})
