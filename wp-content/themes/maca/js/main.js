window.scrollReveal = new scrollReveal();  

jQuery(document).ready(function () {


    jQuery(function() {
        jQuery('#menu-top-menu').smartmenus({
            mainMenuSubOffsetX: -1,
            mainMenuSubOffsetY: 4,
            subMenusSubOffsetX: 6,
            subMenusSubOffsetY: -6
        });
    });




    jQuery(".post-content").fitVids();

    jQuery('.share-post').share({
        background:'#ffffff'
    });

});

