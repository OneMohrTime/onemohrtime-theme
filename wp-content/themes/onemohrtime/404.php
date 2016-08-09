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

						the_widget( 'WP_Widget_Recent_Posts' );

						// Only show the widget if site has multiple categories.
						if ( onemohrtime_categorized_blog() ) :
					?>

					<div class="widget widget_categories">
						<h2 class="widget-title"><?php esc_html_e( 'Most Used Categories', 'onemohrtime' ); ?></h2>
						<ul>
						<?php
							wp_list_categories( array(
								'orderby'    => 'count',
								'order'      => 'DESC',
								'show_count' => 1,
								'title_li'   => '',
								'number'     => 10,
							) );
						?>
						</ul>
					</div><!-- .widget -->

					<?php
						endif;

						/* translators: %1$s: smiley */
						$archive_content = '<p>' . sprintf( esc_html__( 'Try looking in the monthly archives. %1$s', 'onemohrtime' ), convert_smilies( ':)' ) ) . '</p>';
						the_widget( 'WP_Widget_Archives', 'dropdown=1', "after_title=</h2>$archive_content" );

						the_widget( 'WP_Widget_Tag_Cloud' );
					?>

				</div><!-- .page-content -->
			</section><!-- .error-404 -->

		</main><!-- #main -->
	</div><!-- #primary -->

<?php
get_footer();
