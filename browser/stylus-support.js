;(function($) {

var $head = $('head');

var loadStyles = function() {
    $('link[rel="stylesheet/stylus"]').each(function(index, link) {
        $.ajax({
            url: link.href,
            type: 'GET',
            dataType: 'text',
            success: function(file_contents) {
                stylus(file_contents).render(function(err, css) {
                    if (err) {
                        alert(arr);
                        return;
                    }

                    // Create style element.
                    var $style = $('<style type="text/css"></style>');
                    $style
                        .html(css.trim())
                        .appendTo($head);
                })
            }
        });

    });
};

// Load styles on dom ready.
$(loadStyles);

}(jQuery));