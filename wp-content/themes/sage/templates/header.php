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