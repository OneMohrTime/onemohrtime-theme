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
  const $getFaded = $('.get-faded');

  if ($getFaded.length > 1) {
    // divide up child elements of fade container
    $getFaded.each(function(i,e) {
      let $this         = $(this);
      let fadeContainer = e;
      // let $fadeChildren = $(this).find('> *');
      let $fadeChildren = $(this).children();
      let fadeDuration  = 0.25;
      let fadeBetween   = 0.125;

      const getFadedIn = gsap.timeline({
        scrollTrigger: {
          trigger: fadeContainer,
          start: 'top 80%',     // when the top of the trigger hits the top of the viewport
          // scrub: 0.2,        // smooth scrubbing, takes 0.2 seconds to "catch up" to the scrollbar
          // markers: 'true',
          toggleActions: 'play none none none',
          onEnter: () => $(this).removeClass('get-faded').addClass('got-faded'),
          onEnterBack: () => $(this).removeClass('get-faded').addClass('got-faded'),
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
        ease: 'power2',
      });
    });
  }


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
    const dribbbleTitle = $('.dribbble__title');
    homeTimeline.fromTo(dribbbleTitle,
      {left: '-100%', autoAlpha: 0},
      {left: 0, autoAlpha: 1, duration: 1, ease: 'power2' }
    )
  }
}
