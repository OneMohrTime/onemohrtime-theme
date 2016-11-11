<?php
/**
 * Template part for displaying page content in page_project.php.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package onemohrtime
 */

?>

<section class="project">
    
	<header class="project-header">
        
        <?php
        $projBanner = get_field('project_banner');
        if(!empty($projBanner)): ?>
            <figure class="project-banner animatedParent animateOnce" style="background-image: url(<?php echo $projBanner['url']; ?>);">
                <!--<img src="<?php echo $projBanner['url']; ?>" alt="<?php echo $projBanner['alt']; ?>" />-->
                <?php
                    $btnLink = get_field('project_link');
                    if(!empty($btnLink)): ?>
                    <a href="//<?php echo $btnLink ?>" target="_blank" class="btn animated fadeInRightShort">View Site</a>
                <?php endif; ?>
            </figure>
        <?php endif; ?>
        
        <?php
            if ( function_exists('yoast_breadcrumb') ) 
            {yoast_breadcrumb('<p id="breadcrumbs">','</p>');}
        ?>
        
        <hgroup class="animatedParent animateOnce" data-sequence="100">
            <?php the_title( '<h1 class="project-title animated fadeInUpShort" data-id="1">', '</h1>' ); ?>
            
            <?php if (get_field('project_dates')): ?>
                <h2 class="proj-dates animated fadeInUpShort" data-id="2"><?php the_field('project_dates'); ?></h2>
            <?php endif; ?>
        </hgroup>
        
	</header>
    
	<article id="<?php echo $entryId ?>" class="project-description">
        
		<?php the_content(); ?>
        
    </article>
    
    <aside class="project-specs">
        <?php
        $projTable = get_field( 'project_specs' );
        if ( $projTable ) {
            echo '<h4>Additional Project Details</h4>';
            echo '<ul>';
                foreach ( $projTable['body'] as $tr ) {
                    foreach ( $tr as $td ) {
                        echo '<li>';
                            echo $td['c'];
                        echo '</li>';
                    }
                }
            echo '</ul>';
        }
        ?>
    </aside>
    
</section>