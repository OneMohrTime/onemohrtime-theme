<?php 

$contact = get_post('24');
?>

<section id="contact" class="site__contact">
	<?php //echo do_shortcode('[ninja_form id=1]'); // localhost ?>
	<?php echo do_shortcode('[ninja_form id=3]'); // production ?>
</section>