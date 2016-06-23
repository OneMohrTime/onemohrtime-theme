<?php
/**
 * Shortcode class.
 *
 * @since 1.0.0
 *
 * @package Soliloquy_Lite
 * @author  Thomas Griffin
 */
class Soliloquy_Shortcode_Lite {

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
     * Holds the slider data.
     *
     * @since 1.0.0
     *
     * @var array
     */
    public $data;

    /**
     * Holds slider IDs for init firing checks.
     *
     * @since 1.0.0
     *
     * @var array
     */
    public $done = array();

    /**
     * Iterator for sliders on the page.
     *
     * @since 1.0.0
     *
     * @var int
     */
    public $counter = 1;

    /**
     * Flag for YouTube videos.
     *
     * @since 1.0.0
     *
     * @var bool
     */
    public $youtube = false;

    /**
     * Flag for Vimeo videos.
     *
     * @since 1.0.0
     *
     * @var bool
     */
    public $vimeo = false;

    /**
     * Flag for Wistia videos.
     *
     * @since 1.0.0
     *
     * @var bool
     */
    public $wistia = false;

    /**
     * Flag for HTML slides.
     *
     * @since 1.0.0
     *
     * @var bool
     */
    public $html = false;

    /**
     * Primary class constructor.
     *
     * @since 1.0.0
     */
    public function __construct() {

        // Load the base class object.
        $this->base = Soliloquy_Lite::get_instance();

        // Register main slider style.
        wp_register_style( $this->base->plugin_slug . '-style', plugins_url( 'assets/css/soliloquy.css', $this->base->file ), array(), $this->base->version );

        // Register main slider script.
        wp_register_script( $this->base->plugin_slug . '-script', plugins_url( 'assets/js/min/soliloquy-min.js', $this->base->file ), array( 'jquery' ), $this->base->version, true );

        // Load hooks and filters.
        add_shortcode( 'soliloquy', array( $this, 'shortcode' ) );
        add_filter( 'widget_text', 'do_shortcode' );

    }

