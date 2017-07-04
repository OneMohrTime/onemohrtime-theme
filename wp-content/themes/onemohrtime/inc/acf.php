<?php
if( function_exists('acf_add_local_field_group') ):

acf_add_local_field_group(array (
	'key' => 'group_583243bb8c402',
	'title' => 'Home Page',
	'fields' => array (
		array (
			'key' => 'field_56aed35104d6f',
			'label' => 'Hero',
			'name' => 'homepage_hero',
			'type' => 'image',
			'instructions' => 'Hero image behind the tagline on homepage.',
			'required' => 0,
			'conditional_logic' => 0,
			'wrapper' => array (
				'width' => '',
				'class' => '',
				'id' => '',
			),
			'preview_size' => 'large',
			'library' => 'all',
			'return_format' => 'array',
			'min_width' => 0,
			'min_height' => 0,
			'min_size' => 0,
			'max_width' => 0,
			'max_height' => 0,
			'max_size' => 0,
			'mime_types' => '',
		),
		array (
			'key' => 'field_56ca1d738f43e',
			'label' => 'Main Headline',
			'name' => 'homepage_title',
			'type' => 'text',
			'instructions' => '',
			'required' => 0,
			'conditional_logic' => 0,
			'wrapper' => array (
				'width' => '',
				'class' => '',
				'id' => '',
			),
			'default_value' => '',
			'placeholder' => 'I\'m a...',
			'prepend' => '',
			'append' => '',
			'maxlength' => '',
		),
		array (
			'key' => 'field_56cf754526288',
			'label' => 'Profile Picture',
			'name' => 'homepage_profile',
			'type' => 'image',
			'instructions' => '',
			'required' => 0,
			'conditional_logic' => 0,
			'wrapper' => array (
				'width' => '',
				'class' => '',
				'id' => '',
			),
			'return_format' => 'array',
			'preview_size' => 'thumbnail',
			'library' => 'all',
			'min_width' => '',
			'min_height' => '',
			'min_size' => '',
			'max_width' => '',
			'max_height' => '',
			'max_size' => '',
			'mime_types' => '',
		),
		array (
			'key' => 'field_58a0fe0035633',
			'label' => 'Slideshow',
			'name' => 'homepage_slideshow',
			'type' => 'repeater',
			'instructions' => '',
			'required' => 0,
			'conditional_logic' => 0,
			'wrapper' => array (
				'width' => '',
				'class' => '',
				'id' => '',
			),
			'collapsed' => '',
			'min' => 0,
			'max' => 5,
			'layout' => 'block',
			'button_label' => 'Add Slide',
			'sub_fields' => array (
				array (
					'key' => 'field_58a0ff0235636',
					'label' => 'Image',
					'name' => 'slide_image',
					'type' => 'image',
					'instructions' => '',
					'required' => 0,
					'conditional_logic' => 0,
					'wrapper' => array (
						'width' => '',
						'class' => '',
						'id' => '',
					),
					'return_format' => 'array',
					'preview_size' => 'medium',
					'library' => 'all',
					'min_width' => '',
					'min_height' => '',
					'min_size' => '',
					'max_width' => '',
					'max_height' => '',
					'max_size' => '',
					'mime_types' => 'gif, png, jpg, jpeg, webp, svg',
				),
				array (
					'key' => 'field_58a0fe5e35634',
					'label' => 'Title',
					'name' => 'slide_title',
					'type' => 'text',
					'instructions' => '',
					'required' => 0,
					'conditional_logic' => 0,
					'wrapper' => array (
						'width' => '',
						'class' => '',
						'id' => '',
					),
					'default_value' => '',
					'placeholder' => '',
					'prepend' => '',
					'append' => '',
					'maxlength' => '',
				),
				array (
					'key' => 'field_58a0feba35635',
					'label' => 'Text',
					'name' => 'slide_text',
					'type' => 'wysiwyg',
					'instructions' => '',
					'required' => 0,
					'conditional_logic' => 0,
					'wrapper' => array (
						'width' => '',
						'class' => '',
						'id' => '',
					),
					'default_value' => '',
					'tabs' => 'all',
					'toolbar' => 'full',
					'media_upload' => 0,
					'delay' => 0,
				),
				array (
					'key' => 'field_58a0ff4335637',
					'label' => 'Link',
					'name' => 'slide_link',
					'type' => 'page_link',
					'instructions' => '',
					'required' => 0,
					'conditional_logic' => 0,
					'wrapper' => array (
						'width' => '',
						'class' => '',
						'id' => '',
					),
					'post_type' => array (
						0 => 'design',
						1 => 'post',
						2 => 'page',
					),
					'taxonomy' => array (
					),
					'allow_null' => 0,
					'allow_archives' => 0,
					'multiple' => 0,
				),
			),
		),
	),
	'location' => array (
		array (
			array (
				'param' => 'page',
				'operator' => '==',
				'value' => '620',
			),
		),
	),
	'menu_order' => 0,
	'position' => 'normal',
	'style' => 'seamless',
	'label_placement' => 'top',
	'instruction_placement' => 'label',
	'hide_on_screen' => '',
	'active' => 1,
	'description' => '',
));

