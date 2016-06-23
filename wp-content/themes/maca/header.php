<!DOCTYPE html>
<!--[if lt IE 7 ]><html class="ie ie6" <?php language_attributes(); ?>> <![endif]-->
<!--[if IE 7 ]><html class="ie ie7" <?php language_attributes(); ?>> <![endif]-->
<!--[if IE 8 ]><html class="ie ie8" <?php language_attributes(); ?>> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--><html <?php language_attributes(); ?> > <!--<![endif]-->

<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<!--[if ie]><meta http-equiv='X-UA-Compatible' content="IE=edge,IE=9,IE=8,chrome=1" /><![endif]-->
<title>
	<?php 
		global $page, $paged;
			wp_title( '|', true, 'right' ); bloginfo( 'name' );
			$site_description = get_bloginfo( 'description', 'display' );
		if ( $site_description && ( is_home() || is_front_page() ) ) echo " | $site_description";
		if ( $paged >= 2 || $page >= 2 ) echo ' | ' . sprintf( __( 'Page %s', 'maca' ), max( $paged, $page ) );
	?>
</title>
<meta name="description" content="">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

<?php wp_head(); ?>

</head>

<body <?php body_class() ;?>>



<div class="container">

<header id="header" class="header row clearfix" data-scrollReveal="top">

<div class="logo pull-left"><?php akmanda_logo_type() ?></div><!-- logo -->
 <nav id="mainmenu" class="menu pull-right clearfix">
	<?php akmanda_top_nav_menu(); ?>
</nav> 

</header>


</div>





<div id="main" class="site-main clearfix">

