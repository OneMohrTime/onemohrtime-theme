// =============================================================================
// Main App
// =============================================================================
// This file is the centerpiece of the javascript front end and kicks it all of
// on load.

// Import dependencies
// =============================================================================
import modular from 'modujs';
import * as modules from './modules';
import globals from './globals';
import { html } from './utils/environment';

// Run a new instance of "Modules"
// =============================================================================
// Modular watches for modules coming and going within the frontend and
// deploys the process of init or destroy as they're moving in and out

const app = new modular({
  // Set to the modules imported above
  modules: modules
});

// Init our app
// =========================================================================
// Take the above 'Modular' instance, place it into our apps init and
// start up our app!

window.addEventListener('load', (event) => {
    // const $style = document.getElementById("stylesheet");

    // if ($style.isLoaded) {
        init();
    // } else {
    //     $style.addEventListener('load', (event) => {
    //         init();
    //     });
    // }
});

function init() {
  // Delay site init
  setTimeout(() => {
    globals();
    app.init(app);

    html.classList.add('is-loaded');
    html.classList.add('is-ready');
    html.classList.remove('is-loading');
    html.classList.remove('is-first-load');
    html.classList.remove('no-js');
    html.classList.add('has-js');
  }, 300);
}
