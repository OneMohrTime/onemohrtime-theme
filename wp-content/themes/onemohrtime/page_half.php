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

<div id="primary" class="content-area" style="background-image: url('<?php echo $bgFull['url']; ?>');">
    <main id="main" class="site-main" role="main">
        
        <?php while(have_posts()): the_post();
            get_template_part( 'template-parts/content-half', 'page' );
        endwhile; ?>
        
        <?php echo get_template_part('template-parts/contact') ?>

    </main><!-- /.site-main -->
</div><!-- /.content-area -->
    
<?php

get_footer();