<?php
function cptui_register_my_cpts() {

	/**
	 * Post Type: Projects.
	 */

	$labels = array(
		"name" => __( 'Projects', '' ),
		"singular_name" => __( 'Project', '' ),
		"menu_name" => __( 'My Projects', '' ),
		"all_items" => __( 'All Projects', '' ),
		"add_new_item" => __( 'Add New Project', '' ),
		"edit_item" => __( 'Edit Project', '' ),
		"new_item" => __( 'New Project', '' ),
		"view_item" => __( 'View Project', '' ),
		"view_items" => __( 'View Projects', '' ),
		"search_items" => __( 'Search Projects', '' ),
		"not_found" => __( 'No Projects found', '' ),
		"not_found_in_trash" => __( 'No Projects found in Trash', '' ),
		"archives" => __( 'Project archives', '' ),
		"insert_into_item" => __( 'Insert into project', '' ),
		"uploaded_to_this_item" => __( 'Uploaded to this project', '' ),
		"attributes" => __( 'Project Attributes', '' ),
	);

	$args = array(
		"label" => __( 'Projects', '' ),
		"labels" => $labels,
		"description" => "",
		"public" => true,
		"publicly_queryable" => true,
		"show_ui" => true,
		"show_in_rest" => false,
		"rest_base" => "",
		"has_archive" => "design",
		"show_in_menu" => true,
		"exclude_from_search" => false,
		"capability_type" => "page",
		"map_meta_cap" => true,
		"hierarchical" => true,
		"rewrite" => array( "slug" => "design", "with_front" => true ),
		"query_var" => true,
		"menu_icon" => "dashicons-align-left",
		"supports" => array( "title", "thumbnail", "excerpt" ),
	);

	register_post_type( "design", $args );
}

add_action( 'init', 'cptui_register_my_cpts' );