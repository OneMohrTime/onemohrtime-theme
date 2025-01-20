// =============================================================================
// Modules: Change Text
// =============================================================================
// Use GSAP to animate text elements in and out

// Import dependencies
// =============================================================================
import { module as es6Module } from 'modujs';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

// Register the Text plugin
gsap.registerPlugin(TextPlugin)

// Set default function and extend it ontop of our imported 'module'
// =============================================================================
export default class extends es6Module {

  // Set initial values
  // =========================================================================
  constructor(m) {
    super(m);

    // Defaults
    this.classes = [];
    this.text = '';
  }

  // Init module
  // =========================================================================
  init() {
    // Vars
    this.classes = this.el.classList;
    this.text = this.el.dataset.text;

    // Determine which Swiper to configure depending on the class
    if (this.classes.contains('js-home-tagline')) {
      this.homepageTagline();
    }

  }

  // Homepage Tagline
  // =========================================================================
  homepageTagline() {
    gsap.to(this.el, {
      duration: 2,
      text: this.text,
      delay: 1.5,
      ease: 'none',
    });
  }

  // Banner Headlines
  // =========================================================================
  bannerHeadline() {
    gsap.to(this.el, {
      duration: 3.5,
      text: 'I’m a Creative Designer + Developer',
      delay: 2,
      ease: 'none'
    });
  }

  // Destroy
  // =========================================================================
  destroy() {}
}
