import Siema from 'siema';

var homepageCarousel = new Siema({
  selector: '.c-hp-carousel',
  loop: true,
  duration: 600,
  easing: 'ease',
  perPage: 2
});

setInterval(function() {
  homepageCarousel.next(2)
}, 3000);
