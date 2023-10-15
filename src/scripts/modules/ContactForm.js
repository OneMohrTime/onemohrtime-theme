// =============================================================================
// Modules: Contact Form
// =============================================================================
// Triggers "popup" contact form on all pages

// Import dependencies
// =============================================================================
import { module as es6Module } from 'modujs';
import { html } from '../utils/environment';

// Set default function and extend it ontop of our imported 'module'
// =============================================================================
export default class extends es6Module {
  // Set initial values
  // =========================================================================
  constructor(m) {
    super(m);

    // Defaults
    this.body = null;
    this.section = null;
    this.form = null;
    this.closeBG = null;
    this.closeButton = null;
  }

  // Init module
  // =========================================================================
  init() {
    // Vars
    this.body = html.querySelector('body');
    this.section = html.querySelector('.o-site__contact');
    this.form = this.section.querySelector('.wpforms-container');
    this.closeBG = this.section.querySelector('.o-site__contact-close');
    this.closeButton = this.section.querySelector('.c-button--close');

    // If any contact buttons are clicked
    this.el.addEventListener('click', () => {
      // Stop page scrolling
      this.body.classList.add('no-scrollingPlz');
      // Slide form in
      this.openForm();
    });

    // If the form needs to be closed
    this.closeBG.addEventListener('click', () => {
      // Resume page scrolling
      this.body.classList.remove('no-scrollingPlz');
      // Fade form out
      this.closeForm();
    });

    // Close panel after submission
    this.closeButton.addEventListener('click', () => {
      // Resume page scrolling
      this.body.classList.remove('no-scrollingPlz');
      // Fade form out
      this.closeForm();
    });
  }

  // Open Form
  // =========================================================================
  openForm() {
    this.section.classList.add('is-decidingToContact');
    this.form.classList.add('is-doingTheContact');
  }

  // Close Form
  // =========================================================================
  closeForm() {
    this.section.classList.remove('is-decidingToContact');
    this.form.classList.remove('is-doingTheContact');
  }

  // Destroy
  // =========================================================================
  destroy() {}
}
