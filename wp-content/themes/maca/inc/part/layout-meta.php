<?php 

$hide_meta = get_field('hide_meta_info');

	if(is_singular()){
		?><div class="share-post"></div>
		<?php
	}

    if (!$hide_meta) { 
    	 ?>
    	 <div class="bord"></div> <div class="meta">  <?php
         akmanda_category();
         akmanda_tags();
		
         ?></div> <?php 
 } 