<?php $homeHero = get_field('homepage_hero'); ?>

<figure class="homepage__banner">
	
	<img src="<?php echo $homeHero['sizes']['thumbnail']; ?>"
		 alt="<?php echo $homeHero['alt']; ?>"
		 class="homepage__banner--image"
		 srcset="<?php echo $homeHero['sizes']['medium']; ?> 800w,
				 <?php echo $homeHero['sizes']['large']; ?> 1600w,
				 <?php echo $homeHero['url']; ?> 1920w" />
	
	<figcaption class="homepage__banner--title">
		<div class="current-city">Grand Rapids, MI</div>
		<div class="current-title">Front-end</div>
		<div class="current-title--rotating">
			<span class="rotate">designer,developer,creative</span>
		</div>
	</figcaption>
	
	<a href="#contact" class="homepage__banner--contact btn"><span class="fa fa-long-arrow-left"></span> Contact</a>
	
</figure>

<article class="homepage__work content-block wysiwyg">
	<?php the_content(); ?>
	<a href="<?php echo home_url('design'); ?>">See All Projects <span class="fa fa-long-arrow-right"></span></a>
</article>
	
<section class="homepage__portfolio">
	<?php
	$post_object = get_field('homepage_feature');
	
	if( $post_object ): 
	
	// override $post
	$post = $post_object;
	setup_postdata( $post ); ?>
	
		<div class="feature fade-content">
			<div class="feature__content">
				<h2 class="feature__content--title"><a href="<?php the_permalink(); ?>"><?php echo get_the_title(); ?></a></h2>
				<?php the_excerpt(); ?>
				<a href="<?php the_permalink(); ?>">See Project <span class="fa fa-long-arrow-right"></span></a>
			</div>
			<?php the_post_thumbnail(); ?>
		</div>
			
		<?php wp_reset_postdata(); ?>
	<?php endif; ?>
</section>

<section class="homepage__dribbble">
	
	<h2 class="homepage__dribbble--title">Latest Shots <span><a href="//dribbble.com/onemohrtime" target="_blank">on dribbble</a></span></h2>
	
	<p class="homepage__dribbble--content wysiwyg">
		I generally post a lot more on <a href="//dribbble.com/onemohrtime" target="_blank">dribbble</a> than I do here. They aren&rsquo;t full-blown projects as often, so it will be more up to date. Plus, it&rsquo;s just a cool site to hang around on.
	</p>
	
	<div id="dribbbles" class="dribbbles"></div>
	
</section>

<section class="homepage__contact">
	
	<h2>Have an idea?</h2>
	
	<p class="wysiwyg">Building a website or needing some graphic design for your small business? Get in contact with me, I’ll see what I can do for you.</p>
	
	<a href="#contact" class="btn">Contact</a>
	
</section>

<?php /*while(have_posts()): the_post(); ?>
	<?php get_template_part('templates/page', 'header'); ?>
	<?php get_template_part('templates/content', 'page'); ?>
<?php endwhile; */?>