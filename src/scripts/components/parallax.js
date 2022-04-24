/** =======================================================================
 * Components / Parallax
 * ===================================================================== */

import { gsap } from 'gsap';
// import { random } from 'gsap/gsap-core';
import ScrollTrigger from 'gsap/scrollTrigger'

export default function parallax() {

  // Add replacement for ScrollMagic
  // (required in order to use `scrollTrigger`)
  gsap.registerPlugin(ScrollTrigger);

  // Viewport check
  const viewportWidth  = window.innerWidth;
  const viewportHeight = window.innerHeight;
  console.log( 'Current viewport: ' +  viewportWidth + 'w × ' + viewportHeight + 'h' );


  /**
   * Parallax images
   */

  const $parallax = $('.-parallax');

  gsap.utils.toArray($parallax).forEach( (parallax) => {
    // Leverage scrolltrigger
    // https://greensock.com/docs/v3/Plugins/ScrollTrigger/
    gsap.to(parallax, {
      scrollTrigger: {
        // markers: true,
        trigger: parallax,
        // toggleActions: '<enter> <leave> <enter back> <enter way back>'
        toggleActions: 'play none none none',
        toggleClass: '-parallaxin',
        // start: '<element> <viewport>'
        start: 'top 100%',
        // end: '<element> <viewport>'
        end: 'bottom 0%',
        scrub: 1,
        onEnter: () => $(this).addClass('-scrolling'),
        onLeave: () => $(this).removeClass('-scrolling'),
        onEnterBack: () => $(this).addClass('-scrolling'),
        onLeaveBack: () => $(this).removeClass('-scrolling'),
      },
      y: '-50%',
    });
  });
}
