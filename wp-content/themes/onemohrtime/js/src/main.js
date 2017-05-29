$(document).ready(function() {
	
	// click to smoothscroll
    
	$('a[href^="#"]').on('click',function(e) {
		e.preventDefault();
		$('html,body').animate({scrollTop:$(this.hash).offset().top}, 1500);
	});
    
    // add scrolling class to contact
    
    $('#desktop_menu li:nth-child(4) > a, a[href^="#contact"], .contact-toggle').on('click', function() {
        $('#contact').addClass('said-hi');
    });
    
    // Text Rotator
    
    $('.rotate').each(function () {
        var el = $(this);
        var text = $(this).html().split(",");
        el.html(text[0]);
        setInterval(function () {
            el.animate({
                textShadowBlur : 20,
                opacity : 0
            }, 500, function () {
                index = $.inArray(el.html(), text)
                if ((index + 1) == text.length) index = -1
                el.text(text[index + 1]).animate({
                    textShadowBlur : 0,
                    opacity : 1
                }, 500);
            });
        }, 2000);
    });
	
    // Remove inline anchor styles from certain elements
    
    $('#content a > img:not(.strip)').parent().addClass('no-style');
    $('.sharedaddy a').addClass('btn');
    $('.gallery-pagination-span a').addClass('btn');
    
    // Sticky-kit
    
    $('.entry-featured-image-frame').stick_in_parent();
    
    if(window.matchMedia('(min-width: 600px)').matches) {
		$('.halfie__img').stick_in_parent();
	};
    
    // Dribbble galleries
    
    $.jribbble.setToken('8511e98bc154687719eb09e014c965b169369470f618d3bb478221accfa5b078');
    $.jribbble.users('onemohrtime').shots({
        per_page : 6,
        sort : 'views'
    }).then(function(shots) {
        var html = [];
        shots.forEach(function(shot) {
            html.push('<figure id="' + shot.id + '" class="shot">');
            html.push('<img src="' + shot.images.teaser + '" alt="' + shot.title + '" srcset="' + shot.images.normal + ' 400w, ' + shot.images.hidpi + ' 800w" class="shot__image" />');
            html.push('<figcaption class="shot__hover">');
            html.push('<h4 class="shot__title">' + shot.title + '</h4>');
            html.push('<h5 class="shot__count"><span>' + shot.views_count + ' views</span><span>' + shot.likes_count + ' likes</span></h5>');
            html.push('<span class="shot__icon fa fa-link"></span>');
            html.push('<a class="shot__link" href="' + shot.html_url + '" target="_blank" title="' + shot.title + '"></a>');
            html.push('</figcaption>');
            html.push('</figure>');
        });
        $('#dribbble_gallery').html(html.join(''));
    });
    
    $.jribbble.setToken('8511e98bc154687719eb09e014c965b169369470f618d3bb478221accfa5b078');
    $.jribbble.users('onemohrtime').shots({
        per_page : 12,
        sort : 'recent'
    }).then(function(shots) {
        var html = [];
        shots.forEach(function(shot) {
            html.push('<figure id="' + shot.id + '" class="shot">');
            html.push('<img src="' + shot.images.teaser + '" alt="' + shot.title + '" srcset="' + shot.images.normal + ' 400w, ' + shot.images.hidpi + ' 800w" class="shot__image" />');
            html.push('<figcaption class="shot__hover">');
            html.push('<h4 class="shot__title">' + shot.title + '</h4>');
            html.push('<h5 class="shot__count"><span>' + shot.views_count + ' views</span><span>' + shot.likes_count + ' likes</span></h5>');
            html.push('<span class="shot__icon fa fa-link"></span>');
            html.push('<a class="shot__link" href="' + shot.html_url + '" target="_blank" title="' + shot.title + '"></a>');
            html.push('</figcaption>');
            html.push('</figure>');
        });
        $('#dribbbles').html(html.join(''));
    });
    
//    $.jribbble.setToken('8511e98bc154687719eb09e014c965b169369470f618d3bb478221accfa5b078');
//    $.jribbble.users('onemohrtime').shots({
//        per_page: 12
//    }).then(function(shots) {
//        var html = [];
//        shots.forEach(function(shot) {
//            html.push('<figure id="' + shot.id + '" class="shot">');
//            html.push('<img src="' + shot.images.teaser + '" alt="' + shot.title + '" srcset="' + shot.images.normal + ' 400w, ' + shot.images.hidpi + ' 800w" class="shot__image" />');
//            html.push('<figcaption class="shot__hover">');
//            html.push('<h4 class="shot__title">' + shot.title + '</h4>');
//            html.push('<h5 class="shot__count"><span>' + shot.views_count + ' views</span><span>' + shot.likes_count + ' likes</span></h5>');
//            html.push('<span class="shot__icon fa fa-link"></span>');
//            html.push('<a class="shot__link" href="' + shot.html_url + '" target="_blank" title="' + shot.title + '"></a>');
//            html.push('</figcaption>');
//            html.push('</figure>');
//        });
//        $('#dribbbles').html(html.join(''));
//    });
    
//	$.jribbble.setToken('8511e98bc154687719eb09e014c965b169369470f618d3bb478221accfa5b078');
//    $.jribbble.users('onemohrtime').shots({
//        per_page: 12
//    }).then(function(shots) {
//        var html = [];
//        shots.forEach(function(shot) {
//            html.push('<figure id="shot_' + shot.id + '" class="dribbble">');
//            html.push('<img src="' + shot.images.normal + '" alt="' + shot.title + '" class="dribbble__image" />');
//            html.push('<a href="' + shot.html_url + '" target="_blank" class="dribbble__link">');
//            html.push('<span class="dribbble__title">' + shot.title + '</span>');
//            html.push('<span class="dribbble__icon fa fa-link"></span>');
//            html.push('</a>');
//            html.push('</figure>');
//        });
//        $('#dribbbles').html(html.join(''));
//    });
    
});

