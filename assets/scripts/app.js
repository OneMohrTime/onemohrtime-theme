/** =======================================================================
 * Javascript ES6: Main/App Entrypoint
 *
 * Main file used to import, check, and initiate functions used globally
 * amongst elements
 * ===================================================================== */

const doc = document.documentElement;
doc.className = doc.className.replace( 'no-js', 'has-js' );
doc.setAttribute( 'data-useragent', navigator.userAgent );
doc.setAttribute( 'data-platform', navigator.platform );

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

// import dribbble from './components/dribbble';
// import gallery from './components/gallery';
// import homepage from './components/homepage';
// import images from './components/images';
import navigation from './components/navigation';
// import projects from './components/projects';
// import scrolling from './components/scrolling';

//////////
// INIT //
//////////

// dribbble();
// gallery();
// homepage();
// images();
navigation();
// projects();
// scrolling();
