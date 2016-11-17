<?php
/**
 * The template for displaying archive pages.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
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

            <?php
            if ( have_posts() ) : ?>
                
                <?php
                
                while ( have_posts() ) : the_post();
                    get_template_part( 'template-parts/content-blog', get_post_format() );
                endwhile;
                
            else :
                get_template_part( 'template-parts/content-blog', 'page' );
            endif; ?>
            
		</main>
	</div>
    
<?php

get_sidebar('blog-listing');

get_footer();