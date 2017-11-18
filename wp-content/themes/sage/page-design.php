<header class="gallery__header"> 
	<?php the_title('<h1 class="gallery__title">', '</h1>'); ?>
</header>

<?php $projects = get_field('project_grid');

if($projects): $i = 0; ?>

<section class="gallery__grid">

	<?php foreach($projects as $post): setup_postdata($post); $i++; ?>

	<figure class="gallery__project" data-id="<?php echo $i; ?>">
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

<article class="gallery__content wysiwyg">
	<?php the_content(); ?>
</article><!-- /.gallery__content -->

<section class="gallery__dribbble">
	<h2 class="gallery__dribbble--title">Latest Shots <span>on dribbble</span></h2>
	<p class="gallery__dribbble--content wysiwyg">
		I generally post a lot more on <a href="//dribbble.com/onemohrtime" target="_blank">dribbble</a> than I do here. They aren&rsquo;t full-blown projects as often, so it will be more up to date. Plus, it&rsquo;s just a cool site to hang around on.
	</p>
	<div id="dribbbles" class="dribbbles"></div>
</section>

<?php /*while(have_posts()): the_post(); ?>
	<?php get_template_part('templates/page', 'header'); ?>
	<?php get_template_part('templates/content', 'page'); ?>
<?php endwhile;*/ ?>
