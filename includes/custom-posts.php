<?php
/**
 * 1. Copy code from CPT UI / Tools / Get Code
 * 2. Paste below, but delete the `cptui_register_my_cpts()` wrapper
 * 3. Delete `add_action( 'init', 'cptui_register_my_cpts' )` at the bottom
 */

/**
 * Post Type: Projects.
 */

$labels = [
	"name" => __( "Projects", "onemohrtime" ),
	"singular_name" => __( "Project", "onemohrtime" ),
	"menu_name" => __( "Projects", "onemohrtime" ),
	"all_items" => __( "All Projects", "onemohrtime" ),
	"add_new" => __( "New Project", "onemohrtime" ),
	"add_new_item" => __( "Add New Project", "onemohrtime" ),
	"edit_item" => __( "Edit Project", "onemohrtime" ),
	"new_item" => __( "New Project", "onemohrtime" ),
	"view_item" => __( "View Project", "onemohrtime" ),
	"view_items" => __( "View Projects", "onemohrtime" ),
	"search_items" => __( "Search Projects", "onemohrtime" ),
	"not_found" => __( "No Projects found", "onemohrtime" ),
	"not_found_in_trash" => __( "No Projects found in Trash", "onemohrtime" ),
	"archives" => __( "Project archives", "onemohrtime" ),
	"insert_into_item" => __( "Insert into project", "onemohrtime" ),
	"uploaded_to_this_item" => __( "Uploaded to this project", "onemohrtime" ),
	"items_list" => __( "Project List", "onemohrtime" ),
	"attributes" => __( "Project Attributes", "onemohrtime" ),
];

$args = [
	"label" => __( "Projects", "onemohrtime" ),
	"labels" => $labels,
	"description" => "",
	"public" => true,
	"publicly_queryable" => true,
	"show_ui" => true,
	"show_in_rest" => false,
	"rest_base" => "",
	"rest_controller_class" => "WP_REST_Posts_Controller",
	"has_archive" => false,
	"show_in_menu" => true,
	"show_in_nav_menus" => true,
	"delete_with_user" => false,
	"exclude_from_search" => false,
	"capability_type" => "page",
	"map_meta_cap" => true,
	"hierarchical" => true,
	"rewrite" => [ "slug" => "design", "with_front" => true ],
	"query_var" => true,
	"menu_position" => 5,
	"menu_icon" => "dashicons-layout",
	"supports" => [ "title", "thumbnail", "excerpt", "revisions" ],
	"taxonomies" => [ "role" ],
	"show_in_graphql" => false,
];

register_post_type( "design", $args );
