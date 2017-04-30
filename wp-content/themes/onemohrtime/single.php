<?php
/**
 * The template for displaying all single posts.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package onemohrtime
 */

get_header(); ?>
    
	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">
            
            <nav class="posts-categories">
                <ul>
                    <?php 
                        wp_list_categories( array(
                            'orderby' => 'name',
                            'current_category' => '',
                            'exclude' => array(1,13),
                            'title_li' => '',
                            'show_option_all' => 'All Categories'
                        ) );
                    ?>
                </ul>
            </nav>
            
            <?php while ( have_posts() ) : the_post();
            
            get_template_part( 'template-parts/content', get_post_format() );
            
            the_post_navigation( array(
                'next_text' => '<span class="meta-nav" aria-hidden="true">' . esc_html__( 'Next', 'themeslug' ) . '</span> ' . '<span class="screen-reader-text">' . esc_html__( 'Next post:', 'themeslug' ) . '</span> ' . '<span class="post-title">%title</span>',
                'prev_text' => '<span class="meta-nav" aria-hidden="true">' . esc_html__( 'Previous', 'themeslug' ) . '</span> ' . '<span class="screen-reader-text">' . esc_html__( 'Previous post:', 'themeslug' ) . '</span> ' . '<span class="post-title">%title</span>',
                ) );
            
            // If comments are open or we have at least one comment, load up the comment template.
            if ( comments_open() || get_comments_number() ) :
                comments_template();
            endif;
            
            endwhile; ?>
            
		</main><!-- #main -->
	</div><!-- #primary -->
    
<?php

get_sidebar();

get_footer();