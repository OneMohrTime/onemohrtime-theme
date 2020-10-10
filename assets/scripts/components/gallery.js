/** =======================================================================
 * Components / Gallery
 * ===================================================================== */

import {$,jQuery} from 'jquery';

export default function gallery() {

  // use jQuery
  window.$ = $;
  window.jQuery = jQuery;

  /**
   * Change project gallery into Masonry layout
   */

  const $projGallery = $( '.project__section.project__gallery' );

  if ( $projGallery ) {
    $projGallery.each( function() {

      // reorganize with Masonry
      $projGallery.isotope({
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

  if ( $wpGallery ) {
    let sizer  = $( '<li class="blocks-gallery-sizer"></li>' );
    let gutter = $( '<li class="blocks-gallery-gutter"></li>' );
    $wpGallery.prepend( sizer, gutter );

    // reorganize with Masonry
    $wpGallery.isotope({
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
    $wpGallery.children().each( function( i, e ) {
      $( e ).find( 'a' ).attr( 'data-fancybox', 'image' );
    });
  }


  /**
   * Convert WordPress Block Galleries into Masonry layout
   */

  const $pageGallery = $( '#images' );

  if ( $pageGallery ) {

    // reorganize with Masonry
    $pageGallery.isotope({
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
    });
  }

}
