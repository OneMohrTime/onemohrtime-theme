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

    <?php
        // homepage variables
        $homeHero = get_field('homepage_hero');
        $homeLogo = get_field('homepage_logo');
        $homeTitle = get_field('homepage_title');
        $homeProfile = get_field('homepage_profile');
        $homeIcns = get_field('homepage_icons');
    ?>

	<div id="primary" class="content-area">
        
		<main id="main" class="site-main" role="main">
		
        <figure class="homepage-banner" style="background-image: url('<?php echo $homeHero['url']; ?>');">
            <!--<img src="<?php echo $homeLogo['url']; $homeLogo['alt']; ?>" id="homepage_logo" />-->
            <div id="homepage_logo">
                <h1>Freelance Designer.<span>|</span></h1>
            </div>
        </figure>
        
        <section class="homepage-intro animatedParent animateOnce">
            <figure class="animated fadeInLeftShort">
                <img src="<?php echo $homeProfile['url']; ?>" />
                <a href="about" class="btn">About Me</a>
            </figure>
            <article class="animated fadeInRightShort">
                <h2><span>I&rsquo;m a</span> <?php echo $homeTitle ?></h2>
                <?php the_content(); ?>
            </article>
        </section>
        
        <?php 
            //echo do_shortcode("[metaslider id=101]"); 
        ?>
            
        <section class="homepage-icons animatedParent animateOnce" data-sequence="100" data-appear-top-offset="-100">
            <img src="<?php echo $homeIcns['url']; ?>" class="animated fadeIn" data-id="1" />
            <a href="design/" class="btn" data-id="2">View Portfolio</a>
        </section>
        
        <section class="homepage-dribbble">
            <h3>
                Latest Shots
                <span>on dribbble</span>
            </h3>
            <article class="dribbbles"></article>
        </section>
            
        <section class="homepage-contact animatedParent animateOnce" data-sequence="100" data-appear-top-offset="-100">
            <h3 class="animated fadeInUpShort" data-id="1">Like What You See?</h3>
            <a href="hello" class="btn animated fadeInUpShort" data-id="2">Get At Me</a>
        </section>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php
//get_sidebar();
get_footer();