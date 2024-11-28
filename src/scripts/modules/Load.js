// =============================================================================
// Modules: Load
// =============================================================================
// Handles all page load and page transition aspects throughout the project via
// the 'Mighty Load' module and gives to ability to call from with any other
// module within the project

// Import dependencies
// =============================================================================
import { module as es6Module } from 'modujs';
// import modularLoad from 'modularload';
import { html } from '../utils/environment';

// Set default function and extend it ontop of our imported 'module'
// =============================================================================
export default class extends es6Module {

  constructor(m) {
    super(m);

    this.loader = null;
    this.links = [];
  }

  // Init module
  // ===========================================================================
  init() {
    this.loader = document.querySelector('.c-loader');
    this.links = document.querySelectorAll('a:not([data-fancybox]):not([href^="#"])');

    // // Ensure the loader is active during the initial page load
    // window.addEventListener('load', () => {
    //   setTimeout(() => {
    //     this.loader.classList.remove('is-active'); // Start fade-out after page load
    //   }, 300); // Small delay to allow initial fade-out
    // });

    // Bind transitionPage to all anchor tags
    this.links.forEach(link => link.addEventListener('click', this.transitionPage.bind(this)));
  }

  // Transition Page
  // ===========================================================================
  transitionPage(e) {
    e.preventDefault();
    const href = e.currentTarget.href;

    // Ensure the loader is shown before navigating
    this.loader.classList.add('is-active');
    html.classList.add('is-loading');
    html.classList.remove('is-loaded');

    // Wait for the fade-in animation before navigating to the new page
    setTimeout(() => {
      window.location.href = href;
    }, 500); // This matches the duration of the CSS transition (0.5s)
  }
}
