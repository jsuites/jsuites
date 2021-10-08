jSuites.render = (function() {
    var obj = function(txt, root, self) {
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
        div.innerHTML = txt;
        // Parse the content
        parse(div, root, self);
        // Add element
        div.appendChild(root);

        return div;
    }

    var bind = function(property, self) {
        // If exists get the current value
        var tmp = self[property] || '';
        // Save as state
        Object.defineProperty(self, property, {
            set: function(val) {
                // Define value
                self.state[property] = val;
                // Tracking
                if (self.tracking[property]) {
                    for (var i = 0; i < self.tracking[property].length; i++) {
                        if (self.tracking[property][i].property == 'html') {
                            self.tracking[property][i].element.innerHTML = val;
                        } else if (self.tracking[property][i].property == 'textContent') {
                            self.tracking[property][i].element.textContent = val;
                        } else {
                            self.tracking[property][i].element.setAttribute(self.tracking[property][i].property, val);
                        }
                    }
                }
            },
            get: function() {
                return this.state[property];
            }
        });
        // Set valuke
        self[property] = tmp;
        // Create tracking container for the property
        self.tracking[property] = [];
    }

    var parse = function(element, self) {
        if (element.attributes.length) {
            for (var i = 0; i < element.attributes.length; i++) {
                // Parse events
                if (element.attributes[i].name.substring(0,2) == 'on') {
                    // Get event
                    var event = element.attributes[i].name;
                    var value = element.attributes[i].value;

                    // Get action
                    element.removeAttribute(event);
                    element.event = value;
                    element[event] = function() {
                        eval(this.event);
                    };
                // Other properties
                } else {

                }
            }
        }

        // Check the children
        if (element.children.length) {
            for (var i = 0; i < element.children.length; i++) {
                parse(element.children[i], self);
            }
        } else {
            // Content
            var result = [];
            var index = 0;
            element.innerText = element.innerText.replace(/\{\{(.*?)\}\}/g, function (a,b,c,d) {
                var property = b.replace('self.', '');
                result.push({ p: c - index, k: property, v: b });
                index = index + a.length;
                return '';
            });

            if (result.length) {
                var elements = [];
                for (var i = result.length - 1; i >= 0; i--) {
                    if (! self.tracking[result[i].k]) {
                        // Create tracker
                        bind(result[i].k, self);
                    }
                    // Set value
                    self[result[i].k] = eval(result[i].v);
                    // Create node DOM
                    elements[i] = document.createTextNode(self[result[i].k]);
                    self.tracking[result[i].k].push({ element: elements[i], property: 'textContent' });
                    // Append node
                    element.insertBefore(elements[i], element.childNodes[0].splitText(result[i].p));
                }
            }
        }
    }

    return obj;
})();