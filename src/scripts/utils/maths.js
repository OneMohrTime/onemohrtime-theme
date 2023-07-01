
// *****************************************************************************
// =============================================================================
// Utilities: Math
// =============================================================================
// A collection of math related functions
// *****************************************************************************

// Lerp
// =============================================================================
// Calculates a number between two numbers at a specific increment
// @param  {Number} start  - starting value
// @param  {Number} end    - ending value
// @param  {Number} amount - amount value
// @return {Number}        - resulting value
export function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end
}
