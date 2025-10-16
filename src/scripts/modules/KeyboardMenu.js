// =============================================================================
// Modules: Keyboard Navigation Menu
// =============================================================================
// Tabbing and keyboard for skip navigation links

// Import dependencies
// =============================================================================
import { module as es6Module } from 'modujs';

// Set default function and extend it ontop of our imported 'module'
// =============================================================================
export default class extends es6Module {

  // Set initial values
  // =========================================================================
  constructor(m) {
    super(m);

    // Defaults
    this.links = [];
  }

  // Init module
  // =========================================================================
  init() {
    this.links = this.el.querySelectorAll('[data-skip-link]');

    this.links.forEach(element => {
      element.addEventListener('click', this.skipLinks.bind(this));
    });
  }

  // Skip Links
  // =========================================================================
  skipLinks(e) {
    const link = e.currentTarget;
    const targetId = link.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (!target) return;

    e.preventDefault();
    if (!target.hasAttribute('tabindex')) {
      target.setAttribute('tabindex', '-1')
    };
    target.focus({
      preventScroll: true
    });
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}
