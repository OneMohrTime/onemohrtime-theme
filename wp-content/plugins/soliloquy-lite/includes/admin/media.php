<?php
/**
 * Media class.
 *
 * @since 1.0.0
 *
 * @package Soliloquy_Lite
 * @author  Thomas Griffin
 */
class Soliloquy_Media_Lite {

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

    }

    /**
     * Prepares a custom media upload form that allows multiple forms on one page.
     *
     * @since 1.0.0
     *
     * @return null Return early if the form cannot be output.
     */
    public function media_upload_form() {

        do_action( 'pre-upload-ui' );

        if ( ! $this->device_can_upload() ) {
            echo '<p>' . sprintf( __( 'The web browser on your device cannot be used to upload files. You may be able to use the <a href="%s">native app for your device</a> instead.', 'soliloquy' ), 'http://wordpress.org/mobile/' ) . '</p>';
            return;
        }

        if ( ! $this->has_upload_capacity() ) {
            do_action( 'upload_ui_over_quota' );
            return;
        }

        // Get both resize width and height for the media form.
        $width  = $this->get_resize_width();
        $height = $this->get_resize_height();

        // Output the media form.
        $this->do_media_upload_form( $width, $height );

    }

    /**
     * Outputs a custom media upload form that allows multiple forms on one page.
     *
     * @since 1.0.0
     *
     * @global bool $ie_IE    Flag for Internet Explorer.
     * @global bool $is_opera Flag for Opera.
     * @param int $width      The media resize width.
     * @param int $height     The media resize height.
     */
    public function do_media_upload_form( $width, $height ) {

        // Prepare globals and variables.
        global $is_IE, $is_opera;
        $sizes           = array( 'KB', 'MB', 'GB' );
        $max_upload_size = wp_max_upload_size();

        ?>
        <script type="text/javascript">var resize_width = <?php echo $width; ?>, resize_height = <?php echo $height; ?>;</script>
        <div id="soliloquy-upload-error"></div>
        <div id="soliloquy-plupload-upload-ui" class="hide-if-no-js">
            <?php do_action( 'pre-plupload-upload-ui' ); ?>
            <div id="soliloquy-drag-drop-area">
                <div class="drag-drop-inside">
                    <p class="drag-drop-info"><?php _e( 'Drop images here', 'soliloquy' ); ?></p>
                    <p><?php _ex( 'or', 'Uploader: Drop images here - or - Select Images', 'soliloquy' ); ?></p>
                    <p class="drag-drop-buttons">
                        <input id="soliloquy-plupload-browse-button" type="button" value="<?php esc_attr_e( 'Select Images', 'soliloquy' ); ?>" class="button" />
                    </p>
                </div>
            </div>
            <?php do_action( 'post-plupload-upload-ui' ); ?>
        </div>

        <div id="soliloquy-html-upload-ui" class="hide-if-js">
            <?php do_action('pre-html-upload-ui'); ?>
            <p id="soliloquy-async-upload-wrap">
                <label class="screen-reader-text" for="soliloquy-async-upload"><?php _e( 'Upload', 'soliloquy' ); ?></label>
                <input type="file" name="async-upload" id="soliloquy-async-upload" />
                <?php submit_button( __( 'Upload', 'soliloquy' ), 'button', 'html-upload', false ); ?>
                <a href="#" onclick="try{top.tb_remove();}catch(e){};return false;"><?php _e( 'Cancel', 'soliloquy' ); ?></a>
            </p>
            <div class="clear"></div>
            <?php do_action( 'post-html-upload-ui' ); ?>
        </div>

        <span class="max-upload-size"><?php printf( __( 'Maximum upload file size: %d%s.', 'soliloquy' ), esc_html( $this->get_upload_size_unit( $sizes ) ), esc_html( $sizes[$this->get_upload_size_unit( $sizes, 'unit' )] ) ); ?></span>
        <?php

        // Output a notice if the browser may have trouble with uploading large images.
        if ( ( $is_IE || $is_opera ) && $max_upload_size > 100 * 1024 * 1024 ) {
            echo '<span class="big-file-warning">' . __( 'Your browser has some limitations uploading large files with the multi-file uploader. Please use the browser uploader for files over 100MB.', 'soliloquy' ) . '</span>';
        }

        do_action( 'post-upload-ui' );

    }

    /**
     * Flag if the device can upload images.
     *
     * @since 1.0.0
     *
     * @return bool True if it can, false otherwise.
     */
    public function device_can_upload() {

        // Why is this method internal? It is quite useful.
        return _device_can_upload();

    }

    /**
     * Flag if the site has the capacity to receive an upload.
     *
     * @since 1.0.0
     *
     * @return bool True if it can, false otherwise.
     */
    public function has_upload_capacity() {

        return ! ( is_multisite() && ! is_upload_space_available() );

    }

    /**
     * Returns the resize width for the media form.
     *
     * @since 1.0.0
     *
     * @return int $width The resize width.
     */
    public function get_resize_width() {

        $width = absint( get_option( 'large_size_w' ) );
        if ( ! $width ) {
            $width = 1024;
        }

        return $width;

    }

    /**
     * Returns the resize height for the media form.
     *
     * @since 1.0.0
     *
     * @return int $width The resize height.
     */
    public function get_resize_height() {

        $height = absint( get_option( 'large_size_h' ) );
        if ( ! $height ) {
            $height = 1024;
        }

        return $height;

    }

    /**
     * Returns the upload unit for the media uploader.
     *
     * @since 1.0.0
     *
     * @param array $sizes Array of sizes to use for units.
     * @param string $type Type of unit to retrieve ('size' or 'unit').
     */
    public function get_upload_size_unit( $sizes, $type = 'size' ) {

        $upload_size_unit = wp_max_upload_size();
        for ( $u = -1; $upload_size_unit > 1024 && $u < count( $sizes ) - 1; $u++ ) {
            $upload_size_unit /= 1024;
        }

        // If the upload size is 0, disable uploading, otherwise allow uploading to continue.
        if ( $u < 0 ) {
            $upload_size_unit = 0;
            $u                = 0;
        } else {
            $upload_size_unit = (int) $upload_size_unit;
        }

        return 'unit' == $type ? $u : $upload_size_unit;

    }

    /**
     * Returns the singleton instance of the class.
     *
     * @since 1.0.0
     *
     * @return object The Soliloquy_Media_Lite object.
     */
    public static function get_instance() {

        if ( ! isset( self::$instance ) && ! ( self::$instance instanceof Soliloquy_Media_Lite ) ) {
            self::$instance = new Soliloquy_Media_Lite();
        }

        return self::$instance;

    }

}

// Load the media class.
$soliloquy_media_lite = Soliloquy_Media_Lite::get_instance();