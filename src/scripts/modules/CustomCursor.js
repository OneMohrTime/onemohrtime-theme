// =============================================================================
// Modules: Change Text
// =============================================================================
// Use GSAP to animate text elements in and out

// Import dependencies
// =============================================================================
import { module as es6Module } from 'modujs';
import CustomCursor from 'custom-cursor.js';

// Set default function and extend it ontop of our imported 'module'
// =============================================================================
export default class extends es6Module {

  // Set initial values
  // =========================================================================
  constructor(m) {
    super(m);

    // Defaults
    this.classes = [];
  }

  // Init module
  // =========================================================================
  init() {
    const cursor = new CustomCursor('.cursor', {
      hideTrueCursor: true,
      focusElements: [
        {
          elements: 'a, button, input[type="submit"], input[type="button"], select, select:read-only .c-button, .f-button, .wpforms-icon-choices-item, .calendly-badge-widget .calendly-badge-content',
          focusClass: 'cursor--focused',
        },
        {
          elements: 'a:disabled, button:disabled, input[type="submit"]:disabled, input[type="button"]:disabled, .c-button:disabled, .is-disabled',
          focusClass: 'cursor--disabled',
        },
        {
          elements: 'p, h1, h2, h3, h4, h5, h6, blockquote, input[type="text"], input[type="email"], input[type="tel"], input[type="url"], input[type="search"], textarea',
          focusClass: 'cursor--focused-text',
        },
        {
          elements: 'abbr',
          focusClass: 'cursor--focused-help',
        },
        {
          elements: 'input[type="range"], .c-gallery__image',
          focusClass: 'cursor--focused-grab',
        },
        {
          elements: 'input[type="range"]:focus, input[type="range"]:active, .swiper-scrollbar-drag',
          focusClass: 'cursor--focused-grabbing',
        },
      ],
    });

    cursor.setPosition(-15, -15).initialize();
  }

  // Destroy
  // =========================================================================
  destroy() {}
}
