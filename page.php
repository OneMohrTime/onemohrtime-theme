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

$context = Timber::context();

$timber_post = new Timber\Post();

// $images = get_children( array(
// 	'post_parent'    => 1,
// 	'post_type'      => 'attachment',
// 	'post_mime_type' => 'image',
// 	'orderby'        => 'menu_order',
// 	'order'          => 'ASC',
// 	'numberposts'    => 999 ) );
$projects  = get_field('project_grid');

$context['post']        = $timber_post;
// $context['post_images'] = $images;
$context['projects']    = Timber::get_posts( $projects );
$context['builder']     = get_field('sections');
$context['roles']       = new TimberTerm('design');
$context['image_grid']  = get_field('image_grid');

Timber::render( array( 'pages/page-' . $timber_post->post_name . '.twig', 'pages/page.twig' ), $context );
