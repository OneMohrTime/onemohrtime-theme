<?php
/**
 * Settings class.
 *
 * @since 1.0.0
 *
 * @package Soliloquy_Lite
 * @author  Thomas Griffin
 */
class Soliloquy_Settings_Lite {

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
     * Holds the submenu pagehook.
     *
     * @since 1.0.0
     *
     * @var string
     */
    public $hook;

    /**
     * Primary class constructor.
     *
     * @since 1.0.0
     */
    public function __construct() {

        // Load the base class object.
        $this->base = Soliloquy_Lite::get_instance();

        // Add custom settings submenu.
        add_action( 'admin_menu', array( $this, 'admin_menu' ) );

        // Add callbacks for settings tabs.
        add_action( 'soliloquy_tab_settings_upgrade', array( $this, 'settings_upgrade_tab' ) );

    }

    /**
     * Register the Settings submenu item for Soliloquy.
     *
     * @since 1.0.0
     */
    public function admin_menu() {

        // If the option exists for upgrading, do nothing.
        $upgrade = get_option( 'soliloquy_upgrade' );
        if ( $upgrade ) {
            return;
        }

        // If the option exists for already checking for sliders from previous versions, bail.
        $has_sliders = get_option( 'soliloquy_lite_upgrade' );
        if ( $has_sliders ) {
            return;
        }

        // If we have no sliders, only run this check once. Set option to prevent again.
        $sliders = get_posts( array( 'post_type' => 'soliloquy', 'posts_per_page' => -1 ) );
        if ( ! $sliders ) {
            update_option( 'soliloquy_lite_upgrade', true );
            return;
        }

        // Register the submenu.
        $this->hook = add_submenu_page(
            'edit.php?post_type=soliloquy',
            __( 'Soliloquy Settings', 'soliloquy' ),
            __( 'Settings', 'soliloquy' ),
            apply_filters( 'soliloquy_menu_cap', 'manage_options' ),
            $this->base->plugin_slug . '-settings',
            array( $this, 'settings_page' )
        );

        // If successful, load admin assets only on that page and check for addons refresh.
        if ( $this->hook ) {
            add_action( 'load-' . $this->hook, array( $this, 'settings_page_assets' ) );
        }

    }

    /**
     * Loads assets for the settings page.
     *
     * @since 1.0.0
     */
    public function settings_page_assets() {

        add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_admin_styles' ) );
        add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_admin_scripts' ) );

    }

    /**
     * Register and enqueue settings page specific CSS.
     *
     * @since 1.0.0
     */
    public function enqueue_admin_styles() {

        wp_register_style( $this->base->plugin_slug . '-settings-style', plugins_url( 'assets/css/settings.css', $this->base->file ), array(), $this->base->version );
        wp_enqueue_style( $this->base->plugin_slug . '-settings-style' );

        // Run a hook to load in custom styles.
        do_action( 'soliloquy_settings_styles' );

    }

    /**
     * Register and enqueue settings page specific JS.
     *
     * @since 1.0.0
     */
    public function enqueue_admin_scripts() {

        wp_register_script( $this->base->plugin_slug . '-settings-script', plugins_url( 'assets/js/settings.js', $this->base->file ), array( 'jquery' ), $this->base->version, true );
        wp_enqueue_script( $this->base->plugin_slug . '-settings-script' );
        wp_localize_script(
            $this->base->plugin_slug . '-settings-script',
            'soliloquy_settings',
            array(
                'ajax'          => admin_url( 'admin-ajax.php' ),
                'redirect'      => esc_url( add_query_arg( array( 'post_type' => 'soliloquy', 'soliloquy-upgraded' => true ), admin_url( 'edit.php' ) ) ),
                'upgrade_nonce' => wp_create_nonce( 'soliloquy-upgrade' )
            )
        );

        // Run a hook to load in custom scripts.
        do_action( 'soliloquy_settings_scripts' );

    }

    /**
     * Callback to output the Soliloquy settings page.
     *
     * @since 1.0.0
     */
    public function settings_page() {

        ?>
        <div id="soliloquy-settings" class="wrap">
            <h2><?php echo esc_html( get_admin_page_title() ); ?></h2>
            <div class="soliloquy soliloquy-clear">
                <div id="soliloquy-tabs" class="soliloquy-clear">
                    <h2 id="soliloquy-tabs-nav" class="soliloquy-clear nav-tab-wrapper">
                    <?php $i = 0; foreach ( (array) $this->get_soliloquy_settings_tab_nav() as $id => $title ) : $class = 0 === $i ? 'soliloquy-active nav-tab-active' : ''; ?>
                        <a class="nav-tab <?php echo $class; ?>" href="#soliloquy-tab-<?php echo $id; ?>" title="<?php echo $title; ?>"><?php echo $title; ?></a>
                    <?php $i++; endforeach; ?>
                    </h2>
                    <?php $i = 0; foreach ( (array) $this->get_soliloquy_settings_tab_nav() as $id => $title ) : $class = 0 === $i ? 'soliloquy-active' : ''; ?>
                    <div id="soliloquy-tab-<?php echo $id; ?>" class="soliloquy-tab soliloquy-clear <?php echo $class; ?>">
                        <?php do_action( 'soliloquy_tab_settings_' . $id ); ?>
                    </div>
                    <?php $i++; endforeach; ?>
                </div>
            </div>
        </div>
        <?php

    }

    /**
     * Callback for getting all of the settings tabs for Soliloquy.
     *
     * @since 1.0.0
     *
     * @return array Array of tab information.
     */
    public function get_soliloquy_settings_tab_nav() {

        $tabs = array(
            'upgrade' => __( 'Upgrade', 'soliloquy' ) // This tab is required. DO NOT REMOVE VIA FILTERING.
        );
        $tabs = apply_filters( 'soliloquy_settings_tab_nav', $tabs );

        return $tabs;

    }

    /**
     * Callback for displaying the UI for upgrade settings tab.
     *
     * @since 1.0.0
     */
    public function settings_upgrade_tab() {

        ?>
        <div id="soliloquy-settings-upgrade">
            <p><strong><?php _e( 'You have upgraded to v2 of Soliloquy. You need to upgrade your sliders using our custom upgrading tool. Click on the button below to start the process.', 'soliloquy' ); ?></strong></p>
            <p><a class="button button-primary soliloquy-start-upgrade" href="#" title="<?php esc_attr_e( 'Click Here to Start the Upgrade Process', 'soliloquy' ); ?>"><?php _e( 'Click Here to Start the Upgrade Process', 'soliloquy' ); ?></a> <span class="spinner soliloquy-spinner"></span></p>
        </div>
        <?php

    }

    /**
     * Returns the singleton instance of the class.
     *
     * @since 1.0.0
     *
     * @return object The Soliloquy_Settings_Lite object.
     */
    public static function get_instance() {

        if ( ! isset( self::$instance ) && ! ( self::$instance instanceof Soliloquy_Settings_Lite ) ) {
            self::$instance = new Soliloquy_Settings_Lite();
        }

        return self::$instance;

    }

}

// Load the settings class.
$soliloquy_settings_lite = Soliloquy_Settings_Lite::get_instance();