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

    // Defaults
    this.classes = [];
    this.media = null;
    this.parallaxLayers = [];
  }

  // Init module
  // ===========================================================================
  init() {
    this.classes = this.el.classList;

    if (this.classes.contains('c-media__fixed-container')) {
      this.singleParallax();
    }
    if (this.classes.contains('c-content')) {
      this.layeredParallax();
    }
  }

  // Single Parallax
  // =========================================================================
  singleParallax() {
    this.media = this.el.querySelector('.c-media');

    gsap.fromTo(
      this.media, {
        yPercent: -25
      }, {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: this.el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );
  }

  // Layered Parallax
  // =========================================================================
  layeredParallax() {
    // Vars
    this.parallaxLayers = this.el.querySelectorAll('[data-parallax-layer]');

    // Define base speeds for each layer
    const speeds = {
      background: 0.3, // Slowest
      foreground: 0.7, // Moderate
      tagline: 0.5,    // Slightly slower than the foreground
    };

    // Apply GSAP parallax effect
    this.parallaxLayers.forEach((layer) => {
      const type = layer.dataset.parallaxLayer; // Get layer type
      const speed = speeds[type] || 0.5;       // Fallback speed

      gsap.to(layer, {
        yPercent: -100 * speed, // Parallax scrolling
        ease: 'none',
        scrollTrigger: {
          trigger: this.el,
          start: 'top bottom', // Start when container enters viewport
          end: 'bottom top',   // End when container leaves viewport
          scrub: true,         // Smooth scrolling
        },
      });
    });
  }

}
