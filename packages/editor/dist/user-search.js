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
    global.userSearch = factory();
}(this, (function () {

    return function(el) {

        // Add user search
        var userSearch = document.createElement('div');
        el.appendChild(userSearch);

        // Component
        var userSearchInstance = jSuites.search(userSearch, {
            data: window.location.href,
            placeholder: jSuites.translate('Type the name a user'),
            onselect: function(a,b,c,d) {
                if (userSearchInstance.isOpened()) {
                    var t = jSuites.getNode();
                    if (t && t.searchable == true && (t.innerText.trim() && t.innerText.substr(1))) {
                        t.innerText = '@' + c;
                        t.href = '/' + c;
                        t.setAttribute('data-user', d);
                        t.setAttribute('data-label', t.innerText);
                        t.searchable = false;
                        jSuites.focus(t);
                    }
                }
            }
        });

        // Create node
        var createUserSearchNode = function() {
            // Get coordinates from caret
            var sel = window.getSelection ? window.getSelection() : document.selection;
            var range = sel.getRangeAt(0);
            range.deleteContents();
            // Append text node
            var input = document.createElement('a');
            input.innerText = '@';
            input.searchable = true;
            range.insertNode(input);
            var node = range.getBoundingClientRect();
            range.collapse(false);
            // Position
            userSearch.style.position = 'fixed';
            userSearch.style.top = node.top + node.height + 10 + 'px';
            userSearch.style.left = node.left + 2 + 'px';
        }

        var methods = {};

        methods.setUrl = function(url) {
            userSearchInstance.options.data = url;
        }

        methods.onevent = function(e) {
            if (e.type === 'keydown') {
                if (e.key == '@') {
                    createUserSearchNode(this.editor);
                    e.preventDefault();
                } else {
                    if (userSearchInstance.isOpened()) {
                        userSearchInstance.keydown(e);
                    }
                }
            } else if (e.type === 'keyup') {
                var t = jSuites.getNode();
                if (t) {
                    if (t.searchable === true) {
                        if (t.innerText && t.innerText.substr(0,1) == '@') {
                            userSearchInstance(t.innerText.substr(1));
                        }
                    } else if (t.searchable === false) {
                        if (t.innerText !== t.getAttribute('data-label'))  {
                            t.searchable = true;
                            t.removeAttribute('href');
                        }
                    }
                }
            } else if (e.type == 'blur') {
                if (userSearchInstance.isOpened()) {
                    userSearchInstance.close();
                }
            }
        }

        methods.getData = function(data) {
            // Get tag users
            var tagged = this.editor.querySelectorAll('a[data-user]');
            if (tagged.length) {
                data.users = [];
                for (var i = 0; i < tagged.length; i++) {
                    var userId = tagged[i].getAttribute('data-user');
                    if (userId) {
                        data.users.push(userId);
                    }
                }
                data.users = data.users.join(',');
            }
        }

        return methods;
    }

})));




