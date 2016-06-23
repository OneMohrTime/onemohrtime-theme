<?php 

// SETUP THEMES
if ( ! function_exists( 'akmanda_setup' ) ) :

	function akmanda_setup() {
		// several theme support
		add_theme_support( 'automatic-feed-links' );
		add_theme_support( 'post-formats', array( 'gallery', 'link', 'image', 'quote', 'status', 'video', 'audio', 'chat' ) );
		add_theme_support( 'post-thumbnails' );
		add_theme_support( 'html5', array( 'comment-list', 'comment-form', 'search-form' ) );	
		add_theme_support( 'custom-header' );	
				
}
endif;


$defaults = array(
	'default-image'          => '',
	'header-text'            => false,
	'uploads'                => true,
	'wp-head-callback'       => '',
	'admin-head-callback'    => '',
	'admin-preview-callback' => '',
);


add_theme_support( 'custom-header', $defaults );


add_action( 'after_setup_theme', 'akmanda_setup' );


register_nav_menu( 'header-menu', 'Header Menu' ); 

// LET'S enqueue NECESSARY SCRIPT
function add_our_scripts() {

    if (!is_admin()) { 

    wp_register_script( 'pluginsFoot', AKMANDA_DIR. '/js/pluginsFoot.js' );
		wp_register_script( 'mainjs', AKMANDA_DIR.'/js/main.js');		
	 
		//load the scripts and style.


    wp_enqueue_script('pluginsFoot');
		wp_enqueue_script('mainjs');

    } 

    if(is_singular()) {
      echo '<script type="text/javascript">jQuery(".share-post").share({
        background:"#ffffff"
    });</script>';
    }
} 
add_action( 'wp_footer', 'add_our_scripts',0);


// LET'S enqueue NECESSARY STYLES
function add_our_styles() {
 
    if (!is_admin()) { 

    wp_register_script( 'pluginsHead', AKMANDA_DIR. '/js/pluginsHead.js' );
		wp_register_style( 'font', AKMANDA_DIR .'/css/font.css');
		wp_register_style( 'bootstrap', AKMANDA_DIR .'/css/bootstrap.min.css');
		wp_register_style( 'plugin', AKMANDA_DIR .'/css/plugin.css');

		
		wp_enqueue_style( 'bootstrap' );
    wp_enqueue_style( 'plugin' );
		wp_enqueue_style( 'stylesheet', get_stylesheet_uri() );	
		wp_enqueue_style( 'font' );
		wp_enqueue_script('jquery');
    wp_enqueue_script('pluginsHead');


    } 
} 
add_action( 'wp_head', 'add_our_styles',0);


function custom_excerpt_length( $length ) {
	return 40;
}
add_filter( 'excerpt_length', 'custom_excerpt_length', 999 );

function new_excerpt_more( $more ) {
	return '...';
}
add_filter('excerpt_more', 'new_excerpt_more');

function akmanda_excerpt(){
 global $post;
  ?> <div class="akmanda-excerpt"> <?php
 	the_excerpt(); 
 	?><div class="more-button">
	<a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>" class="more">Continue</a></div>
	</div><?php
}



function akmanda_post_title(){ 

$hide_title = get_field('hide_title');
if(!$hide_title) {?>


	        <div class="post-title">
            <h2>
                <a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>"><?php the_title(); ?></a>

            </h2>
           
         </div><!-- post-title --> 

<?php }}

function loop_post_thumbnail(){

if ( has_post_thumbnail()) { ?>
    <a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>" >   <div class="post-thumb row">
      <?php the_post_thumbnail(); ?>
      </div><!-- post thumb -->
  </a>
  <?php }  ?>
<?php } 

function loop_post_thumbnail_frame(){

if ( has_post_thumbnail()) { ?>
    <a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>" >   <div class="post-thumb row">
      <?php the_post_thumbnail(); ?>
      </div><!-- post thumb -->
  </a>
  <?php } else { ?>
    <div class="no-post-thumb"></div> <?php
    } ?>
<?php } 

function akmanda_footer_social() {

 $options = get_option('akmanda_framework');


$twitter = $options['twitter_profile'];
$facebook = $options['facebook_profile'];
$linkedin = $options['linkedin_profile'];
$google = $options['google_profile'];
$pinterest = $options['pinterest_profile'];

if (!empty($twitter)) { ?>
    <li class="twitter"><a href="<?php echo $twitter ?>" class="icon icon-twitter-alt"></a></li>
<?php } 

if (!empty($google)) { ?>
  <li class="google"><a href="<?php echo $google ?>" class="icon icon-google"></a></li>
<?php } 

if (!empty($facebook)) { ?>
  <li class="facebook"><a href="<?php echo $facebook ?>" class="icon icon-facebook-1"></a></li>
<?php } 

if (!empty($linkedin)) { ?>
  <li class="linkedin"><a href="<?php echo $linkedin ?>" class="icon icon-linkedin"></a></li>
<?php } 

if (!empty($pinterest)) { ?>
  <li class="pinterest"><a href="<?php echo $pinterest ?>" class="icon icon-path"></a></li>
<?php } 

 }

function akmanda_content() {
  global $post;

    if (is_singular() && $post->post_content !== '') { ?>
          <div class="inner-content">
          <?php the_content();
          wp_link_pages(); ?>
          </div>
       <?php } if (!is_singular()) { 
            akmanda_excerpt();
          } 
}


function akmanda_comment_checker() {
	global $post;

	if ( is_singular() ) wp_enqueue_script( "comment-reply" ); 
	if ( comments_open() || '0' != get_comments_number() ) comments_template(); 
}


function akmanda_pagination($pages = '', $range = 2)
{  
     $showitems = ($range * 2)+1;  

     global $paged;
     if(empty($paged)) $paged = 1;

     if($pages == '')
     {
         global $wp_query;
         $pages = $wp_query->max_num_pages;
         if(!$pages)
         {
             $pages = 1;
         }
     }   

     if(1 != $pages)
     {
         echo "<div class='pagination col-md-12'>";
         if($paged > 2 && $paged > $range+1 && $showitems < $pages) echo "<a href='".get_pagenum_link(1)."'>First</a>";
         if($paged > 1 && $showitems < $pages) echo "<a href='".get_pagenum_link($paged - 1)."'>&lsaquo;</a>";

         for ($i=1; $i <= $pages; $i++)
         {
             if (1 != $pages &&( !($i >= $paged+$range+1 || $i <= $paged-$range-1) || $pages <= $showitems ))
             {
                 echo ($paged == $i)? "<span class='current'>".$i."</span>":"<a href='".get_pagenum_link($i)."' class='inactive' >".$i."</a>";
             }
         }

         if ($paged < $pages && $showitems < $pages) echo "<a href='".get_pagenum_link($paged + 1)."'>&rsaquo;</a>";  
         if ($paged < $pages-1 &&  $paged+$range-1 < $pages && $showitems < $pages) echo "<a href='".get_pagenum_link($pages)."'>Last</a>";
         echo "</div>\n";
     }
}