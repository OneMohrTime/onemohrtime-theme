<div class="entry-audio row">
			<?php 
			$audio_url = get_field('audio_url');
			$audio_embed = get_field('audio_embed');
			$audio_file = get_field('audio_file');
			
			if($audio_url !== ''){ 
				 echo wp_oembed_get($audio_url);
			} 
			
			elseif($audio_embed !== '') { 
				 echo $audio_embed;
			}

			elseif($audio_file !== '') {  ?>

				 <audio controls="controls">  
				   <source src="<?php echo $audio_file; ?>" />  
				</audio>
			<?php } ?>

</div>
