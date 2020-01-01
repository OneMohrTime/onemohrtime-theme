<?php
/**
 * Timber starter-theme
 * https://github.com/timber/starter-theme
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.1
 */

/**
 * If you are installing Timber as a Composer dependency in your theme, you'll need this block
 * to load your dependencies and initialize Timber. If you are using Timber via the WordPress.org
 * plug-in, you can safely delete this block.
 */
$composer_autoload = __DIR__ . '/vendor/autoload.php';
if ( file_exists( $composer_autoload ) ) {
	require_once $composer_autoload;
	$timber = new Timber\Timber();
}

/**
 * This ensures that Timber is loaded and available as a PHP class.
 * If not, it gives an error message to help direct developers on where to activate
 */
if ( ! class_exists( 'Timber' ) ) {

	add_action(
		'admin_notices',
		function() {
			echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#timber' ) ) . '">' . esc_url( admin_url( 'plugins.php' ) ) . '</a></p></div>';
		}
	);

	add_filter(
		'template_include',
		function( $template ) {
			return get_stylesheet_directory() . '/static/no-timber.html';
		}
	);
	return;
}

/**
 * ACF Warning
 */
if ( ! class_exists( 'acf' ) ) {
	add_action( 'admin_notices', function() {
		echo '<div class="error"><p><strong>Advanced Custom Fields Pro</strong> is required. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#acf' ) ) . '">' . esc_url( admin_url( 'plugins.php' ) ) . '</a></p></div>';
	} );
	return;
}

/**
 * Sets the directories (inside your theme) to find .twig files
 */
Timber::$dirname = array( 'templates', 'views' );

/**
 * By default, Timber does NOT autoescape values. Want to enable Twig's autoescape?
 * No prob! Just set this value to true
 */
Timber::$autoescape = false;

/**
 * We're going to configure our theme inside of a subclass of Timber\Site
 * You can move this to its own file and include here via php's include("MySite.php")
 */
class StarterSite extends Timber\Site {
	/** Add timber support. */
	public function __construct() {
		add_action( 'after_setup_theme', array( $this, 'theme_supports' ) );
		add_filter( 'timber/context', array( $this, 'add_to_context' ) );
		add_filter( 'timber/twig', array( $this, 'add_to_twig' ) );
		add_action( 'init', array( $this, 'register_post_types' ) );
		add_action( 'init', array( $this, 'register_taxonomies' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'loadScripts' ) );
		add_action( 'widgets_init', array( $this, 'widgets' ) );
		add_action( 'init', array( $this, 'disable_emojis' ) );
		add_filter( 'wpseo_metabox_prio', array( $this, 'yoasttobottom' ) );
		parent::__construct();
	}

	/**
	 * This is where you can register custom post types.
	 */
	public function register_post_types() {}

	/**
	 * This is where you can register custom taxonomies.
	 */
	public function register_taxonomies() {}

	/** This is where you add some context
	 *
	 * @param string $context context['this'] Being the Twig's {{ this }}.
	 */
	public function add_to_context( $context ) {
		 /* Site info */
		 $context['site'] = $this;

		/* Menu */
        $context['menu'] = new TimberMenu('Primary Navigation');
        $context['footer'] = new TimberMenu('Footer Projects');

        /* Site info */
        // $context['display_sidebar'] = Setup\display_sidebar();
		$context['sidebar_primary'] = Timber::get_widgets('sidebar-primary');
		
		return $context;
	}

	public function theme_supports() {
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

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support( 'html5', array(
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'search-form'
		) );

		/*
		 * Enable support for Post Formats.
		 *
		 * See: https://codex.wordpress.org/Post_Formats
		 */
		add_theme_support( 'post-formats', array(
			'gallery',
			'link',
			'image',
			'quote',
			'video',
			'audio',
		) );

		add_theme_support( 'menus' );
	}
	
