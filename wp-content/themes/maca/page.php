<?php get_header(); ?>


		<div id="content-wrapper" class="wrapper">
	
		<?php while ( have_posts() ) : the_post(); 
		

			get_template_part( 'inc/format/content', 'page' );
					

		endwhile; // end of the loop. ?>

		</div><!-- wrapper -->


<?php get_footer(); ?>