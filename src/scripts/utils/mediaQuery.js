// =============================================================================
// Utilities: Media Query
// =============================================================================
// Use media queries in JS the way you already do in CSS!

// Define a function that takes a media query as an argument and returns a boolean indicating if the media query matches the current viewport size
const mediaQuery = (query) => {

  // Use the window.matchMedia() method to check if the media query matches the current viewport size
  return window.matchMedia(query).matches;
}

// Define a function that takes a media query as an argument and adds an event listener that triggers when the viewport size changes and matches the media query
const mediaQueryEvent = (query) => {

  // Use the window.matchMedia() method to create a MediaQueryList object for the given media query
  const mql = window.matchMedia(query);

  // Add an onchange event listener to the MediaQueryList object that triggers when the viewport size changes and matches the media query
  mql.onchange = (e) => {
      // Check if the media query matches the current viewport size
      if (e.matches) {
          // the viewport matches the media query
      } else {
          // the viewport does not match the media query
      }
  };
}

export default {mediaQuery, mediaQueryEvent}
