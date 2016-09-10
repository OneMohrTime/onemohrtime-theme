<?php 
/*
Plugin Name: Instagram Feed WD
Plugin URI: https://web-dorado.com/products/wordpress-instagram-feed-wd.html
Description: WD Instagram Feed is a user-friendly tool for displaying user or hashtag-based feeds on your website. You can create feeds with one of the available layouts. It allows displaying image metadata, open up images in lightbox, download them and even share in social networking websites.
Version: 1.1.9
Author: WebDorado
Author URI: https://web-dorado.com
License: GPLv2 or later
*/

//define constants
define('WDI_DIR', WP_PLUGIN_DIR . "/" . plugin_basename(dirname(__FILE__)));
define('WDI_URL', plugins_url(plugin_basename(dirname(__FILE__))));
define("WDI_VAR", "wdi_instagram");
define("WDI_OPT",WDI_VAR.'_options');
define("WDI_FSN",'wdi_feed_settings');
define("WDI_TSN",'wdi_theme_settings');
define("WDI_META", "_".WDI_VAR."_meta");
//define("wdi",'wdi');
define('WDI_FEED_TABLE','wdi_feeds');
define('WDI_THEME_TABLE','wdi_themes');
define('WDI_VERSION','1.1.9');
define('WDI_IS_PRO','false');


function wdi_use_home_url() {
  $home_url = str_replace("http://", "", home_url());
  $home_url = str_replace("https://", "", $home_url);
  $pos = strpos($home_url, "/");
  if ($pos) {
    $home_url = substr($home_url, 0, $pos);
  } 
  $site_url = str_replace("http://", "", WDI_URL);
  $site_url = str_replace("https://", "", $site_url);
  $pos = strpos($site_url, "/");
  if ($pos) {
    $site_url = substr($site_url, 0, $pos);
  }
  return $site_url != $home_url;
}

if (wdi_use_home_url()) {
  define('WDI_FRONT_URL', home_url("wp-content/plugins/" . plugin_basename(dirname(__FILE__))));
}
else {
  define('WDI_FRONT_URL', WDI_URL);
}
//////////////////////////////////////////////////////////////////




add_action('wp_ajax_WDIGalleryBox', 'wdi_ajax_frontend');
add_action('wp_ajax_nopriv_WDIGalleryBox', 'wdi_ajax_frontend');
function wdi_ajax_frontend() {


  require_once(WDI_DIR . '/framework/WDILibrary.php');
  $page = WDILibrary::get('action');
  //chenged action hook for esacpeing Photo Gallery confilct
  if($page==='WDIGalleryBox'){$page = 'GalleryBox';}
  if (($page != '') && (($page == 'GalleryBox') || ($page == 'Share'))) {
    require_once(WDI_DIR . '/frontend/controllers/WDIController' . ucfirst($page) . '.php');
    $controller_class = 'WDIController' . ucfirst($page);
    $controller = new $controller_class();
    $controller->execute();
  }else{
    wp_die();
  }
}



///////////////////////////////End GALLERY BOX////////////////////////////////////////



//including admin functions
require_once(WDI_DIR .'/admin-functions.php');
//including shortcode file
require_once(WDI_DIR .'/frontend/shortcode.php');

//installing plugin database
register_activation_hook( __FILE__, 'wdi_instagram_activate' );
function wdi_instagram_activate($networkwide) {
  if (function_exists('is_multisite') && is_multisite()) {
    // Check if it is a network activation - if so, run the activation function for each blog id.
    if ($networkwide) {
      global $wpdb;
      $old_blog = $wpdb->blogid;
      // Get all blog ids.
      $blogids = $wpdb->get_col("SELECT blog_id FROM $wpdb->blogs");
      foreach ($blogids as $blog_id) {
        switch_to_blog($blog_id);
        wdi_install();
      }
      switch_to_blog($old_blog);
      return;
    }
  }
 // wdi_activate();

  wdi_install();
}


 




add_action("admin_init",'wdi_register_settings');

