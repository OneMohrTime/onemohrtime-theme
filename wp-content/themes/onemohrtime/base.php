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
			get_template_part('templates/header');
			
			if(is_front_page()) {
				$template_class = ' homepage';
			} elseif(is_home()) {
				$template_class = ' posts';
			} elseif(is_singular('design')) {
				$template_class = ' project';
			} elseif(is_single()) {
				$template_class = ' blog-post';
			} elseif(is_page('design')) {
				$template_class = ' gallery';
			} elseif(is_page()) {
				$template_class = ' halfie';
			} else {
				$template_class = '';
			}?>
			
			<main id="main" class="site__main content-area<?php echo $template_class ?>" role="main">
				<?php include Wrapper\template_path(); ?>
			</main><!-- /.site__main -->
			
			<?php if (Setup\display_sidebar()) : ?>
			<aside id="secondary" class="site__sidebar widget-area" role="complementary">
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