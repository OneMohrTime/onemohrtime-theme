// =============================================================================
// Modules: Navigation
// =============================================================================
// Controls show/hide of primary navigation menus

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
    this.classes = [];
    this.header = null;
    this.navigation = null;
    this.menu = null;
    this.toggleMenu = null;
  }

  // Init module
  // =========================================================================
  init() {
    // Vars
    this.header     = this.el;
    this.navigation = this.header.querySelector('.c-navigation');
    this.menu       = this.header.querySelector('.c-navigation__menu');
    this.toggleMenu = this.header.querySelector('.c-navigation__toggle');

    // Function to handle scroll events
    this.handleScroll();

    // Function to handle navbar transparency
    this.handleNavbarTransparency();

    // Attach click event listener to the toggle button
    const toggleButton = this.toggleMenu;
    if (toggleButton) {
      toggleButton.addEventListener('click', () => {

        // Open primary navigation
        this.togglePrimaryNav();
      });
    }
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
        nav.classList.add('is-transparent');
      } else {
        nav.classList.remove('is-transparent');
      }
    });
  }

  // Toggle Primary Nav
  // =========================================================================
  togglePrimaryNav() {
    // Find sit elements
    const siteContainer = document.querySelector('.o-site');

    // Set classes to "open"
    this.header.classList.toggle('is-active');
    this.navigation.classList.toggle('is-visible');
    this.menu.classList.toggle('is-hidden');
    this.toggleMenu.classList.toggle('open');
    siteContainer.classList.toggle('-activeNavigationAreaUpTopButNotWhenScrolling');
  }

  // Destroy
  // =========================================================================
  destroy() {}
}
