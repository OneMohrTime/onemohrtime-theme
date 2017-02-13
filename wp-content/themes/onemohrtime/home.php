<?php
/**
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
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
                    <?php wp_list_categories(array(
                        'orderby' => 'name',
                        'exclude' => array(1,13),
                        'current_category' => '',
                        'title_li' => '',
                        'show_option_all' => 'All Categories'
                    )); ?>
                </ul>
            </nav>
            
            <?php query_posts('cat=-1,-13'); ?>
            
			<?php while(have_posts()): the_post();
                get_template_part('template-parts/content-blog','page');
            endwhile; ?>
            
            <?php echo get_template_part('template-parts/contact'); ?>
            
		</main>
	</div>
    
<?php

get_sidebar('blog-listing');

get_footer();