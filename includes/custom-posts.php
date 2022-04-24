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
	"parent" => __( "Parent Project:", "onemohrtime" ),
	"archives" => __( "Project archives", "onemohrtime" ),
	"insert_into_item" => __( "Insert into project", "onemohrtime" ),
	"uploaded_to_this_item" => __( "Uploaded to this project", "onemohrtime" ),
	"items_list" => __( "Project List", "onemohrtime" ),
	"attributes" => __( "Project Attributes", "onemohrtime" ),
	"item_published" => __( "Project Published", "onemohrtime" ),
	"item_published_privately" => __( "Project Published Privately", "onemohrtime" ),
	"parent_item_colon" => __( "Parent Project:", "onemohrtime" ),
];

$args = [
	"label" => __( "Projects", "onemohrtime" ),
	"labels" => $labels,
	"description" => "Design projects beyond the scope of a post, but not generic enough to be a page.",
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
	"capability_type" => "post",
	"map_meta_cap" => true,
	"hierarchical" => true,
	"can_export" => false,
	"rewrite" => [ "slug" => "design", "with_front" => true ],
	"query_var" => true,
	"menu_icon" => "dashicons-layout",
	"supports" => [ "title", "thumbnail", "excerpt", "revisions" ],
	"taxonomies" => [ "role", "job_type" ],
	"show_in_graphql" => false,
];

register_post_type( "design", $args );

/**
 * Post Type: Top 10s.
 */

$labels = [
	"name" => __( "Top 10s", "onemohrtime" ),
	"singular_name" => __( "Top 10 List", "onemohrtime" ),
	"menu_name" => __( "Top 10 Lists", "onemohrtime" ),
	"all_items" => __( "All Top 10s", "onemohrtime" ),
	"add_new" => __( "Add new power ranking", "onemohrtime" ),
	"add_new_item" => __( "Add new Top 10 List", "onemohrtime" ),
	"edit_item" => __( "Edit Top 10 List", "onemohrtime" ),
	"new_item" => __( "New Top 10 List", "onemohrtime" ),
	"view_item" => __( "View Top 10 List", "onemohrtime" ),
	"view_items" => __( "View Top 10s", "onemohrtime" ),
	"search_items" => __( "Search Top 10s", "onemohrtime" ),
	"not_found" => __( "No Top 10 Lists found", "onemohrtime" ),
	"not_found_in_trash" => __( "No Top 10 Lists found in trash", "onemohrtime" ),
	"parent" => __( "Parent Top 10 List:", "onemohrtime" ),
	"featured_image" => __( "Featured image for this Top 10 List", "onemohrtime" ),
	"set_featured_image" => __( "Set featured image for this Top 10 List", "onemohrtime" ),
	"remove_featured_image" => __( "Remove featured image for this Top 10 List", "onemohrtime" ),
	"use_featured_image" => __( "Use as featured image for this Top 10 List", "onemohrtime" ),
	"archives" => __( "Top 10 List archives", "onemohrtime" ),
	"insert_into_item" => __( "Insert into Top 10 List", "onemohrtime" ),
	"uploaded_to_this_item" => __( "Upload to this Top 10 List", "onemohrtime" ),
	"filter_items_list" => __( "Filter Top 10s", "onemohrtime" ),
	"items_list_navigation" => __( "Top 10s navigation", "onemohrtime" ),
	"items_list" => __( "Top 10s list", "onemohrtime" ),
	"attributes" => __( "Top 10s attributes", "onemohrtime" ),
	"name_admin_bar" => __( "Top 10 List", "onemohrtime" ),
	"item_published" => __( "Top 10 List published", "onemohrtime" ),
	"item_published_privately" => __( "Top 10 List published privately.", "onemohrtime" ),
	"item_reverted_to_draft" => __( "Top 10 List reverted to draft.", "onemohrtime" ),
	"item_scheduled" => __( "Top 10 List scheduled", "onemohrtime" ),
	"item_updated" => __( "Top 10 List updated.", "onemohrtime" ),
	"parent_item_colon" => __( "Parent Top 10 List:", "onemohrtime" ),
];

$args = [
	"label" => __( "Top 10s", "onemohrtime" ),
	"labels" => $labels,
	"description" => "",
	"public" => true,
	"publicly_queryable" => true,
	"show_ui" => true,
	"show_in_rest" => true,
	"rest_base" => "",
	"rest_controller_class" => "WP_REST_Posts_Controller",
	"has_archive" => false,
	"show_in_menu" => true,
	"show_in_nav_menus" => true,
	"delete_with_user" => false,
	"exclude_from_search" => false,
	"capability_type" => "post",
	"map_meta_cap" => true,
	"hierarchical" => false,
	"can_export" => false,
	"rewrite" => [ "slug" => "top-10", "with_front" => true ],
	"query_var" => true,
	"menu_position" => 10,
	"menu_icon" => "dashicons-list-view",
	"supports" => [ "title", "custom-fields" ],
	"show_in_graphql" => false,
];

register_post_type( "top-10", $args );
