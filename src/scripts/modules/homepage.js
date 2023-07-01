/** =======================================================================
 * Components / Home Page
 * ===================================================================== */

// import { gsap } from 'gsap';
// import SplitText from 'gsap/SplitText';
// import ScrollTrigger from 'gsap/scrollTrigger'

export default function homepage() {

  const homePage = document.querySelector('body.home');
  // make sure this is actually the home page
  if (!homePage) {
    return;
  }

  $(function() {
    // time appearance of link list to when DOM is loaded
    $('#home_banner_list').removeClass('is-hidden');
  });

  const homeTitle    = document.querySelector('#home_title');
  const homeTitleRow = homeTitle.querySelectorAll('.-row');
  homeTitleRow.forEach((row) => {
    // Wrap each word in the row with a `span`
    row.innerHTML = row.innerHTML.replace(/(^|<\/?[^>]+>|\s+)([^\s<]+)/g, '$1<span class="-word">$2</span>');
  });

  const homeTitleWords = homeTitle.querySelectorAll('.-word');
  homeTitleWords.forEach((word) => {
    // Create animating div + span for later
    let wordBlock = document.createElement('div');
    // Wrap existing text first
    word.innerHTML = `<span class="-text">${word.innerHTML}</span>`
    // Add block to spans second
    wordBlock.classList.add('-block');
    word.insertBefore(wordBlock, word.firstChild);
  })

}
