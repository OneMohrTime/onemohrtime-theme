<?php 
$post = get_post(65);
$featured_img_alt   = get_post_meta($post->ID, '_wp_attachment_image_alt', true);
$featured_img_thumb = get_the_post_thumbnail_url($post->ID, 'post-thumbnail'); 
$featured_img_med   = get_the_post_thumbnail_url($post->ID, 'medium'); 
$featured_img_large = get_the_post_thumbnail_url($post->ID, 'large'); 
$featured_img_url   = get_the_post_thumbnail_url($post->ID, 'full'); ?>

<figure class="posts__banner">
	<img src="<?php echo $featured_img_thumb; ?>"
		 alt="<?php echo $featured_img_alt; ?>"
		 class="posts__banner--image"
		 srcset="<?php echo $featured_img_med; ?> 800w,
				 <?php echo $featured_img_large; ?> 1600w,
				 <?php echo $featured_img_url; ?> 1920w" />
	<figcaption class="posts__banner--title">
		<?php the_title('<h2>', '</h2>'); ?>
	</figcaption>
	<a href="#contact" class="posts__banner--contact btn"><span class="fa fa-long-arrow-left"></span> Contact</a>
</figure>

<!--<nav class="posts__categories">
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

<article class="posts__article wysiwyg">
	<?php the_content(); ?>
</article>

<?php query_posts('cat=-1,-14'); ?>

<?php while(have_posts()): the_post();
	get_template_part('templates/content', get_post_type() != 'post' ? get_post_type() : get_post_format());
endwhile; ?>

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