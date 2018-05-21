<?php
/**
 * Front page template file
 *
 * @package  WordPress
 * @subpackage  SageTimber
 * @since  SageTimber 0.1
 */

$context = Timber::get_context();
$post = new TimberPost();

$context['post']    = $post;
$context['swiper']  = get_field('homepage_hero');
//$context['featured'] = get_field('homepage_feature');

Timber::render('pages/front-page.twig', $context);