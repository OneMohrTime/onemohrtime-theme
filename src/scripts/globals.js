// =============================================================================
// Globals
// =============================================================================
// Set and run functions globally throughout our app

// Import dependencies
// =============================================================================
// import npm from 'npm';

// Set default function
// =============================================================================
export default function() {

  /**
   * Smooth scroll all anchor links with an `href` starting with `#`
   */

  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault(); // Prevent default anchor click behavior

      const targetId = this.getAttribute('href').substring(1); // Get the target ID
      const targetElement = document.getElementById(targetId); // Find the target element

      if (targetElement) {
        // Smooth scroll to the target element
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

}
