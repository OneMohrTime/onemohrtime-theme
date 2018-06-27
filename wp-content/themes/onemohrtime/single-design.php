<?php
/**
 * Single page template
 *
 * @package  WordPress
 * @subpackage  SageTimber
 * @since  SageTimber 0.1
 */

$context = Timber::get_context();
$post    = new TimberPost();

$context['banner']   = get_field('project_header');
$context['details']  = get_field('project_deets');
$context['sections'] = get_field('project_specs');

Timber::render('pages/single-design.twig', $context);