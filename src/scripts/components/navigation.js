/** =======================================================================
 * Components / Navigation
 * ===================================================================== */

import { TimelineMax } from 'gsap';

export default function navigation() {

  // Viewport check
  const viewportWidth  = window.innerWidth;
  const viewportHeight = window.innerHeight;
  // console.log( 'Current viewport: ' +  viewportWidth + 'w × ' + viewportHeight + 'h' );

  /**
   * Change MENU to EXIT
   */

  function changeLetters( btn ) {
    const toggleMenu = $( '.toggle__menu' );
    let m = $( '.toggle__menu span.m' ),
        e = $( '.toggle__menu span.e' ),
        n = $( '.toggle__menu span.n' ),
        u = $( '.toggle__menu span.u' );

    e.toggleClass( 'toggle__close' );

    if ( btn.hasClass( 'open' ) ) {
      m.text( 'E' );
      n.text( 'I' );
      u.text( 'T' );
    } else {
      m.text( 'M' );
      n.text( 'N' );
      u.text( 'U' );
    }
  }


  /**
   * Multilevel links
   */

  // $('.multilevel-link').on('click touchstart', function() {
  //   $(this).next('ul').animate({
  //     width : 'toggle'
  //   }, 200);
  // });


  /**
   * Mobile Menu
   */

  const $mobileToggle   = $('#menu_toggle');
  const $navbar         = $('#masthead');
  const $mobileMenu     = $('#desktop_menu');
  const $desktopMenu    = $('#primary_nav');
  const $menuItems      = $('#desktop_menu').children();
  const menuDuration    = 0.15;
  const menuBetween     = 0.05;
  const mobileTimeline  = new TimelineMax({ paused: true, delay: 1 });
  const desktopTimeline = new TimelineMax();

  function navigationIsMobile() {
    mobileTimeline.to( $navbar, {
      duration: menuDuration,
      height: '100%',
      opacity: 1,
      // ease: Power2.easeOut
    }, 0 ).to( $mobileMenu, {
      duration: menuDuration,
      top: 0,
      autoAlpha: 1,
      // ease: Power2.easeOut
    }, 0 ).staggerFrom( $menuItems, menuDuration, {
      y: 20,
      opacity: 0,
      // ease: Back.easeOut
    }, menuBetween );

    $navbar.on( 'click', '#menu_toggle', function() {
      if ( 0 < mobileTimeline.time() ) {
        mobileTimeline.reverse();
      } else {
        mobileTimeline.play( 0 );
      }

      // change MENU to EXIT
      $mobileToggle.toggleClass( 'open' );
      changeLetters( $mobileToggle );
      // Add padding to navbar area
      $( '#page' ).toggleClass( '-activeNavigationAreaUpTopButNotWhenScrolling' );
    });
  }

  function navigationIsDesktop() {
    desktopTimeline.to( $desktopMenu, {
      duration: menuDuration,
      y: -100
    }, 0 );

    $navbar.on( 'click', '#menu_toggle', function() {
      if ( 0 < desktopTimeline.time() ) {
        desktopTimeline.reverse();
      } else {
        desktopTimeline.play( 0 );
      }
      $mobileToggle.toggleClass( 'open' );

      // change MENU to EXIT
      changeLetters( $mobileToggle );
      // Invert logo color
      $( '#logo' ).toggleClass( 'inverted' );
      // Add padding to navbar area
      $( '#page' ).toggleClass( '-activeNavigationAreaUpTopButNotWhenScrolling' );
    });
  }

  // Fire the nav menu switch at 600px
  const mobileTrigger   = viewportWidth < 601 ? true : false;
  if (mobileTrigger) {
    navigationIsMobile();
  } else {
    navigationIsDesktop();
  }
  // window.addEventListener('resize', function() {
  //   if (mobileTrigger) {
  //     navigationIsMobile();
  //   } else {
  //     navigationIsDesktop();
  //   }
  // })


  /**
   * Slide nav menu up and down
   */

  // Initial scroll position
  var scrollState = 0;
  // Store navbar classes
  var navClasses = document.getElementById( 'masthead' ).classList;
  // returns current scroll position
  var scrollTop = function() {
    return window.scrollY;
  };
  // Primary scroll event function
  var scrollDetect = function( home, down, up ) {
    // Current scroll position
    var currentScroll = scrollTop();
    if ( 0 === scrollTop() ) {
      home();
    } else if ( currentScroll > scrollState ) {
      down();
    } else {
      up();
    }
    // Set previous scroll position
    scrollState = scrollTop();
  };

  function homeAction() {
    navClasses.remove( '-slideUp' );
    navClasses.remove( '-slideDown' );
    navClasses.add( '-slideTop' );
  }

  function downAction() {
    navClasses.remove( '-slideTop' );
    navClasses.remove( '-slideDown' );
    navClasses.add( '-slideUp' );
  }

  function upAction() {
    navClasses.remove( '-slideTop' );
    navClasses.remove( '-slideUp' );
    navClasses.add( '-slideDown' );
  }

  window.addEventListener( 'scroll', function() {
    scrollDetect( homeAction, downAction, upAction );
  });

  // Add or remove scrolling navbar classes
  $( window ).scroll( function() {
    if ( 50 < $( document ).scrollTop() ) {
      $( 'nav' ).addClass( 'transparent' );
    } else {
      $( 'nav' ).removeClass( 'transparent' );
    }
  });

  /**
   * Add scrolling class to contact button
   */

  // click the contact link
  $( 'a[href^="#contact"]' ).on( 'click', function(e) {
    // keep hash out of url
    // e.preventDefault();
    // add display class to div, scroll page to it
    $( '#contact' ).addClass( 'said-hi' );
    // $( 'html, body' ).animate({ scrollTop: 0 }, 'fast');
    // remove visible classes from navbar
    $( '#mobile_menu' ).removeClass( 'is-visible' );
    // remove mobile GSAP classes
    if ( 0 < mobileTimeline.time() ) {
      mobileTimeline.reverse();
    }
    // reset letters
    changeLetters($mobileToggle);
  });
}
