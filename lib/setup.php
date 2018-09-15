<?php

namespace Roots\Sage\Setup;

use Roots\Sage\Assets;

/**
 * Theme setup
 */
function setup() {
	// Enable features from Soil when plugin is activated
	// https://roots.io/plugins/soil/
	add_theme_support('soil-clean-up');
	add_theme_support('soil-nav-walker');
	add_theme_support('soil-nice-search');
	add_theme_support('soil-jquery-cdn');
	add_theme_support('soil-relative-urls');
	
	// Make theme available for translation
	// Community translations can be found at https://github.com/roots/sage-translations
	load_theme_textdomain('onemohrtime', get_template_directory() . '/lang');
	
	// Enable plugins to manage the document title
	// http://codex.wordpress.org/Function_Reference/add_theme_support#Title_Tag
	add_theme_support('title-tag');
	
	// Register wp_nav_menu() menus
	// http://codex.wordpress.org/Function_Reference/register_nav_menus
	register_nav_menus([
		'primary_navigation' => __('Primary Navigation', 'onemohrtime')
	]);
	
	// Enable post thumbnails
	// http://codex.wordpress.org/Post_Thumbnails
	// http://codex.wordpress.org/Function_Reference/set_post_thumbnail_size
	// http://codex.wordpress.org/Function_Reference/add_image_size
	add_theme_support('post-thumbnails');
	
	// Enable post formats
	// http://codex.wordpress.org/Post_Formats
	add_theme_support('post-formats', ['aside', 'gallery', 'link', 'image', 'quote', 'video', 'audio']);
	
	// Enable HTML5 markup support
	// http://codex.wordpress.org/Function_Reference/add_theme_support#HTML5
	add_theme_support('html5', ['caption', 'comment-form', 'comment-list', 'gallery', 'search-form']);
	
	// Use main stylesheet for visual editor
	// To add custom styles edit /assets/styles/layouts/_tinymce.scss
	add_editor_style(Assets\asset_path('styles/editor-style.css'));
}
add_action('after_setup_theme', __NAMESPACE__ . '\\setup');

/**
 * Register sidebars
 */
function widgets_init() {
	register_sidebar([
		'name'          => __('Primary', 'onemohrtime'),
		'id'            => 'sidebar-primary',
		'before_widget' => '<section class="widget %1$s %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h3>',
		'after_title'   => '</h3>'
	]);
	
	register_sidebar([
		'name'          => __('Footer', 'onemohrtime'),
		'id'            => 'sidebar-footer',
		'before_widget' => '<section class="widget %1$s %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h3>',
		'after_title'   => '</h3>'
	]);
}
add_action('widgets_init', __NAMESPACE__ . '\\widgets_init');

/**
 * Determine which pages should NOT display the sidebar
 */
function display_sidebar() {
	static $display;

	isset($display) || $display = !in_array(true, [
		// The sidebar will NOT be displayed if ANY of the following return true.
		// @link https://codex.wordpress.org/Conditional_Tags
		is_404(),
		// is_front_page(),
		is_singular('design'),
	]);
	
	return apply_filters('sage/display_sidebar', $display);
}

/**
 * Theme assets
 */
function assets() {
	wp_enqueue_style('style', Assets\asset_path('styles/main.css'), array(), false, null);
	
	// Google Webfonts
	// wp_enqueue_style('webfonts', '//fonts.googleapis.com/css?family=Abril+Fatface|Barlow+Semi+Condensed:400,700|Barlow:400,700', array('style'), false, null);
	
	if (is_single() && comments_open() && get_option('thread_comments')) {
		wp_enqueue_script('comment-reply');
	}
	
	wp_enqueue_script('mixitup', Assets\asset_path('scripts/mixitup.js'), '', null, true);
	wp_enqueue_script('swiper', Assets\asset_path('scripts/swiper.js'), '', null, true);
	wp_enqueue_script('fancybox', Assets\asset_path('scripts/fancybox.js'), ['jquery'], null, true);
	wp_enqueue_script('webfonts', '//ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js', '', '1.6.26', true);
//	wp_enqueue_script('cssplugin', Assets\asset_path('scripts/CSSPlugin.min.js'), ['tweenlite'], null, true);
//	wp_enqueue_script('easepack', Assets\asset_path('scripts/EasePack.min.js'), ['tweenlite'], null, true);
	wp_enqueue_script('gsap', '//cdnjs.cloudflare.com/ajax/libs/gsap/2.0.2/TweenMax.min.js', '[jquery]', null, true);
//	wp_enqueue_script('tweenlite', Assets\asset_path('scripts/TweenLite.min.js'), '', null, true);
	wp_enqueue_script('jquery-gsap', Assets\asset_path('scripts/jquery-gsap.min.js'), ['jquery','gsap'], null, true);
	wp_enqueue_script('lettering', Assets\asset_path('scripts/jquery.lettering.min.js'), ['jquery'], null, true);
	wp_enqueue_script('scrollmagic', Assets\asset_path('scripts/ScrollMagic.js'), ['gsap'], null, true);
	wp_enqueue_script('scrollmagic-debug', '//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/plugins/debug.addIndicators.min.js', ['scrollmagic'], null, true);
	wp_enqueue_script('scrollmagic-jquery', Assets\asset_path('scripts/jquery.ScrollMagic.js'), ['scrollmagic','jquery'], null, true);
	wp_enqueue_script('scrollmagic-gsap', Assets\asset_path('scripts/animation.gsap.js'), ['scrollmagic','gsap'], null, true);
	wp_enqueue_script('main', Assets\asset_path('scripts/main.js'), ['jquery','gsap','scrollmagic','fancybox','mixitup'], null, true);
}
add_action('wp_enqueue_scripts', __NAMESPACE__ . '\\assets', 100);