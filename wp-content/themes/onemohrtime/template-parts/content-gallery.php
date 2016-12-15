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
            $projects = new WP_Query(array(
                'post_type' => 'design',
                'post_status' => 'published',
                'posts_per_page' => -1
            ));
        ?>
        <?php while($projects->have_posts()): $projects->the_post(); ?>
            <figure class="gallery-project">
                <img src="<?php the_post_thumbnail_url(); ?>" alt="" class="gallery-project-image" />
                <figcaption class="gallery-project-content">
                    <h2 class="gallery-project-header">
                        <a href="<?php the_permalink ?>">
                            <?php the_title(); ?>
                        </a>
                    </h2>
                    <div class="gallery-project-excerpt">
                        <?php the_excerpt(); ?>
                    </div>
                    <a href="<?php the_permalink(); ?>" class="gallery-project-link btn">See Project</a>
                </figcaption>
            </figure>
        <?php
            endwhile;
            wp_reset_query();
        ?>
    </section>
    
    <article id="<?php echo $entryId ?>" class="project-all-content">
		<?php the_content(); ?>
    </article>
    
    <footer class="project-all-footer"></footer>
    
</section>