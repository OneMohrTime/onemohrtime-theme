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

$logos = [
    'post_type' => 'logo',
    'posts_per_page' => -1,
    'orderby' => 'title',
    'order' => 'ASC',
];
$top10s = [
    'post_type' => 'top-10',
    'posts_per_page' => -1,
    'orderby' => 'rand',
    // 'order' => 'ASC',
];
if (isset($_GET['sort'])) {
    switch ($_GET['sort']) {
        case 'date':
            $args['orderby'] = 'date';
            $args['order'] = 'DESC';
            break;
        case 'random':
            $args['orderby'] = 'rand';
            break;
        case 'alphabetical':
        default:
            $args['orderby'] = 'title';
            $args['order'] = 'ASC';
            break;
    }
}
if (!empty($_GET['job_type'])) {
    $args['tax_query'] = [
        [
            'taxonomy' => 'job_type',
            'field' => 'slug',
            'terms' => $_GET['job_type'],
        ],
    ];
}
$project_grid = get_field('project_grid');
$personality_traits = get_field('personality_traits');
$work_history = get_field('work_history');
$education = get_field('education');
$creative_services = get_field('creative_services');
$photo_shoots = get_field('photo_shoots');
$related_posts = get_field('related_posts');

$context['post']         = $timber_post;
$context['projectGrid']  = $project_grid;
$context['personality']  = $personality_traits;
$context['resume']       = $work_history;
$context['education']    = $education;
$context['allServices']  = $creative_services;
$context['photoShoots']  = $photo_shoots;
$context['relatedPosts'] = $related_posts;
$context['logofolio']    = Timber::get_posts($logos);
$context['job_types']    = Timber::get_terms('job_type');
$context['top10s']       = Timber::get_posts($top10s);

$templates        = array( '_views/page-' . $timber_post->post_name . '.twig', '_layouts/page.twig' );
if ( is_front_page() ) {
    array_unshift( $templates, '_views/front-page.twig' );
}
Timber::render( $templates, $context );
