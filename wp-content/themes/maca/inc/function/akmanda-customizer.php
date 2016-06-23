<?php 

	/*
	*
	*	Theme Customizer Options
	*	------------------------------------------------
	*	Akmanda Framework
	* 	Copyright Themes Awesome 2013 - http://www.themesawesome.com
	*
	*	akmanda_customize_register()
	*	akmanda_customize_preview()
	*
	*/
	
	if (!function_exists('akmanda_customize_register')) {
		function akmanda_customize_register($wp_customize) {
		
			$wp_customize->get_setting('blogname')->transport='postMessage';
			$wp_customize->get_setting('blogdescription')->transport='postMessage';
			$wp_customize->get_setting('header_textcolor')->transport='postMessage';

	
			/* HEADER STYLING
			================================================== */
			
			$wp_customize->add_section( 'header_styling', array(
				'title'		=>	__( 'Header', 'maca' ),
				'priority'	=>	204,
			) );
			
			//SECTION

			$wp_customize->add_setting( 'nav_menu_bg', array(
				'default'		=> 	'#ffffff',
				'type'			=> 	'option',
				'transport'		=> 	'postMessage',
				'capability'	=>	'edit_theme_options',
				'sanitize_callback' => 'sanitize_hex_color',
			) );

			$wp_customize->add_setting( 'nav_menu_text', array(
				'default'		=> 	'#555555',
				'type'			=> 	'option',
				'transport'		=> 	'postMessage',
				'capability'	=>	'edit_theme_options',
				'sanitize_callback' => 'sanitize_hex_color',
			) );

			$wp_customize->add_setting( 'nav_menu_text_hov', array(
				'default'		=> 	'#D23600',
				'type'			=> 	'option',
				'capability'	=>	'edit_theme_options',
				'sanitize_callback' => 'sanitize_hex_color',
			) );

			$wp_customize->add_setting( 'nav_menu_dropdown_hov', array(
				'default'		=> 	'#eeeeee',
				'type'			=> 	'option',
				'capability'	=>	'edit_theme_options',
				'sanitize_callback' => 'sanitize_hex_color',
			) );

			//CONTROL
			
			$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'nav_menu_bg', array(
				'label'		=>	__( 'Menu Background', 'maca' ),
				'section'	=>	'header_styling',
				'settings'	=>	'nav_menu_bg',
				'priority'	=>	1,
			) ) );

			$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'nav_menu_text', array(
				'label'		=>	__( 'Menu Text Color', 'maca' ),
				'section'	=>	'header_styling',
				'settings'	=>	'nav_menu_text',
				'priority'	=>	2,
			) ) );

			$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'nav_menu_text_hov', array(
				'label'		=>	__( 'Menu Text Hover', 'maca' ),
				'section'	=>	'header_styling',
				'settings'	=>	'nav_menu_text_hov',
				'priority'	=>	3,
			) ) );

			$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'nav_menu_dropdown_hov', array(
				'label'		=>	__( 'Menu Dropdown Hover', 'maca' ),
				'section'	=>	'header_styling',
				'settings'	=>	'nav_menu_dropdown_hov',
				'priority'	=>	4,
			) ) );

			/* SIDEBAR STYLING
			================================================== */
			
			$wp_customize->add_section( 'sidebar_styling', array(
				'title'		=>	__( 'Sidebar', 'maca' ),
				'priority'	=>	205,
			) );
			
			//SECTION

			$wp_customize->add_setting( 'sidr_bg', array(
				'default'		=> 	'#ffffff',
				'type'			=> 	'option',
				'transport'		=> 	'postMessage',
				'capability'	=>	'edit_theme_options',
				'sanitize_callback' => 'sanitize_hex_color',
			) );

			$wp_customize->add_setting( 'wid_title', array(
				'default'		=> 	'#ffffff',
				'type'			=> 	'option',
				'transport'		=> 	'postMessage',
				'capability'	=>	'edit_theme_options',
				'sanitize_callback' => 'sanitize_hex_color',
			) );

			$wp_customize->add_setting( 'bord_wid', array(
				'default'		=> 	'#e5e5e5',
				'type'			=> 	'option',
				'transport'		=> 	'postMessage',
				'capability'	=>	'edit_theme_options',
				'sanitize_callback' => 'sanitize_hex_color',
			) );

			$wp_customize->add_setting( 'wid_text', array(
				'default'		=> 	'#ffffff',
				'type'			=> 	'option',
				'transport'		=> 	'postMessage',
				'capability'	=>	'edit_theme_options',
				'sanitize_callback' => 'sanitize_hex_color',
			) );

			$wp_customize->add_setting( 'wid_text_hov', array(
				'default'		=> 	'#d23600',
				'type'			=> 	'option',
				'capability'	=>	'edit_theme_options',
				'sanitize_callback' => 'sanitize_hex_color',
			) );

			$wp_customize->add_setting( 'sidebar_bg', array(
				'default'		=> 	'#000000',
				'type'			=> 	'option',
				'transport'		=> 	'postMessage',
				'capability'	=>	'edit_theme_options',
				'sanitize_callback' => 'sanitize_hex_color',
			) );

			//CONTROL
			
			$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'sidr_bg', array(
				'label'		=>	__( 'Sidebar Button Background', 'maca' ),
				'section'	=>	'sidebar_styling',
				'settings'	=>	'sidr_bg',
				'priority'	=>	1,
			) ) );

			$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'wid_title', array(
				'label'		=>	__( 'Widget Title', 'maca' ),
				'section'	=>	'sidebar_styling',
				'settings'	=>	'wid_title',
				'priority'	=>	2,
			) ) );

			$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'bord_wid', array(
				'label'		=>	__( 'Widget Border', 'maca' ),
				'section'	=>	'sidebar_styling',
				'settings'	=>	'bord_wid',
				'priority'	=>	3,
			) ) );

			$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'wid_text', array(
				'label'		=>	__( 'Widget Text Area', 'maca' ),
				'section'	=>	'sidebar_styling',
				'settings'	=>	'wid_text',
				'priority'	=>	4,
			) ) );

			$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'wid_text_hov', array(
				'label'		=>	__( 'Widget Text Hover', 'maca' ),
				'section'	=>	'sidebar_styling',
				'settings'	=>	'wid_text_hov',
				'priority'	=>	5,
			) ) );

			$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'sidebar_bg', array(
				'label'		=>	__( 'Sidebar Background', 'maca' ),
				'section'	=>	'sidebar_styling',
				'settings'	=>	'sidebar_bg',
				'priority'	=>	6,
			) ) );

			/* CONTENT STYLING
			================================================== */
			
			$wp_customize->add_section( 'content_styling', array(
				'title'		=>	__( 'Content', 'maca' ),
				'priority'	=>	206,
			) );
			
			//SECTION

			$wp_customize->add_setting( 'meta_bg', array(
				'default'		=> 	'#000000',
				'type'			=> 	'option',
				'transport'		=> 	'postMessage',
				'capability'	=>	'edit_theme_options',
				'sanitize_callback' => 'sanitize_hex_color',
			) );

			$wp_customize->add_setting( 'meta_icon', array(
				'default'		=> 	'#ffffff',
				'type'			=> 	'option',
				'transport'		=> 	'postMessage',
				'capability'	=>	'edit_theme_options',
				'sanitize_callback' => 'sanitize_hex_color',
			) );

			$wp_customize->add_setting( 'meta_text', array(
				'default'		=> 	'#2C3033',
				'type'			=> 	'option',
				'transport'		=> 	'postMessage',
				'capability'	=>	'edit_theme_options',
				'sanitize_callback' => 'sanitize_hex_color',
			) );

			$wp_customize->add_setting( 'btn', array(
				'default'		=> 	'#000000',
				'type'			=> 	'option',
				'transport'		=> 	'postMessage',
				'capability'	=>	'edit_theme_options',
				'sanitize_callback' => 'sanitize_hex_color',
			) );

			$wp_customize->add_setting( 'btn_hov', array(
				'default'		=> 	'#000000',
				'type'			=> 	'option',
				'capability'	=>	'edit_theme_options',
				'sanitize_callback' => 'sanitize_hex_color',
			) );

			$wp_customize->add_setting( 'cont_bg', array(
				'default'		=> 	'#ffffff',
				'type'			=> 	'option',
				'transport'		=> 	'postMessage',
				'capability'	=>	'edit_theme_options',
				'sanitize_callback' => 'sanitize_hex_color',
			) );

			$wp_customize->add_setting( 'bord_cont', array(
				'default'		=> 	'#e5e5e5',
				'type'			=> 	'option',
				'transport'		=> 	'postMessage',
				'capability'	=>	'edit_theme_options',
				'sanitize_callback' => 'sanitize_hex_color',
			) );

			$wp_customize->add_setting( 'pagina', array(
				'default'		=> 	'#000000',
				'type'			=> 	'option',
				'capability'	=>	'edit_theme_options',
				'sanitize_callback' => 'sanitize_hex_color',
			) );

			$wp_customize->add_setting( 'pagina_selec', array(
				'default'		=> 	'#ffffff',
				'type'			=> 	'option',
				'transport'		=> 	'postMessage',
				'capability'	=>	'edit_theme_options',
				'sanitize_callback' => 'sanitize_hex_color',
			) );

			//CONTROL
			
			$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'meta_bg', array(
				'label'		=>	__( 'Meta Icon Background', 'maca' ),
				'section'	=>	'content_styling',
				'settings'	=>	'meta_bg',
				'priority'	=>	1,
			) ) );

			$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'meta_icon', array(
				'label'		=>	__( 'Meta Icon Color', 'maca' ),
				'section'	=>	'content_styling',
				'settings'	=>	'meta_icon',
				'priority'	=>	2,
			) ) );

			$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'meta_text', array(
				'label'		=>	__( 'Meta Text', 'maca' ),
				'section'	=>	'content_styling',
				'settings'	=>	'meta_text',
				'priority'	=>	3,
			) ) );

			$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'btn', array(
				'label'		=>	__( 'Button', 'maca' ),
				'section'	=>	'content_styling',
				'settings'	=>	'btn',
				'priority'	=>	4,
			) ) );

			$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'btn_hov', array(
				'label'		=>	__( 'Button Hover', 'maca' ),
				'section'	=>	'content_styling',
				'settings'	=>	'btn_hov',
				'priority'	=>	5,
			) ) );

			$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'cont_bg', array(
				'label'		=>	__( 'Post Content Background', 'maca' ),
				'section'	=>	'content_styling',
				'settings'	=>	'cont_bg',
				'priority'	=>	6,
			) ) );

			$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'bord_cont', array(
				'label'		=>	__( 'Content Border', 'maca' ),
				'section'	=>	'content_styling',
				'settings'	=>	'bord_cont',
				'priority'	=>	7,
			) ) );

			$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'pagina', array(
				'label'		=>	__( 'Pagination Current', 'maca' ),
				'section'	=>	'content_styling',
				'settings'	=>	'pagina',
				'priority'	=>	9,
			) ) );

			$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'pagina_selec', array(
				'label'		=>	__( 'Pagination', 'maca' ),
				'section'	=>	'content_styling',
				'settings'	=>	'pagina_selec',
				'priority'	=>	8,
			) ) );

			/* POST STYLING
			================================================== */
			
			$wp_customize->add_section( 'post_styling', array(
				'title'		=>	__( 'Post', 'maca' ),
				'priority'	=>	207,
			) );
			
			//SECTION

			$wp_customize->add_setting( 'post_title', array(
				'default'		=> 	'#000000',
				'type'			=> 	'option',
				'transport'		=> 	'postMessage',
				'capability'	=>	'edit_theme_options',
				'sanitize_callback' => 'sanitize_hex_color',
			) );

			$wp_customize->add_setting( 'post_title_hover', array(
				'default'		=>	'#d23600',
				'type'			=>	'option',
				'capability'	=>	'edit_theme_options',
				'sanitize_callback' => 'sanitize_hex_color',
			) );

			$wp_customize->add_setting( 'post_text', array(
				'default'		=>	'#2C3033',
				'type'			=>	'option',
				'transport'		=> 	'postMessage',
				'capability'	=>	'edit_theme_options',
				'sanitize_callback' => 'sanitize_hex_color',
			) );

			$wp_customize->add_setting( 'nav_color', array(
				'default'		=>	'#000000',
				'type'			=>	'option',
				'transport'		=>	'postMessage',
				'capability'	=>	'edit_theme_options',
				'sanitize_callback' => 'sanitize_hex_color',
			) );

			$wp_customize->add_setting( 'nav_hov', array(
				'default'		=>	'#2C3033',
				'type'			=>	'option',
				'capability'	=>	'edit_theme_options',
				'sanitize_callback' => 'sanitize_hex_color',
			) );

			$wp_customize->add_setting( 'comment_title', array(
				'default'		=>	'#000000',
				'type'			=>	'option',
				'transport'		=>	'postMessage',
				'capability'	=>	'edit_theme_options',
				'sanitize_callback' => 'sanitize_hex_color',
			) );

			$wp_customize->add_setting( 'comment_avt', array(
				'default'		=>	'#000000',
				'type'			=>	'option',
				'transport'		=>	'postMessage',
				'capability'	=>	'edit_theme_options',
				'sanitize_callback' => 'sanitize_hex_color',
			) );

			$wp_customize->add_setting( 'comment_submit', array(
				'default'		=>	'#000000',
				'type'			=>	'option',
				'transport'		=>	'postMessage',
				'capability'	=>	'edit_theme_options',
				'sanitize_callback' => 'sanitize_hex_color',
			) );

			$wp_customize->add_setting( 'comment_submit_hov', array(
				'default'		=>	'#2C3033',
				'type'			=>	'option',
				'capability'	=>	'edit_theme_options',
				'sanitize_callback' => 'sanitize_hex_color',
			) );

			//CONTROL
			
			$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'post_title', array(
				'label'		=>	__( 'Post and Page Title', 'maca' ),
				'section'	=>	'post_styling',
				'settings'	=>	'post_title',
				'priority'	=>	1,
			) ) );

			$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'post_title_hover', array(
				'label'		=>	__( 'Post and Page Title Hover', 'maca' ),
				'section'	=>	'post_styling',
				'settings'	=>	'post_title_hover',
				'priority'	=>	2,
			) ) );

			$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'post_text', array(
				'label'		=>	__( 'Post Text Color', 'maca' ),
				'section'	=>	'post_styling',
				'settings'	=>	'post_text',
				'priority'	=>	3,
			) ) );

			$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'nav_color', array(
				'label'		=>	__( 'Post Navigation Color', 'maca' ),
				'section'	=>	'post_styling',
				'settings'	=>	'nav_color',
				'priority'	=>	4,
			) ) );

			$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'nav_hov', array(
				'label'		=>	__( 'Post Navigation Hover', 'maca' ),
				'section'	=>	'post_styling',
				'settings'	=>	'nav_hov',
				'priority'	=>	5,
			) ) );

			$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'comment_title', array(
				'label'		=>	__( 'Comment Title', 'maca' ),
				'section'	=>	'post_styling',
				'settings'	=>	'comment_title',
				'priority'	=>	6,
			) ) );

			$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'comment_avt', array(
				'label'		=>	__( 'Comment Avatar Border', 'maca' ),
				'section'	=>	'post_styling',
				'settings'	=>	'comment_avt',
				'priority'	=>	7,
			) ) );

			$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'comment_submit', array(
				'label'		=>	__( 'Comment Submit Button', 'maca' ),
				'section'	=>	'post_styling',
				'settings'	=>	'comment_submit',
				'priority'	=>	8,
			) ) );

			$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'comment_submit_hov', array(
				'label'		=>	__( 'Comment Submit Hover', 'maca' ),
				'section'	=>	'post_styling',
				'settings'	=>	'comment_submit_hov',
				'priority'	=>	9,
			) ) );

			/* FORMAT STYLING
			================================================== */
			
			$wp_customize->add_section( 'format_styling', array(
				'title'		=>	__( 'Format', 'maca' ),
				'priority'	=>	208,
			) );
			
			//SECTION

			//Setting
			$wp_customize->add_setting( 'blockquote_color', array(
				'default'		=>	'#000000',
				'type'			=>	'option',
				'transport'		=>	'postMessage',
				'capability'	=>	'edit_theme_options',
				'sanitize_callback' => 'sanitize_hex_color',
			) );

			$wp_customize->add_setting( 'blockquote_bg', array(
				'default'		=>	'#ffffff',
				'type'			=>	'option',
				'transport'		=>	'postMessage',
				'capability'	=>	'edit_theme_options',
				'sanitize_callback' => 'sanitize_hex_color',
			) );

			$wp_customize->add_setting( 'blockquote_icon', array(
				'default'		=>	'#000000',
				'type'			=>	'option',
				'transport'		=>	'postMessage',
				'capability'	=>	'edit_theme_options',
				'sanitize_callback' => 'sanitize_hex_color',
			) );

			$wp_customize->add_setting( 'blockquote_author_job', array(
				'default'		=>	'#000000',
				'type'			=>	'option',
				'transport'		=>	'postMessage',
				'capability'	=>	'edit_theme_options',
				'sanitize_callback' => 'sanitize_hex_color',
			) );

			$wp_customize->add_setting( 'link_bg', array(
				'default'		=>	'#ffffff',
				'type'			=>	'option',
				'transport'		=>	'postMessage',
				'capability'	=>	'edit_theme_options',
				'sanitize_callback' => 'sanitize_hex_color',
			) );

			//CONTROL
			
			$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'blockquote_color', array(
				'label'		=>	__( 'Blockquote Color', 'maca' ),
				'section'	=>	'format_styling',
				'settings'	=>	'blockquote_color',
				'priority'	=>	1,
			) ) );

			$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'blockquote_bg', array(
				'label'		=>	__( 'Blockquote Background Color', 'maca' ),
				'section'	=>	'format_styling',
				'settings'	=>	'blockquote_bg',
				'priority'	=>	2,
			) ) );

			$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'blockquote_icon', array(
				'label'		=>	__( 'Link Icon Color', 'maca' ),
				'section'	=>	'format_styling',
				'settings'	=>	'blockquote_icon',
				'priority'	=>	4,
			) ) );

			$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'blockquote_author_job', array(
				'label'		=>	__( 'Blockquote Cite Color', 'maca' ),
				'section'	=>	'format_styling',
				'settings'	=>	'blockquote_author_job',
				'priority'	=>	3,
			) ) );

			$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'link_bg', array(
				'label'		=>	__( 'Link Background', 'maca' ),
				'section'	=>	'format_styling',
				'settings'	=>	'link_bg',
				'priority'	=>	5,
			) ) );

			/* FOOTER STYLING
			================================================== */
			
			//Section
			$wp_customize->add_section( 'footer_styling', array(
				'title'		=>	__( 'Footer', 'maca' ),
				'priority'	=>	209,
			) );
			
			//Setting
			$wp_customize->add_setting( 'footer_color', array(
				'default'		=>	'#2C3033',
				'type'			=>	'option',
				'transport'		=>	'postMessage',
				'capability'	=>	'edit_theme_options',
				'sanitize_callback' => 'sanitize_hex_color',
			) );

			$wp_customize->add_setting( 'footer_bg', array(
				'default'		=>	'#ffffff',
				'type'			=>	'option',
				'transport'		=>	'postMessage',
				'capability'	=>	'edit_theme_options',
				'sanitize_callback' => 'sanitize_hex_color',
			) );

			//control
			$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'footer_color', array(
				'label'		=>	__( 'Footer Color', 'maca' ),
				'section'	=>	'footer_styling',
				'settings'	=>	'footer_color',
				'priority'	=>	1,
			) ) );

			$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'footer_bg', array(
				'label'		=>	__( 'Footer Background Color', 'maca' ),
				'section'	=>	'footer_styling',
				'settings'	=>	'footer_bg',
				'priority'	=>	2,
			) ) );

			

		}
		add_action( 'customize_register', 'akmanda_customize_register' );

	}
	

	
	function akmanda_customizer_live_preview() {
		wp_enqueue_script( 'akmanda-customizer',	get_template_directory_uri().'/js/akmanda-customizer.js', array( 'jquery','customize-preview' ), NULL, true);
	}
	add_action( 'customize_preview_init', 'akmanda_customizer_live_preview' );
	


	function header_output() {

	
	//header styling
	$nav_menu_bg			=	get_option('nav_menu_bg', '#ffffff');
	$nav_menu_text			=	get_option('nav_menu_text', '#555555');
	$nav_menu_text_hov		=	get_option('nav_menu_text_hov', '#D23600');
	$nav_menu_dropdown_hov	=	get_option('nav_menu_dropdown_hov', '#eeeeee');
	
	//sidebar styling
	$sidr_bg				=	get_option('sidr_bg', '#ffffff');
	$wid_title				=	get_option('wid_title', '#ffffff');
	$bord_wid				=	get_option('bord_wid', '#e5e5e5');
	$wid_text				=	get_option('wid_text', '#ffffff');
	$wid_text_hov			=	get_option('wid_text_hov', '#d23600');
	$sidebar_bg				=	get_option('sidebar_bg', '#000');


	//content styling
	$meta_bg				=	get_option('meta_bg', '#000000');
	$meta_icon				=	get_option('meta_icon', '#ffffff');
	$meta_text				=	get_option('meta_text', '#2C3033');
	$btn					=	get_option('btn', '#000000');
	$btn_hov				=	get_option('btn_hov', '#000000');
	$cont_bg				=	get_option('cont_bg', '#ffffff');
	$bord_cont				=	get_option('bord_cont', '#e5e5e5');
	$pagina					=	get_option('pagina', '#000');
	$pagina_selec			=	get_option('pagina_selec', '#fff');

	//post styling
	$post_title				=	get_option('post_title', '#000000');
	$post_title_hover		=	get_option('post_title_hover', '#d23600');
	$post_text				=	get_option('post_text', '#2C3033');
	$nav_color				=	get_option('nav_color', '#000000');
	$nav_hov				=	get_option('nav_hov', '#2C3033');
	$comment_title			=	get_option('comment_title', '#000000');
	$comment_avt			=	get_option('comment_avt', '#000000');
	$comment_submit			=	get_option('comment_submit', '#000000');
	$comment_submit_hov		=	get_option('comment_submit_hov', '#2C3033');

	//format styling
	$blockquote_color		=	get_option('blockquote_color', '#000000');
	$blockquote_bg			=	get_option('blockquote_bg', '#ffffff');
	$blockquote_icon		=	get_option('blockquote_icon', '#000000');
	$blockquote_author_job	=	get_option('blockquote_author_job', '#000');
	$link_bg				=	get_option('link_bg', '#ffffff');

	//footer styling
	$footer_color			=	get_option('footer_color', '#2C3033');
	$footer_bg				=	get_option('footer_bg', '#ffffff');



	echo '<style type="text/css">';

	//=========HEADER STYLING======//

	//nav menu background color
	echo '.header, .sm-clean, .sm-clean ul{background:'.$nav_menu_bg.'}' ;
	
	//nav menu text color
	echo '#mainmenu .sm-clean a{color:'.$nav_menu_text.'}' ;
	echo '.sm-clean a span.sub-arrow{border-top-color:'.$nav_menu_text.'}' ;

	//nav menu text hover
	echo '#mainmenu .sm-clean a:hover, #mainmenu .sm-clean a:focus, #mainmenu .sm-clean a:active, #mainmenu .sm-clean a.highlighted, #mainmenu .sm-clean ul a:hover, #mainmenu .sm-clean ul a:focus, #mainmenu .sm-clean ul a:active, #mainmenu .sm-clean ul a.highlighted{color:'.$nav_menu_text_hov.'}' ;
	
	//nav menu dropdown
	echo '.sm-clean ul a:hover, .sm-clean ul a:focus, .sm-clean ul a:active, .sm-clean ul a.highlighted{background:'.$nav_menu_dropdown_hov.'}' ;

	//=========SIDEBAR STYLING======//

	//sidebar button background color
	echo '.sidebar-button{background:'.$sidr_bg.'}' ;

	//widget title
	echo '.widget-title{color:'.$wid_title.'}' ;
	echo '.bord-widget{background-color:'.$bord_wid.'}' ;
	echo '#primary-sidebar a{color:'.$wid_text.'}' ;
	echo '#primary-sidebar a:hover{color:'.$wid_text_hov.'}' ;

	//sidebar background color
	echo '#sidr{background:'.$sidebar_bg.'}' ;

	//=========CONTENT STYLING======//

	//meta icon
	echo '.post-meta .icon.post-type{background:'.$meta_bg.'}' ;
	echo '.post-meta .icon.post-type{color:'.$meta_icon.'}' ;
	echo '.post-meta li{color:'.$meta_text.'}' ;

	//button
	echo '.more, .wpcf7-submit{border-color:'.$btn.'}' ;
	echo '.more, .wpcf7-submit{color:'.$btn.'}' ;
	//button hover
	echo '.more:hover, .wpcf7-submit:hover{background:'.$btn_hov.'}' ;
	echo '.more:hover, .wpcf7-submit:hover{border-color:'.$btn_hov.'}' ;

	//post content
	echo '.post-content, .comments-title, .comment-list, .comment-respond, .bypostauthor, .post-entry .share-post.sharer-0 label{background:'.$cont_bg.'}' ;
	echo '.bord{background-color:'.$bord_cont.'}' ;

	//pagina
	echo '.pagination .current, .pagination a:hover{background:'.$pagina.'}' ;
	echo '.pagination a{background:'.$pagina_selec.'}' ;

	//=========POST STYLING======//

	//post title
	echo '.post-title h2 a{color:'.$post_title.'}' ;
	echo '.post-title h2 a:hover{color:'.$post_title_hover.'}' ;

	//post text
	echo '.inner-content p, .akmanda-excerpt p{color:'.$post_text.'}' ;

	//nav color
	echo '.nav-next a, .nav-previous a{border-color:'.$nav_color.'}' ;
	echo '.nav-next a, .nav-previous a{color:'.$nav_color.'}' ;
	//nav hover
	echo '.nav-next a:hover, .nav-previous a:hover{border-color:'.$nav_hov.'}' ;
	echo '.nav-next a:hover, .nav-previous a:hover{background:'.$nav_hov.'}' ;

	//comment title
	echo '.comments-title .icon, .comments-title{color:'.$comment_title.'}' ;
	echo '.comment .avatar img{border-color:'.$comment_avt.'}' ;

	//comment submit
	echo 'input#submit{background-color:'.$comment_submit.'}' ;
	echo 'input#submit:hover{background-color:'.$comment_submit_hov.'}' ;

	//=========POST FORMAT STYLING======//
	//blockquote
	echo '.quote-wrap blockquote p{color:'.$blockquote_color.'}' ;
	echo '.quote-wrap blockquote:after{border-top-color:'.$blockquote_color.'}' ;
	echo '.quote-wrap blockquote{background:'.$blockquote_bg.'}' ;
	echo '.format-link .post-format-link .icon{color:'.$blockquote_icon.'}' ;
	echo '.quote-wrap cite{color:'.$blockquote_author_job.'}' ;
	echo '.format-link .post-format-link{background:'.$link_bg.'}' ;

	//=========FOOTER STYLING======//
	echo '.copyright-footer p{color:'.$footer_color.'}' ;
	echo 'footer{background:'.$footer_bg.'}' ;


	echo '</style> ';

	}


	add_action( 'wp_head', 'header_output');

	