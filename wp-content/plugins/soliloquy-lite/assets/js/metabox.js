/* ==========================================================
 * metabox.js
 * http://soliloquywp.com/
 * ==========================================================
 * Copyright 2014 Thomas Griffin.
 *
 * Licensed under the GPL License, Version 2.0 or later (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.gnu.org/licenses/gpl-2.0.html
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
;(function($){
    $(function(){
        // Initialize the slider tabs.
        var soliloquy_tabs           = $('#soliloquy-tabs'),
            soliloquy_tabs_nav       = $('#soliloquy-tabs-nav'),
            soliloquy_tabs_hash      = window.location.hash,
            soliloquy_tabs_hash_sani = window.location.hash.replace('!', '');

        // If we have a hash and it begins with "soliloquy-tab", set the proper tab to be opened.
        if ( soliloquy_tabs_hash && soliloquy_tabs_hash.indexOf('soliloquy-tab-') >= 0 ) {
            $('.soliloquy-active').removeClass('soliloquy-active');
            soliloquy_tabs_nav.find('li a[href="' + soliloquy_tabs_hash_sani + '"]').parent().addClass('soliloquy-active');
            soliloquy_tabs.find(soliloquy_tabs_hash_sani).addClass('soliloquy-active').show();

            // Update the post action to contain our hash so the proper tab can be loaded on save.
            var post_action = $('#post').attr('action');
            if ( post_action ) {
                post_action = post_action.split('#')[0];
                $('#post').attr('action', post_action + soliloquy_tabs_hash);
            }
        }

        // Change tabs on click.
        $(document).on('click', '#soliloquy-tabs-nav li a', function(e){
            e.preventDefault();
            var $this = $(this);
            if ( $this.parent().hasClass('soliloquy-active') ) {
                return;
            } else {
                window.location.hash = soliloquy_tabs_hash = this.hash.split('#').join('#!');
                var current = soliloquy_tabs_nav.find('.soliloquy-active').removeClass('soliloquy-active').find('a').attr('href');
                $this.parent().addClass('soliloquy-active');
                soliloquy_tabs.find(current).removeClass('soliloquy-active').hide();
                soliloquy_tabs.find($this.attr('href')).addClass('soliloquy-active').show();

                // Update the post action to contain our hash so the proper tab can be loaded on save.
                var post_action = $('#post').attr('action');
                if ( post_action ) {
                    post_action = post_action.split('#')[0];
                    $('#post').attr('action', post_action + soliloquy_tabs_hash);
                }
            }
        });

        // Load plupload if necessary.
        var soliloquy_uploader;
        if ( $('input[name="_soliloquy[type]"]').length > 0 && 'default' == $('input[name="_soliloquy[type]"]:checked').val() ) {
            soliloquyPlupload();
        }

        // Conditionally show necessary fields.
        soliloquyConditionals();

        // Handle the meta icon helper.
        if ( 0 !== $('.soliloquy-helper-needed').length ) {
            $('<div class="soliloquy-meta-helper-overlay" />').prependTo('#soliloquy');
        }

        $(document).on('click', '.soliloquy-meta-icon', function(e){
            e.preventDefault();
            var $this     = $(this),
                container = $this.parent(),
                helper    = $this.next();
            if ( helper.is(':visible') ) {
                $('.soliloquy-meta-helper-overlay').remove();
                container.removeClass('soliloquy-helper-active');
            } else {
                if ( 0 === $('.soliloquy-meta-helper-overlay').length ) {
                    $('<div class="soliloquy-meta-helper-overlay" />').prependTo('#soliloquy');
                }
                container.addClass('soliloquy-helper-active');
            }
        });

        // Handle switching between different slider types.
        $(document).on('change', 'input[name="_soliloquy[type]"]:radio', function(e){
            var $this = $(this);
            $('.soliloquy-type-spinner .soliloquy-spinner').css({'display' : 'inline-block', 'margin-top' : '-1px'});

            // Prepare our data to be sent via Ajax.
            var change = {
                action:  'soliloquy_change_type',
                post_id: soliloquy_metabox.id,
                type:    $this.val(),
                nonce:   soliloquy_metabox.change_nonce
            };

            // Process the Ajax response and output all the necessary data.
            $.post(
                soliloquy_metabox.ajax,
                change,
                function(response) {
                    // Append the response data.
                    if ( 'default' == response.type ) {
                        $('#soliloquy-slider-main').html(response.html);
                        soliloquyPlupload();
                    } else {
                        $('#soliloquy-slider-main').html(response.html);
                    }

                    // Fire an event to attach to.
                    $(document).trigger('soliloquySliderType', response);

                    // Remove the spinner.
                    $('.soliloquy-type-spinner .soliloquy-spinner').hide();
                },
                'json'
            );
        });

        // Open up the media manager modal.
        $(document).on('click', '.soliloquy-media-library', function(e){
            e.preventDefault();

            // Show the modal.
            soliloquy_main_frame = true;
            $('#soliloquy-upload-ui').appendTo('body').show();
        });

        // Add the selected state to images when selected from the library view.
        $('.soliloquy-slider').on('click', '.thumbnail, .check, .media-modal-icon', function(e){
            e.preventDefault();
            if ( $(this).parent().parent().hasClass('soliloquy-in-slider') )
                return;
            if ( $(this).parent().parent().hasClass('selected') )
                $(this).parent().parent().removeClass('details selected');
            else
                $(this).parent().parent().addClass('details selected');
        });

        // Load more images into the library view.
        $(document).on('click', '.soliloquy-load-library', function(e){
            e.preventDefault();
            var $this = $(this);
            $this.next().css({'display' : 'inline-block', 'margin-top' : '14px', 'margin-left' : '-5px'});

            // Prepare our data to be sent via Ajax.
            var load = {
                action:  'soliloquy_load_library',
                offset:  parseInt($this.attr('data-soliloquy-offset')),
                post_id: soliloquy_metabox.id,
                nonce:   soliloquy_metabox.load_slider
            };

            // Process the Ajax response and output all the necessary data.
            $.post(
                soliloquy_metabox.ajax,
                load,
                function(response) {
                    $this.attr('data-soliloquy-offset', parseInt($this.attr('data-soliloquy-offset')) + 20);

                    // Append the response data.
                    if ( response && response.html && $this.hasClass('has-search') ) {
                        $('.soliloquy-slider').html(response.html);
                        $this.removeClass('has-search');
                    } else {
                        $('.soliloquy-slider').append(response.html);
                    }

                    // Remove the spinner.
                    $this.next().hide();
                },
                'json'
            );
        });

        // Load images related to the search term specified
        $(document).on('keyup keydown', '#soliloquy-slider-search', function(){
            var $this = $(this);
            $this.prev().css({'display' : 'inline-block', 'margin-top' : '1px', 'vertical-align' : 'middle', 'margin-right' : '4px'});

            var text     = $(this).val();
            var search   = {
                action:  'soliloquy_library_search',
                nonce:   soliloquy_metabox.library_search,
                post_id: soliloquy_metabox.id,
                search:  text
            };

            // Send the ajax request with a delay (500ms after the user stops typing).
            delay(function() {
                // Process the Ajax response and output all the necessary data.
                $.post(
                    soliloquy_metabox.ajax,
                    search,
                    function(response) {
                        // Notify the load button that we have entered a search and reset the offset counter.
                        $('.soliloquy-load-library').addClass('has-search').attr('data-soliloquy-offset', parseInt(0));

                        // Append the response data.
                        if ( response )
                            $('.soliloquy-slider').html(response.html);

                        // Remove the spinner.
                        $this.prev().hide();
                    },
                    'json'
                );
            }, '500');
        });

        // Process inserting slides into slider when the Insert button is pressed.
        $(document).on('click', '.soliloquy-media-insert', function(e){
            e.preventDefault();
            var $this = $(this),
                text  = $this.text(),
                data  = {
                    action: 'soliloquy_insert_slides',
                    nonce:   soliloquy_metabox.insert_nonce,
                    post_id: soliloquy_metabox.id,
                    images:  {},
                    videos:  {},
                    html:    {}
                },
                selected = false,
                video    = false,
                html     = false,
                insert_e = e;
            $this.text(soliloquy_metabox.inserting);

            // Loop through potential data to send when inserting images.
            // First, we loop through the selected items and add them to the data var.
            $('.soliloquy-media-frame').find('.attachment.selected:not(.soliloquy-in-slider)').each(function(i, el){
                data.images[i] = $(el).attr('data-attachment-id');
                selected       = true;
            });

            // Next, we loop through any video slides that have been created.
            $('.soliloquy-media-frame').find('.soliloquy-video-slide-holder').each(function(i, el){
                data.videos[i] = {
                    title:   $(el).find('.soliloquy-video-slide-title').val(),
                    url:     $(el).find('.soliloquy-video-slide-url').val(),
                    thumb:   $(el).find('.soliloquy-video-slide-thumbnail').val(),
                    caption: $(el).find('.soliloquy-video-slide-caption').val()
                };
                video = true;
            });

            // Finally, we loop through any HTML slides that have been created.
            $('.soliloquy-media-frame').find('.soliloquy-html-slide-holder').each(function(i, el){
                data.html[i] = {
                    title: $(el).find('.soliloquy-html-slide-title').val(),
                    code:  $(el).find('.soliloquy-html-slide-code').val(),
                    thumb: $(el).find('.soliloquy-html-slide-thumbnail').val()
                };
                html = true;
            });

            // Send the ajax request with our data to be processed.
            $.post(
                soliloquy_metabox.ajax,
                data,
                function(response){
                    // Set small delay before closing modal.
                    setTimeout(function(){
                        // Re-append modal to correct spot and revert text back to default.
                        append_and_hide(insert_e);
                        $this.text(text);

                        // If we have selected items, be sure to properly load first images back into view.
                        if ( selected )
                            $('.soliloquy-load-library').attr('data-soliloquy-offset', 0).addClass('has-search').trigger('click');
                    }, 500);
                },
                'json'
            );

        });

        // Change content areas and active menu states on media router click.
        $(document).on('click', '.soliloquy-media-frame .media-menu-item', function(e){
            e.preventDefault();
            var $this       = $(this),
                old_content = $this.parent().find('.active').removeClass('active').data('soliloquy-content'),
                new_content = $this.addClass('active').data('soliloquy-content');
            $('#soliloquy-' + old_content).hide();
            $('#soliloquy-' + new_content).show();
        });

        // Load in new video slides when the add video slide button is clicked.
        $(document).on('click', '.soliloquy-add-video-slide', function(e){
            e.preventDefault();
            var number = parseInt($(this).attr('data-soliloquy-video-number')),
                id     = 'soliloquy-video-slide-' + $(this).attr('data-soliloquy-html-number');
            $(this).attr('data-soliloquy-video-number', number + 1 ).parent().before(soliloquyGetVideoSlideMarkup(number));
        });

        function soliloquyGetVideoSlideMarkup(number) {
            var html = '';
            html += '<div class="soliloquy-video-slide-holder"><p class="no-margin-top"><a href="#" class="button button-secondary soliloquy-delete-video-slide" title="' + soliloquy_metabox.removeslide + '">' + soliloquy_metabox.removeslide + '</a><label for="soliloquy-video-slide-' + number + '-title"><strong>' + soliloquy_metabox.videoslide + '</strong></label><br /><input type="text" class="soliloquy-video-slide-title" id="soliloquy-video-slide-' + number + '-title" value="" placeholder="' + soliloquy_metabox.videoplace + '" /></p><p><label for="soliloquy-video-slide-' + number + '"><strong>' + soliloquy_metabox.videotitle + '</strong></label><br /><input type="text" class="soliloquy-video-slide-url" id="soliloquy-video-slide-' + number + '" value="" placeholder="' + soliloquy_metabox.videooutput + '" /></p><p><label for="soliloquy-video-slide-' + number + '-thumbnail"><strong>' + soliloquy_metabox.videothumb + '</strong></label><br /><input type="text" class="soliloquy-video-slide-thumbnail" id="soliloquy-video-slide-' + number + '-thumbnail" value="" placeholder="' + soliloquy_metabox.videosrc + '" /> <span><a href="#" class="soliloquy-video-thumbnail button button-primary">' + soliloquy_metabox.videoselect + '</a> <a href="#" class="soliloquy-video-thumbnail-delete button button-secondary">' + soliloquy_metabox.videodelete + '</a></span></p><p class="no-margin-bottom"><label for="soliloquy-video-slide-' + number + '-caption"><strong>' + soliloquy_metabox.videocaption + '</strong></label><br /><textarea class="soliloquy-video-slide-caption" id="soliloquy-video-slide-' + number + '-caption"></textarea></p></div>';
            return html;
        }

        // Enable easy video thumbnail selection.
        $(document).on('click', '.soliloquy-video-thumbnail', function(e){
            e.preventDefault();

            var soliloquy_media_frame = wp.media.frames.soliloquy_media_frame = wp.media({
                className: 'media-frame soliloquy-media-frame',
                frame: 'select',
                multiple: false,
                title: soliloquy_metabox.videoframe,
                library: {
                    type: 'image'
                },
                button: {
                    text: soliloquy_metabox.videouse
                }
            }),
                $this = $(this);

            soliloquy_media_frame.on('select', function(){
                // Grab our attachment selection and construct a JSON representation of the model.
                var thumbnail = soliloquy_media_frame.state().get('selection').first().toJSON();

                // Send the attachment URL to our custom input field via jQuery.
                $this.parent().prev().val(thumbnail.url);
            });

            // Now that everything has been set, let's open up the frame.
            soliloquy_media_frame.open();
        });

        // Empty the video thumbnail field.
        $(document).on('click', '.soliloquy-video-thumbnail-delete', function(e){
            e.preventDefault();
            $(this).parent().prev().val('');
        });

        // Delete a video slide from the DOM when the user clicks to remove it.
        $(document).on('click', '#soliloquy-video-slides .soliloquy-delete-video-slide', function(e){
            e.preventDefault();
            $(this).parent().parent().remove();
        });

        var soliloquy_html_holder = {};

        // Initialize the code editor for HTML slides.
    	$('.soliloquy-html').find('.soliloquy-html-code').each(function(i, el){
    		var id = $(el).attr('id');
    		soliloquy_html_holder[id] = CodeMirror.fromTextArea(el, {
    			enterMode: 		'keep',
    			indentUnit: 	4,
    			electricChars:  false,
    			lineNumbers: 	true,
    			lineWrapping: 	true,
    			matchBrackets: 	true,
    			mode: 			'php',
    			smartIndent:    false,
    			tabMode: 		'shift',
    			theme:			'solarized dark'
    		});
    		soliloquy_html_holder[id].on('blur', function(obj){
    			$('#' + id).text(obj.getValue());
    		});
    		soliloquy_html_holder[id].refresh();
    	});

    	// Load in new HTML slides when the add HTML slide button is clicked.
        $(document).on('click', '.soliloquy-add-html-slide', function(e){
            e.preventDefault();
            var number = parseInt($(this).attr('data-soliloquy-html-number')),
                id     = 'soliloquy-html-slide-' + $(this).attr('data-soliloquy-html-number');
            $(this).attr('data-soliloquy-html-number', number + 1 ).parent().before(soliloquyGetHtmlSlideMarkup(number));
            soliloquy_html_holder[id] = CodeMirror.fromTextArea(document.getElementById(id), {
    			enterMode: 		'keep',
    			indentUnit: 	4,
    			electricChars:  false,
    			lineNumbers: 	true,
    			lineWrapping: 	true,
    			matchBrackets: 	true,
    			mode: 			'php',
    			smartIndent:    false,
    			tabMode: 		'shift',
    			theme:			'solarized dark'
    		});
    		soliloquy_html_holder[id].on('blur', function(obj){
    			$('#' + id).text(obj.getValue());
    		});
    		soliloquy_html_holder[id].refresh();
        });

        function soliloquyGetHtmlSlideMarkup(number) {
            var html = '';
            html += '<div class="soliloquy-html-slide-holder"><p class="no-margin-top"><a href="#" class="button button-secondary soliloquy-delete-html-slide" title="' + soliloquy_metabox.removeslide + '">' + soliloquy_metabox.removeslide + '</a><label for="soliloquy-html-slide-' + number + '-title"><strong>' + soliloquy_metabox.htmlslide + '</strong></label><br /><input type="text" class="soliloquy-html-slide-title" id="soliloquy-html-slide-' + number + '-title" value="" placeholder="' + soliloquy_metabox.htmlplace + '" /></p><p class="no-margin-bottom"><label for="soliloquy-html-slide-' + number + '"><strong>' + soliloquy_metabox.htmlcode + '</strong></label><br /><textarea class="soliloquy-html-slide-code" id="soliloquy-html-slide-' + number + '">' + soliloquy_metabox.htmlstart + '</textarea><p><label for="soliloquy-html-slide-' + number + '-thumbnail"><strong>' + soliloquy_metabox.htmlthumb + '</strong></label><br /><input type="text" class="soliloquy-html-slide-thumbnail" id="soliloquy-html-slide-' + number + '-thumbnail" value="" placeholder="' + soliloquy_metabox.htmlsrc + '" /> <span><a href="#" class="soliloquy-html-thumbnail button button-primary">' + soliloquy_metabox.htmlselect + '</a> <a href="#" class="soliloquy-html-thumbnail-delete button button-secondary">' + soliloquy_metabox.htmldelete + '</a></span></p></div>';
            return html;
        }

        // Enable easy HTML thumbnail selection.
        $(document).on('click', '.soliloquy-html-thumbnail', function(e){
            e.preventDefault();

            var soliloquy_media_frame = wp.media.frames.soliloquy_media_frame = wp.media({
                className: 'media-frame soliloquy-media-frame',
                frame: 'select',
                multiple: false,
                title: soliloquy_metabox.htmlframe,
                library: {
                    type: 'image'
                },
                button: {
                    text: soliloquy_metabox.htmluse
                }
            }),
                $this = $(this);

            soliloquy_media_frame.on('select', function(){
                // Grab our attachment selection and construct a JSON representation of the model.
                var thumbnail = soliloquy_media_frame.state().get('selection').first().toJSON();

                // Send the attachment URL to our custom input field via jQuery.
                $this.parent().prev().val(thumbnail.url);
            });

            // Now that everything has been set, let's open up the frame.
            soliloquy_media_frame.open();
        });

        // Delete an HTML slide from the DOM when the user clicks to remove it.
        $(document).on('click', '#soliloquy-html-slides .soliloquy-delete-html-slide', function(e){
            e.preventDefault();
            $(this).parent().parent().remove();
        });

        // Empty the HTML thumbnail field.
        $(document).on('click', '.soliloquy-html-thumbnail-delete', function(e){
            e.preventDefault();
            $(this).parent().prev().val('');
        });

        // Make slider items sortable.
        var slider = $('#soliloquy-output');

        // Use ajax to make the images sortable.
        slider.sortable({
            containment: '#soliloquy',
            items: 'li',
            cursor: 'move',
            forcePlaceholderSize: true,
            placeholder: 'dropzone',
            update: function(event, ui) {
                // Make ajax request to sort out items.
                var opts = {
                    url:      soliloquy_metabox.ajax,
                    type:     'post',
                    async:    true,
                    cache:    false,
                    dataType: 'json',
                    data: {
                        action:  'soliloquy_sort_images',
                        order:   slider.sortable('toArray').toString(),
                        post_id: soliloquy_metabox.id,
                        nonce:   soliloquy_metabox.sort
                    },
                    success: function(response) {
                        return;
                    },
                    error: function(xhr, textStatus ,e) {
                        return;
                    }
                };
                $.ajax(opts);
            }
        });

        // Process image removal from a slider.
        $(document).on('click', '#soliloquy .soliloquy-remove-slide', function(e){
            e.preventDefault();

            // Bail out if the user does not actually want to remove the image.
            var confirm_delete = confirm(soliloquy_metabox.remove);
            if ( ! confirm_delete )
                return;

            // Prepare our data to be sent via Ajax.
            var attach_id = $(this).parent().attr('id'),
                remove = {
                    action:        'soliloquy_remove_slide',
                    attachment_id: attach_id,
                    post_id:       soliloquy_metabox.id,
                    nonce:         soliloquy_metabox.remove_nonce
                };

            // Process the Ajax response and output all the necessary data.
            $.post(
                soliloquy_metabox.ajax,
                remove,
                function(response) {
                    $('#' + attach_id).fadeOut('normal', function() {
                        $(this).remove();

                        // Refresh the modal view to ensure no items are still checked if they have been removed.
                        $('.soliloquy-load-library').attr('data-soliloquy-offset', 0).addClass('has-search').trigger('click');
                    });
                },
                'json'
            );
        });

        // Open up the media modal area for modifying slider metadata.
        var soliloquy_main_frame_meta = false;
        $(document).on('click.soliloquyModify', '#soliloquy .soliloquy-modify-slide', function(e){
            e.preventDefault();
            var attach_id = $(this).parent().data('soliloquy-slide'),
                formfield = 'soliloquy-meta-' + attach_id;

            // Show the modal.
            soliloquy_main_frame_meta = true;
            $('#' + formfield).appendTo('body').show();

            // Refresh any HTML slides.
            $.each(soliloquy_html_holder, function(){
    			this.refresh();
    		});

            // Close the modal window on user action
            var append_and_hide_meta = function(e){
                e.preventDefault();
                $('#' + formfield).appendTo('#' + attach_id).hide();
                soliloquy_main_frame_meta = false;
                $(document).off('click.soliloquyLink');
            };
            $(document).on('click.soliloquyIframe', '.media-modal-close, .media-modal-backdrop', append_and_hide_meta);
            $(document).off('keydown.soliloquyIframe').on('keydown.soliloquyIframe', function(e){
                if ( 27 == e.keyCode && soliloquy_main_frame_meta ) {
                    append_and_hide_meta(e);
                }
            });
            $(document).on('click.soliloquyLink', '.ed_button', function(){
                // Set custom z-index for link dialog box.
                $('#wp-link-backdrop').css('zIndex', '170100');
                $('#wp-link-wrap').css('zIndex', '171005' );
            });
        });

        // Save the slider metadata.
        $(document).on('click', '.soliloquy-meta-submit', function(e){
            e.preventDefault();
            var $this     = $(this),
                default_t = $this.text(),
                attach_id = $this.data('soliloquy-item'),
                formfield = 'soliloquy-meta-' + attach_id,
                meta      = {};

            // Output saving text...
            $this.text(soliloquy_metabox.saving);

            // Add the title since it is a special field.
            meta.caption = $('#soliloquy-meta-table-' + attach_id).find('textarea[name="_soliloquy[meta_caption]"]').val();

            // Get all meta fields and values.
            $('#soliloquy-meta-table-' + attach_id).find(':input,select').not('.ed_button').each(function(i, el){
                if ( $(this).data('soliloquy-meta') ) {
                    if ( 'checkbox' == $(this).attr('type') || 'radio' == $(this).attr('type') ) {
                        meta[$(this).data('soliloquy-meta')] = $(this).is(':checked') ? 1 : 0;
                    } else if ( 'select' == $(this).attr('type') ) {
                        meta[$(this).data('soliloquy-meta')] = $(this).find(':selected').val();
                    } else {
                        meta[$(this).data('soliloquy-meta')] = $(this).val();
                    }
                }
            });

            // Prepare the data to be sent.
            var data = {
                action:    'soliloquy_save_meta',
                nonce:     soliloquy_metabox.save_nonce,
                attach_id: attach_id,
                post_id:   soliloquy_metabox.id,
                meta:      meta
            };

            $.post(
                soliloquy_metabox.ajax,
                data,
                function(res){
                    setTimeout(function(){
                        $('#' + formfield).appendTo('#' + attach_id).hide();
                        $this.text(default_t);
                    }, 500);
                },
                'json'
            );
        });

        // Append spinner when importing a slider.
        $(document).on('click', '#soliloquy-import-submit', function(e){
            $(this).next().css('display', 'inline-block');
            if ( $('#soliloquy-config-import-slider').val().length === 0 ) {
                e.preventDefault();
                $(this).next().hide();
                alert(soliloquy_metabox.import);
            }
        });

        // Polling function for typing and other user centric items.
        var delay = (function() {
            var timer = 0;
            return function(callback, ms) {
                clearTimeout(timer);
                timer = setTimeout(callback, ms);
            };
        })();

        // Close the modal window on user action.
        var soliloquy_main_frame = false;
        var append_and_hide = function(e){
            e.preventDefault();
            $('#soliloquy-upload-ui').appendTo('#soliloquy-upload-ui-wrapper').hide();
            soliloquyRefresh();
            soliloquy_main_frame = false;
        };
        $(document).on('click', '#soliloquy-upload-ui .media-modal-close, #soliloquy-upload-ui .media-modal-backdrop', append_and_hide);
        $(document).on('keydown', function(e){
            if ( 27 == e.keyCode && soliloquy_main_frame )
                append_and_hide(e);
        });

        // Function to refresh images in the slider.
        function soliloquyRefresh(){
            var data = {
                action:  'soliloquy_refresh',
                post_id: soliloquy_metabox.id,
                nonce:   soliloquy_metabox.refresh_nonce
            };

            $('.max-upload-size').after('<span class="spinner soliloquy-spinner soliloquy-spinner-refresh"></span>');
            $('.soliloquy-spinner-refresh').css({'display' : 'inline-block', 'margin-top' : '-3px'});

            $.post(
                soliloquy_metabox.ajax,
                data,
                function(res){
                    if ( res && res.success ) {
                        $('#soliloquy-output').html(res.success);
                        $('#soliloquy-output').find('.wp-editor-wrap').each(function(i, el){
                            var qt = $(el).find('.quicktags-toolbar');
                            if ( qt.length > 0 ) {
                                return;
                            }

                            var arr = $(el).attr('id').split('-'),
                                id  = arr.slice(3, -1).join('-');
                            quicktags({id: 'soliloquy-caption-' + id, buttons: 'strong,em,link,ul,ol,li,close'});
                            QTags._buttonsInit(); // Force buttons to initialize.
                        });

                        // Initialize any code editors that have been generated with HTML slides.
        				$('.soliloquy-html').find('.soliloquy-html-code').each(function(i, el){
        					var id = $(el).attr('id');
        					soliloquy_html_holder[id] = CodeMirror.fromTextArea(el, {
        						enterMode: 		'keep',
        						indentUnit: 	4,
        						electricChars:  false,
        						lineNumbers: 	true,
        						lineWrapping: 	true,
        						matchBrackets: 	true,
        						mode: 			'php',
        						smartIndent:    false,
        						tabMode: 		'shift',
        						theme:			'solarized dark'
        					});
        					soliloquy_html_holder[id].on('blur', function(obj){
        						$('#' + id).text(obj.getValue());
        					});
        					soliloquy_html_holder[id].refresh();
        				});

                        // Trigger a custom event for 3rd party scripts.
                        $('#soliloquy-output').trigger({ type: 'soliloquyRefreshed', html: res.success, id: soliloquy_metabox.id });
                    }

                    // Remove the spinner.
                    $('.soliloquy-spinner-refresh').fadeOut(300, function(){
                        $(this).remove();
                    });
                },
                'json'
            );
        }

        // Function to show conditional fields.
        function soliloquyConditionals() {
            var soliloquy_mobile_option  = $('#soliloquy-config-mobile');
            if ( soliloquy_mobile_option.is(':checked') )
                $('#soliloquy-config-mobile-size-box').fadeIn(300);
            soliloquy_mobile_option.on('change', function(){
                if ( $(this).is(':checked') )
                    $('#soliloquy-config-mobile-size-box').fadeIn(300);
                else
                    $('#soliloquy-config-mobile-size-box').fadeOut(300);
            });
        }

        // Function to initialize plupload.
        function soliloquyPlupload() {
            // Append the custom loading progress bar.
            $('#soliloquy .drag-drop-inside').append('<div class="soliloquy-progress-bar"><div></div></div>');

            // Prepare variables.
            soliloquy_uploader     = new plupload.Uploader(soliloquy_metabox.plupload);
            var soliloquy_bar      = $('#soliloquy .soliloquy-progress-bar'),
                soliloquy_progress = $('#soliloquy .soliloquy-progress-bar div'),
                soliloquy_output   = $('#soliloquy-output');

            // Only move forward if the uploader is present.
            if ( soliloquy_uploader ) {
                soliloquy_uploader.bind('Init', function(up) {
                    var uploaddiv = $('#soliloquy-plupload-upload-ui');

                    // If drag and drop, make that happen.
                    if ( up.features.dragdrop && ! $(document.body).hasClass('mobile') ) {
                        uploaddiv.addClass('drag-drop');
                        $('#soliloquy-drag-drop-area').bind('dragover.wp-uploader', function(){
                            uploaddiv.addClass('drag-over');
                        }).bind('dragleave.wp-uploader, drop.wp-uploader', function(){
                            uploaddiv.removeClass('drag-over');
                        });
                    } else {
                        uploaddiv.removeClass('drag-drop');
                        $('#soliloquy-drag-drop-area').unbind('.wp-uploader');
                    }

                    // If we have an HTML4 runtime, hide the flash bypass.
                    if ( up.runtime == 'html4' )
                        $('.upload-flash-bypass').hide();
                });

                // Initialize the uploader.
                soliloquy_uploader.init();

                // Bind to the FilesAdded event to show the progess bar.
                soliloquy_uploader.bind('FilesAdded', function(up, files){
                    var hundredmb = 100 * 1024 * 1024,
                        max       = parseInt(up.settings.max_file_size, 10);

                    // Remove any errors.
                    $('#soliloquy-upload-error').html('');

                    // Show the progress bar.
                    $(soliloquy_bar).show().css('display', 'block');

                    // Upload the files.
                    plupload.each(files, function(file){
                        if ( max > hundredmb && file.size > hundredmb && up.runtime != 'html5' ) {
                            soliloquyUploadError( up, file, true );
                        }
                    });

                    // Refresh and start.
                    up.refresh();
                    up.start();
                });

                // Bind to the UploadProgress event to manipulate the progress bar.
                soliloquy_uploader.bind('UploadProgress', function(up, file){
                    $(soliloquy_progress).css('width', up.total.percent + '%');
                });

                // Bind to the FileUploaded event to set proper UI display for slider.
                soliloquy_uploader.bind('FileUploaded', function(up, file, info){
                    // Make an ajax request to generate and output the image in the slider UI.
                    $.post(
                        soliloquy_metabox.ajax,
                        {
                            action:  'soliloquy_load_image',
                            nonce:   soliloquy_metabox.load_image,
                            id:      info.response,
                            post_id: soliloquy_metabox.id
                        },
                        function(res){
                            $(soliloquy_output).append(res);
                            $(res).find('.wp-editor-container').each(function(i, el){
                                var id = $(el).attr('id').split('-')[3];
                                quicktags({id: 'soliloquy-caption-' + id, buttons: 'strong,em,link,ul,ol,li,close'});
                                QTags._buttonsInit(); // Force buttons to initialize.
                            });
                        },
                        'json'
                    );
                });

                // Bind to the UploadComplete event to hide and reset the progress bar.
                soliloquy_uploader.bind('UploadComplete', function(){
                    $(soliloquy_bar).hide().css('display', 'none');
                    $(soliloquy_progress).removeAttr('style');
                });

                // Bind to any errors and output them on the screen.
                soliloquy_uploader.bind('Error', function(up, error) {
                    var hundredmb = 100 * 1024 * 1024,
                        error_el  = $('#soliloquy-upload-error'),
                        max;
                    switch (error) {
                        case plupload.FAILED:
                        case plupload.FILE_EXTENSION_ERROR:
                            error_el.html('<p class="error">' + pluploadL10n.upload_failed + '</p>');
                            break;
                        case plupload.FILE_SIZE_ERROR:
                            soliloquyUploadError(up, error.file);
                            break;
                        case plupload.IMAGE_FORMAT_ERROR:
                            wpFileError(fileObj, pluploadL10n.not_an_image);
                            break;
                        case plupload.IMAGE_MEMORY_ERROR:
                            wpFileError(fileObj, pluploadL10n.image_memory_exceeded);
                            break;
                        case plupload.IMAGE_DIMENSIONS_ERROR:
                            wpFileError(fileObj, pluploadL10n.image_dimensions_exceeded);
                            break;
                        case plupload.GENERIC_ERROR:
                            wpQueueError(pluploadL10n.upload_failed);
                            break;
                        case plupload.IO_ERROR:
                            max = parseInt(uploader.settings.max_file_size, 10);

                            if ( max > hundredmb && fileObj.size > hundredmb )
                                wpFileError(fileObj, pluploadL10n.big_upload_failed.replace('%1$s', '<a class="uploader-html" href="#">').replace('%2$s', '</a>'));
                            else
                                wpQueueError(pluploadL10n.io_error);
                            break;
                        case plupload.HTTP_ERROR:
                            wpQueueError(pluploadL10n.http_error);
                            break;
                        case plupload.INIT_ERROR:
                            $('.media-upload-form').addClass('html-uploader');
                            break;
                        case plupload.SECURITY_ERROR:
                            wpQueueError(pluploadL10n.security_error);
                            break;
                        default:
                            soliloquyUploadError(up, error.file);
                            break;
                    }
                    up.refresh();
                });
            }
        }

        // Function for displaying file upload errors.
        function soliloquyUploadError( up, file, over100mb ) {
            var message;

            if ( over100mb ) {
                message = pluploadL10n.big_upload_queued.replace('%s', file.name) + ' ' + pluploadL10n.big_upload_failed.replace('%1$s', '<a class="uploader-html" href="#">').replace('%2$s', '</a>');
            } else {
                message = pluploadL10n.file_exceeds_size_limit.replace('%s', file.name);
            }
            
            $('#soliloquy-upload-error').html('<div class="error fade"><p>' + message + '</p></div>');
            up.removeFile(file);
        }
    });
}(jQuery));