function wdi_register_settings(){

  //gettings settings for registering
  $settings = wdi_get_settings();

  //adding configure section
  add_settings_section('wdi_configure_section',__('Configure', "wdi"),'wdi_configure_section_callback','settings_wdi');

  //adding customize section
  add_settings_section('wdi_customize_section',__('Customize', "wdi"),'wdi_customize_section_callback','settings_wdi');

  //adding settings fileds form getted settings
  foreach($settings as $setting_name => $setting){
    if(isset($setting['field_or_not'])==true && $setting['field_or_not']!='no_field'){
        add_settings_field(
        $setting_name,
        $setting['title'],
        'wdi_field_callback',
        'settings_wdi',
        $setting['section'],
        array($setting)
        );
    }
  }

  //registering all settings
  register_setting( 'wdi_all_settings', 'wdi_instagram_options','wdi_sanitize_options');

  wdi_get_options(); 
}


//adding menues
add_action('admin_menu', 'WDI_instagram_menu');
add_action('admin_head-toplevel_page_wdi_feeds', 'wdi_check_necessary_params');
function WDI_instagram_menu() {
   $menu_icon = WDI_URL .'/images/menu_icon.png';
   global $wdi_options;
   $min_feeds_capability = isset($wdi_options['wdi_feeds_min_capability']) ? $wdi_options['wdi_feeds_min_capability'] : "manage_options";
   $min_feeds_capability = $min_feeds_capability == 'publish_posts' ? 'publish_posts' :  "manage_options";

   $settings_page = add_menu_page(__('Instagram Feed WD',"wdi"), __('Instagram Feed WD',"wdi"),$min_feeds_capability,'wdi_feeds','WDI_instagram_feeds_page',$menu_icon);
   add_submenu_page('wdi_feeds',__('Feeds',"wdi"),__('Feeds',"wdi"),$min_feeds_capability,'wdi_feeds','WDI_instagram_feeds_page');
   add_submenu_page('wdi_feeds',__('Themes',"wdi"),__('Themes',"wdi"),$min_feeds_capability,'wdi_themes','WDI_instagram_themes_page');
   add_submenu_page('wdi_feeds',__('Settings',"wdi"),__('Settings',"wdi"),'manage_options','wdi_settings','WDI_instagram_settings_page');
   add_submenu_page('wdi_feeds',__('Featured Themes',"wdi"),__('Featured Themes',"wdi"),$min_feeds_capability,'wdi_featured_themes','wdi_featured_themes');
   add_submenu_page('wdi_feeds',__('Buy Pro',"wdi"),__('Buy Pro',"wdi"),$min_feeds_capability,'wdi_licensing','WDI_instagram_licensing_page');

}


add_action('admin_menu', 'WDI_add_uninstall',26);
function WDI_add_uninstall(){
  add_submenu_page('wdi_feeds',__('Uninstall',"wdi"),__('Uninstall',"wdi"),'manage_options','wdi_uninstall','WDI_instagram_uninstall_page');
}

//Settings page callback
function WDI_instagram_settings_page(){

 
  //check if user has already unistalled plugin from settings
  wdi_check_uninstalled();
  require_once(WDI_DIR . '/framework/WDILibrary.php');
	$controller_class = "WDIControllerSettings_wdi";
  require_once(WDI_DIR . '/admin/controllers/' . $controller_class . '.php');
  $controller = new $controller_class();
  $controller->execute();
  
}
function WDI_instagram_feeds_page(){
  //check if user has already unistalled plugin from settings
  wdi_check_uninstalled();
  require_once(WDI_DIR . '/framework/WDILibrary.php');
  $controller_class = 'WDIControllerFeeds_wdi';
  require_once(WDI_DIR . '/admin/controllers/' . $controller_class . '.php');
  $controller = new $controller_class();
  $controller->execute();
}

function WDI_instagram_themes_page(){
  wdi_check_uninstalled();
  require_once(WDI_DIR . '/framework/WDILibrary.php');
  $controller_class = 'WDIControllerThemes_wdi';
  require_once(WDI_DIR . '/admin/controllers/' . $controller_class . '.php');
  $controller = new $controller_class();
  $controller->execute();
}
function WDI_instagram_licensing_page(){
  $controller_class = 'WDIControllerLicensing_wdi';
  require_once(WDI_DIR . '/admin/controllers/' . $controller_class . '.php');
  $controller = new $controller_class();
  $controller->execute();
}

function wdi_featured_themes(){
  require_once(WDI_DIR . '/WDIFeaturedThemes.php');
  $controller = new WDIFeaturedThemes();
  $controller->display();
}

