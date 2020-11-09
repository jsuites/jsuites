jSuites.color = (function(el, options) {
    var obj = {};
    obj.options = {};
    obj.values = [];

    // Global container
    if (! jSuites.color.current) {
        jSuites.color.current = null;
    }

    /**
     * @typedef {Object} defaults
     * @property {(string|Array)} value - Initial value of the compontent
     * @property {string} placeholder - The default instruction text on the element
     * @property {requestCallback} onchange - Method to be execute after any changes on the element
     * @property {requestCallback} onclose - Method to be execute when the element is closed
     * @property {string} doneLabel - Label for button done
     * @property {string} resetLabel - Label for button reset
     * @property {string} resetValue - Value for button reset
     * @property {Bool} showResetButton - Active or note for button reset - default false
     */
    var defaults = {
        placeholder: '',
        value: null,
        onopen: null,
        onclose: null,
        onchange: null,
        closeOnChange: true,
        palette: null,
        position: null,
        doneLabel: 'Done',
        resetLabel: 'Reset',
        fullscreen: false,
    };

    // Loop through our object
    for (var property in defaults) {
        if (options && options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    if (! obj.options.palette) {
        // Default pallete
        obj.options.palette = jSuites.palette();
    }

    // Value
    if (obj.options.value) {
        el.value = obj.options.value;
    }

    if (el.tagName == 'INPUT') {
        el.classList.add('jcolor-input');
    }

    // Table container
    var container = document.createElement('div');
    container.className = 'jcolor';

    // Table container
    var backdrop = document.createElement('div');
    backdrop.className = 'jcolor-backdrop';
    container.appendChild(backdrop);

    // Content
    var content = document.createElement('div');
    content.className = 'jcolor-content';

    // Controls
    var controls = document.createElement('div');
    controls.className = 'jcolor-controls';
    content.appendChild(controls);

    // Reset button
    var resetButton  = document.createElement('div');
    resetButton.className = 'jcolor-reset';
    resetButton.innerHTML = obj.options.resetLabel;
    resetButton.onclick = function() {
        obj.setValue('');
        obj.close();
    }
    controls.appendChild(resetButton);

    // Close button
    var closeButton  = document.createElement('div');
    closeButton.className = 'jcolor-close';
    closeButton.innerHTML = obj.options.doneLabel;
    closeButton.onclick = function() {
        obj.close();
    }
    controls.appendChild(closeButton);

    // Table pallete
    var table = document.createElement('table');
    table.setAttribute('cellpadding', '7');
    table.setAttribute('cellspacing', '0');

    for (var j = 0; j < obj.options.palette.length; j++) {
        var tr = document.createElement('tr');
        for (var i = 0; i < obj.options.palette[j].length; i++) {
            var td = document.createElement('td');
            var color = obj.options.palette[j][i];
            if (color.length < 7 && color.substr(0,1) !== '#') {
                color = '#' + color;
            }
            td.style.backgroundColor = color;
            td.setAttribute('data-value', color);
            td.innerHTML = '';
            tr.appendChild(td);

            // Selected color
            if (obj.options.value == color) {
                td.classList.add('jcolor-selected');
            }

            // Possible values
            obj.values[color] = td;
        }
        table.appendChild(tr);
    }

    /**
     * Open color pallete
     */
    obj.open = function() {
        if (jSuites.color.current) {
            if (jSuites.color.current != obj) {
                jSuites.color.current.close();
            }
        }

        if (! jSuites.color.current) {
            // Persist element
            jSuites.color.current = obj;
            // Show colorpicker
            container.classList.add('jcolor-focus');

            var rectContent = content.getBoundingClientRect();

            if (jSuites.getWindowWidth() < 800 || obj.options.fullscreen == true) {
                content.style.top = '';
                content.classList.add('jcolor-fullscreen');
                jSuites.animation.slideBottom(content, 1);
                backdrop.style.display = 'block';
            } else {
                if (content.classList.contains('jcolor-fullscreen')) {
                    content.classList.remove('jcolor-fullscreen');
                    backdrop.style.display = '';
                }

                var rect = el.getBoundingClientRect();

                if (obj.options.position) {
                    content.style.position = 'fixed';
                    if (window.innerHeight < rect.bottom + rectContent.height) {
                        content.style.top = (rect.top - (rectContent.height + 2)) + 'px';
                    } else {
                        content.style.top = (rect.top + rect.height + 2) + 'px';
                    }
                    content.style.left = rect.left + 'px';
                } else {
                    if (window.innerHeight < rect.bottom + rectContent.height) {
                        content.style.top = -1 * (rectContent.height + rect.height + 2) + 'px';
                    } else {
                        content.style.top = '2px';
                    }
                }
            }

            container.focus();

            if (typeof(obj.options.onopen) == 'function') {
                obj.options.onopen(el);
            }
        }
    }

    /**
     * Close color pallete
     */
    obj.close = function(ignoreEvents) {
        if (jSuites.color.current) {
            el.focus();
            jSuites.color.current = null;
            if (! ignoreEvents && typeof(obj.options.onclose) == 'function') {
                obj.options.onclose(el);
            }
            container.classList.remove('jcolor-focus');
        }

        // Make sure backdrop is hidden
        backdrop.style.display = '';

        return obj.options.value;
    }

    /**
     * Set value
     */
    obj.setValue = function(color) {
        if (! color) {
            color = '';
        }

        if (color != obj.options.value) {
            obj.options.value = color;

            // Remove current selecded mark
            var selected = container.querySelector('.jcolor-selected');
            if (selected) {
                selected.classList.remove('jcolor-selected');
            }

            // Mark cell as selected
            if (obj.values[color]) {
                obj.values[color].classList.add('jcolor-selected');
            }

            // Onchange
            if (typeof(obj.options.onchange) == 'function') {
                obj.options.onchange(el, color);
            }

            // Lemonade JS
            if (el.value != obj.options.value) {
                el.value = obj.options.value;
                if (typeof(el.onchange) == 'function') {
                    el.onchange({
                        type: 'change',
                        target: el,
                        value: el.value
                    });
                }
            }
        }

        if (obj.options.closeOnChange == true) {
            obj.close();
        }
    }

    /**
     * Get value
     */
    obj.getValue = function() {
        return obj.options.value;
    }

    var backdropClickControl = false;

    /**
     * Focus
     */
    el.addEventListener("focus", function(e) {
        if (! jSuites.color.current) {
            obj.open();
        }
    });

    /**
     * If element is focus open the picker
     */
    el.addEventListener("mouseup", function(e) {
        if (! jSuites.color.current) {
            obj.open();
        }
        e.preventDefault();
        e.stopPropagation();
    });

    backdrop.addEventListener("mousedown", function(e) {
        backdropClickControl = true;
        e.preventDefault();
        e.stopPropagation();
    });

    backdrop.addEventListener("mouseup", function(e) {
        if (backdropClickControl && jSuites.color.current) {
            obj.close();
            backdropClickControl = false;
        }
        e.preventDefault();
        e.stopPropagation();
    });

    // Select color
    container.addEventListener("mouseup", function(e) {
        if (e.target.tagName == 'TD') {
            jSuites.color.current.setValue(e.target.getAttribute('data-value'));

            if (jSuites.color.current) {
                jSuites.color.current.close();
            }

            e.preventDefault();
            e.stopPropagation();
        }
    });

    // Close controller
    document.addEventListener("mousedown", function(e) {
        if (jSuites.color.current) {
            var element = jSuites.findElement(e.target, 'jcolor');
            if (! element) {
                jSuites.color.current.close();
            }
        }
    });

    // Possible to focus the container
    container.setAttribute('tabindex', '900');

    // Placeholder
    if (obj.options.placeholder) {
        el.setAttribute('placeholder', obj.options.placeholder);
    }

    // Append to the table
    content.appendChild(table);
    container.appendChild(content);

    // Insert picker after the element
    if (el.tagName == 'INPUT') {
        el.parentNode.insertBefore(container, el.nextSibling);
    } else {
        el.appendChild(container);
    }

    // Change
    el.change = obj.setValue;

    // Keep object available from the node
    el.color = obj;

    return obj;
});

