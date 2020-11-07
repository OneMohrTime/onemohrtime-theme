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


  /**
   * Change project gallery into Masonry layout
   */

  const $projGallery = $( '.project__section.project__gallery' );

  if ( $projGallery && $projGallery.length ) {
    $projGallery.each( function(index, item) {
      // reorganize with Masonry
      const projGalleryIso = new Isotope( item, {
        itemSelector: '.js-image',
        percentPosition: true,
        masonry: {
          columnWidth: '.image__sizer',
          gutter: '.image__gutter',
          horizontalOrder: true
        }
      });
    });
  }

  /**
   * Convert WordPress Block Galleries into Masonry layout
   */

  const $wpGallery = $( '.wp-block-gallery .blocks-gallery-grid' );

  if ( $wpGallery && $wpGallery.length ) {
    $wpGallery.each( function(index, item) {

      let sizer  = $( '<li class="blocks-gallery-sizer"></li>' );
      let gutter = $( '<li class="blocks-gallery-gutter"></li>' );
      $wpGallery.prepend( sizer, gutter );

      // reorganize with Masonry
      const wpGalleryIso = new Isotope( item, {
        itemSelector: '.blocks-gallery-item',
        percentPosition: true,
        masonry: {
          columnWidth: '.blocks-gallery-sizer',
          gutter: '.blocks-gallery-gutter',
          horizontalOrder: true
        }
      });

      // add .get-faded class
      $wpGallery.parent().addClass( 'get-faded' );

      // add fancybox attribute
      $wpGallery.children().each( function( index, item ) {
        $( item ).find( 'a' ).attr( 'data-fancybox', 'image' );
      });
    });
  }
}
