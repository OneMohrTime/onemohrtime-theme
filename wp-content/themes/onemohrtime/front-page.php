<?php get_header(); ?>
    
	<div id="primary" class="content-area">
        
		<main id="main" class="site-main" role="main">
		  
            <?php $homeHero = get_field('homepage_hero'); ?>
            <figure class="homepage-banner" style="background-image: url('<?php echo $homeHero['url']; ?>');">
                <h1>Grand Rapids <span class="rotate">designer,developer</span></h1>
<!--
                <div id="homepage_logo">
                    <h1>
                        <?php the_title(); ?>
                        <span>|</span>
                    </h1>
                </div>
-->
            </figure>
            
            <section class="homepage-services">
                <figure class="service animatedParent animateOnce" data-sequence="150">
                    <h4 class="service__header animated fadeInLeftShort" data-id="1">Designer</h4>
                    <div class="service__img animated fadeInLeftShort" data-id="2">
                        <svg version="1.1" id="icn_designer" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 600 600" style="enable-background:new 0 0 600 600;" xml:space="preserve">
                            <g>
                                <g>
                                    <path class="designer-stroke" d="M321.2,135.1v197l0,0c20,4.8,34.8,22.7,34.8,44.2c0,25.1-20.3,45.4-45.4,45.4s-45.4-20.3-45.4-45.4
                                        c0-21.4,14.8-39.4,34.8-44.2l0,0v-197h-21.7L158.2,399l88.4,110.5h127.8L462.9,399L342.8,135.1H321.2z"/>
                                    <rect x="246.7" y="553.1" class="designer-stroke" width="127.8" height="43.6"/>
                                    <path class="designer-stroke" d="M555.5,22c-20.9,0-38.4,14.4-43.2,33.8H355.1V22h-89v33.8h0H108.8C104,36.4,86.5,22,65.7,22
                                        c-24.6,0-44.5,19.9-44.5,44.5S41.1,111,65.7,111c20.9,0,38.4-14.4,43.2-33.8h110.8c-17.7,10.1-39.2,24.1-60.8,42.4
                                        c-67.5,57.2-103.5,129.6-104,209.4H21.1c-1,0-1.8,0.8-1.8,1.8v89c0,1,0.8,1.8,1.8,1.8h89c1,0,1.8-0.8,1.8-1.8v-89
                                        c0-1-0.8-1.8-1.8-1.8H76.4c0.5-74.1,32.8-138.9,95.9-192.6c40.4-34.4,81.3-53.1,93.8-58.3V111h89V77.3h157.2
                                        c4.8,19.4,22.3,33.8,43.2,33.8c24.6,0,44.5-19.9,44.5-44.5S580.1,22,555.5,22z M86.1,354.9v40.9H45.2v-40.9H86.1z"/>
                                </g>
                            </g>
                            <g>
                                <g>
                                    <path class="designer-fill" d="M301.8,115.7v197l0,0c20,4.8,34.8,22.7,34.8,44.2c0,25.1-20.3,45.4-45.4,45.4s-45.4-20.3-45.4-45.4
                                        c0-21.4,14.8-39.4,34.8-44.2l0,0v-197H259L138.9,379.6l88.4,110.5h127.8l88.4-110.5L323.5,115.7H301.8z"/>
                                    <rect x="227.3" y="533.7" class="designer-fill" width="127.8" height="43.6"/>
                                    <path class="designer-fill" d="M536.1,2.7c-20.9,0-38.4,14.4-43.2,33.8H335.7V2.7h-89v33.8h0H89.5C84.7,17,67.2,2.7,46.3,2.7
                                        C21.7,2.7,1.8,22.6,1.8,47.2s19.9,44.5,44.5,44.5c20.9,0,38.4-14.4,43.2-33.8h110.8C182.6,68,161.1,82,139.6,100.3
                                        C72,157.5,36.1,229.9,35.6,309.7H1.8c-1,0-1.8,0.8-1.8,1.8v89c0,1,0.8,1.8,1.8,1.8h89c1,0,1.8-0.8,1.8-1.8v-89
                                        c0-1-0.8-1.8-1.8-1.8H57.1c0.5-74.1,32.8-138.9,95.9-192.6c40.4-34.4,81.3-53.1,93.8-58.3v32.9h89V57.9H493
                                        c4.8,19.4,22.3,33.8,43.2,33.8c24.6,0,44.5-19.9,44.5-44.5S560.7,2.7,536.1,2.7z M66.8,335.6v40.9H25.8v-40.9H66.8z"/>
                                </g>
                            </g>
                        </svg>
                    </div>
                    <figcaption class="service__body wysiwyg animated fadeInLeftShort" data-id="3">
                        <p>A big chunk of my free time is spent uploading <a href="//dribbble.com/onemohrtime" target="_blank">dribbbles</a> of logo and badge designs.</p>
                    </figcaption>
                    <a href="<?php echo home_url('about/graphic-design','relative'); ?>" class="service__btn btn animated fadeInLeftShort" data-id="4">Hear More</a>
                </figure>
                <figure class="service animatedParent animateOnce" data-sequence="150">
                    <h4 class="service__header animated fadeInRightShort" data-id="1">Developer</h4>
                    <div class="service__img animated fadeInRightShort" data-id="2">
                        <svg version="1.1" id="icn_developer" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 600 600" style="enable-background:new 0 0 600 600;" xml:space="preserve">
                            <g>
                                <g>
                                    <g>
                                        <path class="developer-stroke" d="M98.5,106.3v158.4c0,6.1-1.4,13-4.2,20.8c-2.8,7.8-7.7,14.7-14.6,20.8c6.5,6.1,11.2,13,14.3,20.8
                                            c3,7.8,4.5,14.7,4.5,20.8v165.5h35.7V560H61.5c-3.5,0-6.8-1.4-10.1-4.2c-3.2-2.8-4.9-7.9-4.9-15.3V364.6c0-9.5-2.5-18-7.5-25.3
                                            c-5-7.4-11.6-11.7-19.8-13v-41.5c4.3,0,8.2-1.3,11.7-3.9c3.5-2.6,6.4-5.8,8.8-9.7c2.4-3.9,4.1-7.9,5.2-12
                                            c1.1-4.1,1.6-7.9,1.6-11.4V79c0-8.2,1.9-13.5,5.8-15.9c3.9-2.4,6.9-3.6,9.1-3.6h72.7v46.7H98.5z"/>
                                        <path class="developer-stroke" d="M485.1,106.3V59.6h72.7c2.2,0,5.2,1.2,9.1,3.6c3.9,2.4,5.8,7.7,5.8,15.9v168.8c0,3.5,0.5,7.3,1.6,11.4
                                            c1.1,4.1,2.8,8.1,5.2,12c2.4,3.9,5.2,7.1,8.4,9.7c3.2,2.6,7.2,3.9,12,3.9v41.5c-8.7,1.3-15.4,5.6-20.1,13
                                            c-4.8,7.4-7.1,15.8-7.1,25.3v175.9c0,7.4-1.7,12.4-5.2,15.3c-3.5,2.8-6.7,4.2-9.7,4.2h-72.7v-46.7h35.7V347.8
                                            c0-6.1,1.4-13,4.2-20.8c2.8-7.8,7.7-14.7,14.6-20.8c-6.9-6.1-11.8-13-14.6-20.8c-2.8-7.8-4.2-14.7-4.2-20.8V106.3H485.1z"/>
                                    </g>
                                    <rect x="146" y="146" class="developer-stroke" width="327.5" height="46.7"/>
                                    <rect x="146" y="238.8" class="developer-stroke" width="282.9" height="46.7"/>
                                    <rect x="146" y="332.7" class="developer-stroke" width="141.5" height="46.7"/>
                                    <rect x="146" y="426.8" class="developer-stroke" width="282.9" height="46.7"/>
                                </g>
                            </g>
                            <g>
                                <g>
                                    <path class="developer-fill" d="M79.2,86.9v158.4c0,6.1-1.4,13-4.2,20.8c-2.8,7.8-7.7,14.7-14.6,20.8c6.5,6.1,11.2,13,14.3,20.8
                                        c3,7.8,4.5,14.7,4.5,20.8v165.5h35.7v46.7H42.2c-3.5,0-6.8-1.4-10.1-4.2c-3.2-2.8-4.9-7.9-4.9-15.3V345.3c0-9.5-2.5-18-7.5-25.3
                                        c-5-7.4-11.6-11.7-19.8-13v-41.5c4.3,0,8.2-1.3,11.7-3.9c3.5-2.6,6.4-5.8,8.8-9.7c2.4-3.9,4.1-7.9,5.2-12
                                        c1.1-4.1,1.6-7.9,1.6-11.4V59.7c0-8.2,1.9-13.5,5.8-15.9c3.9-2.4,6.9-3.6,9.1-3.6h72.7v46.7H79.2z"/>
                                    <path class="developer-fill" d="M465.7,86.9V40.2h72.7c2.2,0,5.2,1.2,9.1,3.6c3.9,2.4,5.8,7.7,5.8,15.9v168.8c0,3.5,0.5,7.3,1.6,11.4
                                        c1.1,4.1,2.8,8.1,5.2,12c2.4,3.9,5.2,7.1,8.4,9.7c3.2,2.6,7.2,3.9,12,3.9V307c-8.7,1.3-15.4,5.6-20.1,13
                                        c-4.8,7.4-7.1,15.8-7.1,25.3v175.9c0,7.4-1.7,12.4-5.2,15.3c-3.5,2.8-6.7,4.2-9.7,4.2h-72.7v-46.7h35.7V328.4
                                        c0-6.1,1.4-13,4.2-20.8c2.8-7.8,7.7-14.7,14.6-20.8c-6.9-6.1-11.8-13-14.6-20.8c-2.8-7.8-4.2-14.7-4.2-20.8V86.9H465.7z"/>
                                </g>
                                <rect x="126.6" y="126.7" class="developer-fill" width="327.5" height="46.7"/>
                                <rect x="126.6" y="219.4" class="developer-fill" width="282.9" height="46.7"/>
                                <rect x="126.6" y="313.4" class="developer-fill" width="141.5" height="46.7"/>
                                <rect x="126.6" y="407.5" class="developer-fill" width="282.9" height="46.7"/>
                            </g>
                        </svg>
                    </div>
                    <figcaption class="service__body wysiwyg animated fadeInRightShort" data-id="3">
                        <p>As a designer-who-codes, I’ve made a lot of websites, and it somehow never gets old.</p>
                    </figcaption>
                    <a href="<?php echo home_url('about/web-dev','relative'); ?>" class="service__btn btn animated fadeInRightShort" data-id="4">Hear More</a>
                </figure>
            </section>
            
            <aside class="homepage__work">
                <a href="<?php echo home_url('design','relative'); ?>" class="btn">All Featured Projects</a>
            </aside>
            
            <?php if(have_rows('homepage_slideshow')): ?>
            <section class="homepage__slideshow swiper-container">
                <div class="swiper-wrapper">
                    
                    <?php while(have_rows('homepage_slideshow')): the_row();
                        $slideImg = get_sub_field('slide_image');
                        $slideTitle = get_sub_field('slide_title');
                        $slideText = get_sub_field('slide_text');
                        $slideLink = get_sub_field('slide_link'); ?>
                        
                    <figure class="slide swiper-slide">
                        
                        <div class="slide__content">
                            
                            <?php if(!empty($slideTitle)): ?>
                            <h4 class="slide__title"><?php echo $slideTitle ?></h4>
                            <?php endif; ?>
                            
                            <?php if(!empty($slideText)): ?>
                            <figcaption class="slide__text wysiwyg">
                                <?php echo $slideText ?>
                            </figcaption>
                            <?php endif; ?>
                            
                            <?php if(!empty($slideLink)): ?>
                            <a href="<?php echo $slideLink ?>" class="slide__link btn">Read More</a>
                            <?php endif; ?>
                            
                        </div>
                        
                        <?php if(!empty($slideImg)): ?>
                        <img src="<?php echo $slideImg['url'] ?>" alt="<?php echo $slideImg['alt'] ?>" class="slide__img" />
                        <?php endif; ?>
                        
                    </figure>
                    
                    <?php endwhile; ?>
                </div>
                
                <div class="swiper-pagination"></div>
                
                <div class="swiper-button-prev"><span class="fa fa-angle-left"></span></div>
                <div class="swiper-button-next"><span class="fa fa-angle-right"></span></div>
                
            </section>
            <?php endif; ?>
            
            <section class="homepage__dribbble">
                <h3>
                    Latest Shots
                    <span>on dribbble</span>
                </h3>
                <div id="dribbble_gallery" class="dribbbles"></div>
            </section>
            
            <section class="homepage__contact animatedParent animateOnce" data-sequence="100" data-appear-top-offset="-100">
                <h3 class="animated fadeInUpShort" data-id="1">Like What You See?</h3>
                <a href="#contact" class="btn animated fadeInUpShort" data-id="2">Get At Me</a>
            </section>
            
            <?php echo get_template_part('template-parts/contact') ?>
            
		</main>
	</div>
    
<?php get_footer();