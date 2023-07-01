
// *****************************************************************************
// =============================================================================
// Utilities: Html
// =============================================================================
// A collection of html related functions
// *****************************************************************************

// Escape html
// =============================================================================
// @param  {String} str - html to escape
// @return {String}     - escaped html
export function escapeHtml(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

// Unescape html
// =============================================================================
// @param  {String} str - html to unescape
// @return {String}     - unescaped html
export function unescapeHtml(str) {
    return str
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&');
}

// Get node data
// =============================================================================
// @param  {DOMElement} node - target node
// @return {Array}           - node data
export function getNodeData(node) {
    // Get all attriutes from target node
    const attributes = node.attributes;

    // Search for attributes starting with 'data-'
    const pattern = /^data\-(.+)$/;

    // Establish output data object
    const data = {};

    // Loop all attributes and build out the return array
    for (let i in attributes) {
        // If not found, continue
        if (!attributes[i]) {
            continue;
        }

        // Attributes name (ex: data-module)
        let name = attributes[i].name;

        // If no name, continue
        if (!name) {
            continue;
        }

        // Ensure attribute follows our 'data-' pattern
        let match = name.match(pattern);

        // If no match, continue
        if (!match) {
            continue;
        }

        // If this throws an error, you have some serious problems in your HTML.
        data[match[1]] = getData(node.getAttribute(name));
    }

    // Return final data array
    return data;
}

// Establish rbrace
// =============================================================================
const rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/;

// Get data
// =============================================================================
// @param  {String} data - value to convert
// @return {Mixed}       - returns value in its natural data type
export function getData(data) {
    // Return true
    if (data === 'true') {
        return true;
    }

    // Return false
    if (data === 'false') {
        return false;
    }

    // Return null
    if (data === 'null') {
        return null;
    }

    // Only convert to a number if it doesn't change the string
    if (data === +data+'') {
        return +data;
    }

    // Return array
    if (rbrace.test(data)) {
        return JSON.parse(data);
    }

    // Return in original state
    return data;
}

// Get parents
// =============================================================================
// Returns an array containing all the parent nodes of the given node
// @param  {Object} node - child node
// @return {Array}       - parent nodes
export function getParents(elem) {
    // Set up a parent array
    let parents = [];

    // Push each parent element to the array
    for ( ; elem && elem !== document; elem = elem.parentNode ) {
        parents.push(elem);
    }

    // Return our parent array
    return parents;
}

// Query closest parent
// =============================================================================
// @param  {Object} elem     - child node
// @param  {String} selector - element selector
// @return {Array}           - closest parent
export function queryClosestParent(elem, selector) {

    // Element.matches() polyfill
    if (!Element.prototype.matches) {
        Element.prototype.matches =
            Element.prototype.matchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector ||
            Element.prototype.oMatchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            function(s) {
                var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                    i = matches.length;
                while (--i >= 0 && matches.item(i) !== this) {}
                return i > -1;
            };
    }

    // Get the closest matching element
    for (; elem && elem !== document; elem = elem.parentNode) {
        if (elem.matches(selector)) return elem;
    }

    // If no closest parent was found, return null
    return null;
}
