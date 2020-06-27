jSuites.component = class {
    constructor() {
    }

    refresh(element) {
        var k = Object.keys(this);
        for (var i = i; i < k.length; i++) {
            if (this.indexOf(k[i]) > -1) {
                k[i];
                return truel
            }
        }
        return false;
    }

    create() {
        var element = jSuites.element(this.render(), this);

        if (typeof(this.onload) == 'function') {
            this.onload(element, this);
        }

        return element;
    }
}


jSuites.render = function(o, el, self) {
    if (! self) {
        self = {};
    }

    if (jSuites.isClass(o)) {
        var o = new o();
        el.appendChild(o.create());
    } else {
        el.appendChild(o(self));
    }

    return o;
}

jSuites.isClass = function(func) {
    return typeof func === 'function' && /^class\s/.test(Function.prototype.toString.call(func));
}

jSuites.element = (function() {
    var obj = function(html, s) {
        // Self
        var self = s ? s : {};
        // Make sure existing containers
        if (! self.state) {
            self.state = {};
        }
        if (! self.tracking) {
            self.tracking = {};
        }

        // Create the root element
        var div = document.createElement('div');

        // Get the DOM content
        div.innerHTML = html.trim();

        // Parse the content
        parse(div, self);

        return div;
    }

    var bind = function(property, self) {
        // If exists get the current value
        var tmp = self[property] || '';

        // Refresh
        var refreshProperty = function() {
            // Tracking
            if (self.tracking[property]) {
                for (var i = 0; i < self.tracking[property].length; i++) {
                    var value = eval(self.tracking[property][i].v);
                    if (self.tracking[property][i].property == 'html') {
                        self.tracking[property][i].element.innerHTML = value;
                    } else if (self.tracking[property][i].property == 'textContent') {
                        self.tracking[property][i].element.textContent = value;
                    } else if (self.tracking[property][i].property == 'value') {
                        self.tracking[property][i].element.value = value;
                    } else if (self.tracking[property][i].property == 'checked') {
                        self.tracking[property][i].element.checked = value;
                    } else {
                        self.tracking[property][i].element.setAttribute(self.tracking[property][i].property, value);
                    }
                }
            }
        }

        // Save as state
        if (Array.isArray(self[property])) {
            Array.prototype.refresh = refreshProperty;
        } else {
            Object.defineProperty(self, property, {
                set: function(val) {
                    // Update val
                    self.state[property] = val;
                    // Refresh binded elements
                    refreshProperty(val);
                },
                get: function() {
                    // Get value
                    return self.state[property];
                }
            });
        }

        // Set valuke
        self[property] = tmp;

        // Create tracking container for the property
        self.tracking[property] = [];
    }

    var create = function(element, res, type, self) {
        var tokens = res.v.match(/self\.([a-zA-Z0-9_].*?)*/g);
        if (tokens.length) {
            // Value
            var value = eval(res.v);
            // Create text node
            if (type == 'textContent') {
                var e = document.createTextNode(value);
                if (element.childNodes[0]) {
                    element.insertBefore(e, element.childNodes[0].splitText(res.p));
                } else {
                    element.appendChild(e);
                }
            } else {
                if (typeof(element[type]) !== 'undefined') {
                    e = element;
                    e[type] = value;
                }
            }

            for (var i = 0; i < tokens.length; i++) {
                // Get property name
                var token = tokens[i].replace('self.', '');

                if (! self.tracking[token]) {
                    // Create tracker
                    bind(token, self);
                }

                // Add to the tracking
                    self.tracking[token].push({
                    element: e,
                    property: type,
                    v: res.v
                });
            }
        }
    }

    var attributes = function(element, attr, type, self) {
        // Content
        var result = [];
        var index = 0;

        if (element.getAttribute && element.getAttribute(type)) {
            element.setAttribute(type, element.getAttribute(type).replace(/\{\{(.*?)\}\}/g, function (a,b,c,d) {
                result.push({ p: c - index, v: b });
                index = index + a.length;
                return '';
            }));
        } else {
            if (typeof(element[type]) == 'string') {
                element[type] = element[type].replace(/\{\{(.*?)\}\}/g, function (a,b,c,d) {
                    result.push({ p: c - index, v: b });
                    index = index + a.length;
                    return '';
                });
            }
        }

        if (result.length) {
            for (var i = result.length - 1; i >= 0; i--) {
                create(element, result[i], type, self);
            }
        }
    }
    
    var parse = function(element, self) {
        // Attributes
        var attr = {};

        if (element.attributes.length) {
            for (var i = 0; i < element.attributes.length; i++) {
                attr[element.attributes[i].name] = element.attributes[i].value;
            }
        }

        // Keys
        var k = Object.keys(attr);

        if (k.length) {
            for (var i = 0; i < k.length; i++) {
                // Parse events
                if (k[i].substring(0,2) == 'on') {
                    // Get event
                    var event = k[i].toLowerCase();
                    var value = attr[k[i]];

                    // Get action
                    element.removeAttribute(event);
                    if (! element.events) {
                        element.events = []
                    }
                    element.events[event.substring(2)] = value;
                    element[event] = function(e) {
                        eval(this.events[e.type]);
                    }
                    // Other properties
                } else {
                    if (k[i] == '@create') {
                        var expression = attr[k[i]].replace('this', 'element');
                    } else if (k[i] == '@ref') {
                        var expression = attr[k[i]] + ' = element';
                    } else if (k[i] == '@checked') {
                        if (element.type == 'checkbox') {
                            if (! element.events) {
                                element.events = []
                            }
                            element.events.change = attr[k[i]] + ' = this.checked';
                            element.checked = eval(attr[k[i]]);
                            element.onchange = function(e) {
                                eval(this.events[e.type]);
                            }
                            element.checked = eval(attr[k[i]] + ' == true ? true : false');
                            element.removeAttribute(k[i]);
                        } else if (element.type == 'radio') {
                            if (! element.events) {
                                element.events = []
                            }
                            element.events.change = attr[k[i]] + ' = this.value';
                            element.onchange = function(e) {
                                eval(this.events[e.type]);
                            }
                            element.checked = eval(attr[k[i]]) == element.value ? true : false;
                            element.removeAttribute(k[i]);
                        }
                    } else {
                        attributes(element, attr[k[i]], k[i], self)
                    }

                    if (expression) {
                        element.removeAttribute(k[i]);
                        eval(expression);
                        expression = null;
                    }
                }
            }
        }

        // Check the children
        if (element.children.length) {
            for (var i = 0; i < element.children.length; i++) {
                parse(element.children[i], self);
            }
        } else {
            attributes(element, 'innerText', 'textContent', self);
        }

        // Create instances
        if (element.constructor == HTMLUnknownElement) {
            var m = element.tagName;
            m = m.charAt(0).toUpperCase() + m.slice(1).toLowerCase();
            m = eval(m);
            if (typeof(m) == 'function') {
                if (element.getAttribute('extended') == 'true') {
                    var e = self;
                } else {
                    var e = {};
                }

                for (var i = 0; i < element.attributes.length; i++) {
                    e[element.attributes[i].name] = element.attributes[i].value;
                }
                if (jSuites.isClass(m)) {
                    var instance = new m();
                    element.appendChild(instance.create());
                } else {
                    element.appendChild(m(e));
                }
            }
        }
    }

    return obj;
})();