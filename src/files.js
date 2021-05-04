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
            if (D[i] && D[i].src && D[i].src.substr(0,5) == 'blob:') {
                var name = D[i].src.split('/');
                data[D[i].src] = folder + '/' + name[name.length - 1] + '.' + D[i].content[i].extension;
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
            if (D[i] && D[i].src && D[i].src.substr(0,5) == 'blob:') {
                var name = D[i].src.split('/');
                D[i].src = folder + '/' + name[name.length - 1] + '.' + D[i].content[i].extension;
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
                if (Array.isArray(files[i].content)) {
                    if (files[i].content.length) {
                        for (var j = 0; j < files[i].content.length; j++) {
                            // File name
                            if (! files[i].content[j].content) {
                                files[i].content[j].content = files[i].content[j].file;
                                if (files[i].src && files[i].src.length < 255) {
                                    files[i].content[j].file = files[i].src;
                                } else {
                                    files[i].content[j].file = jSuites.guid();
                                }
                            }
                            // Push file
                            obj.data.push(files[i].content[j]);
                        }
                    }
                } else {
                    if (files[i].content) {
                        if (files[i].classList.contains('jremove')) {
                            files[i].content.file.remove = 1;
                        }

                        // File name
                        if (! files[i].content.content) {
                            files[i].content.content = files[i].content.file;
                            if (files[i].src && files[i].src.length < 255) {
                                files[i].content.file = files[i].src;
                            } else {
                                files[i].content.file = jSuites.guid();
                            }
                        }
                        // Push file
                        obj.data.push(files[i].content);
                    }
                }

                // DOM reference
                D.push(files[i]);
            }

            return obj.data;
        }
    }

    obj.set();

    return obj;
});

