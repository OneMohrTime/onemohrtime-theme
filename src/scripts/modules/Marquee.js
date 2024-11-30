// =============================================================================
// Modules: Marquee
// =============================================================================
// The script adjusts the animation speed dynamically based on the width of
// the content to ensure it scrolls smoothly and at an appropriate speed.

// Import dependencies
// =============================================================================
import { module as es6Module } from 'modujs';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Set default function and extend it ontop of our imported 'module'
// =============================================================================
export default class extends es6Module {

  // Set initial values
  // =========================================================================
  constructor(m) {
    super(m);

    // Defaults
    this.container = null;
    this.marquee = null;
  }

  // Init module
  // =========================================================================
  init() {
    this.container = this.el;
    this.marquee   = this.el.querySelector('[data-marquee]');

    const marqueeWidth   = this.marquee.scrollWidth; // Total width of the marquee content
    const containerWidth = this.container.offsetWidth;

    // Clone the marquee content for seamless looping
    this.clone = this.marquee.cloneNode(true);
    this.container.appendChild(this.clone);

    // Create GSAP scroll-driven animation
    gsap.to([this.marquee, this.clone], {
      x: `-=${marqueeWidth}`,
      ease: 'none',
      scrollTrigger: {
        trigger: this.container,
        start: 'top bottom', // Start animating when container enters the viewport
        end: 'bottom top',   // Stop animating when container leaves the viewport
        scrub: true,         // Sync animation with scroll
      },
    });

    // // Pause animation on hover
    // this.container.addEventListener('mouseenter', () => {
    //   this.marquee.style.animationPlayState = 'paused';
    // });
    // this.container.addEventListener('mouseleave', () => {
    //   this.marquee.style.animationPlayState = 'running';
    // });
  }

  // Destroy
  // =========================================================================
  destroy() {}
}
