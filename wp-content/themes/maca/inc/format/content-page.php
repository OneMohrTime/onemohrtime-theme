<article  id="post-<?php the_ID(); ?>" <?php post_class( 'post clearfix'); ?>>


<div data-scrollReveal="bottom move" class="post-content container clearfix">
        <?php loop_post_thumbnail(); ?> 
                  
            <div class="post-entry col-md-12">                                                             
                <?php akmanda_post_title();?> 
                <div class="bord"></div>
                <?php akmanda_content(); ?>  

             
                     
            </div> 
            
</div><!-- post-content -->     
</article><!-- #post-<?php the_ID(); ?> -->