function WDI_instagram_uninstall_page(){

  require_once(WDI_DIR . '/framework/WDILibrary.php');
  $controller_class = 'WDIControllerUninstall_wdi';
  require_once(WDI_DIR . '/admin/controllers/' . $controller_class . '.php');
  $controller = new $controller_class();
  $controller->execute();
}

//loading admin scripts
add_action('admin_enqueue_scripts','wdi_load_scripts');

function wdi_load_scripts(){
  require_once(WDI_DIR . '/framework/WDILibrary.php');
  global $wdi_options;
  $page = WDILibrary::get('page');
  if($page === 'wdi_themes' || $page === 'wdi_feeds' || $page === 'wdi_settings' || $page==='wdi_uninstall'){
    wp_enqueue_script('jquery-color');
    wp_enqueue_script('wp-color-picker');
    wp_enqueue_style('wp-color-picker');
    wp_enqueue_script('wdi_admin',plugins_url('js/wdi_admin.js', __FILE__),array("jquery",'wdi_instagram'), WDI_VERSION );

    $uninstall_url  = wp_nonce_url( admin_url( 'admin-ajax.php' ), 'wdiUninstallPlugin', 'uninstall_nonce' );
    
    wp_enqueue_script('wdi_instagram',plugins_url('js/wdi_instagram.js', __FILE__),array("jquery"), WDI_VERSION );


    wp_localize_script("wdi_admin", 'wdi_ajax',array( 'ajax_url' => admin_url( 'admin-ajax.php' ), 
                                                      'uninstall_url' => $uninstall_url,
                                                      'is_pro' => WDI_IS_PRO
                                                      ));
    wp_localize_script("wdi_admin", 'wdi_version',array('is_pro'=>WDI_IS_PRO));

    wp_localize_script("wdi_admin", 'wdi_messages',array( 
                                                    'uninstall_confirm' => __( "All the data will be removed from the database. Continue?", "wdi" ),
                                                    'instagram_server_error' => __('Some error with instagram servers, try agian later :(', "wdi" ), 
                                                    'invalid_user' => __('Invalid user:', "wdi" ),
                                                    'already_added' =>  __('already added!', "wdi"),
                                                    'user_not_exist' => __('User does not exist.', "wdi"),
                                                    'network_error' => __("Network Error, please try again later. :(", "wdi"),
                                                    'invalid_hashtag' => __('Invalid hashtag', "wdi"),
                                                    'hashtag_no_data' => __('This hashtag currently has no posts. Are you sure you want to add it?','wdi'),
                                                    'only_one_user_or_hashtag'=> __('You can add only one username or hashtag in FREE Version', "wdi"),
                                                    'available_in_pro' => __('Available in PRO','wdi'),
                                                    'username_hashtag_multiple' => __('Combined Usernames/Hashtags are available only in PRO version'),
                                                    'theme_save_message_free' => __('Customizing Themes is available only in PRO version','wdi'),
                                                    'invalid_url' => __('URL is not valid','wdi'),
                                                    'selectConditionType' => __('Please Select Condition Type','wdi'), 
                                                    'and_descr' => __('Show Posts Which Have All Of The Conditions','wdi'),
                                                    'or_descr' => __('Show Posts Which Have At Least One Of The Conditions','wdi'),
                                                    'nor_descr' => __('Hide Posts Which Have At Least One Of The Conditions','wdi'),
                                                    'either' => __('EITHER','wdi'),
                                                    'neither' => __('NEITHER','wdi'),
                                                    'not' => __('EXCEPT','wdi'),
                                                    'and' => __('AND','wdi'),
                                                    'or' => __('OR','wdi'),
                                                    'nor' => __('NOR','wdi')
                                                    ));
    wp_localize_script("wdi_admin", 'wdi_url',array('plugin_url'=>plugin_dir_url(__FILE__)));
    wp_localize_script("wdi_admin", 'wdi_admin',array('admin_url' =>get_admin_url()));
  }


}

//loading admin styles
add_action('admin_enqueue_scripts', 'wdi_load_styles');

