// =============================================================================
// Modules: Title
// =============================================================================
//

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

    // Vars
    this.textWrapper = null;
  }

  // Init module
  // =========================================================================
  init() {
    // Wrap every letter in a span
    this.textWrapper = this.el;
    this.textWrapper.innerHTML = this.textWrapper.textContent.replace(/\S/g, '<span class="u-letter">$&</span>');

    anime.timeline({loop: false})
      .add({
        targets: '.u-letter',
        translateY: ['1.1em', 0],
        translateX: ['0.55em', 0],
        translateZ: 0,
        rotateZ: [180, 0],
        duration: 750,
        easing: 'easeOutExpo',
        delay: (el, i) => 50 * i
      })
      // }).add({
      //   targets: this.textWrapper,
      //   opacity: 0,
      //   duration: 1000,
      //   easing: 'easeOutExpo',
      //   delay: 1000
      // });
    }

  // Destroy
  // =========================================================================
  destroy() {}
}
