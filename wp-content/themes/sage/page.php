<?php $bgFull = get_field('page_bg'); ?>

<div id="primary" class="content-area halfie">
	
	<figure class="halfie__img" style="background-image: url('<?php echo $bgFull['url']; ?>');"></figure>
	
	<article class="halfie__content">
		
		<header class="halfie__header">
			<?php the_title('<h1 class="halfie__title">','</h1>'); ?>
		</header><!-- /.halfie__header -->
		
		<div class="wysiwyg">
			<?php the_content(); ?>
		</div>
		
		<footer class="halfie__footer">
			<?php if(function_exists('yoast_breadcrumb')): {
				yoast_breadcrumb('<div id="breadcrumbs" class="halfie__breadcrumb wysiwyg">','</div>');
			} endif; ?>
		</footer><!-- /.halfie__footer -->
		
	</article><!-- /.halfie__content -->
	
</div><!-- /.halfie -->

<?php /*while(have_posts()): the_post(); ?>
	<?php get_template_part('templates/page', 'header'); ?>
	<?php get_template_part('templates/content', 'page'); ?>
<?php endwhile;*/ ?>
