// =============================================================================
// Globals
// =============================================================================
// Set and run functions globally throughout our app

// Import dependencies
// =============================================================================
import { computePosition, flip, shift, offset } from '@floating-ui/dom';

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

  /**
   * Floating UI tooltips for multiple elements
   */

  const tooltips = document.querySelectorAll('.c-tooltip');
  const tooltipAnchors = document.querySelectorAll('.c-tooltip__anchor');

  tooltipAnchors.forEach((tooltipAnchor, index) => {
    const tooltip = tooltips[index]; // Match each anchor with its tooltip

    function update() {
      computePosition(tooltipAnchor, tooltip, {
        placement: 'bottom',
        middleware: [
          offset(6),
          flip(),
          shift({ padding: 5 }),
        ],
      }).then(({ x, y }) => {
        Object.assign(tooltip.style, {
          left: `${x}px`,
          top: `${y}px`,
        });
      });
    }

    function showTooltip() {
      tooltip.style.display = 'block';
      update();
    }

    function hideTooltip() {
      tooltip.style.display = '';
    }

    [
      ['mouseenter', showTooltip],
      ['mouseleave', hideTooltip],
      ['focus', showTooltip],
      ['blur', hideTooltip],
    ].forEach(([event, listener]) => {
      tooltipAnchor.addEventListener(event, listener);
    });
  });

}
