// =============================================================================
// Modules: Masonry
// =============================================================================
// Responsive masonry grid layout that collapses gaps

// Import dependencies
// =============================================================================
import { module as es6Module } from 'modujs';
import MiniMasonry from 'minimasonry';

// Set default function and extend it ontop of our imported 'module'
// =============================================================================
export default class extends es6Module {

  // Set initial values
  // =========================================================================
  constructor(m) {
    super(m);

    // Defaults
    this.items = [];
  }

  // Init module
  // ===========================================================================
  init() {
    this.items = Array.from(this.el.querySelectorAll('[data-masonry-item]'));
// console.log(this.el)
    const masonry = new MiniMasonry({
      container: this.el,
      gutter: 24,
      surroundingGutter: false,
      wedge: true
    });
  }

  // Destroy
  // =========================================================================
  destroy() {}
}
