<?php
/**
 * The Template for displaying all single posts
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */

$context         = Timber::context();
$timber_post     = Timber::query_post();

$context['post']     = $timber_post;
$context['banner']   = get_field('project_header');
$context['details']  = get_field('project_deets');
$context['sections'] = get_field('project_specs');

if ( post_password_required( $timber_post->ID ) ) {
	Timber::render( 'pages/single-password.twig', $context );
} else {
	Timber::render( array( 'pages/single-' . $timber_post->ID . '.twig', 'pages/single-' . $timber_post->post_type . '.twig', 'pages/single-' . $timber_post->slug . '.twig', 'pages/single.twig' ), $context );
}
