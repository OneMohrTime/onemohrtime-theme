<?php

// Gallery Meta
if(function_exists("register_field_group"))
{
	register_field_group(array (
		'id' => 'acf_gallery-meta',
		'title' => 'Gallery Meta',
		'fields' => array (
			array (
				'key' => 'field_52ddeb8a1f132',
				'label' => 'Akmanda Gallery',
				'name' => 'akmanda_gallery',
				'type' => 'gallery',
				'preview_size' => 'thumbnail',
			),
		),
		'location' => array (
			array (
				array (
					'param' => 'post_format',
					'operator' => '==',
					'value' => 'gallery',
					'order_no' => 0,
					'group_no' => 0,
				),
			),
		),
		'options' => array (
			'position' => 'acf_after_title',
			'layout' => 'default',
			'hide_on_screen' => array (
			),
		),
		'menu_order' => 0,
	));
}

if(function_exists("register_field_group"))
{ 
	// Audio Format
	register_field_group(array (
		'id' => 'acf_audio-format',
		'title' => 'Audio Format',
		'fields' => array (
			array (
				'key' => 'field_53117a0579389',
				'label' => 'Audio URL',
				'name' => 'audio_url',
				'type' => 'text',
				'instructions' => 'For Spotify/Soundcloud and Some Of Audio Provider that support oEmbed. Just add the url here',
				'default_value' => '',
				'placeholder' => '',
				'prepend' => '',
				'append' => '',
				'formatting' => 'none',
				'maxlength' => '',
			),
			array (
				'key' => 'field_53117a327938a',
				'label' => 'Audio Embed',
				'name' => 'audio_embed',
				'type' => 'text',
				'instructions' => 'If you\'re more comfortable with just embed code. Paste in here',
				'default_value' => '',
				'placeholder' => '',
				'prepend' => '',
				'append' => '',
				'formatting' => 'html',
				'maxlength' => '',
			),
			array (
				'key' => 'field_53117a447938b',
				'label' => 'Audio File',
				'name' => 'audio_file',
				'type' => 'file',
				'instructions' => 'If You prefer to upload your own video file. Upload Here',
				'save_format' => 'url',
				'library' => 'all',
			),
		),
		'location' => array (
			array (
				array (
					'param' => 'post_format',
					'operator' => '==',
					'value' => 'audio',
					'order_no' => 0,
					'group_no' => 0,
				),
			),
		),
		'options' => array (
			'position' => 'acf_after_title',
			'layout' => 'default',
			'hide_on_screen' => array (
			),
		),
		'menu_order' => 0,
	));
	//Link Format
	register_field_group(array (
		'id' => 'acf_link-format',
		'title' => 'Link Format',
		'fields' => array (
			array (
				'key' => 'field_531178240b82c',
				'label' => 'URL',
				'name' => 'link_url',
				'type' => 'text',
				'default_value' => '',
				'placeholder' => 'http://',
				'prepend' => '',
				'append' => '',
				'formatting' => 'none',
				'maxlength' => '',
			),
		),
		'location' => array (
			array (
				array (
					'param' => 'post_format',
					'operator' => '==',
					'value' => 'link',
					'order_no' => 0,
					'group_no' => 0,
				),
			),
		),
		'options' => array (
			'position' => 'acf_after_title',
			'layout' => 'default',
			'hide_on_screen' => array (
			),
		),
		'menu_order' => 0,
	));
	//Status Format
	register_field_group(array (
		'id' => 'acf_status-format',
		'title' => 'Status Format',
		'fields' => array (
			array (
				'key' => 'field_530d935661789',
				'label' => 'Facebook Status',
				'name' => 'facebook_status',
				'type' => 'textarea',
				'instructions' => 'Facebook embedded status ( <a href="https://developers.facebook.com/docs/plugins/embedded-posts/" target="_blank">How do I do this?</a> )',
				'default_value' => '',
				'placeholder' => '',
				'maxlength' => '',
				'formatting' => 'none',
			),
			array (
				'key' => 'field_530d9431ee55b',
				'label' => 'Twitter Status',
				'name' => 'twitter_status',
				'type' => 'textarea',
				'instructions' => 'Twitter embedded status ( <a href="https://dev.twitter.com/docs/embedded-tweets" target="_blank">How do I do this?</a> )',
				'default_value' => '',
				'placeholder' => '',
				'maxlength' => '',
				'formatting' => 'none',
			),
			array (
				'key' => 'field_530d946fee55d',
				'label' => 'Google+ Status',
				'name' => 'google_status',
				'type' => 'textarea',
				'instructions' => 'Google embedded status ( <a href="https://developers.google.com/+/web/embedded-post/" target="_blank">How do I do this?</a> )',
				'default_value' => '',
				'placeholder' => '',
				'maxlength' => '',
				'formatting' => 'none',
			),
		),
		'location' => array (
			array (
				array (
					'param' => 'post_format',
					'operator' => '==',
					'value' => 'status',
					'order_no' => 0,
					'group_no' => 0,
				),
			),
		),
		'options' => array (
			'position' => 'acf_after_title',
			'layout' => 'default',
			'hide_on_screen' => array (
			),
		),
		'menu_order' => 0,
	));
//Video Format
	register_field_group(array (
		'id' => 'acf_video-format',
		'title' => 'Video Format',
		'fields' => array (
			array (
				'key' => 'field_531178e127a32',
				'label' => 'Video Url',
				'name' => 'video_url',
				'type' => 'text',
				'instructions' => 'For Vimeo/Youtube and Some Of Video Provider that support oEmbed. Just add the url here',
				'default_value' => '',
				'placeholder' => '',
				'prepend' => '',
				'append' => '',
				'formatting' => 'none',
				'maxlength' => '',
			),
			array (
				'key' => 'field_531178b427a31',
				'label' => 'Video Embed',
				'name' => 'video_embed',
				'type' => 'textarea',
				'instructions' => 'If you\'re more comfortable with just embed code. Paste in here',
				'default_value' => '',
				'placeholder' => '',
				'maxlength' => '',
				'formatting' => 'none',
			),
			array (
				'key' => 'field_5311797127a33',
				'label' => 'Video File',
				'name' => 'video_file',
				'type' => 'file',
				'instructions' => 'If You prefer to upload your own video file. Upload Here',
				'save_format' => 'url',
				'library' => 'all',
			),
		),
		'location' => array (
			array (
				array (
					'param' => 'post_format',
					'operator' => '==',
					'value' => 'video',
					'order_no' => 0,
					'group_no' => 0,
				),
			),
		),
		'options' => array (
			'position' => 'acf_after_title',
			'layout' => 'default',
			'hide_on_screen' => array (
			),
		),
		'menu_order' => 0,
	));
}


