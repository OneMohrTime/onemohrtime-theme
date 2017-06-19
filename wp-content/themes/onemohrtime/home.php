<?php 
/**
 * The template for displaying blog posts.
 */
get_header(); ?>

<article id="primary" class="content-area posts">

	<nav class="posts__categories">
		<ul>
			<?php wp_list_categories(array(
				'orderby' => 'name',
				'exclude' => array(1,14),
				'hide_empty' => true,
				'current_category' => '',
				'title_li' => '',
				'show_option_all' => 'All Categories'
			)); ?>
		</ul>
	</nav>

	<?php query_posts('cat=-1,-14'); ?>

	<?php while(have_posts()): the_post();
		get_template_part('template-parts/content-blog','page');
	endwhile; ?>

</article>

<?php
get_sidebar('blog-listing');
get_footer();