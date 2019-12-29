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
		$context['foo']   = 'bar';
		$context['stuff'] = 'I am a value set in your functions.php file';
		$context['notes'] = 'These values are available everytime you call Timber::context();';
		$context['menu']  = new Timber\Menu();
		$context['site']  = $this;
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
		) );

		/*
		 * Enable support for Post Formats.
		 *
		 * See: https://codex.wordpress.org/Post_Formats
		 */
		add_theme_support( 'post-formats', array(
			'aside',
			'image',
			'video',
			'quote',
			'link',
			'gallery',
			'audio',
		) );

		add_theme_support( 'menus' );
	}
	
	/**
	 * Theme assets
	 */
//	public function assets() {
//		wp_enqueue_style('style', Assets\asset_path('styles/main.css'), array(), false, null);
//
//		// Google Webfonts
//		// wp_enqueue_style('webfonts', '//fonts.googleapis.com/css?family=Abril+Fatface|Barlow+Semi+Condensed:400,700|Barlow:400,700', array('style'), false, null);
//
//		if (is_single() && comments_open() && get_option('thread_comments')) {
//			wp_enqueue_script('comment-reply');
//		}
//
//		wp_enqueue_script('mixitup', Assets\asset_path('scripts/mixitup.js'), '', null, true);
//	//	wp_enqueue_script('swiper', Assets\asset_path('scripts/swiper.js'), '', null, true);
//		wp_enqueue_script('fancybox', Assets\asset_path('scripts/fancybox.js'), ['jquery'], null, true);
//		wp_enqueue_script('webfonts', '//ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js', '', '1.6.26', true);
//	//	wp_enqueue_script('cssplugin', Assets\asset_path('scripts/CSSPlugin.min.js'), ['tweenlite'], null, true);
//	//	wp_enqueue_script('easepack', Assets\asset_path('scripts/EasePack.min.js'), ['tweenlite'], null, true);
//		wp_enqueue_script('gsap', '//cdnjs.cloudflare.com/ajax/libs/gsap/2.0.2/TweenMax.min.js', '[jquery]', null, true);
//	//	wp_enqueue_script('tweenlite', Assets\asset_path('scripts/TweenLite.min.js'), '', null, true);
//		wp_enqueue_script('jquery-gsap', Assets\asset_path('scripts/jquery-gsap.min.js'), ['jquery','gsap'], null, true);
//		wp_enqueue_script('lettering', Assets\asset_path('scripts/jquery.lettering.min.js'), ['jquery'], null, true);
//		wp_enqueue_script('scrollmagic', Assets\asset_path('scripts/ScrollMagic.js'), ['gsap'], null, true);
//		wp_enqueue_script('scrollmagic-debug', '//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/plugins/debug.addIndicators.min.js', ['scrollmagic'], null, true);
//		wp_enqueue_script('scrollmagic-jquery', Assets\asset_path('scripts/jquery.ScrollMagic.js'), ['scrollmagic','jquery'], null, true);
//		wp_enqueue_script('scrollmagic-gsap', Assets\asset_path('scripts/animation.gsap.js'), ['scrollmagic','gsap'], null, true);
//		wp_enqueue_script('main', Assets\asset_path('scripts/main.js'), ['jquery','gsap','scrollmagic','fancybox','mixitup'], null, true);
//	}
//	add_action('wp_enqueue_scripts', 'assets', 100);
	public function loadScripts() {
		// Main "screen" stylesheet
		wp_enqueue_style( 'screen', get_template_directory_uri() . '/dist/css/main.css', array(), null, 'screen' );
		// Google Webfonts
		wp_enqueue_style('webfonts', '//fonts.googleapis.com/css?family=Abril+Fatface|Barlow+Semi+Condensed:400,700|Barlow:400,700', array('screen'), false, null);
		
		// Upgrade jQuery
		wp_deregister_script( 'jquery' );
		wp_enqueue_script( 'jquery', '//ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js', array(), '3.4.1', true );
		// Vendor script
		wp_enqueue_script( 'vendor', get_template_directory_uri() . '/dist/js/vendor.js', array('jquery'), null, true );
		wp_enqueue_script('scrollmagic', '//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/ScrollMagic.min.js', array(), null, true);
		// Main script file
		wp_enqueue_script( 'main', get_template_directory_uri() . '/dist/js/main.js', array('jquery', 'vendor'), null, true );
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
