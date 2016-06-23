/*!
 * Feature Carousel 
 */
(function($){

  $.fn.featureCarousel = function (options) {

    // Adds support for multiple carousels on one page
    if (this.length > 1) {
      this.each(function() {
        $(this).featureCarousel(options);
      });
      return this;
    }
    
    // override the default options with user defined options
    options = $.extend({}, $.fn.featureCarousel.defaults, options || {});
 
    /*
    These are univeral values that are used throughout the plugin. Do not modify them
     * unless you know what you're doing. Most of them feed off the options
     * so most customization can be achieved by modifying the options values 

	 */
	    var pluginData = {        
        containerWidth:       0,
        containerHeight:      0,
        largeFeatureWidth:    0,
        largeFeatureHeight:   0,
        smallFeatureHeight:   0,
        smallFeatureWidth:    0,       
        totalFeatureCount:    $(this).children("div").length,       
        featuresContainer:    $(this),
        featuresArray:        [],
        containerIDTag:       "#"+$(this).attr("id"),
        timeoutVar:           null,
        rotationsRemaining:   0,
        itemsToAnimate:       0,
        borderWidth:		      0,     
        autoTime:             0   
      };

    /**
     * Function to preload the images in the carousel if desired.
     * This is not recommended if there are a lot of images in the carousel because
     * it may take a while. Functionality does not depend on preloading the images 

     */  
    var preload = function(callback) {
      // user may not want to preload images
      if (options.preload == true) {
        var $imageElements = pluginData.featuresContainer.find("img");
        var loadedImages = 0;
        var totalImages = $imageElements.length;
        $imageElements.each(function (index, element) {
          // Attempt to load the images			
					var img = new Image();
          $(img).bind('load error', function () {
            // Add to number of images loaded and see if they are all done yet
            loadedImages++;
            if (loadedImages == totalImages) {
              // All done, perform callback
              callback();
            }
          });					
					img.src = element.src;				
        });
		
      } else {
        callback();
        // if user doesn't want preloader, then just go right to callback
      }
    }

    // Gets the feature container based on the number
    var getContainer = function(featureNum) {
      return pluginData.featuresArray[featureNum-1];
    }

    // get a feature given it's set position (the position that doesn't change)
    var getBySetPos = function(position) {
      $.each(pluginData.featuresArray, function () {
        if ($(this).data().setPosition == position)
          return $(this);
      });
    }

    // get previous feature number
    var getPreviousNum = function(num) {
      if ((num - 1) == 0) {
        return pluginData.totalFeatureCount;
      } else {
        return num - 1;
      }
    }

    // get next feature number
    var getNextNum = function(num) {
      if ((num + 1) > pluginData.totalFeatureCount) {
        return 1;
      } else {
        return num + 1;
      }
    }

    /**
     * Because there are several options the user can set for the width and height
     * of the feature images, this function is used to determine which options were set
     * and to set the appropriate dimensions used for a small and large feature	
     */
    var setupFeatureDimensions = function() {
      // Set the height and width of the entire carousel container
      options.containerWidth = pluginData.featuresContainer.width();
      options.containerHeight = pluginData.featuresContainer.height();

      // Grab the first image for reference
      var $firstFeatureImage = $(pluginData.containerIDTag).find(".wdi_carousel-image" + options.wdi_number + ":first");
     
      // Large Feature Width
      if (options.largeFeatureWidth > 1)
     	pluginData.largeFeatureWidth = options.largeFeatureWidth;
	 
      else if (options.largeFeatureWidth > 0 && options.largeFeatureWidth < 1)
        pluginData.largeFeatureWidth = $firstFeatureImage.width() * options.largeFeatureWidth;
      else
        pluginData.largeFeatureWidth = $firstFeatureImage.outerWidth();
      // Large Feature Height
      if (options.largeFeatureHeight > 1)
        pluginData.largeFeatureHeight = options.largeFeatureHeight;
      else if (options.largeFeatureHeight > 0 && options.largeFeatureHeight < 1)
        pluginData.largeFeatureHeight = $firstFeatureImage.height() * options.largeFeatureHeight;
      else
        pluginData.largeFeatureHeight = $firstFeatureImage.outerHeight();
      // Small Feature Width
      if (options.smallFeatureWidth > 1)
        pluginData.smallFeatureWidth = options.smallFeatureWidth;
      else if (options.smallFeatureWidth > 0 && options.smallFeatureWidth < 1)
        pluginData.smallFeatureWidth = $firstFeatureImage.width() * options.smallFeatureWidth;
      else
        pluginData.smallFeatureWidth = $firstFeatureImage.outerWidth() / 2;
      
    }

    /**
     * Function to take care of setting up various aspects of the carousel,
     * most importantly the default positions for the features	
     */
    var setupCarousel = function() {
      // Set the total feature count to the amount the user wanted to cutoff
      if (options.displayCutoff > 0 && options.displayCutoff < pluginData.totalFeatureCount) {
        pluginData.totalFeatureCount = options.displayCutoff;
      }

      // fill in the features array 
      pluginData.featuresContainer.find(".wdi_carousel-feature" + options.wdi_number).each(function (index) {
        if (index < pluginData.totalFeatureCount) {
          pluginData.featuresArray[index] = $(this);
        }
      });

      // Determine the total border width around the feature if there is one
      if (pluginData.featuresContainer.find(".wdi_carousel-feature" + options.wdi_number).first().css("borderLeftWidth") != "medium") {
        pluginData.borderWidth = parseInt(pluginData.featuresContainer.find(".wdi_carousel-feature" + options.wdi_number).first().css("borderLeftWidth"));
      }
      if (options.imagecount != 1) {
      // Place all the features in a center hidden position to start off
        pluginData.featuresContainer
          // Have to make the container relative positioning
          .find(".wdi_carousel-feature" + options.wdi_number).each(function () {
            // Center all the features in the middle and hide them
            $(this).css({
              'left': (options.containerWidth / 2) - (options.largeFeatureWidth * options.smallFeaturePar / 2) - (pluginData.borderWidth / 2)+ options.largeFeatureWidth / 2,           
              'width': options.largeFeatureWidth * options.smallFeaturePar / 100,
              'height': options.largeFeatureHeight * options.smallFeaturePar / 100,
              'top': options.smallFeatureOffset + options.topPadding+options.largeFeatureHeight / 2,
              'opacity': 0,
              'filter': 'Alpha(opacity=100)'
            });
          }) 
      }
      else {
        // Place all the features in a center hidden position to start off
        pluginData.featuresContainer
          // Have to make the container relative positioning
          .find(".wdi_carousel-feature" + options.wdi_number).each(function () {
            // Center all the features in the middle and hide them
            $(this).css({
              'left':0 ,        
              'width': options.largeFeatureWidth * options.smallFeaturePar ,
              'height': options.largeFeatureHeight * options.smallFeaturePar ,
              'top': 0,
              'opacity': 0,
              'filter': 'Alpha(opacity=100)'
            });
          }) 
      }        
        
      // set position to relative of captions if displaying below image
      if (options.captionBelow) {
        pluginData.featuresContainer.find(".wdi_carousel-caption" + options.wdi_number).css('position','absolute');
      }

      // figure out number of items that will rotate each time
      if (pluginData.totalFeatureCount < options.imagecount) {
        pluginData.itemsToAnimate = pluginData.totalFeatureCount;  
      } 
      else {
        pluginData.itemsToAnimate = options.imagecount + 2;
      }       

      // Hide story info and set the proper positioning
         pluginData.featuresContainer.find(".wdi_carousel-caption" + options.wdi_number)
        .hide();
    }

    /**
     * Here all the position data is set for the features.
     * This is an important part of the carousel to keep track of where
     * each feature within the carousel is	 
     */
    var setupFeaturePositions = function() {
      // give all features a set number that won't change so they remember their
      // original order 
      $.each(pluginData.featuresArray, function (i) {
        $(this).data('setPosition',i+1);
      });

      // Go back one - This is done because we call the move function right away, which
      // shifts everything to the right. So we set the current center back one, so that
      // it displays in the center when that happens
      var oneBeforeStarting = getPreviousNum(options.startingFeature);
      window["wdi_currentCenterNum" +options.wdi_number] = oneBeforeStarting;

      // Center feature will be position 1
      var $centerFeature = getContainer(oneBeforeStarting);
      $centerFeature.data('position',1);

      // Everything before that center feature...
      var $prevFeatures = $centerFeature.prevAll();
      $prevFeatures.each(function (i) {
        $(this).data('position',(pluginData.totalFeatureCount - i));
      });

      // And everything after that center feature...
      var $nextFeatures = $centerFeature.nextAll();
      $nextFeatures.each(function (i) {
        if ($(this).data('setPosition') != undefined) {
          $(this).data('position',(i + 2));
        }
      });

      // if the counter style is for including number tags in description...
      if (options.counterStyle == 'caption') {
        $.each(pluginData.featuresArray, function () {
          var pos = getPreviousNum($(this).data('position'));
          var $numberTag = $("<span></span>");
          $numberTag.addClass("numberTag");
          $numberTag.html("("+ pos + " of " + pluginData.totalFeatureCount + ") ");
          $(this).find(".wdi_carousel-caption" + options.wdi_number).prepend($numberTag);
        });
      }
    }
    
    // Update the tracker information with the new centered feature
    var updateTracker = function(oldCenter, newCenter) {
      if (options.trackerIndividual) {
        // get selectors for the two trackers
        var $trackerContainer = pluginData.featuresContainer.find(".tracker-individual-container");
        var $oldCenter = $trackerContainer.find("#tracker-"+oldCenter);
        var $newCenter = $trackerContainer.find("#tracker-"+newCenter);
      
	   // change classes
        
      }
      
      if (options.trackerSummation) {
        var $trackerContainer = pluginData.featuresContainer.find('.tracker-summation-container');
        $trackerContainer.find('.tracker-summation-current').text(newCenter);
      }
	  
    }

    /**
     * This function will set the autoplay for the carousel to
     * automatically rotate it given the time in the options
     * pass in TRUE to just clear the timer
     */
    var setTimer = function(stop) {
      // clear the timeout var if it exists
      clearTimeout(pluginData.timeoutVar);

      // set interval for moving if autoplay is set
      if (!stop && options.autoPlay != 0) {
        var autoTime = (Math.abs(options.autoPlay) < options.carouselSpeed) ? options.carouselSpeed : Math.abs(options.autoPlay);
        pluginData.timeoutVar = setTimeout(function () {
          (options.autoPlay > 0) ? initiateMove(true,1) : initiateMove(false,1);
        }, autoTime);
      }
    }


    // This is a helper function for the animateFeature function that
    // will update the positions of all the features based on the direction
    var rotatePositions = function(direction) {
      $.each(pluginData.featuresArray, function () {
        var newPos;
        if (direction == false) {
          newPos = getNextNum($(this).data().position);
        } else {
          newPos = getPreviousNum($(this).data().position);
        }

        $(this).data('position',newPos);
      });
    }

    /**
     * This function is used to animate the given feature to the given     
     * location. Valid locations are "left", "right", "center", "hidden"
     */
    var animateFeature = function($feature, direction) {
      
       if(window["data_" + options.wdi_number][$feature.attr("image_key")]["is_embed_video"]) {
          jQuery(".wdi_carousel-feature" + options.wdi_number).find("iframe").each(function () {
            jQuery(this)[0].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
            jQuery(this)[0].contentWindow.postMessage('{ "method": "pause" }', "*");
            jQuery(this)[0].contentWindow.postMessage('pause', '*');
          }); 
        }
       if(window["data_" + options.wdi_number][$feature.attr("image_key")]["is_embed_instagram_post"]) {
        jQuery("#wdi_carousel_play_pause_" + options.wdi_number).hide(); 
       }
      $feature.find(".wdi_video_hide" + options.wdi_number).each(function() {
        jQuery(this).css({display: ''});
      });
      $feature.find(".wdi_carousel_image_container_" + options.wdi_number).each(function() {
        jQuery(this).hide();
      });
      $feature.find(".wdi_carousel_watermark_" + options.wdi_number).each(function() {
        jQuery(this).hide();
      });      
      
      var new_width, new_height, new_top, new_left, new_zindex, new_padding, new_fade,new_fade1,new_f;     
      // Determine the old and new positions of the feature
      var oldPosition = $feature.data('position');
      var newPosition;
      if (direction == true)
        newPosition = getPreviousNum(oldPosition);
      else
        newPosition = getNextNum(oldPosition);     
      // callback for moving out of center pos
      if (oldPosition == 1) {
        options.leavingCenter($feature);
      }
      // Caculate new new css values depending on where the feature will be located
        //center
        if (newPosition == 1) {
          var title = window["data_" + options.wdi_number][$feature.attr("image_key")]["alt"];
          title = title.replace(/^\s+/, '').replace(/\s+$/, '');
          
          if (title === '' || !options.enable_image_title) {
            jQuery(".wdi_carousel_title_text_" + options.wdi_number).css({display: 'none'});
          }
          else {
            jQuery(".wdi_carousel_title_text_" + options.wdi_number).css({display: ''});
          }
          new_width = pluginData.largeFeatureWidth;              
          new_height = pluginData.largeFeatureHeight;
          new_top =(options.containerHeight / 2 - new_height / 2 );
          new_zindex = $feature.css("z-index");
          new_left = (options.containerWidth / 2) - (pluginData.largeFeatureWidth / 2) - (pluginData.borderWidth / 2);       
          new_fade = 1; 
          new_fade1 = 100;          
          if(window["data_" + options.wdi_number][$feature.attr("image_key")]["is_embed_video"]) {
            $feature.find("#wdi_carousel_play_pause_" + options.wdi_number).each(function() {
              jQuery(this).css({display: 'none'});          
            });
            jQuery(".wdi_carousel_image_container_" + options.wdi_number).css({display: ''});
            jQuery(".wdi_carousel_watermark_container_" + options.wdi_number).css({display: ''});
            jQuery(".wdi_carousel_watermark_spun_" + options.wdi_number).css({display: ''});
            jQuery(".wdi_carousel_watermark_" + options.wdi_number).css({display: ''});
            $feature.find(".wdi_video_hide" + options.wdi_number).each(function() {
              jQuery(this).hide();
             });
          }
          else {
            $feature.find(".wdi_video_hide" + options.wdi_number).each(function() {
              jQuery(this).hide();
            });
             $feature.find("#wdi_carousel_play_pause_" + options.wdi_number).each(function() {
              jQuery(this).css({display: ''});          
            });
            $feature.find(".wdi_carousel_image_container_" + options.wdi_number).each(function() {
              jQuery(this).css({display: ''});          
            });
            $feature.find(".wdi_carousel_watermark_" + options.wdi_number).each(function() {
              jQuery(this).css({display: ''});          
            });
          }
            new_f = "grayscale(0%)";
          if(window["data_" + options.wdi_number][$feature.attr("image_key")]["is_embed_instagram_post"]) {
            $feature.find(".wdi_embed_frame_" + options.wdi_number).css("min-height" ,'');
            $feature.find(".wdi_embed_frame_" + options.wdi_number).css("min-width" ,''); 
          }
          if(window["data_" + options.wdi_number][$feature.attr("image_key")]["is_embed_video"]) {
            $feature.find(".wdi_embed_frame_" + options.wdi_number).css("display" ,'inline-block');
          } 
        }
        else {
          /*left*/
          if (newPosition <= pluginData.totalFeatureCount && newPosition > pluginData.totalFeatureCount - options.imagecount / 2 + 1) {  
            new_width = (pluginData.largeFeatureWidth * Math.pow(options.smallFeaturePar, pluginData.totalFeatureCount - newPosition + 1));      
            new_height = (pluginData.largeFeatureHeight * Math.pow(options.smallFeaturePar, pluginData.totalFeatureCount - newPosition + 1));
            new_top = (options.containerHeight / 2 - new_height / 2 ) ;            
            new_fade = 1;
            new_f = "grayscale(0%)";
            new_fade1 = 100;
            new_width = (pluginData.largeFeatureWidth * Math.pow(options.smallFeaturePar, pluginData.totalFeatureCount - newPosition + 1));      
            new_height = (pluginData.largeFeatureHeight * Math.pow(options.smallFeaturePar, pluginData.totalFeatureCount - newPosition + 1));
            new_top = (options.containerHeight / 2 - new_height / 2 ) ;
            if(window["data_" + options.wdi_number][$feature.attr("image_key")]["is_embed_instagram_post"] ) {
              $feature.find(".wdi_embed_frame_" + options.wdi_number).css("min-height",'100%');
              $feature.find(".wdi_embed_frame_" + options.wdi_number).css("min-width" ,'100%');
            }
            if(options.fit_containerWidth == false && options.smallFeaturePar < 1){
              new_left = (options.containerWidth / 2 - pluginData.largeFeatureWidth / 2)-(pluginData.largeFeatureWidth * (1 - options.smallFeaturePar) * options.smallFeaturePar * (pluginData.totalFeatureCount - newPosition + 1));             
            } else if(options.fit_containerWidth == false && options.smallFeaturePar == 1){
              new_left = (options.containerWidth / 2 - pluginData.largeFeatureWidth / 2)-(pluginData.largeFeatureWidth * ( options.smallFeaturePar) * options.smallFeaturePar * (pluginData.totalFeatureCount - newPosition + 1));             
            }  else {
              new_left1 = (options.containerWidth / 2 - pluginData.largeFeatureWidth / 2) / (options.imagecount / 2 - 0.5);
              new_left =  ((options.containerWidth / 2) - (pluginData.largeFeatureWidth / 2) - (pluginData.borderWidth / 2)) - (new_left1 * (pluginData.totalFeatureCount - newPosition+1  )); 
            }
          }
      /*right*/
          else if (newPosition >= 2 && newPosition <= options.imagecount / 2 + 1) {
            new_width = (pluginData.largeFeatureWidth * Math.pow(options.smallFeaturePar,newPosition-1));        
            new_height =( pluginData.largeFeatureHeight * Math.pow(options.smallFeaturePar, newPosition-1) );         
            new_top = ( options.containerHeight / 2 - new_height / 2 )  ;        
            new_fade = 1; 
            new_f = "grayscale(0%)";
            new_fade1 = 100; 
            if(window["data_" + options.wdi_number][$feature.attr("image_key")]["is_embed_instagram_post"] ) {
              $feature.find(".wdi_embed_frame_" + options.wdi_number).css("min-height" ,'100%');
              $feature.find(".wdi_embed_frame_" + options.wdi_number).css("min-width" ,'100%');
            }   
            if(options.fit_containerWidth == false && options.smallFeaturePar < 1){         
              new_left = (options.containerWidth / 2 + pluginData.largeFeatureWidth / 2)+( pluginData.largeFeatureWidth  * options.smallFeaturePar * (1 - options.smallFeaturePar) * (newPosition - 1)) - new_width;
            } else if(options.fit_containerWidth == false && options.smallFeaturePar ==1){         
            new_left = (options.containerWidth / 2 + pluginData.largeFeatureWidth / 2)+( pluginData.largeFeatureWidth  * options.smallFeaturePar * ( options.smallFeaturePar) * (newPosition - 1)) - new_width;
            } else {
              new_left1 = ( (options.containerWidth / 2 -pluginData.largeFeatureWidth / 2)) / (options.imagecount / 2 - 0.5);
              new_left = (options.containerWidth / 2 + pluginData.largeFeatureWidth / 2 )  - new_width + ( new_left1 * (newPosition - 1));
            }
                     
          }
       //hidden
          else {
             new_left = (options.containerWidth / 2) - (pluginData.largeFeatureWidth*options.smallFeaturePar / 2) - (pluginData.borderWidth / 2);        
             new_fade = 0;
             new_fade1 = 0;
          }
        }        
      // This code block takes care of hiding the feature information if the feature is leaving the center
      if (oldPosition == 1) {
        // Slide up the story information
        $feature.find(".wdi_carousel-caption" + options.wdi_number)
          .hide();
      }     
        
      // Animate the feature div to its new location
      
     $feature.find("div[class^='wdi_carousel-image']").css({filter:new_f, "-webkit-filter":new_f});
      $feature
        .animate(
          {
            width: new_width,
            height: new_height,
            top: new_top,
            left: new_left,           
            opacity: new_fade,
            filter : new_fade1
          },
          options.carouselSpeed,
          options.animationEasing,
          function () {
            // Take feature info out of hiding if new position is center
            if (newPosition == 1) {
              // need to set the height to auto to accomodate caption if displayed below image
              if (options.captionBelow)
               $feature.css('height','auto');
              // fade in the feature information
              $feature.find(".wdi_carousel-caption" + options.wdi_number)
                .fadeTo("fast",0.85);
              // callback for moved to center
              options.movedToCenter($feature);
            }
            // decrement the animation queue
            pluginData.rotationsRemaining = pluginData.rotationsRemaining - 1;
            // have to change the z-index after the animation is done
            $feature.css("z-index", new_zindex);
            // change trackers if using them
            if (options.trackerIndividual || options.trackerSummation) {
              // just update the tracker once; once the new center feature has arrived in center
              if (newPosition == 1) {
                // figure out what item was just in the center, and what item is now in the center
                var newCenterItemNum = pluginData.featuresContainer.find(".wdi_carousel-feature" + options.wdi_number).index($feature) + 1;
                var oldCenterItemNum;
                if (direction == false)
                  oldCenterItemNum = getNextNum(newCenterItemNum);
                else
                  oldCenterItemNum = getPreviousNum(newCenterItemNum);
                // now update the trackers
                updateTracker(oldCenterItemNum, newCenterItemNum);
              }
            }

            // did all the the animations finish yet?
            var divide = pluginData.rotationsRemaining / pluginData.itemsToAnimate;
            if (divide % 1 == 0) {
              // if so, set moving to false...
              window["wdi_currentlyMoving" +options.wdi_number] = false;
              // change positions for all items...
              rotatePositions(direction);

              // and move carousel again if queue is not empty
              if (pluginData.rotationsRemaining > 0)
                move(direction);
            }
            
            // reset timer and auto rotate again
            setTimer(false);
          }
          
        )
       
        .end();
    }

    /**
     * move the carousel to the left or to the right. The features that
     * will move into the four positions are calculated and then animated
     * rotate to the RIGHT when direction is TRUE and
     * rotate to the LEFT when direction is FALSE
	
     */
     
    var move = function(direction)
    {
      // Set the carousel to currently moving
      window["wdi_currentlyMoving" +options.wdi_number] = true;

      // Obtain the new feature positions based on the direction that the carousel is moving
    
    var $newCenter, $newLefts, $newRights, $newHidden,$curNum;

      if (direction == true ) {
        // Shift features to the left
        $newCenter = getContainer(getNextNum(window["wdi_currentCenterNum" +options.wdi_number]));
        $newLefts = [];
        $curNum = window["wdi_currentCenterNum" +options.wdi_number];
        for(var i = 1; i <= options.imagecount / 2 + 1; ++i) {
          $newLefts.push(getContainer($curNum));
          $curNum = getPreviousNum($curNum);
        }
       
        $newRights = [];
        $curNum = getNextNum(window["wdi_currentCenterNum" +options.wdi_number]);
        for(var i = 1; i <= options.imagecount / 2 + 1; ++i) {
          $curNum = getNextNum($curNum);
          $newRights.push(getContainer($curNum));
        }
        
        window["wdi_currentCenterNum" +options.wdi_number] = getNextNum(window["wdi_currentCenterNum" +options.wdi_number]);
      } else  {
        $newCenter = getContainer(getPreviousNum(window["wdi_currentCenterNum" +options.wdi_number]));
        $newLefts = [];
        $curNum = getPreviousNum(window["wdi_currentCenterNum" +options.wdi_number]);
        for (var i = 1; i <= options.imagecount / 2 + 1; ++i){
          $curNum = getPreviousNum($curNum);   
          $newLefts.push(getContainer($curNum));
        }
        $newRights = [];
        $curNum = window["wdi_currentCenterNum" +options.wdi_number];
        for (var i = 1; i <= options.imagecount / 2 + 1; ++i){
          $newRights.push(getContainer($curNum));
          $curNum=getNextNum($curNum);
        }       
        window["wdi_currentCenterNum" +options.wdi_number] = getPreviousNum(window["wdi_currentCenterNum" +options.wdi_number]);
      }
    
// Animate the features into their new positions
        for (i = 0; i < $newLefts.length; i++) {
          $newLefts[i].css("z-index",$newLefts.length - i + 3);
          animateFeature($newLefts[i], direction);
        }
        $newCenter.css("z-index", $newLefts.length + 4);
        animateFeature($newCenter, direction);
        for (i = 0; i < $newRights.length; i++) {
          $newRights[i].css("z-index",$newRights.length - i + 3);
          animateFeature($newRights[i], direction);
        }    
     
      // Only want to animate the "hidden" feature if there are more than three
    }

    // This is used to relegate carousel movement throughout the plugin
    // It will only initiate a move if the carousel isn't currently moving
    // It will set the animation queue to the number of rotations given
    var initiateMove = function(direction, rotations) {
      if (window["wdi_currentlyMoving" +options.wdi_number] == false ) {
        var queue = rotations * pluginData.itemsToAnimate ;
        pluginData.rotationsRemaining = queue ;
        window["wdi_carousel_watermark_" + options.wdi_number]();
        move(direction);
       
      }
    }

    /**
     * This will find the shortest distance to travel the carousel from
     * one position to another position. It will return the shortest distance
     * in number form, and will be positive to go to the right and negative for left	 

     */

  
    // Move to the left if left button clicked
    $(options.leftButtonTag).live('click',function () {
      initiateMove(false,1);
    });

    // Move to right if right button clicked
    $(options.rightButtonTag).live('click',function () {
      initiateMove(true,1);
    });

    // These are the click and hover events for the features
     pluginData.featuresContainer.find(".wdi_carousel-feature" + options.wdi_number)
      
      .mouseover(function () {
        if (window["wdi_currentlyMoving" +options.wdi_number] == false) {
          var position = $(this).data('position');
       
          if (position == 3 || position == pluginData.totalFeatureCount) {
            $(this).css("opacity",1); 
          }
        }
        // pause the rotation?
        if (options.pauseOnHover) setTimer(true);
        // stop the rotation?
        if (options.stopOnHover) options.autoPlay = 0;
      })
      .mouseout(function () {
        if (window["wdi_currentlyMoving" +options.wdi_number] == false) {
          var position = $(this).data('position');
          if (position == 3 || position == pluginData.totalFeatureCount) {
            $(this).css("opacity",1);
          }
        }
        // resume the rotation
        if (options.pauseOnHover) {
          setTimer(false);
        }
      });

    // Add event listener to all clicks within the features container
    // This is done to disable any links that aren't within the center feature
    $("a", pluginData.containerIDTag).live("click", function (event) {
      // travel up to the container
      var $parents = $(this).parentsUntil(pluginData.containerIDTag);
      // now check each of the feature divs within it
      $parents.each(function () {
        var position = $(this).data('position');
        // if there are more than just feature divs within the container, they will
        // not have a position and it may come back as undefined. Throw these out
        if (position != undefined) {
          // if any of the links on a feature OTHER THAN the center feature were clicked,
          // initiate a carousel move but then throw the link action away
          if (position != 1) {
            if (position == pluginData.totalFeatureCount) {
              initiateMove(false,1);
            } else if (position == 2) {
              initiateMove(true,1);
            }
            event.preventDefault();
            return false;
          // if the position WAS the center (i.e. 1), fire callback
          } else {
            options.clickedCenter($(this));
          }
        }
      });
    });

    // Did someone click one of the individual trackers?
   
  
    /****************
     PUBLIC FUNCTIONS 
     ****************/
    this.initialize = function () {
      // Call the preloader and pass in our callback, which is just a slew of function calls
      // that should only be executed after the images have been loaded
      preload(function () {
        setupFeatureDimensions();
        setupCarousel();
        
        if (window["wdi_currentlyMoving" +options.wdi_number] == false ) {
          setupFeaturePositions();        
          initiateMove(true,1);
        }
        
      });
 
      return this;
    };
     this.shift = function (that) {
    
      var position = $(that).data('position');
      if (position == 1) {
        return;
      }
      if (position > pluginData.totalFeatureCount / 2 + 1) {
        initiateMove(false, pluginData.totalFeatureCount - position + 1);
        options.carouselSpeed = 400;
        options.animationEasing;
      }
      else {
        initiateMove(true, position - 1);
        options.carouselSpeed = 400;
        options.animationEasing;
      }
    }
    this.next = function() {
      initiateMove(true, 1);
    }
    this.prev = function () {
      initiateMove(false, 1);
    }
   
    this.pause = function () {
      options.autoPlay = 0;
      setTimer(true);
    }
    this.start = function () {
      options.autoPlay = options.interval;      
      setTimer(false);
    }
 
    // Initialize the plugin
    return this.initialize();
  };
  
  $.fn.featureCarousel.defaults = {
    // If zero, take original width and height of image
    // If between 0 and 1, multiply by original width and height (acts as a percentage)
    // If greater than one, use as a forced width/height for all of the images
    largeFeatureWidth :   0,
    largeFeatureHeight:		0,
    smallFeatureWidth:    .5,
    smallFeatureHeight:		.5,
    containerWidth:       0,
    containerHeight:      0,
    fit_containerWidth:   0,
    wdi_number:           0,   
    // how much to pad the top of the carousel
    topPadding:           20,
    // spacing between the sides of the container
    sidePadding:          50,
    // the additional offset to pad the side features from the top of the carousel
    smallFeatureOffset:		50,
    //smallFeature parameters
    smallFeaturePar:      0,
    // indicates which feature to start the carousel at
    startingFeature:      1,
    // speed in milliseconds it takes to rotate the carousel
    carouselSpeed:        300,
    // time in milliseconds to set interval to autorotate the carousel
    // set to zero to disable it, negative to go left
    autoPlay:             4000,
    //imagecounts
    imagecount:           7,
    enable_image_title:   0,
    // with autoplay enabled, set this option to true to have the carousel pause rotating
    // when a user hovers over any feature
    pauseOnHover:         true,
    // with autoplay enabled, set this option to completely stop the autorotate functionality
    stopOnHover:          false,
    // numbered blips can appear and be used to track the currently centered feature, as well as 
    // allow the user to click a number to move to that feature. Set to false to not process these at all
    // and true to process and display them//and true to process and display them
    trackerIndividual:    true,
    // a summation of the features can also be used to display an "x Of y" style of tracking
    // this can be combined with the above option as well
    trackerSummation:     true,
    // true to preload all images in the carousel before displaying anything. If this is set to false,
    // you will probably need to set a fixed width/height to prevent strangeness
    preload:             false,
    // Will only display this many features in the carousel
    // set to zero to disable
    displayCutoff:        0,
    // an easing can be specified for the animation of the carousel
    animationEasing:      'swing',
    // selector for the left arrow of the carousel
    leftButtonTag:        '#wdi_carousel-left', 
    // selector for the right arrow of the carousel
    rightButtonTag:       '#wdi_carousel-right',
    // display captions below the image instead of on top
    captionBelow:         false,
    // callback function for when a feature has animated to the center
    movedToCenter:        $.noop,
    // callback function for when feature left center
    leavingCenter:        $.noop,
    // callback function for when center feature was clicked
    clickedCenter:        $.noop
  };
  
})(jQuery);