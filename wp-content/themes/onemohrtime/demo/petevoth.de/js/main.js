$(document).ready(function() {
    $.jribbble.setToken('8511e98bc154687719eb09e014c965b169369470f618d3bb478221accfa5b078');
    $.jribbble.users('onemohrtime').shots({per_page: 6}).then(function(shots) {
        var html = [];
        
        shots.forEach(function(shot) {
            html.push('<figure class="shot">');
            html.push('<img src="' + shot.images.normal + '" alt="' + shot.title + '" class="shot__img" />');
            html.push('<a href="' + shot.html_url + '" target="_blank" class="shot__link">');
            html.push('</a></figure>');
        });
        
        $('#dribbble').html(html.join(''));
    });
});