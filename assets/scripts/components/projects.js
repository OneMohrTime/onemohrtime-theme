/** =======================================================================
 * Components / Projects
 * ===================================================================== */

import {$,jQuery} from 'jquery';
import 'isotope-layout';

export default function projects() {

  // use jQuery
  window.$ = $;
  window.jQuery = jQuery;

  /**
   * Filter & sort design projects
   */
  const designGallery = $( '#gallery' );

  if ( designGallery ) {

    // stack articles vertically
    designGallery.isotope({
      itemSelector: '.article',
      layoutMode: 'vertical'
    });

    // Add filtering
    const $featuredProjectFilter = $( '#featured_project_filter' );
    $featuredProjectFilter.on( 'click', 'button', function() {
      let filterValue = $( this ).attr( 'data-filter' );
      designGallery.isotope({ filter: filterValue });
    });

    // change -isActive class on buttons
    $( '.array' ).each( function( i, buttonGroup ) {
      var $buttonGroup = $( buttonGroup );
      $buttonGroup.on( 'click', 'button', function() {
        $buttonGroup.find( '.-isActive' ).removeClass( '-isActive' );
        $( this ).addClass( '-isActive' );
      });
    });
  }

}
