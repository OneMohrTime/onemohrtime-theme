=== Shoreditch ===

Contributors: automattic

Requires at least: 4.5
Tested up to: 4.6.1
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

== Description ==

Shoreditch is a functional and responsive theme perfect for your business’s online presence. Although its main purpose is business, Shoreditch looks great as a personal blog theme too.

* Responsive layout.
* Panel Page Template.
* Full-Width Page Template.
* Jetpack.me compatibility for Infinite Scroll, Social Menu and Testimonial Custom Post Type.
* The GPL v2.0 or later license. :) Use it to make something cool.

== Installation ==
	
1. In your admin panel, go to Appearance > Themes and click the Add New button.
2. Click Upload and Choose File, then select the theme's .zip file. Click Install Now.
3. Click Activate to use your new theme right away.

== Frequently Asked Questions ==

= I don't see the Testimonial menu in my admin, where can I find it? =

To make the Testimonial menu appear in your admin, you need to install the [Jetpack plugin](http://jetpack.me) because it has the required code needed to make [custom post types](http://codex.wordpress.org/Post_Types#Custom_Post_Types) work for the theme.

Once Jetpack is active, the Testimonial menu will appear in your admin, in addition to standard blog posts. No special Jetpack module is needed and a WordPress.com connection is not required for the Testimonial feature to function. Testimonial will work on a localhost installation of WordPress if you add this line to `wp-config.php`:

`define( 'JETPACK_DEV_DEBUG', TRUE );`

= How to setup the front page like the demo site? =

The demo site URL: http://shoreditchdemo.wordpress.com/?demo

When you first activate Shoreditch, you’ll see your posts in a traditional blog format. If you’d like to use the Panel Page Template as the Front Page of your site, as the demo site does, it’s simple to configure:

1. Create or edit a page, and assign it to the Panel Page Template from the Page Attributes module.
2. Go to Settings > Reading and set “Front page displays” to “A static page”.
3. Select the page you just assigned the Panel Page Template to as “Front page” and set another page as the “Posts page” to display your blog posts.
4. Add some [subpages](https://codex.wordpress.org/Pages#To_create_a_subpage) to the page to which you just assigned the Panel Page Template.

== Quick Specs (all measurements in pixels) ==

1. The main column width is 580 except when using the Panel Page Template or Full-Width Page Template where it’s 900.
2. A widget in the sidebar and a widget in the footer when it’s a 3-column layout is 260.
3. A widget in the footer when it’s a one-column layout is 900.
4. A widget in the footer when it’s a two-column layout is 450.
5. Featured Images for posts and pages are 2000 wide by 1500 high.
6. Featured Images for testimonials are 150 wide by 150 high.

== Credits ==

* Based on Underscores http://underscores.me/, (C) 2012-2016 Automattic, Inc., licensed under [GPL2](https://www.gnu.org/licenses/gpl-2.0.html)
* normalize.css http://necolas.github.io/normalize.css/, (C) 2012-2016 Nicolas Gallagher and Jonathan Neal, licensed under [MIT](http://opensource.org/licenses/MIT)
* Genericons: font by Automattic (http://automattic.com/), licensed under [GPL2](https://www.gnu.org/licenses/gpl-2.0.html)
* Images: images by Unsplash (https://unsplash.com), licensed under [CC0](http://creativecommons.org/choose/zero/)
** https://hd.unsplash.com/photo-1438302439441-82e18f791f5e
** https://hd.unsplash.com/photo-1432888498266-38ffec3eaf0a

== Changelog ==

= 5 October 2017 =
* Adds full WooCommerce integration.

= 25 August 2017 =
* Replace line of smarter featured image code that was not compatible with PHP 5.3.x, for backwards compatibility; also minor formatting
* Fix incorrect variable name when checking the tag list; update version number.

= 22 August 2017 =
* Add theme support for Eventbrite to hook up the template files.
* Move eventbrite templates into an eventbrite directory to match current file naming standards.
* Add Eventbrite-compatible templates.

= 12 July 2017 =
* Make sure label are visible on the front page when panel has a background image

= 28 June 2017 =
* Slightly resize icons for the Social Icons widget

= 6 June 2017 =
* Style the Social Icons widget.

= 28 April 2017 =
* Add support for Smarter Featured Images, turned off by default.

= 19 April 2017 =
* Update WooCommerce support to 3.0

= 22 March 2017 =
* add Custom Colors annotations directly to the theme
* move fonts annotations directly into the theme

= 3 March 2017 =
* Updating menu styles so they display correctly in IE11.

= 9 February 2017 =
* Check for is_wp_error() in cases when using get_the_tag_list() to avoid potential fatal errors.
* Add support for WooCommerce

= 2 February 2017 =
* remove from CSS in wp-content/themes/pub

= 18 January 2017 =
* Add translation of Headstart annotation

= 17 January 2017 =
* Remove portfolio tag from non-portfolio CPT themes.

= 29 December 2016 =
* clean up retired a8c widget Time Machine styles.

= 9 December 2016 =
* Remove the widont filter because of the limited space for post/page title in the design.
* Add style for MailChimp Subscriber Popup widget.
* Add attachement.php to output properly attachment pages.

= 30 November 2016 =
* Fix Content Options Featured Images undeclared variable by adding extra check to make sure variable is set

= 23 November 2016 =
* Hide Featured Image on single posts view outside of the loop

= 22 November 2016 =
* Update Featured Image with 2 options for page and post

= 18 November 2016 =
* Add support for Content Options: Featured Image

= 31 October 2016 =
* Fix header image link width.

= 6 October 2016 =
* Updated WordPress tested version
* Remove Flexslider enqueue script prefix
* Prefix localized object name
* Replace depercated HEADER_TEXTCOLOR variable

= 4 October 2016 =
* Add the new `fixed-menu` feature tag to the stylesheet.

= 2 September 2016 =
* Update Content Options Post Details with prefix for the classes

= 24 August 2016 =
* Fix typo in function_exists
* Replaces "[...]" (appended to automatically generated excerpts) with ... and a 'Continue reading' link.

= 11 August 2016 =
* Add a Headstart annotation for the theme.

= 21 July 2016 =
* Remove class in author bio that was used for testing
* Add support for Content Options (a8c-only)

= 11 July 2016 =
* adds in one-page to style.css

= 27 May 2016 =
* Fix a PHP warning
* Fix PHP warnings.

= 7 May 2016 =
* Change empty function to check for false instead, for PHP 5.5 or earlier.

= 29 April 2016 =
* Fix sub-menu item breaking up page width

= 28 April 2016 =
* Update description
* Update readme

= 26 April 2016 =
* Testimonial archive page was using the wrong featured image size

= 22 April 2016 =
* Make sure audio player offscreen text isn't breaking layout when rtl
* Multiple CSS changes:

= 21 April 2016 =
* Add extremely basic rtl stylesheet -- still under development
* Update Custom Header image. Make sure it's not always full-width -- would like terrrible if user decides to use a logo here...

= 20 April 2016 =
* Remove box-shadow from related-posts (only on hover)
* Remove margin from nav and add padding to content

= 19 April 2016 =
* Fix not found paddings and content area on larger devices
* Page Title had the wrong font size
* Major update to theme: Reduce margin between posts on archive/blog/search view
* Visually reduce size of dropdown toggles
* Fix typo in classname
* Add missing style for pre/code/etc... when top footer widget area
* Add subtle text-shadow to text when is has a background image (featured-content, panel, post-nav)
* Remove box-shadow from multiple links including, widget-area and footer
* Have the more link nowrap
* Improve excluding linked images
* Increase buttons' letter spacing
* Vertically align the chevron after a menu item that has children
* Remove box-shadow from linked transparent png

= 18 April 2016 =
* Fixes: Missing esc, typo

= 15 April 2016 =
* Switch from Jetpack's Site Logo to Core's Custom Logo (available since WP 4.5)
* Add new `featured-content-with-pages` tag to the stylesheet.
* Add new `testimonials` tag to the stylesheet.

= 14 April 2016 =
* Add new screenshot
* Add table of content and tags
* New style for the search form
* Fix testimonial navigation width on larger devices
* Rename posts navigation for the testimonials.
* Improve Archive/Single testimonial page so it looks like any other full-width pages -- No need for border/padding around the page header
* Tweak buttons' colours
* Add style for the Testimonial archive page + tweak Hero Wrapper's padding bottom/top on larger screens

= 13 April 2016 =
* Fix typo for the Featured Content. It's PAGE not pageS!!!!!!!!!!
* Make sure you can add a post and/or a page to the Featured Content
* Use posts and pages (default) for the Featured Content
* Fix typo
* Forgot to edit extras.php when renaming Family Page Template to Panel Page Template
* Rename Family Page Template to Panel Page Template
* Move widget-small jetpack styles in the right media query

= 12 April 2016 =
* Apply new vertical rhythm to wpcom widgets
* Brand new vertical rhythm for .widget-small on larger devices
* Add padding to pingback/trackback
* Make Column Extra Classes slightly more complex by introducing .column-first and .column-last but this gives a much better result and doesn't break anymore
* Tweak 3 columns extra css
* Make testimonial shortcode responsive
* Add style for missing widgets

= 11 April 2016 =
* Add style for upcoming events and top rated widgets
* Load JS releated to Featured Content in jetpack.php instead of functions.php since it's dependant of Jetpack
* Use JS instead of CSS for the slider's animations -- maybe it will fix the text jumping between images
* Execute flexslider function only when document is fully loaded. Play with the opacity and not the display to make sure flexslider is calculating widths properly

= 8 April 2016 =
* Add uppercase to page links title so it matches the sharedaddy style
* Make sure testimonial border isn't white when there's no featured image

= 6 April 2016 =
* Add style for the milestone widget
* Make sure the playlists match the theme's design
* Add style for multiple wpcom widgets -- more to come!
* Make sure links in headings don't have the box-shadow

= 5 April 2016 =
* Tweak Reblogger styles to fit with the theme's design
* Increase comments reply title on larger screens to match .org
* Add style for wpcom comments
* Add wpcom-specific files -- stylesheet is just a copy of Orvis so it will need to be updated
* Reorganise stylesheet
* Remove unneeded css and add sharedaddy style for pages with thumbnail (parent page template)

= 4 April 2016 =
* Tweak Sharedaddy + Comments
* Increase related posts font size on larger screens
* Use current version of Flexslider and not custom
* Remove .single .hentry css rule since the single view should behave like any other views
* Make sure the content area is centered even when using a Page Template without the sidebar
* Don't add an extra class to body if there's no sidebar
* Fix ratings vertical align

= 1 April 2016 =
* Initial import of the .org version of the Shoreditch theme
