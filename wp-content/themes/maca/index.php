<?php get_header(); ?>


		<div id="content-wrapper" class="wrapper">


		<?php if ($wp_query->have_posts()) : while($wp_query->have_posts()) : $wp_query->the_post(); ?>

			<?php if ( get_post_format() ) {
				get_template_part( 'inc/format/content', get_post_format() );
			} else {
				get_template_part( 'inc/format/content','single' );
			} ?>

		<?php endwhile; endif; ?>
		

		</div><!-- wrapper -->
		<div class="container">
<?php akmanda_pagination($pages = '', $range = 2); ?>
		</div>



<?php get_footer(); ?>