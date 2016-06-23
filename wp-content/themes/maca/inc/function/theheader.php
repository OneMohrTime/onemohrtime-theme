<?php

// logo text or image huh?
function akmanda_logo_type(){

$options = get_option('akmanda_framework');
$logo = '';
$logo = $options['logo_upload'];
$upload_logo = $logo['url'];

if ( ! empty( $upload_logo ) ) { ?>

	<div class="logo-image">
    <a href="<?php bloginfo( 'siteurl' ); ?>"><img src="<?php echo $upload_logo; ?>" class="image-logo" alt="logo" /></a>
    </div>
    
    <?php } else { ?> 
    
    <div class="logo-title">
        <h1 class="site-title">
            <a href="<?php echo esc_url( home_url() ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a>
        </h1>
    </div>

<?php }
} 