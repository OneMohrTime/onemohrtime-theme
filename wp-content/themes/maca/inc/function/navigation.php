<?php 

//NAVIGATION

if ( ! function_exists( 'akmanda_content_nav' ) ) :
/**
 * Display navigation to next/previous pages when applicable
 */
function akmanda_content_nav( $nav_id ) {
	global $wp_query, $post;

	// Don't print empty markup on single pages if there's nowhere to navigate.
	if ( is_single() ) {
		$previous = ( is_attachment() ) ? get_post( $post->post_parent ) : get_adjacent_post( false, '', true );
		$next = get_adjacent_post( false, '', false );

		if ( ! $next && ! $previous )
			return;
	}

	// Don't print empty markup in archives if there's only one page.
	if ( $wp_query->max_num_pages < 2 && ( is_home() || is_archive() || is_search() ) )
		return;

	$nav_class = ( is_single() ) ? 'navigation-post' : 'navigation-paging';

	?>

	

	<nav role="navigation" id="<?php echo esc_attr( $nav_id ); ?>" class="<?php echo $nav_class; ?> clearfix">
	

	<?php if ( is_single() ) : // navigation links for single posts ?>

		<?php previous_post_link( '<div class="nav-previous pull-left">%link</div>', '<i class="icon icon-fontawesome-webfont-2"></i></span>' ); ?>
		<?php next_post_link( '<div class="nav-next pull-right">%link</div>', '<i class="icon icon-fontawesome-webfont-1"></i></span>' ); ?>

	<?php elseif ( $wp_query->max_num_pages > 1 && ( is_home() || is_archive() || is_search() ) ) : // navigation links for home, archive, and search pages ?>

		<?php if ( get_next_posts_link() ) : ?>
		<div class="nav-previous pull-left"><?php next_posts_link( __( '<i class="icon icon-fontawesome-webfont-2"></i>', 'maca' ) ); ?></div>
		<?php endif; ?>

		<?php if ( get_previous_posts_link() ) : ?>
		<div class="nav-next pull-right"><?php previous_posts_link( __( '<i class="icon icon-fontawesome-webfont-1"></i>', 'maca' ) ); ?></div>
		<?php endif; ?>

	<?php endif; ?>

	</nav><!-- #<?php echo esc_html( $nav_id ); ?> -->

		
	<?php
} 
endif; // akmanda_content_nav