<!doctype html>

<html <?php language_attributes(); ?>>
<head>
    
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="http://gmpg.org/xfn/11" />
    <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />
    
    <meta name="msvalidate.01" content="6C74BDEA0684C6599CD7829CA7630D48" />
    
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Montserrat:400,700|Bitter:400,400i,700" />
    
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

<script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    
    ga('create', 'UA-19790921-2', 'auto');
    ga('send', 'pageview');
</script>

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
		<nav id="site-navigation" class="main-navigation" role="navigation">
            <button id="menu__toggle" class="menu-toggle">
                <span class="menuTrigger">
                    <span class="mainLine"></span>
                </span>
            </button>
            <?php
            // Desktop Menu
            wp_nav_menu(array(
                'theme_location' => 'desktop-menu',
                'menu_id' => 'desktop_menu',
                'depth' => '1'
            ));
            ?>
            <a href="<?php home_url('contact','relative') ?>" class="btn contact-toggle"><i class="fa fa-envelope-o"></i></a>
            
            <a href="<?php echo home_url(); ?>" class="desktop-logo">
                <img src="<?php echo get_template_directory_uri() . '/img/logo-color-rotate.gif' ?>" alt="onemohrtime design logo" class="responsive" />
            </a>
            
		</nav>
        
        <nav id="mobile_menu" class="mobile-menu">
            <button id="menu__close" class="mobile-menu__close">&times;</button>
            <figure class="menu__logo">
                <img src="<?php echo get_template_directory_uri() . '/img/logo-color.png' ?>" alt="onemohrtime design" />
            </figure>
            <?php
            // Mobile Menu
            wp_nav_menu(array(
                'menu_class' => '',
                'menu_id' => '',
                'container' => '',
                //'container_class' => 'mobile-menu',
                //'container_id' => 'mobile_menu',
                'theme_location' => 'primary',
                'items_wrap' => '<ul class="menu">%3$s</ul>'
            )); ?>
        </nav>
        
        <div id="screen_fade" class="menu__fade"></div>
        
	</header>
    
	<div id="content" class="site-content">