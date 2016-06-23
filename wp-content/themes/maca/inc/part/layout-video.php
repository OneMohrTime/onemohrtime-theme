<div class="entry-video row"> 
			<?php 
			$video_url = get_field('video_url');
			$video_embed = get_field('video_embed');
			$video_file = get_field('video_file');
			
			if($video_url !== ''){ 
				 echo wp_oembed_get($video_url);
			} 
			
			elseif($video_embed !== '') { 
				 echo $video_embed;
			}

			elseif($video_file !== '') {  ?>

			<?php echo do_shortcode( '[video src="'.$video_file.'"]' ) ?>
				 

			<?php } ?>

</div>