acf_add_local_field_group(array (
	'key' => 'group_583243bbabd96',
	'title' => 'Project Grid',
	'fields' => array (
		array (
			'key' => 'field_57644056dc159',
			'label' => 'Project Grid',
			'name' => 'project_grid',
			'type' => 'relationship',
			'instructions' => '',
			'required' => 0,
			'conditional_logic' => 0,
			'wrapper' => array (
				'width' => '',
				'class' => '',
				'id' => '',
			),
			'post_type' => array (
				0 => 'design',
				1 => 'post',
			),
			'taxonomy' => array (
			),
			'filters' => array (
				0 => 'post_type',
			),
			'elements' => '',
			'min' => 2,
			'max' => 8,
			'return_format' => 'object',
		),
	),
	'location' => array (
		array (
			array (
				'param' => 'page',
				'operator' => '==',
				'value' => '638',
			),
		),
	),
	'menu_order' => 0,
	'position' => 'normal',
	'style' => 'seamless',
	'label_placement' => 'top',
	'instruction_placement' => 'label',
	'hide_on_screen' => '',
	'active' => 1,
	'description' => '',
));

acf_add_local_field_group(array (
	'key' => 'group_583243bbb167e',
	'title' => 'Projects',
	'fields' => array (
		array (
			'key' => 'field_583e4a2fb89de',
			'label' => 'Header',
			'name' => 'project_header',
			'type' => 'repeater',
			'instructions' => '',
			'required' => 0,
			'conditional_logic' => 0,
			'wrapper' => array (
				'width' => '',
				'class' => '',
				'id' => '',
			),
			'min' => 0,
			'max' => 1,
			'layout' => 'block',
			'button_label' => 'Add Header',
			'collapsed' => '',
			'sub_fields' => array (
				array (
					'key' => 'field_583e4dc0b89df',
					'label' => 'Banner',
					'name' => 'proj_banner',
					'type' => 'image',
					'instructions' => '',
					'required' => 0,
					'conditional_logic' => 0,
					'wrapper' => array (
						'width' => '',
						'class' => '',
						'id' => '',
					),
					'return_format' => 'array',
					'preview_size' => 'large',
					'library' => 'all',
					'min_width' => '',
					'min_height' => '',
					'min_size' => '',
					'max_width' => '',
					'max_height' => '',
					'max_size' => '',
					'mime_types' => 'gif, png, jpg, jpeg, mp4, ogg, webm',
				),
				array (
					'key' => 'field_583e4e5bb89e0',
					'label' => 'Subheader',
					'name' => 'proj_subheader',
					'type' => 'text',
					'instructions' => '',
					'required' => 0,
					'conditional_logic' => 0,
					'wrapper' => array (
						'width' => '',
						'class' => '',
						'id' => '',
					),
					'default_value' => '',
					'placeholder' => 'Usually timeline',
					'prepend' => '',
					'append' => '',
					'maxlength' => '',
				),
			),
		),
		array (
			'key' => 'field_5761f8c09e4c5',
			'label' => 'Details',
			'name' => 'project_specs',
			'type' => 'flexible_content',
			'instructions' => 'Details of the project',
			'required' => 0,
			'conditional_logic' => 0,
			'wrapper' => array (
				'width' => '',
				'class' => '',
				'id' => '',
			),
			'button_label' => 'Add Section',
			'min' => 0,
			'max' => '',
			'layouts' => array (
				array (
					'key' => '583f7c10d1e9b',
					'name' => 'detail_text',
					'label' => 'Text',
					'display' => 'block',
					'sub_fields' => array (
						array (
							'key' => 'field_583f7c22d1e9c',
							'label' => 'Text',
							'name' => 'text',
							'type' => 'wysiwyg',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'tabs' => 'all',
							'toolbar' => 'full',
							'media_upload' => 1,
							'default_value' => '',
							'delay' => 0,
						),
					),
					'min' => '',
					'max' => '',
				),
				array (
					'key' => '590b9f510171a',
					'name' => 'detail_text_image',
					'label' => 'Text & Image',
					'display' => 'block',
					'sub_fields' => array (
						array (
							'key' => 'field_590b9f690171b',
							'label' => 'Content',
							'name' => 'text',
							'type' => 'wysiwyg',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '50',
								'class' => '',
								'id' => '',
							),
							'default_value' => '',
							'tabs' => 'all',
							'toolbar' => 'full',
							'media_upload' => 1,
							'delay' => 0,
						),
						array (
							'key' => 'field_590ba1ef0171c',
							'label' => 'Image',
							'name' => 'image',
							'type' => 'image',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '50',
								'class' => '',
								'id' => '',
							),
							'return_format' => 'array',
							'preview_size' => 'medium',
							'library' => 'all',
							'min_width' => '',
							'min_height' => '',
							'min_size' => '',
							'max_width' => '',
							'max_height' => '',
							'max_size' => '.5',
							'mime_types' => 'gif, png, jpg, jpeg, webp, svg',
						),
						array (
							'key' => 'field_590ba2440171d',
							'label' => 'Reverse Order',
							'name' => 'reverse',
							'type' => 'true_false',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '100',
								'class' => '',
								'id' => '',
							),
							'message' => 'Image on the left, Content on the right',
							'default_value' => 0,
							'ui' => 1,
							'ui_on_text' => 'Reversed',
							'ui_off_text' => 'Standard',
						),
					),
					'min' => '',
					'max' => '',
				),
				array (
					'key' => '583e4762082ad',
					'name' => 'detail_image',
					'label' => 'Image',
					'display' => 'block',
					'sub_fields' => array (
						array (
							'key' => 'field_590ba3340171e',
							'label' => 'Image Display',
							'name' => 'display',
							'type' => 'select',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '100',
								'class' => '',
								'id' => '',
							),
							'choices' => array (
								'standard' => 'Standard',
								'wide' => 'No Padding',
								'fixed' => 'Fixed Background',
							),
							'default_value' => array (
							),
							'allow_null' => 0,
							'multiple' => 0,
							'ui' => 1,
							'ajax' => 0,
							'return_format' => 'value',
							'placeholder' => '',
						),
						array (
							'key' => 'field_583e482bc6ec1',
							'label' => 'Image',
							'name' => 'image',
							'type' => 'image',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '100',
								'class' => '',
								'id' => '',
							),
							'return_format' => 'array',
							'preview_size' => 'large',
							'library' => 'all',
							'min_width' => '',
							'min_height' => '',
							'min_size' => '',
							'max_width' => '',
							'max_height' => '',
							'max_size' => 1,
							'mime_types' => 'gif, png, jpg, jpeg, webp, svg',
						),
					),
					'min' => '',
					'max' => '',
				),
				array (
					'key' => '590ba4a4d3285',
					'name' => 'detail_blockquote',
					'label' => 'Blockquote',
					'display' => 'block',
					'sub_fields' => array (
						array (
							'key' => 'field_590ba4d7d3286',
							'label' => 'Content',
							'name' => 'text',
							'type' => 'wysiwyg',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'default_value' => '',
							'tabs' => 'all',
							'toolbar' => 'full',
							'media_upload' => 1,
							'delay' => 0,
						),
					),
					'min' => '',
					'max' => '',
				),
				array (
					'key' => '583f791cd1e99',
					'name' => 'detail_gallery',
					'label' => 'Gallery',
					'display' => 'block',
					'sub_fields' => array (
						array (
							'key' => 'field_583f79ccd1e9a',
							'label' => 'Images',
							'name' => 'images',
							'type' => 'gallery',
							'instructions' => '',
							'required' => 0,
							'conditional_logic' => 0,
							'wrapper' => array (
								'width' => '',
								'class' => '',
								'id' => '',
							),
							'min' => 2,
							'max' => 20,
							'insert' => 'append',
							'library' => 'all',
							'min_width' => '',
							'min_height' => '',
							'min_size' => '',
							'max_width' => '',
							'max_height' => '',
							'max_size' => '.75',
							'mime_types' => 'gif, png, jpg, jpeg, webp, svg',
						),
					),
					'min' => '',
					'max' => '',
				),
			),
		),
		array (
			'key' => 'field_583270b4f3b06',
			'label' => 'Additional Details',
			'name' => 'project_deets',
			'type' => 'repeater',
			'instructions' => '',
			'required' => 0,
			'conditional_logic' => 0,
			'wrapper' => array (
				'width' => '',
				'class' => '',
				'id' => '',
			),
			'collapsed' => '',
			'min' => 0,
			'max' => 1,
			'layout' => 'row',
			'button_label' => 'Populate Table',
			'sub_fields' => array (
				array (
					'key' => 'field_583270fcf3b07',
					'label' => 'Month/Year Start',
					'name' => 'proj_start',
					'type' => 'date_picker',
					'instructions' => '',
					'required' => 0,
					'conditional_logic' => 0,
					'wrapper' => array (
						'width' => '',
						'class' => '',
						'id' => '',
					),
					'display_format' => 'F Y',
					'return_format' => 'F Y',
					'first_day' => 1,
				),
				array (
					'key' => 'field_5833baadc5829',
					'label' => 'Month/Year End',
					'name' => 'proj_end',
					'type' => 'date_picker',
					'instructions' => '',
					'required' => 0,
					'conditional_logic' => 0,
					'wrapper' => array (
						'width' => '',
						'class' => '',
						'id' => '',
					),
					'display_format' => 'F Y',
					'return_format' => 'F Y',
					'first_day' => 1,
				),
				array (
					'key' => 'field_5832749af3b08',
					'label' => 'Roles',
					'name' => 'proj_roles',
					'type' => 'checkbox',
					'instructions' => 'Check all that apply',
					'required' => 0,
					'conditional_logic' => 0,
					'wrapper' => array (
						'width' => '',
						'class' => '',
						'id' => '',
					),
					'choices' => array (
						'graphic' => 'Graphic Design',
						'web' => 'Web Design',
						'logo' => 'Logo Design',
						'frontend' => 'Front-end Development',
						'branding' => 'Branding',
						'print' => 'Print Design',
						'poster' => 'Poster Design',
						'tshirt' => 'T-shirt Design',
					),
					'default_value' => array (
					),
					'layout' => 'vertical',
					'toggle' => 0,
					'return_format' => 'label',
					'allow_custom' => 0,
					'save_custom' => 0,
				),
				array (
					'key' => 'field_583277bc64c82',
					'label' => 'Employer',
					'name' => 'proj_employer',
					'type' => 'text',
					'instructions' => 'Hyperlinking allowed',
					'required' => 0,
					'conditional_logic' => 0,
					'wrapper' => array (
						'width' => '',
						'class' => '',
						'id' => '',
					),
					'default_value' => '',
					'placeholder' => 'one, <a>two</a>',
					'prepend' => '',
					'append' => '',
					'maxlength' => '',
				),
				array (
					'key' => 'field_5833b548b39b2',
					'label' => 'Client',
					'name' => 'proj_client',
					'type' => 'text',
					'instructions' => '',
					'required' => 0,
					'conditional_logic' => 0,
					'wrapper' => array (
						'width' => '',
						'class' => '',
						'id' => '',
					),
					'default_value' => '',
					'placeholder' => '<a>client</a>',
					'prepend' => '',
					'append' => '',
					'maxlength' => '',
				),
				array (
					'key' => 'field_5832785264c83',
					'label' => 'Coding Languages',
					'name' => 'proj_code',
					'type' => 'checkbox',
					'instructions' => 'Check all that apply',
					'required' => 0,
					'conditional_logic' => 0,
					'wrapper' => array (
						'width' => '',
						'class' => '',
						'id' => '',
					),
					'layout' => 'horizontal',
					'choices' => array (
						'html' => 'HTML',
						'haml' => 'HAML',
						'jade' => 'Jade',
						'css' => 'CSS',
						'bootstrap' => 'Bootstrap',
						'less' => 'LESS',
						'sass' => 'Sass/SCSS',
						'javascript' => 'JavaScript',
						'jquery' => 'jQuery',
						'php' => 'PHP',
						'twig' => 'Twig',
						'wordpress' => 'WordPress',
						'ee' => 'ExpressionEngine',
						'craft' => 'Craft',
						'kirby' => 'Kirby',
						'joomla' => 'Joomla',
						'git' => 'Git',
					),
					'default_value' => array (
					),
					'allow_custom' => 0,
					'save_custom' => 0,
					'toggle' => 0,
					'return_format' => 'label',
				),
				array (
					'key' => 'field_58327a94ef9b9',
					'label' => 'Team',
					'name' => 'proj_team',
					'type' => 'text',
					'instructions' => '',
					'required' => 0,
					'conditional_logic' => 0,
					'wrapper' => array (
						'width' => '',
						'class' => '',
						'id' => '',
					),
					'default_value' => '',
					'placeholder' => 'Bethany Heck, <a>Agency</a>, etc.',
					'prepend' => '',
					'append' => '',
					'maxlength' => '',
				),
				array (
					'key' => 'field_5833b458b39b0',
					'label' => 'Photographer',
					'name' => 'proj_photog',
					'type' => 'text',
					'instructions' => '',
					'required' => 0,
					'conditional_logic' => 0,
					'wrapper' => array (
						'width' => '',
						'class' => '',
						'id' => '',
					),
					'default_value' => '',
					'placeholder' => '<a>photographer</a>',
					'prepend' => '',
					'append' => '',
					'maxlength' => '',
				),
				array (
					'key' => 'field_5833b4ebb39b1',
					'label' => 'Printer',
					'name' => 'proj_printer',
					'type' => 'text',
					'instructions' => '',
					'required' => 0,
					'conditional_logic' => 0,
					'wrapper' => array (
						'width' => '',
						'class' => '',
						'id' => '',
					),
					'default_value' => '',
					'placeholder' => '<a>printer</a>',
					'prepend' => '',
					'append' => '',
					'maxlength' => '',
				),
			),
		),
	),
	'location' => array (
		array (
			array (
				'param' => 'post_type',
				'operator' => '==',
				'value' => 'design',
			),
		),
	),
	'menu_order' => 0,
	'position' => 'acf_after_title',
	'style' => 'seamless',
	'label_placement' => 'top',
	'instruction_placement' => 'label',
	'hide_on_screen' => array (
		0 => 'the_content',
	),
	'active' => 1,
	'description' => '',
));

