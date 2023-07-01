
// *****************************************************************************
// =============================================================================
// Modules: Scroll
// =============================================================================
// Establishes custom scrolling functionality allowing for anything from smooth
// scrolling to parallax elements right out of the box with use of 'Mighty Scroll'
// *****************************************************************************

// Import dependencies
// =============================================================================
import { module as moduModule } from 'modujs';
import LocomotiveScroll from 'locomotive-scroll';
import { html } from '../utils/environment';

// Set default function and extend it ontop of our imported 'MightyModule'
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
        setTimeout(() => {
            this.scroll = new LocomotiveScroll({
                el: this.el,
                class: 'is-inview',
                scrollbarClass: 'c-scrollbar',
                scrollingClass: 'is-scrolling',
                draggingClass: 'has-scroll-dragging',
                smoothClass: 'has-scroll-smooth',
                initClass: 'has-scroll-init',
                smooth: false,
                multiplier: 1.5
            });

            this.scroll.on('call', (func,way,obj,id) => {
                // Using modularJS
                this.call(func[0],{way,obj},func[1],func[2]);
            });

            this.scroll.on('scroll', (args) => {

                // Tell browser whether or not we're at the top of the viewport
                if (args.scroll.y > 20) {
                    // Set that we're not at the top by adding a class that we can
                    // use to change the views
                    html.classList.add('is-not-top');
                } else {
                    // Set that we're not at the top, emove the class and let views
                    // return to their default state
                    html.classList.remove('is-not-top');
                }
            });

            this.scroll.update();
        }, 200);
    }

    // Destroy module
    // =========================================================================
    destroy() {
        // Ensure view is reset
        html.classList.remove('is-not-top');

        // Destroy scroll within 'MightyScroll' module
        this.scroll.destroy();
    }
}
