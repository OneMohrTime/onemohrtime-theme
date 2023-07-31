// =============================================================================
// Globals
// =============================================================================
// Set and run functions globally throughout our app

// Import dependencies
// =============================================================================
// import npm from 'npm';

// Set default function
// =============================================================================
export default function() {

  /**
   * Footer scroll-to-top
   */

  const scrollToTop = document.querySelector('#scroll_to_top');

  scrollToTop.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  /**
   * Add scrolling class to contact button
   */

  // $( 'a[href^="#contact"]' ).on( 'click', function(e) {
  //   // keep hash out of url
  //   // e.preventDefault();
  //   // add display class to div, scroll page to it
  //   $( '#contact' ).addClass( 'said-hi' );
  //   // $( 'html, body' ).animate({ scrollTop: 0 }, 'fast');
  //   // remove visible classes from navbar
  //   $( '#mobile_menu' ).removeClass( 'is-visible' );
  //   // remove mobile GSAP classes
  //   if ( 0 < mobileTimeline.time() ) {
  //     mobileTimeline.reverse();
  //   }
  //   // reset letters
  //   changeLetters($mobileToggle);
  // });

}
