// =============================================================================
// Utilities: Cookies
// =============================================================================
// A collection of cookie related functions

// Get Cookie
// =============================================================================
// Checks for cookie
// @param {Var} name - name of cookie
export function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? true : false;
}

// Set Cookie
// =============================================================================
// Sets a cookie
// @param {Var} name  - name of cookie
// @param {Var} value - value of cookie
// @param {Int} days  - days to expiration
export function setCookie(name, value, days) {
    var d = new Date;
    d.setTime(d.getTime() + 24*60*60*1000*days);
    document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
}
