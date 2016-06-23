<?php get_header(); ?>

		<div id="content-wrapper" class="wrapper">


		<?php while ( have_posts() ) : the_post(); 
		
			if ( get_post_format() ) {
				get_template_part( 'inc/format/content', get_post_format() );
			} 
			else {
				get_template_part( 'inc/format/content', 'single' );
			}

		endwhile; // end of the loop. ?>		


		</div><!-- wrapper -->
		
<?php get_footer(); ?>