<?php
/**
 * Single page template
 *
 * @package  WordPress
 * @subpackage  SageTimber
 * @since  SageTimber 0.1
 */

$context = Timber::get_context();
//$post  = new TimberPost();
$post    = Timber::query_post();

$context['post']     = $post;
$context['banner']   = get_field('project_header');
$context['details']  = get_field('project_deets');
$context['sections'] = get_field('project_specs');

if ( post_password_required( $post->ID ) ) {
	Timber::render( 'single-password.twig', $context );
} else {
	Timber::render( array( 'pages/single-' . $post->ID . '.twig', 'pages/single-' . $post->post_type . '.twig', 'pages/single.twig' ), $context );
}