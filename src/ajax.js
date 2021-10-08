jSuites.ajax = (function(options) {
    if (! options.data) {
        options.data = {};
    }

    if (options.type) {
        options.method = options.type;
    }

    if (options.data) {
        var data = [];
        var keys = Object.keys(options.data);

        if (keys.length) {
            for (var i = 0; i < keys.length; i++) {
                if (typeof(options.data[keys[i]]) == 'object') {
                    var o = options.data[keys[i]];
                    for (var j = 0; j < o.length; j++) {
                        if (typeof(o[j]) == 'string') {
                            data.push(keys[i] + '[' + j + ']=' + encodeURIComponent(o[j]));
                        } else {
                            var prop = Object.keys(o[j]);
                            for (var z = 0; z < prop.length; z++) {
                                data.push(keys[i] + '[' + j + '][' + prop[z] + ']=' + encodeURIComponent(o[j][prop[z]]));
                            }
                        }
                    }
                } else {
                    data.push(keys[i] + '=' + encodeURIComponent(options.data[keys[i]]));
                }
            }
        }

        if (options.method == 'GET' && data.length > 0) {
            if (options.url.indexOf('?') < 0) {
                options.url += '?';
            }
            options.url += data.join('&');
        }
    }

    var httpRequest = new XMLHttpRequest();
    httpRequest.open(options.method, options.url, true);
    httpRequest.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    if (options.method == 'POST') {
        httpRequest.setRequestHeader('Accept', 'application/json');
        httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    } else {
        if (options.dataType == 'json') {
            httpRequest.setRequestHeader('Content-Type', 'text/json');
        }
    }

    // No cache
    if (options.cache != true) {
        httpRequest.setRequestHeader('pragma', 'no-cache');
        httpRequest.setRequestHeader('cache-control', 'no-cache');
    }

    // Authentication
    if (options.withCredentials == true) {
        httpRequest.withCredentials = true
    }

    // Before send
    if (typeof(options.beforeSend) == 'function') {
        options.beforeSend(httpRequest);
    }

    httpRequest.onload = function() {
        if (httpRequest.status === 200) {
            if (options.dataType == 'json') {
                try {
                    var result = JSON.parse(httpRequest.responseText);

                    if (options.success && typeof(options.success) == 'function') {
                        options.success(result);
                    }
                } catch(err) {
                    if (options.error && typeof(options.error) == 'function') {
                        options.error(result);
                    }
                }
            } else {
                var result = httpRequest.responseText;

                if (options.success && typeof(options.success) == 'function') {
                    options.success(result);
                }
            }
        } else {
            if (options.error && typeof(options.error) == 'function') {
                options.error(httpRequest.responseText);
            }
        }

        // Global complete method
        if (obj.ajax.requests && obj.ajax.requests.length) {
            // Get index of this request in the container
            var index = obj.ajax.requests.indexOf(httpRequest)
            // Remove from the ajax requests container
            obj.ajax.requests.splice(index, 1);
            // Last one?
            if (! obj.ajax.requests.length) {
                if (options.complete && typeof(options.complete) == 'function') {
                    options.complete(result);
                }
            }
        }
    }

    if (data) {
        httpRequest.send(data.join('&'));
    } else {
        httpRequest.send();
    }

    obj.ajax.requests.push(httpRequest);

    return httpRequest;
});

obj.ajax.exists = function(url, __callback) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    if (http.status) {
        __callback(http.status);
    }
}

obj.ajax.requests = [];

obj.ajax.queue = [];