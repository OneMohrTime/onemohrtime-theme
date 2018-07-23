<?php

/**
 * Move Yoast to bottom
 */
function yoasttobottom() {
	return 'low';
}
add_filter('wpseo_metabox_prio', 'yoasttobottom');

/**
 * Add webp to mime type
 */
function webp_upload_mimes( $existing_mimes ) {
	// add webp to the list of mime types
	$existing_mimes['webp'] = 'image/webp';
	
	// return the array back to the function with our added mime type
	return $existing_mimes;
}
add_filter( 'mime_types', 'webp_upload_mimes' );

/**
 * Add excerpts to Page
 */
add_post_type_support( 'page', 'excerpt' );

/**
 * Enqueue Font Awesome.
 */
function custom_load_font_awesome() {
    wp_enqueue_script( 'font-awesome', '//use.fontawesome.com/releases/v5.1.0/js/all.js', array(), null );
}
add_action( 'wp_enqueue_scripts', 'custom_load_font_awesome' );

/**
 * Filter the HTML script tag of `font-awesome` script to add `defer` attribute.
 *
 * @param string $tag    The <script> tag for the enqueued script.
 * @param string $handle The script's registered handle.
 *
 * @return   Filtered HTML script tag.
 */
function add_defer_attribute( $tag, $handle ) {
    if ( 'font-awesome' === $handle ) {
        $tag = str_replace( ' src', ' defer src', $tag );
    }
    return $tag;
}
add_filter( 'script_loader_tag', 'add_defer_attribute', 10, 2 );

/**
 * Add $data to Timber
 */
function add_to_context($data){
    // this is where you can add your own data to Timber's context object
    $data['foo'] = 'bar';
    return $data;
}
add_filter('timber_context', 'add_to_context');