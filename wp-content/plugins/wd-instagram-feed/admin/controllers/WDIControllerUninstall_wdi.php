<?php

class WDIControllerUninstall_wdi{
////////////////////////////////////////////////////////////////////////////////////////
// Constructor & Destructor                                                           //
////////////////////////////////////////////////////////////////////////////////////////
	function __construct(){

	}
 ////////////////////////////////////////////////////////////////////////////////////////
 // Public Methods                                                                     //
 ////////////////////////////////////////////////////////////////////////////////////////
  public function execute() {
    $task = WDILibrary::get('task');
      if (method_exists($this, $task)) {
        check_admin_referer('nonce_wd', 'nonce_wd');
        $this->$task();
      }
      else {
        if($this->is_uninstalled()){
          $this->already_uninstalled();
        }else{
          $this->display();
        }
        
      }
  }
  public function display(){
  	require_once(WDI_DIR . '/admin/models/WDIModelUninstall_wdi.php');
  	$model = new WDIModelUninstall_wdi();
  	
  	require_once(WDI_DIR . '/admin/views/WDIViewUninstall_wdi.php');
  	$view = new WDIViewUninstall_wdi($model);
  	$view->display();
  }	

  public function already_uninstalled(){
    require_once(WDI_DIR . '/admin/models/WDIModelUninstall_wdi.php');
    $model = new WDIModelUninstall_wdi();
    
    require_once(WDI_DIR . '/admin/views/WDIViewUninstall_wdi.php');
    $view = new WDIViewUninstall_wdi($model);
    $view->already_uninstalled();
  }


  
  public function succesfully_uninstalled(){
    require_once(WDI_DIR . '/admin/models/WDIModelUninstall_wdi.php');
    $model = new WDIModelUninstall_wdi();
    
    require_once(WDI_DIR . '/admin/views/WDIViewUninstall_wdi.php');
    $view = new WDIViewUninstall_wdi($model);
    $view->successfully_uninstalled();
  }

  private function uninstall(){
      $verify = isset($_POST['wdi_verify'])? $_POST['wdi_verify'] : 0;
        if(!$this->is_uninstalled()){
          if($verify == '1'){
             global $wpdb;
          $removed = false;
          $table_name = $wpdb->prefix.WDI_FEED_TABLE;
          $checktable = $wpdb->query("SHOW TABLES LIKE '$table_name'");
          $table_exists = $checktable > 0;
          if($table_exists){
            $sql = "DROP TABLE ". $table_name;
            $wpdb->query($sql);
            $removed = true;
          }
          $table_name = $wpdb->prefix.WDI_THEME_TABLE;
          $checktable = $wpdb->query("SHOW TABLES LIKE '$table_name'");
          $table_exists = $checktable > 0;
          if($table_exists){
            $sql = "DROP TABLE ". $table_name;
            $wpdb->query($sql);
            $removed = true;
          }
          if($removed == true) {
            $this->succesfully_uninstalled();
          }
          else{
            $this->already_uninstalled();
          };

          delete_option(WDI_OPT);
         
          $default_option=array();
          $default_option['wdi_plugin_uninstalled'] = 'true';

          add_option(WDI_OPT,$default_option);
          delete_option('wdi_version');
          }else{
            $this->display();
          }
      }else{
            $this->already_uninstalled();
      }
  }

  private function is_uninstalled(){
      global $wdi_options;
      if(isset($wdi_options['wdi_plugin_uninstalled']) && $wdi_options['wdi_plugin_uninstalled']=='true') {
       return true;
      }else{
        return false;
      };
  }
}