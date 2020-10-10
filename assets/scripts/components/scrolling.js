/** =======================================================================
 * Components / Scrolling
 * ===================================================================== */

import {$,jQuery} from 'jquery';
import ScrollMagic from 'scrollmagic';

export default function scrolling() {

  // use jQuery
  window.$ = $;
  window.jQuery = jQuery;


  /**
   * Init ScrollMagic
   */

  const scrollMagicController = new ScrollMagic.Controller({
    globalSceneOptions: {
      triggerHook: 0.8
    }

    // addIndicators : true
  });


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

  $( '.get-faded' ).each( function() {
    var fadeParent   = this,
      fadeChild    = $( this ).children(),
      fadeDuration = 0.2,
      fadeBetween  = 0.1;

    var tweenFade = new TimelineMax()
      .staggerTo( fadeChild, fadeDuration, {
        y: 0,
        autoAlpha: 1
      }, fadeBetween );

    var fadeScene  = new ScrollMagic.Scene({
      triggerElement: fadeParent,
      triggerHook: 1,
      reverse: false
    })
      .setTween( tweenFade )
      .setClassToggle( fadeChild, 'got-faded' )
      .addTo( scrollMagicController );
  });

}
