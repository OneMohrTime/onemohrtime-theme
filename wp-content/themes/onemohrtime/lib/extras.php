<?php

namespace Roots\Sage\Extras;

use Roots\Sage\Setup;

/**
 * Add <body> classes
 */
function body_class($classes) {
  // Add page slug if it doesn't exist
  if (is_single() || is_page() && !is_front_page()) {
    if (!in_array(basename(get_permalink()), $classes)) {
      $classes[] = basename(get_permalink());
    }
  }

  // Add class if sidebar is active
  if (Setup\display_sidebar()) {
    $classes[] = 'sidebar-primary';
  }

  return $classes;
}
add_filter('body_class', __NAMESPACE__ . '\\body_class');

/**
 * Clean up the_excerpt()
 */
function excerpt_more() {
  return ' &hellip; <a href="' . get_permalink() . '">' . __('Continued', 'onemohrtime') . '</a>';
}
add_filter('excerpt_more', __NAMESPACE__ . '\\excerpt_more');

/**
 * Add 'defer' to certain scripts
 */
//function add_defer_attribute($tag, $handle) {
//	// add script handles to the array below
//	$scripts_to_defer = array('mixitup', 'swiper');
//	
//	foreach($scripts_to_defer as $defer_script) {
//		if ($defer_script === $handle) {
//			return str_replace(' src', ' defer="defer" src', $tag);
//		}
//	}
//	return $tag;
//}
//add_filter('script_loader_tag', 'add_defer_attribute', 10, 2);

// Add webp to mime type
//function webp_upload_mimes( $existing_mimes ) {
//	// add webp to the list of mime types
//	$existing_mimes['webp'] = 'image/webp';
//	
//	// return the array back to the function with our added mime type
//	return $existing_mimes;
//}
//add_filter( 'mime_types', 'webp_upload_mimes' );