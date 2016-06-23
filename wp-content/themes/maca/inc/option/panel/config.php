<?php
/**
  ReduxFramework Sample Config File
  For full documentation, please visit: https://github.com/ReduxFramework/ReduxFramework/wiki
 * */

if (!class_exists("Redux_Framework_sample_config")) {

    class Redux_Framework_sample_config {

        public $args = array();
        public $sections = array();
        public $theme;
        public $ReduxFramework;

        public function __construct() {
            // This is needed. Bah WordPress bugs.  ;)
            if ( defined('TEMPLATEPATH') && strpos( Redux_Helpers::cleanFilePath( __FILE__ ), Redux_Helpers::cleanFilePath( TEMPLATEPATH ) ) !== false) {
                $this->initSettings();
            } else {
                add_action('plugins_loaded', array($this, 'initSettings'), 10);    
            }
        }

        public function initSettings() {

            if ( !class_exists("ReduxFramework" ) ) {
                return;
            }       
            
            // Just for demo purposes. Not needed per say.
            $this->theme = wp_get_theme();

            // Set the default arguments
            $this->setArguments();

            // Set a few help tabs so you can see how it's done
            $this->setHelpTabs();

            // Create the sections and fields
            $this->setSections();

            if (!isset($this->args['opt_name'])) { // No errors please
                return;
            }

            // If Redux is running as a plugin, this will remove the demo notice and links
            //add_action( 'redux/plugin/hooks', array( $this, 'remove_demo' ) );
            // Function to test the compiler hook and demo CSS output.
            //add_filter('redux/options/'.$this->args['opt_name'].'/compiler', array( $this, 'compiler_action' ), 10, 2); 
            // Above 10 is a priority, but 2 in necessary to include the dynamically generated CSS to be sent to the function.
            // Change the arguments after they've been declared, but before the panel is created
            //add_filter('redux/options/'.$this->args['opt_name'].'/args', array( $this, 'change_arguments' ) );
            // Change the default value of a field after it's been set, but before it's been useds
            //add_filter('redux/options/'.$this->args['opt_name'].'/defaults', array( $this,'change_defaults' ) );
            // Dynamically add a section. Can be also used to modify sections/fields
            add_filter('redux/options/' . $this->args['opt_name'] . '/sections', array($this, 'dynamic_section'));

            $this->ReduxFramework = new ReduxFramework($this->sections, $this->args);
        }

        /**

          This is a test function that will let you see when the compiler hook occurs.
          It only runs if a field	set with compiler=>true is changed.

         * */
        function compiler_action($options, $css) {
            //echo "<h1>The compiler hook has run!";
            //print_r($options); //Option values
            //print_r($css); // Compiler selector CSS values  compiler => array( CSS SELECTORS )

            /*
              // Demo of how to use the dynamic CSS and write your own static CSS file
              $filename = dirname(__FILE__) . '/style' . '.css';
              global $wp_filesystem;
              if( empty( $wp_filesystem ) ) {
              require_once( ABSPATH .'/wp-admin/includes/file.php' );
              WP_Filesystem();
              }

              if( $wp_filesystem ) {
              $wp_filesystem->put_contents(
              $filename,
              $css,
              FS_CHMOD_FILE // predefined mode settings for WP files
              );
              }
             */
        }

        /**

          Custom function for filtering the sections array. Good for child themes to override or add to the sections.
          Simply include this function in the child themes functions.php file.

          NOTE: the defined constants for URLs, and directories will NOT be available at this point in a child theme,
          so you must use get_template_directory_uri() if you want to use any of the built in icons

         * */
        function dynamic_section($sections) {
            //$sections = array();
/*            $sections[] = array(
                'title' => __('Section via hook', 'akmanda-framework'),
                'desc' => __('<p class="description">This is a section created by adding a filter to the sections array. Can be used by child themes to add/remove sections from the options.</p>', 'akmanda-framework'),
                'icon' => 'el-icon-paper-clip',
                // Leave this as a blank section, no options just some intro text set above.
                'fields' => array()
            );*/

            return $sections;
        }

        /**

          Filter hook for filtering the args. Good for child themes to override or add to the args array. Can also be used in other functions.

         * */
        function change_arguments($args) {
            //$args['dev_mode'] = true;

            return $args;
        }

        /**

          Filter hook for filtering the default value of any given field. Very useful in development mode.

         * */
        function change_defaults($defaults) {
            $defaults['str_replace'] = "Testing filter hook!";

            return $defaults;
        }

        // Remove the demo link and the notice of integrated demo from the redux-framework plugin
        function remove_demo() {

            // Used to hide the demo mode link from the plugin page. Only used when Redux is a plugin.
            if (class_exists('ReduxFrameworkPlugin')) {
                remove_filter('plugin_row_meta', array(ReduxFrameworkPlugin::get_instance(), 'plugin_meta_demo_mode_link'), null, 2);
            }

            // Used to hide the activation notice informing users of the demo panel. Only used when Redux is a plugin.
            remove_action('admin_notices', array(ReduxFrameworkPlugin::get_instance(), 'admin_notices'));
        }

        public function setSections() {

            /**
              Used within different fields. Simply examples. Search for ACTUAL DECLARATION for field examples
             * */
            // Background Patterns Reader
            $sample_patterns_path = ReduxFramework::$_dir . '../sample/patterns/';
            $sample_patterns_url = ReduxFramework::$_url . '../sample/patterns/';
            $sample_patterns = array();

            if (is_dir($sample_patterns_path)) :

                if ($sample_patterns_dir = opendir($sample_patterns_path)) :
                    $sample_patterns = array();

                    while (( $sample_patterns_file = readdir($sample_patterns_dir) ) !== false) {

                        if (stristr($sample_patterns_file, '.png') !== false || stristr($sample_patterns_file, '.jpg') !== false) {
                            $name = explode(".", $sample_patterns_file);
                            $name = str_replace('.' . end($name), '', $sample_patterns_file);
                            $sample_patterns[] = array('alt' => $name, 'img' => $sample_patterns_url . $sample_patterns_file);
                        }
                    }
                endif;
            endif;

            ob_start();

            $ct = wp_get_theme();
            $this->theme = $ct;
            $item_name = $this->theme->get('Name');
            $tags = $this->theme->Tags;
            $screenshot = $this->theme->get_screenshot();
            $class = $screenshot ? 'has-screenshot' : '';

            $customize_title = sprintf(__('Customize &#8220;%s&#8221;', 'akmanda-framework'), $this->theme->display('Name'));
            ?>
            <div id="current-theme" class="<?php echo esc_attr($class); ?>">
            <?php if ($screenshot) : ?>
                <?php if (current_user_can('edit_theme_options')) : ?>
                        <a href="<?php echo wp_customize_url(); ?>" class="load-customize hide-if-no-customize" title="<?php echo esc_attr($customize_title); ?>">
                            <img src="<?php echo esc_url($screenshot); ?>" alt="<?php esc_attr_e('Current theme preview'); ?>" />
                        </a>
                <?php endif; ?>
                    <img class="hide-if-customize" src="<?php echo esc_url($screenshot); ?>" alt="<?php esc_attr_e('Current theme preview'); ?>" />
            <?php endif; ?>

                <h4>
            <?php echo $this->theme->display('Name'); ?>
                </h4>

                <div>
                    <ul class="theme-info">
                        <li><?php printf(__('By %s', 'akmanda-framework'), $this->theme->display('Author')); ?></li>
                        <li><?php printf(__('Version %s', 'akmanda-framework'), $this->theme->display('Version')); ?></li>
                        <li><?php echo '<strong>' . __('Tags', 'akmanda-framework') . ':</strong> '; ?><?php printf($this->theme->display('Tags')); ?></li>
                    </ul>
                    <p class="theme-description"><?php echo $this->theme->display('Description'); ?></p>
                <?php
                if ($this->theme->parent()) {
                    printf(' <p class="howto">' . __('This <a href="%1$s">child theme</a> requires its parent theme, %2$s.') . '</p>', __('http://codex.wordpress.org/Child_Themes', 'akmanda-framework'), $this->theme->parent()->display('Name'));
                }
                ?>

                </div>

            </div>

            <?php
            $item_info = ob_get_contents();

            ob_end_clean();

            $sampleHTML = '';
            if (file_exists(dirname(__FILE__) . '/info-html.html')) {
                /** @global WP_Filesystem_Direct $wp_filesystem  */
                global $wp_filesystem;
                if (empty($wp_filesystem)) {
                    require_once(ABSPATH . '/wp-admin/includes/file.php');
                    WP_Filesystem();
                }
                $sampleHTML = $wp_filesystem->get_contents(dirname(__FILE__) . '/info-html.html');
            }




            // ACTUAL DECLARATION OF SECTIONS

			$this->sections[] = array(
				'icon' => 'el-icon-fullscreen',
				'icon_class' => 'icon-large',
			    'title' => __('Background Options', 'akmanda-framework'),
				'fields' => array(
			        
                    array(
                        'id' => 'body-background',
                        'type' => 'background',
                        'output' => array('body'),
                        'title' => __('Body Background', 'akmanda-framework'),
                        'subtitle' => __('Body background with image, color, etc.', 'akmanda-framework'),
                        'default' => ''
                    ),	
 				
				)
			);

			$this->sections[] = array(
				'icon' => ' el-icon-credit-card',
				'icon_class' => 'icon-large',
			    'title' => __('Header Options', 'akmanda-framework'),
				'fields' => array(
			        
                    array(
                        'id' => 'logo_upload',
                        'type' => 'media',
                        'title' => __('Logo', 'akmanda-framework'), 
                        'desc' => __('Upload your logo here (any size).', 'akmanda-framework'),

                    ),  

					
				)
			);




				$this->sections[] = array(
					'icon' => 'el-icon-photo',
					'icon_class' => 'icon-large',
				    'title' => __('Footer Options', 'akmanda-framework'),
					'fields' => array(


						array(
							'id'=>'footer-text',
							'type' => 'editor',
							'title' => __('Footer Text', 'akmanda-framework'), 
							'subtitle' => __('Add Your Copyright Here', 'akmanda-framework'),
							'default' => 'Powered by Wordpress . Built by Themes Awesome .',
							)
						
						
					)
				);


			$this->sections[] = array(
				'icon' => 'el-icon-list-alt',
				'title' => __('Typography Options', 'akmanda-framework'),
				'fields' => array(



					array(
						'id'=>'body-font',
						'type' => 'typography', 
						'title' => __('Body Options', 'akmanda-framework'),
						'compiler'=>true, // Use if you want to hook in your own CSS compiler
						'google'=>true, // Disable google fonts. Won't work if you haven't defined your google api key
						'font-backup'=>true, // Select a backup non-google font in addition to a google font
						'font-style'=>true, // Includes font-style and weight. Can use font-style or font-weight to declare
						'subsets'=>false, // Only appears if google is true and subsets not set to false
						'font-size'=>false,
						'line-height'=>false,
						//'word-spacing'=>true, // Defaults to false
						//'letter-spacing'=>true, // Defaults to false
						//'color'=>false,
						//'preview'=>false, // Disable the previewer
						'output' => array('body'), // An array of CSS selectors to apply this font style to dynamically
						'units'=>'px', // Defaults to px
						'subtitle'=> __('Set website body font (leave form empty if you want to use default)', 'akmanda-framework'),
						'default'=> array(

                            'font-weight' => '400',
                            'font-family' => 'Droid Serif',
                            'google' => true,
                            //'line-height' => '40px'),

						)
					),	


					array(
						'id'=>'heading-font',
						'type' => 'typography', 
						'title' => __('Heading Typography', 'akmanda-framework'),
						//'compiler'=>true, // Use if you want to hook in your own CSS compiler
						'google'=>true, // Disable google fonts. Won't work if you haven't defined your google api key
						'font-backup'=>true, // Select a backup non-google font in addition to a google font
						'font-style'=>true, // Includes font-style and weight. Can use font-style or font-weight to declare
						'subsets'=>false, // Only appears if google is true and subsets not set to false
						'font-size'=>false,
						'line-height'=>false,
						//'word-spacing'=>true, // Defaults to false
						//'letter-spacing'=>true, // Defaults to false
						//'color'=>false,
						//'preview'=>false, // Disable the previewer
						'output' => array('h1', 'h2', 'h3','h4','h5','h6'), // An array of CSS selectors to apply this font style to dynamically
						'units'=>'px', // Defaults to px
						'subtitle'=> __('Set website heading font (leave form empty if you want to use default)', 'akmanda-framework'),
						'default'=> array(

                            'font-weight' => '700',
                            'font-family' => 'Droid Sans',
                            'google' => true,


						)
					),


					array(
						'id'=>'menu-font',
						'type' => 'typography', 
						'title' => __('Menu Typography', 'akmanda-framework'),
						//'compiler'=>true, // Use if you want to hook in your own CSS compiler
						'google'=>true, // Disable google fonts. Won't work if you haven't defined your google api key
						'font-backup'=>true, // Select a backup non-google font in addition to a google font
						'font-style'=>true, // Includes font-style and weight. Can use font-style or font-weight to declare
						'subsets'=>false, // Only appears if google is true and subsets not set to false
						'font-size'=>false,
						'line-height'=>false,
						//'word-spacing'=>true, // Defaults to false
						//'letter-spacing'=>true, // Defaults to false
						//'color'=>false,
						//'preview'=>false, // Disable the previewer
						'output' => array('nav.menu a'), // An array of CSS selectors to apply this font style to dynamically
						'units'=>'px', // Defaults to px
						'subtitle'=> __('Set website menu font (leave form empty if you want to use default)', 'akmanda-framework'),
						'default'=> array(

                            'font-weight' => '700',
                            'font-family' => 'Droid Sans',
                            'google' => true,

						)
					),
						
				)
			);


			$this->sections[] = array(
				'icon' => 'el-icon-twitter',
				'title' => __('Social Profile', 'akmanda-framework'),
				'fields' => array(

					array(
						'id'=>'facebook_profile',
						'type' => 'text',
						'title' => __('Facebook Profile', 'akmanda-framework'),
						'validate' => 'url',
						'default' => 'http://facebook.com/#'
						),
					array(
						'id'=>'twitter_profile',
						'type' => 'text',
						'title' => __('twitter Profile', 'akmanda-framework'),
						'validate' => 'url',
						'default' => 'http://twitter.com/#'
						),

					array(
						'id'=>'google_profile',
						'type' => 'text',
						'title' => __('Google+ Profile', 'akmanda-framework'),
						'validate' => 'url',
						'default' => 'http://google.com/#'
						),

					array(
						'id'=>'linkedin_profile',
						'type' => 'text',
						'title' => __('linkedin Profile', 'akmanda-framework'),
						'validate' => 'url',
						'default' => 'http://linkedin.com/#'
						),

					array(
						'id'=>'pinterest_profile',
						'type' => 'text',
						'title' => __('Pinterest Profile', 'akmanda-framework'),
						'validate' => 'url',
						'default' => 'http://pinterest.com/#'
						)

					
				)
			
			);	
            





            if (file_exists(trailingslashit(dirname(__FILE__)) . 'README.html')) {
                $tabs['docs'] = array(
                    'icon' => 'el-icon-book',
                    'title' => __('Documentation', 'akmanda-framework'),
                    'content' => nl2br(file_get_contents(trailingslashit(dirname(__FILE__)) . 'README.html'))
                );
            }
        }

        public function setHelpTabs() {

            // Custom page help tabs, displayed using the help API. Tabs are shown in order of definition.
            $this->args['help_tabs'][] = array(
                'id' => 'redux-opts-1',
                'title' => __('Theme Information 1', 'akmanda-framework'),
                'content' => __('<p>Please go to themesawesome.com to get support</p>', 'akmanda-framework')
            );

            // Set the help sidebar
            /*$this->args['help_sidebar'] = __('<p>This is the sidebar content, HTML is allowed.</p>', 'akmanda-framework');*/
        }

        /**

          All the possible arguments for Redux.
          For full documentation on arguments, please refer to: https://github.com/ReduxFramework/ReduxFramework/wiki/Arguments

         * */
        public function setArguments() {

            $theme = wp_get_theme(); // For use with some settings. Not necessary.

            $this->args = array(
                // TYPICAL -> Change these values as you need/desire
                'opt_name' => 'akmanda_framework', // This is where your data is stored in the database and also becomes your global variable name.
                'display_name' => $theme->get('Name'), // Name that appears at the top of your panel
                'display_version' => $theme->get('Version'), // Version that appears at the top of your panel
                'menu_type' => 'menu', //Specify if the admin menu should appear or not. Options: menu or submenu (Under appearance only)
                'allow_sub_menu' => true, // Show the sections below the admin menu item or not
                'menu_title' => __('Options', 'akmanda-framework'),
                'page' => __('Options', 'akmanda-framework'),
                // You will need to generate a Google API key to use this feature.
                // Please visit: https://developers.google.com/fonts/docs/developer_api#Auth
                'google_api_key' => 'AIzaSyAX_2L_UzCDPEnAHTG7zhESRVpMPS4ssII', // Must be defined to add google fonts to the typography module
                //'admin_bar' => false, // Show the panel pages on the admin bar
                'global_variable' => '', // Set a different name for your global variable other than the opt_name
                'dev_mode' => false, // Show the time the page took to load, etc
                'customizer' => true, // Enable basic customizer support
                // OPTIONAL -> Give you extra features
                'page_priority' => null, // Order where the menu appears in the admin area. If there is any conflict, something will not show. Warning.
                'page_parent' => 'themes.php', // For a full list of options, visit: http://codex.wordpress.org/Function_Reference/add_submenu_page#Parameters
                'page_permissions' => 'manage_options', // Permissions needed to access the options panel.
                'menu_icon' => '', // Specify a custom URL to an icon
                'last_tab' => '', // Force your panel to always open to a specific tab (by id)
                'page_icon' => 'icon-themes', // Icon displayed in the admin panel next to your menu_title
                'page_slug' => '_options', // Page slug used to denote the panel
                'save_defaults' => true, // On load save the defaults to DB before user clicks save or not
                'default_show' => true, // If true, shows the default value next to each field that is not the default value.
                'default_mark' => '', // What to print by the field's title if the value shown is default. Suggested: *
                // CAREFUL -> These options are for advanced use only
                'transient_time' => 60 * MINUTE_IN_SECONDS,
                'output' => true, // Global shut-off for dynamic CSS output by the framework. Will also disable google fonts output
                'output_tag' => true, // Allows dynamic CSS to be generated for customizer and google fonts, but stops the dynamic CSS from going to the head
                //'domain'             	=> 'redux-framework', // Translation domain key. Don't change this unless you want to retranslate all of Redux.
                //'footer_credit'      	=> '', // Disable the footer credit of Redux. Please leave if you can help it.
                // FUTURE -> Not in use yet, but reserved or partially implemented. Use at your own risk.
                'database' => '', // possible: options, theme_mods, theme_mods_expanded, transient. Not fully functional, warning!
                'show_import_export' => true, // REMOVE
                'system_info' => false, // REMOVE
                'help_tabs' => array(),
                'help_sidebar' => '', // __( '', $this->args['domain'] );            
            );


            // SOCIAL ICONS -> Setup custom links in the footer for quick links in your panel footer icons.		
            $this->args['share_icons'][] = array(
                'url' => 'http://www.themesawesome.com/',
                'title' => 'Our Site',
                //'icon' => 'el-icon-github'
                'img' => 'http://www.themesawesome.com/img/ta-option.jpg', // You can use icon OR img. IMG needs to be a full URL.
            );

            $this->args['share_icons'][] = array(
                'url' => 'https://www.facebook.com/themesawesome',
                'title' => 'Like us on Facebook',
                'icon' => 'el-icon-facebook'
            );
            $this->args['share_icons'][] = array(
                'url' => 'http://twitter.com/themesawesome',
                'title' => 'Follow us on Twitter',
                'icon' => 'el-icon-twitter'
            );
            $this->args['share_icons'][] = array(
                'url' => 'http://www.youtube.com/themesawesome',
                'title' => 'Find us on Youtube',
                'icon' => 'el-icon-youtube'
            );




            // Panel Intro text -> before the form
/*            if (!isset($this->args['global_variable']) || $this->args['global_variable'] !== false) {
                if (!empty($this->args['global_variable'])) {
                    $v = $this->args['global_variable'];
                } else {
                    $v = str_replace("-", "_", $this->args['opt_name']);
                }
                $this->args['intro_text'] = sprintf(__('<p>Did you know that Redux sets a global variable for you? To access any of your saved options from within your code you can use your global variable: <strong>$%1$s</strong></p>', 'akmanda-framework'), $v);
            } else {
                $this->args['intro_text'] = __('<p>This text is displayed above the options panel. It isn\'t required, but more info is always better! The intro_text field accepts all HTML.</p>', 'akmanda-framework');
            }*/

            // Add content after the form.
            //$this->args['footer_text'] = __('<p>This text is displayed below the options panel. It isn\'t required, but more info is always better! The footer_text field accepts all HTML.</p>', 'akmanda-framework');
        }

    }

    new Redux_Framework_sample_config();
}


