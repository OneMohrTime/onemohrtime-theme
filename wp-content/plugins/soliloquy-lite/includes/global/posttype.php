<?php
/**
 * Posttype class.
 *
 * @since 1.0.0
 *
 * @package Soliloquy_Lite
 * @author  Thomas Griffin
 */
class Soliloquy_Posttype_Lite {

    /**
     * Holds the class object.
     *
     * @since 1.0.0
     *
     * @var object
     */
    public static $instance;

    /**
     * Path to the file.
     *
     * @since 1.0.0
     *
     * @var string
     */
    public $file = __FILE__;

    /**
     * Holds the base class object.
     *
     * @since 1.0.0
     *
     * @var object
     */
    public $base;

    /**
     * Primary class constructor.
     *
     * @since 1.0.0
     */
    public function __construct() {

        // Load the base class object.
        $this->base = Soliloquy_Lite::get_instance();

        // Build the labels for the post type.
        $labels = apply_filters( 'soliloquy_post_type_labels',
            array(
                'name'               => __( 'Soliloquy Sliders', 'soliloquy' ),
                'singular_name'      => __( 'Soliloquy', 'soliloquy' ),
                'add_new'            => __( 'Add New', 'soliloquy' ),
                'add_new_item'       => __( 'Add New Soliloquy Slider', 'soliloquy' ),
                'edit_item'          => __( 'Edit Soliloquy Slider', 'soliloquy' ),
                'new_item'           => __( 'New Soliloquy Slider', 'soliloquy' ),
                'view_item'          => __( 'View Soliloquy Slider', 'soliloquy' ),
                'search_items'       => __( 'Search Soliloquy Sliders', 'soliloquy' ),
                'not_found'          => __( 'No Soliloquy sliders found.', 'soliloquy' ),
                'not_found_in_trash' => __( 'No Soliloquy sliders found in trash.', 'soliloquy' ),
                'parent_item_colon'  => '',
                'menu_name'          => __( 'Soliloquy', 'soliloquy' )
            )
        );

        // Build out the post type arguments.
        $args = apply_filters( 'soliloquy_post_type_args',
            array(
                'labels'              => $labels,
                'public'              => false,
                'exclude_from_search' => false,
                'show_ui'             => true,
                'show_in_admin_bar'   => false,
                'rewrite'             => false,
                'query_var'           => false,
                'menu_position'       => apply_filters( 'soliloquy_post_type_menu_position', 248 ),
                'menu_icon'           => plugins_url( 'assets/css/images/menu-icon@2x.png', $this->base->file ),
                'supports'            => array( 'title' )
            )
        );

        // Register the post type with WordPress.
        register_post_type( 'soliloquy', $args );

    }

    /**
     * Returns the singleton instance of the class.
     *
     * @since 1.0.0
     *
     * @return object The Soliloquy_Posttype_Lite object.
     */
    public static function get_instance() {

        if ( ! isset( self::$instance ) && ! ( self::$instance instanceof Soliloquy_Posttype_Lite ) ) {
            self::$instance = new Soliloquy_Posttype_Lite();
        }

        return self::$instance;

    }

}

// Load the posttype class.
$soliloquy_posttype_lite = Soliloquy_Posttype_Lite::get_instance();