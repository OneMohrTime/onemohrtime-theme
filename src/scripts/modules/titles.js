/** =======================================================================
 * Components / Titles
 * ===================================================================== */

export default function titles() {

  const animTitle = document.querySelector('.title--animated');
  // make sure this is actually the home page
  if (!animTitle) {
    return;
  }

  // const homeTitle    = document.querySelector('#home_title');
  // const homeTitleRow = homeTitle.querySelectorAll('.-row');
  // homeTitleRow.forEach((row) => {
  //   // Wrap each word in the row with a `span`
  //   row.innerHTML = row.innerHTML.replace(/(^|<\/?[^>]+>|\s+)([^\s<]+)/g, '$1<span class="-word">$2</span>');
  // });
  animTitle.innerHTML = animTitle.innerHTML.replace(/(^|<\/?[^>]+>|\s+)([^\s<]+)/g, '$1<span class="-word">$2</span>');
// console.log(animTitle);
  const animTitleWords = animTitle.querySelectorAll('.-word');
  animTitleWords.forEach((word) => {
    // Create animating div + span for later
    let wordBlock = document.createElement('div');
    // Wrap existing text first
    word.innerHTML = `<span class="-text">${word.innerHTML}</span>`
    // Add block to spans second
    wordBlock.classList.add('-block');
    word.insertBefore(wordBlock, word.firstChild);
  })
}
