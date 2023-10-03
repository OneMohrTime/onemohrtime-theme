// =============================================================================
// Modules: Swiper (v10)
// =============================================================================
// Controls all swiper slide areas around the site
// https://swiperjs.com/swiper-api

// Import dependencies
// =============================================================================
import { module as es6Module } from 'modujs';
import Swiper from 'swiper';
import {
  A11y,
  Autoplay,
  Controller,
  EffectCards,
  EffectCoverflow,
  EffectCreative,
  EffectCube,
  EffectFade,
  EffectFlip,
  FreeMode,
  Grid,
  HashNavigation,
  History,
  Keyboard,
  Manipulation,
  Mousewheel,
  Navigation,
  Pagination,
  Parallax,
  Scrollbar,
  Thumbs,
  Virtual,
  Zoom
} from 'swiper/modules';

// Swiper styles
import 'swiper/scss';
import 'swiper/scss/a11y';
import 'swiper/scss/autoplay';
import 'swiper/scss/controller';
import 'swiper/scss/effect-cards';
import 'swiper/scss/effect-coverflow';
import 'swiper/scss/effect-creative';
import 'swiper/scss/effect-cube';
import 'swiper/scss/effect-fade';
import 'swiper/scss/effect-flip';
import 'swiper/scss/free-mode';
import 'swiper/scss/grid';
import 'swiper/scss/hash-navigation';
import 'swiper/scss/history';
import 'swiper/scss/keyboard';
import 'swiper/scss/manipulation';
import 'swiper/scss/mousewheel';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/parallax';
import 'swiper/scss/scrollbar';
import 'swiper/scss/thumbs';
import 'swiper/scss/virtual';
import 'swiper/scss/zoom';

// Set default function and extend it ontop of our imported 'module'
// =============================================================================
export default class extends es6Module {
  // Set initial values
  // =========================================================================
  constructor(m) {
    super(m);

    // Default
    this.classes = null;
    this.params = null;
    this.swiper = null;
  }

  // Init module
  // =========================================================================
  init() {
    this.classes = this.el.classList;

    // Determine which Swiper to configure depending on the class
    if (this.classes.contains('-caseStudy')) {
      this.createCaseStudies();
    }
  }

  // Create Banner
  // =========================================================================
  createBanner() {}

  // Create Case Studies
  // =========================================================================
  createCaseStudies() {
    this.params = {
      // configure Swiper to use modules
      modules: [A11y, Navigation],

      // params
      a11y: {
        enabled: true
      },
      // autoplay: {
      //   delay: 5000,
      //   disableOnInteraction: false,
      //   pauseOnMouseEnter: true,
      //   stopOnLastSlide: true,
      // },
      centeredSlides: true,
      // controller: {},
      // cardsEffect: {
      //   perSlideOffset: 8, // Offset distance per slide (in px)
      //   perSlideRotate: 2, // Rotate angle per slide (in degrees)
      //   rotate: true, // Enables cards rotation
      //   slideShadows: true, // Enables slides shadows
      // },
      // coverflowEffect: {
      //   depth: 100,  // Depth offset in px (slides translate in Z axis)
      //   modifier: 1, // Effect multiplier
      //   rotate: 50,  // Slide rotate in degrees
      //   scale: 1,    // Slide scale effect
      //   slideShadows: true, //Enables slides shadows
      //   stretch: 0,  // Stretch space between slides (in px)
      // },
      // creativeEffect {},
      // cssMode: true,
      // cubeEffect: {
      //   shadow: false,
      //   slideShadows: false
      // },
      effect: 'slide',
      // effect: 'slide', 'fade', 'cube', 'coverflow', 'flip' or 'creative'
      // fadeEffect: {
      //   crossFade: true
      // },
      // flipEffect: {
      //   slideShadows: false
      // },
      // freeMode: {
      //   enabled: true,
      //   sticky: true
      // },
      // grabCursor: true,
      // hashNavigation: {},
      // history: {},
      // keyboard: {
      //   enabled: true,
      //   onlyInViewport: true,
      //   pageUpDown: true
      // },
      lazy: true,
      lazyPreloadPrevNext: 1,
      loop: true,
      // mousewheel: {},
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      // pagination: {
      //   clickable: true,
      //   dynamicBullets: true,
      //   dynamicMainBullets: true,
      //   el: '.swiper-pagination',
      //   renderBullet: function (index, className) {
      //     return '<span class="' + className + '">' + (index + 1) + '</span>';
      //   },
      //   renderFraction: function (currentClass, totalClass) {
      //     return '<span class="' + currentClass + '"></span>' +
      //             ' of ' +
      //             '<span class="' + totalClass + '"></span>';
      //   },
      //   type: 	'progressbar' | 'bullets' | 'fraction' | 'custom',
      // },
      // parallax: 4,
      // preventClicks: false,
      // rewind: true,
      // scrollbar: {
      //   dragSize: 36,
      //   draggable: true,
      //   el: 'swiper-scrollbar',
      //   hide: false,
      //   snapOnRelease: true,
      // },
      // simulateTouch: false,
      slidesPerView: 1.33,
      spaceBetween: 12,
      speed: 400,
      // thumbs: {
      //   multipleActiveThumbs: false,
      //   swiper: this.el
      // },

      // mobile & desktop breakpoints
      // breakpoints: {
      //   // when window width is >= 600px
      //   600: {
      //     slidesPerView: 2,
      //     spaceBetween: 36,
      //   }
      // }
    };

    // Init Swiper
    this.swiper = new Swiper(this.el, this.params);
  }

  // Destroy
  // =========================================================================
  destroy() {}
}
