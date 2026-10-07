// =============================================================================
// Modules: Tabs
// =============================================================================
// Controls accessible vertical tab lists.

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

    this.activeIndex = null;
  }

  // Init module
  // =========================================================================
  init() {
    this.tabs = Array.from(this.el.querySelectorAll('[role="tab"]'));
    this.panels = Array.from(this.el.querySelectorAll('[role="tabpanel"]'));

    this.panels.forEach(panel => {
      panel.querySelectorAll('.u-wysiwyg > *').forEach((item, index) => {
        item.style.animationDelay = `${index * 70}ms`;
      });
    });

    this.tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => this.activate(index));
      tab.addEventListener('keydown', event => this.handleKeydown(event, index));
    });

    this.activate(0);
  }


  // Activate tab and panel
  // =========================================================================
  activate(index) {
    const previousIndex = this.activeIndex;

    this.tabs.forEach((tab, tabIndex) => {
      const isActive = tabIndex === index;
      tab.classList.toggle('is-active', isActive);
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
      tab.tabIndex = isActive ? 0 : -1;
    });

    this.panels.forEach((panel, panelIndex) => {
      const isActive = panelIndex === index;
      panel.classList.toggle('is-active', isActive);
      panel.classList.toggle('is-entering', isActive && previousIndex !== null);
      panel.hidden = !isActive;
    });

    this.activeIndex = index;
  }


  // Accessible keyboard navigation
  // =========================================================================
  handleKeydown(event, index) {
    let nextIndex = index;

    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      nextIndex = (index + 1) % this.tabs.length;
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      nextIndex = (index - 1 + this.tabs.length) % this.tabs.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = this.tabs.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    this.activate(nextIndex);
    this.tabs[nextIndex].focus();
  }

  // Destroy
  // =========================================================================
  destroy() {}
}
