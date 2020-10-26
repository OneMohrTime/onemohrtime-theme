/** =======================================================================
 * Components / Home Page
 * ===================================================================== */

// import { gsap } from 'gsap';
// import SplitText from 'gsap/SplitText';
// import ScrollTrigger from 'gsap/scrollTrigger'

export default function homepage() {

  $( function() {
    $( '#home_banner_list' ).removeClass( 'is-hidden' );
  });

  const homeTitle = document.querySelectorAll('#home_title span');
  homeTitle.forEach((row) => {
    row.innerHTML = row.innerHTML.replace(/(^|<\/?[^>]+>|\s+)([^\s<]+)/g, '$1<span class="-word">$2</span>');
  });

  // let split = new SplitText($titlet)
  // console.log(split);

}
