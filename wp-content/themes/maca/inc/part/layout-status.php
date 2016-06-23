  <div class="entry-status">
  <?php 
  $twitter =  get_field('twitter_status'); 
  $facebook = get_field('facebook_status'); 
  $google = get_field('google_status'); 

    if($twitter) {
      echo html_entity_decode($twitter); 
    }
    elseif($facebook) {
      echo str_replace( '&#039;', '\'', html_entity_decode($facebook) );
    }
    elseif($google) {
      echo html_entity_decode($google);
    }
  ?></div>