// menu visible when scrolling up

var headerHeight = $('#site-navigation').height();
$(window).on('scroll', {previousTop : 0}, function() {
    var currentTop = $(window).scrollTop();
    //check if user is scrolling up
    if (currentTop < this.previousTop ) {
        //if scrolling up...
        if (currentTop > 0 && $('#site-navigation').hasClass('nav-fixed')) {
            $('#site-navigation').addClass('nav-visible');
        } else {
            $('#site-navigation').removeClass('nav-visible nav-fixed');
        }
    } else {
        //if scrolling down...
        $('#site-navigation').removeClass('nav-visible');
        if( currentTop > headerHeight && !$('#site-navigation').hasClass('nav-fixed')) $('#site-navigation').addClass('nav-fixed');
    }
    this.previousTop = currentTop;
});

// homepage parallax

$(window).scroll(function() {
    homepageParallax();
});
function homepageParallax() {
    var logo = $('#homepage_logo')
    // Get scroll position of window
    windowScroll = $(this).scrollTop();
    // Slow scroll of logo
    logo.css({
        'margin-top' : (windowScroll/1)+"px",
    })
    // Fade logo
    var percent = $(document).scrollTop() / ($(document).height() - $(window).height());
    logo.css('opacity', 1 - percent*7.5);
}

// Swiper on home page

var homeSwiper = new Swiper ('.homepage__slideshow', {
    loop : true,
    effect : 'coverflow',
    coverflow : {
        rotate : 50,
        stretch : 0,
        depth : 100,
        modifier : 1,
        slideShadows : true
    },
    autoplay : 6000,
    pagination : '.swiper-pagination',
    paginationType : 'progress',
    nextButton : '.swiper-button-next',
    prevButton : '.swiper-button-prev',
    slidesPerView: 1,
    keyboardControl : true,
    grabCursor : true,
    preloadImages : false,
    lazyLoading : true
});

$(window).on('load', function() {
    
	// loading screen won't fade until entire page has loaded
    
	$('#loading').fadeOut('slow');
    
    // typed.js
    
    $('#typed').typed({
        stringsElement : $('#typed-strings'),
        typeSpeed : 100,
        startDelay: 300,
        showCursor : true,
        // cursorChar : "&nbsp;&#9608;",
        cursorChar : " |",
        contentType : 'text'
    });
    setTimeout(function() {
        $('.typed-cursor').hide();
    }, 8000);
    
});