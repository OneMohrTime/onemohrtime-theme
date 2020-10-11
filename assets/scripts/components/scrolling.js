/** =======================================================================
 * Components / Scrolling
 * ===================================================================== */

import { gsap } from 'gsap';
import { random } from 'gsap/gsap-core';
import ScrollTrigger from 'gsap/scrollTrigger'

export default function scrolling() {

  // Add replacement for ScrollMagic
  // (required in order to use `scrollTrigger`)
  gsap.registerPlugin(ScrollTrigger);

  // Viewport check
  const viewportWidth  = window.innerWidth;
  const viewportHeight = window.innerHeight;
  // console.log( 'Current viewport: ' +  viewportWidth + 'w × ' + viewportHeight + 'h' );

  /**
   * Parallax images
   */

  $( '.parallax' ).each( function() {
    var parallaxParent = this,
      parallaxChild  = $( this ).children( '.parallax__image' );

    if ( 840 <= viewportWidth ) {

      var tweenParallax = new TimelineMax()
        .to( parallaxChild, 1, {
          y: '80%',
          ease: Linear.easeNone
        });

      var parallaxScene = new ScrollMagic.Scene({
        triggerElement: parallaxParent,
        duration: '200%'
      })
        .setTween( tweenParallax )
        .setClassToggle( this, 'parallax--scrolling' )
        .addTo( scrollMagicController );
    }
  });

  /**
   * Fade in content blocks
   */

  $( '.get-faded' ).each( function(i,e) {

    let fadeParent   = e;
    let fadeChild    = $( this ).children();
    let fadeDuration = 0.3;
    let fadeBetween  = 0.2;

    const fadedTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: fadeParent,
        onEnter: () => $(this).removeClass('get-faded').addClass('got-faded'),
        onEnterBack: () => $(this).removeClass('get-faded').addClass('got-faded'),
      }
    });

    // fadedTimeline.to( fadeChild, {
    //   scrollTrigger: fadeParent,
    //   duration: fadeDuration,
    //   y: 0,
    //   autoAlpha: 1
    // });

    fadedTimeline.staggerTo( fadeChild, fadeDuration, {
      y: 0,
      autoAlpha: 1
    }, fadeBetween);

  });

}
