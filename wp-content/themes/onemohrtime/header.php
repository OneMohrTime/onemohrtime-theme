<!doctype html>
<html <?php language_attributes(); ?>>
    
<head>
	
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="http://gmpg.org/xfn/11" />
    <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />
    
    <meta name="msvalidate.01" content="6C74BDEA0684C6599CD7829CA7630D48" />
    
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
    
	<header id="masthead" class="site__header" role="banner">
		
		<div id="menu_toggle" class="toggle__menu">
			<!-- https://codepen.io/RobinBertilsson/pen/EPaLmo -->
			<span class="m">M</span>
			<span class="e">
				<span class="bar"></span>
				<span class="bar"></span>
				<span class="bar"></span>
			</span>
			<span class="n">N</span>
			<span class="u">U</span>
		</div>
		
		<nav id="desktop" class="main-navigation" role="navigation">
			
            <?php
            // Desktop Menu
            wp_nav_menu(array(
                'menu_id' => 'desktop_menu',
                'container' => '',
                'depth' => '1',
                'theme_location' => 'desktop-menu'
            )); ?>
			
		</nav><!-- /.main-navigation -->
		
		<a href="<?php echo home_url(); ?>" class="site__header--logo">
			<img src="<?php echo get_template_directory_uri() . '/img/logo-color-rotate.gif' ?>" alt="onemohrtime design logo" />
		</a>
        
		<a href="<?php home_url('contact','relative') ?>" class="contact-toggle">
			<i class="fa fa-envelope-o"></i>
		</a>
		
		<?php
		// Mobile Menu
		wp_nav_menu(array(
			'menu_class' => '',
			'menu_id' => '',
			'container' => '',
			//'container_class' => 'mobile-menu',
			//'container_id' => 'mobile_menu',
			'theme_location' => 'primary',
			'items_wrap' => '<ul id="mobile_menu" class="menu__mobile">%3$s</ul>'
		)); ?>
        
	</header><!-- /.site__header -->
    
	<main id="main" class="site__main">