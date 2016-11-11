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
    
    <img src="" alt="project" />
    
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