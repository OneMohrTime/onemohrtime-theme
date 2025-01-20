// =============================================================================
// Modules: FitText
// =============================================================================
// FitText makes font-sizes flexible. Use this plugin on your fluid or
// responsive layout to achieve scalable headlines that fill the width of
// a parent element.

// Import dependencies
// =============================================================================
import { module as es6Module } from 'modujs';

// Set default function and extend it ontop of our imported 'module'
// =============================================================================
export default class extends es6Module {

  // Set initial values
  // =========================================================================
  constructor(m) {
    super(m);

    // Default
    this.fitTextInstances = [];
  }

  // FitText function
  // =========================================================================
  fitText(el, kompressor, options) {
    const addEvent = (el, type, fn) => {
      if (el.addEventListener)
        el.addEventListener(type, fn, false);
      else
        el.attachEvent('on' + type, fn);
    };

    const extend = (obj, ext) => {
      for (const key in ext)
        if (ext.hasOwnProperty(key))
          obj[key] = ext[key];
      return obj;
    };

    const settings = extend({
      minFontSize: -Infinity,
      maxFontSize: Infinity
    }, options);

    const fit = (el) => {
      const compressor = kompressor || 1;

      const resizer = () => {
        el.style.fontSize = Math.max(Math.min(el.clientWidth / (compressor * 10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)) + 'px';
      };

      resizer();
      addEvent(window, 'resize', resizer);
      addEvent(window, 'orientationchange', resizer);

      this.fitTextInstances.push({ el, resizer });
    };

    if (el.length) {
      for (let i = 0; i < el.length; i++)
        fit(el[i]);
    } else {
      fit(el);
    }

    return el;
  }

  // Init module
  // =========================================================================
  init() {
    // this.fitText(this.el);
    this.fitText(this.el, 0.8, { minFontSize: '24px', maxFontSize: '240px' });
  }

  // Destroy
  // =========================================================================
  destroy() {
    this.fitTextInstances.forEach(({ el, resizer }) => {
      window.removeEventListener('resize', resizer);
      window.removeEventListener('orientationchange', resizer);
    });
    this.fitTextInstances = [];
  }
}
