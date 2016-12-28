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
    
    // imgbox.js
    $('.imgbox').imgBox();
	
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
    
    // Remove inline anchor styles from certain elements
    $('#content a > img:not(.imgbox)').parent().addClass('no-style');
    $('.sharedaddy a').addClass('btn');
    $('.gallery-pagination-span a').addClass('btn');
    
    // Sticky-kit
    //if (window.matchMedia('(max-width: 1279px)').matches) {
		$('.entry-featured-image-frame').stick_in_parent();
	//};
	
	// remove fancybox on mobile devices
	if (window.matchMedia('(max-width: 768px)').matches) {
		$('.imgbox').removeClass('imgbox').attr('target','_blank');
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
            html.push('<div class="dribbble">');
            html.push('<div class="dribbble-shot">');
            html.push('<figure class="dribbble-img">');
            html.push('<a class="dribbble-link" href="' + shot.html_url + '" target="_blank" title="' + shot.title + '">');
            html.push('<img src="' + shot.images.normal + '" alt="' + shot.title + ' />');
            html.push('</a>');
            html.push('<a class="dribbble-over" href="' + shot.html_url + '" target="_blank">');
            html.push('<h6>' + shot.title + '</h6>');
            html.push('<p class="views"><span class="fa fa-eye"></span> ' + shot.views_count + '</p>');
            html.push('</a>');
            html.push('</figure>');
            html.push('</div>');
            html.push('</div>');
        });
        $('.dribbbles').html(html.join(''));
    });
	
});

//$(window).load(function() {
$(window).on('load', function() {

	// loading screen won't fade until entire page has loaded
	$('#loading').fadeOut('slow');
	
});