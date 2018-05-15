<?php
/**
 * Project page template file
 *
 * @package  WordPress
 * @subpackage  SageTimber
 * @since  SageTimber 0.1
 */

$context = Timber::get_context();
$args = array(
//	 Get post type project
	'post_type' => 'design',
	// Get all posts
	'posts_per_page' => -1,
	// Gest post by "graphic" category
//	'meta_query' => array(
//		array(
//			'key' => 'project_category',
//			'value' => 'graphic',
//			'compare' => 'LIKE'
//		)
//	),
	// Order by post date
	'orderby' => array(
		'date' => 'DESC'
	)
);
$context['gallery'] = Timber::get_posts( $args );

Timber::render('pages/page-design.twig', $context);