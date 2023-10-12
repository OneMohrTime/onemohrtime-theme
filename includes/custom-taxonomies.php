<?php
/**
 * 1. Copy code from CPT UI / Tools / Get Code
 * 2. Paste below, but delete the `cptui_register_my_cpts()` wrapper
 * 3. Delete `add_action( 'init', 'cptui_register_my_taxes' )` at the bottom
 */

/**
 * Taxonomy: Roles.
 */

$labels = [
	"name" => esc_html__( "Roles", "onemohrtime" ),
	"singular_name" => esc_html__( "Role", "onemohrtime" ),
	"menu_name" => esc_html__( "Roles", "onemohrtime" ),
	"all_items" => esc_html__( "All Roles", "onemohrtime" ),
	"edit_item" => esc_html__( "Edit Roles", "onemohrtime" ),
	"view_item" => esc_html__( "View Roles", "onemohrtime" ),
	"add_new_item" => esc_html__( "Add New Role", "onemohrtime" ),
	"add_or_remove_items" => esc_html__( "Add or Remove Roles", "onemohrtime" ),
	"not_found" => esc_html__( "No Roles found", "onemohrtime" ),
	"no_terms" => esc_html__( "No roles", "onemohrtime" ),
	"items_list" => esc_html__( "Role List", "onemohrtime" ),
];

$args = [
	"label" => esc_html__( "Roles", "onemohrtime" ),
	"labels" => $labels,
	"public" => true,
	"publicly_queryable" => true,
	"hierarchical" => false,
	"show_ui" => true,
	"show_in_menu" => true,
	"show_in_nav_menus" => true,
	"query_var" => true,
	"rewrite" => [ 'slug' => 'role', 'with_front' => true, ],
	"show_admin_column" => false,
	"show_in_rest" => false,
	"show_tagcloud" => false,
	"rest_base" => "role",
	"rest_controller_class" => "WP_REST_Terms_Controller",
	"rest_namespace" => "wp/v2",
	"show_in_quick_edit" => true,
	"sort" => false,
	"show_in_graphql" => false,
];

register_taxonomy( "role", [ "design" ], $args );

/**
 * Taxonomy: Coding Languages.
 */

$labels = [
	"name" => esc_html__( "Coding Languages", "onemohrtime" ),
	"singular_name" => esc_html__( "Coding Language", "onemohrtime" ),
	"menu_name" => esc_html__( "Coding Languages", "onemohrtime" ),
	"all_items" => esc_html__( "All Coding Languages", "onemohrtime" ),
	"edit_item" => esc_html__( "Edit Coding Language", "onemohrtime" ),
	"view_item" => esc_html__( "View Coding Language", "onemohrtime" ),
	"update_item" => esc_html__( "Update Coding Language's Name", "onemohrtime" ),
	"add_new_item" => esc_html__( "Add New Coding Language", "onemohrtime" ),
	"new_item_name" => esc_html__( "New Coding Language Name", "onemohrtime" ),
	"search_items" => esc_html__( "Search Coding Languages", "onemohrtime" ),
	"popular_items" => esc_html__( "Popular Coding Languages", "onemohrtime" ),
	"not_found" => esc_html__( "No Coding Languages found", "onemohrtime" ),
	"no_terms" => esc_html__( "No Coding Languages", "onemohrtime" ),
];

$args = [
	"label" => esc_html__( "Coding Languages", "onemohrtime" ),
	"labels" => $labels,
	"public" => true,
	"publicly_queryable" => true,
	"hierarchical" => false,
	"show_ui" => true,
	"show_in_menu" => true,
	"show_in_nav_menus" => true,
	"query_var" => true,
	"rewrite" => [ 'slug' => 'coding', 'with_front' => true, ],
	"show_admin_column" => false,
	"show_in_rest" => false,
	"show_tagcloud" => false,
	"rest_base" => "coding",
	"rest_controller_class" => "WP_REST_Terms_Controller",
	"rest_namespace" => "wp/v2",
	"show_in_quick_edit" => true,
	"sort" => false,
	"show_in_graphql" => false,
];

register_taxonomy( "coding", [ "design" ], $args );

/**
 * Taxonomy: Job Types.
 */

$labels = [
	"name" => esc_html__( "Job Types", "onemohrtime" ),
	"singular_name" => esc_html__( "Job Type", "onemohrtime" ),
];

$args = [
	"label" => esc_html__( "Job Types", "onemohrtime" ),
	"labels" => $labels,
	"public" => true,
	"publicly_queryable" => true,
	"hierarchical" => false,
	"show_ui" => true,
	"show_in_menu" => true,
	"show_in_nav_menus" => true,
	"query_var" => true,
	"rewrite" => [ 'slug' => 'job_type', 'with_front' => true, ],
	"show_admin_column" => false,
	"show_in_rest" => false,
	"show_tagcloud" => false,
	"rest_base" => "job_type",
	"rest_controller_class" => "WP_REST_Terms_Controller",
	"rest_namespace" => "wp/v2",
	"show_in_quick_edit" => true,
	"sort" => false,
	"show_in_graphql" => false,
];

register_taxonomy( "job_type", [ "design" ], $args );