function wdi_load_styles() {
  require_once(WDI_DIR . '/framework/WDILibrary.php');
  $page = WDILibrary::get('page');
  if($page === 'wdi_themes' || $page === 'wdi_feeds' || $page === 'wdi_settings' || $page==='wdi_uninstall'){
    wp_enqueue_style('wdi_backend', plugins_url('css/wdi_backend.css', __FILE__), array(), WDI_VERSION);
    wp_enqueue_style('wdi_tables', plugins_url('css/wdi_tables.css', __FILE__), array(), WDI_VERSION);
    wp_enqueue_style('wdi_admin_notices', plugins_url('css/notices.css', __FILE__), array(), WDI_VERSION);
  }
  if($page === 'wdi_licensing'){
    wp_enqueue_style('wdi_licensing', plugins_url('css/wdi_licensing.css', __FILE__), array(), WDI_VERSION);
  }
  
}



// Instagram WDI Widget.
if (class_exists('WP_Widget')) {
  require_once(WDI_DIR . '/admin/controllers/WDIControllerWidget.php');
  add_action('widgets_init', create_function('', 'return register_widget("WDIControllerWidget");'));
}


//Editor shortcode button
add_filter('media_buttons_context', 'wdi_add_editor_button');

function wdi_add_editor_button($context) {
  global $pagenow;
  if (in_array($pagenow, array('post.php', 'page.php', 'post-new.php', 'post-edit.php'))) {
    $context .= '
      <a onclick="tb_click.call(this);wdi_thickDims();return false;" href="' . add_query_arg(array('action' => 'WDIEditorShortcode','TB_iframe'=>'1'), admin_url('admin-ajax.php')) . '" class="wdi_thickbox button" style="padding-left: 0.4em;" title="Add Instagram Feed">
        <span class="wp-media-buttons-icon wdi_media_button_icon" style="vertical-align: text-bottom; background: url(' . WDI_URL . '/images/menu_icon.png) no-repeat scroll left top rgba(0, 0, 0, 0);background-size:contain;"></span>
        Add Instagram Feed
      </a>';
  }
  return $context;
}



//Editor button ajax handler
add_action("wp_ajax_WDIEditorShortcode",'wdi_editor_button');

function wdi_editor_button(){
  if (function_exists('current_user_can')) {
    if (!current_user_can('publish_posts')) {
      die('Access Denied');
    }
  }
  else {
    die('Access Denied');
  }
  require_once(WDI_DIR . '/framework/WDILibrary.php');
  $page = WDILibrary::get('action');
  if ($page != '' && (($page == 'WDIEditorShortcode'))) {
    require_once(WDI_DIR . '/admin/controllers/WDIControllerEditorShortcode.php');
    $controller_class = 'WDIControllerEditorShortcode';
    $controller = new $controller_class();
    $controller->execute();
  }
  wp_die();
}

/**
*  handle editor popup
*/
add_action('admin_head', 'wdi_admin_ajax');

function wdi_admin_ajax() {
  global $pagenow;
  if (in_array($pagenow, array('post.php', 'page.php', 'post-new.php', 'post-edit.php'))) {

    ?>
    <script>

      var wdi_thickDims, wdi_tbWidth, wdi_tbHeight;
      wdi_tbWidth = 400;
      wdi_tbHeight = 140;
      wdi_thickDims = function() {
        var tbWindow = jQuery('#TB_window'), H = jQuery(window).height(), W = jQuery(window).width(), w, h;
        w = (wdi_tbWidth && wdi_tbWidth < W - 90) ? wdi_tbWidth : W - 40;
        h = (wdi_tbHeight && wdi_tbHeight < H - 60) ? wdi_tbHeight : H - 40;
        if (tbWindow.size()) {
          tbWindow.width(w).height(h);
          jQuery('#TB_iframeContent').width(w).height(h - 27);
          tbWindow.css({'margin-left': '-' + parseInt((w / 2),10) + 'px'});
          if (typeof document.body.style.maxWidth != 'undefined') {
            tbWindow.css({'top':(H-h)/2,'margin-top':'0'});
          }
        }
      };
    </script>
    <?php
  }
}








if (is_admin() && (!defined('DOING_AJAX') || !DOING_AJAX)) {
  include_once(WDI_DIR . '/instagram-wdi-notices.php');
  new WDI_Notices();
}



add_action( 'init', 'wdi_load_textdomain' );
/**
 * Load plugin textdomain.
 *
 */
function wdi_load_textdomain() {
  load_plugin_textdomain( "wdi", false, dirname( plugin_basename( __FILE__ ) ) . '/languages' ); 
  
}

