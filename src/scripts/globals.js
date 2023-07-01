// =============================================================================
// Globals
// =============================================================================
// Set and run functions globally throughout our app

// Import dependencies
// =============================================================================
// import module from 'module';

// Set default function
// =============================================================================
export default function() {
  document.documentElement.setAttribute( 'data-user-language', navigator.language || null );
  document.documentElement.setAttribute( 'data-useragent', navigator.userAgent || null );
  document.documentElement.setAttribute( 'data-platform', navigator.userAgentData.platform || null );
}
