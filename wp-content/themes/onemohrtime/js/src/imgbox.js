/*
** imgBox v1.0.0 mdkieran.com
** ==========================
*/

(function ($, d) {
	'use strict';
	$.fn.imgBox = function () {
		// Private variables that are needed within the entire scope
		var $eImage;
		var $eCaption;
		var $ePrev;
		var $eNext;
		var $eFraction;
		var $list; // stores all of the items in the current set
		var numerator; // what number are you currently viewing in the set?
		var barType;
		var finalSrc;
		var finalCaption;
		// When clicking the chosen HTML element
		this.on('click.imgbox', function (e) {
			// Variables needed just within this scope
			var $eOverlay;
			var $eBar;
			var $eInfo;
			var $eNav;
			// Stop the browser from navigating away
			e.preventDefault();
			// Reset/reload these variables
			$list = {}; // Presume there are no items in the set
			barType = 0; // Presume we don't need the extras bar
			numerator = 0; // Presume this is the first item in the set
			// Get the required data from this HTML element
			finalSrc = this.href;
			finalCaption = $(this).data('caption');
			var thisSetName = $(this).data('set');
			// Was the 'data-set' attribute applied to this clicked element?
			if (thisSetName !== undefined) {
				// Fetch all HTML elements that are in this set
				$list = $('[data-set="' + thisSetName + '"]');
				// Were there at least 2 elements found?
				if ($list.length > 1) {
					// Then the full bar is definitely needed
					barType = 2;
					// Of all the images in this set, what number are we on?
					numerator = $list.index(this);
				}
			}
			// Is there a caption or do we need the full bar?
			if ((finalCaption !== undefined) || (barType === 2)) {
				// At the very least we need to create the bar with captions
				$eBar = $('<div/>', {'id': 'imgbox-bar'});
				$eInfo = $('<div/>', {'id': 'imgbox-information'});
				$eInfo.appendTo($eBar);
				$eCaption = $('<span/>', {'id': 'imgbox-caption'});
				$eCaption.appendTo($eInfo);
				// Now, do we also need the extra elements in the bar?
				if (barType === 2) {
					$eFraction = $('<span/>', {'id': 'imgbox-fraction'});
					$eFraction.prependTo($eInfo);
					$eNav = $('<div/>', {'id': 'imgbox-navigation', 'text': ' | '});
					$eNav.appendTo($eBar);
					$ePrev = $('<a/>', {'text': 'Prev'});
					$ePrev.prependTo($eNav);
					$eNext = $('<a/>', {'text': 'Next'});
					$eNext.appendTo($eNav);
				} else {
					// It's not the full bar, but it is there with captions
					barType = 1;
				}
			}
			// We always create the overlay and image elements
			$eOverlay = $('<div/>', {'id': 'imgbox-overlay'});
			$eImage = $('<img/>', {'id': 'imgbox-image'}).prependTo($eOverlay);
			// Now that all required elements have been created, update them
			loadData();
			// Now show all the elements, starting with the overlay
			$eOverlay.hide().appendTo('body').fadeIn(100, function () {
				// Once the overlay has faded in, show the bar if required
				if ( barType > 0 ) {
					$eBar.hide().appendTo($eOverlay).fadeIn(200, function () {
						// Create the necessary events for the bar
						$eBar.on('click.imgbox', function (e) {
							// Disable links and bubbling up within the bar
							e.stopPropagation();
							e.preventDefault();
						});
						// Only if it's a full bar do we want these events
						if (barType === 2) {
							$ePrev.on('click', function (e) {
								loadData('prev');
							});
							$eNext.on('click', function (e) {
								loadData('next');
							});
						}
					});
				}
			});
			// when clicking an element that the plugin has created
			$eOverlay.on('click.imgbox', function () {
				// fade the image out then remove
				// do i need this? $eImage.remove();
				$eOverlay.fadeOut(100, function () {
					// Delete the lightbox and any child event handlers
					$eOverlay.remove();
					// remove the listener on the document..
					$(d).off('keyup.imgbox');
				});
			});
			$(d).on('keyup.imgbox', function (e) {
				if (e.which === 37) {
					loadData('prev');
				} else if (e.which === 39) {
					loadData('next');
				}
			});
		});
		// Update the lightbox elements that already exist
		function loadData(change) {
			// Did the user click next or prev?
			switch (change) {
				case 'next':
					// Is there a next one?
					if ((numerator + 1) < $list.length) {
						numerator += 1;
					} else {
						// There isn't, esacpe the function & update nothing
						return;
					}
					break;
				case 'prev':
					if (numerator > 0) {
						numerator -= 1;
					} else {
						return;
					}
					break;
			}
			// Is the full bar being used? Update the extra elements if so
			if (barType === 2) {
				$eFraction.text((numerator + 1) + '/' + $list.length);
				// Does the new numerator have a prev or next image?
				if (numerator > 0) {
					$ePrev.attr('href', $list.get((numerator - 1)).href);
				}
				if ((numerator + 1) < $list.length) {
					$eNext.attr('href', $list.get((numerator + 1)).href);
				}
				// Get the data from $list instead of this/$(this)
				finalSrc = $list.get(numerator).href;
				finalCaption = $list.eq(numerator).data('caption');
			}
			// Fix & update the caption if needed
			if (barType > 0) {
				finalCaption = (finalCaption === undefined) ? '' : finalCaption;
				$eCaption.text(' ' + finalCaption);
			}
			// Update the image
			$eImage.attr('src', finalSrc);
		}
	};
})(jQuery, document);
