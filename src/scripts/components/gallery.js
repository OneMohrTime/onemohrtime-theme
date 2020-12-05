/** =======================================================================
 * Components / Gallery
 * ===================================================================== */

import Isotope from 'isotope-layout';
import imagesLoaded from 'imagesloaded';

export default function gallery() {

  /**
   * Change section galleries into Masonry layout
   */

  // Find all galleries on page
  const gallery = document.querySelectorAll('._gallery');

  // Do nothing if we find none
  if (!gallery) {
    return;
  }

  // Make each NodeList of galleries into usable object
  gallery.forEach( (media) => {

    // Fade images in
    media.classList.add('get-faded')

    // Leverage imagesLoaded to delay Isotope
    imagesLoaded( media, function() {
      // init Isotope after all images have loaded
      let iso = new Isotope( media, {
        itemSelector: '.js-image',
        percentPosition: true,
        masonry: {
          columnWidth: '._sizer',
          gutter: '._gutter',
          horizontalOrder: true
        }
      });
    });
  });
}
