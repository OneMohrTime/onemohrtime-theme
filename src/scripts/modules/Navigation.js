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
    this.megaMenu = null;
    this.toggleMenu = null;
    this.searchbar = null;
  }

  // Init module
  // =========================================================================
  init() {
    // Vars
    this.header     = this.el;
    this.navigation = this.header.querySelector('.c-navigation');
    this.menu       = this.header.querySelector('.c-navigation__menu');
    this.megaMenu   = this.header.querySelector('.c-mega-menu');
    this.toggleMenu = this.header.querySelector('.c-navigation__toggle');
    this.searchbar  = this.header.querySelector('input[type="search"]');

    // Function to handle scroll events
    this.handleScroll();

    // Attach click event listener to the toggle button
    const toggleButton = this.toggleMenu;
    if (toggleButton) {
      toggleButton.addEventListener('click', () => {

        // Change MENU to EXIT
        this.changeMenuToExit(toggleButton);

        // Open primary navigation
        this.togglePrimaryNav();

        // Focus on searchbar
        this.focusSearch();
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

  // Focus on Searchbar
  // =========================================================================
  focusSearch() {
    this.searchbar.focus();
  }

  // Change "Menu" to "Exit"
  // =========================================================================
  changeMenuToExit(btn) {
    const m = this.toggleMenu.querySelector('.m');
    const e = this.toggleMenu.querySelector('.e');
    const n = this.toggleMenu.querySelector('.n');
    const u = this.toggleMenu.querySelector('.u');

    // Switch E to X
    e.classList.toggle('is-also-x');

    // Click detection is 1 click slow
    if (!btn.classList.contains('is-open')) {
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
    const siteContainer = document.querySelector('.o-site');

    // Set classes to "open"
    this.header.classList.toggle('is-active');
    this.navigation.classList.toggle('is-visible');
    this.menu.classList.toggle('is-hidden');
    this.megaMenu.classList.toggle('is-hidden');
    this.toggleMenu.classList.toggle('is-open');
    siteContainer.classList.toggle('-activeNavigationAreaUpTopButNotWhenScrolling');
  }

  // Destroy
  // =========================================================================
  destroy() {}
}
