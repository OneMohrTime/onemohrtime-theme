<?php
/**
 * The main template file
 *
 * @package  WordPress
 * @subpackage  SageTimber
 * @since  SageTimber 0.1
 */

$context = Timber::get_context();
$context['post']      = new Timber\Post();
$paged = get_query_var('paged') ?: 1; // Get the current page number
$args = array(
	'post_type'      => 'post',
	'posts_per_page' => 10,
	'paged'          => $paged,
	'orderby'        => array(
		'date' => 'DESC'
	),
	'tax_query'      => array(
		'relation' => 'AND',
		array(
			'taxonomy' => 'category',
			'field'    => 'slug',
			'terms'    => array('uncategorized', 'shit'),
			'operator' => 'NOT IN',
		),
	),
);
$context['posts']      = Timber::get_posts( $args );
$context['pagination'] = Timber::get_pagination();
$context['categories'] = Timber::get_terms( 'category', array('parent' => 0) );
Timber::render( 'pages/home.twig', $context );
