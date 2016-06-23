<?php

class WDIViewLicensing_wdi {
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
    <div id="featurs_tables">
      <div id="featurs_table1">
        <span>WordPress 4.0+ <?php _e("ready", 'wdi'); ?></span>
       
        <span><?php _e("Responsive Design and Layout", 'wdi'); ?></span>
        <span><?php _e("SEO Friendly", 'wdi'); ?></span>
        <span><?php _e("Thumbnails layout", 'wdi'); ?></span>
        <span><?php _e("Image Browser layout", 'wdi'); ?></span>
        <span><?php _e("Lightbox", 'wdi'); ?></span>
        <span><?php _e("Load More Button / Classic Pagination", 'wdi'); ?></span>
        <span><?php _e("Image Sorting", 'wdi'); ?></span>
        <span><?php _e("Widget", 'wdi'); ?></span>
        <span><?php _e("Slideshow/Lightbox Effects", 'wdi'); ?></span>


        <span><?php _e("Conditional Filters", 'wdi'); ?></span>
        <span><?php _e("Image On Hover Effects", 'wdi'); ?></span>
        <span><?php _e("Infinite Scroll Load More", 'wdi'); ?></span>
        <span><?php _e("Full Style Customization With Themes", 'wdi'); ?></span>
        <span><?php _e("Filmstrip", 'wdi'); ?></span>
        <span><?php _e("Instagram Comments in Lightbox", 'wdi'); ?></span>
        <span><?php _e("Blog Style layout", 'wdi'); ?></span>
        <span><?php _e("Masonry layout", 'wdi'); ?></span>
        <span><?php _e("Videos in BlogStyle, ImageBrowser and Lightbox", 'wdi'); ?></span>
        <span><?php _e("Social Share Buttons", 'wdi'); ?></span>
        <span><?php _e("Multiple User/Hashtag Feeds", 'wdi'); ?></span>
        <span><?php _e("Filtering Images Based on Users/Hashtags", 'wdi'); ?></span>
        <span><?php _e("Support / Updates", 'wdi'); ?></span>
      </div>
      <div id="featurs_table2">
        <span style="padding-top: 18px;height: 39px;"><?php _e("Free", 'wdi'); ?></span>
    
        <span class="yes"></span>
        <span class="yes"></span>
        <span class="yes"></span>
        <span class="yes"></span>
        <span class="yes"></span>
        <span class="yes"></span>
        <span class="yes"></span>
        <span class="yes"></span>
        <span class="yes"></span>
        <span>1</span>
        <span class="no"></span>
        <span class="no"></span>
        <span class="no"></span>
        <span class="no"></span>
        <span class="no"></span>
        <span class="no"></span>
        <span class="no"></span>
        <span class="no"></span>
        <span class="no"></span>
        <span class="no"></span>
        <span class="no"></span>
        <span class="no"></span>
        <span> <?php _e('Only Bug Fixes',"wdi"); ?> </span>
      </div>
      <div id="featurs_table3">
        <span><?php _e("Pro Version", 'wdi'); ?></span>

        <span class="yes"></span>
        <span class="yes"></span>
        <span class="yes"></span>
        <span class="yes"></span>
        <span class="yes"></span>
        <span class="yes"></span>
        <span class="yes"></span>
        <span class="yes"></span>
        <span class="yes"></span>
        <span>15</span>
        <span class="yes"></span>
        <span class="yes"></span>
        <span class="yes"></span>
        <span class="yes"></span>
        <span class="yes"></span>
        <span class="yes"></span>
        <span class="yes"></span>
        <span class="yes"></span>
        <span class="yes"></span>
        <span class="yes"></span>
        <span class="yes"></span>
        <span class="yes"></span>
        <span> <?php _e('Full Support',"wdi"); ?> </span>
      </div>

      <div style=" text-align: right;position: relative;top:-30px;">
        <a style="text-decoration: none;" target="_blank" href="https://web-dorado.com/files/fromInstagramFeedWD.php">
          <img width="215" border="0" alt="web-dorado.com" src="<?php echo WDI_URL . '/images/wd_logo.png'; ?>" />
        </a>
      </div>

    </div>
    
    <div style="float: left; clear: both;">
      <p><?php _e("After purchasing the commercial version follow these steps:", 'wdi'); ?></p>
      <ol>
        <li><?php _e("Deactivate Instagram Feed WD plugin.", 'wdi'); ?></li>
        <li><?php _e("Delete Instagram Feed WD plugin.", 'wdi'); ?></li>
        <li><?php _e("Install the downloaded commercial version of the plugin.", 'wdi'); ?></li>
      </ol>
    </div>
    <?php
  }
  ////////////////////////////////////////////////////////////////////////////////////////
  // Getters & Setters                                                                  //
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  // Private Methods                                                                    //
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  // Listeners                                                                          //
  ////////////////////////////////////////////////////////////////////////////////////////
}