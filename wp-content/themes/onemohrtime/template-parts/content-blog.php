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
    
	<header class="posts-header animatedParent animateOnce">
        <?php if ( 'post' === get_post_type() ) : ?>
            <figure class="posts-date animated fadeInRightShort">
                <a href="<?php echo the_permalink(); ?>">
                    <span class="month"><?php echo get_the_date('M'); ?></span>
                    <span class="day"><?php echo get_the_date('d'); ?></span>
                </a>
            </figure>
        <?php endif; ?>
        <section class="posts-content animated fadeInUpShort">
            <h2 class="posts-title">
                <a href="<?php the_permalink(); ?>">
                    <?php the_title(); ?>
                </a>
            </h2>
            <?php 
                $categories_list = get_the_category_list( esc_html__( ', ', 'onemohrtime' ) );
                if ( $categories_list && onemohrtime_categorized_blog() ) {
                    printf( '<span class="cat-links">' . esc_html__( 'Posted in %1$s', 'onemohrtime' ) . '</span>', $categories_list ); // WPCS: XSS OK.
                }
            ?>
            <?php the_excerpt(); ?>
        </section>
	</header>
    
    <?php $postThumb = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'full' ); ?>
	<figure class="posts-image" style="background-image: url('<?php echo $postThumb[0]; ?>');">
        <a href="<?php the_permalink(); ?>"></a>
    </figure>
    
	<footer class="posts-footer">
		<?php 
            //onemohrtime_entry_footer();
        ?>
	</footer>
    
</article>