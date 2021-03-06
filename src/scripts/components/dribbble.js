/** =======================================================================
 * Components / Dribbble
 * ===================================================================== */

export default function dribbble() {

  /**
   * Dribbble galleries
   */

  // Check for Dribbble on page
  const dribbbles = document.querySelector('#dribbbles');

  if (!dribbbles) {
    return;
  }

  // dribbbles.classList.add('-getFaded')

  // Set the Access Token
  const accessToken   = '49a19ad15272251972056008d1f46e1be28cca04264a5ddf535cb735a2bf2ac6';
  const numberOfShots = 6;
  const todaysDate    = new Date().toISOString();

  // Call Dribbble v2 API
  $.ajax({
    url: 'https://api.dribbble.com/v2/user/shots?access_token=' + accessToken + '&published_at=' + todaysDate,
    dataType: 'json',
    type: 'GET',
    success: function( data ) {
      if ( 0 < data.length ) {
        for (let i = 0; i < numberOfShots; i++) {
          let title       = data[i].title || '';
          let htmlUrl     = data[i].html_url || 'https://dribbble.com/onemohrtime';
          let teaserUrl   = data[i].images.teaser || null;
          let normalUrl   = data[i].images.normal || null;
          let hidpiUrl    = data[i].images.hidpi || null;
          // strip tags off to avoid front-end code breaking
          let description = data[i].description.replace( /(<([^>]+)>)/gi, '' ) || data[i].title;
          // manually truncate description
          let trimmedDesc = jQuery.trim( description ).substring( 0, 80 ).trim( this ) + '...';
          // build out html shot
          $('#dribbbles').append(`
            <figure id="shot_${data[i].id}" class="shot">
              <a class="shot__link" href="${hidpiUrl}" data-fancybox="dribbble" data-caption="${description}" title="See ${title} on Dribbble" aria-describedby="caption-${i}">Click to see ${title} on Dribbble</a>
              <img src="${teaserUrl}" alt="${title}" srcset="${normalUrl} 800w, ${hidpiUrl} 1600w" class="shot__image" />
              <figcaption class="shot--hover" id="caption-${i}">
                <h3 class="shot__headline _headline -underline">${title}</h3>
                <div class="shot__description">
                  <span>${trimmedDesc}</span>
                  <div class="shot__button">
                    <a href="${htmlUrl}" target="_blank">See on Dribbble</a>
                  </div>
                </div>
              </figcaption>
            </figure>
          `);
        }
      } else {
        $( '#dribbbles' ).append( '<div class="-wysiwyg"><p>Error loading shots. Try <a href="javascript:history.go(0);">reloading</a> the page?</p></div>' );
      }
    }
  });
}
