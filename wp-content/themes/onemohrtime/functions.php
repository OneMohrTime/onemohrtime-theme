<?php
/**
 * onemohrtime functions and definitions.
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package onemohrtime
 */

if ( ! function_exists( 'onemohrtime_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function onemohrtime_setup() {
	/*
	 * Make theme available for translation.
	 * Translations can be filed in the /languages/ directory.
	 * If you're building a theme based on onemohrtime, use a find and replace
	 * to change 'onemohrtime' to the name of your theme in all the template files.
	 */
	load_theme_textdomain( 'onemohrtime', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support( 'title-tag' );

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
	 */
	add_theme_support( 'post-thumbnails' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus( array(
		'primary' => esc_html__( 'Primary', 'onemohrtime' ),
	) );

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support( 'html5', array(
		'search-form',
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
	) );

	/*
	 * Enable support for Post Formats.
	 * See https://developer.wordpress.org/themes/functionality/post-formats/
	 */
	add_theme_support( 'post-formats', array(
		'aside',
		'image',
		'video',
		'quote',
		'link',
	) );

	// Set up the WordPress core custom background feature.
    /*
	add_theme_support( 'custom-background', apply_filters( 'onemohrtime_custom_background_args', array(
		'default-color' => 'ffffff',
		'default-image' => '',
	) ) );
    */
}
endif;
add_action( 'after_setup_theme', 'onemohrtime_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function onemohrtime_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'onemohrtime_content_width', 640 );
}
add_action( 'after_setup_theme', 'onemohrtime_content_width', 0 );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function onemohrtime_widgets_init() {
	register_sidebar ( array(
		'name'          => esc_html__( 'Blog Listing','onemohrtime' ),
		'id'            => 'sidebar-listing',
		'description'   => 'Sidebar for blog listing',
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );
    register_sidebar ( array(
        'name'          => esc_html__( 'Blog Post','onemohrtime' ),
        'id'            => 'sidebar-post',
        'description'   => 'Sidebar for blog posts',
        'before_widget' => '<section id="%1$s" class="widget %2%s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ) );
}
add_action( 'widgets_init', 'onemohrtime_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function onemohrtime_scripts() {
	wp_enqueue_style( 'onemohrtime-style', get_stylesheet_uri() );
    
    // Loading jQuery 2.1.4 instead of default
    wp_deregister_script( 'jquery' );
    wp_enqueue_script( 'jquery', '//ajax.googleapis.com/ajax/libs/jquery/3.0.0/jquery.min.js', array(), null, true );
    //wp_add_inline_script ('jquery', 'window.jQuery || document.write(\'<script src="assets/js/jquery.min.js"><\/script>\')', array(), null, true );
    
	wp_enqueue_script( 'onemohrtime-navigation', get_template_directory_uri() . '/js/navigation.js', array(), '20120206', true );
    
    // modernizr 3.3.1
    wp_enqueue_script('modernizr', get_template_directory_uri() . '/js/modernizr-custom.js', array(), null, true);
    
	//wp_enqueue_script( 'onemohrtime-skip-link-focus-fix', get_template_directory_uri() . '/js/skip-link-focus-fix.js', array(), '20130115', true );
    
    // FancyBox 2.1.5
    wp_enqueue_script('fancybox', get_template_directory_uri() . '/js/jquery.fancybox.pack.js', array('jquery'), null, true);
    
    // CSS3 Animate It
    wp_enqueue_script('css3-animate-it', get_template_directory_uri() . '/js/css3-animate-it.js', array('jquery'), null, true);
    
    // FortAwesome Fonticons
    wp_enqueue_script('fonticons', '//use.fortawesome.com/936901b7.js', array(), null, true);
    
    // Sticky-kit.js
    wp_enqueue_script('stickykit', get_template_directory_uri() . '/js/jquery.sticky-kit.min.js', array('jquery'), null, true);
    
    // Dribbble plugin
    wp_enqueue_script('dribbble', get_template_directory_uri() . '/js/jribbble.min.js', array('jquery'), null, true);
    
    // Custom jQuery
    wp_enqueue_script('onemohrtime-main.js', get_template_directory_uri() . '/js/main.min.js', array('jquery'), null, true);
    
	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'onemohrtime_scripts' );

/**
 * Custom Shortcodes
 */
function pull_quote( $atts, $quote='' ) {
    return '<blockquote class="pull-quote">' . $quote . '</blockquote>';
}
add_shortcode( 'pullquote', 'pull_quote' );

function about_dropdown( $atts , $content = null ) {
	$atts = shortcode_atts(
		array(
			'title' => '',
            'id' => ''
		),
		$atts, 'about'
	);
    $return_string = '<section class="about-me scroll" id="education"><h3 class="toggle-show">' . $atts[title] . '<span class="fa fa-chevron-down pull-right"></span></h3>';
    $return_string .= '<div class="toggle-hidden">' . $content . '</div></section>';
    return $return_string;
}
add_shortcode( 'about', 'about_dropdown' );

/**
 * Custom navigation menus
 */
function register_my_menus() {
    register_nav_menus(
        array(
            'desktop-menu' => __( 'Desktop-only Menu' ),
            'social-menu' => __( 'Footer Social Media Links' )
        )
    );
}
add_action( 'init', 'register_my_menus' );
// add hover to custom navigation menus
function special_nav_class ($classes, $item) {
    if (in_array('current-menu-item', $classes) ){
        $classes[] = 'active ';
    }
    return $classes;
}
add_filter('nav_menu_css_class' , 'special_nav_class' , 10 , 2);

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

/**
 * Implement the Custom Header feature.
 */
//require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Custom functions that act independently of the theme templates.
 */
require get_template_directory() . '/inc/extras.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
require get_template_directory() . '/inc/jetpack.php';