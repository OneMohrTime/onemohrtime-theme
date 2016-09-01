<?php
/**
 * The template for displaying 404 pages (not found).
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package onemohrtime
 */

get_header(); ?>
    
	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">
            
			<section class="error-404 not-found">
                
                <!-- animation from https://codepen.io/escapedcat/pen/uCgJf -->
                <figure class="error-cogs">
                    <span class="fa fa-spin fa-cog"></span>
                    <span class="fa fa-spin fa-spin-reverse fa-cog"></span>
                    <span class="fa fa-spin fa-cog"></span>
                </figure>
                
				<header class="entry-header">
					<h1 class="entry-title"><?php esc_html_e( 'The Dreaded 404 Page', 'onemohrtime' ); ?></h1>
				</header>
                
				<div class="entry-content">
					<p><?php esc_html_e( 'Not saying it&rsquo;s my fault, but either I moved that page or you typed something wrong. Maybe one of these are what you&rsquo;re looking for?', 'onemohrtime' ); ?></p>
                    
					<?php
						get_search_form();
                        
						// Only show the widget if site has multiple categories.
						if ( onemohrtime_categorized_blog() ) :
					?>
                    
					<?php endif; ?>
				</div>
                
                <div class="links">
                    <ul>
                        <li><a class="btn" href="design">Designs</a></li>
                        <li><a class="btn" href="about">About Me</a></li>
                        <li><a class="btn" href="hello">Contact</a></li>
                        <li><a class="btn" href="blog">Blog</a></li>
                    </ul>
                </div>
                
			</section>
            
		</main>
	</div>
    
<?php

get_footer();