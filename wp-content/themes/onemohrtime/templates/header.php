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
			'menu_id'        => 'desktop_menu',
			'container'      => '',
			'depth'          => '1',
			'theme_location' => 'primary_navigation'
		)); ?>
		
	</nav><!-- /.main-navigation -->
	
	<a href="<?php echo home_url(); ?>" class="site__header--logo">
		<?php
		$custom_logo_id = get_theme_mod('custom_logo');
		$logo = wp_get_attachment_image_src($custom_logo_id , 'full');
		if(has_custom_logo()) {
			echo '<img src="'. esc_url( $logo[0] ) .'">';
		} else {
			echo '<h1>'. get_bloginfo( 'name' ) .'</h1>';
		} ?>
	</a>
	
	<?php
	// Mobile Menu
	wp_nav_menu(array(
		'menu_class'     => '',
		'menu_id'        => '',
		'container'      => '',
		//'container_class' => 'mobile-menu',
		//'container_id' => 'mobile_menu',
		'theme_location' => 'primary_navigation',
		'items_wrap'     => '<ul id="mobile_menu" class="menu__mobile">%3$s</ul>'
	)); ?>
	
</header><!-- /.site__header -->