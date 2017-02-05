<?php
/**
 * Template Name: Half-Page
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package onemohrtime
 */

get_header(); ?>
    
	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">
            
			<?php while ( have_posts() ) : the_post();
				get_template_part( 'template-parts/content-half', 'page' );
			endwhile;  ?>
            
            <?php echo get_template_part('template-parts/contact') ?>
            
		</main><!-- #main -->
	</div><!-- #primary -->
    
<?php

get_footer();