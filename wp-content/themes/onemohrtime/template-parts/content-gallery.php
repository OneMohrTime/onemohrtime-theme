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
    
    <section id="gallery" class="gallery animatedParent animateOnce" data-sequence="150">
        <?php
            $paged = (get_query_var('paged')) ? get_query_var('paged'): 1;
            $projects = new WP_Query(array(
                'post_type' => 'design',
                'post_status' => 'publish',
                'posts_per_page' => 6,
                'order' => 'DESC',
                'paged' => $paged
            ));
            $projCount = 1;
        ?>
        <?php if($projects->have_posts()): ?>
            <?php while($projects->have_posts()): $projects->the_post(); ?>
                <figure class="gallery-project animated fadeInUpShort" data-id="<?php echo $projCount ?>">
                    <img src="<?php echo get_the_post_thumbnail(); ?>" alt="" class="gallery-project-image" />
                    <figcaption class="gallery-project-content animatedParent animateOnce">
                        <h2 class="gallery-project-header animated fadeInDownShort">
                            <a href="<?php the_permalink ?>">
                                <?php the_title(); ?>
                            </a>
                        </h2>
                        <div class="gallery-project-excerpt animated fadeInUpShort">
                            <?php the_excerpt(); ?>
                        </div>
                        <a href="<?php the_permalink(); ?>" class="gallery-project-link animated fadeInUpShort">See Project</a>
                    </figcaption>
                </figure>
                <?php $projCount++ ?>
            <?php endwhile; ?>
            <nav class="gallery-pagination">
                <span><?php echo get_next_posts_link( 'Older Projects', $projects->max_num_pages ); ?></span>
                <span><?php echo get_previous_posts_link( 'Newer Projects' ); ?></span>
            </nav>
            <? wp_reset_query(); ?>
        <?php else: ?>
            <div class="error-project">
                <p><?php _e( 'The projects loop is broken. I&rsquo;m probably working on it.' ); ?></p>
            </div>
        <?php endif; ?>
    </section>
    
    <article id="<?php echo $entryId ?>" class="project-all-content">
		<?php the_content(); ?>
    </article>
    
    <footer class="project-all-footer"></footer>
    
</section>