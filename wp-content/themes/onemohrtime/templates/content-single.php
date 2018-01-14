<?php $stickyImg = get_field('page_bg'); ?>

<figure class="entry__featured-image--frame" style="background-image: url(<?php the_post_thumbnail_url(); ?>);"></figure>

<div class="entry__content fade-content wysiwyg">
	
	<header class="entry__header">
		
		<?php the_title('<h1 class="entry__title">', '</h1>');
		
		get_template_part('templates/entry-meta'); ?>
		
	</header>
	
	<?php the_content(sprintf(
		/* translators: %s: Name of current post. */
		wp_kses( __( 'Continue reading %s <span class="meta-nav">&rarr;</span>', 'onemohrtime' ), array( 'span' => array( 'class' => array() ) ) ),
		the_title( '<span class="screen-reader-text">"', '"</span>', false )
	));
	
	if(function_exists('yoast_breadcrumb')) {
		yoast_breadcrumb('<div id="breadcrumbs" class="entry__breadcrumb">','</div>');
	}
	
	wp_link_pages( array(
		'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'onemohrtime' ),
		'after'  => '</div>',
	)); ?>
	
</div><!-- .entry__content -->

<?php /*while (have_posts()) : the_post(); ?>
  <article <?php post_class(); ?>>
    <header>
      <h1 class="entry-title"><?php the_title(); ?></h1>
      <?php get_template_part('templates/entry-meta'); ?>
    </header>
    <div class="entry-content">
      <?php the_content(); ?>
    </div>
    <footer>
      <?php wp_link_pages(['before' => '<nav class="page-nav"><p>' . __('Pages:', 'onemohrtime'), 'after' => '</p></nav>']); ?>
    </footer>
    <?php comments_template('/templates/comments.php'); ?>
  </article>
<?php endwhile;*/ ?>
