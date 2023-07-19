// =============================================================================
// Globals
// =============================================================================
// Set and run functions globally throughout our app

// Import dependencies
// =============================================================================
import svg4everybody from 'svg4everybody';
import { ENV } from './config';

// Dynamic imports for development mode only
// =============================================================================
let gridHelper;
(async () => {
  if (ENV.IS_DEV) {
    const gridHelperModule = await import('./utils/grid-helper');
    gridHelper = gridHelperModule?.gridHelper;
  }
})();

// Set default function
// =============================================================================
export default function () {
  document.documentElement.setAttribute( 'data-user-language', navigator.language || null );
  document.documentElement.setAttribute( 'data-useragent', navigator.userAgent || null );
  document.documentElement.setAttribute( 'data-platform', navigator.userAgentData.platform || null );

  /**
   * Use external SVG spritemaps
   */
  svg4everybody();

  /**
   * Add grid helper
   */
  gridHelper?.();
}
