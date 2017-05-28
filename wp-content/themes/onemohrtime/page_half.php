<?php
/**
 * Template Name: Half-Page
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package onemohrtime
 */

get_header(); ?>

<?php $bgFull = get_field('page_bg'); ?>

<div id="primary" class="content-area">
    <main id="main" class="site-main halfie" role="main">
        
        <figure class="halfie__img" style="background-image: url('<?php echo $bgFull['url']; ?>');"></figure>
        
        <article class="halfie__content">
            
            <header class="halfie__header">
                <?php the_title('<h1 class="halfie__title">', '</h1>'); ?>
            </header>
            
            <div class="wysiwyg">
                <?php the_content(); ?>
            </div>
            
            <footer class="halfie__footer">
                <?php if(function_exists('yoast_breadcrumb')): {
                    yoast_breadcrumb('<div id="breadcrumbs"><p>','</p></div>');
                } endif; ?>
            </footer>
            
        </article><!-- /.halfie -->
        
        <?php echo get_template_part('template-parts/contact') ?>
        
    </main><!-- /.site-main -->
</div><!-- /.content-area -->
    
<?php get_footer();