<?php

class WDIViewThemes_wdi {
  ////////////////////////////////////////////////////////////////////////////////////////
  // Events                                                                             //
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  // Constants                                                                          //
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  // Variables                                                                          //
  ////////////////////////////////////////////////////////////////////////////////////////
  private $model;
  
  ////////////////////////////////////////////////////////////////////////////////////////
  // Constructor & Destructor                                                           //
  ////////////////////////////////////////////////////////////////////////////////////////
  public function __construct($model) {
    $this->model = $model;
  }
  ////////////////////////////////////////////////////////////////////////////////////////
  // Public Methods                                                                     //
  ////////////////////////////////////////////////////////////////////////////////////////
  public function display() {

    ?>
    <!-- Banner Start -->
    <div style="clear: both; float: left; width: 100%;">
          <div style="float: left; font-size: 14px; font-weight: bold;">
            <?php _e('Here You Can Customize Your Themes','wdi') ?>
            <a style="color: #15699F; text-decoration: none;" target="_blank" href="https://web-dorado.com/wordpress-instagram-feed-wd/editing-themes.html"><?php _e('Read More in User Manual',"wdi");?></a>
          </div>
          <div style="float: right; text-align: right;margin-top:10px">
            <a style="text-decoration: none;" target="_blank" href="https://web-dorado.com/files/fromInstagramFeedWD.php">
              <img width="215" border="0" alt="web-dorado.com" src="<?php echo WDI_URL . '/images/wd_logo.png'; ?>" />
            </a>
          </div>
    </div>
    <!-- Banner END -->
    <div class="wdi_pro_notice"> <?php _e("This is FREE version, Customizing themes is available only in PRO version","wdi"); ?> </div>
    

<?php
    $this->buildFreeThemeDemo();
}

public function buildFreeThemeDemo(){
  ?>
    <div class="wdi_demo_img" demo-tab="general"><img src="<?php echo WDI_URL . '/demo_images/1.png'; ?>" alt=""></div>
    <div class="wdi_demo_img" demo-tab="header"><img src="<?php echo WDI_URL . '/demo_images/2.png'; ?>" alt=""></div>
    <div class="wdi_demo_img" demo-tab="load_more"><img src="<?php echo WDI_URL . '/demo_images/3.png'; ?>" alt=""></div>
    <div class="wdi_demo_img" demo-tab="thumbnails"><img src="<?php echo WDI_URL . '/demo_images/4.png'; ?>" alt=""></div>
    <div class="wdi_demo_img" demo-tab="masonry"><img src="<?php echo WDI_URL . '/demo_images/5.png'; ?>" alt=""></div>
    <div class="wdi_demo_img" demo-tab="blog_style"><img src="<?php echo WDI_URL . '/demo_images/6.png'; ?>" alt=""></div>
    <div class="wdi_demo_img" demo-tab="image_browser"><img src="<?php echo WDI_URL . '/demo_images/7.png'; ?>" alt=""></div>
    <div class="wdi_demo_img" demo-tab="image_browser"><img src="<?php echo WDI_URL . '/demo_images/8.png'; ?>" alt=""></div>
    <div class="wdi_demo_img" demo-tab="lb_general"><img src="<?php echo WDI_URL . '/demo_images/l1.png'; ?>" alt=""></div>
    <div class="wdi_demo_img" demo-tab="lb_ctrl_btns"><img src="<?php echo WDI_URL . '/demo_images/l2.png'; ?>" alt=""></div>
    <div class="wdi_demo_img" demo-tab="lb_close_btn"><img src="<?php echo WDI_URL . '/demo_images/l3.png'; ?>" alt=""></div>
    <div class="wdi_demo_img" demo-tab="lb_nav_btns"><img src="<?php echo WDI_URL . '/demo_images/l4.png'; ?>" alt=""></div>
    <div class="wdi_demo_img" demo-tab="lb_filmstrip"><img src="<?php echo WDI_URL . '/demo_images/l5.png'; ?>" alt=""></div>
    <div class="wdi_demo_img" demo-tab="lb_info"><img src="<?php echo WDI_URL . '/demo_images/l6.png'; ?>" alt=""></div>
    <div class="wdi_demo_img" demo-tab="lb_comments"><img src="<?php echo WDI_URL . '/demo_images/l7.png'; ?>" alt=""></div>
  <?php
}



}





