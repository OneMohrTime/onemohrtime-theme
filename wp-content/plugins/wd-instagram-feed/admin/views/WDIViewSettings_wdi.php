<?php
class WDIViewSettings_wdi{
////////////////////////////////////////////////////////////////////////////////////////
// Variables                                                                          //
////////////////////////////////////////////////////////////////////////////////////////
private $model;
////////////////////////////////////////////////////////////////////////////////////////
// Constructor and Destructor                                                         //
////////////////////////////////////////////////////////////////////////////////////////
	public function __construct($model){
		$this->model = $model;
	}
////////////////////////////////////////////////////////////////////////////////////////
// Public Methods                                                                     //
////////////////////////////////////////////////////////////////////////////////////////
	public function display(){
		require_once(WDI_DIR . '/framework/WDI_admin_view.php');
		if(isset($_GET['access_token'])) {

			/*dismiss api update notice*/
			$admin_notices_option = get_option('wdi_admin_notice', array());
			$admin_notices_option['api_update_token_reset'] = array(
					'start' => current_time("n/j/Y"),
					'int'   => 0,
					'dismissed' => 1,
				);
			update_option('wdi_admin_notice', $admin_notices_option);

			?>
			<script>
			  wdi_controller.instagram = new WDIInstagram();
			  if(wdi_controller.getCookie('wdi_autofill') != 'false'){
			  	wdi_controller.apiRedirected();
			  	document.cookie = "wdi_autofill=false";
			  	jQuery(document).ready(function(){
			  		jQuery(document).on('wdi_settings_filled',function(){
			  			jQuery('#submit').trigger('click');
			  		})
			  	});
			  	
			  }
			</script>
			<?php
		} 
		?>
		<!-- Banner Start -->
	    <div style="clear: both; float: left; width: 100%;">
	          <div style="float: left; font-size: 14px; font-weight: bold;">
	            <?php _e('This Section Allows You To Set API Parameters','wdi') ?>
	            <a style="color: #15699F; text-decoration: none;" target="_blank" href="https://web-dorado.com/wordpress-instagram-feed-wd/installation-and-configuration/getting-access-token.html"><?php _e('Read More in User Manual',"wdi"); ?></a>
	          </div>
	          <div style="float: right; text-align: right;margin-top:10px">
	            <a style="text-decoration: none;" target="_blank" href="https://web-dorado.com/files/fromInstagramFeedWD.php">
	              <img width="215" border="0" alt="web-dorado.com" src="<?php echo WDI_URL . '/images/wd_logo.png'; ?>" />
	            </a>
	          </div>
	    </div>
	    <!-- Banner END -->

		<h1 id="settings_wdi_title"><?php _e('Instagram WD Settings', "wdi"); ?></h1>
		<form method="post" action="options.php">
			<input type="hidden"id="wdi_user_id" name="<?php echo WDI_OPT.'[wdi_user_id]' ?>">
            <?php settings_fields('wdi_all_settings'); ?>
            <?php do_settings_sections('settings_wdi'); ?>
             <div id="wdi_reset_access_token" class="button button-secondary"><?php _e("Reset Access Token and Username","wdi")?></div>          
             <?php submit_button(); ?>   
	            <style>
		 			p.submit{
		 				display: inline;
		 				padding-left: 10px;
		 			}
		 			#wdi_reset_access_token{
		 				margin-top: 0;
		 				float: left;
		 			}
	           </style>
	            <script>
		 	        jQuery(document).ready(function(){
		 	            jQuery('#wdi_reset_access_token').on('click',function(){
		 	                if(confirm("<?php _e('Are you sure that you want to reset access token and username, after resetting it you will need to log in with Instagram again for using plugin','wdi')?>")){
		 	                    jQuery('#wdi_access_token').attr('value','');
		 	                    jQuery('#wdi_user_name').attr('value','');
		 	                    document.cookie = "wdi_autofill=false";
		 	                    jQuery(this).parent().parent().find('#submit').trigger('click');  
		 	                }
		 	            });
		 	        });
	         	</script>
        </form>
		<?php
	}
}