<?php
/**
 * Single page template
 *
 * @package  WordPress
 * @subpackage  SageTimber
 * @since  SageTimber 0.1
 */
 
$context = array();

$context['sidebar']         = Timber::get_sidebar('sidebar.twig');
$context['dynamic_sidebar'] = Timber::get_widgets('dynamic_sidebar');

Timber::render('sidebar.twig', $context);