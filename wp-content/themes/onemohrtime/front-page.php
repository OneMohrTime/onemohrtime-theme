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
                <h1>
                    <?php the_title(); ?>
                    <span>|</span>
                </h1>
            </div>
        </figure>
        
        <section class="homepage-intro">
            <figure>
                <img src="<?php echo $homeProfile['url']; ?>" />
                <a href="about/" class="btn">About Me</a>
            </figure>
            <article>
                <h2><span>I&rsquo;m a</span> <?php echo $homeTitle ?></h2>
                <?php the_content(); ?>
            </article>
        </section>
        
        <!--
        <section class="homepage-icons animatedParent animateOnce" data-sequence="100" data-appear-top-offset="-100">
            <img src="<?php echo $homeIcns['url']; ?>" class="animated fadeIn" data-id="1" />
            <a href="design/" class="btn" data-id="2">View Portfolio</a>
        </section>
        -->
        
        <section class="homepage-services animatedParent animateOnce" data-sequence="100" data-appear-top-offset="-100">
            <div class="service animated fadeInUpShort" data-id="1">
                <img src="http://localhost:8888/wordpress/wp-content/themes/onemohrtime/img/service-graphic-design.png" alt="graphic design" class="service-img" />
                <h4 class="service-header">Graphic Design</h4>
                <p class="service-body">Schlitz lyft intelligentsia fixie bushwick, forage raw denim raclette. Bitters gochujang whatever, cray authentic pour-over banh mi tousled.</p>
                <a href="graphic-design/" class="service-btn btn">Hear More</a>
            </div>
            <div class="service animated fadeInUpShort" data-id="2">
                <img src="http://localhost:8888/wordpress/wp-content/themes/onemohrtime/img/service-web-design.png" alt="web design" class="service-img" />
                <h4 class="service-header">Web Design</h4>
                <p class="service-body">Brunch microdosing subway tile next level disrupt. Offal gentrify chicharrones, chillwave pok pok schlitz pour-over +1 subway tile jean shorts neutra butcher semiotics.</p>
                <a href="web-design/" class="service-btn btn">Hear More</a>
            </div>
            <div class="service animated fadeInUpShort" data-id="3">
                <img src="http://localhost:8888/wordpress/wp-content/themes/onemohrtime/img/service-web-dev.png" alt="front-end development" class="service-img" />
                <h4 class="service-header">Front-end Dev</h4>
                <p class="service-body">Pok pok ennui trust fund, stumptown la croix sar- torial jianbing fap. Cred you probably haven't heard of them occupy hella, organic chicharrones tilde marfa next level.</p>
                <a href="web-dev/" class="service-btn btn">Hear More</a>
            </div>
        </section>
        
        <aside class="homepage-work">
            <a href="design/" class="btn">Featured Projects</a>
        </aside>
        
        <section class="homepage-dribbble">
            <h3>
                Latest Shots
                <span>on dribbble</span>
            </h3>
            <article class="dribbbles"></article>
        </section>
            
        <section class="homepage-contact animatedParent animateOnce" data-sequence="100" data-appear-top-offset="-100">
            <h3 class="animated fadeInUpShort" data-id="1">Like What You See?</h3>
            <a href="hello/" class="btn animated fadeInUpShort" data-id="2">Get At Me</a>
        </section>
        
		</main><!-- #main -->
	</div><!-- #primary -->

<?php 

get_footer();