// Quote Box

if(function_exists("register_field_group"))
{
	register_field_group(array (
		'id' => 'acf_quote-box',
		'title' => 'Quote Box',
		'fields' => array (
			array (
				'key' => 'field_52df5f0600a28',
				'label' => 'Quote Sentence',
				'name' => 'quote_sentence',
				'type' => 'textarea',
				'instructions' => 'Add Quote Here',
				'default_value' => '',
				'placeholder' => '',
				'maxlength' => '',
				'formatting' => 'br',
			),
			array (
				'key' => 'field_52df5f3700a29',
				'label' => 'Quote Author',
				'name' => 'quote_author',
				'type' => 'text',
				'instructions' => 'Name of The author',
				'default_value' => '',
				'placeholder' => '',
				'prepend' => '',
				'append' => '',
				'formatting' => 'html',
				'maxlength' => '',
			),
			array (
				'key' => 'field_52df5f5100a2a',
				'label' => 'Author Job',
				'name' => 'author_job',
				'type' => 'text',
				'default_value' => '',
				'placeholder' => '',
				'prepend' => '',
				'append' => '',
				'formatting' => 'html',
				'maxlength' => '',
			),
			array (
				'key' => 'field_52df5f6c00a2b',
				'label' => 'Author Image',
				'name' => 'author_image',
				'type' => 'image',
				'save_format' => 'url',
				'preview_size' => 'thumbnail',
				'library' => 'all',
			),
		),
		'location' => array (
			array (
				array (
					'param' => 'post_format',
					'operator' => '==',
					'value' => 'quote',
					'order_no' => 0,
					'group_no' => 0,
				),
			),
		),
		'options' => array (
			'position' => 'acf_after_title',
			'layout' => 'default',
			'hide_on_screen' => array (
			),
		),
		'menu_order' => 0,
	));
}