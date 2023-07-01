
// *****************************************************************************
// =============================================================================
// Utilities: Debounce
// =============================================================================
// A simple function used for throttling
// *****************************************************************************

// Set default function
// =============================================================================
// @param  {Function}  func      - function to run after timeout
// @param  {Number}    wait      - amount of time to timeout
// @param  {Boolean}   immediate - override timeout and apply immediately
// @return {Function}            - returns applied function with context and args
export default function(func, wait, immediate) {
    // Establish timeout holder
    let timeout;

    // Returning function with timeout
    return function() {
        // Set context and arguments
        const context = this;
        const args = arguments;

        // Set later function
        const later = function() {
            // Set timeout to null
            timeout = null;

            // If immediate is not true, apply function with context and args
            if (!immediate) func.apply(context, args);
        };

        // Set to call now if immediate is true timeout is empty
        const callNow = immediate && !timeout;

        // Clear our timeout
        clearTimeout(timeout);

        // Update our timeout
        timeout = setTimeout(later, wait);

        // If set to call now, apply function with context and args
        if (callNow) func.apply(context, args);
    };
}
