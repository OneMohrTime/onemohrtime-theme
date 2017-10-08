<?php get_header(); ?>

<article id="primary" class="content-area homepage">
	
	<?php $homeHero = get_field('homepage_hero'); ?>
	<figure class="homepage__banner">
		<img src="<?php echo $homeHero['sizes']['thumbnail']; ?>"
			 alt="<?php echo $homeHero['alt']; ?>"
			 class="homepage__banner--image"
			 srcset="<?php echo $homeHero['sizes']['medium']; ?> 800w,
					 <?php echo $homeHero['sizes']['large']; ?> 1600w,
					 <?php echo $homeHero['url']; ?> 1920w" />
		<h1 class="homepage__banner--title">Front-end <span class="rotate">designer,developer,creative</span></h1>
	</figure>
	
	<aside class="homepage__work content-block wysiwyg">
		<?php the_content(); ?>
		<a href="<?php echo home_url('design'); ?>">See All Projects <span class="fa fa-long-arrow-right"></span></a>
	</aside>
	
	<?php if(have_rows('homepage_slideshow')): ?>
	<section class="homepage__portfolio animatedParent animateOnce" data-sequence="100">
		
		<h2 class="homepage__portfolio--title animated fadeInUpShort" data-id="1">Latest project</h2>
			
		<?php while(have_rows('homepage_slideshow')): the_row();
			$slideImg = get_sub_field('slide_image'); ?>
			
		<figure class="laptop animated fadeInUpShort" data-id="2">
			
			<div class="laptop__bar">
				<div class="laptop__dot"></div>
				<div class="laptop__dot"></div>
				<div class="laptop__dot"></div>
			</div>
			
			<?php if($slideImg): ?>
			<img src="<?php echo $slideImg['sizes']['thumbnail'] ?>"
				 alt="<?php echo $slideImg['alt'] ?>"
				 class="laptop__screen"
				 srcset="<?php echo $slideImg['sizes']['medium'] ?> 1024w,
						 <?php echo $slideImg['sizes']['large'] ?> 1440w,
						 <?php echo $slideImg['url'] ?> 1920w" />
			
			<?php else: ?>
			<img src="http://placehold.it/1000x720" alt="placeholder image" class="laptop__screen" />
			
			<?php endif; ?>
			
		</figure>
		
		<div class="details animated fadeInUpShort" data-id="3">
			<?php
			$slideTitle = get_sub_field('slide_title');
			$slideText  = get_sub_field('slide_text');
			$slideLink  = get_sub_field('slide_link'); ?>
			
			<h3 class="details__title"><?php echo $slideTitle ?></h3>
			<div class="details__content wysiwyg">
				<?php echo $slideText ?>
				<a href="<?php echo $slideLink ?>">View Project <span class="fa fa-long-arrow-right"></span></a>
			</div>
			
		</div>
		
		<?php endwhile; ?>
		
	</section>
	<?php endif; ?>
	
	<section class="homepage__dribbble animatedParent animateOnce" data-sequence="100">
		<h2 class="homepage__dribbble--title animated fadeInUpShort" data-id="1">Latest Shots <span>on dribbble</span></h2>
		<div id="dribbbles" class="dribbbles animated fadeInUpShort" data-id="2"></div>
	</section>

	<section class="homepage__contact animatedParent animateOnce" data-sequence="100">
		<h2 class="animated fadeInUpShort" data-id="1">Like What You See?</h2>
		<a href="#contact" class="btn animated fadeInUpShort" data-id="2">Get At Me</a>
	</section>

</article>

<?php get_footer();