// =============================================================================
// Modules: Scroll
// =============================================================================
// Establishes custom scrolling functionality, allowing for anything from smooth
// scrolling to parallax elements right out of the box

// Import dependencies
// =============================================================================
import { module as es6Module } from 'modujs';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Set default function and extend it ontop of our imported 'module'
// =============================================================================
export default class extends es6Module {

  constructor(m) {
    super(m);

    this.classes = [];
    this.elements = [];
  }

  // Init module
  // ===========================================================================
  init() {
    this.classes = this.el.classList;
    this.elements = document.querySelectorAll('[data-scroll-trigger]');

    if (this.classes.contains('is-social-feed')) {
      const instagramFeed = this.el.querySelectorAll('.sbi_item');
      instagramFeed.forEach(insta => {
        insta.setAttribute('data-scroll-trigger', '');
      });
    }

    // Animate each element when it comes into the viewport
    this.elements.forEach(element => {
      const scrollStyle = element.getAttribute('data-scroll-style');
      const siblings = element.children;

      if (siblings.length > 1) {
        gsap.fromTo(siblings,
          { opacity: 0, y: 36 },
          { opacity: 1, y: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.15,
            scrollTrigger: {
              trigger: element,
              start: 'top 80%',
              // end: '+=50%',
              end: '+=' + element.offsetHeight,
              // scrub: true,
              onEnter: () => element.classList.add('is-loaded')
            }
          }
        );
      } else {
        switch (scrollStyle) {
          case 'scroll':
            this.animateScroll(element);
            break;
          case 'fade':
            this.animateFade(element);
            break;
          case 'scale-in':
            this.animateScaleIn(element);
            break;
          case 'slide-left':
            this.animateSlideLeft(element);
            break;
          case 'slide-right':
            this.animateSlideRight(element);
            break;
          case 'blur-in':
            this.animateBlurIn(element);
            break;
          default:
            this.animateDefault(element);
            break;
        }
      }
    });
  }

  // Scroll
  // ===========================================================================
  animateScroll(element) {
    gsap.fromTo(element,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'top center',
          // scrub: true,
          onEnter: () => element.classList.add('is-loaded')
        }
      }
    );
  }

  // Fade
  // ===========================================================================
  animateFade(element) {
    gsap.fromTo(element,
      { opacity: 0 },
      { opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'top center',
          // scrub: true,
          onEnter: () => element.classList.add('is-loaded')
        }
      }
    );
  }

  // Scale In
  // ===========================================================================
  animateScaleIn(element) {
    gsap.fromTo(element,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'top center',
          // scrub: true,
          onEnter: () => element.classList.add('is-loaded')
        }
      }
    );
  }

  // Slide Left
  // ===========================================================================
  animateSlideLeft(element) {
    gsap.fromTo(element,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'top center',
          // scrub: true,
          onEnter: () => element.classList.add('is-loaded')
        }
      }
    );
  }

  // Slide Right
  // ===========================================================================
  animateSlideRight(element) {
    gsap.fromTo(element,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'top center',
          // scrub: true,
          onEnter: () => element.classList.add('is-loaded')
        }
      }
    );
  }

  // Blur In
  // ===========================================================================
  animateBlurIn(element) {
    gsap.fromTo(element,
      { filter: 'blur(10px)', opacity: 0 },
      { filter: 'blur(0px)', opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'top center',
          // scrub: true,
          onEnter: () => element.classList.add('is-loaded')
        }
      }
    );
  }

  // Default
  // ===========================================================================
  animateDefault(element) {
    gsap.fromTo(element,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0,
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'top center',
          // scrub: true,
          onEnter: () => element.classList.add('is-loaded')
        }
      }
    );
  }
}
