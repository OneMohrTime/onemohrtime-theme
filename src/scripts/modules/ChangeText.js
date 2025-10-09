// =============================================================================
// Modules: Change Text
// =============================================================================
// Use GSAP to animate text elements in and out

// Import dependencies
// =============================================================================
import { module as es6Module } from 'modujs';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { SplitText } from 'gsap/SplitText';

// Register the Text plugin
gsap.registerPlugin(TextPlugin);
gsap.registerPlugin(SplitText);

// Set default function and extend it ontop of our imported 'module'
// =============================================================================
export default class extends es6Module {

  // Set initial values
  // =========================================================================
  constructor(m) {
    super(m);

    // Defaults
    this.classes = [];
    this.text = '';
  }

  // Init module
  // =========================================================================
  init() {
    // Vars
    this.classes = this.el.classList;
    this.text = this.el.dataset.text;

    // Determine which Swiper to configure depending on the class
    if (this.classes.contains('js-home-tagline')) {
      this.homepageTagline();
    }
    if (this.classes.contains('js-home-headline')) {
      this.bannerHeadline();
    }
  }

  // Homepage Tagline
  // =========================================================================
  homepageTagline() {
    gsap.to(this.el, {
      duration: 2,
      text: this.text,
      delay: 1.5,
      ease: 'none',
    });
  }

  // Banner Headlines
  // =========================================================================
  bannerHeadline() {
      // split elements with the utility class into lines, words and characters
      // whenever you use autoSplit: true, ALWAYS create your animations in the onSplit()
      SplitText.create('.u-split', {
        type: 'words,lines',
        autoSplit: true,
        onSplit(self) {
          // now animate the characters in a staggered fashion
          return gsap.from(self.words, {
            duration: 0.5,
            y: 36,        // animate from 36px below
            autoAlpha: 0, // fade in from opacity: 0 and visibility: hidden
            stagger: 0.1  // 0.1 seconds between each
          });
        }
      });
  }

  // Destroy
  // =========================================================================
  destroy() {}
}