/**

  Custom function for the callback referenced above

 */
if (!function_exists('redux_my_custom_field')):

    function redux_my_custom_field($field, $value) {
        print_r($field);
        print_r($value);
    }

endif;

/**

  Custom function for the callback validation referenced above

 * */
if (!function_exists('redux_validate_callback_function')):

    function redux_validate_callback_function($field, $value, $existing_value) {
        $error = false;
        $value = 'just testing';
        /*
          do your validation

          if(something) {
          $value = $value;
          } elseif(something else) {
          $error = true;
          $value = $existing_value;
          $field['msg'] = 'your custom error message';
          }
         */

        $return['value'] = $value;
        if ($error == true) {
            $return['error'] = $field;
        }
        return $return;
    }


endif;

function akmanda_css() {


$output = '';

	$options = get_option('akmanda_framework');


        

    
    //****************************************************//

	$custom_css = $options['css-code'];
	$on_css_code = $options['switch-on-css'];
		if($custom_css && $on_css_code === 1 ) {
			$output .= $custom_css;
		}
	

        if ( $output != '' ) {
            $output = "\n<style>\n" . $output . "</style>\n";
            echo $output;
        }

    	

}

add_action('wp_head', 'akmanda_css');


function akmanda_js() {

$output = '';

	$options = get_option('akmanda_framework');

	$js_code = $options['js-code'];
	$on_js_code = $options['switch-on-js'];

		if($js_code && $on_js_code === 1 ){
			$output .= $js_code;
		}


        if ( $output != '' ) {
            $output = "\n<script type='text/javascript'>\n" . $output . "</script>\n";
            echo $output;
        }
}

add_action('wp_footer', 'akmanda_js');

function akmanda_footer_copyright() {


	$options = get_option('akmanda_framework');
	$copyright_footer = $options['footer-text'];

		
			echo $copyright_footer;
}
