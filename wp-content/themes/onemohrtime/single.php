<?php
/**
 * The template for displaying all single posts.
 */
get_header(); ?>

<article id="primary" class="content-area blog-post">
	
	<?php while(have_posts()): the_post();
	
	get_template_part( 'template-parts/content', get_post_format() );
	
//	the_post_navigation(array(
//		'next_text' => '<span class="meta-nav" aria-hidden="true">' . esc_html__( 'Next', 'themeslug' ) . '</span> ' . '<span class="screen-reader-text">' . esc_html__( 'Next post:', 'themeslug' ) . '</span> ' . '<span class="post-title">%title</span>',
//		'prev_text' => '<span class="meta-nav" aria-hidden="true">' . esc_html__( 'Previous', 'themeslug' ) . '</span> ' . '<span class="screen-reader-text">' . esc_html__( 'Previous post:', 'themeslug' ) . '</span> ' . '<span class="post-title">%title</span>',
//		));
	
	// If comments are open or we have at least one comment, load up the comment template.
//	if ( comments_open() || get_comments_number() ) :
//		comments_template();
//	endif;

	endwhile; ?>
	
</article><!-- /.content-area -->

<?php

get_sidebar();

get_footer();