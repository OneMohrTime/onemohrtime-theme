<?php
/**
 * The Template for the sidebar containing the main widget area
 *
 * @package  WordPress
 * @subpackage  Timber
 */

$context = [
    'dynamic_sidebar' => Timber::get_widgets('globalSidebar'),
];

Timber::render('_partials/sidebar.twig', $context);
