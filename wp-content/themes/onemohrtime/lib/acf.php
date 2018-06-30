<?php

/**
 * ACF Options
 */
if( function_exists('acf_add_options_page') ) {
	acf_add_options_page();	
}
// Now add Timber to ACF
function mytheme_timber_context( $context ) {
    $context['options'] = get_fields('option');
    return $context;
}
add_filter( 'timber_context', 'mytheme_timber_context' );

/**
 * ACF Warning
 */
if ( ! class_exists( 'acf' ) ) {
	add_action( 'admin_notices', function() {
		echo '<div class="error"><p><strong>Advanced Custom Fields Pro</strong> is required. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#acf' ) ) . '">' . esc_url( admin_url( 'plugins.php' ) ) . '</a></p></div>';
	} );
	return;
}