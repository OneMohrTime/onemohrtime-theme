$(document).ready(function() {
	
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
    
	// Fancybox 2.1.5
	$('.fancybox').fancybox({
		padding : 0,
		margin : 5,
		openEffect : 'elastic',
		closeEffect : 'none',
		helpers : {
			media : true
		}
	});
	
	// click to scroll
	$('.scroll').click(function(e){
		e.preventDefault();
		$('html,body').animate({scrollTop:$(this.hash).offset().top}, 1500);
	});
	
	// toggle About sections
    $('.toggle-hidden').hide();
    $('.toggle-show').click(function(){
        $(this).parent().not('.toggle-active').toggleClass('toggle-active');
        $('.toggle-hidden:visible').slideToggle().parent().removeClass('toggle-active');
		$(this).next('.toggle-hidden:hidden').slideToggle();
        //$('.toggle-hidden').slideToggle();
    });
    
    // Remove inline anchor styles from images
    $('#content a > img').parent().addClass('no-style');
    
    // Sticky-kit
    $('.blog #secondary').stick_in_parent();
	
	// remove fancybox on mobile devices
	if (window.matchMedia('(max-width: 768px)').matches) {
		$('.fancybox').removeClass('fancybox').attr('target','_blank');
	};
    
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
    
    // Dribbble
    $.jribbble.setToken('8511e98bc154687719eb09e014c965b169369470f618d3bb478221accfa5b078');
    $.jribbble.users('onemohrtime').shots({
        per_page: 12
    }).then(function(shots) {
        var html = [];
        shots.forEach(function(shot) {
            html.push('<figure class="shot">');
            html.push('<a href="' + shot.html_url + '" target="_blank">');
            html.push('<img src="' + shot.images.normal + '" class="img-responsive" />');
            html.push('</a></figure>');
        });
        $('.shots').html(html.join(''));
    });
	
});

//$(window).load(function() {
$(window).on('load', function() {

	// loading screen won't fade until entire page has loaded
	$('#loading').fadeOut('slow');
	
});