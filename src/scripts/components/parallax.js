/** =======================================================================
 * Components / Parallax
 * ===================================================================== */

import { gsap } from 'gsap';
import { random } from 'gsap/gsap-core';
import ScrollTrigger from 'gsap/scrollTrigger'

export default function parallax() {

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

  const $parallax = $('.-parallax');

  // $parallax.each( function(i,e) {
    // console.log(i);
    // console.log(e);
    // let parallaxParent   = e;
    // let parallaxChild    = $( this ).children( '.parallax__image' );
    // let parallaxDuration = '200%';

    // const parallaxTween = gsap.timeline({
    //     scrollTrigger: {
    //       trigger: parallaxParent,
    //       start: 'top center',
    //       end: 'bottom center',
    //       scrub: true,
    //       onEnter: () => $(this).addClass('-scrolling'),
    //       onLeave: () => $(this).removeClass('-scrolling'),
    //       onEnterBack: () => $(this).addClass('-scrolling'),
    //       onLeaveBack: () => $(this).removeClass('-scrolling'),
    //     }
    //   });

  //   if ( 840 <= viewportWidth ) {

      gsap.utils.toArray($parallax).forEach( (parallax) => {
        // const parallaxImage = parallax.querySelector('.-parallax');
        // console.log(parallaxImage);
        // console.log(parallax.style);

        // parallax.style.top = "-100%";

        gsap.to(parallax, {
          // top: `${innerHeight / 4}px`,
          // left: '0',
          // ease: "none",
          scrollTrigger: {
            markers: true,
            trigger: parallax,
            // toggleActions: '<enter> <leave> <enter back> <enter way back>'
            toggleActions: 'play none none none',
            toggleClass: '-parallaxin',
            // start: '<element> <viewport>'
            start: 'top 80%',
            // end: '<element> <viewport>'
            // end: '+=1',
            scrub: 1,
            onEnter: () => $(this).addClass('-scrolling'),
            onLeave: () => $(this).removeClass('-scrolling'),
            onEnterBack: () => $(this).addClass('-scrolling'),
            onLeaveBack: () => $(this).removeClass('-scrolling'),
          },
          y: '-100%',
          // duration: 3
        });
      });
  //   }
//   });
}
