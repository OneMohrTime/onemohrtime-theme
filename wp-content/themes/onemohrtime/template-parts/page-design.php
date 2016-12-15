<?php
/**
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package onemohrtime
 */

get_header(); ?>
    
	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">
            
			<?php
			while ( have_posts() ) : the_post();
                
				get_template_part( 'template-parts/content-gallery', 'page' );
                
			endwhile; // End of the loop.
			?>
            
		</main><!-- #main -->
	</div><!-- #primary -->
    
<?php

get_footer();
/*
<section class="project-all">
    
	<header class="project-all-header">
		<?php the_title( '<h1 class="project-all-title">', '</h1>' ); ?>
	</header>
    
    <section id="gallery" class="gallery">
        
        <?php
            if ( get_query_var('paged') ) {
                $paged = get_query_var('paged');
            } elseif ( get_query_var('page') ) { // 'page' is used instead of 'paged' on Static Front Page
                $paged = get_query_var('page');
            } else {
                $paged = 1;
            }
            $projects = array(
                'post_parent' => $post->ID,
                'post_type' => 'design',
                'posts_per_page' => get_option('posts_per_page'),
                'paged' => $paged,
                'orderby' => 'desc'
            );
            $childPage = new WP_Query($projects);
        ?>
        <?php
            if($childPage->have_posts()):
                while($childPage->have_posts()): $childPage->the_post();
                $pageThumb = wp_get_attachment_image_src( get_post_thumbnail_id( $page->ID ), 'full' );
            //$pagination = get_the_posts_pagination(array('mid_size' => 2));
        ?>
            <figure class="gallery-project">
                
                <img src="<?php echo $pageThumb[0]; ?>" alt="" class="gallery-project-image" />
                    
                <figcaption class="gallery-project-content">
                    
                    <h2 class="gallery-project-header">
                        <a href="<?php echo get_page_link( $post->ID ); ?>">
                            <?php echo $post->post_title; ?>
                        </a>
                    </h2>
                    
                    <div class="gallery-project-excerpt">
                        <?php the_excerpt(); ?>
                    </div>
                    
                    <a href="<?php echo get_page_link( $post->ID ); ?>" class="gallery-project-link btn">See Project</a>
                    
                </figcaption>
                
            </figure>
            <?php endwhile; ?>
            
            <?php if($childPage->max_num_pages > 1):
                $parentPage = $wp_query;
                $wp_query = $childPage;
                ?>
                <nav class="gallery-pagination">
                    <span class="gallery-pagination-span"><?php echo get_next_posts_link('Older Projects',$childPage->max_num_pages); ?></span>
                    <span class="gallery-pagination-span"><?php echo get_previous_posts_link('Newer Projects'); ?></span>
                </nav>
                <?php $wp_query = $parentPage; ?>
            <?php endif; ?>
        <?php
            wp_reset_postdata();
        endif; ?>
        
    </section>
    
    <article id="<?php echo $entryId ?>" class="project-all-content">
		<?php the_content(); ?>
    </article>
    
    <footer class="project-all-footer"></footer>
    
</section>
*/