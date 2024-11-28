// =============================================================================
// App
// =============================================================================
// This file is the centerpiece of the javascript front end and kicks it all of
// on load.

// Import dependencies
// =============================================================================
import modular from 'modujs';
import * as modules from './modules';
import globals from './globals';
import { html } from './utils/environment';

// Run a new modular instance
// =============================================================================
const app = new modular({
  // Set to the modules imported above
  modules: modules
});

// Init our app
// =========================================================================
document.addEventListener('DOMContentLoaded', () => {
  const $style = document.getElementById('main-css');

  if ($style) {
    init();
  } else {
    $style.addEventListener('load', () => {
      init();
    });
  }
});

function init() {
  // Delay site init
  setTimeout(() => {
    globals();
    app.init(app);

    html.classList.remove('is-loading');
    html.classList.add('is-loaded');
    html.classList.add('is-ready');
    html.classList.remove('no-js');
    html.classList.add('has-js');
  }, 300);
}
