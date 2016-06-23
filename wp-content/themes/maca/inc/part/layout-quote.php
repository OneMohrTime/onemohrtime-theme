<div class="quote-wrap">
	<div class="quote-thumb"><img src="<?php echo get_field('author_image'); ?>" alt="<?php echo get_field('quote_author'); ?>"></div>
		<blockquote> 
			<p><?php echo get_field('quote_sentence'); ?></p>
		</blockquote>
	<div class="quote-attribution">
		<p class="quote-author"><?php echo get_field('quote_author'); ?></p>
		<cite><?php echo get_field('author_job'); ?></cite>
	</div>
</div>