<?php
/**
 * Template part for displaying page content in page_gallery.php.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package onemohrtime
 */

?>

<section class="project-all">
    
	<header class="project-all-header">
		<?php the_title( '<h1 class="project-all-title">', '</h1>' ); ?>
	</header>
    
    <section id="gallery" class="gallery">
        
        <?php
            $projects = array(
                'post_parent' => $post->ID,
                'post_type' => 'page',
                'orderby' => 'desc'
            );
            $childPage = new WP_Query($projects);
        ?>
        <?php
            while($childPage->have_posts()): $childPage->the_post();
            $pageThumb = wp_get_attachment_image_src( get_post_thumbnail_id( $page->ID ), 'full' );
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
        <?php wp_reset_postdata(); ?>
    </section>
    
    <article id="<?php echo $entryId ?>" class="project-all-content">
		<?php the_content(); ?>
    </article>
    
    <footer class="project-all-footer"></footer>
    
</section>