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

$context = Timber::context();

$timber_post = Timber::get_post();
$related_posts = get_field('related_posts');

$context['post']         = $timber_post;
$context['relatedPosts'] = $related_posts;

if ( post_password_required( $timber_post->ID ) ) {
	Timber::render( '_views/single-password.twig', $context );
} else {
	Timber::render( array( '_views/single-' . $timber_post->ID . '.twig', '_views/single-' . $timber_post->post_type . '.twig', '_views/single-' . $timber_post->slug . '.twig', '_layouts/single.twig' ), $context );
}
