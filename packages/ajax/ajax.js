;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.ajax = factory();
}(this, (function () {

    'use strict';

    var oncomplete = {};
    var requests = [];
    var queue = [];

    /**
     *
     * @type {function(*=, *=): ({instance: [], complete: *})}
     */
    var P = (function (options, complete) {
        if (Array.isArray(options)) {
            // Create multiple request controller 
            var multiple = {
                instance: [],
                complete: complete,
            }

            if (options.length > 0) {
                for (var i = 0; i < options.length; i++) {
                    options[i].multiple = multiple;
                    multiple.instance.push(P(options[i]));
                }
            }

            return multiple;
        }

        if (! options.data) {
            options.data = {};
        }

        if (options.type) {
            options.method = options.type;
        }

        // Default method
        if (! options.method) {
            options.method = 'GET';
        }

        // Default type
        if (! options.dataType) {
            options.dataType = 'json';
        }

        if (options.data) {
            // Parse object to variables format
            var parseData = function (value, key) {
                var vars = [];
                var keys = Object.keys(value);
                if (keys.length) {
                    for (var i = 0; i < keys.length; i++) {
                        if (key) {
                            var k = key + '[' + keys[i] + ']';
                        } else {
                            var k = keys[i];
                        }

                        if (typeof (value[keys[i]]) == 'object') {
                            var r = parseData(value[keys[i]], k);
                            var o = Object.keys(r);
                            for (var j = 0; j < o.length; j++) {
                                vars[o[j]] = r[o[j]];
                            }
                        } else {
                            vars[k] = value[keys[i]];
                        }
                    }
                }

                return vars;
            }

            var data = [];
            var d = parseData(options.data);
            var k = Object.keys(d);
            for (var i = 0; i < k.length; i++) {
                data.push(k[i] + '=' + encodeURIComponent(d[k[i]]));
            }

            if (options.method === 'GET' && data.length > 0) {
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
            } else if (options.dataType == 'blob') {
                httpRequest.responseType = "blob";
            } else if (options.dataType == 'html') {
                httpRequest.setRequestHeader('Content-Type', 'text/html');
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
        if (typeof (options.beforeSend) == 'function') {
            options.beforeSend(httpRequest);
        }

        httpRequest.onload = function () {
            if (httpRequest.status === 200) {
                if (options.dataType == 'json') {
                    try {
                        var result = JSON.parse(httpRequest.responseText);

                        if (options.success && typeof (options.success) == 'function') {
                            options.success(result);
                        }
                    } catch (err) {
                        if (options.error && typeof (options.error) == 'function') {
                            options.error(err, result);
                        }
                    }
                } else {
                    if (options.dataType == 'blob') {
                        var result = httpRequest.response;
                    } else {
                        var result = httpRequest.responseText;
                    }

                    if (options.success && typeof (options.success) == 'function') {
                        options.success(result);
                    }
                }
            } else {
                if (options.error && typeof (options.error) == 'function') {
                    options.error(httpRequest.responseText, httpRequest.status);
                }
            }

            // Global queue
            if (queue && queue.length > 0) {
                P.send(queue.shift());
            }

            // Global complete method
            if (requests && requests.length) {
                // Get index of this request in the container
                var index = requests.indexOf(httpRequest);
                // Remove from the ajax requests container
                requests.splice(index, 1);
                // Deprected: Last one?
                if (!requests.length) {
                    // Object event
                    if (options.complete && typeof (options.complete) == 'function') {
                        options.complete(result);
                    }
                }
                // Group requests
                if (options.group) {
                    if (oncomplete && typeof (oncomplete[options.group]) == 'function') {
                        if (!P.pending(options.group)) {
                            oncomplete[options.group]();
                            oncomplete[options.group] = null;
                        }
                    }
                }
                // Multiple requests controller
                if (options.multiple && options.multiple.instance) {
                    // Get index of this request in the container
                    var index = options.multiple.instance.indexOf(httpRequest);
                    // Remove from the ajax requests container
                    options.multiple.instance.splice(index, 1);
                    // If this is the last one call method complete
                    if (!options.multiple.instance.length) {
                        if (options.multiple.complete && typeof (options.multiple.complete) == 'function') {
                            options.multiple.complete(result);
                        }
                    }
                }
            }
        }

        // Keep the options
        httpRequest.options = options;
        // Data
        httpRequest.data = data;

        // Queue
        if (options.queue == true && requests.length > 0) {
            queue.push(httpRequest);
        } else {
            P.send(httpRequest)
        }

        return httpRequest;
    });

    P.send = function (httpRequest) {
        if (httpRequest.data) {
            httpRequest.send(httpRequest.data.join('&'));
        } else {
            httpRequest.send();
        }

        requests.push(httpRequest);
    }

    P.exists = function (url, __callback) {
        var http = new XMLHttpRequest();
        http.open('HEAD', url, false);
        http.send();
        if (http.status) {
            __callback(http.status);
        }
    }

    P.pending = function (group) {
        var n = 0;
        var o = requests;
        if (o && o.length) {
            for (var i = 0; i < o.length; i++) {
                if (!group || group == o[i].options.group) {
                    n++
                }
            }
        }
        return n;
    }

    return P;

})));