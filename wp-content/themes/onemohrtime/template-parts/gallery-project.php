<?php
/**
 * Template part for displaying projects in #gallery in content-gallery.php
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package onemohrtime
 */

?>

<figure class="gallery-project">
    
    <img src="//placehold.it/600" alt="project" />
    
    <figcaption class="gallery-project-content">
        <header class="gallery-project-header">
            <h2><?php the_title(); ?></h2>
        </header>
        <p class="gallery-project-excerpt">
            <?php the_excerpt(); ?>
        </p>
        <div class="gallery-project-link">
            <a href="#" class="btn">View</a>
        </div>
    </figcaption>
    
</figure>
<!--
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
<nav class="gallery-pagination"></nav>
        
    </section>
    
    <article id="<?php echo $entryId ?>" class="project-all-content">
		<?php the_content(); ?>
    </article>
-->