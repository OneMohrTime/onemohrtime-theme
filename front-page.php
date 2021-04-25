<?php
/**
 * Front page template file
 *
 * @package  WordPress
 */

$context     = Timber::context();
$timber_post = new Timber\Post();

$context['post']    = $timber_post;
$context['grid']    = get_field('homepage_grid');
$context['about']   = get_field('homepage_about');
$context['links']   = get_field('homepage_links');
$context['builder'] = get_field('sections');

Timber::render( 'pages/front-page.twig', $context );
