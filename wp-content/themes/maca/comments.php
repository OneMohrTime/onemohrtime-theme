<?php
if ( post_password_required() )
return;
?>

<div id="comments" class="comments-area row" data-scrollReveal="bottom">

	<?php if ( have_comments() ) : ?>

		<div class="comments-title" data-scrollReveal="bottom">
			<i class="icon icon-discussion"></i>

				<?php printf( _nx( 'One Comment %2$s', '%1$s Comments', get_comments_number(), 'comments title', 'maca' ), number_format_i18n( get_comments_number() ), ' ' );?>
			<div class="bord" data-scrollReveal="bottom"></div>
		</div>


		<?php if ( get_comment_pages_count() > 1 && get_option( 'page_comments' ) ) : // are there comments to navigate through ?>

			<nav id="comment-nav-above" class="navigation-comment" role="navigation" data-scrollReveal="bottom">
				<h1 class="screen-reader-text"><?php _e( 'Comment navigation', 'maca' ); ?></h1>
				<div class="nav-previous"><?php previous_comments_link( __( '&larr; Older Comments', 'maca' ) ); ?></div>
				<div class="nav-next"><?php next_comments_link( __( 'Newer Comments &rarr;', 'maca' ) ); ?></div>
			</nav><!-- #comment-nav-before -->

		<?php endif; // check for comment navigation ?>

		<ol class="comment-list" data-scrollReveal="bottom">
			<?php
				wp_list_comments( array( 'callback' => 'akmanda_comment' ) );
			?>
		</ol><!-- .comment-list -->

		<?php if ( get_comment_pages_count() > 1 && get_option( 'page_comments' ) ) : // are there comments to navigate through ?>
			<nav id="comment-nav-below" class="navigation-comment" role="navigation">
				<h1 class="screen-reader-text"><?php _e( 'Comment navigation', 'maca' ); ?></h1>
				<div class="nav-previous"><?php previous_comments_link( __( '&larr; Older Comments', 'maca' ) ); ?></div>
				<div class="nav-next"><?php next_comments_link( __( 'Newer Comments &rarr;', 'maca' ) ); ?></div>
			</nav><!-- #comment-nav-below -->
		<?php endif; // check for comment navigation ?>

	<?php endif; // have_comments() ?>

	<?php
	// If comments are closed and there are comments, let's leave a little note, shall we?
	if ( ! comments_open() && '0' != get_comments_number() && post_type_supports( get_post_type(), 'comments' ) ) :
	?>
		<p class="no-comments"><?php _e( 'Comments are closed.', 'maca' ); ?></p>
	<?php endif; ?>

<?php akmanda_comment_form(); ?>

</div><!-- #comments -->
