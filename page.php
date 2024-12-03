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

$timber_post  = Timber::get_post();

// $paged = get_query_var('paged') ?: 1; // Get the current page number
$project_grid = get_field('project_grid');
$personality_traits = get_field('personality_traits');
$work_history = get_field('work_history');
$education = get_field('education');
$related_posts = get_field('related_posts');

$context['post']         = $timber_post;
$context['projectGrid']  = $project_grid;
$context['personality']  = $personality_traits;
$context['resume']       = $work_history;
$context['education']    = $education;
$context['relatedPosts'] = $related_posts;

$templates        = array( '_views/page-' . $timber_post->post_name . '.twig', '_layouts/page.twig' );
if ( is_front_page() ) {
    array_unshift( $templates, '_views/front-page.twig' );
}
Timber::render( $templates, $context );
