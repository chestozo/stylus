;(function($) {

var reImport = /^\s*@import\s*(.*)\s*$/gi;
var $head = $('head');

// ----------------------------------------------------------------------------------------------------------------- //

/**
 * Async file loader.
 * @param url Relative file url.
 * @param path Base part of the url.
 */
var FileLoader = function(url, path) {
    this.url = path + url;
};

FileLoader.prototype.startLoading = function() {
    var promise = new $.Deferred();

    $.ajax({
        url: this.url,
        type: 'GET',
        dataType: 'text',
        success: function(file_contents) {
            promise.resolve(file_contents);
        }
    });

    return promise;
};

// ----------------------------------------------------------------------------------------------------------------- //

// One level loader.
// It will create more loaders for inner imports.
var Loader = function(raw_stylus_code, url, path) {
    this.raw = raw_stylus_code;
    this.url = url;
    this.path = path;

    this.parts = []; // ready strings and more loaders where import was found
    this.done_promise = new $.Deferred();
};

Loader.prototype.load = function() {
    var that = this;
    var wait = [];
    var p;

    this.splitByImport();
    var parts = this.parts;

    for (var i = 0; i < parts.length; i++) {
        p = parts[i];
        if (typeof p === 'string') {

        } else { // @import is here

            // Replace file loader with loaded file content.
            (function(part_index, loaded_promise) {
                $.when(loaded_promise).then(function(file_contents) {
                    that.parts[part_index] = file_contents;
                });
            } (i, p.promise));

            // Add file loader promise to wait list.
            wait.push(p.promise);
        }
    }

    // After all files loaded - join all files content and resolve master promise.
    $.when(wait).done(function() {
        that.done_promise.resolve(that.parts.join('\n'));
    });

    return this.done_promise; // Return master promise.
};

Loader.prototype.splitByImport = function() {
    var rows = this.raw.split('\n');
    var buf = [];
    var r, joined;

    for (var i = 0; i < rows.length; i++) {
        r = rows[i];
        if (reImport.test(r)) {
            joined = buf.join('\n');
            buf = [];
            if (joined.length > 0) {
                this.parts.push(joined);
            }

            // Create another loader for import.
            // TODO get url
            this.parts.push(new FileLoader('', this.path));

        } else {
            buf.push(r);
        }
    }

    if (buf.length > 0) {
        this.parts.push(buf.join('\n'));
    }
};

// ----------------------------------------------------------------------------------------------------------------- //

var loadStyles = function() {
    $('link[rel="stylesheet/stylus"]').each(function(index, link) {
        var href = link.href;
        var url_parts = href.split('/');
        var file = url_parts[url_parts.length - 1];
        url_parts.pop();
        var path = url_parts.join('/') + "/";

        var fl = new FileLoader(file, path);
        fl.startLoading()
            .done(function(file_contents) {

                var l = new Loader(file_contents);
                l.load().done(function(full_contents) {

                    // Get css from stylus code.
                    stylus(full_contents).render(function(err, css) {
                        if (err) {
                            alert(arr);
                            return;
                        }

                        // Create style element.
                        var $style = $('<style type="text/css"></style>');
                        $style
                            .html(css.trim())
                            .appendTo($head);
                    });

                });

            });
    });
};

// Load styles on dom ready.
$(loadStyles);

}(jQuery));