/** =======================================================================
 * Javascript ES6: Main/App Entrypoint
 *
 * Main file used to import, check, and initiate functions used globally
 * amongst elements
 * ===================================================================== */

document.documentElement.setAttribute( 'data-useragent', navigator.userAgent );
document.documentElement.setAttribute( 'data-platform', navigator.platform );

///////////////
// POLYFILLS //
///////////////

// import './polyfills/includes';

///////////////
// UTILITIES //
///////////////

// import './util/includes';

////////////////
// COMPONENTS //
////////////////

import gallery from './components/gallery';
import homepage from './components/homepage';
import images from './components/images';
import navigation from './components/navigation';
import parallax from './components/parallax';
import prism from './components/prism';
// import projects from './components/projects';
import scrolling from './components/scrolling';
import titles from './components/titles';

//////////
// INIT //
//////////

gallery();
homepage();
images();
navigation();
parallax();
prism();
// projects();
scrolling();
titles();
