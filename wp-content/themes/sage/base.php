<?php

use Roots\Sage\Setup;
use Roots\Sage\Wrapper; ?>

<!doctype html>
<html <?php language_attributes(); ?>>
	
	<?php get_template_part('templates/head'); ?>
	
	<body <?php body_class(); ?>>
		
		<div id="page" class="site" role="document">
			
			<?php
			do_action('get_header');
			get_template_part('templates/header'); ?>
			
			<main id="main" class="site__main">
				<?php include Wrapper\template_path(); ?>
			</main><!-- /.site__main -->
			
			<?php if (Setup\display_sidebar()) : ?>
			<aside class="sidebar">
				<?php include Wrapper\sidebar_path(); ?>
			</aside><!-- /.site__sidebar -->
			<?php endif; ?>
			
			<?php //echo get_template_part('template-parts/contact') ?>
			
			<?php
			do_action('get_footer');
			get_template_part('templates/footer');
			wp_footer(); ?>
			
		</div><!-- /.site -->
		
	</body>
	
</html>