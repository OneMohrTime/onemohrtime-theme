<?php

// Move Yoast to bottom
function yoasttobottom() {
	return 'low';
}
add_filter('wpseo_metabox_prio', 'yoasttobottom');

// Add webp to mime type
function webp_upload_mimes( $existing_mimes ) {
	// add webp to the list of mime types
	$existing_mimes['webp'] = 'image/webp';
	
	// return the array back to the function with our added mime type
	return $existing_mimes;
}
add_filter( 'mime_types', 'webp_upload_mimes' );

// add page excerpts
add_post_type_support( 'page', 'excerpt' );