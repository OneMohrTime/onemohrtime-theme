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
$args = array(
	'post_type'      => 'post',
	'posts_per_page' => -1,
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
$context['categories'] = Timber::get_terms( 'category', array('parent' => 0) );
Timber::render( 'pages/home.twig', $context );
