import _ from 'lodash';
import Masonry from 'masonry-layout';

console.log('yo webpack');
var gallery = document.getElementById('c-gallery');
new Masonry(gallery, {
  itemSelector: 'a',
  columnWidth: 288
});