    /**
     * Creates the shortcode for the plugin.
     *
     * @since 1.0.0
     *
     * @global object $post The current post object.
     *
     * @param array $atts Array of shortcode attributes.
     * @return string     The slider output.
     */
    public function shortcode( $atts ) {

        global $post;

        // If no attributes have been passed, the slider should be pulled from the current post.
        $slider_id = false;
        if ( empty( $atts ) ) {
            $slider_id = $post->ID;
            $data      = is_preview() ? $this->base->_get_slider( $slider_id ) : $this->base->get_slider( $slider_id );
        } else if ( isset( $atts['id'] ) ) {
            $slider_id = (int) $atts['id'];
            $data      = is_preview() ? $this->base->_get_slider( $slider_id ) : $this->base->get_slider( $slider_id );
        } else if ( isset( $atts['slug'] ) ) {
            $slider_id = $atts['slug'];
            $data      = is_preview() ? $this->base->_get_slider_by_slug( $slider_id ) : $this->base->get_slider_by_slug( $slider_id );
        } else {
            // A custom attribute must have been passed. Allow it to be filtered to grab data from a custom source.
            $data = apply_filters( 'soliloquy_custom_slider_data', false, $atts, $post );
        }

        // If there is no data and the attribute used is an ID, try slug as well.
        if ( ! $data && isset( $atts['id'] ) ) {
            $slider_id = $atts['id'];
            $data      = is_preview() ? $this->base->_get_slider_by_slug( $slider_id ) : $this->base->get_slider_by_slug( $slider_id );
        }

        // Allow the data to be filtered before it is stored and used to create the slider output.
        $data = apply_filters( 'soliloquy_pre_data', $data, $slider_id );

        // If there is no data to output or the slider is inactive, do nothing.
        if ( ! $data || empty( $data['slider'] ) || isset( $data['status'] ) && 'inactive' == $data['status'] && ! is_preview() ) {
            return false;
        }

        // If the data is to be randomized, do it now.
        if ( $this->get_config( 'random', $data ) ) {
            $data = $this->shuffle( $data );
        }

        // Prepare variables.
        $this->data[$data['id']] = $data;
        $slider                  = '';
        $i                       = 1;

        // If this is a feed view, customize the output and return early.
        if ( is_feed() ) {
            return $this->do_feed_output( $data );
        }

        // Load scripts and styles.
        wp_enqueue_style( $this->base->plugin_slug . '-style' );
        wp_enqueue_script( $this->base->plugin_slug . '-script' );

        // Load custom slider themes if necessary.
        if ( 'base' !== $this->get_config( 'slider_theme', $data ) ) {
            $this->load_slider_theme( $this->get_config( 'slider_theme', $data ) );
        }

        // Load slider init code in the footer.
        add_action( 'wp_footer', array( $this, 'slider_init' ), 1000 );

        // Run a hook before the slider output begins but after scripts and inits have been set.
        do_action( 'soliloquy_before_output', $data );

        // Apply a filter before starting the slider HTML.
        $slider = apply_filters( 'soliloquy_output_start', $slider, $data );

        // Build out the slider HTML.
        $slider .= '<div aria-live="' . $this->get_config( 'aria_live', $data ) . '" id="soliloquy-container-' . sanitize_html_class( $data['id'] ) . '" class="' . $this->get_slider_classes( $data ) . '" style="max-width:' . $this->get_config( 'slider_width', $data ) . 'px;max-height:' . $this->get_config( 'slider_height', $data ) . 'px;' . apply_filters( 'soliloquy_output_container_style', '', $data ) . '"' . apply_filters( 'soliloquy_output_container_attr', '', $data ) . '>';
            $slider .= '<ul id="soliloquy-' . sanitize_html_class( $data['id'] ) . '" class="soliloquy-slider soliloquy-slides soliloquy-wrap soliloquy-clear">';
                $slider = apply_filters( 'soliloquy_output_before_container', $slider, $data );

                foreach ( (array) $data['slider'] as $id => $item ) {
                    // Skip over images that are pending (ignore if in Preview mode).
                    if ( isset( $item['status'] ) && 'pending' == $item['status'] && ! is_preview() ) {
                        continue;
                    }

                    // Allow filtering of individual items.
                    $item     = apply_filters( 'soliloquy_output_item_data', $item, $id, $data, $i );

                    $slider   = apply_filters( 'soliloquy_output_before_item', $slider, $id, $item, $data, $i );
                    $output   = '<li aria-hidden="true" class="' . $this->get_slider_item_classes( $item, $i, $data ) . '"' . apply_filters( 'soliloquy_output_item_attr', '', $id, $item, $data, $i ) . ' draggable="false" style="list-style:none">';
                        $output .= $this->get_slide( $id, $item, $data, $i );
                    $output .= '</li>';
                    $output  = apply_filters( 'soliloquy_output_single_item', $output, $id, $item, $data, $i );
                    $slider .= $output;
                    $slider  = apply_filters( 'soliloquy_output_after_item', $slider, $id, $item, $data, $i );

                    // Increment the iterator.
                    $i++;
                }

                $slider = apply_filters( 'soliloquy_output_after_container', $slider, $data );
            $slider .= '</ul>';
            $slider  = apply_filters( 'soliloquy_output_end', $slider, $data );
        $slider .= '</div>';

        // Increment the counter.
        $this->counter++;

        // Add no JS fallback support.
        $no_js   = apply_filters( 'soliloquy_output_no_js', '<noscript><style type="text/css">#soliloquy-container-' . sanitize_html_class( $data['id'] ) . '{opacity:1}</style></noscript>', $data );
        $slider .= $no_js;

        // Return the slider HTML.
        return apply_filters( 'soliloquy_output', $slider, $data );

    }

    /**
     * Retrieves an individual slide for the slider.
     *
     * @since 1.0.0
     *
     * @param int|string $id The ID for the slide.
     * @param array $item    Array of data for the slide.
     * @param array $data    Array of data for the slider.
     * @param int $i         The number of the slide in the slider.
     * @return string        HTML markup for the slide.
     */
    public function get_slide( $id, $item, $data, $i ) {

        $type = ! empty( $item['type'] ) ? $item['type'] : 'image';
        switch ( $type ) {
            case 'image' :
                $slide = $this->get_image_slide( $id, $item, $data, $i );
                break;
            case 'video' :
                $slide = '';
                break;
            case 'html' :
                $slide = '';
                break;
        }

        return apply_filters( 'soliloquy_output_slide', $slide, $id, $item, $data, $i );

    }

