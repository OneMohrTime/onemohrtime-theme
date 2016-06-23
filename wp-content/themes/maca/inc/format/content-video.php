<article  id="post-<?php the_ID(); ?>" <?php post_class( 'post clearfix'); ?>>


<div data-scrollReveal="bottom move" class="post-content container clearfix">
    <?php get_template_part( 'inc/part/layout', 'video' ); ?>
                  
            <div class="post-entry col-md-12">
               
                <?php akmanda_post_title();?>                
                <?php meta_info(); ?>
                <div class="bord"></div>
                <?php akmanda_content(); ?>  
                <?php get_template_part( 'inc/part/layout', 'meta' ); ?>           
                     
            </div>

             <?php if(is_singular()){akmanda_content_nav( 'nav-below' );} ?>
 
            
</div><!-- post-content -->     
           <div class="container">
            <?php akmanda_comment_checker(); ?>            
            </div>
</article><!-- #post-<?php the_ID(); ?> -->