<?php
/**
 * Template part for displaying posts.
 */
?>

<div id="post_<?php the_ID(); ?>" <?php post_class(); ?>>
	
	<?php $stickyImg = get_field('page_bg');
	/*
	if(!empty($stickyImg)): ?>
	<img src="<?php echo $stickyImg['url']; ?>" alt="<?php echo $stickyImg['alt']; ?>" class="entry__featured-image" />
	<?php else: ?>
	<img src="<?php the_post_thumbnail_url(); ?>" class="entry__featured-image" />
	<?php endif; */ ?>
	
	<figure class="entry__featured-image--frame" style="background-image: url(<?php the_post_thumbnail_url(); ?>);"></figure>
	
	<div class="entry__content wysiwyg">
		<!--
		<nav class="blog-post__categories">
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
		</nav>
        -->
        <header class="entry__header">
            
            <?php the_title('<h1 class="entry__title">', '</h1>');
            
            if('post' === get_post_type()): ?>
            <div class="entry__meta">
                <?php onemohrtime_posted_on(); ?>
            </div><!-- .entry-meta -->
            <?php endif; ?>
            
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
        
        <footer class="entry__footer">
            <?php onemohrtime_entry_footer(); ?>
        </footer>
        
	</div><!-- .entry__content -->
    
</div>