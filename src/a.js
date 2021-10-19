var jSuites = function(options) {
    var obj = {}
    var version = '4.9.12';

    var find = function(DOMElement, component) {
        if (DOMElement[component.type] && DOMElement[component.type] == component) {
            return true;
        }
        if (DOMElement.parentNode) {
            return find(DOMElement.parentNode, component);
        }
        return false;
    }


    var isOpened = function(element) {
        if (jSuites.current.length > 0) {
            for (var i = 0; i < jSuites.current.length; i++) {
                if (jSuites.current[i] && ! find(element, jSuites.current[i])) {
                    jSuites.current[i].close();
                }
            }
        }
    }

    obj.init = function() {
        var element = null;

        document.addEventListener("mousedown", function(e) {
            if (e.changedTouches && e.changedTouches[0]) {
                var x = e.changedTouches[0].clientX;
                var y = e.changedTouches[0].clientY;
            } else {
                var x = e.clientX;
                var y = e.clientY;
            }

            if (e.target && e.target.shadowRoot) {
                var d = e.target.shadowRoot;
            } else {
                var d = document;
            }

            // Get the first target element
            element = d.elementFromPoint(x, y);
        });

        document.addEventListener("click", function(e) {
            // Check opened components
            isOpened(element);
        });

        obj.version = version;
    }

    obj.setExtensions = function(o) {
        if (typeof(o) == 'object') {
            var k = Object.keys(o);
            for (var i = 0; i < k.length; i++) {
                obj[k[i]] = o[k[i]];
            }
        }
    }

    obj.tracking = function(component, state) {
        if (state == true) {
            jSuites.current = jSuites.current.filter(function(v) {
                return v !== null;
            });

            // Start after all events
            setTimeout(function() {
                jSuites.current.push(component);
            }, 0);

        } else {
            var index = jSuites.current.indexOf(component);
            if (index >= 0) {
                jSuites.current[index] = null;
            }
        }
    }

    /**
     * Get or set a property from a JSON from a string.
     */
    obj.path = function(str, val) {
        str = str.split('.');
        if (str.length) {
            var o = this;
            var p = null;
            while (str.length > 1) {
                // Get the property
                p = str.shift();
                // Check if the property exists
                if (o.hasOwnProperty(p)) {
                    o = o[p];
                } else {
                    // Property does not exists
                    if (val === undefined) {
                        return undefined;
                    } else {
                        // Create the property
                        o[p] = {};
                        // Next property
                        o = o[p];
                    }
                }
            }
            // Get the property
            p = str.shift();
            // Set or get the value
            if (val !== undefined) {
                o[p] = val;
                // Success
                return true;
            } else {
                // Return the value
                if (o) {
                    return o[p];
                }
            }
        }
        // Something went wrong
        return false;
    }

    // Update dictionary
    obj.setDictionary = function(d) {
        var k = Object.keys(obj.dictionary);
        if (k.length == 0) {
            obj.dictionary = d;
        } else {
            // Replace the key into the dictionary and append the new ones
            var k = Object.keys(d);
            for (var i = 0; i < k.length; i++) {
                obj.dictionary[k[i]] = d[k[i]];
            }
        }

        // Translations
        var t = null;
        for (var i = 0; i < jSuites.calendar.weekdays.length; i++) {
            t =  jSuites.translate(jSuites.calendar.weekdays[i]);
            if (jSuites.calendar.weekdays[i]) {
                jSuites.calendar.weekdays[i] = t;
                jSuites.calendar.weekdaysShort[i] = t.substr(0,3);
            }
        }
        for (var i = 0; i < jSuites.calendar.months.length; i++) {
            t = jSuites.translate(jSuites.calendar.months[i]);
            if (t) {
                jSuites.calendar.months[i] = t;
                jSuites.calendar.monthsShort[i] = t.substr(0,3);
            }
        }
    }

    // Dictionary
    obj.dictionary = {};

    // Translate
    obj.translate = function(t) {
        return obj.dictionary[t] || t;
    }

    // Array of opened components
    obj.current = [];

    return obj;
}();

/**
 * Global jsuites event
 */
if (typeof(document) !== "undefined") {
    jSuites.init();
}