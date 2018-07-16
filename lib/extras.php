<?php

namespace Roots\Sage\Extras;

use Roots\Sage\Setup;

/**
 * Add <body> classes
 */
function body_class($classes) {
  // Add page slug if it doesn't exist
  if (is_single() || is_page()) {
  //if (is_single() || is_page() && !is_front_page()) {
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
 * Add <main> classes
 */
//function main_class($template_class) {
//	if(is_front_page()) {
//		$template_class = ' homepage';
//	} elseif(is_home()) {
//		$template_class = ' posts';
//	} elseif(is_singular('design')) {
//		$template_class = ' project';
//	} elseif(is_single()) {
//		$template_class = ' blog-post';
//	} elseif(is_page('design')) {
//		$template_class = ' gallery';
//	} elseif(is_page()) {
//		$template_class = ' halfie';
//	} elseif(is_404()) {
//		$template_class = ' daft-punk';
//	} else {
//		$template_class = '';
//	}
//	echo $template_class;
//}
//add_action('main_class', 'main_class');

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