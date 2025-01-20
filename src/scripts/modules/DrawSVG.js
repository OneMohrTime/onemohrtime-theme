// =============================================================================
// Modules: Draw SVG
// =============================================================================
// Use Vivus.js to animate text elements in and out

// Import dependencies
// =============================================================================
import { module as es6Module } from 'modujs';
import Vivus from 'vivus';

// Set default function and extend it ontop of our imported 'module'
// =============================================================================
export default class extends es6Module {

  // Set initial values
  // =========================================================================
  constructor(m) {
    super(m);

    // Defaults
    this.classes = [];
    this.svg = null;
  }

  // Init module
  // =========================================================================
  init() {
    // Vars
    this.classes = this.el.classList;
    this.svg = this.el.querySelector('#creative_animated');

    new Vivus(this.svg, {
      duration: 100,
    }, function (obj) {
      obj.el.classList.add('is-finished');
    });
  }

  // Destroy
  // =========================================================================
  destroy() {}
}
