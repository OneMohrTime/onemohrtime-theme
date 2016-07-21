<?php
/**
 * Template part for displaying posts.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package onemohrtime
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
    
    <figure class="entry-featured-image">
        <div class="entry-featured-image-small">
            <?php the_post_thumbnail(); ?>
        </div>
        <?php
            $posts_page_id = get_option( 'page_for_posts' );
            $featuredImage = wp_get_attachment_image_src( get_post_thumbnail_id( $posts_page_id ), 'single-post-thumbnail' );
            $image = $image[0];
        ?>
        <div class="entry-featured-image-large" style="background-image: <?php echo $featuredImage; ?>">
            &nbsp;
        </div>
    </figure>
    
	<header class="entry-header">
        
		<?php
			if ( is_single() ) {
				the_title( '<h1 class="entry-title">', '</h1>' );
			} else {
				the_title( '<h2 class="entry-title"><a href="' . esc_url( get_permalink() ) . '" rel="bookmark">', '</a></h2>' );
			}
        
		if ( 'post' === get_post_type() ) : ?>
        
		<div class="entry-meta">
			<?php onemohrtime_posted_on(); ?>
		</div><!-- .entry-meta -->
        
		<?php endif; ?>
        
    </header>
    
	<div class="entry-content">
        <?php
			the_content( sprintf(
				/* translators: %s: Name of current post. */
				wp_kses( __( 'Continue reading %s <span class="meta-nav">&rarr;</span>', 'onemohrtime' ), array( 'span' => array( 'class' => array() ) ) ),
				the_title( '<span class="screen-reader-text">"', '"</span>', false )
			) );
            
			wp_link_pages( array(
				'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'onemohrtime' ),
				'after'  => '</div>',
			) );
		?>
	</div><!-- .entry-content -->
    
	<footer class="entry-footer">
		<?php onemohrtime_entry_footer(); ?>
	</footer>
    
</article>