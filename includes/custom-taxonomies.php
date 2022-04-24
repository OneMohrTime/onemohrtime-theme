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
	"name" => __( "Roles", "onemohrtime" ),
	"singular_name" => __( "Role", "onemohrtime" ),
	"menu_name" => __( "Roles", "onemohrtime" ),
	"all_items" => __( "All Roles", "onemohrtime" ),
	"edit_item" => __( "Edit Roles", "onemohrtime" ),
	"view_item" => __( "View Roles", "onemohrtime" ),
	"add_new_item" => __( "Add New Role", "onemohrtime" ),
	"add_or_remove_items" => __( "Add or Remove Roles", "onemohrtime" ),
	"not_found" => __( "No Roles found", "onemohrtime" ),
	"no_terms" => __( "No roles", "onemohrtime" ),
	"items_list" => __( "Role List", "onemohrtime" ),
];

$args = [
	"label" => __( "Roles", "onemohrtime" ),
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
	"show_in_quick_edit" => true,
	"sort" => false,
	"show_in_graphql" => false,
];

register_taxonomy( "role", [ "design" ], $args );

/**
 * Taxonomy: Coding Languages.
 */

$labels = [
	"name" => __( "Coding Languages", "onemohrtime" ),
	"singular_name" => __( "Coding Language", "onemohrtime" ),
	"menu_name" => __( "Coding Languages", "onemohrtime" ),
	"all_items" => __( "All Coding Languages", "onemohrtime" ),
	"edit_item" => __( "Edit Coding Language", "onemohrtime" ),
	"view_item" => __( "View Coding Language", "onemohrtime" ),
	"update_item" => __( "Update Coding Language's Name", "onemohrtime" ),
	"add_new_item" => __( "Add New Coding Language", "onemohrtime" ),
	"new_item_name" => __( "New Coding Language Name", "onemohrtime" ),
	"search_items" => __( "Search Coding Languages", "onemohrtime" ),
	"popular_items" => __( "Popular Coding Languages", "onemohrtime" ),
	"not_found" => __( "No Coding Languages found", "onemohrtime" ),
	"no_terms" => __( "No Coding Languages", "onemohrtime" ),
];

$args = [
	"label" => __( "Coding Languages", "onemohrtime" ),
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
	"show_in_quick_edit" => true,
	"sort" => false,
	"show_in_graphql" => false,
];

register_taxonomy( "coding", [ "design" ], $args );

/**
 * Taxonomy: Job Types.
 */

$labels = [
	"name" => __( "Job Types", "onemohrtime" ),
	"singular_name" => __( "Job Type", "onemohrtime" ),
];

$args = [
	"label" => __( "Job Types", "onemohrtime" ),
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
	"show_in_quick_edit" => true,
	"sort" => false,
	"show_in_graphql" => false,
];

register_taxonomy( "job_type", [ "design" ], $args );
