// =============================================================================
// Modules: Fancybox
// =============================================================================
// Fancybox is the ultimate JavaScript lightbox alternative that sets the
// standard for premium user experience in multimedia display. Supports images,
// videos, maps, inline content, iframes and any other HTML content.

// Import dependencies
// =============================================================================
import { module as es6Module } from 'modujs';
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

// Set default function and extend it ontop of our imported 'module'
// =============================================================================
export default class extends es6Module {

  constructor(m) {
    super(m);

    this.fancybox = null;
  }

  // Init module
  // ===========================================================================
  init() {
    // this.fancybox = Fancybox()

    Fancybox.bind("[data-fancybox]", {
      // Your custom options
    });
  }

}
