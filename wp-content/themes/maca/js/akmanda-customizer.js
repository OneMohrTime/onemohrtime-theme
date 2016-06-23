/*
*
*	Live Customiser Script
*	------------------------------------------------
*	Swift Framework
* 	Copyright Swift Ideas 2013 - http://www.swiftideas.net
*
*/
( function( $ ){		
	
	// HEADER STYLING

	wp.customize('nav_menu_bg',function( value ) {
		value.bind(function(to) {
			$('.header, .sm-clean, .sm-clean ul').css('background', to ? to : '' );
		});
	});

	wp.customize('nav_menu_text',function( value ) {
		value.bind(function(to) {
			$('#mainmenu .sm-clean a').css('color', to ? to : '' );
			$('.sm-clean a span.sub-arrow').css('border-top-color', to ? to : '' );
		});
	});

	wp.customize('nav_menu_text_hov',function( value ) {
		value.bind(function(to) {
			$('#mainmenu .sm-clean a:hover, #mainmenu .sm-clean a:focus, #mainmenu .sm-clean a:active, #mainmenu .sm-clean a.highlighted, #mainmenu .sm-clean ul a:hover, #mainmenu .sm-clean ul a:focus, #mainmenu .sm-clean ul a:active, #mainmenu .sm-clean ul a.highlighted').css('color', to ? to : '' );
		});
	});

	wp.customize('nav_menu_dropdown_hov',function( value ) {
		value.bind(function(to) {
			$('.sm-clean ul a:hover, .sm-clean ul a:focus, .sm-clean ul a:active, .sm-clean ul a.highlighted').css('background', to ? to : '' );
		});
	});

	// SIDEBAR STYLING

	wp.customize('sidr_bg',function( value ) {
		value.bind(function(to) {
			$('.sidebar-button').css('background', to ? to : '' );
		});
	});

	wp.customize('wid_title',function( value ) {
		value.bind(function(to) {
			$('.widget-title').css('color', to ? to : '' );
		});
	});

	wp.customize('bord_wid',function( value ) {
		value.bind(function(to) {
			$('.bord-widget').css('background-color', to ? to : '' );
		});
	});

	wp.customize('wid_text',function( value ) {
		value.bind(function(to) {
			$('#primary-sidebar a').css('color', to ? to : '' );
		});
	});

	wp.customize('wid_text_hov',function( value ) {
		value.bind(function(to) {
			$('#primary-sidebar a:hover').css('color', to ? to : '' );
		});
	});

	wp.customize('sidebar_bg',function( value ) {
		value.bind(function(to) {
			$('#sidr').css('background', to ? to : '' );
		});
	});


	// CONTENT STYLING

	wp.customize('meta_bg',function( value ) {
		value.bind(function(to) {
			$('.post-meta .icon.post-type').css('background', to ? to : '' );
		});
	});

	wp.customize('meta_icon',function( value ) {
		value.bind(function(to) {
			$('.post-meta .icon.post-type').css('color', to ? to : '' );
		});
	});

	wp.customize('meta_text',function( value ) {
		value.bind(function(to) {
			$('.post-meta li').css('color', to ? to : '' );
		});
	});

	wp.customize('btn',function( value ) {
		value.bind(function(to) {
			$('.more, .wpcf7-submit').css('border-color', to ? to : '' );
			$('.more, .wpcf7-submit').css('color', to ? to : '' );
		});
	});

	wp.customize('btn_hov',function( value ) {
		value.bind(function(to) {
			$('.more:hover, .wpcf7-submit:hover').css('background', to ? to : '' );
			$('.more:hover, .wpcf7-submit:hover').css('border-color', to ? to : '' );
		});
	});

	wp.customize('cont_bg',function( value ) {
		value.bind(function(to) {
			$('.post-content, .comments-title, .comment-list, .comment-respond, .bypostauthor, .post-entry .share-post.sharer-0 label').css('background', to ? to : '' );
		});
	});

	wp.customize('bord_cont',function( value ) {
		value.bind(function(to) {
			$('.bord').css('background-color', to ? to : '' );
		});
	});

	wp.customize('pagina',function( value ) {
		value.bind(function(to) {
			$('.pagination .current, .pagination a:hover').css('background', to ? to : '' );
		});
	});

	wp.customize('pagina_selec',function( value ) {
		value.bind(function(to) {
			$('.pagination a').css('background', to ? to : '' );
		});
	});

	// POST STYLING

	wp.customize('post_title',function( value ) {
		value.bind(function(to) {
			$('.post-title h2 a').css('color', to ? to : '' );
		});
	});

	wp.customize('post_title_hover',function( value ) {
		value.bind(function(to) {
			$('.post-title h2 a:hover').css('color', to ? to : '' );
		});
	});

	wp.customize('post_text',function( value ) {
		value.bind(function(to) {
			$('.inner-content p, .akmanda-excerpt p').css('color', to ? to : '' );
		});
	});

	wp.customize('nav_color',function( value ) {
		value.bind(function(to) {
			$('.nav-next a, .nav-previous a').css('border-color', to ? to : '' );
			$('.nav-next a, .nav-previous a').css('color', to ? to : '' );
		});
	});

	wp.customize('nav_hover',function( value ) {
		value.bind(function(to) {
			$('.nav-next a:hover, .nav-previous a:hover').css('border-color', to ? to : '' );
			$('.nav-next a:hover, .nav-previous a:hover').css('background', to ? to : '' );
		});
	});

	wp.customize('comment_title',function( value ) {
		value.bind(function(to) {
			$('.comments-title .icon, .comments-title').css('color', to ? to : '' );
		});
	});

	wp.customize('comment_avt',function( value ) {
		value.bind(function(to) {
			$('.comment .avatar img').css('border-color', to ? to : '' );
		});
	});

	wp.customize('comment_submit',function( value ) {
		value.bind(function(to) {
			$('input#submit').css('background-color', to ? to : '' );
		});
	});

	wp.customize('comment_submit_hov',function( value ) {
		value.bind(function(to) {
			$('input#submit:hover').css('background-color', to ? to : '' );
		});
	});

	//=========POST FORMAT STYLING======//

	wp.customize('blockquote_color',function( value ) {
		value.bind(function(to) {
			$('.quote-wrap blockquote p').css('color', to ? to : '' );
			$('.quote-wrap blockquote:after').css('border-top-color', to ? to : '' );
		});
	});

	wp.customize('blockquote_bg',function( value ) {
		value.bind(function(to) {
			$('.quote-wrap blockquote').css('background', to ? to : '' );
		});
	});

	wp.customize('blockquote_icon',function( value ) {
		value.bind(function(to) {
			$('.format-link .post-format-link .icon').css('color', to ? to : '' );
		});
	});

	wp.customize('blockquote_author_job',function( value ) {
		value.bind(function(to) {
			$('.quote-wrap cite').css('color', to ? to : '' );
		});
	});

	wp.customize('link_bg',function( value ) {
		value.bind(function(to) {
			$('.format-link .post-format-link').css('background', to ? to : '' );
		});
	});

	//=========FOOTER STYLING======//

	wp.customize('footer_color',function( value ) {
		value.bind(function(to) {
			$('.copyright-footer p').css('color', to ? to : '' );
		});
	});

		wp.customize('footer_bg',function( value ) {
		value.bind(function(to) {
			$('footer').css('background', to ? to : '' );
		});
	});

	

} )( jQuery );