    /**
     * Retrieves an individual image slide for the slider.
     *
     * @since 1.0.0
     *
     * @param int|string $id The ID for the slide.
     * @param array $item    Array of data for the slide.
     * @param array $data    Array of data for the slider.
     * @param int $i         The number of the slide in the slider.
     * @return string        HTML markup for the image slide.
     */
    public function get_image_slide( $id, $item, $data, $i ) {

        // Grab our image src and prepare our output.
        $imagesrc = $this->get_image_src( $id, $item, $data );
        $output   = '';

        // If our image is linked, link it.
        if ( ! empty( $item['link'] ) ) {
            $output  = apply_filters( 'soliloquy_output_before_link', $output, $id, $item, $data, $i );
            if ( ! empty( $item['linktab'] ) && $item['linktab'] ) {
                $output .= '<a href="' . esc_url( $item['link'] ) . '" class="soliloquy-link" title="' . esc_attr( $item['title'] ) . '" target="_blank"' . apply_filters( 'soliloquy_output_link_attr', '', $id, $item, $data, $i ) . '>';
            } else {
                $output .= '<a href="' . esc_url( $item['link'] ) . '" class="soliloquy-link" title="' . esc_attr( $item['title'] ) . '"' . apply_filters( 'soliloquy_output_link_attr', '', $id, $item, $data, $i ) . '>';
            }
        }

        $output  = apply_filters( 'soliloquy_output_before_image', $output, $id, $item, $data, $i );
        $output .= '<img id="soliloquy-image-' . sanitize_html_class( $id ) . '" class="soliloquy-image soliloquy-image-' . $i . '" src="' . esc_url( $imagesrc ) . '" alt="' . ( isset( $item['alt'] ) ? esc_attr( $item['alt'] ) : '' ) . '"' . apply_filters( 'soliloquy_output_image_attr', '', $id, $item, $data, $i ) . ' />';
        $output  = apply_filters( 'soliloquy_output_after_image', $output, $id, $item, $data, $i );

        // If our image is linked, close the link.
        if ( ! empty( $item['link'] ) ) {
            $output .= '</a>';
        }

        $output = apply_filters( 'soliloquy_output_after_link', $output, $id, $item, $data, $i );

        // If we have a caption, output the caption.
        if ( ! empty( $item['caption'] ) ) {
            $output  = apply_filters( 'soliloquy_output_before_caption', $output, $id, $item, $data, $i );
            $output .= '<div class="soliloquy-caption"><div class="soliloquy-caption-inside">';
                $caption = apply_filters( 'soliloquy_output_caption', $item['caption'], $id, $item, $data, $i );
                $output .= $caption;
            $output .= '</div></div>';
            $output  = apply_filters( 'soliloquy_output_after_caption', $output, $id, $item, $data, $i );
        }

        // Return our inner image slide HTML.
        return apply_filters( 'soliloquy_output_image_slide', $output, $id, $item, $data, $i );

    }

