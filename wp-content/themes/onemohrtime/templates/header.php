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
	</div><!-- /.toggle-menu -->
	
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
			echo '<img src="'. esc_url( $logo[0] ) .'" alt="'. get_bloginfo( 'name' ) .'" />';
		} else {
			echo '<h1>'. get_bloginfo( 'name' ) .'</h1>';
		} ?>
	</a><!-- /.site__header--logo -->
	
	<?php
	add_filter('wp_nav_menu_objects', 'ad_filter_menu', 10, 2);
	
	function ad_filter_menu($sorted_menu_objects, $args) {
		// check for the right menu to filter
		// here we check for the menu with name 'Posts Menu'
		// given that you call it in you theme with:
		//   wp_nav_menu( array( 'menu' => 'Posts Menu' ) );
		// if you call the menu using theme_location, eg:
		//   wp_nav_menu( array( 'theme_location' => 'top_manu' ) );
		// check for:
		//   if ($args->theme_location != 'top_menu')
		if ($args->menu != 'Primary Navigation')
			return $sorted_menu_objects;
			
		// edit the menu objects
		foreach ($sorted_menu_objects as $menu_object) {
			// searching for menu items linking to posts or pages
			// can add as many post types to the array
			if ( in_array($menu_object->object, array('post', 'page', 'project')) ) {
				// set the title to the post_thumbnail if available
				// thumbnail size is the second parameter of get_the_post_thumbnail()
				$menu_object->title = has_post_thumbnail($menu_object->object_id) ? get_the_post_thumbnail($menu_object->object_id, 'thumbnail') : $menu_object->title;
			}
		}
		
		return $sorted_menu_objects;
	} ?>
	
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