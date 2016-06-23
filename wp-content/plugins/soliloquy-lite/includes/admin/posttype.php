<?php
/**
 * Posttype admin class.
 *
 * @since 1.0.0
 *
 * @package Soliloquy_Lite
 * @author  Thomas Griffin
 */
class Soliloquy_Posttype_Admin_Lite {

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

        // Remove quick editing from the Soliloquy post type row actions.
        add_filter( 'post_row_actions', array( $this, 'row_actions' ), 10, 2 );

        // Manage post type columns.
        add_filter( 'manage_edit-soliloquy_columns', array( $this, 'soliloquy_columns' ) );
        add_filter( 'manage_soliloquy_posts_custom_column', array( $this, 'soliloquy_custom_columns' ), 10, 2 );

        // Update post type messages.
        add_filter( 'post_updated_messages', array( $this, 'messages' ) );

        // Force the menu icon to be scaled to proper size (for Retina displays).
        add_action( 'admin_head', array( $this, 'menu_icon' ) );

    }

    /**
     * Customize the post columns for the Soliloquy post type.
     *
     * @since 1.0.0
     *
     * @param array $columns  The default columns.
     * @return array $columns Amended columns.
     */
    public function soliloquy_columns( $columns ) {

        $columns = array(
            'cb'        => '<input type="checkbox" />',
            'title'     => __( 'Title', 'soliloquy' ),
            'shortcode' => __( 'Shortcode', 'soliloquy' ),
            'template'  => __( 'Template Tag', 'soliloquy' ),
            'images'    => __( 'Number of Images', 'soliloquy' ),
            'modified'  => __( 'Last Modified', 'soliloquy' ),
            'date'      => __( 'Date', 'soliloquy' )
        );

        return $columns;

    }

    /**
     * Add data to the custom columns added to the Soliloquy post type.
     *
     * @since 1.0.0
     *
     * @global object $post  The current post object.
     * @param string $column The name of the custom column.
     * @param int $post_id   The current post ID.
     */
    public function soliloquy_custom_columns( $column, $post_id ) {

        global $post;
        $post_id = absint( $post_id );

        switch ( $column ) {
            case 'shortcode' :
                echo '<code>[soliloquy id="' . $post_id . '"]</code>';
                break;

            case 'template' :
                echo '<code>if ( function_exists( \'soliloquy\' ) ) { soliloquy( \'' . $post_id . '\' ); }</code>';
                break;

            case 'images' :
                $slider_data = get_post_meta( $post_id, '_sol_slider_data', true );
                echo ( ! empty( $slider_data['slider'] ) ? count( $slider_data['slider'] ) : 0 );
                break;

            case 'modified' :
                the_modified_date();
                break;
        }

    }

    /**
     * Filter out unnecessary row actions from the Soliloquy post table.
     *
     * @since 1.0.0
     *
     * @param array $actions  Default row actions.
     * @param object $post    The current post object.
     * @return array $actions Amended row actions.
     */
    public function row_actions( $actions, $post ) {

        if ( isset( get_current_screen()->post_type ) && 'soliloquy' == get_current_screen()->post_type ) {
            unset( $actions['inline hide-if-no-js'] );
        }

        return apply_filters( 'soliloquy_row_actions', $actions, $post );

    }

    /**
     * Contextualizes the post updated messages.
     *
     * @since 1.0.0
     *
     * @global object $post    The current post object.
     * @param array $messages  Array of default post updated messages.
     * @return array $messages Amended array of post updated messages.
     */
    public function messages( $messages ) {

        global $post;

        // Contextualize the messages.
        $messages['soliloquy'] = apply_filters( 'soliloquy_messages',
            array(
                0  => '',
                1  => __( 'Soliloquy slider updated.', 'soliloquy' ),
                2  => __( 'Soliloquy slider custom field updated.', 'soliloquy' ),
                3  => __( 'Soliloquy slider custom field deleted.', 'soliloquy' ),
                4  => __( 'Soliloquy slider updated.', 'soliloquy' ),
                5  => isset( $_GET['revision'] ) ? sprintf( __( 'Soliloquy slider restored to revision from %s.', 'soliloquy' ), wp_post_revision_title( (int) $_GET['revision'], false ) ) : false,
                6  => __( 'Soliloquy slider published.', 'soliloquy' ),
                7  => __( 'Soliloquy slider saved.', 'soliloquy' ),
                8  => __( 'Soliloquy slider submitted.', 'soliloquy' ),
                9  => sprintf( __( 'Soliloquy slider scheduled for: <strong>%1$s</strong>.', 'soliloquy' ), date_i18n( __( 'M j, Y @ G:i' ), strtotime( $post->post_date ) ) ),
                10 => __( 'Soliloquy slider draft updated.', 'soliloquy' )
            )
        );

        return $messages;

    }

    /**
     * Forces the Soliloquy menu icon width/height for Retina devices.
     *
     * @since 1.0.0
     */
    public function menu_icon() {

        ?>
        <style type="text/css">#menu-posts-soliloquy .wp-menu-image img { width: 16px; height: 16px; }</style>
        <?php

    }

    /**
     * Returns the singleton instance of the class.
     *
     * @since 1.0.0
     *
     * @return object The Soliloquy_Posttype_Admin_Lite object.
     */
    public static function get_instance() {

        if ( ! isset( self::$instance ) && ! ( self::$instance instanceof Soliloquy_Posttype_Admin_Lite ) ) {
            self::$instance = new Soliloquy_Posttype_Admin_Lite();
        }

        return self::$instance;

    }

}

// Load the posttype admin class.
$soliloquy_posttype_admin_lite = Soliloquy_Posttype_Admin_Lite::get_instance();