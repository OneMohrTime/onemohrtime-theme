<?php
// https://developer.wordpress.org/themes/basics/theme-functions/

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
	
	// Loading jQuery 3.1.1 instead of default
	wp_deregister_script('jquery');
	wp_register_script('jquery', '//ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js', array(), '3.1.1', true);
	wp_enqueue_script('jquery');
	wp_add_inline_script ('jquery', 'window.jQuery || document.write(\'<script src="' + get_template_directory_uri() + '/js/jquery-3.1.1.min.js"><\/script>\')');
	
	// vendor grunt concat
	wp_enqueue_script('vendor', get_template_directory_uri() . '/js/vendor.min.js', array('jquery'), null, true);
	
	// CSS3 Animate It
	// wp_enqueue_script('css3-animate-it', get_template_directory_uri() . '/js/css3-animate-it.js', array('jquery'), null, true);
	
	// FortAwesome Fonticons
	wp_enqueue_script('fonticons', '//use.fortawesome.com/936901b7.js', array(), null, true);
	
	// Typed.js
	// wp_enqueue_script('typed', get_template_directory_uri() . '/js/typed.min.js', array('jquery'), null, true);
    
    // Sticky-kit.js
    // wp_enqueue_script('stickykit', get_template_directory_uri() . '/js/jquery.sticky-kit.min.js', array('jquery'), null, true);
    
    // Dribbble plugin
    //wp_enqueue_script('dribbble', get_template_directory_uri() . '/js/jribbble.min.js', array('jquery'), null, true);
    
    // Custom jQuery/JS
    wp_enqueue_script('main', get_template_directory_uri() . '/js/main.min.js', array('jquery'), null, true);
    
}
add_action( 'wp_enqueue_scripts', 'onemohrtime_scripts' );

/**
 * Post Type: Projects.
 */
//function cptui_register_my_cpts_design() {
//	$labels = array(
//		"name" => __( 'Projects', 'onemohrtime' ),
//		"singular_name" => __( 'Project', 'onemohrtime' ),
//	);
//	$args = array(
//		"label" => __( 'Projects', 'onemohrtime' ),
//		"labels" => $labels,
//		"description" => "",
//		"public" => true,
//		"publicly_queryable" => true,
//		"show_ui" => true,
//		"show_in_rest" => false,
//		"rest_base" => "",
//		"has_archive" => false,
//		"show_in_menu" => true,
//		"exclude_from_search" => false,
//		"capability_type" => "page",
//		"map_meta_cap" => true,
//		"hierarchical" => true,
//		"rewrite" => array( "slug" => "design", "with_front" => true ),
//		"query_var" => true,
//		"menu_position" => 0,
//		"menu_icon" => "dashicons-align-left",
//		"supports" => array( "title", "thumbnail", "excerpt" ),
//	);
//	register_post_type( "design", $args );
//}
//add_action( 'init', 'cptui_register_my_cpts_design' );

// Custom MCE editor
add_editor_style();

// Custom Shortcodes
function pull_quote( $atts, $quote='' ) {
    return '<blockquote class="pull-quote">' . $quote . '</blockquote>';
}
add_shortcode( 'pullquote', 'pull_quote' );

/**
 * Posts excerpts
 */
function wpdocs_custom_excerpt_length( $length ) {
    return 20;
}
function wpdocs_excerpt_more( $more ) {
    return '&nbsp;' . '<a href="' . get_the_permalink() . '">[&thinsp;&hellip;&thinsp;]</a>';
}
add_filter( 'excerpt_length', 'wpdocs_custom_excerpt_length', 999 );
add_filter( 'excerpt_more', 'wpdocs_excerpt_more' );

// Custom template tags for this theme.
require get_template_directory() . '/inc/template-tags.php';

// Customizer additions.
require get_template_directory() . '/inc/customizer.php';

// Load Jetpack compatibility file.
require get_template_directory() . '/inc/jetpack.php';