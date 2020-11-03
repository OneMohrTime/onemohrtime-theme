/** =======================================================================
 * Components / Home Page
 * ===================================================================== */

// import { gsap } from 'gsap';
// import SplitText from 'gsap/SplitText';
// import ScrollTrigger from 'gsap/scrollTrigger'

export default function homepage() {

  const homePage = document.querySelector('body.home');

  if (!homePage) {
    return;
  }

  $(function() {
    $('#home_banner_list').removeClass('is-hidden');
  });

  const homeTitle    = document.querySelector('#home_title');
  const homeTitleRow = homeTitle.querySelectorAll('span');
  homeTitleRow.forEach((row) => {
    // Wrap each word in the row with a `span`
    row.innerHTML = row.innerHTML.replace(/(^|<\/?[^>]+>|\s+)([^\s<]+)/g, '$1<span class="-word">$2</span>');
  });

  const homeTitleWords = homeTitle.querySelectorAll('.-word');
  homeTitleWords.forEach((word) => {
    // Create animating block
    let wordBlock = document.createElement('div');
    wordBlock.classList.add('-block');
    // Add block to spans
    word.insertBefore(wordBlock, word.firstChild);
    // let letterArray = word.innerHTML.split('')
    // for(let letter of letterArray) {
    //   letter = (letter != ' ' ? letter : '&nbsp;')
    // }
  })

}
