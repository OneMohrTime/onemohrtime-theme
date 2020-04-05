/* ========================================================================
 * Scripts / Main
 * ======================================================================== */

// Declare javascript, basically
jQuery( function( $ ) {
	var doc = document.documentElement;

	doc.className = doc.className.replace( 'no-js', 'has-js' );
	doc.setAttribute( 'data-useragent', navigator.userAgent );
	doc.setAttribute( 'data-platform', navigator.platform );

	///////////////
	// FUNCTIONS //
	///////////////

	// Change MENU to EXIT
	function changeLetters( btn ) {
		var m = $( '.toggle__menu span.m' ),
			e = $( '.toggle__menu span.e' ),
			n = $( '.toggle__menu span.n' ),
			u = $( '.toggle__menu span.u' );

		e.toggleClass( 'toggle__close' );

		if ( btn.hasClass( 'open' ) ) {
			m.text( 'E' );
			n.text( 'I' );
			u.text( 'T' );
		} else {
			m.text( 'M' );
			n.text( 'N' );
			u.text( 'U' );
		}
	}

	// Multilevel links
	// $('.multilevel-link').on('click touchstart', function() {
	// 	$(this).next('ul').animate({
	// 		width : 'toggle'
	// 	}, 200);
	// });


	/**
	 * Convert WordPress Block Galleries into Masonry layout
	 */

	const wpGallery = $( '.wp-block-gallery .blocks-gallery-grid' );

	if ( wpGallery ) {
		let sizer  = $( '<li class="blocks-gallery-sizer"></li>' );
		let gutter = $( '<li class="blocks-gallery-gutter"></li>' );
		wpGallery.prepend( sizer, gutter );

		// reorganize with Masonry
		wpGallery.isotope({
			itemSelector: '.blocks-gallery-item',
			percentPosition: true,
			masonry: {
				columnWidth: '.blocks-gallery-sizer',
				gutter: '.blocks-gallery-gutter',
				horizontalOrder: true,
			}
		});

		// add .get-faded class
		wpGallery.parent().addClass( 'get-faded' );

		// add fancybox attribute
		wpGallery.children().each( function( i, e ) {
			$( e ).find( 'a' ).attr( 'data-fancybox', 'image' );
		});
	}


	/**
	 * Convert WordPress Block Galleries into Masonry layout
	 */

	const pageGallery = $( '#images' );

	if ( pageGallery ) {

		// reorganize with Masonry
		pageGallery.isotope({
			itemSelector: '.image',
			percentPosition: true,
			masonry: {
				columnWidth: '.-sizer',
				gutter: '.-gutter',
				horizontalOrder: true,
			}
		});
	}

	// Slide nav menu up and down
	// Initial scroll position
	var scrollState = 0;

	// Store navbar classes
	var navClasses = document.getElementById( 'masthead' ).classList;

	// returns current scroll position
	var scrollTop = function() {
		return window.scrollY;
	};

	// Primary scroll event function
	var scrollDetect = function( home, down, up ) {

		// Current scroll position
		var currentScroll = scrollTop();
		if ( 0 === scrollTop() ) {
			home();
		} else if ( currentScroll > scrollState ) {
			down();
		} else {
			up();
		}

		// Set previous scroll position
		scrollState = scrollTop();
	};

	function homeAction() {
		// console.log( 'home' );
	}

	function downAction() {
		navClasses.remove( 'slide--down' );
		navClasses.add( 'slide--up' );
	}

	function upAction() {
		navClasses.remove( 'slide--up' );
		navClasses.add( 'slide--down' );
	}

	window.addEventListener( 'scroll', function() {
		scrollDetect( homeAction, downAction, upAction );
	});

	// Add or remove scrolling navbar classes
	$( window ).scroll( function() {
		if ( 50 < $( document ).scrollTop() ) {
			$( 'nav' ).addClass( 'transparent' );
		} else {
			$( 'nav' ).removeClass( 'transparent' );
		}
	});

	// // click to smoothscroll
	// $( '.content-area a[href^="#"]' ).on( 'click', function( e ) {
	// 	e.preventDefault();
	// 	$( 'html,body' ).animate({
	// 		scrollTop: $( this.hash ).offset().top
	// 	}, 1500 );
	// });

	// add scrolling class to contact
	$( 'a[href^="#contact"]' ).on( 'click', function() {
		$( '#contact' ).addClass( 'said-hi' );
		$( '#mobile_menu' ).removeClass( 'is-visible' );
	});

	// Filter & sort design projects
	const designGallery = $( '#gallery' );
	// if ( designGallery ) {
	// 	designGallery.isotope({
	// 		filter: '*'
	// 	})
	// }

	// END FUNCTIONS

	/////////////////////
	// BEGIN GREENSOCK //
	/////////////////////

	// Init ScrollMagic
	const scrollMagicController = new ScrollMagic.Controller({
		globalSceneOptions: {
			triggerHook: 0.8
		}

		// addIndicators : true
	});

	// Viewport in log
	const viewportWidth  = window.innerWidth;
	const viewportHeight = window.innerHeight;
	console.log( 'Current viewport: ' +  viewportWidth + 'w × ' + viewportHeight + 'h' );

	// Mobile menu
	var mobileToggle    = $( '#menu_toggle' ),
		navbar          = $( '#masthead' ),
		mobileMenu      = $( '#desktop_menu' ),
		desktopMenu     = $( '#primary_nav' ),
		menuItems       = $( '#desktop_menu' ).children(),
		menuDuration    = 0.3,
		menuBetween     = 0.05,
		mobileTimeline  = new TimelineMax({ paused: true, delay: 1 }),
		desktopTimeline = new TimelineMax(),
		$this           = $( this );

	if ( 601 > viewportWidth ) {

		// TODO: New Menu
		// https://codepen.io/mikeK/pen/GyPYPZ

		mobileTimeline.to( navbar, menuDuration, {
			height: '100%',
			opacity: 1,
			ease: Power2.easeOut
		}, 0 ).to( mobileMenu, menuDuration, {
			top: 0,
			autoAlpha: 1,
			ease: Power2.easeOut
		}, 0 ).staggerFrom( menuItems, menuDuration, {
			y: 20,
			opacity: 0,
			ease: Back.easeOut
		}, menuBetween );

		navbar.on( 'click', '#menu_toggle', function() {
			if ( 0 < mobileTimeline.time() ) {
				mobileTimeline.reverse();
			} else {
				mobileTimeline.play( 0 );
			}

			// change MENU to EXIT
			mobileToggle.toggleClass( 'open' );
			changeLetters( mobileToggle );

			// Add padding to navbar area
			$( '#page' ).toggleClass( 'padded' );
		});
	} else {
		desktopTimeline.to( desktopMenu, menuDuration, {
			y: -100
		}, 0 );

		navbar.on( 'click', '#menu_toggle', function() {
			if ( 0 < desktopTimeline.time() ) {
				desktopTimeline.reverse();
			} else {
				desktopTimeline.play( 0 );
			}
			mobileToggle.toggleClass( 'open' );

			// change MENU to EXIT
			changeLetters( mobileToggle );

			// Invert logo color
			$( '#logo' ).toggleClass( 'inverted' );

			// Add padding to navbar area
			$( '#page' ).toggleClass( 'padded' );
		});
	}

	// END GREENSOCK

	///////////////////////
	// BEGIN SCROLLMAGIC //
	///////////////////////

	// Parallax images
	$( '.parallax' ).each( function() {
		var parallaxParent = this,
			parallaxChild  = $( this ).children( '.parallax__image' );

		if ( 840 <= viewportWidth ) {

			var tweenParallax = new TimelineMax()
				.to( parallaxChild, 1, {
					y: '80%',
					ease: Linear.easeNone
				});

			var parallaxScene = new ScrollMagic.Scene({
				triggerElement: parallaxParent,
				duration: '200%'
			})
				.setTween( tweenParallax )
				.setClassToggle( this, 'parallax--scrolling' )
				.addTo( scrollMagicController );
		}
	});

	// Fade in content blocks
	$( '.get-faded' ).each( function() {
		var fadeParent   = this,
			fadeChild    = $( this ).children(),
			fadeDuration = 0.3,
			fadeBetween  = 0.3;

		var tweenFade = new TimelineMax()
			.staggerTo( fadeChild, fadeDuration, {
				y: 0,
				autoAlpha: 1
			}, fadeBetween );

		var fadeScene  = new ScrollMagic.Scene({
			triggerElement: fadeParent,
			triggerHook: 1,
			reverse: false
		})
			.setTween( tweenFade )
			.setClassToggle( fadeChild, 'got-faded' )
			.addTo( scrollMagicController );
	});

	// END SCROLLMAGIC

	////////////////
	// BEGIN APIS //
	////////////////

	// load google fonts with webfont loader
	const WebFontConfig = {
		google: {
			families: [ 'Barlow Semi Condensed:400,700', 'Barlow:400,700', 'Abril Fatface' ]
		},
		timeout: 2000
	};
	( function( d ) {
		var wf = d.createElement( 'script' ),
			s = d.scripts[0];
		wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
		wf.async = true;
		s.parentNode.insertBefore( wf, s );
	}( document ) );

	// Dribbble galleries
	// Set the Access Token
	var accessToken   = '49a19ad15272251972056008d1f46e1be28cca04264a5ddf535cb735a2bf2ac6',
		numberOfShots = '6';

	// Call Dribble v2 API
	$.ajax({
		url: 'https://api.dribbble.com/v2/user/shots?per_page=' + numberOfShots + '&access_token=' + accessToken,
		dataType: 'json',
		type: 'GET',
		success: function( data ) {
			if ( 0 < data.length ) {
				$.each( data.reverse(), function( i, val ) {
					$( '#dribbbles' ).prepend(
						'<figure id="shot_' + val.id + '" class="shot"><a class="shot__link" href="' + val.html_url + '" target="_blank" title="' + val.title + '"></a><img src="' + val.images.teaser + '" alt="' + val.title + '" srcset="' + val.images.normal + ' 400w, ' + val.images.hidpi + ' 800w" class="shot__image" /><figcaption class="shot--hover">' + val.title + '<span class="shot__description">' + val.description + '</span></figcaption></figure>'
					);
				});
			} else {
				$( '#dribbbles' ).append( '<code>Error loading shots. Try <a href="javascript:history.go(0);">reloading</a> the page?</code>' );
			}
		}
	});

	// getDribbbles: function(access_token) {
	// 	$.getJSON('https://api.dribbble.com/v2/user/shots?access_token=' + access_token).success(function(data) {
	// 		for (i = 0; i < 6; i++) {
	// 			var shotId = data[i].id,
	// 				shotImg = data[i].images.normal,
	// 				shotTitle = data[i].title,
	// 				shotDate = data[i].created_at,
	// 				shotUrl = data[i].html_url;
	// 			$('.dribbble-list').append('<li class="dribbble-list__item grid-col"><a href="' + shotUrl + '"><article class="dribbble"><header class="dribbble__detail"><h1 class="dribbble__title">' + shotTitle + '</h1></header><img class="dribbble__thumb" src="' + shotImg + '" width="320" height="240" alt="' + shotTitle + '" /></article></a></li>');
	// 		}
	// 	});
	// },

	// END APIS

	// Home page
	// JavaScript to be fired on the home page
	// var titleTimeline = new TimelineMax();

	// titleTimeline.staggerFromTo( '.line', 1, {
	// 	width: 0,
	// 	opacity: 0
	// },
	// {
	// 	x: -200,
	// 	width: '50%',
	// 	opacity: 0
	// },
	// 0.15 );
	// titleTimeline.staggerTo( '.line', 0.7, {
	// 	x: 0,
	// 	width: 100,
	// 	opacity: 1
	// });

	$( function() {
		$( '#home_banner_list' ).removeClass( 'is-hidden' );
	});
});
