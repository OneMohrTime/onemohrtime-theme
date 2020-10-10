/** =======================================================================
 * Components / Home Page
 * ===================================================================== */

import {$,jQuery} from 'jquery';

export default function homepage() {

  // use jQuery
  window.$ = $;
  window.jQuery = jQuery;

  $( function() {
    $( '#home_banner_list' ).removeClass( 'is-hidden' );
  });

}
