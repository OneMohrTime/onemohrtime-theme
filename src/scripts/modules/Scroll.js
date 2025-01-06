// =============================================================================
// Modules: Scroll
// =============================================================================
// Establishes custom scrolling functionality allowing for anything from smooth
// scrolling to parallax elements right out of the box with use of 'Mighty Scroll'

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

    this.elements = null;
  }

  // Init module
  // ===========================================================================
  init() {
    this.elements = document.querySelectorAll('[data-scroll-trigger]');

    // Animate each element when it comes into the viewport
    this.elements.forEach((element, index) => {
      gsap.fromTo(element, {
        opacity: 0,
        y: 50
      }, {
        opacity: 1,
        y: 0,
        // duration: 0.6,
        // delay: index * 0.2, // Stagger animations based on index
        scrollTrigger: {
          trigger: element,
          start: 'top 90%',
          toggleActions: 'play none none none',
        }
      });
    });
  }

  // // Fade In Lists
  // // ===========================================================================
  // scrollList() {
  // }

  // // Fade In Footer
  // // ===========================================================================
  // scrollFooter() {
  // }

}
