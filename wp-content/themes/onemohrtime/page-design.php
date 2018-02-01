<?php 
$post = get_post(638);
$featured_img_alt   = get_post_meta($post->ID, '_wp_attachment_image_alt', true);
$featured_img_thumb = get_the_post_thumbnail_url($post->ID, 'post-thumbnail'); 
$featured_img_med   = get_the_post_thumbnail_url($post->ID, 'medium'); 
$featured_img_large = get_the_post_thumbnail_url($post->ID, 'large'); 
$featured_img_url   = get_the_post_thumbnail_url($post->ID, 'full'); ?>

<figure class="gallery__banner">
	
	<img src="<?php echo $featured_img_thumb; ?>"
		 alt="<?php echo $featured_img_alt; ?>"
		 class="gallery__banner--image"
		 srcset="<?php echo $featured_img_med; ?> 800w,
				 <?php echo $featured_img_large; ?> 1600w,
				 <?php echo $featured_img_url; ?> 1920w" />
	
	<figcaption class="gallery__banner--title">
		<?php the_title('<h2>', '</h2>'); ?>
	</figcaption>
	
	<a href="#contact" class="gallery__banner--contact btn"><span class="fa fa-long-arrow-left"></span> Contact</a>
	
</figure>

<?php $projects = get_field('project_grid');

if($projects): $i = 0; ?>

<section class="gallery__grid fade-content">
	
	<?php foreach($projects as $post): setup_postdata($post); $i++; ?>
	
	<figure id="proj_id_<?php echo $i; ?>" class="gallery__project">
		
		<img src="<?php the_post_thumbnail_url(); ?>" alt="" class="gallery__project--image" />
		
		<figcaption class="gallery__project--content">
			<h2 class="gallery__project--header">
				<a href="<?php the_permalink(); ?>">
					<?php the_title(); ?>
				</a>
			</h2>
			<div class="gallery__project--excerpt wysiwyg">
				<?php the_excerpt(); ?>
			</div>
			<a href="<?php the_permalink(); ?>" class="gallery__project--link">See Project</a>
		</figcaption>
		
	</figure><!-- /.gallery__project -->
	
	<?php wp_reset_postdata();
	endforeach; ?>
	
</section><!-- /.gallery__grid -->
<?php endif; ?>

<article class="gallery__content fade-content wysiwyg">
	<?php the_content(); ?>
</article><!-- /.gallery__content -->

<section class="gallery__dribbble">
	<h2 class="gallery__dribbble--title">Latest Shots <span><a href="//dribbble.com/onemohrtime" target="_blank">on dribbble</a></span></h2>
	<p class="gallery__dribbble--content wysiwyg">
		I generally post a lot more on <a href="//dribbble.com/onemohrtime" target="_blank">dribbble</a> than I do here. They aren&rsquo;t full-blown projects as often, so it will be more up to date. Plus, it&rsquo;s just a cool site to hang around on.
	</p>
	<div id="dribbbles" class="dribbbles fade-content"></div>
</section>

<?php /*while(have_posts()): the_post(); ?>
	<?php get_template_part('templates/page', 'header'); ?>
	<?php get_template_part('templates/content', 'page'); ?>
<?php endwhile;*/ ?>
