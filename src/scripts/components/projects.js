/** =======================================================================
 * Components / Projects
 * ===================================================================== */

import Isotope from 'isotope-layout';

export default function projects() {

  /**
   * Filter & sort design projects
   */

  const $designGallery = $( '#gallery' );

  // if ( $designGallery.length ) {

  //   // stack articles vertically
  //   const designGalleryIso = new Isotope( $designGallery, {
  //     itemSelector: '.article',
  //     layoutMode: 'vertical'
  //   });

  //   // Add filtering
  //   const $featuredProjectFilter = $( '#featured_project_filter' );
  //   $featuredProjectFilter.on( 'click', 'button', function() {
  //     let filterValue = $( this ).attr( 'data-filter' );
  //     $designGallery.isotope({ filter: filterValue });
  //   });

  //   // change -isActive class on buttons
  //   $( '.array' ).each( function( i, buttonGroup ) {
  //     var $buttonGroup = $( buttonGroup );
  //     $buttonGroup.on( 'click', 'button', function() {
  //       $buttonGroup.find( '.-isActive' ).removeClass( '-isActive' );
  //       $( this ).addClass( '-isActive' );
  //     });
  //   });
  // }

}
