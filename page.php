<?php
/**
 * Single page template file
 *
 * @package  WordPress
 * @subpackage  SageTimber
 * @since  SageTimber 0.1
 */

$context = Timber::get_context();
$post    = new TimberPost();

$projects = array(
	'post_type'      => 'design',
	'posts_per_page' => -1,
	'orderby'        => 'menu_order',
	'order'          => 'ASC'
);
$context['post']    = $post;
$context['gallery'] = Timber::get_posts( $projects );
$context['roles']   = new TimberTerm('design');

Timber::render( array( 'pages/page-' . $post->post_name . '.twig', 'pages/page.twig' ), $context );