
// *****************************************************************************
// =============================================================================
// Modules: Load
// =============================================================================
// Handles all page load and page transition aspects throughout the project via
// the 'Mighty Load' module and gives to ability to call from with any other
// module within the project
// *****************************************************************************

// Import dependencies
// =============================================================================
import { module as moduModule } from 'modujs';
import modularLoad from 'modularload';
import { html } from '../utils/environment';

// Set default function and extend it ontop of our imported 'module'
// =============================================================================
export default class extends moduModule {
    // Set initial values
    // =========================================================================
    constructor(m) {
        super(m);
    }

    // Init module
    // =========================================================================
    init() {
        // Run a new instance of 'MightyLoad'
        // =====================================================================
        // MightyLoad handles both the load and transition aspects from page to
        // path and sets/removes classes on the frontend where css based
        // animations can easily be established
        const load = new modularLoad({
            // Default example
            enterDelay: 500,
            exitDelay: 500,
            loadDelay: 500,
            // Custom transitions example
            transitions: {
                // Custom transition
                slideOut: {}
            }
        });

        // When 'MightyLoad' is set to 'loading'
        // =====================================================================
        load.on('loading', () => {
            // Ensure current scroll module is destroyed to better control the
            // user experience during the transition of a page
            this.call('destroy', 'scroll', 'Scroll');

            // If we have our menu open, ensure it's closed
            if (html.classList.contains('has-menu-open')) {
                html.classList.remove('has-menu-open');
            }

            // If we have a video playing, ensure it's stopped and removed
            if (html.classList.contains('has-video-playing')) {

                //
                this.embedTarget = null;

                // Remove playing class
                html.classList.remove('has-video-playing');

                // Set embed target
                this.embedTarget = html.querySelector('[data-module-video-embed]');

                // Set timeout
                if (this.embedTarget) {
                    window.setTimeout(() => {

                        // Remove video
                        this.embedTarget.innerHTML = '';
                    }, 600);
                }
            }
        });

        // When 'MightyLoad' is set to 'loaded'
        // =====================================================================
        load.on('loaded', (transition, oldContainer, newContainer) => {
            // Destroy our old container
            this.call('destroy', oldContainer, 'app');

            // Update our new container
            this.call('update', newContainer, 'app');
        });
    }
}