    /**
     * Outputs the slider init script in the footer.
     *
     * @since 1.0.0
     */
    public function slider_init() {

        foreach ( $this->data as $id => $data ) {
            // Prevent multiple init scripts for the same slider ID.
            if ( in_array( $data['id'], $this->done ) ) {
                continue;
            }
            $this->done[] = $data['id'];

            ?>
            <script type="text/javascript"><?php ob_start(); do_action( 'soliloquy_api_start_global', $data ); ?>
                if ( typeof soliloquy_slider === 'undefined' || false === soliloquy_slider ) {
                    soliloquy_slider = {};
                }

                <?php if ( ! empty( $data['youtube'] ) ) : ?>
                if ( typeof soliloquy_youtube === 'undefined' || false === soliloquy_youtube ) {
                    soliloquy_youtube = {};
                }
                <?php endif; ?>

                <?php if ( ! empty( $data['vimeo'] ) ) : ?>
                if ( typeof soliloquy_vimeo === 'undefined' || false === soliloquy_vimeo ) {
                    soliloquy_vimeo = {};
                }
                <?php endif; ?>

                <?php if ( ! empty( $data['wistia'] ) ) : ?>
                if ( typeof soliloquy_wistia === 'undefined' || false === soliloquy_wistia ) {
                    soliloquy_wistia = {};
                }
                <?php endif; ?>

                jQuery('#soliloquy-container-<?php echo $data['id']; ?>').css('height', Math.round(jQuery('#soliloquy-container-<?php echo $data['id']; ?>').width()/(<?php echo $this->get_config( 'slider_width', $data ); ?>/<?php echo $this->get_config( 'slider_height', $data ); ?>)));

                jQuery(window).load(function(){
                    var $ = jQuery;
                    <?php do_action( 'soliloquy_api_start', $data ); ?>

                    var soliloquy_container_<?php echo $data['id']; ?> = $('#soliloquy-container-<?php echo $data['id']; ?>'),
                        soliloquy_<?php echo $data['id']; ?> = $('#soliloquy-<?php echo $data['id']; ?>');

                    soliloquy_slider['<?php echo $data['id']; ?>'] = soliloquy_<?php echo $data['id']; ?>.soliloquy({
                        <?php do_action( 'soliloquy_api_config_start', $data ); ?>
                        slideSelector: '.soliloquy-item',
                        speed: <?php echo $this->get_config( 'speed', $data ); ?>,
                        pause: <?php echo $this->get_config( 'duration', $data ); ?>,
                        auto: 1,
                        useCSS: 0,
                        keyboard: true,
                        adaptiveHeight: 1,
                        adaptiveHeightSpeed: <?php echo apply_filters( 'soliloquy_adaptive_height_speed', 400, $data ); ?>,
                        infiniteLoop: 1,
                        mode: '<?php echo $this->get_config( 'transition', $data ); ?>',
                        pager: 1,
                        controls: 1,
                        nextText: '<?php echo apply_filters( 'soliloquy_next_text', '', $data ); ?>',
                        prevText: '<?php echo apply_filters( 'soliloquy_prev_text', '', $data ); ?>',
                        startText: '<?php echo apply_filters( 'soliloquy_start_text', '', $data ); ?>',
                        stopText: '<?php echo apply_filters( 'soliloquy_stop_text', '', $data ); ?>',
                        <?php do_action( 'soliloquy_api_config_callback', $data ); ?>
                        onSliderLoad: function(currentIndex){
                            soliloquy_container_<?php echo $data['id']; ?>.find('.soliloquy-active-slide').removeClass('soliloquy-active-slide').attr('aria-hidden','true');
                            soliloquy_container_<?php echo $data['id']; ?>.css({'height':'auto','background-image':'none'});
                            if ( soliloquy_container_<?php echo $data['id']; ?>.find('.soliloquy-slider li').size() > 1 ) {
                                soliloquy_container_<?php echo $data['id']; ?>.find('.soliloquy-controls').fadeTo(300, 1);
                            }
                            soliloquy_<?php echo $data['id']; ?>.find('.soliloquy-item:not(.soliloquy-clone):eq(' + currentIndex + ')').addClass('soliloquy-active-slide').attr('aria-hidden','false');
                            // Purge all cloned items of IDs to avoid duplicate ID issues.
                            soliloquy_container_<?php echo $data['id']; ?>.find('.soliloquy-clone').find('*').removeAttr('id');

                            soliloquy_container_<?php echo $data['id']; ?>.find('.soliloquy-controls-direction').attr('aria-label','carousel buttons').attr('aria-controls', '<?php echo 'soliloquy-container-' . $data['id']; ?>');
                            soliloquy_container_<?php echo $data['id']; ?>.find('.soliloquy-controls-direction a.soliloquy-prev').attr('aria-label','previous');
                            soliloquy_container_<?php echo $data['id']; ?>.find('.soliloquy-controls-direction a.soliloquy-next').attr('aria-label','next');

                            <?php do_action( 'soliloquy_api_on_load', $data ); ?>
                        },
                        onSlideBefore: function(element, oldIndex, newIndex){
                            soliloquy_container_<?php echo $data['id']; ?>.find('.soliloquy-active-slide').removeClass('soliloquy-active-slide').attr('aria-hidden','true');
                            $(element).addClass('soliloquy-active-slide').attr('aria-hidden','false');
                            <?php do_action( 'soliloquy_api_before_transition', $data ); ?>
                        },
                        onSlideAfter: function(element, oldIndex, newIndex){
                            <?php do_action( 'soliloquy_api_after_transition', $data ); ?>
                        },
                        <?php do_action( 'soliloquy_api_config_end', $data ); ?>
                    });

                    <?php do_action( 'soliloquy_api_slider', $data ); ?>

                    <?php do_action( 'soliloquy_api_end', $data ); ?>
                });

            // Minify before outputting to improve page load time.
            <?php do_action( 'soliloquy_api_end_global', $data ); echo $this->minify( ob_get_clean() ); ?></script>
            <?php
        }

    }

