
// *****************************************************************************
// =============================================================================
// Utilities: Transform
// =============================================================================
// A collection of transform related functions
// *****************************************************************************

// Transform
// =============================================================================
// Sets the transform of an element
// @param {Object} el             - element to transform
// @param {Object} transformValue - desired transform (IE '0, 0')
export function transform(el, transformValue) {
    // Apply our transform to our element and attach IE and webkit versions
    el.style.webkitTransform = transformValue;
    el.style.msTransform = transformValue;
    el.style.transform = transformValue;
}

// Get translate
// =============================================================================
// Gets the current transform of an element
// @param  {Object} el - element to transform
// @return {Object}    - transform value (IE '0, 0')
export function getTranslate(el) {
    // Establish translate value holder
    const translate = {}

    // If window doesn't have a computed style, stop function here
    if (!window.getComputedStyle) return;

    // Get the computed styles from our element
    const style = getComputedStyle(el);

    // Transform our styles
    const transform = style.transform || style.webkitTransform || style.mozTransform;

    // Set mat holder
    let mat = null;

    // If a transform has been set, run addition processes
    if (transform) {
        // Check for matrix3d transforms
        mat = transform.match(/^matrix3d\((.+)\)$/);

        // If we have matrix3d transforms, parse the values
        if (mat) return parseFloat(mat[1].split(', ')[13]);

        // Check for matrix transforms
        mat = transform.match(/^matrix\((.+)\)$/);
    }

    // If we have matrix transforms, parse the x and y values
    translate.x = mat ? parseFloat(mat[1].split(', ')[4]) : 0;
    translate.y = mat ? parseFloat(mat[1].split(', ')[5]) : 0;

    // Return the elements transform values
    return translate;
}
