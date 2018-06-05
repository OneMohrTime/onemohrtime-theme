<?php
/**
 * Project page template file
 *
 * @package  WordPress
 * @subpackage  SageTimber
 * @since  SageTimber 0.1
 */

$context = Timber::get_context();
$args = array(
	'post_type'      => 'design',
	'posts_per_page' => -1,
	'orderby'        => 'menu_order',
	'order'          => 'DESC'
);
$context['gallery'] = Timber::get_posts( $args );

Timber::render('pages/page-design.twig', $context);