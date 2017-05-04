<?php
/**
 * Template Name: Project
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package onemohrtime
 */

get_header(); ?>
    
	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">
            
			<?php while(have_posts()): the_post();
				get_template_part( 'template-parts/content-project', 'page' );
			endwhile; ?>
            
            <?php echo get_template_part('template-parts/contact') ?>
            
		</main><!-- /.site-main -->
	</div><!-- /.content-area -->
    
<?php get_footer();