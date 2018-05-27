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

(function ($) {
	// Use this variable to set up the common and page specific functions. If you
	// rename this variable, you will also need to rename the namespace below.
	var Sage = {
		// All pages
		'common': {
			init: function () {
				// JavaScript to be fired on all pages
				
				// Bourbon refills nav
				$('#menu_toggle').on('click touchstart', function(e) {
					e.preventDefault();	
					// Open nav menu
					$('#desktop').toggleClass('is-visible');
					// Switch menu toggle
					$(this).toggleClass('open');
					changeLetters($(this));
					// Invert logo color
					$('#logo').toggleClass('inverted');
				});
				
				// Fade in content
				// Hide direct children of .fade-content element
				$('.fade-content > *').css({
					'opacity'   : '0',
					'transform' : 'translateY(' + 36 + 'px)'
				});
				// Trigger fade in as window scrolls
				$(window).on('scroll load', function(){
					$('.fade-content > *').each( function(i) {
						var bottom_of_object = $(this).offset().top + $(this).outerHeight() / 8;
						var bottom_of_window = $(window).scrollTop() + $(window).height();
						if( bottom_of_window > bottom_of_object ) {
							$(this).css({
								'opacity'   :'1',
								'transform' : 'translateY(' + 0 + 'px)'
							});
						} else {
							$(this).css({
								'opacity'   :'0',
								'transform' : 'translateY(' + 36 + 'px)'
							});
						}
					});
				});
				
				// click to smoothscroll
				$('a[href^="#"]').on('click', function(e) {
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
				
				// Easy Parallax
				$(window).on('scroll', function() {
					if($(window).scrollTop() < 1000) {
//						$('.homepage__banner--title').css('bottom', 0 + ($(window).scrollTop() * 0.05) + '%');
						$('.entry__header time').css('bottom', -100 + ($(window).scrollTop() * 0.15) + '%');
					}
					if(window.matchMedia('(min-width: 1024px)').matches) {
						$('#background').css('top', 0 - ($(window).scrollTop() * 0.015) + '%');
						$('#background').css('opacity', 1 - ($(window).scrollTop() * 0.0005));
					}
				});
				
				// Change MENU to EXIT
				function changeLetters(btn) {
					var m = $('.toggle__menu span.m'),
						e = $('.toggle__menu span.e'),
						n = $('.toggle__menu span.n'),
						u = $('.toggle__menu span.u');
					
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
				
				function lazyLoadImages() {
					var st = $(window).scrollTop();
					$('img.lazy').each(function () {
						var img = $(this);
						if (img.attr('src')) return;
						if (img.offset().top < $(window).height() + st) {
							img.attr('src', img.data('src'));
						}
					});
				}
				if ($('img.lazy').length > 0) {
					$(window).scroll(function () {
						lazyLoadImages();
					});
				}
				
				// Instagram API
				// https://rudrastyh.com/javascript/get-photos-from-instagram.html
//				var token = '3567722892.23a17ec.5d06e45c020048ccb85cc81744ee03b0',
//					userid = 3567722892,
//					num_photos = 4;
//					
//				$.ajax({
//					url : 'https://api.instagram.com/v1/users/' + userid + '/media/recent',
////					url : 'https://api.instagram.com/v1/users/self/media/recent',
//					dataType : 'jsonp',
//					type : 'GET',
//					data : {
//						access_token : token,
//						count        : num_photos
//					},
//					success : function(data) {
////						console.log(data);
//						for( x in data.data ) {
//							$('#latest_instagram').append('<figure class="widget__instagram--image"><img src="' + data.data[x].images.thumbnail.url + '" alt="' + data.data[x].caption.text + '" srcset="' + data.data[x].images.low_resolution.url + ' 306w, ' + data.data[x].images.standard_resolution.url + '" /><figcaption class="widget__instagram--caption"><p>' + data.data[x].caption.text + '</p><a href="' + data.data[x].link + '" class="btn" target="_blank"><span class="fa fa-instagram"></span> View on Instagram</a></figcaption><a href="' + data.data[x].link +'" title="View on Instagram" target="_blank" class="widget__instagram--link"></a></figure>');
////							 data.data[x].images.thumbnail.url - URL of image 150х150
////							 data.data[x].images.low_resolution.url - URL of image 306x306
////							 data.data[x].images.standard_resolution.url - URL of image 612х612
////							 data.data[x].link - Instagram post URL 
//						}
//					},
////					error : function(data) {
////						console.log(data);
////					}
//				});
				
				// Bourbon Refills parallax effect
				// refills.bourbon.io/components#parallax
				function parallax() {
					if ($('#js-parallax-window').length > 0) {
						var plxBackground = $('#js-parallax-background');
						var plxWindow = $('#js-parallax-window');
						
						var plxWindowTopToPageTop = $(plxWindow).offset().top;
						var windowTopToPageTop = $(window).scrollTop();
						var plxWindowTopToWindowTop = plxWindowTopToPageTop - windowTopToPageTop;
						
						var plxBackgroundTopToPageTop = $(plxBackground).offset().top;
						var windowInnerHeight = window.innerHeight;
						var plxBackgroundTopToWindowTop = plxBackgroundTopToPageTop - windowTopToPageTop;
						var plxBackgroundTopToWindowBottom = windowInnerHeight - plxBackgroundTopToWindowTop;
						var plxSpeed = 0.35;
						
						plxBackground.css('top', -(plxWindowTopToWindowTop * plxSpeed) + 'px');
					}
				}
				
				$(document).ready(function () {
					if ($('#js-parallax-window').length) {
						parallax();
					}
				});
				
				$(window).scroll(function (e) {
					if ($('#js-parallax-window').length) {
						parallax();
					}
				});
				
			},
			finalize: function () {
				// JavaScript to be fired on all pages, after page specific JS is fired
				
				// typed.js
//				$('#typed').typed({
//					stringsElement : $('#typed-strings'),
//					typeSpeed      : 100,
//					startDelay     : 300,
//					showCursor     : true,
//					cursorChar     : ' |',
//					contentType    : 'text'
//				});
//				setTimeout(function() {
//					$('.typed-cursor').fadeOut();
//				}, 8000);
				
			}
		},
		// Home page
		'home': {
			init: function () {
				// JavaScript to be fired on the home page
				
				// Swiper.js
				if ($('.header-swiper-front').length) {
//					var homeFrame2 = new Swiper('#home_frame_2', {
//						slidesPerView: 'auto',
//						centeredSlides: true,
//						spaceBetween: 100,
//						onlyExternal: true,
//						effect: 'coverflow',
//						direction: 'vertical',
//						speed: 600,
//						coverflowEffect: {
//							slideShadows: false
//						}
//					});
//					var homeFrame1 = new Swiper('#home_frame_1', {
//						slidesPerView   : 'auto',
//						centeredSlides  : true,
//						spaceBetween    : 300,
//						effect          : 'coverflow',
//						speed           : 600,
//						coverflowEffect : {
//							slideShadows : false
//						}
//					});
					var homeBanner = new Swiper('#home_banner', {
						initialSlide  : 1,
						watchOverflow : true,
						speed         : 600,
						keyboard      : {
							enabled : true,
						},
						pagination : {
							el             : '#home_banner .swiper-pagination',
							clickable      : true,
							dynamicBullets : true
						},
						navigation : {
							nextEl : '#home_banner .swiper-button-next',
							prevEl : '#home_banner .swiper-button-prev',
						},
//						controller : {
//							control : [homeFrame1, homeFrame2],
//							by      : 'container',
//						},
						parallax : true,
						a11y     : true,
					});
				}
				
			},
			finalize: function () {
				// JavaScript to be fired on the home page, after the init JS
				
				// Dribbble galleries
//				$.jribbble.setToken('8511e98bc154687719eb09e014c965b169369470f618d3bb478221accfa5b078');
//				$.jribbble.users('onemohrtime').shots({
//					per_page : 6,
//					sort : 'recent'
//				}).then(function(shots) {
//					var html = [];
//					shots.forEach(function(shot) {
//						html.push('<figure id="shot_' + shot.id + '" class="shot">');
//						html.push('<img src="' + shot.images.teaser + '" alt="' + shot.title + '" srcset="' + shot.images.normal + ' 400w, ' + shot.images.hidpi + ' 800w" class="shot__image" />');
//						html.push('<figcaption class="shot__hover">');
//						html.push('<a class="shot__link" href="' + shot.html_url + '" target="_blank" title="' + shot.title + '"></a>');
//						html.push('</figure>');
//					});
//					$('#dribbbles').html(html.join(''));
//					$('#no_shots').hide();
//				});
			}
		},
		// About us page, note the change from about-us to about_us.
		'about_us' : {
			init : function () {
				// JavaScript to be fired on the about us page
			}
		},
		// Featured Projects
		'design' : {
			init : function () {
				// JavaScript to be fired on the featured projects page
				
				// Parallax for projects
				$('.gallery__project--image').each(function () {
					var img = $(this);
					var imgParent = $(this).parent();
					
					function parallaxImg() {
						var speed = img.data('speed');
						var imgY = imgParent.offset().top;
						var winY = $(this).scrollTop();
						var winH = $(this).height();
						var parentH = imgParent.innerHeight();
						
						// The next pixel to show on screen      
						var winBottom = winY + winH;
						
						// If block is shown on screen
						if (winBottom > imgY && winY < imgY + parentH) {
							// Number of pixels shown after block appear
							var imgBottom = ((winBottom - imgY) * speed);
							// Max number of pixels until block disappear
							var imgTop = winH + parentH;
							// Porcentage between start showing until disappearing
							var imgPercent = ((imgBottom / imgTop) * 100) + (50 - (speed * 50));
						}
						img.css({
							top: imgPercent + '%',
							transform: 'translate(-50%, -' + imgPercent + '%)'
						});
					}
					$(document).on({
						scroll : function () {
							parallaxImg();
						},
						ready  : function () {
							parallaxImg();
						}
					});
				});
				
			}
		}
	};
	// The routing fires all common scripts, followed by the page specific scripts.
	// Add additional events for more control over timing e.g. a finalize event
	var UTIL = {
		fire: function (func, funcname, args) {
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
		loadEvents: function () {
			// Fire common init JS
			UTIL.fire('common');
			
			// Fire page-specific init JS, and then finalize JS
			$.each(document.body.className.replace(/-/g, '_').split(/\s+/), function (i, classnm) {
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

//;
//(function () {
//	function lazyLoadImages() {
//		var st = $(window).scrollTop();
//		$('img.lazy').each(function () {
//			var img = $(this);
//			if (img.attr('src')) return;
//			if (img.offset().top < $(window).height() + st) {
//				img.attr('src', img.data('src'));
//			}
//		});
//	}
//	if ($('img.lazy').length > 0) {
//		$(window).scroll(function () {
//			lazyLoadImages();
//		});
//	}
//	if (window.hljs) {
//		hljs.configure({
//			tabReplace: '    '
//		});
//		hljs.initHighlightingOnLoad();
//	}
//	if ($('.header-swiper-front').length) {
//		var swiperBack2 = new Swiper('.header-swiper-back-2', {
//			slidesPerView: 'auto',
//			centeredSlides: true,
//			spaceBetween: 100,
//			onlyExternal: true,
//			effect: 'coverflow',
//			direction: 'vertical',
//			speed: 600,
//			coverflowEffect: {
//				slideShadows: false
//			}
//		});
//		var swiperBack1 = new Swiper('.header-swiper-back-1', {
//			slidesPerView: 'auto',
//			centeredSlides: true,
//			spaceBetween: 300,
//			effect: 'coverflow',
//			speed: 600,
//			coverflowEffect: {
//				slideShadows: false
//			}
//		});
//		var swiperFront = new Swiper('.header-swiper-front', {
//			slidesPerView: 'auto',
//			centeredSlides: true,
//			spaceBetween: 100,
//			effect: 'coverflow',
//			speed: 600,
//			coverflowEffect: {
//				slideShadows: false
//			},
//			pagination: {
//				el: '.header-swiper-front .swiper-pagination',
//				clickable: true,
//			},
//			navigation: {
//				nextEl: '.header-swiper-front .swiper-button-next',
//				prevEl: '.header-swiper-front .swiper-button-prev',
//			},
//			controller: {
//				control: [swiperBack1, swiperBack2],
//				by: 'container',
//			},
//			keyboard: true,
//			a11y: true,
//			on: {
//				slideChange: function () {
//					var s = this;
//					if (s.activeIndex === $('.swiper-slide-gallery').index()) {
//						$(s.el).find('.swiper-pagination').hide();
//					} else {
//						$(s.el).find('.swiper-pagination').show();
//					}
//				}
//			}
//		});
//		var galleryTopSwiper = new Swiper('.swiper-gallery-top', {
//			slidesPerView: 1,
//			spaceBetween: 10,
//			nested: true,
//			resistanceRatio: 0,
//			preloadImages: false,
//			lazy: true,
//		});
//		var galleryThumbsSwiper = new Swiper('.swiper-gallery-thumbs', {
//			slidesPerView: 5,
//			spaceBetween: 10,
//			centeredSlides: true,
//			touchRatio: 0.2,
//			slideToClickedSlide: true,
//			nested: true,
//			resistanceRatio: 0,
//		});
//		galleryTopSwiper.controller.control = galleryThumbsSwiper;
//		galleryThumbsSwiper.controller.control = galleryTopSwiper;
//	}
//	$('body').prepend('<div id="fb-root"></div>');
//	(function (d, s, id) {
//		var js, fjs = d.getElementsByTagName(s)[0];
//		if (d.getElementById(id)) return;
//		js = d.createElement(s);
//		js.id = id;
//		js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5&appId=129338113911206";
//		fjs.parentNode.insertBefore(js, fjs);
//	}(document, 'script', 'facebook-jssdk'));
//	(function (d, s, id) {
//		var js, fjs = d.getElementsByTagName(s)[0],
//			p = /^http:/.test(d.location) ? 'http' : 'https';
//		if (!d.getElementById(id)) {
//			js = d.createElement(s);
//			js.id = id;
//			js.src = p + '://platform.twitter.com/widgets.js';
//			fjs.parentNode.insertBefore(js, fjs);
//		}
//	})(document, 'script', 'twitter-wjs');
//	(function () {
//		var po = document.createElement('script');
//		po.type = 'text/javascript';
//		po.async = true;
//		po.src = 'https://apis.google.com/js/platform.js';
//		var s = document.getElementsByTagName('script')[0];
//		s.parentNode.insertBefore(po, s);
//	})();
//	var iframeTimeout;
//
//	function lazyLoadDemos() {
//		$('.demo').each(function () {
//			var frameHolder = $(this).find('.demo-iframe');
//			if (frameHolder.hasClass('loaded')) return;
//			var frame = frameHolder.find('iframe');
//			var src = frame.attr('data-src');
//			if (frameHolder.offset().top + frameHolder.height() < $(window).scrollTop()) {
//				return;
//			}
//			if (frameHolder.offset().top < ($(window).scrollTop() + $(window).height() + 50)) {
//				frameHolder.addClass('loaded');
//				frame.attr('src', src);
//			}
//		});
//	}
//	if ($('.demo').length > 0) {
//		$('.demo').each(function () {
//			var t = $(this);
//			var demoFile = t.find('iframe').attr('data-src');
//			t.find('.demo-link-new-window').attr('href', demoFile);
//			t.find('.demo-link-source').attr('href', 'https://github.com/nolimits4web/Swiper/blob/master/demos/' + demoFile);
//		});
//		$(window).on('scroll resize', function () {
//			clearTimeout(iframeTimeout);
//			iframeTimeout = setTimeout(function () {
//				lazyLoadDemos();
//			}, 500);
//		});
//		lazyLoadDemos();
//	}
//})();