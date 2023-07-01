
// *****************************************************************************
// =============================================================================
// Utilities: Is
// =============================================================================
// A collection of 'is' checking related functions
// *****************************************************************************

const toString = Object.prototype.toString;
const arrayLikePattern = /^\[object (?:Array|FileList)\]$/;

// Is array
// =============================================================================
// @param  {Object}  thing - object to test
// @return {Boolean}       - true or false result
export function isArray(thing) {
    return toString.call(thing) === '[object Array]';
}

// Is array like
// =============================================================================
// @param  {Object}  obj - object to test
// @return {Boolean}     - true or false result
export function isArrayLike(obj) {
    return arrayLikePattern.test(toString.call(obj));
}

// Is equal
// =============================================================================
// @param  {String}  a - value to compare
// @param  {String}  b - value to compare
// @return {Boolean}   - true or false result
export function isEqual(a, b) {
    // If both values are null, it's a match
    if (a === null && b === null) {
        return true;
    }

    // If this is an object, we can't properly test so let's return false
    if (typeof a === 'object' || typeof b === 'object') {
        return false;
    }

    // If we've made it this far and it is a match, return a true result
    return a === b;
}

// Is numeric
// =============================================================================
// @param  {Number}  thing - value to check
// @return {Boolean}       - true or false result
export function isNumeric(thing) {
    return !isNaN(parseFloat(thing)) && isFinite(thing);
}

// Is object
// =============================================================================
// @param  {Object}  thing - value to check
// @return {Boolean}       - true or false result
export function isObject(thing) {
    return (thing && toString.call(thing) === '[object Object]');
}

// Is function
// =============================================================================
// @param  {Object}  thing - value to check
// @return {Boolean}       - true or false result
export function isFunction(thing) {
    const getType = {};
    return thing && getType.toString.call(thing) === '[object Function]';
}
