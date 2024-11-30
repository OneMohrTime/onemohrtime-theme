// =============================================================================
// Modules: Parallax
// =============================================================================
// Slow scrolling of background images compared to the rest of the page

// Import dependencies
// =============================================================================
import { module as es6Module } from 'modujs';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Ensure GSAP and ScrollTrigger are loaded
gsap.registerPlugin(ScrollTrigger);

// Set default function and extend it ontop of our imported 'module'
// =============================================================================
export default class extends es6Module {

  // Set initial values
  // =========================================================================
  constructor(m) {
    super(m);
  }

  // Init module
  // =========================================================================
  init() {

    // Apply the parallax effect
    gsap.to(this.el, {
      backgroundPosition: '50% 75%',
      ease: 'none',
      scrollTrigger: {
        trigger: this.el,
        start: 'top bottom', // Trigger when the top of the div enters the viewport
        end: 'bottom top',   // End when the bottom of the div leaves the viewport
        scrub: true          // Smooth scrubbing
      }
    });

  }

  // Destroy
  // =========================================================================
  destroy() {}
}
