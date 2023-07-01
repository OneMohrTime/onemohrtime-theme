
// *****************************************************************************
// =============================================================================
// Utilities: Environment
// =============================================================================
// Set variables, namespaces, and things of that nature here and import
// throughout the project as needed
// *****************************************************************************

// App & API related
// =============================================================================
const APP_NAME     = 'Mighty Craft/JS Boilerplate';
const DATA_API_KEY = '.data-api';

// Frontend related targets
// =============================================================================
const html         = document.documentElement;
const body         = document.body;
const isDebug      = !!html.getAttribute('data-debug');

// Export our values
// =============================================================================
export {APP_NAME, DATA_API_KEY, html, body, isDebug};
