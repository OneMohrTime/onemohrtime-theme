<?php
/**
 * The Template for the sidebar containing the main widget area
 *
 * @package  WordPress
 * @subpackage  Timber
 */

$context = array();

$context['sidebar']         = Timber::get_sidebar('sidebar.twig');
$context['dynamic_sidebar'] = Timber::get_widgets('dynamic_sidebar');

Timber::render( array( 'components/sidebar.twig' ), $context );
