/** =======================================================================
 * Components / Dribbble
 * ===================================================================== */

import {$,jQuery} from 'jquery';

export default function dribbble() {

  // use jQuery
  window.$ = $;
  window.jQuery = jQuery;

  /**
   * Dribbble galleries
   */

  // Set the Access Token
  const accessToken   = '49a19ad15272251972056008d1f46e1be28cca04264a5ddf535cb735a2bf2ac6';
  const numberOfShots = '6';

  // Call Dribbble v2 API
  // getDribbbles: function(access_token) {
  //   $.getJSON('https://api.dribbble.com/v2/user/shots?access_token=' + access_token).success(function(data) {
  //     for (i = 0; i < 6; i++) {
  //       var shotId = data[i].id,
  //         shotImg = data[i].images.normal,
  //         shotTitle = data[i].title,
  //         shotDate = data[i].created_at,
  //         shotUrl = data[i].html_url;
  //       $('.dribbble-list').append('<li class="dribbble-list__item grid-col"><a href="' + shotUrl + '"><article class="dribbble"><header class="dribbble__detail"><h1 class="dribbble__title">' + shotTitle + '</h1></header><img class="dribbble__thumb" src="' + shotImg + '" width="320" height="240" alt="' + shotTitle + '" /></article></a></li>');
  //     }
  //   });
  // },
  $.ajax({
    url: 'https://api.dribbble.com/v2/user/shots?per_page=' + numberOfShots + '&access_token=' + accessToken,
    dataType: 'json',
    type: 'GET',
    success: function( data ) {
      if ( 0 < data.length ) {
        $.each( data.reverse(), function( i, val ) {

          // strip tags off to avoid front-end code breaking
          var description = val.description.replace( /(<([^>]+)>)/gi, '' ) || val.title;

          // manually truncate description
          var trimmedDesc = jQuery.trim( description ).substring( 0, 80 ).trim( this ) + '...';

          $( '#dribbbles' ).prepend(
            '<figure id="shot_' + val.id + '" class="shot"><a class="shot__link" href="' + val.html_url + '" target="_blank" title="See ' + val.title + ' on Dribbble" aria-label="' + val.title + '"></a><img src="' + val.images.teaser + '" alt="' + val.title + '" srcset="' + val.images.normal + ' 400w, ' + val.images.hidpi + ' 800w" class="shot__image" /><figcaption class="shot--hover"><h3 class="shot__headline _headline -underline">' + val.title + '</h3><span class="shot__description">' + trimmedDesc + '</span></figcaption></figure>'
          );
        });
      } else {
        $( '#dribbbles' ).append( '<code>Error loading shots. Try <a href="javascript:history.go(0);">reloading</a> the page?</code>' );
      }
    }
  });

}
