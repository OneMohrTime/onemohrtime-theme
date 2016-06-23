<?php
/**
 * Template part for displaying page content in page.php.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package onemohrtime
 */

?>

<?php
    // vars
    $entryId = get_field('entry_id');
    $entryTitle = get_field('entry_title');
    $projectName = get_field('project_title');
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<header class="entry-header">
		<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
	</header><!-- .entry-header -->

	<div id="<?php echo $entryId ?>" class="entry-content">
        
        <?php if( get_field('project_title') ): ?>
            <h1 class="section-title"><?php echo the_field('project_title'); ?></h1>
        <?php endif; ?>
        
        <?php if( get_field('entry_title') ): ?>
            <h3><?php echo the_field('entry_title'); ?></h3>
        <?php endif; ?>
        
		<?php
            
			the_content();
            
			wp_link_pages( array(
				'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'onemohrtime' ),
				'after'  => '</div>',
			) );
            
		?>
        
	</div><!-- .entry-content -->

	<footer class="entry-footer">
		<?php
			edit_post_link(
				sprintf(
					/* translators: %s: Name of current post */
					esc_html__( 'Edit %s', 'onemohrtime' ),
					the_title( '<span class="screen-reader-text">"', '"</span>', false )
				),
				'<span class="edit-link">',
				'</span>'
			);
		?>
	</footer><!-- .entry-footer -->
</article><!-- #post-## -->