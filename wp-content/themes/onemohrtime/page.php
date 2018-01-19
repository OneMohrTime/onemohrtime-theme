<?php $bgFull = get_field('page_bg'); ?>
	
<figure class="halfie__img" style="background-image: url('<?php echo $bgFull['url']; ?>');"></figure><!-- /.halfie__img -->

<article class="halfie__content fade-content">

	<header class="halfie__header">
		<?php the_title('<h1 class="halfie__title">','</h1>'); ?>
	</header><!-- /.halfie__header -->

	<div class="fade-content wysiwyg">
		<?php the_content(); ?>
	</div>

	<footer class="halfie__footer">
		<?php if(function_exists('yoast_breadcrumb')): {
			yoast_breadcrumb('<div id="breadcrumbs" class="halfie__breadcrumb wysiwyg">','</div>');
		} endif; ?>
	</footer><!-- /.halfie__footer -->

</article><!-- /.halfie__content -->

<?php /*while(have_posts()): the_post(); ?>
	<?php get_template_part('templates/page', 'header'); ?>
	<?php get_template_part('templates/content', 'page'); ?>
<?php endwhile;*/ ?>
