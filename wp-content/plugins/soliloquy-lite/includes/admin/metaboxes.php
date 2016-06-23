<?php
/**
 * Metabox class.
 *
 * @since 1.0.0
 *
 * @package Soliloquy_Lite
 * @author  Thomas Griffin
 */
class Soliloquy_Metaboxes_Lite {

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

        // Load metabox assets.
        add_action( 'admin_enqueue_scripts', array( $this, 'meta_box_styles' ) );
        add_action( 'admin_enqueue_scripts', array( $this, 'meta_box_scripts' ) );

        // Load the metabox hooks and filters.
        add_action( 'add_meta_boxes', array( $this, 'add_meta_boxes' ), 100 );

        // Load all tabs.
        add_action( 'soliloquy_tab_images', array( $this, 'images_tab' ) );
        add_action( 'soliloquy_tab_config', array( $this, 'config_tab' ) );
        add_action( 'soliloquy_tab_misc', array( $this, 'misc_tab' ) );

        // Add action to save metabox config options.
        add_action( 'save_post', array( $this, 'save_meta_boxes' ), 10, 2 );

    }

    /**
     * Loads styles for our metaboxes.
     *
     * @since 1.0.0
     *
     * @return null Return early if not on the proper screen.
     */
    public function meta_box_styles() {
	    
	    // We always need to load metabox.css so we fix 4.0 styling on media grid
        // Load necessary metabox styles.
        wp_register_style( $this->base->plugin_slug . '-metabox-style', plugins_url( 'assets/css/metabox.css', $this->base->file ), array(), $this->base->version );
        wp_enqueue_style( $this->base->plugin_slug . '-metabox-style' );

        if ( 'post' !== get_current_screen()->base ) {
            return;
        }

        if ( isset( get_current_screen()->post_type ) && in_array( get_current_screen()->post_type, $this->get_skipped_posttypes() ) ) {
            return;
        }

        // Fire a hook to load in custom metabox styles.
        do_action( 'soliloquy_metabox_styles' );

    }

    /**
     * Loads scripts for our metaboxes.
     *
     * @since 1.0.0
     *
     * @global int $id      The current post ID.
     * @global object $post The current post object..
     * @return null         Return early if not on the proper screen.
     */
    public function meta_box_scripts( $hook ) {

        global $id, $post;

        if ( isset( get_current_screen()->base ) && 'post' !== get_current_screen()->base ) {
            return;
        }

        if ( isset( get_current_screen()->post_type ) && in_array( get_current_screen()->post_type, $this->get_skipped_posttypes() ) ) {
            return;
        }

        // Set the post_id for localization.
        $post_id = isset( $post->ID ) ? $post->ID : (int) $id;

        // Load necessary metabox scripts.
        wp_enqueue_script( 'jquery-ui-sortable' );
        wp_enqueue_media( array( 'post' => $post_id ) );

        // Load necessary metabox scripts.
        wp_enqueue_script( 'plupload-handlers' );
        wp_register_script( $this->base->plugin_slug . '-metabox-script', plugins_url( 'assets/js/min/metabox-min.js', $this->base->file ), array( 'jquery', 'plupload-handlers', 'quicktags', 'jquery-ui-sortable' ), $this->base->version, true );
        wp_enqueue_script( $this->base->plugin_slug . '-metabox-script' );
        wp_localize_script(
            $this->base->plugin_slug . '-metabox-script',
            'soliloquy_metabox',
            array(
                'ajax'           => admin_url( 'admin-ajax.php' ),
                'change_nonce'   => wp_create_nonce( 'soliloquy-change-type' ),
                'slider'         => esc_attr__( 'Click Here to Insert Slides from Other Sources', 'soliloquy' ),
                'id'             => $post_id,
                'htmlcode'       => __( 'HTML Slide Code', 'soliloquy' ),
                'htmlslide'      => __( 'HTML Slide Title', 'soliloquy' ),
                'htmlplace'      => __( 'Enter HTML slide title here...', 'soliloquy' ),
                'htmlstart'      => __( '<!-- Enter your HTML code here for this slide (you can delete this line). -->', 'soliloquy' ),
                'htmlthumb'      => __( 'HTML Slide Thumbnail', 'soliloquy' ),
                'htmlsrc'        => __( 'Enter your HTML thumbnail URL here...', 'soliloquy' ),
                'htmlselect'     => __( 'Choose HTML Thumbnail', 'soliloquy' ),
                'htmldelete'     => __( 'Remove HTML Thumbnail', 'soliloquy' ),
                'htmlframe'      => __( 'Choose a HTML Thumbnail', 'soliloquy' ),
                'htmluse'        => __( 'Select Thumbnail', 'soliloquy' ),
                'import'         => __( 'You must select a file to import before continuing.', 'soliloquy' ),
                'insert_nonce'   => wp_create_nonce( 'soliloquy-insert-images' ),
                'inserting'      => __( 'Inserting...', 'soliloquy' ),
                'library_search' => wp_create_nonce( 'soliloquy-library-search' ),
                'load_image'     => wp_create_nonce( 'soliloquy-load-image' ),
                'load_slider'    => wp_create_nonce( 'soliloquy-load-slider' ),
                'path'           => plugin_dir_path( 'assets' ),
                'plupload'       => $this->get_plupload_init( $post_id ),
                'refresh_nonce'  => wp_create_nonce( 'soliloquy-refresh' ),
                'remove'         => __( 'Are you sure you want to remove this slide from the slider?', 'soliloquy' ),
                'remove_nonce'   => wp_create_nonce( 'soliloquy-remove-slide' ),
                'removeslide'    => __( 'Remove', 'soliloquy' ),
                'save_nonce'     => wp_create_nonce( 'soliloquy-save-meta' ),
                'saving'         => __( 'Saving...', 'soliloquy' ),
                'sort'           => wp_create_nonce( 'soliloquy-sort' ),
                'upgrade_nonce'  => wp_create_nonce( 'soliloquy-upgrade' ),
                'videocaption'   => __( 'Video Slide Caption', 'soliloquy' ),
                'videoslide'     => __( 'Video Slide Title', 'soliloquy' ),
                'videoplace'     => __( 'Enter video slide title here...', 'soliloquy' ),
                'videotitle'     => __( 'Video Slide URL', 'soliloquy' ),
                'videothumb'     => __( 'Video Slide Thumbnail', 'soliloquy' ),
                'videosrc'       => __( 'Enter your video thumbnail URL here...', 'soliloquy' ),
                'videoselect'    => __( 'Choose Video Thumbnail', 'soliloquy' ),
                'videodelete'    => __( 'Remove Video Thumbnail', 'soliloquy' ),
                'videooutput'    => __( 'Enter your video URL here...', 'soliloquy' ),
                'videoframe'     => __( 'Choose a Video Thumbnail', 'soliloquy' ),
                'videouse'       => __( 'Select Thumbnail', 'soliloquy' )
            )
        );

        // Load necessary HTML slide scripts and styles.
        wp_register_script( $this->base->plugin_slug . '-codemirror', plugins_url( 'assets/js/min/codemirror-min.js', $this->base->file ), array(), $this->base->version, true );
        wp_register_style( $this->base->plugin_slug . '-codemirror', plugins_url( 'assets/css/codemirror.css', $this->base->file ), array(), $this->base->version );
        wp_enqueue_script( $this->base->plugin_slug . '-codemirror' );
        wp_enqueue_style( $this->base->plugin_slug . '-codemirror' );

        // If on an Soliloquy post type, add custom CSS for hiding specific things.
        if ( isset( get_current_screen()->post_type ) && 'soliloquy' == get_current_screen()->post_type ) {
            add_action( 'admin_head', array( $this, 'meta_box_css' ) );
        }

        // Fire a hook to load custom metabox scripts.
        do_action( 'soliloquy_metabox_scripts' );

    }

    /**
     * Returns custom plupload init properties for the media uploader.
     *
     * @since 1.0.0
     *
     * @param int $post_id The current post ID.
     * @return array       Array of plupload init data.
     */
    public function get_plupload_init( $post_id ) {

        // Prepare $_POST form variables and apply backwards compat filter.
    	$post_params = array(
    	    'post_id'  => $post_id,
    	    '_wpnonce' => wp_create_nonce( 'media-form' ),
    	    'type'     => '',
    	    'tab'      => '',
    	    'short'    => 3
    	);
    	$post_params = apply_filters( 'upload_post_params', $post_params );

    	// Prepare upload size parameters.
        $max_upload_size = wp_max_upload_size();

        // Prepare the plupload init array.
        $plupload_init = array(
        	'runtimes'            => 'html5,silverlight,flash,html4',
        	'browse_button'       => 'soliloquy-plupload-browse-button',
        	'container'           => 'soliloquy-plupload-upload-ui',
        	'drop_element'        => 'soliloquy-drag-drop-area',
        	'file_data_name'      => 'async-upload',
        	'multiple_queues'     => true,
        	'max_file_size'       => $max_upload_size . 'b',
        	'url'                 => admin_url( 'async-upload.php' ),
        	'flash_swf_url'       => includes_url( 'js/plupload/plupload.flash.swf' ),
        	'silverlight_xap_url' => includes_url( 'js/plupload/plupload.silverlight.xap' ),
        	'filters'             => array(
        	    array(
        	        'title'       => __( 'Allowed Files', 'soliloquy' ),
        	        'extensions'  => '*'
                ),
            ),
        	'multipart'           => true,
        	'urlstream_upload'    => true,
        	'multipart_params'    => $post_params,
        	'resize'              => false
        );

        // If we are on a mobile device, disable multi selection.
        if ( wp_is_mobile() ) {
            $plupload_init['multi_selection'] = false;
        }

        // Apply backwards compat filter.
        $plupload_init = apply_filters( 'plupload_init', $plupload_init );

        // Return and apply a custom filter to our init data.
        return apply_filters( 'soliloquy_plupload_init', $plupload_init, $post_id );

    }

    /**
     * Hides unnecessary meta box items on Soliloquy post type screens.
     *
     * @since 1.0.0
     */
    public function meta_box_css() {

        ?>
        <style type="text/css">.misc-pub-section:not(.misc-pub-post-status) { display: none; }</style>
        <?php

        // Fire action for CSS on Soliloquy post type screens.
        do_action( 'soliloquy_admin_css' );

    }

    /**
     * Creates metaboxes for handling and managing sliders.
     *
     * @since 1.0.0
     */
    public function add_meta_boxes() {

        // Let's remove all of those dumb metaboxes from our post type screen to control the experience.
        $this->remove_all_the_metaboxes();

        // Get all public post types.
        $post_types = get_post_types( array( 'public' => true ) );

        // Splice the soliloquy post type since it is not visible to the public by default.
        $post_types[] = 'soliloquy';

        // Loops through the post types and add the metaboxes.
        foreach ( (array) $post_types as $post_type ) {
            // Don't output boxes on these post types.
            if ( in_array( $post_type, $this->get_skipped_posttypes() ) ) {
                continue;
            }

            add_meta_box( 'soliloquy', __( 'Soliloquy Settings', 'soliloquy' ), array( $this, 'meta_box_callback' ), $post_type, 'normal', 'high' );
        }

    }

    /**
     * Removes all the metaboxes except the ones I want on MY POST TYPE. RAGE.
     *
     * @since 1.0.0
     *
     * @global array $wp_meta_boxes Array of registered metaboxes.
     * @return smile $for_my_buyers Happy customers with no spammy metaboxes!
     */
    public function remove_all_the_metaboxes() {

        global $wp_meta_boxes;

        // This is the post type you want to target. Adjust it to match yours.
        $post_type  = 'soliloquy';

        // These are the metabox IDs you want to pass over. They don't have to match exactly. preg_match will be run on them.
        $pass_over  = array( 'submitdiv', 'soliloquy' );

        // All the metabox contexts you want to check.
        $contexts   = array( 'normal', 'advanced', 'side' );

        // All the priorities you want to check.
        $priorities = array( 'high', 'core', 'default', 'low' );

        // Loop through and target each context.
        foreach ( $contexts as $context ) {
            // Now loop through each priority and start the purging process.
            foreach ( $priorities as $priority ) {
                if ( isset( $wp_meta_boxes[$post_type][$context][$priority] ) ) {
                    foreach ( (array) $wp_meta_boxes[$post_type][$context][$priority] as $id => $metabox_data ) {
                        // If the metabox ID to pass over matches the ID given, remove it from the array and continue.
                        if ( in_array( $id, $pass_over ) ) {
                            unset( $pass_over[$id] );
                            continue;
                        }

                        // Otherwise, loop through the pass_over IDs and if we have a match, continue.
                        foreach ( $pass_over as $to_pass ) {
                            if ( preg_match( '#^' . $id . '#i', $to_pass ) ) {
                                continue;
                            }
                        }

                        // If we reach this point, remove the metabox completely.
                        unset( $wp_meta_boxes[$post_type][$context][$priority][$id] );
                    }
                }
            }
        }

    }

    /**
     * Callback for displaying content in the registered metabox.
     *
     * @since 1.0.0
     *
     * @param object $post The current post object.
     */
    public function meta_box_callback( $post ) {

        // Keep security first.
        wp_nonce_field( 'soliloquy', 'soliloquy' );

        // Check for our meta overlay helper.
        $slider_data = get_post_meta( $post->ID, '_sol_slider_data', true );
        $helper      = get_post_meta( $post->ID, '_sol_just_published', true );
        $class       = '';
        if ( $helper ) {
            $class = 'soliloquy-helper-needed';
        }

        ?>
        <div id="soliloquy-tabs" class="soliloquy-clear <?php echo $class; ?>">
            <?php $this->meta_helper( $post, $slider_data ); ?>
            <ul id="soliloquy-tabs-nav" class="soliloquy-clear">
                <?php $i = 0; foreach ( (array) $this->get_soliloquy_tab_nav() as $id => $title ) : $class = 0 === $i ? 'soliloquy-active' : ''; ?>
                    <li class="<?php echo $class; ?>"><a href="#soliloquy-tab-<?php echo $id; ?>" title="<?php echo $title; ?>"><?php echo $title; ?></a></li>
                <?php $i++; endforeach; ?>
            </ul>
            <?php $i = 0; foreach ( (array) $this->get_soliloquy_tab_nav() as $id => $title ) : $class = 0 === $i ? 'soliloquy-active' : ''; ?>
                <div id="soliloquy-tab-<?php echo $id; ?>" class="soliloquy-tab soliloquy-clear <?php echo $class; ?>">
                    <?php do_action( 'soliloquy_tab_' . $id, $post ); ?>
                </div>
            <?php $i++; endforeach; ?>
        </div>
        <?php

    }

    /**
     * Callback for getting all of the tabs for Soliloquy sliders.
     *
     * @since 1.0.0
     *
     * @return array Array of tab information.
     */
    public function get_soliloquy_tab_nav() {

        $tabs = array(
            'images'     => __( 'Images', 'soliloquy' ),
            'config'     => __( 'Config', 'soliloquy' ),
        );
        $tabs = apply_filters( 'soliloquy_tab_nav', $tabs );

        // "Misc" tab is required.
        $tabs['misc'] = __( 'Misc', 'soliloquy' );

        return $tabs;

    }

    /**
     * Callback for displaying the UI for main images tab.
     *
     * @since 1.0.0
     *
     * @param object $post The current post object.
     */
    public function images_tab( $post ) {

        // Output a notice if missing cropping extensions because Soliloquy needs them.
        if ( ! $this->has_gd_extension() && ! $this->has_imagick_extension() ) {
            ?>
            <div class="error below-h2">
                <p><strong><?php _e( 'The GD or Imagick libraries are not installed on your server. Soliloquy requires at least one (preferably Imagick) in order to crop images and may not work properly without it. Please contact your webhost and ask them to compile GD or Imagick for your PHP install.', 'soliloquy' ); ?></strong></p>
            </div>
            <?php
        }

        // Output the slider type selection items.
        ?>
        <ul id="soliloquy-types-nav" class="soliloquy-clear">
            <li class="soliloquy-type-label"><span><?php _e( 'Slider Type', 'soliloquy' ); ?></span></li>
            <?php $i = 0; foreach ( (array) $this->get_soliloquy_types( $post ) as $id => $title ) : ?>
                <li><label for="soliloquy-type-<?php echo $id; ?>"><input id="soliloquy-type-<?php echo sanitize_html_class( $id ); ?>" type="radio" name="_soliloquy[type]" value="<?php echo $id; ?>" <?php checked( $this->get_config( 'type', $this->get_config_default( 'type' ) ), $id ); ?> /> <?php echo $title; ?></label></li>
            <?php $i++; endforeach; ?>
            <li class="soliloquy-type-spinner"><span class="spinner soliloquy-spinner"></span></li>
        </ul>
        <?php

        // Output the display based on the type of slider being created.
        echo '<div id="soliloquy-slider-main" class="soliloquy-clear">';
            $this->images_display( $this->get_config( 'type', $this->get_config_default( 'type' ) ), $post );
        echo '</div>';

    }

    /**
     * Returns the types of sliders available.
     *
     * @since 1.0.0
     *
     * @param object $post The current post object.
     * @return array       Array of slider types to choose.
     */
    public function get_soliloquy_types( $post ) {

        $types = array(
            'default' => __( 'Default', 'soliloquy' )
        );

        return apply_filters( 'soliloquy_slider_types', $types, $post );

    }

    /**
     * Determines the Images tab display based on the type of slider selected.
     *
     * @since 1.0.0
     *
     * @param string $type The type of display to output.
     * @param object $post The current post object.
     */
    public function images_display( $type = 'default', $post ) {

        // Output a unique hidden field for settings save testing for each type of slider.
        echo '<input type="hidden" name="_soliloquy[type_' . $type . ']" value="1" />';

        // Output the display based on the type of slider available.
        switch ( $type ) {
            case 'default' :
                $this->do_default_display( $post );
                break;
            default:
                do_action( 'soliloquy_display_' . $type, $post );
                break;
        }

    }

    /**
     * Callback for displaying the default slider UI.
     *
     * @since 1.0.0
     *
     * @param object $post The current post object.
     */
    public function do_default_display( $post ) {

        ?>
        <div class="soliloquy-alert soliloquy-clear" style="margin-bottom:10px;">
            <?php _e( '<em>Want to make your slider workflow even better?</em> By upgrading to Soliloquy Pro, you can get access to numerous other features, including: <strong>a fully featured slider widget</strong>, <strong>media library support</strong>, <strong>thumbnail and carousel support</strong>, <strong>dynamic sliders on the fly</strong>, <strong>complete slider API</strong>, <strong>powerful slider documentation</strong>, <strong>full mobile and Retina support</strong>, <strong>dedicated customer support</strong> and so much more! <a href="http://soliloquywp.com/lite/?utm_source=liteplugin&utm_medium=link&utm_campaign=WordPress" title="Click here to upgrade to Soliloquy Pro!" target="_blank">Click here to upgrade to Soliloquy Pro!</a>', 'soliloquy' ); ?>
        </div>
        <?php

        // Output the custom media upload form.
        Soliloquy_Media_Lite::get_instance()->media_upload_form();

        // Prepare output data.
        $slider_data = get_post_meta( $post->ID, '_sol_slider_data', true );

        ?>
        <ul id="soliloquy-output" class="soliloquy-clear">
            <?php if ( ! empty( $slider_data['slider'] ) ) : ?>
                <?php foreach ( $slider_data['slider'] as $id => $data ) : ?>
                    <?php echo $this->get_slider_item( $id, $data, ( ! empty( $data['type'] ) ? $data['type'] : 'image' ), $post->ID ); ?>
                <?php endforeach; ?>
            <?php endif; ?>
        </ul>
        <?php $this->media_library( $post );

    }

    /**
     * Inserts the meta icon for displaying useful slider meta like shortcode and template tag.
     *
     * @since 1.0.0
     *
     * @param object $post        The current post object.
     * @param array $slider_data Array of slider data for the current post.
     * @return null               Return early if this is an auto-draft.
     */
    public function meta_helper( $post, $slider_data ) {

        if ( isset( $post->post_status ) && 'auto-draft' == $post->post_status ) {
            return;
        }

        // Check for our meta overlay helper.
        $helper = get_post_meta( $post->ID, '_sol_just_published', true );
        $class  = '';
        if ( $helper ) {
            $class = 'soliloquy-helper-active';
            delete_post_meta( $post->ID, '_sol_just_published' );
        }

        ?>
        <div class="soliloquy-meta-helper <?php echo $class; ?>">
            <span class="soliloquy-meta-close-text"><?php _e( '(click the icon to open and close the overlay dialog)', 'soliloquy' ); ?></span>
            <a href="#" class="soliloquy-meta-icon" title="<?php esc_attr__( 'Click here to view meta information about this slider.', 'soliloquy' ); ?>"></a>
            <div class="soliloquy-meta-information">
                <p><?php _e( 'You can place this slider anywhere into your posts, pages, custom post types or widgets by using <strong>one</strong> of the shortcode(s) below:', 'soliloquy' ); ?></p>
                <code><?php echo '[soliloquy id="' . $post->ID . '"]'; ?></code>
                <?php if ( ! empty( $slider_data['config']['slug'] ) ) : ?>
                    <br><code><?php echo '[soliloquy slug="' . $slider_data['config']['slug'] . '"]'; ?></code>
                <?php endif; ?>
                <p><?php _e( 'You can also place this slider into your template files by using <strong>one</strong> of the template tag(s) below:', 'soliloquy' ); ?></p>
                <code><?php echo 'if ( function_exists( \'soliloquy\' ) ) { soliloquy( \'' . $post->ID . '\' ); }'; ?></code>
                <?php if ( ! empty( $slider_data['config']['slug'] ) ) : ?>
                    <br><code><?php echo 'if ( function_exists( \'soliloquy\' ) ) { soliloquy( \'' . $slider_data['config']['slug'] . '\', \'slug\' ); }'; ?></code>
                <?php endif; ?>
            </div>
        </div>
        <?php

    }

    /**
     * Callback for displaying the UI for selecting images from the media library to insert.
     *
     * @since 1.0.0
     *
     * @param object $post The current post object.
     */
    public function media_library( $post ) {

        ?>
        <div id="soliloquy-upload-ui-wrapper">
            <div id="soliloquy-upload-ui" class="soliloquy-image-meta" style="display: none;">
                <div class="media-modal wp-core-ui">
                    <a class="media-modal-close" href="#"><span class="media-modal-icon"></span></a>
                    <div class="media-modal-content">
                        <div class="media-frame soliloquy-media-frame wp-core-ui hide-menu soliloquy-meta-wrap">
                            <div class="media-frame-title">
                                <h1><?php _e( 'Insert Slides into Slider', 'soliloquy' ); ?></h1>
                            </div>
                            <div class="media-frame-router">
                                <div class="media-router">
                                    <a href="#" class="media-menu-item active" data-soliloquy-content="image-slides"><?php _e( 'Image Slides', 'soliloquy' ); ?></a>
                                    <?php do_action( 'soliloquy_modal_router', $post ); ?>
                                </div><!-- end .media-router -->
                            </div><!-- end .media-frame-router -->
                            <?php $this->image_slides_content( $post ); ?>
                            <?php do_action( 'soliloquy_modal_content', $post ); ?>
                            <div class="media-frame-toolbar">
                                <div class="media-toolbar">
                                    <div class="media-toolbar-primary">
                                        <a href="#" class="soliloquy-media-insert button media-button button-large button-primary media-button-insert" title="<?php esc_attr_e( 'Insert Slides into Slider', 'soliloquy' ); ?>"><?php _e( 'Insert Slides into Slider', 'soliloquy' ); ?></a>
                                    </div><!-- end .media-toolbar-primary -->
                                </div><!-- end .media-toolbar -->
                            </div><!-- end .media-frame-toolbar -->
                        </div><!-- end .media-frame -->
                    </div><!-- end .media-modal-content -->
                </div><!-- end .media-modal -->
                <div class="media-modal-backdrop"></div>
            </div><!-- end .soliloquy-image-meta -->
        </div><!-- end #soliloquy-upload-ui-wrapper-->
        <?php

    }

    /**
     * Outputs the image slides content in the modal selection window.
     *
     * @since 1.0.0
     *
     * @param object $post The current post object.
     */
    public function image_slides_content( $post ) {

        ?>
        <div id="soliloquy-image-slides">
            <div class="media-frame-content">
                <div class="attachments-browser">
                    <div class="media-toolbar soliloquy-library-toolbar">
                        <div class="media-toolbar-primary">
                            <span class="spinner soliloquy-spinner"></span><input type="search" placeholder="<?php esc_attr_e( 'Search', 'soliloquy' ); ?>" id="soliloquy-slider-search" class="search" value="" />
                        </div>
                        <div class="media-toolbar-secondary">
                            <a class="button media-button button-large button-secodary soliloquy-load-library" href="#" data-soliloquy-offset="20"><?php _e( 'Load More Images from Library', 'soliloquy' ); ?></a><span class="spinner soliloquy-spinner"></span>
                        </div>
                    </div>
                    <?php $library = get_posts( array( 'post_type' => 'attachment', 'post_mime_type' => 'image', 'post_status' => 'inherit', 'posts_per_page' => 20 ) ); ?>
                    <?php if ( $library ) : ?>
                    <ul class="attachments soliloquy-slider">
                    <?php foreach ( (array) $library as $image ) :
                        $has_slider = get_post_meta( $image->ID, '_sol_has_slider', true );
                        $class       = $has_slider && in_array( $post->ID, (array) $has_slider ) ? ' selected soliloquy-in-slider' : ''; ?>
                        <li class="attachment<?php echo $class; ?>" data-attachment-id="<?php echo absint( $image->ID ); ?>">
                            <div class="attachment-preview landscape">
                                <div class="thumbnail">
                                    <div class="centered">
                                        <?php $src = wp_get_attachment_image_src( $image->ID, 'thumbnail' ); ?>
                                        <img src="<?php echo esc_url( $src[0] ); ?>" />
                                    </div>
                                </div>
                                <a class="check" href="#"><div class="media-modal-icon"></div></a>
                            </div>
                        </li>
                    <?php endforeach; ?>
                    </ul><!-- end .soliloquy-meta -->
                    <?php endif; ?>
                    <div class="media-sidebar">
                        <div class="soliloquy-meta-sidebar">
                            <h3><?php _e( 'Helpful Tips', 'soliloquy' ); ?></h3>
                            <strong><?php _e( 'Selecting Images', 'soliloquy' ); ?></strong>
                            <p><?php _e( 'You can insert any image from your Media Library into your slider. If the image you want to insert is not shown on the screen, you can either click on the "Load More Images from Library" button to load more images or use the search box to find the images you are looking for.', 'soliloquy' ); ?></p>
                        </div><!-- end .soliloquy-meta-sidebar -->
                    </div><!-- end .media-sidebar -->
                </div><!-- end .attachments-browser -->
            </div><!-- end .media-frame-content -->
        </div><!-- end #soliloquy-image-slides -->
        <?php

    }

    /**
     * Callback for displaying the UI for setting slider config options.
     *
     * @since 1.0.0
     *
     * @param object $post The current post object.
     */
    public function config_tab( $post ) {

        ?>
        <div id="soliloquy-config">
            <p class="soliloquy-intro"><?php _e( 'The settings below adjust the basic configuration options for the slider display.', 'soliloquy' ); ?></p>
            <table class="form-table">
                <tbody>
                    <tr id="soliloquy-config-slider-theme-box">
                        <th scope="row">
                            <label for="soliloquy-config-slider-theme"><?php _e( 'Slider Theme', 'soliloquy' ); ?></label>
                        </th>
                        <td>
                            <select id="soliloquy-config-slider-theme" name="_soliloquy[slider_theme]">
                                <?php foreach ( (array) $this->get_slider_themes() as $i => $data ) : ?>
                                    <option value="<?php echo $data['value']; ?>"<?php selected( $data['value'], $this->get_config( 'slider_theme', $this->get_config_default( 'slider_theme' ) ) ); ?>><?php echo $data['name']; ?></option>
                                <?php endforeach; ?>
                            </select>
                            <p class="description"><?php _e( 'Sets the theme for the slider display.', 'soliloquy' ); ?></p>
                        </td>
                    </tr>
                    <tr id="soliloquy-config-slider-size-box">
                        <th scope="row">
                            <label for="soliloquy-config-slider-width"><?php _e( 'Slider Dimensions', 'soliloquy' ); ?></label>
                        </th>
                        <td>
                            <input id="soliloquy-config-slider-width" type="number" name="_soliloquy[slider_width]" value="<?php echo $this->get_config( 'slider_width', $this->get_config_default( 'slider_width' ) ); ?>" /> &#215; <input id="soliloquy-config-slider-height" type="number" name="_soliloquy[slider_height]" value="<?php echo $this->get_config( 'slider_height', $this->get_config_default( 'slider_height' ) ); ?>" /> <span class="soliloquy-unit"><?php _e( 'px', 'soliloquy' ); ?></span>
                            <p class="description"><?php _e( 'Sets the width and height dimensions for the slider.', 'soliloquy' ); ?></p>
                        </td>
                    </tr>
                    <tr id="soliloquy-config-transition-box">
                        <th scope="row">
                            <label for="soliloquy-config-transition"><?php _e( 'Slider Transition', 'soliloquy' ); ?></label>
                        </th>
                        <td>
                            <select id="soliloquy-config-transition" name="_soliloquy[transition]">
                                <?php foreach ( (array) $this->get_slider_transitions() as $i => $data ) : ?>
                                    <option value="<?php echo $data['value']; ?>"<?php selected( $data['value'], $this->get_config( 'transition', $this->get_config_default( 'transition' ) ) ); ?>><?php echo $data['name']; ?></option>
                                <?php endforeach; ?>
                            </select>
                            <p class="description"><?php _e( 'Sets the type of transition for the slider.', 'soliloquy' ); ?></p>
                        </td>
                    </tr>
                    <tr id="soliloquy-config-slider-duration-box">
                        <th scope="row">
                            <label for="soliloquy-config-duration"><?php _e( 'Slider Transition Duration', 'soliloquy' ); ?></label>
                        </th>
                        <td>
                            <input id="soliloquy-config-duration" type="number" name="_soliloquy[duration]" value="<?php echo $this->get_config( 'duration', $this->get_config_default( 'duration' ) ); ?>" /> <span class="soliloquy-unit"><?php _e( 'ms', 'soliloquy' ); ?></span>
                            <p class="description"><?php _e( 'Sets the amount of time between each slide transition <strong>(in milliseconds)</strong>.', 'soliloquy' ); ?></p>
                        </td>
                    </tr>
                    <tr id="soliloquy-config-slider-speed-box">
                        <th scope="row">
                            <label for="soliloquy-config-speed"><?php _e( 'Slider Transition Speed', 'soliloquy' ); ?></label>
                        </th>
                        <td>
                            <input id="soliloquy-config-speed" type="number" name="_soliloquy[speed]" value="<?php echo $this->get_config( 'speed', $this->get_config_default( 'speed' ) ); ?>" /> <span class="soliloquy-unit"><?php _e( 'ms', 'soliloquy' ); ?></span>
                            <p class="description"><?php _e( 'Sets the transition speed when moving from one slide to the next <strong>(in milliseconds)</strong>.', 'soliloquy' ); ?></p>
                        </td>
                    </tr>
                    <tr id="soliloquy-config-gutter-box">
                        <th scope="row">
                            <label for="soliloquy-config-gutter"><?php _e( 'Slider Gutter', 'soliloquy' ); ?></label>
                        </th>
                        <td>
                            <input id="soliloquy-config-gutter" type="number" name="_soliloquy[gutter]" value="<?php echo $this->get_config( 'gutter', $this->get_config_default( 'gutter' ) ); ?>" /> <span class="soliloquy-unit"><?php _e( 'px', 'soliloquy' ); ?></span>
                            <p class="description"><?php _e( 'Sets the gutter between the slider and your content based on slider position.', 'soliloquy' ); ?></p>
                        </td>
                    </tr>
                    <tr id="soliloquy-config-slider-box">
                        <th scope="row">
                            <label for="soliloquy-config-slider"><?php _e( 'Crop Images in Slider?', 'soliloquy' ); ?></label>
                        </th>
                        <td>
                            <input id="soliloquy-config-slider" type="checkbox" name="_soliloquy[slider]" value="<?php echo $this->get_config( 'slider', $this->get_config_default( 'slider' ) ); ?>" <?php checked( $this->get_config( 'slider', $this->get_config_default( 'slider' ) ), 1 ); ?> />
                            <span class="description"><?php _e( 'Enables or disables image cropping based on slider dimensions <strong>(recommended)</strong>.', 'soliloquy' ); ?></span>
                        </td>
                    </tr>
                    <tr id="soliloquy-config-aria-live-box">
                        <th scope="row">
                            <label for="soliloquy-config-aria-live"><?php _e( 'ARIA Live Value', 'soliloquy' ); ?></label>
                        </th>
                        <td>
                            <select id="soliloquy-config-aria-live" name="_soliloquy[aria_live]">
                                <?php foreach ( (array) Soliloquy_Common_Lite::get_instance()->get_aria_live_values() as $i => $data ) : ?>
                                    <option value="<?php echo $data['value']; ?>"<?php selected( $data['value'], $this->get_config( 'aria_live', $this->get_config_default( 'aria_live' ) ) ); ?>><?php echo $data['name']; ?></option>
                                <?php endforeach; ?>
                            </select>
                            <p class="description"><?php _e( 'Accessibility: Defines the priority with which screen readers should treat updates to this slider.', 'soliloquy' ); ?></p>
                        </td>
                    </tr>
                    <?php do_action( 'soliloquy_config_box', $post ); ?>
                </tbody>
            </table>
            <div class="soliloquy-alert soliloquy-clear">
                <?php _e( '<em>Want to do even more with your slider display?</em> By upgrading to Soliloquy Pro, you can get access to numerous other slider display features, including: <strong>full YouTube, Vimeo and Wistia video integration</strong>, <strong>custom HTML slides that can hold ANYTHING</strong>, <strong>custom slider themes</strong>, <strong>mobile specific image assets for blazing fast load times</strong>, <strong>control over navigation arrows and dots</strong>, <strong>pause/play functionality</strong>, <strong>hardware accelerated CSS transitions</strong>, <strong>slider randomization</strong> and so much more! <a href="http://soliloquywp.com/lite/?utm_source=liteplugin&utm_medium=link&utm_campaign=WordPress" title="Click here to upgrade to Soliloquy Pro!" target="_blank">Click here to upgrade to Soliloquy Pro!</a>', 'soliloquy' ); ?>
            </div>
        </div>
        <?php

    }

    /**
     * Callback for displaying the UI for setting slider miscellaneous options.
     *
     * @since 1.0.0
     *
     * @param object $post The current post object.
     */
    public function misc_tab( $post ) {

        ?>
        <div id="soliloquy-misc">
            <p class="soliloquy-intro"><?php _e( 'The settings below adjust the miscellaneous settings for the slider lightbox display.', 'soliloquy' ); ?></p>
            <table class="form-table">
                <tbody>
                    <tr id="soliloquy-config-title-box">
                        <th scope="row">
                            <label for="soliloquy-config-title"><?php _e( 'Slider Title', 'soliloquy' ); ?></label>
                        </th>
                        <td>
                            <input id="soliloquy-config-title" type="text" name="_soliloquy[title]" value="<?php echo $this->get_config( 'title', $this->get_config_default( 'title' ) ); ?>" />
                            <p class="description"><?php _e( 'Internal slider title for identification in the admin.', 'soliloquy' ); ?></p>
                        </td>
                    </tr>
                    <tr id="soliloquy-config-slug-box">
                        <th scope="row">
                            <label for="soliloquy-config-slug"><?php _e( 'Slider Slug', 'soliloquy' ); ?></label>
                        </th>
                        <td>
                            <input id="soliloquy-config-slug" type="text" name="_soliloquy[slug]" value="<?php echo $this->get_config( 'slug', $this->get_config_default( 'slug' ) ); ?>" />
                            <p class="description"><?php _e( '<strong>Unique</strong> internal slider slug for identification and advanced slider queries.', 'soliloquy' ); ?></p>
                        </td>
                    </tr>
                    <tr id="soliloquy-config-classes-box">
                        <th scope="row">
                            <label for="soliloquy-config-classes"><?php _e( 'Custom Slider Classes', 'soliloquy' ); ?></label>
                        </th>
                        <td>
                            <textarea id="soliloquy-config-classes" rows="5" cols="75" name="_soliloquy[classes]" placeholder="<?php _e( 'Enter custom slider CSS classes here, one per line.', 'soliloquy' ); ?>"><?php echo implode( "\n", (array) $this->get_config( 'classes', $this->get_config_default( 'classes' ) ) ); ?></textarea>
                            <p class="description"><?php _e( 'Adds custom CSS classes to this slider. Enter one class per line.', 'soliloquy' ); ?></p>
                        </td>
                    </tr>
                    <tr id="soliloquy-config-rtl-box">
                        <th scope="row">
                            <label for="soliloquy-config-rtl"><?php _e( 'Enable RTL Support?', 'soliloquy' ); ?></label>
                        </th>
                        <td>
                            <input id="soliloquy-config-rtl" type="checkbox" name="_soliloquy[rtl]" value="<?php echo $this->get_config( 'rtl', $this->get_config_default( 'rtl' ) ); ?>" <?php checked( $this->get_config( 'rtl', $this->get_config_default( 'rtl' ) ), 1 ); ?> />
                            <span class="description"><?php _e( 'Enables or disables RTL support in Soliloquy for right-to-left languages.', 'soliloquy' ); ?></span>
                        </td>
                    </tr>
                    <?php do_action( 'soliloquy_misc_box', $post ); ?>
                </tbody>
            </table>
            <div class="soliloquy-alert soliloquy-clear">
                <?php _e( '<em>Want to take your sliders further?</em> By upgrading to Soliloquy Pro, you can get access to numerous other features, including: <strong>a fully-integrated import/export module for your sliders</strong>, <strong>custom CSS controls for each slider</strong>, <strong>lightbox and featured content support</strong> and so much more! <a href="http://soliloquywp.com/lite/?utm_source=liteplugin&utm_medium=link&utm_campaign=WordPress" title="Click here to upgrade to Soliloquy Pro!" target="_blank">Click here to upgrade to Soliloquy Pro!</a>', 'soliloquy' ); ?>
            </div>
        </div>
        <?php

    }

    /**
     * Callback for saving values from Soliloquy metaboxes.
     *
     * @since 1.0.0
     *
     * @param int $post_id The current post ID.
     * @param object $post The current post object.
     */
    public function save_meta_boxes( $post_id, $post ) {

        // Bail out if we fail a security check.
        if ( ! isset( $_POST['soliloquy'] ) || ! wp_verify_nonce( $_POST['soliloquy'], 'soliloquy' ) || ! isset( $_POST['_soliloquy'] ) ) {
            return;
        }

        // Bail out if running an autosave, ajax, cron or revision.
        if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
            return;
        }

        if ( defined( 'DOING_AJAX' ) && DOING_AJAX ) {
            return;
        }

        if ( defined( 'DOING_CRON' ) && DOING_CRON ) {
            return;
        }

        if ( wp_is_post_revision( $post_id ) ) {
            return;
        }

        // Bail out if the user doesn't have the correct permissions to update the slider.
        if ( ! current_user_can( 'edit_post', $post_id ) ) {
            return;
        }

        // If the post has just been published for the first time, set meta field for the slider meta overlay helper.
        if ( isset( $post->post_date ) && isset( $post->post_modified ) && $post->post_date === $post->post_modified ) {
            update_post_meta( $post_id, '_sol_just_published', true );
        }

        // Sanitize all user inputs.
        $settings = get_post_meta( $post_id, '_sol_slider_data', true );
        if ( empty( $settings ) ) {
            $settings = array();
        }

        // Force slider ID to match Post ID. This is deliberate; if a slider is duplicated (either using a duplication)
        // plugin or WPML, the ID remains as the original slider ID, which breaks things for translations etc.
        $settings['id'] = $post_id;

        // Save the config settings.
        $settings['config']['type']          = isset( $_POST['_soliloquy']['type'] ) ? $_POST['_soliloquy']['type'] : $this->get_config_default( 'type' );
        $settings['config']['slider_theme']  = preg_replace( '#[^a-z0-9-_]#', '', $_POST['_soliloquy']['slider_theme'] );
        $settings['config']['slider_width']  = absint( $_POST['_soliloquy']['slider_width'] );
        $settings['config']['slider_height'] = absint( $_POST['_soliloquy']['slider_height'] );
        $settings['config']['transition']    = preg_replace( '#[^a-z0-9-_]#', '', $_POST['_soliloquy']['transition'] );
        $settings['config']['duration']      = absint( $_POST['_soliloquy']['duration'] );
        $settings['config']['speed']         = absint( $_POST['_soliloquy']['speed'] );
        $settings['config']['gutter']        = absint( $_POST['_soliloquy']['gutter'] );
        $settings['config']['slider']        = isset( $_POST['_soliloquy']['slider'] ) ? 1 : 0;
        $settings['config']['aria_live']     = preg_replace( '#[^a-z0-9-_]#', '', $_POST['_soliloquy']['aria_live'] );
        $settings['config']['classes']       = explode( "\n", $_POST['_soliloquy']['classes'] );
        $settings['config']['title']         = trim( strip_tags( $_POST['_soliloquy']['title'] ) );
        $settings['config']['slug']          = sanitize_text_field( $_POST['_soliloquy']['slug'] );
        $settings['config']['rtl']           = ( isset( $_POST['_soliloquy']['rtl'] ) ? 1 : 0 );

        // If on an soliloquy post type, map the title and slug of the post object to the custom fields if no value exists yet.
        if ( isset( $post->post_type ) && 'soliloquy' == $post->post_type ) {
            if ( empty( $settings['config']['title'] ) ) {
                $settings['config']['title'] = trim( strip_tags( $post->post_title ) );
            }

            if ( empty( $settings['config']['slug'] ) ) {
                $settings['config']['slug'] = sanitize_text_field( $post->post_name );
            }
        }

        // Provide a filter to override settings.
        $settings = apply_filters( 'soliloquy_save_settings', $settings, $post_id, $post );

        // Update the post meta.
        update_post_meta( $post_id, '_sol_slider_data', $settings );

        // Change states of images in slider from pending to active.
        $this->change_slider_states( $post_id );

        // If the crop option is checked, crop images accordingly.
        if ( isset( $settings['config']['slider'] ) && $settings['config']['slider'] ) {
            $args = apply_filters( 'soliloquy_crop_image_args',
                array(
                    'position' => 'c',
                    'width'    => $this->get_config( 'slider_width', $this->get_config_default( 'slider_width' ) ),
                    'height'   => $this->get_config( 'slider_height', $this->get_config_default( 'slider_height' ) ),
                    'quality'  => 100,
                    'retina'   => false
                )
            );
            $this->crop_images( $args, $post_id );
        }

        // Fire a hook for addons that need to utilize the cropping feature.
        do_action( 'soliloquy_saved_settings', $settings, $post_id, $post );

        // Finally, flush all slider caches to ensure everything is up to date.
        $this->flush_slider_caches( $post_id, $settings['config']['slug'] );

    }

    /**
     * Helper method for retrieving the slider layout for an item in the admin.
     *
     * @since 1.0.0
     *
     * @param int $id The  ID of the item to retrieve.
     * @param array $data  Array of data for the item.
     * @param string $type The type of slide to retrieve.
     * @param int $post_id The current post ID.
     * @return string The  HTML output for the slider item.
     */
    public function get_slider_item( $id, $data, $type, $post_id = 0 ) {

        switch ( $type ) {
            case 'image' :
                $item = $this->get_slider_image( $id, $data, $post_id );
                break;
            case 'video' :
                $item = '';
                break;
            case 'html' :
                $item = '';
                break;
        }

        return apply_filters( 'soliloquy_slide_item', $item, $id, $data, $type, $post_id );

    }

    /**
     * Helper method for retrieving the slider image layout in the admin.
     *
     * @since 1.0.0
     *
     * @param int $id The  ID of the item to retrieve.
     * @param array $data  Array of data for the item.
     * @param int $post_id The current post ID.
     * @return string The  HTML output for the slider item.
     */
    public function get_slider_image( $id, $data, $post_id = 0 ) {

        $thumbnail = wp_get_attachment_image_src( $id, 'thumbnail' ); ob_start(); ?>
        <li id="<?php echo $id; ?>" class="soliloquy-slide soliloquy-image soliloquy-status-<?php echo $data['status']; ?>" data-soliloquy-slide="<?php echo $id; ?>">
            <img src="<?php echo esc_url( $thumbnail[0] ); ?>" alt="<?php esc_attr_e( $data['alt'] ); ?>" />
            <a href="#" class="soliloquy-remove-slide" title="<?php esc_attr_e( 'Remove Image Slide from Slider?', 'soliloquy' ); ?>"></a>
            <a href="#" class="soliloquy-modify-slide" title="<?php esc_attr_e( 'Modify Image Slide', 'soliloquy' ); ?>"></a>
            <?php echo $this->get_slider_image_meta( $id, $data, $post_id ); ?>
        </li>
        <?php
        return ob_get_clean();

    }

    /**
     * Helper method for retrieving the slider image metadata.
     *
     * @since 1.0.0
     *
     * @param int $id      The ID of the item to retrieve.
     * @param array $data  Array of data for the item.
     * @param int $post_id The current post ID.
     * @return string      The HTML output for the slider item.
     */
    public function get_slider_image_meta( $id, $data, $post_id ) {

        ob_start();
        ?>
        <div id="soliloquy-meta-<?php echo $id; ?>" class="soliloquy-meta-container" style="display:none;">
            <div class="media-modal wp-core-ui">
                <a class="media-modal-close" href="#"><span class="media-modal-icon"></span></a>
                <div class="media-modal-content">
                    <div class="media-frame soliloquy-media-frame wp-core-ui hide-menu hide-router soliloquy-meta-wrap">
                        <div class="media-frame-title">
                            <h1><?php _e( 'Edit Metadata', 'soliloquy' ); ?></h1>
                        </div>
                        <div class="media-frame-content">
                            <div class="attachments-browser">
                                <div class="soliloquy-meta attachments">
                                    <?php do_action( 'soliloquy_before_image_meta_table', $id, $data, $post_id ); ?>
                                    <table id="soliloquy-meta-table-<?php echo $id; ?>" class="form-table soliloquy-meta-table" data-soliloquy-meta-id="<?php echo $id; ?>">
                                        <tbody>
                                            <?php do_action( 'soliloquy_before_image_meta_settings', $id, $data, $post_id ); ?>
                                            <tr id="soliloquy-title-box-<?php echo $id; ?>" valign="middle">
                                                <th scope="row"><label for="soliloquy-title-<?php echo $id; ?>"><?php _e( 'Image Title', 'soliloquy' ); ?></label></th>
                                                <td>
                                                    <input id="soliloquy-title-<?php echo $id; ?>" class="soliloquy-title" type="text" name="_soliloquy[meta_title]" value="<?php echo ( ! empty( $data['title'] ) ? esc_attr( $data['title'] ) : '' ); ?>" data-soliloquy-meta="title" />
                                                    <p class="description"><?php _e( 'Sets the image title attribute for the image.', 'soliloquy' ); ?></p>
                                                </td>
                                            </tr>
                                            <?php do_action( 'soliloquy_before_image_meta_alt', $id, $data, $post_id ); ?>
                                            <tr id="soliloquy-alt-box-<?php echo $id; ?>" valign="middle">
                                                <th scope="row"><label for="soliloquy-alt-<?php echo $id; ?>"><?php _e( 'Image Alt Text', 'soliloquy' ); ?></label></th>
                                                <td>
                                                    <input id="soliloquy-alt-<?php echo $id; ?>" class="soliloquy-alt" type="text" name="_soliloquy[meta_alt]" value="<?php echo ( ! empty( $data['alt'] ) ? esc_attr( $data['alt'] ) : '' ); ?>" data-soliloquy-meta="alt" />
                                                    <p class="description"><?php _e( 'The image alt text is used for SEO. You should probably fill this one out!', 'soliloquy' ); ?></p>
                                                </td>
                                            </tr>

                                            <?php do_action( 'soliloquy_before_image_meta_link', $id, $data, $post_id ); ?>
                                            <tr id="soliloquy-link-box-<?php echo $id; ?>" class="soliloquy-link-cell" valign="middle">
                                                <th scope="row"><label for="soliloquy-link-<?php echo $id; ?>"><?php _e( 'Image Hyperlink', 'soliloquy' ); ?></label></th>
                                                <td>
                                                    <input id="soliloquy-link-<?php echo $id; ?>" class="soliloquy-link" type="text" name="_soliloquy[meta_link]" value="<?php echo ( ! empty( $data['link'] ) ? esc_url( $data['link'] ) : '' ); ?>" data-soliloquy-meta="link" />
                                                    <p class="description"><?php _e( 'The image hyperlink determines what opens once the image is clicked. If left empty, no link will be added.', 'soliloquy' ); ?></p>
                                                </td>
                                            </tr>

                                            <?php do_action( 'soliloquy_before_image_meta_tab', $id, $data, $post_id ); ?>
                                            <tr id="soliloquy-tab-box-<?php echo $id; ?>" class="soliloquy-tab-cell" valign="middle">
                                                <th scope="row"><label for="soliloquy-link-<?php echo $id; ?>"><?php _e( 'Open Link in New Tab', 'soliloquy' ); ?></label></th>
                                                <td>
                                                    <input id="soliloquy-tab-<?php echo $id; ?>" class="soliloquy-tab" type="checkbox" name="_soliloquy[meta_tab]" value="1" <?php checked( ( ! empty( $data['linktab'] ) && $data['linktab'] ? 1 : 0 ), 1 ); ?> data-soliloquy-meta="linktab" />
                                                    <p class="description"><?php _e( 'If enabled, opens the Image Hyperlink in a new browser window/tab.', 'soliloquy' ); ?></p>
                                                </td>
                                            </tr>

                                            <?php do_action( 'soliloquy_before_image_meta_caption', $id, $data, $post_id ); ?>
                                            <tr id="soliloquy-caption-box-<?php echo $id; ?>" valign="middle">
                                                <th scope="row"><label for="soliloquy-caption-<?php echo $id; ?>"><?php _e( 'Image Caption', 'soliloquy' ); ?></label></th>
                                                <td>
                                                    <?php wp_editor( ( ! empty( $data['caption'] ) ? $data['caption'] : '' ), 'soliloquy-caption-' . $id, array( 'textarea_rows' => 5, 'media_buttons' => false, 'wpautop' => false, 'tinymce' => false, 'textarea_name' => '_soliloquy[meta_caption]', 'quicktags' => array( 'buttons' => 'strong,em,link,ul,ol,li,close' ) ) ); ?>
                                                    <p class="description"><?php _e( 'Image captions can take any type of HTML.', 'soliloquy' ); ?></p>
                                                </td>
                                            </tr>
                                            <?php do_action( 'soliloquy_after_image_meta_settings', $id, $data, $post_id ); ?>
                                        </tbody>
                                    </table>
                                    <?php do_action( 'soliloquy_after_image_meta_table', $id, $data, $post_id ); ?>
                                </div><!-- end .soliloquy-meta -->
                                <div class="media-sidebar">
                                    <div class="soliloquy-meta-sidebar">
                                        <h3><?php _e( 'Helpful Tips', 'soliloquy' ); ?></h3>
                                        <strong><?php _e( 'Images and SEO', 'soliloquy' ); ?></strong>
                                        <p><?php _e( 'Images are a small but important part of your overall SEO strategy. In order to get the most SEO benefits from your slider, it is recommended that you fill out each applicable field with SEO friendly information about the image.', 'soliloquy' ); ?></p>
                                        <strong><?php _e( 'Image Hyperlinks', 'soliloquy' ); ?></strong>
                                        <p><?php _e( 'The image hyperlink field is used when you click on an image in the slider.', 'soliloquy' ); ?></p>
                                        <strong><?php _e( 'Image Captions', 'soliloquy' ); ?></strong>
                                        <p><?php _e( 'Captions can take any type of HTML content, such as <code>form</code>, <code>iframe</code> and <code>h1</code> tags.', 'soliloquy' ); ?></p>
                                        <strong><?php _e( 'Saving and Exiting', 'soliloquy' ); ?></strong>
                                        <p class="no-margin"><?php _e( 'Click on the button below to save your image metadata. You can close this window by either clicking on the "X" above or hitting the <code>esc</code> key on your keyboard.', 'soliloquy' ); ?></p>
                                    </div><!-- end .soliloquy-meta-sidebar -->
                                </div><!-- end .media-sidebar -->
                            </div><!-- end .attachments-browser -->
                        </div><!-- end .media-frame-content -->
                        <div class="media-frame-toolbar">
                            <div class="media-toolbar">
                                <div class="media-toolbar-primary">
                                    <a href="#" class="soliloquy-meta-submit button media-button button-large button-primary media-button-insert" title="<?php esc_attr_e( 'Save Metadata', 'soliloquy' ); ?>" data-soliloquy-item="<?php echo $id; ?>"><?php _e( 'Save Metadata', 'soliloquy' ); ?></a>
                                </div><!-- end .media-toolbar-primary -->
                            </div><!-- end .media-toolbar -->
                        </div><!-- end .media-frame-toolbar -->
                    </div><!-- end .media-frame -->
                </div><!-- end .media-modal-content -->
            </div><!-- end .media-modal -->
            <div class="media-modal-backdrop"></div>
        </div>
        <?php
        return ob_get_clean();

    }

    /**
     * Helper method to change a slider state from pending to active. This is done
     * automatically on post save. For previewing sliders before publishing,
     * simply click the "Preview" button and Soliloquy will load all the images present
     * in the slider at that time.
     *
     * @since 1.0.0
     *
     * @param int $id The current post ID.
     */
    public function change_slider_states( $post_id ) {

        $slider_data = get_post_meta( $post_id, '_sol_slider_data', true );
        if ( ! empty( $slider_data['slider'] ) ) {
            foreach ( (array) $slider_data['slider'] as $id => $item ) {
                $slider_data['slider'][$id]['status'] = 'active';
            }
        }

        update_post_meta( $post_id, '_sol_slider_data', $slider_data );

    }

    /**
     * Helper method to crop slider images to the specified sizes.
     *
     * @since 1.0.0
     *
     * @param array $args  Array of args used when cropping the images.
     * @param int $post_id The current post ID.
     */
    public function crop_images( $args, $post_id ) {

        // Gather all available images to crop.
        $slider_data = get_post_meta( $post_id, '_sol_slider_data', true );
        $images      = ! empty( $slider_data['slider'] ) ? $slider_data['slider'] : false;
        $common      = Soliloquy_Common_Lite::get_instance();

        // Loop through the images and crop them.
        if ( $images ) {
            // Increase the time limit to account for large image sets and suspend cache invalidations.
            set_time_limit( Soliloquy_Common_Lite::get_instance()->get_max_execution_time() );
            wp_suspend_cache_invalidation( true );

            foreach ( $images as $id => $item ) {
                // Get the full image attachment. If it does not return the data we need, skip over it.
                $image = wp_get_attachment_image_src( $id, 'full' );
                if ( ! is_array( $image ) ) {
                    // Check for video/HTML slide and possibly use a thumbnail instead.
                    if ( ( isset( $item['type'] ) && 'video' == $item['type'] || isset( $item['type'] ) && 'html' == $item['type'] ) && ! empty( $item['thumb'] ) ) {
                        $image = $item['thumb'];
                    } else {
                        continue;
                    }
                } else {
                    $image = $image[0];
                }

                // Allow image to be filtered to use a different thumbnail than the main image.
                $image = apply_filters( 'soliloquy_cropped_image', $image, $id, $item, $args, $post_id );

                // Generate the cropped image.
                $cropped_image = $common->resize_image( $image, $args['width'], $args['height'], true, $args['position'], $args['quality'], $args['retina'] );

                // If there is an error, possibly output error message, otherwise woot!
                if ( is_wp_error( $cropped_image ) ) {
                    // If WP_DEBUG is enabled, and we're logged in, output an error to the user
                    if ( defined( 'WP_DEBUG' ) && WP_DEBUG && is_user_logged_in() ) {
                        echo '<pre>Soliloquy: Error occured resizing image (these messages are only displayed to logged in WordPress users):<br />';
                        echo 'Error: ' . $cropped_image->get_error_message() . '<br />';
                        echo 'Image: ' . $image . '<br />';
                        echo 'Args: ' . var_export( $args, true ) . '</pre>';
                    }
                }
            }

            // Turn off cache suspension and flush the cache to remove any cache inconsistencies.
            wp_suspend_cache_invalidation( false );
            wp_cache_flush();
        }

    }

    /**
     * Helper method to flush slider caches once a slider is updated.
     *
     * @since 1.0.0
     *
     * @param int $post_id The current post ID.
     * @param string $slug The unique slider slug.
     */
    public function flush_slider_caches( $post_id, $slug ) {

        Soliloquy_Common_Lite::get_instance()->flush_slider_caches( $post_id, $slug );

    }

    /**
     * Helper method for retrieving config values.
     *
     * @since 1.0.0
     *
     * @global int $id        The current post ID.
     * @global object $post   The current post object.
     * @param string $key     The config key to retrieve.
     * @param string $default A default value to use.
     * @return string         Key value on success, empty string on failure.
     */
    public function get_config( $key, $default = false ) {

        global $id, $post;

        // Get the current post ID. If ajax, grab it from the $_POST variable.
        if ( defined( 'DOING_AJAX' ) && DOING_AJAX ) {
            $post_id = absint( $_POST['post_id'] );
        } else {
            $post_id = isset( $post->ID ) ? $post->ID : (int) $id;
        }

        $settings = get_post_meta( $post_id, '_sol_slider_data', true );
        if ( isset( $settings['config'][$key] ) ) {
            return $settings['config'][$key];
        } else {
            return $default ? $default : '';
        }

    }

    /**
     * Helper method for setting default config values.
     *
     * @since 1.0.0
     *
     * @param string $key The default config key to retrieve.
     * @return string Key value on success, false on failure.
     */
    public function get_config_default( $key ) {

        $instance = Soliloquy_Common_Lite::get_instance();
        return $instance->get_config_default( $key );

    }

    /**
     * Helper method for retrieving slider themes.
     *
     * @since 1.0.0
     *
     * @return array Array of slider theme data.
     */
    public function get_slider_themes() {

        $instance = Soliloquy_Common_Lite::get_instance();
        return $instance->get_slider_themes();

    }

    /**
     * Helper method for retrieving slider transitions.
     *
     * @since 1.0.0
     *
     * @return array Array of thumbnail transition data.
     */
    public function get_slider_transitions() {

        $instance = Soliloquy_Common_Lite::get_instance();
        return $instance->get_slider_transitions();

    }

    /**
     * Returns the post types to skip for loading Soliloquy metaboxes.
     *
     * @since 1.0.0
     *
     * @return array Array of skipped posttypes.
     */
    public function get_skipped_posttypes() {

        $post_types = get_post_types( array( 'public' => true ) );
        unset( $post_types['soliloquy'] );
        return apply_filters( 'soliloquy_skipped_posttypes', $post_types );

    }

    /**
     * Flag to determine if the GD library has been compiled.
     *
     * @since 1.0.0
     *
     * @return bool True if has proper extension, false otherwise.
     */
    public function has_gd_extension() {

        return extension_loaded( 'gd' ) && function_exists( 'gd_info' );

    }

    /**
     * Flag to determine if the Imagick library has been compiled.
     *
     * @since 1.0.0
     *
     * @return bool True if has proper extension, false otherwise.
     */
    public function has_imagick_extension() {

        return extension_loaded( 'imagick' );

    }

    /**
     * Returns the singleton instance of the class.
     *
     * @since 1.0.0
     *
     * @return object The Soliloquy_Metaboxes_Lite object.
     */
    public static function get_instance() {

        if ( ! isset( self::$instance ) && ! ( self::$instance instanceof Soliloquy_Metaboxes_Lite ) ) {
            self::$instance = new Soliloquy_Metaboxes_Lite();
        }

        return self::$instance;

    }

}

// Load the metabox class.
$soliloquy_metaboxes_lite = Soliloquy_Metaboxes_Lite::get_instance();