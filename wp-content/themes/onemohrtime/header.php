<?php
/**
 * The header for our theme.
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package onemohrtime
 */

?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="http://gmpg.org/xfn/11" />
    <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
    
    <meta name="msvalidate.01" content="6C74BDEA0684C6599CD7829CA7630D48" />
    
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Montserrat:700,400" />
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Raleway:700,500,400,300,200" />
    
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
    
<section id="loading">
    <div id="loading-center">
        <div id="loading-center-absolute">
            <div class="object" id="object_one"></div>
            <div class="object" id="object_two"></div>
            <div class="object" id="object_three"></div>
            <div class="object" id="object_four"></div>
            <div class="object" id="object_five"></div>
            <div class="object" id="object_six"></div>
            <div class="object" id="object_seven"></div>
            <div class="object" id="object_eight"></div>
            <div class="object" id="object_big"></div>
        </div>
    </div>
</section>
    
<div id="page" class="site">
	<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', 'onemohrtime' ); ?></a>
    
	<header id="masthead" class="site-header" role="banner">
		<div class="site-branding">
			<?php
			if ( is_front_page() && is_home() ) : ?>
				<h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
			<?php else : ?>
				<p class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></p>
			<?php
			endif;
            
			$description = get_bloginfo( 'description', 'display' );
			if ( $description || is_customize_preview() ) : ?>
				<p class="site-description"><?php echo $description; /* WPCS: xss ok. */ ?></p>
			<?php
			endif; ?>
		</div><!-- .site-branding -->
        
		<nav id="site-navigation" class="main-navigation" role="navigation">
            <button class="menu-toggle btn" aria-controls="primary-menu" aria-expanded="false">
                <?php esc_html_e( '', 'onemohrtime' ); ?>
                <span class="menuTrigger">
                    <span class="mainLine"></span>
                </span>
            </button>
            <a href="/wordpress/hello/" class="btn contact-toggle"><i class="fa fa-envelope-o"></i></a>
			<?php wp_nav_menu( array( 'theme_location' => 'primary', 'menu_id' => 'primary-menu' ) ); ?>
		</nav><!-- #site-navigation -->
	</header><!-- #masthead -->
    
    <?php
        // Page Vars
        $bgFull = get_field('page_bg');
    ?>
    
	<div id="content" class="site-content" style="background-image: url(<?php echo $bgFull['url']?>);">