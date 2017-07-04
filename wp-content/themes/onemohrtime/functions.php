<?php
// https://developer.wordpress.org/themes/basics/theme-functions/

// Custom Post Types UI
include('inc/cptui.php');

// Advanced Custom Fields
include('inc/acf.php');

if (!function_exists('onemohrtime_setup')):
// Sets up theme defaults and registers support for various WordPress features.

function onemohrtime_setup() {
	// Make theme available for translation.
	// Translations can be filed in the /languages/ directory.
	load_theme_textdomain('onemohrtime', get_template_directory() . '/languages');
	
	// Add default posts and comments RSS feed links to head.
	add_theme_support('automatic-feed-links');
	
	// Let WordPress manage the document title.
	add_theme_support('title-tag');
	
	//Enable support for Post Thumbnails on posts and pages.
	add_theme_support('post-thumbnails');
	
	// This theme uses wp_nav_menu() in one location.
	register_nav_menus( array(
		'primary' => esc_html__('Primary', 'onemohrtime'),
		'desktop-menu' => esc_html__('Desktop', 'onemohrtime')
	));
	
	// Switch default core markup for search form, comment form, and comments to output valid HTML5.
	add_theme_support('html5', array(
		'search-form',
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
	));
	
	// Enable support for Post Formats.
	add_theme_support('post-formats', array(
		'aside',
		'image',
		'video',
		'quote',
		'link',
	));
}
endif;
add_action('after_setup_theme', 'onemohrtime_setup');

// Register widget area.
function onemohrtime_widgets_init() {
	register_sidebar(array(
		'name' => __('Sidebar', 'onemohrtime'),
		'id' => 'sidebar'
	));
//	register_sidebar ( array(
//		'name'          => esc_html__( 'Blog Listing','onemohrtime' ),
//		'id'            => 'sidebar-listing',
//		'description'   => 'Sidebar for blog listing',
//		'before_widget' => '<section id="%1$s" class="widget %2$s">',
//		'after_widget'  => '</section>',
//		'before_title'  => '<h2 class="widget-title">',
//		'after_title'   => '</h2>',
//	) );
//    register_sidebar ( array(
//        'name'          => esc_html__( 'Blog Post','onemohrtime' ),
//        'id'            => 'sidebar-post',
//        'description'   => 'Sidebar for blog posts',
//        'before_widget' => '<section id="%1$s" class="widget %2%s">',
//        'after_widget'  => '</section>',
//        'before_title'  => '<h3 class="widget-title">',
//        'after_title'   => '</h3>',
//    ) );
}
add_action('widgets_init', 'onemohrtime_widgets_init');

// Enqueue scripts and styles.
function onemohrtime_scripts() {
	
	// load minified css instead
//	wp_enqueue_style('dev', get_stylesheet_uri());
	wp_enqueue_style('style', get_template_directory_uri() . '/style.min.css', array(), null, 'all');
	
	// Google Webfonts: Montserrat, Bitter
	wp_enqueue_style('google-fonts', '//fonts.googleapis.com/css?family=Montserrat:400,700|Bitter:400,400i,700', array('style'), null, 'all' );
	
	// Loading jQuery 3.1.1 instead of default
	wp_deregister_script('jquery');
	wp_register_script('jquery', '//ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js', array(), '3.1.1', true);
	wp_enqueue_script('jquery');
	wp_add_inline_script ('jquery', 'window.jQuery || document.write(\'<script src="' + get_template_directory_uri() + '/js/jquery-3.1.1.min.js"><\/script>\')');
	
	// vendor grunt concat
	// CSS3 Animate It
	// Typed.js
    // Sticky-kit.js
    // Dribbble plugin
	wp_enqueue_script('vendor', get_template_directory_uri() . '/js/vendor.min.js', array('jquery'), null, true);
	
	// FortAwesome Fonticons
//	wp_enqueue_script('fonticons', '//use.fortawesome.com/936901b7.js', array(), null, true);
    
    // Custom jQuery/JS
    wp_enqueue_script('main', get_template_directory_uri() . '/js/main.min.js', array('jquery'), null, true);
    
}
add_action( 'wp_enqueue_scripts', 'onemohrtime_scripts' );

// Custom MCE editor
add_editor_style();

// Custom Shortcodes
function pull_quote( $atts, $quote='' ) {
    return '<blockquote class="pull-quote">' . $quote . '</blockquote>';
}
add_shortcode( 'pullquote', 'pull_quote' );

// Posts excerpts
function wpdocs_custom_excerpt_length( $length ) {
    return 20;
}
function wpdocs_excerpt_more( $more ) {
    return '&nbsp;' . '<a href="' . get_the_permalink() . '">[&thinsp;&hellip;&thinsp;]</a>';
}
add_filter( 'excerpt_length', 'wpdocs_custom_excerpt_length', 999 );
add_filter( 'excerpt_more', 'wpdocs_excerpt_more' );

// Disable WP Emojis
function disable_wp_emojicons() {
	// all actions related to emojis
	remove_action( 'admin_print_styles', 'print_emoji_styles' );
	remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
	remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
	remove_action( 'wp_print_styles', 'print_emoji_styles' );
	remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
	remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
	remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );
	// filter to remove TinyMCE emojis
	add_filter( 'tiny_mce_plugins', 'disable_emojicons_tinymce' );
}
add_action( 'init', 'disable_wp_emojicons' );
function disable_emojicons_tinymce($plugins) {
	if (is_array($plugins)) {
		return array_diff($plugins, array('wpemoji'));
	} else {
		return array();
	}
}
add_filter( 'emoji_svg_url', '__return_false' );

// Move Yoast to bottom
function yoasttobottom() {
	return 'low';
}
add_filter('wpseo_metabox_prio', 'yoasttobottom');

// Custom template tags for this theme.
require get_template_directory() . '/inc/template-tags.php';

// Customizer additions.
// require get_template_directory() . '/inc/customizer.php';

// Load Jetpack compatibility file.
// require get_template_directory() . '/inc/jetpack.php';