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
   * Fade in content blocks
   */

  // find all fading containers on page
  const $getFaded = $('.u-get-faded');

  if ($getFaded.length > 1) {
    // divide up child elements of fade container
    $getFaded.each(function(i,e) {
      let $this         = $(this);
      let fadeContainer = e;
      // let $fadeChildren = $(this).find('> *');
      let $fadeChildren = $(this).children();
      let fadeDuration  = 1.25;
      let fadeBetween   = 0.0625;

      console.log($getFaded);

      const getFadedIn = gsap.timeline({
        scrollTrigger: {
          trigger: fadeContainer,
          start: 'top 80%',     // when the top of the trigger hits the top of the viewport
          // scrub: 0.2,        // smooth scrubbing, takes 0.2 seconds to "catch up" to the scrollbar
          // markers: 'true',
          toggleActions: 'play none none none',
          onEnter: () => $(this).removeClass('.u-get-faded').addClass('.u-get-faded'),
          onEnterBack: () => $(this).removeClass('.u-get-faded').addClass('.u-get-faded'),
        }
      });

      getFadedIn.fromTo($fadeChildren, {
        y: 50,
        autoAlpha: 0,
      }, {
        duration: fadeDuration,
        stagger: fadeBetween,
        y: 0,
        autoAlpha: 1,
        ease: 'elastic',
      });
    });
  }


  /**
   * Footer scroll-to-top
   */

  const $scrollToTop = $('#scroll_to_top');

  $scrollToTop.on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 'fast');
  });


  /**
   * Home page scroll animations
   */

  // Find out if this is actually the home page
  const isHomePage = document.querySelector('body.home') ? true : false;

  // If it is..
  if (isHomePage) {
    // Animate dribbble headline in
    const homeTimeline = gsap.timeline({
        start: 'top 80%',
        // markers: 'true',
        toggleActions: 'play none none none',
      });
    // console.log(homeTimeline);
  }
}
