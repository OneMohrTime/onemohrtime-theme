<?php
/**
 * Single page template
 *
 * @package  WordPress
 * @subpackage  SageTimber
 * @since  SageTimber 0.1
 */
 
$context = array();
$context['dynamic_sidebar'] = Timber::get_widgets('dynamic_sidebar');