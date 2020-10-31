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
        onclose: null,
        onchange: null,
        closeOnChange: true,
        palette: null,
        position: null,
        doneLabel: 'Done',
        resetLabel: 'Reset',
        resetValue: 'initial',
        showResetButton: false,
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
        // Global palette
        if(jSuites.palette) {
            obj.options.palette = jSuites.palette;
        } else {
            // Default palete
            obj.options.palette = [
                [ "#ffebee", "#fce4ec", "#f3e5f5", "#e8eaf6", "#e3f2fd", "#e0f7fa", "#e0f2f1", "#e8f5e9", "#f1f8e9", "#f9fbe7", "#fffde7", "#fff8e1", "#fff3e0", "#fbe9e7", "#efebe9", "#fafafa", "#eceff1" ],
                [ "#ffcdd2", "#f8bbd0", "#e1bee7", "#c5cae9", "#bbdefb", "#b2ebf2", "#b2dfdb", "#c8e6c9", "#dcedc8", "#f0f4c3", "#fff9c4", "#ffecb3", "#ffe0b2", "#ffccbc", "#d7ccc8", "#f5f5f5", "#cfd8dc" ],
                [ "#ef9a9a", "#f48fb1", "#ce93d8", "#9fa8da", "#90caf9", "#80deea", "#80cbc4", "#a5d6a7", "#c5e1a5", "#e6ee9c", "#fff59d", "#ffe082", "#ffcc80", "#ffab91", "#bcaaa4", "#eeeeee", "#b0bec5" ],
                [ "#e57373", "#f06292", "#ba68c8", "#7986cb", "#64b5f6", "#4dd0e1", "#4db6ac", "#81c784", "#aed581", "#dce775", "#fff176", "#ffd54f", "#ffb74d", "#ff8a65", "#a1887f", "#e0e0e0", "#90a4ae" ],
                [ "#ef5350", "#ec407a", "#ab47bc", "#5c6bc0", "#42a5f5", "#26c6da", "#26a69a", "#66bb6a", "#9ccc65", "#d4e157", "#ffee58", "#ffca28", "#ffa726", "#ff7043", "#8d6e63", "#bdbdbd", "#78909c" ],
                [ "#f44336", "#e91e63", "#9c27b0", "#3f51b5", "#2196f3", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#9e9e9e", "#607d8b" ],
                [ "#e53935", "#d81b60", "#8e24aa", "#3949ab", "#1e88e5", "#00acc1", "#00897b", "#43a047", "#7cb342", "#c0ca33", "#fdd835", "#ffb300", "#fb8c00", "#f4511e", "#6d4c41", "#757575", "#546e7a" ],
                [ "#d32f2f", "#c2185b", "#7b1fa2", "#303f9f", "#1976d2", "#0097a7", "#00796b", "#388e3c", "#689f38", "#afb42b", "#fbc02d", "#ffa000", "#f57c00", "#e64a19", "#5d4037", "#616161", "#455a64" ],
                [ "#c62828", "#ad1457", "#6a1b9a", "#283593", "#1565c0", "#00838f", "#00695c", "#2e7d32", "#558b2f", "#9e9d24", "#f9a825", "#ff8f00", "#ef6c00", "#d84315", "#4e342e", "#424242", "#37474f" ],
                [ "#b71c1c", "#880e4f", "#4a148c", "#1a237e", "#0d47a1", "#006064", "#004d40", "#1b5e20", "#33691e", "#827717", "#f57f17", "#ff6f00", "#e65100", "#bf360c", "#3e2723", "#212121", "#263238" ],
            ];
        }
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
    
    // Reset button
    if(obj.options.showResetButton) {
        // Reset button
        var resetButton  = document.createElement('div');
        resetButton.className = 'jcolor-reset';
        resetButton.innerHTML = obj.options.resetLabel;
        resetButton.onclick = function() {
            obj.setValue(obj.options.resetValue);
            obj.close();
        }
        content.appendChild(resetButton);
    }

    // Close button
    var closeButton  = document.createElement('div');
    if(obj.options.showResetButton) {
        closeButton.className = 'jcolor-close jcolor-close-with-reset';
    } else {
        closeButton.className = 'jcolor-close';
    }
    closeButton.innerHTML = obj.options.doneLabel;
    closeButton.onclick = function() {
        obj.close();
    }
    content.appendChild(closeButton);

    // Table pallete
    var table = document.createElement('table');
    table.setAttribute('cellpadding', '7');
    table.setAttribute('cellspacing', '0');

    for (var j = 0; j < obj.options.palette.length; j++) {
        var tr = document.createElement('tr');
        for (var i = 0; i < obj.options.palette[j].length; i++) {
            var td = document.createElement('td');
            td.style.backgroundColor = obj.options.palette[j][i];
            td.setAttribute('data-value', obj.options.palette[j][i]);
            td.innerHTML = '';
            tr.appendChild(td);

            // Selected color
            if (obj.options.value == obj.options.palette[j][i]) {
                td.classList.add('jcolor-selected');
            }

            // Possible values
            obj.values[obj.options.palette[j][i]] = td;
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

            if (jSuites.getWindowWidth() < 800) {
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
        }
    }

    /**
     * Close color pallete
     */
    obj.close = function(ignoreEvents) {
        if (jSuites.color.current) {
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
        if (color) {
            el.value = color;
            obj.options.value = color;
        }

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

    /**
     * If element is focus open the picker
     */
    el.addEventListener("focus", function(e) {
        obj.open();
    });

    el.addEventListener("mousedown", function(e) {
        if (! jSuites.color.current) {
            setTimeout(function() {
        obj.open();
                e.preventDefault();
            }, 200);
        }
    });

    // Select color
    container.addEventListener("mouseup", function(e) {
        if (e.target.tagName == 'TD') {
            jSuites.color.current.setValue(e.target.getAttribute('data-value'));

            if (jSuites.color.current) {
                jSuites.color.current.close();
            }
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

    // Keep object available from the node
    el.color = obj;
    el.change = obj.setValue;

    return obj;
});
