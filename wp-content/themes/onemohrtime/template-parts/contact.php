<section class="contact-section" id="contact">
    
    <figure class="contact-section__profile">
        <img src="<?php echo get_template_directory_uri() . '/img/vector-me.png' ?>" alt="vector illustration self portait" />
    </figure>
    
    <?php if(function_exists('ninja_forms_display_form')) {
        ninja_forms_display_form(3);
    } ?>
    
    <nav class="contact-section__social">
        <a href="//dribbble.com/onemohrtime" class="btn" target="_blank">
            <span class="fa fa-dribbble"></span> See More Work
        </a>
        <a href="//instagram.com/onemohrtimedesign" class="btn" target="_blank">
            <span class="fa fa-instagram"></span> Instagram
        </a>
    </nav>
    
</section>