    /**
     * Loads a custom slider display theme.
     *
     * @since 1.0.0
     *
     * @param string $theme The custom theme slug to load.
     */
    public function load_slider_theme( $theme ) {

        // Loop through the available themes and enqueue the one called.
        foreach ( Soliloquy_Common_Lite::get_instance()->get_slider_themes() as $array => $data ) {
            if ( $theme !== $data['value'] ) {
                continue;
            }

            wp_enqueue_style( $this->base->plugin_slug . $theme . '-theme', plugins_url( 'themes/' . $theme . '/style.css', $data['file'] ), array( $this->base->plugin_slug . '-style' ) );
            break;
        }

    }

    /**
     * Helper method for adding custom slider classes.
     *
     * @since 1.0.0
     *
     * @param array $data The slider data to use for retrieval.
     * @return string     String of space separated slider classes.
     */
    public function get_slider_classes( $data ) {

        // Set default class.
        $classes   = array();
        $classes[] = 'soliloquy-container';

        // Add custom class based on the transition.
        $classes[] = 'soliloquy-transition-' . $this->get_config( 'transition', $data );

        // If we have custom classes defined for this slider, output them now.
        foreach ( (array) $this->get_config( 'classes', $data ) as $class ) {
            $classes[] = $class;
        }

        // Allow filtering of classes and then return what's left.
        $classes = apply_filters( 'soliloquy_output_classes', $classes, $data );

        // Add custom class based on the theme.
        $classes[] = 'soliloquy-theme-' . $this->get_config( 'slider_theme', $data );

        // If the slider has RTL support, add a class for it.
        if ( $this->get_config( 'rtl', $data ) ) {
            $classes[] = 'soliloquy-rtl';
        }

        return trim( implode( ' ', array_map( 'trim', array_map( 'sanitize_html_class', array_unique( $classes ) ) ) ) );

    }

    /**
     * Helper method for adding custom slider classes.
     *
     * @since 1.0.4
     *
     * @param array $item Array of item data.
     * @param int $i      The current position in the slider.
     * @param array $data The slider data to use for retrieval.
     * @return string     String of space separated slider item classes.
     */
    public function get_slider_item_classes( $item, $i, $data ) {

        // Set default class.
        $classes   = array();
        $classes[] = 'soliloquy-item';
        $classes[] = 'soliloquy-item-' . $i;

        // Set the type of slide as a class.
        $classes[] = ! empty( $item['type'] ) ? 'soliloquy-' . $item['type'] . '-slide' : 'soliloquy-image-slide';

        // Allow filtering of classes and then return what's left.
        $classes = apply_filters( 'soliloquy_output_item_classes', $classes, $item, $i, $data );
        return trim( implode( ' ', array_map( 'trim', array_map( 'sanitize_html_class', array_unique( $classes ) ) ) ) );

    }

