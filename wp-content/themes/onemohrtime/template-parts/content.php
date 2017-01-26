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
    
    <?php
        //$posts_page_id = get_option( 'page_for_posts' );
        $featuredImage = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'full' );
    ?>
    <!--<figure class="entry-featured-image" style="background-image: url('<?php echo $featuredImage[0]; ?>')">
        
    </figure>-->
    <figure class="entry-featured-image">
        <div class="entry-featured-image-frame">
            <img src="<?php the_post_thumbnail_url(); ?>" />
        </div>
    </figure>
    
	<div class="entry-content">
        
        <header class="entry-header">
            
            <?php
                the_title( '<h1 class="entry-title">', '</h1>' );
                
                if ( 'post' === get_post_type() ) : ?>
                
                <div class="entry-meta">
                    <?php onemohrtime_posted_on(); ?>
                </div><!-- .entry-meta -->
                
            <?php endif; ?>
            
        </header>
        
        <?php
            if (function_exists('yoast_breadcrumb')) {
                yoast_breadcrumb('<div id="breadcrumbs"><p>','</p></div>');
            }
        ?>
        
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
        
        <footer class="entry-footer">
            <?php onemohrtime_entry_footer(); ?>
        </footer>
        
	</div><!-- .entry-content -->
    
</article>