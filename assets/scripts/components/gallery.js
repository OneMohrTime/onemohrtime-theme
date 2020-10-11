/** =======================================================================
 * Components / Gallery
 * ===================================================================== */

import Isotope from 'isotope-layout';

export default function gallery() {

  /**
   * Change project gallery into Masonry layout
   */

  const $projGallery = $( '.project__section.project__gallery' );

  if ( $projGallery.length ) {
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

  if ( $wpGallery.length ) {
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


  /**
   * Convert WordPress Block Galleries into Masonry layout
   */

  const pageGallery = document.getElementById('images');

  if ( pageGallery.length ) {
    // reorganize with Masonry
    const pageGalleryIso = new Isotope( pageGallery, {
      itemSelector: '.js-image',
      percentPosition: true,
      masonry: {
        columnWidth: '.-sizer',
        gutter: '.-gutter',
        horizontalOrder: true
      },
      hiddenStyle: {
        opacity: 0
      },
      visibleStyle: {
        opacity: 1
      }
    }, 0);
  }
}
