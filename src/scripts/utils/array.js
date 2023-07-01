
// *****************************************************************************
// =============================================================================
// Utilities: Array
// =============================================================================
// A collection of array based functions
// *****************************************************************************

// Import dependencies
// =============================================================================
import { isArray } from './is';

// Add to array
// =============================================================================
// @param {Array}  array - array to add to
// @param {String} value - value to add
export function addToArray(array, value) {
    // Check if value is currently within the array
    const index = array.indexOf(value);

    // If this value has not been found in the array, add it
    if (index === -1) {
        array.push(value);
    }
}

// Array contains
// =============================================================================
// @param  {Array}   array - array to check
// @param  {String}  value - value to check
// @return {Boolean}       - true or false result
export function arrayContains(array, value) {
    // Loop through array and see if our value exists within it
    for (let i = 0, c = array.length; i < c; i++) {
        // If value has been found return true and kill loop
        if (array[i] == value) {
            return true;
        }
    }

    // Value was not found within the array
    return false;
}

// Array contents match
// =============================================================================
// Used for checking arrays against each other
// @param  {Array}   a - array to compare
// @param  {Array}   b - array to compare
// @return {Boolean}   - true or false result
export function arrayContentsMatch(a, b) {
    // Set a variable to hold nodes for comparison as we iterate over arrays
    let i;

    // Check to ensure both arrays ARE arrays
    if (!isArray(a) || !isArray(b)) {
        // One of the arrays is not actually an array so stop here
        return false;
    }

    // Check to ensure both arrays have same length
    if (a.length !== b.length) {
        // The arrays do not have matching length so stop here
        return false;
    }

    // Set length of our node checking through arrays
    i = a.length;

    // Loop arrays while checking each node against each other
    while(i--) {
        // If a difference is found stop the loop and do not move forward
        if (a[i] !== b[i]) {
            // Return a response of 'not a match'
            return false;
        }
    }

    // Return a response of a 'match' between both arrays
    return true;
}

// Ensure array
// =============================================================================
// Used to ensure object is an array
// @param  {Object} x - object to check
// @return {Array}    - object as array
export function ensureArray(x) {
    // If type is found to be a string stop the check and return
    if (typeof x === 'string') {
        // Return value of string
        return [x];
    }

    // If array is actually undefined stop the check and return
    if (x === undefined) {
        // Return undefined/empty
        return [];
    }

    // Type if found to be an array so let's return that array
    return x;
}

// Last item
// =============================================================================
// Used to return the last item of an array
// @param  {Array}  array - source array
// @return {Object}       - last item of source array
export function lastItem(array) {
    // Return last item value
    return array[array.length - 1];
}

// Remove from array
// =============================================================================
// Used to remove an item from an array
// @param {Array}  array  - array to remove from
// @param {String} member - item to remove
export function removeFromArray(array, member) {
    // If array is not present, stop here
    if (!array) {
        // Return that we're done
        return;
    }

    // Get the index of the item we're looking to remove from our array
    const index = array.indexOf(member);

    // If item was found in the array, move onto removal
    if (index !== -1) {
        // Remove array item
        array.splice(index, 1);
    }
}

// To array
// =============================================================================
// Used to take array like objects and return them as an array
// @param  {Object} arrayLike - array to check
// @return {Array}            - object returned as an array
export function toArray(arrayLike) {
    // Establish array holder for us to build into
    const array = [];

    // Set the length of the object we're trying to convert over to an array
    let i = arrayLike.length;

    // Loop through object nodes and push items into our new array as we go
    while (i--) {
        // Push item into array
        array[i] = arrayLike[i];
    }

    // Return resulting array
    return array;
}

// Find by key value
// =============================================================================
// Used to find a key with a specific value within an array
// @param  {Array}  array - object to check
// @param  {String} key   - key to search for
// @param  {String} value - value to search for
// @return {Object}       - object match returned
export function findByKeyValue(array, key, value) {
    // Loop through our array and check each node within
    return array.filter(function(obj) {
        // Return a match found
        return obj[key] === value;
    });
}

// Clone array
// =============================================================================
// @param  {Array} array - array to clone
// @return {Array}       - cloned array
export function cloneArray(array) {
    // Return, parse, and stringify cloned array
    return JSON.parse(JSON.stringify(array));
}
