/** =======================================================================
 * Components / Images
 * ===================================================================== */

export default function images() {

  /**
   * Customize Fancybox
   */

  $( '[data-fancybox]' ).fancybox({

    // Enable infinite gallery navigation
    loop: true,

    // Enable keyboard navigation
    keyboard: true,

    // What buttons should appear in the top right corner.
    // Buttons will be created using templates from `btnTpl` option
    // and they will be placed into toolbar (class="fancybox-toolbar"` element)
    buttons: [
      'zoom',
      //'share',
      'slideShow',
      //'fullScreen',
      //'download',
      'thumbs',
      'close'
    ],

    // Detect "idle" time in seconds
    idleTime: 30,

    // Disable right-click and use simple image protection for images
    protect: false,

    // Shortcut to make content "modal" - disable keyboard navigtion, hide buttons, etc
    // modal: false,

    image: {
      // Wait for images to load before displaying
      //   true  - wait for image to load and then display;
      //   false - display thumbnail and load the full-sized image over top,
      //           requires predefined image dimensions (`data-width` and `data-height` attributes)
      preload: false
    },

    ajax: {
      // Object containing settings for ajax request
      settings: {
        // This helps to indicate that request comes from the modal
        // Feel free to change naming
        data: {
          fancybox: true
        }
      }
    },

    // iframe: {
    //   // Iframe template
    //   tpl:
    //     '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" allowfullscreen allow="autoplay; fullscreen" src=""></iframe>',

    //   // Preload iframe before displaying it
    //   // This allows to calculate iframe content width and height
    //   // (note: Due to "Same Origin Policy", you can't get cross domain data).
    //   preload: true,

    //   // Custom CSS styling for iframe wrapping element
    //   // You can use this to set custom iframe dimensions
    //   css: {},

    //   // Iframe tag attributes
    //   attr: {
    //     scrolling: "auto"
    //   }
    // },

    // // For HTML5 video only
    // video: {
    //   tpl:
    //     '<video class="fancybox-video" controls controlsList="nodownload" poster="{{poster}}">' +
    //     '<source src="{{src}}" type="{{format}}" />' +
    //     'Sorry, your browser doesn\'t support embedded videos, <a href="{{src}}">download</a> and watch with your favorite video player!' +
    //     "</video>",
    //   format: "", // custom video format
    //   autoStart: true
    // },

    // // Open/close animation type
    // // Possible values:
    // //   false            - disable
    // //   "zoom"           - zoom images from/to thumbnail
    // //   "fade"
    // //   "zoom-in-out"
    // //
    // animationEffect: "zoom",

    // Duration in ms for open/close animation
    animationDuration: 300,

    // Transition effect between slides
    //
    // Possible values:
    //   false            - disable
    //   "fade'
    //   "slide'
    //   "circular'
    //   "tube'
    //   "zoom-in-out'
    //   "rotate'
    //
    transitionEffect: 'slide',

    // Duration in ms for transition animation
    transitionDuration: 300,

    // // Base template for layout
    // baseTpl:
    //   '<div class="fancybox-container" role="dialog" tabindex="-1">' +
    //   '<div class="fancybox-bg"></div>' +
    //   '<div class="fancybox-inner">' +
    //   '<div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div>' +
    //   '<div class="fancybox-toolbar">{{buttons}}</div>' +
    //   '<div class="fancybox-navigation">{{arrows}}</div>' +
    //   '<div class="fancybox-stage"></div>' +
    //   '<div class="fancybox-caption"><div class=""fancybox-caption__body"></div></div>' +
    //   '</div>' +
    //   '</div>',

    // // Loading indicator template
    // spinnerTpl: '<div class="fancybox-loading"></div>',

    // // Error message template
    // errorTpl: '<div class="fancybox-error"><p>{{ERROR}}</p></div>',

    // btnTpl: {
    //   download:
    //     '<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}" href="javascript:;">' +
    //     '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.62 17.09V19H5.38v-1.91zm-2.97-6.96L17 11.45l-5 4.87-5-4.87 1.36-1.32 2.68 2.64V5h1.92v7.77z"/></svg>' +
    //     "</a>",

    //   zoom:
    //     '<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom" title="{{ZOOM}}">' +
    //     '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.7 17.3l-3-3a5.9 5.9 0 0 0-.6-7.6 5.9 5.9 0 0 0-8.4 0 5.9 5.9 0 0 0 0 8.4 5.9 5.9 0 0 0 7.7.7l3 3a1 1 0 0 0 1.3 0c.4-.5.4-1 0-1.5zM8.1 13.8a4 4 0 0 1 0-5.7 4 4 0 0 1 5.7 0 4 4 0 0 1 0 5.7 4 4 0 0 1-5.7 0z"/></svg>' +
    //     "</button>",

    //   close:
    //     '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}">' +
    //     '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z"/></svg>' +
    //     "</button>",

    //   // Arrows
    //   arrowLeft:
    //     '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}">' +
    //     '<div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.28 15.7l-1.34 1.37L5 12l4.94-5.07 1.34 1.38-2.68 2.72H19v1.94H8.6z"/></svg></div>' +
    //     "</button>",

    //   arrowRight:
    //     '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}">' +
    //     '<div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.4 12.97l-2.68 2.72 1.34 1.38L19 12l-4.94-5.07-1.34 1.38 2.68 2.72H5v1.94z"/></svg></div>' +
    //     "</button>",

    //   // This small close button will be appended to your html/inline/ajax content by default,
    //   // if "smallBtn" option is not set to false
    //   smallBtn:
    //     '<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}">' +
    //     '<svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24"><path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"/></svg>' +
    //     "</button>"
    // },

    // Customize or add new media types
    // Example:
    /*
      media : {
        youtube : {
          params : {
            autoplay : 0
          }
        }
      }
    */
    // media: {},

    slideShow: {
      // autoStart: false,
      speed: 8000
    },

    thumbs: {
      autoStart: true, // Display thumbnails on opening
      // hideOnClose: true, // Hide thumbnail grid when closing animation starts
      // parentEl: ".fancybox-container", // Container is injected into this element
      axis: 'y' // Vertical (y) or horizontal (x) scrolling
    },

    // Use mousewheel to navigate gallery
    // If 'auto' - enabled for images only
    wheel: false,

    // // Custom options when mobile device is detected
    // // =============================================

    // mobile: {
    //   preventCaptionOverlap: false,
    //   idleTime: false,
    //   clickContent: function(current, event) {
    //     return current.type === "image" ? "toggleControls" : false;
    //   },
    //   clickSlide: function(current, event) {
    //     return current.type === "image" ? "toggleControls" : "close";
    //   },
    //   dblclickContent: function(current, event) {
    //     return current.type === "image" ? "zoom" : false;
    //   },
    //   dblclickSlide: function(current, event) {
    //     return current.type === "image" ? "zoom" : false;
    //   }
    // },
  });


  /**
   * Add fancybox to single images if linked
   */

  const $wpImageLink = $( '.wp-block-image > a' );

  $wpImageLink.each( function() {
    $( this ).attr( 'data-fancybox', true );
  });

}