acf_add_local_field_group(array (
	'key' => 'group_583243bba2ee5',
	'title' => 'Page Elements',
	'fields' => array (
		array (
			'key' => 'field_56d7ad1b2acc6',
			'label' => 'Page Entry ID',
			'name' => 'entry_id',
			'type' => 'text',
			'instructions' => 'Assign custom ID needed for this page.',
			'required' => 0,
			'conditional_logic' => 0,
			'wrapper' => array (
				'width' => '',
				'class' => '',
				'id' => '',
			),
			'default_value' => '',
			'placeholder' => 'Unique ID',
			'prepend' => '',
			'append' => '',
			'formatting' => 'none',
			'maxlength' => '',
		),
		array (
			'key' => 'field_56d79717ea843',
			'label' => 'Background Image',
			'name' => 'page_bg',
			'type' => 'image',
			'instructions' => 'Background image for current page.',
			'required' => 0,
			'conditional_logic' => 0,
			'wrapper' => array (
				'width' => '',
				'class' => '',
				'id' => '',
			),
			'preview_size' => 'large',
			'library' => 'all',
			'return_format' => 'array',
			'min_width' => 0,
			'min_height' => 0,
			'min_size' => 0,
			'max_width' => 0,
			'max_height' => 0,
			'max_size' => 0,
			'mime_types' => '',
		),
	),
	'location' => array (
		array (
			array (
				'param' => 'page_type',
				'operator' => '==',
				'value' => 'top_level',
			),
		),
		array (
			array (
				'param' => 'page_type',
				'operator' => '==',
				'value' => 'child',
			),
		),
		array (
			array (
				'param' => 'post_type',
				'operator' => '!=',
				'value' => 'post',
			),
		),
	),
	'menu_order' => 9,
	'position' => 'normal',
	'style' => 'seamless',
	'label_placement' => 'top',
	'instruction_placement' => 'label',
	'hide_on_screen' => '',
	'active' => 1,
	'description' => '',
));

endif;