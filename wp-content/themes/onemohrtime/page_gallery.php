<?php
/**
 * Template Name: Gallery
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package onemohrtime
 */

get_header(); ?>
    
<div id="primary" class="content-area">
    <main id="main" class="site-main" role="main">
        
        <section class="project-all">
            
            <header class="project-all-header">
                <?php the_title('<h1 class="project-all-title">', '</h1>'); ?>
            </header>
            
            <?php $projects = get_field('project_grid'); ?>
            
            <?php if($projects): $i = 0; ?>
            <section id="gallery" class="gallery animatedParent animateOnce" data-sequence="150">
                
                <?php foreach($projects as $post): setup_postdata($post); $i++; ?>
                
                <figure class="gallery__project animated fadeInUpShort" data-id="<?php echo $i; ?>">
                    <img src="<?php the_post_thumbnail_url(); ?>" alt="" class="gallery__project--image" />
                    <figcaption class="gallery__project--content">
                        <h2 class="gallery__project--header">
                            <a href="<?php the_permalink(); ?>">
                                <?php the_title(); ?>
                            </a>
                        </h2>
                        <div class="gallery__project--excerpt wysiwyg">
                            <?php the_excerpt(); ?>
                        </div>
                        <a href="<?php the_permalink(); ?>" class="gallery__project--link">See Project</a>
                    </figcaption>
                </figure><!-- /.gallery__project -->
                
                <?php wp_reset_postdata();
                endforeach; ?>
                
            </section><!-- /.gallery -->
            <?php endif; ?>
            
            <section class="project-all-dribbble">
                <h2>Latest on <span><a href="//dribbble.com/OneMohrTime" target="_blank">Dribbble</a></span></h2>
                <div id="dribbbles" class="dribbbles"></div>
            </section>
            
            <article id="<?php echo $entryId ?>" class="project-all-content wysiwyg">
                <?php the_content(); ?>
            </article>
            
        </section>
        
        <?php echo get_template_part('template-parts/contact') ?>
        
    </main><!-- /.site-main -->
</div><!-- /.content-area -->
    
<?php get_footer();