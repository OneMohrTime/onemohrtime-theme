    </main><!-- /.site__main -->
	
	<?php echo get_template_part('template-parts/contact') ?>
    
    <footer class="site__footer">
        
        <div class="site__footer--column plugins">
			<h3>Built With</h3>
			<ul>
				<li><a href="//advancedcustomfields.com/pro" target="_blank">ACF Pro</a></li>
				<li><a href="//bourbon.io" target="_blank">Bourbon</a> + <a href="//sass-lang.com" target="_blank">Sass</a></li>
				<li><a href="//underscores.me" target="_blank">_s Theme</a></li>
				<li><a href="//wordpress.org" target="_blank">Wordpress</a></li>
			</ul>
		</div>
		
        <div class="site__footer--column projects">
			<h3>Projects</h3>
			<ul>
				
				<?php $footer_projects = new WP_Query(array(
					'post_type' => 'design',
					'posts_per_page' => '3'
				));
				
				if($footer_projects->have_posts()):
				while($footer_projects->have_posts()): $footer_projects->the_post(); ?>
				
				<li>
					<a href="<?php the_permalink(); ?>"><?php echo get_the_title(); ?></a>
				</li>
				
				<?php endwhile;
				endif;
				wp_reset_postdata(); ?>
				
			</ul>
		</div>
        
        <div class="site__footer--column social-media">
			<h3>More Work</h3>
			<p>Find me other places online, I swear it&rsquo;s not just food and beard pictures.</p>
			<ul class="icons">
				<li><a target="_blank" href="//twitter.com/OneMohrTime"><i class="fa fa-twitter"></i></a></li>
				<li><a target="_blank" href="//instagram.com/onemohrtimedesign"><i class="fa fa-instagram"></i></a></li>
				<li><a target="_blank" href="//plus.google.com/+DerekMohr" rel="author"><i class="fa fa-google-plus"></i></a></li>
				<li><a target="_blank" href="//dribbble.com/OneMohrTime"><i class="fa fa-dribbble"></i></a></li>
				<li><a target="_blank" href="//onemohrtime.tumblr.com"><i class="fa fa-tumblr"></i></a></li>
			</ul>
        </div>
		
		<div class="clearfix"></div>
        
    </footer>
	
</div><!-- /.site -->

<!--
    
    Site details:
    ________________________
    
    CSS3 Animate It - http://jackonthe.net/css3animateit/
    FontAwesome - https://fontawesome.io/
    Typed.js - https://github.com/mattboldt/typed.js/
    Sticky-kit.js - https://github.com/leafo/sticky-kit
    Dribbble plugin - https://github.com/tylergaw/jribbble
    
    @onemohrtime
    
-->

<?php wp_footer(); ?>

</body>

</html>