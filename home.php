<?php
/**
 * The main template file
 *
 * @package  WordPress
 * @subpackage  SageTimber
 * @since  SageTimber 0.1
 */

$context = Timber::get_context();

$blog_args = array(
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

$gallery_args = array(
	'posts_per_page' => -1,
	'order'          => 'ASC',
	'post_mime_type' => 'image',
	'post_parent'    => $post->post_parent,
	'post_status'    => null,
	'post_type'      => 'attachment',
);

$context['post']         = new Timber\Post();
$context['posts']        = Timber::get_posts( $blog_args );
$context['post_gallery'] = get_children( $gallery_args );
$context['categories']   = Timber::get_terms( 'category', array('parent' => 0) );

Timber::render( 'pages/home.twig', $context );
