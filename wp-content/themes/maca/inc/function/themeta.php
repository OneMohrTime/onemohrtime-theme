<?php

// akmanda category plug and play
function akmanda_category(){
    echo '<div class="category-wrapper">';
    echo '<span>Category :</span> ';
    the_category(', ');
    echo '</div>';

}

// akmanda author plug and play
function akmanda_author(){
    global $post;
    echo '<div class="author-wrapper">';
    echo '<span class="author-icon">by: </span>';
    echo '<a href="'.get_author_posts_url( get_the_author_meta( 'ID' ) ).'">'. get_the_author_meta( 'display_name' ) .'</a>';
    echo '</div>';
}

// akmanda date plug and play
function akmanda_date(){
    global $post;

    echo get_the_date();

}

// akmanda tags plug and play
function akmanda_tags(){
    global $post;
    echo '<div class="tag-wrapper">';
    echo '<span>Tags :</span> ';
    the_tags('',', ','');
    echo '</div>';
}


function akmanda_comments(){
    global $post;

    comments_number( '0 Comments', '1 Comments', '% Comments' );

}

function akmanda_post_type() {



if ( has_post_format('gallery') ) {
    echo '<i class="icon post-type icon-picture"></i>';
}

if ( has_post_format('audio') ) {
    echo '<i class="icon post-type icon-elusive-icons-2"></i>';
}

if ( has_post_format('chat') ) {
    echo '<i class="icon post-type icon-chat"></i>';
}

if ( has_post_format('image') ) {
    echo '<i class="icon post-type icon-picture-1"></i>';
}

if ( has_post_format('link') ) {
    echo '<i class="icon post-type icon-link-1"></i>';
}

if ( has_post_format('quote') ) {
    echo '<i class="icon post-type icon-fontawesome-webfont"></i>';
}

if ( has_post_format('video') ) {
    echo '<i class="icon post-type icon-fontawesome-webfont-6"></i>';
}

if ( has_post_format('status') ) {
    echo '<i class="icon post-type icon-fontawesome-webfont-8"></i>';
}

if ( !get_post_format() ) {
    echo '<i class="icon post-type icon-elusive-icons-1"></i>';
}


}

function meta_info(){

$hide_meta = get_field('hide_meta_info');

    if (!$hide_meta) { ?>
        <div class="post-meta text-center">  

    <ul>
        <li><?php akmanda_post_type(); ?></li>
        <li><?php akmanda_date(); ?> /</li> 
        <li> <?php  akmanda_comments(); ?></li>



    </ul>

    </div>         
    <?php } 

}

