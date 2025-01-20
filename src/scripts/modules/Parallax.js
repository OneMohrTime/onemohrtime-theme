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
    const parallaxLayers = [];
  }

  // Init module
  // =========================================================================
  init() {
    // Vars
    const parallaxLayers = this.el.querySelectorAll('[data-parallax-layer]');

    // Define base speeds for each layer
    const speeds = {
      background: 0.3, // Slowest
      foreground: 0.7, // Moderate
      tagline: 0.5,    // Slightly slower than the foreground
    };

    // Apply GSAP parallax effect
    parallaxLayers.forEach((layer) => {
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
