jSuites.files = (function(element) {
    if (! element) {
        console.error('No element defined in the arguments of your method');
    }

    var obj = {};

    // DOM references
    var D = [];

    // Files container
    obj.data = [];

    /**
     * Get list of files and properties
     */
    obj.get = function() {
        return obj.data;
    }

    /**
     * Update the properties of files
     */
    obj.getNames = function(options) {
        if (options && options.folder) {
            var folder = options.folder;
        } else {
            var folder = '/media';
        }

        // Get attachments
        var data = {};
        for (var i = 0; i < D.length; i++) {
            if (D[i] && D[i].src.substr(0,5) == 'blob:') {
                var name = D[i].src.split('/');
                data[D[i].src] = folder + '/' + name[name.length - 1] + '.' + D[i].getAttribute('data-extension');
            }
        }

        return data;
    }

    /**
     * Update the properties of files
     */
    obj.updateNames = function(options) {
        if (options && options.folder) {
            var folder = options.folder;
        } else {
            var folder = '/media';
        }

        // Get attachments
        for (var i = 0; i < D.length; i++) {
            if (D[i] && D[i].src.substr(0,5) == 'blob:') {
                var name = D[i].src.split('/');
                D[i].src = folder + '/' + name[name.length - 1] + '.' + D[i].getAttribute('data-extension');
            }
        }
    }

    /**
     * Remove files
     */
    obj.remove = function() {
        // Get attachments
        var files = element.querySelectorAll('.jfile');

        if (files.length > 0) {
            // Read all files
            for (var i = 0; i < files.length; i++) {
                var file = {};

                var src = files[i].getAttribute('src');

                if (files[i].classList.contains('jremove')) {
                    files[i].remove();
                }
            }
        }
    }

    /**
     * Set list of files and properties for upload
     */
    obj.set = function() {
        // Reset references
        D = [];
        // Reset container
        obj.data = [];

        // Get attachments
        var files = element.querySelectorAll('.jfile');

        if (files.length > 0) {
            // Read all files
            for (var i = 0; i < files.length; i++) {
                var file = {};

                var src = files[i].getAttribute('src');

                if (files[i].classList.contains('jremove')) {
                    file.remove = 1;
                } else {
                    if (src.substr(0,5) == 'data:') {
                        file.content = src.substr(5);
                        file.extension = files[i].getAttribute('data-extension');
                    } else {
                        file.file = src;
                        file.extension = files[i].getAttribute('data-extension');
                        if (! file.extension) {
                            file.extension =  src.substr(src.lastIndexOf('.') + 1);
                        }

                        if (files[i].content) {
                            file.content = files[i].content;
                        }
                    }

                    // Optional file information
                    if (files[i].getAttribute('data-name')) {
                        file.name = files[i].getAttribute('data-name');
                    }
                    if (files[i].getAttribute('data-file')) {
                        file.file = files[i].getAttribute('data-file');
                    }
                    if (files[i].getAttribute('data-size')) {
                        file.size = files[i].getAttribute('data-size');
                    }
                    if (files[i].getAttribute('data-date')) {
                        file.date = files[i].getAttribute('data-date');
                    }
                    if (files[i].getAttribute('data-cover')) {
                        file.cover = files[i].getAttribute('data-cover');
                    }
                }

                // DOM reference
                D.push(files[i]);

                // Push file
                obj.data.push(file);
            }

            return obj.data;
        }
    }

    obj.set();

    return obj;
});