<?php
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 * To generate specific templates for your pages you can use:
 * /mytheme/templates/page-mypage.twig
 * (which will still route through this PHP file)
 * OR
 * /mytheme/page-mypage.php
 * (in which case you'll want to duplicate this file and save to the above path)
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */

$context     = Timber::context();
$timber_post = new Timber\Post();

// $images = get_children( array(
// 	'post_parent'    => 1,
// 	'post_type'      => 'attachment',
// 	'post_mime_type' => 'image',
// 	'orderby'        => 'menu_order',
// 	'order'          => 'ASC',
// 	'numberposts'    => 999 ) );
$projects = get_field('project_grid');
$related  = get_field('related_posts')[0];

$top10s = array(
	'post_type'   => 'top-10',
	'posts_per_page' => '-1'
);

$context['post']          = $timber_post;
// $context['post_images']  = $images;
$context['projects']      = new Timber\PostQuery($projects);
$context['builder']       = get_field('sections');
// $context['relatedPosts']  = get_posts($related);
$context['relatedPosts']  = new Timber\Post($related);
// $context['relatedPosts']  = var_dump($related);
// $context['relatedPosts']  = Timber::get_posts($related, 'Card');
// $context['relatedPosts']  = new Timber\PostQuery($related);
$context['roles']         = new TimberTerm('design');
$context['image_grid']    = get_field('image_grid');
// $context['power_ranking'] = get_field('power_ranking');
$context['power_rankings'] = Timber::get_posts($top10s);
// $context['power_rankings'] = new Timber\PostQuery($top10s);

Timber::render( array( 'pages/page-' . $timber_post->post_name . '.twig', 'pages/page.twig' ), $context );
