/**
 * (c) jSuites Javascript Plugins and Web Components (v4)
 *
 * Website: https://jsuites.net
 * Description: Create amazing web based applications.
 * Plugin: Organogram
 *
 * MIT License
 */

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.urlParser = factory();
}(this, (function () {

    return function(el, obj) {

        const youtubeParser = function(url) {
            var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
            var match = url.match(regExp);

            return (match && match[7].length == 11) ? match[7] : false;
        }

        const detectUrl = function(text) {
            var expression = /(((https?:\/\/)|(www\.))[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|]+)/ig;
            var links = text.match(expression);

            if (links) {
                if (links[0].substr(0,3) == 'www') {
                    links[0] = 'http://' + links[0];
                }
            }

            return links;
        }

        const parseWebsite = function(url, youtubeId) {
            if (! obj.options.remoteParser) {
                console.log('The remoteParser is not defined');
            } else {
                // Youtube definitions
                if (youtubeId) {
                    var url = 'https://www.youtube.com/watch?v=' + youtubeId;
                }

                var p = {
                    title: '',
                    description: '',
                    image: '',
                    host: url.split('/')[2],
                    url: url,
                }

                jSuites.ajax({
                    url: obj.options.remoteParser + encodeURI(url.trim()),
                    method: 'GET',
                    dataType: 'json',
                    success: function(result) {
                        // Get title
                        if (result.title) {
                            p.title = result.title;
                        }
                        // Description
                        if (result.description) {
                            p.description = result.description;
                        }
                        // Host
                        if (result.host) {
                            p.host = result.host;
                        }
                        // Url
                        if (result.url) {
                            p.url = result.url;
                        }
                        // Append snippet
                        obj.appendSnippet(p);
                        // Add image
                        if (result.image) {
                            obj.addImage(result.image, true);
                        } else if (result['og:image']) {
                            obj.addImage(result['og:image'], true);
                        }
                    }
                });
            }
        }

        var editorTimer = null;

        var allowExtensions = ['png','jpg','jpeg','gif','svg'];

        const verifyEditor = function() {
            // Clear timeout
            clearTimeout(editorTimer);
            // Start counting the time again
            editorTimer = setTimeout(function() {
                var snippet = obj.editor.querySelector('.jsnippet');
                if (! snippet) {
                    var html = obj.editor.innerHTML.replace(/\n/g, ' ');
                    var container = document.createElement('div');
                    container.innerHTML = html;
                    var text = container.innerText;

                    // Detect a URL
                    var url = detectUrl(text);
                    if (url) {
                        // If the URL is an image
                        var ext = url[0].split('.');
                        if (allowExtensions.indexOf(ext[ext.length-1]) !== -1) {
                            // Add the image
                            obj.addImage(url[0], true);
                        } else {
                            // If the URL is from a youtube link
                            var id = youtubeParser(url[0]);
                            // Parse the link
                            parseWebsite(url[0], id);
                        }
                    }
                }
            }, 1000);
        }

        const getDomain = function(url) {
            return url.replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/)[0].split(/:/g)[0];
        }

        var methods = {};

        methods.onevent = function(e) {
            if (e.type == 'keydown') {
                verifyEditor();
            }
        }

        return methods;
    }

})));