	/**
	 * Theme assets
	 */
	public function loadScripts() {
		// Main "screen" stylesheet
		wp_enqueue_style( 'screen', get_template_directory_uri() . '/dist/css/main.css', array(), null, 'screen' );
		// Google Webfonts
		wp_enqueue_style( 'webfonts', '//fonts.googleapis.com/css?family=Abril+Fatface|Barlow+Semi+Condensed:400,700|Barlow:400,700', array('screen'), false, null );
		
		// Upgrade jQuery
		wp_deregister_script( 'jquery' );
		wp_enqueue_script( 'jquery', '//ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js', array(), '3.4.1', true );
		// Google Webfonts
//		wp_enqueue_script('webfonts', '//ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js', '', '1.6.26', true);
		// Vendor script
		wp_enqueue_script( 'vendor', get_template_directory_uri() . '/dist/js/vendor.js', array('jquery'), null, true );
		// MixItUp
		wp_enqueue_script( 'mixitup', get_template_directory_uri() . '/dist/js/lib/mixitup.js', array(), '3.2.2', true );
		// ScrollMagic
		wp_enqueue_script( 'scrollmagic', get_template_directory_uri() . '/dist/js/lib/ScrollMagic.js', array(), '2.0.5', true );
//		wp_enqueue_script('scrollmagic-debug', '//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/plugins/debug.addIndicators.min.js', ['scrollmagic'], null, true);
		wp_enqueue_script( 'jquery-scrollmagic', get_template_directory_uri() . '/dist/js/lib/plugins/jquery.ScrollMagic.js', array('scrollmagic'), '2.0.7', true );
		// GSAP Tween Max
		wp_enqueue_script( 'tweenmax', get_template_directory_uri() . '/dist/js/lib/TweenMax.min.js', array(), '2.0.5', true );
		// GSAP CSS Plugin
//		wp_enqueue_script( 'gsap-css', get_template_directory_uri() . '/dist/js/lib/plugins/CSSPlugin.min.js', array('scrollmagic','tweenmax'), '2.0.5', true );
		// GSAP CSS animation
		wp_enqueue_script( 'gsap-animation', get_template_directory_uri() . '/dist/js/lib/plugins/animation.gsap.js', array('scrollmagic','tweenmax'), '2.0.5', true );
		// GSAP jQuery plugin
		wp_enqueue_script( 'gsap-jquery', get_template_directory_uri() . '/dist/js/lib/plugins/jquery.gsap.min.js', array('tweenmax'), '0.1.12', true );
		// Swiper
		wp_enqueue_script( 'swiper', get_template_directory_uri() . '/dist/js/lib/swiper.js', array(), '4.2.6', true );
		// Main script file
		wp_enqueue_script( 'main', get_template_directory_uri() . '/dist/js/main.js', array('jquery', 'vendor', 'mixitup'), null, true );
	}

	/**
	 * Register sidebars
	 */
	public function widgets() {
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

	/**
	 * Determine which pages should NOT display the sidebar
	 */
	public function display_sidebar() {
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

	// /**
	//  * ACF Options
	//  */
	// if( function_exists('acf_add_options_page') ) {
	// 	acf_add_options_page();
	// }
	// // Now add Timber to ACF
	// function mytheme_timber_context( $context ) {
	// 	$context['options'] = get_fields('option');
	// 	return $context;
	// }
	// add_filter( 'timber_context', 'mytheme_timber_context' );

	/**
	 * Disable the emoji's
	 */
	public function disable_emojis() {
		remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
		remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
		remove_action( 'wp_print_styles', 'print_emoji_styles' );
		remove_action( 'admin_print_styles', 'print_emoji_styles' ); 
		remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
		remove_filter( 'comment_text_rss', 'wp_staticize_emoji' ); 
		remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
		// add_filter( 'tiny_mce_plugins', 'disable_emojis_tinymce' );
		// add_filter( 'wp_resource_hints', 'disable_emojis_remove_dns_prefetch', 10, 2 );
	}

	// /**
	//  * Filter function used to remove the tinymce emoji plugin.
	//  * 
	//  * @param array $plugins 
	//  * @return array Difference betwen the two arrays
	//  */
	// public function disable_emojis_tinymce( $plugins ) {
	// 	if ( is_array( $plugins ) ) {
	// 	return array_diff( $plugins, array( 'wpemoji' ) );
	// 	} else {
	// 		return array();
	// 	}
	// }

	// /**
	//  * Remove emoji CDN hostname from DNS prefetching hints.
	//  *
	//  * @param array $urls URLs to print for resource hints.
	//  * @param string $relation_type The relation type the URLs are printed for.
	//  * @return array Difference betwen the two arrays.
	//  */
	// public function disable_emojis_remove_dns_prefetch( $urls, $relation_type ) {
	// 	if ( 'dns-prefetch' == $relation_type ) {
	// 		/** This filter is documented in wp-includes/formatting.php */
	// 		$emoji_svg_url = apply_filters( 'emoji_svg_url', 'https://s.w.org/images/core/emoji/2/svg/' );
			
	// 		$urls = array_diff( $urls, array( $emoji_svg_url ) );
	// 	}
		
	// 	return $urls;
	// }

	/**
	 * Move Yoast to bottom
	 */
	public function yoasttobottom() {
		return 'low';
	}

	/** This is where you can add your own functions to twig.
	 *
	 * @param string $twig get extension.
	 */
	public function add_to_twig( $twig ) {
//		$twig->addExtension( new Twig\Extension\StringLoaderExtension() );
//		$twig->addFilter( new Twig\TwigFilter( 'myfoo', array( $this, 'myfoo' ) ) );
		return $twig;
	}

}

new StarterSite();
