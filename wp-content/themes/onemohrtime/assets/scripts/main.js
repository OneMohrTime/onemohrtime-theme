/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can
 * always reference jQuery with $, even when in .noConflict() mode.
 * ======================================================================== */

(function($) {

  // Use this variable to set up the common and page specific functions. If you
  // rename this variable, you will also need to rename the namespace below.
  var Sage = {
	// All pages
	'common': {
	  init: function() {
		// JavaScript to be fired on all pages
	  },
	  finalize: function() {
		// JavaScript to be fired on all pages, after page specific JS is fired
	  }
	},
	// Home page
	'home': {
	  init: function() {
		// JavaScript to be fired on the home page
	  },
	  finalize: function() {
		// JavaScript to be fired on the home page, after the init JS
	  }
	},
	// About us page, note the change from about-us to about_us.
	'about_us': {
	  init: function() {
		// JavaScript to be fired on the about us page
	  }
	}
  };

  // The routing fires all common scripts, followed by the page specific scripts.
  // Add additional events for more control over timing e.g. a finalize event
  var UTIL = {
	fire: function(func, funcname, args) {
	  var fire;
	  var namespace = Sage;
	  funcname = (funcname === undefined) ? 'init' : funcname;
	  fire = func !== '';
	  fire = fire && namespace[func];
	  fire = fire && typeof namespace[func][funcname] === 'function';

	  if (fire) {
		namespace[func][funcname](args);
	  }
	},
	loadEvents: function() {
	  // Fire common init JS
	  UTIL.fire('common');

	  // Fire page-specific init JS, and then finalize JS
	  $.each(document.body.className.replace(/-/g, '_').split(/\s+/), function(i, classnm) {
		UTIL.fire(classnm);
		UTIL.fire(classnm, 'finalize');
	  });

	  // Fire common finalize JS
	  UTIL.fire('common', 'finalize');
	}
  };

  // Load Events
  $(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.

$(document).ready(function() {

	// bourbon refills nav
	$('#menu_toggle').on('click touchstart', function(e) {
		// Open nav menu
		$('#mobile_menu').toggleClass('is-visible');
		
		// Switch menu toggle
		$(this).toggleClass('open');
		changeLetters($(this));
		
		// force body freeze
		$('body').toggleClass('unscrollable');
		
		e.preventDefault();	
	});
	
	// Hide direct children of .fade-content element
	$('.fade-content > *').css({
		'opacity':'0',
		'transform': 'translateY(' + 36 + 'px)'
	});
	
	// Trigger fade in as window scrolls
	$(window).on('scroll load', function(){
		$('.fade-content > *').each( function(i) {
			var bottom_of_object = $(this).offset().top + $(this).outerHeight() / 8;
			var bottom_of_window = $(window).scrollTop() + $(window).height();
			if( bottom_of_window > bottom_of_object ) {
				$(this).css({
					'opacity' :'1',
					'transform' : 'translateY(' + 0 + 'px)'
				});
			} else {
				$(this).css({
					'opacity' :'0',
					'transform' : 'translateY(' + 36 + 'px)'
				});
			}
		});
	});

	// click to smoothscroll
	$('a[href^="#"]').on('click',function(e) {
		e.preventDefault();
		$('html,body').animate({
			scrollTop : $(this.hash).offset().top
		}, 1500);
	});
	
	// add scrolling class to contact
	$('a[href^="#contact"]').on('click', function() {
		$('#contact').addClass('said-hi');
		$('#mobile_menu').removeClass('is-visible');
		$('body').removeClass('unscrollable');
	});

	// Text Rotator
	$('.rotate').each(function() {
		var el = $(this);
		var text = $(this).html().split(",");
		el.html(text[0]);
		setInterval(function () {
			el.animate({
				textShadowBlur : 20,
				opacity : 0
			}, 500, function () {
				index = $.inArray(el.html(), text);
				if ((index + 1) == text.length) index = -1;
				el.text(text[index + 1]).animate({
					textShadowBlur : 0,
					opacity : 1
				}, 500);
			});
		}, 2000);
	});

	// Sticky-kit
	if(window.matchMedia('(min-width: 768px)').matches) {
		$('.halfie__img, .entry__featured-image--frame').stick_in_parent();
	}
	
	// Easy Parallax
	$(window).on('scroll', function() {
		if($(window).scrollTop() < 1000) {
			$('.homepage__banner--title').css('bottom', 0 + ($(window).scrollTop() * 0.05) + '%');
			$('.entry__header time').css('bottom', -100 + ($(window).scrollTop() * 0.15) + '%');
		}
		if(window.matchMedia('(min-width: 1024px)').matches) {
			$('#background').css('top', 0 - ($(window).scrollTop() * 0.015) + '%');
			$('#background').css('opacity', 1 - ($(window).scrollTop() * 0.0005));
		}
	});
	
	// Dribbble galleries
	$.jribbble.setToken('8511e98bc154687719eb09e014c965b169369470f618d3bb478221accfa5b078');
	$.jribbble.users('onemohrtime').shots({
		per_page : 6,
		sort : 'recent'
	}).then(function(shots) {
		var html = [];
		shots.forEach(function(shot) {
			html.push('<figure id="shot_' + shot.id + '" class="shot">');
			html.push('<img src="' + shot.images.teaser + '" alt="' + shot.title + '" srcset="' + shot.images.normal + ' 400w, ' + shot.images.hidpi + ' 800w" class="shot__image" />');
			html.push('<figcaption class="shot__hover">');
			html.push('<a class="shot__link" href="' + shot.html_url + '" target="_blank" title="' + shot.title + '"></a>');
			html.push('</figure>');
		});
		$('#dribbbles').html(html.join(''));
	});
	
	// Instagram API
	// https://rudrastyh.com/javascript/get-photos-from-instagram.html
	var token = '3567722892.23a17ec.5d06e45c020048ccb85cc81744ee03b0',
		userid = 3567722892,
		num_photos = 4;
	
	$.ajax({
		url : 'https://api.instagram.com/v1/users/' + userid + '/media/recent',
//		url : 'https://api.instagram.com/v1/users/self/media/recent',
		dataType : 'jsonp',
		type : 'GET',
		data : {
			access_token : token,
			count : num_photos
		},
		success : function(data) {
//			console.log(data);
			for( x in data.data ) {
				$('#latest_instagram').append('<figure class="widget__instagram--image"><img src="' + data.data[x].images.thumbnail.url + '" alt="' + data.data[x].caption.text + '" title="' + data.data[x].caption.text + '" srcset="' + data.data[x].images.low_resolution.url + ' 306w, ' + data.data[x].images.standard_resolution.url + '" /><a href="' + data.data[x].link +'" target="_blank" class="widget__instagram--link"></a></figure>');
				// data.data[x].images.thumbnail.url - URL of image 150х150
				// data.data[x].images.low_resolution.url - URL of image 306x306
				// data.data[x].images.standard_resolution.url - URL of image 612х612
				// data.data[x].link - Instagram post URL 
			}
		},
//		error : function(data) {
//			console.log(data);
//		}
	});

});

// menu visible when scrolling up
var headerHeight = $('#desktop').height();
$(window).on('scroll', {previousTop : 0}, function() {
	var currentTop = $(window).scrollTop();
	//check if user is scrolling up
	if (currentTop < this.previousTop ) {
		//if scrolling up...
		if (currentTop > 0 && $('#desktop').hasClass('nav-fixed')) {
			$('#desktop').addClass('nav-visible');
		} else {
			$('#desktop').removeClass('nav-visible nav-fixed');
		}
	} else {
		//if scrolling down...
		$('#desktop').removeClass('nav-visible');
		if( currentTop > headerHeight && !$('#desktop').hasClass('nav-fixed')) $('#desktop').addClass('nav-fixed');
	}
	this.previousTop = currentTop;
});

// Change MENU to EXIT
function changeLetters(btn) {
	var m = $('.toggle__menu span.m');
	var e = $('.toggle__menu span.e');
	var n = $('.toggle__menu span.n');
	var u = $('.toggle__menu span.u');

	e.toggleClass('toggle__close');

	if(btn.hasClass('open')) {
		m.text('E');
		n.text('I');
		u.text('T');
	} else {
		m.text('M');
		n.text('N');
		u.text('U');
	}
}

$(window).on('load', function() {

	// loading screen won't fade until entire page has loaded
//	$('#loading').fadeOut('slow');

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