<?php
/**
 * Front page template file
 *
 * @package  WordPress
 */

$context     = Timber::context();
$timber_post = new Timber\Post();

$context['post']          = $timber_post;
$context['tagline']       = get_field('homepage_tagline');
$context['callToActions'] = get_field('homepage_ctas');
$context['caseStudies']   = get_field('case_studies');
$context['contact']       = get_field('contact');
$context['feature1']      = get_field('feature_1');
$context['feature2']      = get_field('feature_2');
$context['additional']    = get_field('additional_links');

Timber::render( 'pages/front-page.twig', $context );
