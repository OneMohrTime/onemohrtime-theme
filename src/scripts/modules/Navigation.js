// =============================================================================
// Modules: Navigation
// =============================================================================
// Controls show/hide of primary navigation menus

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

    // Vars
    this.classes = [];
    this.header = null;
    this.navigation = null;
    this.toggleMenu = null;
  }

  // Init module
  // =========================================================================
  init() {
    // Vars
    this.header     = this.el;
    this.navigation = this.header.querySelector('.c-navigation');
    this.toggleMenu = this.header.querySelector('.toggle__menu');

    // Function to handle scroll events
    this.handleScroll();

    // Function to handle navbar transparency
    this.handleNavbarTransparency();

    // Attach click event listener to the toggle button
    const toggleButton = this.header.querySelector('.toggle__menu');
    toggleButton.addEventListener('click', () => {

      // Change MENU to EXIT
      this.changeMenuToExit(toggleButton);

      // Open primary navigation
      this.togglePrimaryNav();
    });
  }

  // Handle Scroll
  // =========================================================================
  handleScroll() {
    // Store navbar classes
    this.classes = this.header.classList;

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
      const nav = this.header.querySelector('nav');

      if (50 < window.scrollY) {
        nav.classList.add('transparent');
      } else {
        nav.classList.remove('transparent');
      }
    });
  }

  // Change "Menu" to "Exit"
  // =========================================================================
  changeMenuToExit(btn) {
    const m = this.toggleMenu.querySelector('.m');
    const e = this.toggleMenu.querySelector('.e');
    const n = this.toggleMenu.querySelector('.n');
    const u = this.toggleMenu.querySelector('.u');

    // Switch E to X
    e.classList.toggle('toggle__close');

    // Click detection is 1 click slow
    if (!btn.classList.contains('open')) {
      m.innerHTML = 'E';
      n.innerHTML = 'I';
      u.innerHTML = 'T';
    } else {
      m.innerHTML = 'M';
      n.innerHTML = 'N';
      u.innerHTML = 'U';
    }
  }

  // Toggle Primary Nav
  // =========================================================================
  togglePrimaryNav() {
    // Find sit elements
    const siteContainer = html.querySelector('.o-site');

    // Set classes to "open"
    this.header.classList.toggle('is-active');
    this.navigation.classList.toggle('is-visible');
    this.toggleMenu.classList.toggle('open');
    siteContainer.classList.toggle('-activeNavigationAreaUpTopButNotWhenScrolling');
  }

  // Destroy
  // =========================================================================
  destroy() {}
}
