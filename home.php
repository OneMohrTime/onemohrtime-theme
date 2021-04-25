<?php
/**
 * The main template file
 *
 * @package  WordPress
 * @subpackage  SageTimber
 * @since  SageTimber 0.1
 */

$context = Timber::context();

$args = array(
	'post_type' => ['post', 'design'],
	'orderby'   => array(
		'date' => 'DESC'
	),
	'tax_query' => array(
		'relation' => 'AND',
		array(
			'taxonomy' => 'category',
			'field'    => 'slug',
			'terms'    => array('uncategorized', 'shit'),
			'operator' => 'NOT IN',
		),
	),
);

$context['post']       = new Timber\Post();
$context['posts']      = new Timber\PostQuery($args);
$context['categories'] = Timber::get_terms( 'category', array('parent' => 0) );

Timber::render( 'pages/home.twig', $context );
