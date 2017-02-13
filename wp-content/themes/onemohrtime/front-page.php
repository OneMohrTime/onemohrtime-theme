<?php
/**
 * The home page template file.
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package onemohrtime
 */

get_header(); ?>
    
	<div id="primary" class="content-area">
        
		<main id="main" class="site-main" role="main">
		  
            <?php $homeHero = get_field('homepage_hero'); ?>
            <figure class="homepage-banner" style="background-image: url('<?php echo $homeHero['url']; ?>');">
                <div id="homepage_logo">
                    <h1>
                        <?php the_title(); ?>
                        <span>|</span>
                    </h1>
                </div>
            </figure>
            
            <section class="homepage-intro">
                <figure>
                    <?php $homeProfile = get_field('homepage_profile'); ?>
                    <img src="<?php echo $homeProfile['url']; $homeProfile['alt']; ?>" />
                    <a href="about/" class="btn">About Me</a>
                </figure>
                <article>
                    <?php $homeTitle = get_field('homepage_title'); ?>
                    <h2><span>I&rsquo;m a</span> <?php echo $homeTitle ?></h2>
                    <?php the_content(); ?>
                </article>
            </section>
            
            <?php if(have_rows('homepage_services')): ?>
                
                <section class="homepage-services animatedParent animateOnce" data-sequence="100">
                
                <?php while(have_rows('homepage_services')): the_row();
                    
                    $header = get_sub_field('service_title');
                    $image = get_sub_field('service_image');
                    $content = get_sub_field('service_body');
                    $link = get_sub_field('service_link'); ?>
                    
                    <figure class="service animated fadeInUpShort" data-id="<?php echo get_row_index(); ?>">
                        <?php if($header): ?>
                            <h4 class="service__header">
                                <?php echo $header; ?>
                            </h4>
                        <?php endif; ?>
                        <?php if($image): ?>
                            <img src="<?php echo $image['url']; ?>" alt="<?php echo $image['alt'] ?>" class="service__img" />
                        <?php endif; ?>
                        <?php if($content): ?>
                            <figcaption class="service__body">
                                <?php echo $content; ?>
                            </figcaption>
                        <?php endif; ?>
                        <?php if($link): ?>
                            <a href="<?php echo home_url($link,'relative'); ?>" class="service__btn btn">Hear More</a>
                        <?php endif; ?>
                    </figure>
                    
                <?php endwhile; ?>
                
                </section>
                
                <aside class="homepage-work">
                    <a href="<?php echo home_url('design','relative'); ?>" class="btn">Featured Projects</a>
                </aside>
                
            <?php endif; ?>
            
            <section class="homepage-dribbble">
                <h3>
                    Latest Shots
                    <span>on dribbble</span>
                </h3>
                <article class="dribbbles"></article>
            </section>
            
            <section class="homepage-contact animatedParent animateOnce" data-sequence="100" data-appear-top-offset="-100">
                <h3 class="animated fadeInUpShort" data-id="1">Like What You See?</h3>
                <a href="#contact" class="btn animated fadeInUpShort" data-id="2">Get At Me</a>
            </section>
            
            <?php echo get_template_part('template-parts/contact') ?>
            
		</main><!-- #main -->
	</div><!-- #primary -->
    
<?php get_footer();