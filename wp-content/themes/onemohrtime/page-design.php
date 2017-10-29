<?php get_header(); ?>

<article id="primary" class="content-area gallery">
	
	<header class="gallery__header">
		<?php the_title('<h1 class="gallery__title">', '</h1>'); ?>
	</header>
	
	<?php $projects = get_field('project_grid'); ?>
            
	<?php if($projects): $i = 0; ?>
	<section class="gallery__grid animatedParent animateOnce" data-sequence="150">
		
		<?php foreach($projects as $post): setup_postdata($post); $i++; ?>
		
		<figure class="gallery__project animated fadeInUpShort" data-id="<?php echo $i; ?>">
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
	
	<section class="gallery__dribbble animatedParent animateOnce" data-sequence="100">
		<h2 class="gallery__dribbble--title animated fadeInUpShort" data-id="1">Latest Shots <span>on dribbble</span></h2>
		<p class="gallery__dribbble--content wysiwyg animated fadeInUpShort" data-id="2">
			I generally post a lot more on <a href="//dribbble.com/onemohrtime" target="_blank">dribbble</a> than I do here. They aren&rsquo;t full-blown projects as often, so it will be more up to date. Plus, it&rsquo;s just a cool site to hang around on.
		</p>
		<div id="dribbbles" class="dribbbles"></div>
	</section>
	
</article><!-- /.content-area -->
    
<?php get_footer();