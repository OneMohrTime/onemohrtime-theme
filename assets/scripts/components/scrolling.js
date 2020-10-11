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

  // $( '.parallax' ).each( function(i,e) {
  //   let parallaxParent   = e;
  //   let parallaxChild    = $( this ).children( '.parallax__image' );
  //   let parallaxDuration = '200%';

  //   const parallaxTween = gsap.timeline({
  //       scrollTrigger: {
  //         trigger: parallaxParent,
  //         start: 'top center',
  //         end: 'bottom center',
  //         scrub: true,
  //         onEnter: () => $(this).addClass('-scrolling'),
  //         onLeave: () => $(this).removeClass('-scrolling'),
  //         onEnterBack: () => $(this).addClass('-scrolling'),
  //         onLeaveBack: () => $(this).removeClass('-scrolling'),
  //       }
  //     });

  //   if ( 840 <= viewportWidth ) {

  //     gsap.utils.toArray('.parallax').forEach((parallax) => {
  //       parallax.bg = parallax.querySelector('.parallax__image');

  //       parallax.bg.style.top = "-100%";

  //       gsap.to(parallax.bg, {
  //         top: `${-innerHeight / 2}px`,
  //         left: '50%',
  //         ease: "none",
  //         scrollTrigger: {
  //           trigger: parallax,
  //           start: "top top",
  //           end: "bottom top",
  //           scrub: true
  //         }
  //       });
  //     });
  //   }
  // });


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
