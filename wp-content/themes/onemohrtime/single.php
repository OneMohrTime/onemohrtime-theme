<?php
/**
 * The Template for displaying all single posts (taken from timber-starter-theme)
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */

$context = Timber::get_context();
$post    = Timber::query_post();
//$post    = new TimberPost();

$context['post']     = $post;
$context['banner']   = get_field('project_header');
$context['details']  = get_field('project_deets');
$context['sections'] = get_field('project_specs');

if ( post_password_required( $post->ID ) ) {
	Timber::render( 'single-password.twig', $context );
} else {
	Timber::render( array( 'single-' . $post->ID . '.twig', 'single-' . $post->post_type . '.twig', 'single.twig' ), $context );
}
