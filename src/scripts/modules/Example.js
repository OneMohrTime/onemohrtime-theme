// =============================================================================
// Modules: Example
// =============================================================================
// ...

// Import dependencies
// =============================================================================
import { module as es6Module } from 'modujs';
import modularLoad from 'modularload';

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
    console.log('Component mounted:');
    console.log('==================');
    console.log(this.el);
  }

  // Destroy
  // =========================================================================
  destroy() {}
}
