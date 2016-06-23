<?php
/**
 * Template part for displaying posts.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package onemohrtime
 */

?>

<section class="halfie">
    
	<header class="halfie-header">
		<?php the_title( '<h1 class="halfie-title">', '</h1>' ); ?>
	</header>

	<article class="halfie-content">
        
		<?php the_content(); ?>
        
    </article>

	<footer class="halfie-footer">
		
        <?php
            if ( function_exists('yoast_breadcrumb') ) 
            {yoast_breadcrumb('<p id="breadcrumbs">','</p>');}
        ?>
        
	</footer>
    
</section>