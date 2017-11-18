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
	
	<?php query_posts('cat=-1,-14'); ?>
	
	<?php while(have_posts()): the_post();
		get_template_part('template/content','single');
	endwhile; ?>
	
</article><!-- /.content-area -->

<?php /* get_template_part('templates/page', 'header'); ?>

<?php if (!have_posts()) : ?>
  <div class="alert alert-warning">
    <?php _e('Sorry, no results were found.', 'onemohrtime'); ?>
  </div>
  <?php get_search_form(); ?>
<?php endif; ?>

<?php
while (have_posts()) : the_post();
get_template_part('templates/content', get_post_type() != 'post' ? get_post_type() : get_post_format());
endwhile; ?>

<?php the_posts_navigation();*/ ?>