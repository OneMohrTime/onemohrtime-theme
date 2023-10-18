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
	"name" => esc_html__( "Projects", "onemohrtime" ),
	"singular_name" => esc_html__( "Project", "onemohrtime" ),
	"menu_name" => esc_html__( "Projects", "onemohrtime" ),
	"all_items" => esc_html__( "All Projects", "onemohrtime" ),
	"add_new" => esc_html__( "New Project", "onemohrtime" ),
	"add_new_item" => esc_html__( "Add New Project", "onemohrtime" ),
	"edit_item" => esc_html__( "Edit Project", "onemohrtime" ),
	"new_item" => esc_html__( "New Project", "onemohrtime" ),
	"view_item" => esc_html__( "View Project", "onemohrtime" ),
	"view_items" => esc_html__( "View Projects", "onemohrtime" ),
	"search_items" => esc_html__( "Search Projects", "onemohrtime" ),
	"not_found" => esc_html__( "No Projects found", "onemohrtime" ),
	"not_found_in_trash" => esc_html__( "No Projects found in Trash", "onemohrtime" ),
	"parent" => esc_html__( "Parent Project:", "onemohrtime" ),
	"archives" => esc_html__( "Project archives", "onemohrtime" ),
	"insert_into_item" => esc_html__( "Insert into project", "onemohrtime" ),
	"uploaded_to_this_item" => esc_html__( "Uploaded to this project", "onemohrtime" ),
	"items_list" => esc_html__( "Project List", "onemohrtime" ),
	"attributes" => esc_html__( "Project Attributes", "onemohrtime" ),
	"item_published" => esc_html__( "Project Published", "onemohrtime" ),
	"item_published_privately" => esc_html__( "Project Published Privately", "onemohrtime" ),
	"parent_item_colon" => esc_html__( "Parent Project:", "onemohrtime" ),
];

$args = [
	"label" => esc_html__( "Projects", "onemohrtime" ),
	"labels" => $labels,
	"description" => "Design projects beyond the scope of a post, but not generic enough to be a page.",
	"public" => true,
	"publicly_queryable" => true,
	"show_ui" => true,
	"show_in_rest" => false,
	"rest_base" => "",
	"rest_controller_class" => "WP_REST_Posts_Controller",
	"rest_namespace" => "wp/v2",
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
	"menu_position" => 5,
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
	"name" => esc_html__( "Top 10s", "onemohrtime" ),
	"singular_name" => esc_html__( "Top 10 List", "onemohrtime" ),
	"menu_name" => esc_html__( "Top 10 Lists", "onemohrtime" ),
	"all_items" => esc_html__( "All Top 10s", "onemohrtime" ),
	"add_new" => esc_html__( "Add new power ranking", "onemohrtime" ),
	"add_new_item" => esc_html__( "Add new Top 10 List", "onemohrtime" ),
	"edit_item" => esc_html__( "Edit Top 10 List", "onemohrtime" ),
	"new_item" => esc_html__( "New Top 10 List", "onemohrtime" ),
	"view_item" => esc_html__( "View Top 10 List", "onemohrtime" ),
	"view_items" => esc_html__( "View Top 10s", "onemohrtime" ),
	"search_items" => esc_html__( "Search Top 10s", "onemohrtime" ),
	"not_found" => esc_html__( "No Top 10 Lists found", "onemohrtime" ),
	"not_found_in_trash" => esc_html__( "No Top 10 Lists found in trash", "onemohrtime" ),
	"parent" => esc_html__( "Parent Top 10 List:", "onemohrtime" ),
	"featured_image" => esc_html__( "Featured image for this Top 10 List", "onemohrtime" ),
	"set_featured_image" => esc_html__( "Set featured image for this Top 10 List", "onemohrtime" ),
	"remove_featured_image" => esc_html__( "Remove featured image for this Top 10 List", "onemohrtime" ),
	"use_featured_image" => esc_html__( "Use as featured image for this Top 10 List", "onemohrtime" ),
	"archives" => esc_html__( "Top 10 List archives", "onemohrtime" ),
	"insert_into_item" => esc_html__( "Insert into Top 10 List", "onemohrtime" ),
	"uploaded_to_this_item" => esc_html__( "Upload to this Top 10 List", "onemohrtime" ),
	"filter_items_list" => esc_html__( "Filter Top 10s", "onemohrtime" ),
	"items_list_navigation" => esc_html__( "Top 10s navigation", "onemohrtime" ),
	"items_list" => esc_html__( "Top 10s list", "onemohrtime" ),
	"attributes" => esc_html__( "Top 10s attributes", "onemohrtime" ),
	"name_admin_bar" => esc_html__( "Top 10 List", "onemohrtime" ),
	"item_published" => esc_html__( "Top 10 List published", "onemohrtime" ),
	"item_published_privately" => esc_html__( "Top 10 List published privately.", "onemohrtime" ),
	"item_reverted_to_draft" => esc_html__( "Top 10 List reverted to draft.", "onemohrtime" ),
	"item_scheduled" => esc_html__( "Top 10 List scheduled", "onemohrtime" ),
	"item_updated" => esc_html__( "Top 10 List updated.", "onemohrtime" ),
	"parent_item_colon" => esc_html__( "Parent Top 10 List:", "onemohrtime" ),
];

$args = [
	"label" => esc_html__( "Top 10s", "onemohrtime" ),
	"labels" => $labels,
	"description" => "",
	"public" => true,
	"publicly_queryable" => true,
	"show_ui" => true,
	"show_in_rest" => true,
	"rest_base" => "",
	"rest_controller_class" => "WP_REST_Posts_Controller",
	"rest_namespace" => "wp/v2",
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
	"menu_position" => 30,
	"menu_icon" => "dashicons-list-view",
	"supports" => [ "title", "custom-fields" ],
	"show_in_graphql" => false,
];

register_post_type( "top-10", $args );

/**
 * Post Type: Logos.
 */

$labels = [
	"name" => esc_html__( "Logos", "onemohrtime" ),
	"singular_name" => esc_html__( "Logo", "onemohrtime" ),
	"menu_name" => esc_html__( "Logos", "onemohrtime" ),
];

$args = [
	"label" => esc_html__( "Logos", "onemohrtime" ),
	"labels" => $labels,
	"description" => "",
	"public" => true,
	"publicly_queryable" => false,
	"show_ui" => true,
	"show_in_rest" => true,
	"rest_base" => "",
	"rest_controller_class" => "WP_REST_Posts_Controller",
	"rest_namespace" => "wp/v2",
	"has_archive" => false,
	"show_in_menu" => true,
	"show_in_nav_menus" => false,
	"delete_with_user" => false,
	"exclude_from_search" => false,
	"capability_type" => "post",
	"map_meta_cap" => true,
	"hierarchical" => false,
	"can_export" => false,
	"rewrite" => false,
	"query_var" => true,
	"menu_position" => 6,
	"menu_icon" => "dashicons-format-image",
	"supports" => [ "title", "editor", "thumbnail", "excerpt", "revisions" ],
	"taxonomies" => [ "job_type" ],
	"show_in_graphql" => false,
];

register_post_type( "logo", $args );
