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
    
    <section id="gallery" class="gallery">
        
        <?php
            /*
            wp_list_pages( array(
                'title_li' => '',
                'child_of' => $post->ID
            ) );
            */
        ?>
        
        <?php
            //get_template_part('template-parts/gallery-project','');
        ?>
        
        <?php
            $mypages = get_pages( array(
                'child_of' => $post->ID,
                'sort_column' => 'post_date',
                'sort_order' => 'desc'
            ) );
            
            foreach( $mypages as $page ) {      
                $content = $page->post_content;
                if ( ! $content ) // Check for empty page
                    continue;
                    
                $pageThumb = wp_get_attachment_image_src( get_post_thumbnail_id( $page->ID ), 'full' );
                $pageExcerpt = get_the_excerpt( $post );
        ?>
            <figure class="gallery-project">
                
                <img src="<?php echo $pageThumb[0]; ?>" alt="" class="gallery-project-image" />
                    
                <figcaption class="gallery-project-content">
                    
                    <h2 class="gallery-project-header">
                        <a href="<?php echo get_page_link( $page->ID ); ?>">
                            <?php echo $page->post_title; ?>
                        </a>
                    </h2>
                    
                    <p class="gallery-project-excerpt">
                        <?php
                            // echo $pageExcerpt;
                        ?>
                        <a href="<?php echo get_page_link( $page->ID ); ?>">Click to see project</a>
                    </p>
                    
                    <a href="<?php echo get_page_link( $page->ID ); ?>" class="gallery-project-link btn">See Project</a>
                    
                </figcaption>
                
            </figure>
        <?php
            }   
        ?>
        
        <?php 
            // echo $projGrid;
        ?>
    </section>
    
    <article id="<?php echo $entryId ?>" class="project-all-content">
		<?php the_content(); ?>
    </article>
    
    <footer class="project-all-footer"></footer>
    
</section>