    /**
     * Helper method to retrieve the proper image src attribute based on slider settings.
     *
     * @since 1.0.0
     *
     * @param int $id      The image attachment ID to use.
     * @param array $item  Slider item data.
     * @param array $data  The slider data to use for retrieval.
     * @param string $type The type of cropped image to retrieve.
     * @return string      The proper image src attribute for the image.
     */
    public function get_image_src( $id, $item, $data, $type = 'slider' ) {

        // Get the full image src. If it does not return the data we need, return the image link instead.
        $src   = wp_get_attachment_image_src( $id, 'full' );
        $image = ! empty( $src[0] ) ? $src[0] : false;

        // Allow image to be filtered to use a different thumbnail than the main image.
        if ( 'thumbnails' == $type ) {
            $image = apply_filters( 'soliloquy_cropped_image', $image, $id, $item, $data, $data['id'] );
        }

        // If no image, return with the base link.
        if ( ! $image ) {
            $image = ! empty( $item['src'] ) ? $item['src'] : false;
            if ( ! $image ) {
                return apply_filters( 'soliloquy_no_image_src', $item['link'], $id, $item, $data );
            }
        }

        // Generate the cropped image if necessary.
        $type = 'thumbnails' !== $type ? apply_filters( 'soliloquy_crop_type', $type, $id, $item, $data ) : $type;
        if ( empty( $type ) ) {
            return apply_filters( 'soliloquy_no_image_type', $item['link'], $id, $item, $data );
        }

        // If the setting exists, go onward with cropping.
        if ( isset( $data['config']['slider'] ) && $data['config']['slider'] ) {
            if ( isset( $data['config'][$type] ) && $data['config'][$type] ) {
                $common = Soliloquy_Common_Lite::get_instance();
                $args   = apply_filters( 'soliloquy_crop_image_args',
                    array(
                        'position' => 'c',
                        'width'    => $this->get_config( $type . '_width', $data ),
                        'height'   => $this->get_config( $type . '_height', $data ),
                        'quality'  => 100,
                        'retina'   => false
                    )
                );
                $cropped_image = $common->resize_image( $image, $args['width'], $args['height'], true, $args['position'], $args['quality'], $args['retina'] );

                // If there is an error, possibly output error message and return the default image src.
                if ( is_wp_error( $cropped_image ) ) {
                    // If WP_DEBUG is enabled, and we're logged in, output an error to the user
                    if ( defined( 'WP_DEBUG' ) && WP_DEBUG && is_user_logged_in() ) {
                        echo '<pre>Soliloquy: Error occured resizing image (these messages are only displayed to logged in WordPress users):<br />';
                        echo 'Error: ' . $cropped_image->get_error_message() . '<br />';
                        echo 'Image: ' . $image . '<br />';
                        echo 'Args: ' . var_export( $args, true ) . '</pre>';
                    }

                    // Return the non-cropped image as a fallback.
                    return apply_filters( 'soliloquy_image_src', $image, $id, $item, $data );
                } else {
                    return apply_filters( 'soliloquy_image_src', $cropped_image, $id, $item, $data );
                }
            } else {
                return apply_filters( 'soliloquy_image_src', $image, $id, $item, $data );
            }
        } else {
            return apply_filters( 'soliloquy_image_src', $image, $id, $item, $data );
        }

    }

    /**
     * Helper method for positioning the slider.
     *
     * @since 1.0.0
     *
     * @param string $style  String of slider container styles.
     * @param array $data    Array of slider data.
     * @return string $style Amended string of slider container styles.
     */
    public function position_slider( $style, $data ) {

        $gutter   = $this->get_config( 'gutter', $data );
        $position = '';
        switch ( $this->get_config( 'position', $data ) ) {
            case 'center' :
                $position .= 'margin:0 auto ' . $gutter . 'px;';
                break;
            case 'left' :
                $position .= 'float:left;margin:0 ' . $gutter . 'px ' . $gutter . 'px 0;';
                break;
            case 'right' :
                $position .= 'float:right;margin:0 0 ' . $gutter . 'px ' . $gutter . 'px;';
                break;
        }

        $position = apply_filters( 'soliloquy_position_style', $position, $data );
        return $style . $position;

    }

    /**
     * Helper method for retrieving the mobile image src attribute.
     *
     * @since 1.0.0
     *
     * @param string $attr  String of image attributes.
     * @param int $id       The ID of the image attachment.
     * @param array $item   The array of date for the image.
     * @param array $data   Array of slider data.
     * @return string $attr Amended string of image attributes.
     */
    public function mobile_image( $attr, $id, $item, $data ) {

        $mobile_image = $this->get_image_src( $id, $item, $data, 'mobile' );
        return $attr . ' data-soliloquy-src-mobile="' . esc_url( $mobile_image ) . '"';

    }

    /**
     * Shuffles and randomizes images in a slider.
     *
     * @since 1.0.0
     *
     * @param array $data  The slider data to use for retrieval.
     * @return array $data Shuffled slider data.
     */
    public function shuffle( $data ) {

        // Return early there are no items to shuffle.
        if ( ! is_array( $data['slider'] ) ) {
            return $data;
        }

        // Prepare variables.
        $random = array();
        $keys   = array_keys( $data['slider'] );

        // Shuffle the keys and loop through them to create a new, randomized array of images.
        shuffle( $keys );
        foreach ( $keys as $key ) {
            $random[$key] = $data['slider'][$key];
        }

        // Return the randomized image array.
        $data['slider'] = $random;
        return $data;

    }

    /**
     * Helper method for retrieving config values.
     *
     * @since 1.0.0
     *
     * @param string $key The config key to retrieve.
     * @param array $data The slider data to use for retrieval.
     * @return string     Key value on success, default if not set.
     */
    public function get_config( $key, $data ) {

        $instance = Soliloquy_Common_Lite::get_instance();
        return isset( $data['config'][$key] ) ? $data['config'][$key] : $instance->get_config_default( $key );

    }

