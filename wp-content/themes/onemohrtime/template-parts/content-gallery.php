<?php
/**
 * Template part for displaying page content in page_gallery.php.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package onemohrtime
 */

?>

<?php
    // vars
    $entryId = get_field('entry_id');
    $projGrid = get_field('project_grid');
?>

<section class="project-all">
    
	<header class="project-all-header">
		<?php the_title( '<h1 class="project-all-title">', '</h1>' ); ?>
	</header>
    
	<article id="<?php echo $entryId ?>" class="project-all-content">
        
		<?php the_content(); ?>
        
    </article>
    
    <section id="gallery">
        <?php echo $projGrid; ?>
    </section>
    
    <footer class="project-all-footer"></footer>
    
</section>