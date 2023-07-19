// =============================================================================
// Modules: Load
// =============================================================================
// Handles all page load and page transition aspects throughout the project via
// the 'Mighty Load' module and gives to ability to call from with any other
// module within the project

// Import dependencies
// =============================================================================
import { module } from 'modujs';
import modularLoad from 'modularload';

// Set default function and extend it ontop of our imported 'module'
// =============================================================================
export default class extends module {
  constructor(m) {
    super(m);
  }

  // Init module
  // ===========================================================================
  init() {
    const load = new modularLoad({
      enterDelay: 0,
      transitions: {
        customTransition: {}
      }
    });

    load.on('loaded', (transition, oldContainer, newContainer) => {
      this.call('destroy', oldContainer, 'app');
      this.call('update', newContainer, 'app');
    });
  }
}
