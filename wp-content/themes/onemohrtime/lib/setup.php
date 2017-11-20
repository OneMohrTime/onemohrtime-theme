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

  // Enable custom logo
  // https://developer.wordpress.org/themes/functionality/custom-logo/
  add_theme_support('custom-logo');

  // Use main stylesheet for visual editor
  // To add custom styles edit /assets/styles/layouts/_tinymce.scss
//  add_editor_style(Assets\asset_path('styles/main.css'));
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
    is_front_page(),
    is_single('design'),
    is_page_template('template-custom.php'),
  ]);

  return apply_filters('sage/display_sidebar', $display);
}

/**
 * Theme assets
 */
function assets() {
	
	wp_enqueue_style('onemohrtime-stylesheet', Assets\asset_path('styles/main.css'), false, 'all');
	
	// Loading jQuery 3.2.1 instead of default
	wp_deregister_script('jquery');
	wp_register_script('jquery', '//ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js', array(), '3.2.1', true);
	wp_enqueue_script('jquery');
//	wp_add_inline_script ('jquery', 'if (!window.jQuery) { document.write(\'<script src="' + get_template_directory_uri() + '/js/jquery-3.2.1.min.js"><\/script>\'); }');
	
	wp_enqueue_script('vendor', get_template_directory_uri() . '/assets/scripts/vendor.min.js', 'jquery', null, true);
	
	wp_enqueue_script('onemohrtime-scripts', Assets\asset_path('scripts/main.js'), ['jquery','vendor'], null, true);
	
	if (is_single() && comments_open() && get_option('thread_comments')) {
		wp_enqueue_script('comment-reply');
	}
	
	// Google Webfonts: Montserrat, Bitter
	wp_enqueue_style('google-fonts', '//fonts.googleapis.com/css?family=Barlow+Semi+Condensed:700|Barlow:400,400i,700|Amiri:400i,700i', array('sage/css'), null, 'all' );
	
}
add_action('wp_enqueue_scripts', __NAMESPACE__ . '\\assets', 100);

/**
 * Disable WP Emojis
 */
//function disable_wp_emojicons() {
//	// all actions related to emojis
//	remove_action( 'admin_print_styles', 'print_emoji_styles' );
//	remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
//	remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
//	remove_action( 'wp_print_styles', 'print_emoji_styles' );
//	remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
//	remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
//	remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );
//	// filter to remove TinyMCE emojis
//	add_filter( 'tiny_mce_plugins', 'disable_emojicons_tinymce' );
//}
//add_action( 'init', 'disable_wp_emojicons' );
//function disable_emojicons_tinymce($plugins) {
//	if (is_array($plugins)) {
//		return array_diff($plugins, array('wpemoji'));
//	} else {
//		return array();
//	}
//}
//add_filter( 'emoji_svg_url', '__return_false' );