<?php if ( ! function_exists( 'akmanda_comment' ) ) :

function akmanda_comment( $comment, $args, $depth ) {
	$GLOBALS['comment'] = $comment;
	switch ( $comment->comment_type ) :
	default :
	?>
	<li <?php comment_class(); ?> id="li-comment-<?php comment_ID(); ?>">
		<article id="comment-<?php comment_ID(); ?>" class="comment">
			<header class="clearfix">
				<div class="avatar pull-left">
					<?php echo get_avatar( $comment, 50 ); ?>
				</div><!-- avatar -->
                <div class="meta-comment pull-left">
                <div class="comment-author vcard">
                <?php printf( __( '%s', 'maca' ), sprintf( '<cite class="fn">%s</cite>', get_comment_author_link() ) ); ?>
                </div><!-- .comment-author .vcard -->
                
				<?php if ( $comment->comment_approved == '0' ) : ?>
                	<div class="waiting-moderation">
					<em><?php _e( 'Your comment is awaiting moderation.', 'maca' ); ?></em>
					</div>
				<?php endif; ?>

				<div class="comment-meta commentmetadata">
					<time datetime="<?php comment_time( 'c' ); ?>">
					<?php printf( _x( '%1$s', '1: date', 'maca' ), get_comment_date()); ?>
					</time>
				</div><!-- .comment-meta .commentmetadata -->
               

                <div class="comment-action">
            	<span class="edit-comment-link"><?php edit_comment_link( __( 'Edit', 'maca' ), '<span class="edit-link">', '<span>' ); ?></span>
                
            	<span class="reply-container"><?php comment_reply_link( array_merge( $args, array( 'depth' => $depth, 'max_depth' => $args['max_depth'] ) ) ); ?></span>
                <span class="reply-icon"></span>
			</div><!-- .comment-action -->

                 </div><!-- meta comment -->
			</header>

			<div class="comment-content"><?php comment_text(); ?></div>

			
		</article><!-- #comment-## -->

	<?php
			break;
	endswitch;
}
endif;

function akmanda_comment_form(){

$commenter = wp_get_current_commenter();
$req = get_option( 'require_name_email' );
$aria_req = ( $req ? " aria-required='true'" : '' );

$comments_args = array( 
		'author' => '<p>' . '<input id="author" name="author" type="text" value="' . esc_attr( $commenter['comment_author'] ) . '" size="50"' . $aria_req . ' />
					<label for="author">Name</label> ' . ( $req ? '<span>*</span>' : '' ) . '</p>',
 
 		'email'  => '<p><input id="email" name="email" type="text" value="' . esc_attr(  $commenter['comment_author_email'] ) . '" size="30"' . $aria_req . ' />
					<label for="email">Email</label> ' . ( $req ? '<span>*</span>' : '' ) . '</p>',
					
 		'url'    => '<p><input id="url" name="url" type="text" value="' . esc_attr( $commenter['comment_author_url'] ) . '" size="30" />
					<label for="url">Website</label>' . '</p>',
        // change the title of send button 
        'label_submit'=>'Post Comment',
        // change the title of the reply section
        'title_reply'=>'Write a Reply or Comment',
        // remove "Text or HTML to be displayed after the set of comment fields"
        'comment_notes_after' => '',
        // redefine your own textarea (the comment body)
        'comment_field' => '<p class="comment-form-comment"><label for="comment"> Comment </label>
							<textarea id="comment" name="comment" cols="45" rows="8" aria-required="true"></textarea></p>',
);

comment_form($comments_args);

}