    /**
     * Helper method to minify a string of data.
     *
     * @since 1.0.4
     *
     * @param string $string  String of data to minify.
     * @return string $string Minified string of data.
     */
    public function minify( $string ) {

        $clean = preg_replace( '/((?:\/\*(?:[^*]|(?:\*+[^*\/]))*\*+\/)|(?:\/\/.*))/', '', $string );
        $clean = str_replace( array( "\r\n", "\r", "\t", "\n", '  ', '    ', '     ' ), '', $clean );
        return apply_filters( 'soliloquy_minified_string', $clean, $string );

    }

    /**
     * Outputs only the first image of the slider inside a regular <div> tag
     * to avoid styling issues with feeds.
     *
     * @since 1.0.0
     *
     * @param array $data     Array of slider data.
     * @return string $slider Custom slider output for feeds.
     */
    public function do_feed_output( $data ) {

        $slider = '<div class="soliloquy-feed-output">';
            foreach ( $data['slider'] as $id => $item ) {
                // Skip over images that are pending (ignore if in Preview mode).
                if ( isset( $item['status'] ) && 'pending' == $item['status'] && ! is_preview() ) {
                    continue;
                }

                $imagesrc = $this->get_image_src( $id, $item, $data );
                $slider  .= '<img class="soliloquy-feed-image" src="' . esc_url( $imagesrc ) . '" title="' . esc_attr( $item['title'] ) . '" alt="' . esc_attr( $item['alt'] ) . '" />';
                break;
             }
        $slider .= '</div>';

        return apply_filters( 'soliloquy_feed_output', $slider, $data );

    }

    /**
     * Returns the query args to be passed to YouTube videos.
     *
     * @since 1.0.0
     *
     * @param array $data Array of slider data.
     */
    public function get_youtube_args( $data ) {

        return apply_filters( 'soliloquy_youtube_args',
            array(
                'enablejsapi'    => 1,
                'version'        => 3,
                'wmode'          => 'transparent',
                'rel'            => 0,
                'showinfo'       => 0,
                'modestbranding' => 1,
                'autoplay'       => 1,
                'origin'         => get_home_url()
            ),
            $data
        );

    }

    /**
     * Returns the query args to be passed to Vimeo videos.
     *
     * @since 1.0.0
     *
     * @param array $data Array of slider data.
     */
    public function get_vimeo_args( $data ) {

        return apply_filters( 'soliloquy_vimeo_args',
            array(
                'api'        => 1,
                'wmode'      => 'transparent',
                'byline'     => 0,
                'title'      => 0,
                'portrait'   => 0,
                'autoplay'   => 1,
                'badge'      => 0,
                'fullscreen' => 1
            ),
            $data
        );

    }

    /**
     * Returns the query args to be passed to Wistia videos.
     *
     * @since 1.0.0
     *
     * @param array $data Array of slider data.
     */
    public function get_wistia_args( $data ) {

        return apply_filters( 'soliloquy_wistia_args',
            array(
                'version'               => 'v1',
                'wmode'                 => 'opaque',
                'volumeControl'         => 1,
                'controlsVisibleOnLoad' => 1,
                'videoFoam'             => 1
            ),
            $data
        );

    }

    /**
     * Flag for detecting a mobile device server-side.
     *
     * @since 1.0.0
     *
     * @return bool True if on a mobile device, false otherwise.
     */
    public function is_mobile() {

        // If the user agent header is not set, return false.
        if ( ! isset( $_SERVER['HTTP_USER_AGENT'] ) ) {
            return false;
        }

        // Test for a mobile browser.
        $user_agent = stripslashes( $_SERVER['HTTP_USER_AGENT'] );
        if ( preg_match( '/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i', $user_agent ) || preg_match( '/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i', substr( $user_agent, 0, 4 ) ) ) {
            return true;
        }

        // Return wp_is_mobile for the final check.
        return wp_is_mobile();

    }

    /**
     * Returns the singleton instance of the class.
     *
     * @since 1.0.0
     *
     * @return object The Soliloquy_Shortcode_Lite object.
     */
    public static function get_instance() {

        if ( ! isset( self::$instance ) && ! ( self::$instance instanceof Soliloquy_Shortcode_Lite ) ) {
            self::$instance = new Soliloquy_Shortcode_Lite();
        }

        return self::$instance;

    }

}

// Load the shortcode class.
$soliloquy_shortcode_lite = Soliloquy_Shortcode_Lite::get_instance();