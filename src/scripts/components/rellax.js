/** =======================================================================
 * Components / Parallax
 * ===================================================================== */

// import ScrollTrigger from 'gsap/scrollTrigger'

export default function rellax() {

  const hasRellax = document.querySelector('.rellax');

  if (!hasRellax) {
    return;
  }

  const rellax = new Rellax('.rellax');

}
