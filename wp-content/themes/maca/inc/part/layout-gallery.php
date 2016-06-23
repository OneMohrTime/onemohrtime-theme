<?php
$images = get_field('akmanda_gallery');

        if( $images){

            ?>
            <script type="text/javascript">
                    jQuery(document).ready(function() {

                   jQuery('#post-<?php the_ID(); ?> .flexslider').flexslider({
                    animation: "slide",
                    smoothHeight: true,
                    controlNav: false,
                    slideshow:false                   
                  });
                });

            </script>

            <div id="slider" class="flexslider">
                <ul class="slides">
                    <?php foreach( $images as $image ): ?>
                        <li>
                            <img src="<?php echo $image['url']; ?>" alt="<?php echo $image['alt']; ?>" />
                      
                        </li>
                    <?php endforeach;  ?>
                </ul>
            </div>
            <?php } 