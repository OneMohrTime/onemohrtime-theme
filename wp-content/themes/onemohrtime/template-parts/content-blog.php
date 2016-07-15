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
    
	<header class="entry-header">
        <h1 class="entry-title">
            <a href="<?php the_permalink(); ?>">
                <?php the_title(); ?>
            </a>
        </h1>
		<?php if ( 'post' === get_post_type() ) : ?>
		<div class="entry-meta">
			<?php onemohrtime_posted_on(); ?>
		</div>
		<?php endif; ?>
	</header>
    
	<div class="entry-content">
        <a href="<?php the_permalink(); ?>">
            <?php the_post_thumbnail(); ?>
        </a>
		<?php the_excerpt(); ?>
    </div>
    
	<footer class="entry-footer">
		<?php onemohrtime_entry_footer(); ?>
	</footer>
    
</article>