<?php


// AKMANDA TOP MENU
function akmanda_top_nav_menu(){
  wp_nav_menu( array(
    'theme_location' => 'header-menu',
    'container'       => 'ul',
   'menu_class'      => 'sm sm-clean',
    'fallback_cb'  => 'akmanda_header_menu_cb'
  ));
}

// AKMANDA MOBILE MENU
function akmanda_mobile_nav_menu(){
  wp_nav_menu( array(
    'theme_location' => 'header-menu',
    'container'       => 'ul',
   'menu_class'      => 'nav nav-pills nav-stacked',
    'fallback_cb'  => 'akmanda_header_menu_cb'
  ));
}

// FALLBACK IF PRIMARY MENU HAVEN'T SET YET
function akmanda_header_menu_cb() {
  echo '<ul id="menu-top-menu" class="sm sm-clean">';
  wp_list_pages('title_li=');
  echo '</ul>';
}

