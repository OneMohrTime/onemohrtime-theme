<?php
/**
 * The template for displaying archive pages.
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
	</nav><!-- /.posts__categories -->
	
	<?php if(have_posts()): ?>
	
	<?php while(have_posts()): the_post();
		get_template_part('template-parts/content-blog', get_post_format());
	endwhile;
	
	else:
		get_template_part( 'template-parts/content-blog', 'page' );
	endif; ?>
	
</article><!-- /.content-area -->

<?php
get_sidebar();
get_footer();