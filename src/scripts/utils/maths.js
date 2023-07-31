// =============================================================================
// Utilities: Math
// =============================================================================
// A collection of math related functions

export function lerp(start, end, amt){
    return (1 - amt) * start + amt * end
}
