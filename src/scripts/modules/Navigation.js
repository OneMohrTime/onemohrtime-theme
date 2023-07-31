// =============================================================================
// Modules: Example
// =============================================================================
// ...

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

    this.classes = [];
  }

  // Init module
  // =========================================================================
  init() {
    // Function to handle scroll events
    this.handleScroll();

    // Function to handle navbar transparency
    this.handleNavbarTransparency();

    // Function to change MENU to EXIT
    const toggleButton = document.querySelector('.toggle__menu');

    // Attach click event listener to the toggle button
    toggleButton.addEventListener('click', () => {
      this.changeMenuToExit(toggleButton);
    });
  }

  // Handle Scroll
  // =========================================================================
  handleScroll() {
    // Store navbar classes
    this.classes = this.el.classList;

    // Initial scroll position
    let scrollState = 0;

    // Returns current scroll position
    const scrollTop = () => window.scrollY;

    // Primary scroll event function
    const scrollDetect = (home, down, up) => {
      // Current scroll position
      const currentScroll = scrollTop();
      if (currentScroll === 0) {
        home();
      } else if (currentScroll > scrollState) {
        down();
      } else {
        up();
      }
      // Set previous scroll position
      scrollState = scrollTop();
    };

    const homeAction = () => {
      this.classes.remove('-slideUp');
      this.classes.remove('-slideDown');
      this.classes.add('-slideTop');
    };

    const downAction = () => {
      this.classes.remove('-slideTop');
      this.classes.remove('-slideDown');
      this.classes.add('-slideUp');
    };

    const upAction = () => {
      this.classes.remove('-slideTop');
      this.classes.remove('-slideUp');
      this.classes.add('-slideDown');
    };

    // Attach the scroll event handler
    window.addEventListener('scroll', () => {
      scrollDetect(homeAction, downAction, upAction);
    });
  }

  // Navbar Transparency
  // =========================================================================
  handleNavbarTransparency() {
    // Add or remove scrolling navbar classes
    window.addEventListener('scroll', () => {
      const nav = this.el.querySelector('nav');

      if (50 < window.scrollY) {
        nav.classList.add('transparent');
      } else {
        nav.classList.remove('transparent');
      }
    });
  }

  // Destroy
  // =========================================================================
  changeMenuToExit(btn) {
    this.toggleMenu = this.el.querySelector('.toggle__menu');
    const m = this.toggleMenu.querySelector('.toggle__menu span.m');
    const e = this.toggleMenu.querySelector('.toggle__menu span.e');
    const n = this.toggleMenu.querySelector('.toggle__menu span.n');
    const u = this.toggleMenu.querySelector('.toggle__menu span.u');

    e.classList.toggle('toggle__close');

    if (btn.classList.contains('open')) {
      m.innerHTML = 'E';
      n.innerHTML = 'I';
      u.innerHTML = 'T';
    } else {
      m.innerHTML = 'M';
      n.innerHTML = 'N';
      u.innerHTML = 'U';
    }
  }

  // Destroy
  // =========================================================================
  destroy() {}
}
