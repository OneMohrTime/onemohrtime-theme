<?php

define('AKMANDA_DIR', get_template_directory_uri());
define('AKMANDA_TEMPLATE_DIR', get_template_directory());
include_once( ABSPATH . 'wp-admin/includes/plugin.php' );

add_action('after_setup_theme', 'maca_setup');
function maca_setup(){
    load_theme_textdomain( 'maca', AKMANDA_TEMPLATE_DIR .'/languages' );
}

require_once( AKMANDA_TEMPLATE_DIR . '/inc/option/core/framework.php' );
require_once( AKMANDA_TEMPLATE_DIR . '/inc/option/panel/config.php' );

if( !class_exists('acf') ) {
define( 'ACF_LITE' , true );
include_once(AKMANDA_TEMPLATE_DIR . '/inc/acf/acf.php' );

}

add_action('acf/register_fields', 'my_register_fields');

function my_register_fields()
{
	include_once(AKMANDA_TEMPLATE_DIR . '/inc/acf/acf-gallery/gallery.php');
}




//Set the content width based on the theme's design and stylesheet.
if ( ! isset( $content_width ) )
	$content_width = 1200; /* pixels */

// INCLUDE SUPPORT FILE
require_once( AKMANDA_TEMPLATE_DIR . '/inc/function/custom.php' );
require_once( AKMANDA_TEMPLATE_DIR . '/inc/function/navigation.php' );
require_once( AKMANDA_TEMPLATE_DIR . '/inc/function/comment.php' );
require_once( AKMANDA_TEMPLATE_DIR . '/inc/function/thesidebar.php' );
require_once( AKMANDA_TEMPLATE_DIR . '/inc/function/themenu.php' );
require_once( AKMANDA_TEMPLATE_DIR . '/inc/function/theheader.php' );
require_once( AKMANDA_TEMPLATE_DIR . '/inc/function/themeta.php' );
require_once( AKMANDA_TEMPLATE_DIR . '/inc/function/meta-box.php' );
require_once( AKMANDA_TEMPLATE_DIR . '/inc/function/aq_resizer.php');
require_once( AKMANDA_TEMPLATE_DIR . '/inc/function/akmanda-customizer.php');


// INSTALL NECESSARY PLUGINS
require_once( AKMANDA_TEMPLATE_DIR . '/class-tgm.php' ); /*activate plugin function*/