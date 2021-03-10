/**
 * (c) jSuites Javascript Web Components (v4.2.2)
 *
 * Website: https://jsuites.net
 * Description: Create amazing web based applications.
 *
 * MIT License
 *
 */
;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.jSuites = factory();
}(this, (function () {

    'use strict';

var jSuites = function(options) {
    var obj = {}
    var version = '4.2.2';

    var find = function(DOMElement, component) {
        if (DOMElement[component.type] && DOMElement[component.type] == component) {
            return true;
        }
        if (DOMElement.parentNode) {
            return find(DOMElement.parentNode, component);
        }
        return false;
    }

    var isOpened = function(e) {
        if (jSuites.current.length > 0) {
            for (var i = 0; i < jSuites.current.length; i++) {
                if (jSuites.current[i] && ! find(e.target, jSuites.current[i])) {
                    jSuites.current[i].close();
                }
            }
        }
    }

    obj.init = function() {
        document.addEventListener("click", isOpened);

        obj.version = version;
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

jSuites.ajax = (function(options, complete) {
    if (Array.isArray(options)) {
        // Create multiple request controller 
        var multiple = {
            instance: [],
            complete: complete,
        }

        if (options.length > 0) {
            for (var i = 0; i < options.length; i++) {
                options[i].multiple = multiple;
                multiple.instance.push(jSuites.ajax(options[i]));
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
        var parseData = function(value, key) {
            var vars = [];
            var keys = Object.keys(value);
            if (keys.length) {
                for (var i = 0; i < keys.length; i++) {
                    if (key) {
                        var k = key + '[' + keys[i] + ']';
                    } else {
                        var k = keys[i];
                    }

                    if (typeof(value[keys[i]]) == 'object') {
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
        } else if (options.dataType == 'blob') {
            httpRequest.responseType = "blob";
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
                        options.error(err, result);
                    }
                }
            } else {
                if (options.dataType == 'blob') {
                    var result = httpRequest.response;
                } else {
                    var result = httpRequest.responseText;
                }

                if (options.success && typeof(options.success) == 'function') {
                    options.success(result);
                }
            }
        } else {
            if (options.error && typeof(options.error) == 'function') {
                options.error(httpRequest.responseText);
            }
        }

        // Global queue
        if (jSuites.ajax.queue && jSuites.ajax.queue.length > 0) {
            jSuites.ajax.send(jSuites.ajax.queue.shift());
        }

        // Global complete method
        if (jSuites.ajax.requests && jSuites.ajax.requests.length) {
            // Get index of this request in the container
            var index = jSuites.ajax.requests.indexOf(httpRequest);
            // Remove from the ajax requests container
            jSuites.ajax.requests.splice(index, 1);
            // Last one?
            if (! jSuites.ajax.requests.length) {
                // Object event
                if (options.complete && typeof(options.complete) == 'function') {
                    options.complete(result);
                }
                // Global event
                if (jSuites.ajax.oncomplete && typeof(jSuites.ajax.oncomplete[options.group]) == 'function') {
                    jSuites.ajax.oncomplete[options.group]();
                    jSuites.ajax.oncomplete[options.group] = null;
                }
            }
            // Controllers
            if (options.multiple && options.multiple.instance) {
                // Get index of this request in the container
                var index = options.multiple.instance.indexOf(httpRequest);
                // Remove from the ajax requests container
                options.multiple.instance.splice(index, 1);
                // If this is the last one call method complete
                if (! options.multiple.instance.length) {
                    if (options.multiple.complete && typeof(options.multiple.complete) == 'function') {
                        options.multiple.complete(result);
                    }
                }
            }
        }
    }

    // Data
    httpRequest.data = data;

    // Queue
    if (options.queue == true && jSuites.ajax.requests.length > 0) {
        jSuites.ajax.queue.push(httpRequest);
    } else {
        jSuites.ajax.send(httpRequest)
    }

    return httpRequest;
});

jSuites.ajax.send = function(httpRequest) {
    if (httpRequest.data) {
        httpRequest.send(httpRequest.data.join('&'));
    } else {
        httpRequest.send();
    }

    jSuites.ajax.requests.push(httpRequest);
}

jSuites.ajax.exists = function(url, __callback) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    if (http.status) {
        __callback(http.status);
    }
}

jSuites.ajax.oncomplete = {};
jSuites.ajax.requests = [];
jSuites.ajax.queue = [];

jSuites.animation = {};

jSuites.animation.slideLeft = function(element, direction, done) {
    if (direction == true) {
        element.classList.add('slide-left-in');
        setTimeout(function() {
            element.classList.remove('slide-left-in');
            if (typeof(done) == 'function') {
                done();
            }
        }, 400);
    } else {
        element.classList.add('slide-left-out');
        setTimeout(function() {
            element.classList.remove('slide-left-out');
            if (typeof(done) == 'function') {
                done();
            }
        }, 400);
    }
}

jSuites.animation.slideRight = function(element, direction, done) {
    if (direction == true) {
        element.classList.add('slide-right-in');
        setTimeout(function() {
            element.classList.remove('slide-right-in');
            if (typeof(done) == 'function') {
                done();
            }
        }, 400);
    } else {
        element.classList.add('slide-right-out');
        setTimeout(function() {
            element.classList.remove('slide-right-out');
            if (typeof(done) == 'function') {
                done();
            }
        }, 400);
    }
}

jSuites.animation.slideTop = function(element, direction, done) {
    if (direction == true) {
        element.classList.add('slide-top-in');
        setTimeout(function() {
            element.classList.remove('slide-top-in');
            if (typeof(done) == 'function') {
                done();
            }
        }, 400);
    } else {
        element.classList.add('slide-top-out');
        setTimeout(function() {
            element.classList.remove('slide-top-out');
            if (typeof(done) == 'function') {
                done();
            }
        }, 400);
    }
}

jSuites.animation.slideBottom = function(element, direction, done) {
    if (direction == true) {
        element.classList.add('slide-bottom-in');
        setTimeout(function() {
            element.classList.remove('slide-bottom-in');
            if (typeof(done) == 'function') {
                done();
            }
        }, 400);
    } else {
        element.classList.add('slide-bottom-out');
        setTimeout(function() {
            element.classList.remove('slide-bottom-out');
            if (typeof(done) == 'function') {
                done();
            }
        }, 100);
    }
}

jSuites.animation.fadeIn = function(element, done) {
    element.style.display = '';
    element.classList.add('fade-in');
    setTimeout(function() {
        element.classList.remove('fade-in');
        if (typeof(done) == 'function') {
            done();
        }
    }, 2000);
}

jSuites.animation.fadeOut = function(element, done) {
    element.classList.add('fade-out');
    setTimeout(function() {
        element.style.display = 'none';
        element.classList.remove('fade-out');
        if (typeof(done) == 'function') {
            done();
        }
    }, 1000);
}

jSuites.calendar = (function(el, options) {
    // Already created, update options
    if (el.calendar) {
        return el.calendar.setOptions(options, true);
    }

    // New instance
    var obj = { type:'calendar' };
    obj.options = {};

    // Date
    obj.date = null;

    /**
     * Update options
     */
    obj.setOptions = function(options, reset) {
        // Default configuration
        var defaults = {
            // Render type: [ default | year-month-picker ]
            type: 'default',
            // Restrictions
            validRange: null,
            // Starting weekday - 0 for sunday, 6 for saturday
            startingDay: null, 
            // Date format
            format: 'DD/MM/YYYY',
            // Allow keyboard date entry
            readonly: true,
            // Today is default
            today: false,
            // Show timepicker
            time: false,
            // Show the reset button
            resetButton: true,
            // Placeholder
            placeholder: '',
            // Translations can be done here
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            monthsFull: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            weekdays: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
            weekdays_short: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
            textDone: 'Done',
            textReset: 'Reset',
            textUpdate: 'Update',
            // Value
            value: null,
            // Fullscreen (this is automatic set for screensize < 800)
            fullscreen: false,
            // Create the calendar closed as default
            opened: false,
            // Events
            onopen: null,
            onclose: null,
            onchange: null,
            onupdate: null,
            // Internal mode controller
            mode: null,
            position: null,
        };

        // Loop through our object
        for (var property in defaults) {
            if (options && options.hasOwnProperty(property)) {
                obj.options[property] = options[property];
            } else {
                if (typeof(obj.options[property]) == 'undefined' || reset === true) {
                    obj.options[property] = defaults[property];
                }
            }
        }

        // Reset button
        if (obj.options.resetButton == false) {
            calendarReset.style.display = 'none';
        } else {
            calendarReset.style.display = '';
        }

        // Readonly
        if (obj.options.readonly) {
            el.setAttribute('readonly', 'readonly');
        } else {
            el.removeAttribute('readonly');
        }

        // Placeholder
        if (obj.options.placeholder) {
            el.setAttribute('placeholder', obj.options.placeholder);
        } else {
            el.removeAttribute('placeholder');
        }

        // Texts
        calendarReset.innerHTML = obj.options.textReset;
        calendarConfirm.innerHTML = obj.options.textDone;
        calendarControlsUpdateButton.value = obj.options.textUpdate;

        // Define mask
        el.setAttribute('data-mask', obj.options.format.toLowerCase());

        // Value
        if (! obj.options.value && obj.options.today) {
            var value = jSuites.calendar.now();
        } else {
            var value = obj.options.value;
        }

        // Set internal date
        if (value) {
            // Force the update
            obj.options.value = null;
            // New value
            obj.setValue(value);
        }

        return obj;
    }

    /**
     * Open the calendar
     */
    obj.open = function (value) {
        if (! calendar.classList.contains('jcalendar-focus')) {
            if (! calendar.classList.contains('jcalendar-inline')) {
                // Current
                jSuites.calendar.current = obj;
                // Start tracking
                jSuites.tracking(obj, true);
                // Create the days
                obj.getDays();
                // Render months
                if (obj.options.type == 'year-month-picker') {
                    obj.getMonths();
                }
                // Get time
                if (obj.options.time) {
                    calendarSelectHour.value = obj.date[3];
                    calendarSelectMin.value = obj.date[4];
                }

                // Show calendar
                calendar.classList.add('jcalendar-focus');

                // Get the position of the corner helper
                if (jSuites.getWindowWidth() < 800 || obj.options.fullscreen) {
                    calendar.classList.add('jcalendar-fullsize');
                    // Animation
                    jSuites.animation.slideBottom(calendarContent, 1);
                } else {
                    calendar.classList.remove('jcalendar-fullsize');

                    var rect = el.getBoundingClientRect();
                    var rectContent = calendarContent.getBoundingClientRect();

                    if (obj.options.position) {
                        calendarContainer.style.position = 'fixed';
                        if (window.innerHeight < rect.bottom + rectContent.height) {
                            calendarContainer.style.top = (rect.top - (rectContent.height + 2)) + 'px';
                        } else {
                            calendarContainer.style.top = (rect.top + rect.height + 2) + 'px';
                        }
                        calendarContainer.style.left = rect.left + 'px';
                    } else {
                        if (window.innerHeight < rect.bottom + rectContent.height) {
                            calendarContainer.style.bottom = (1 * rect.height + rectContent.height + 2) + 'px';
                        } else {
                            calendarContainer.style.top = 2 + 'px'; 
                        }
                    }
                }

                // Events
                if (typeof(obj.options.onopen) == 'function') {
                    obj.options.onopen(el);
                }
            }
        }
    }

    obj.close = function (ignoreEvents, update) {
        if (calendar.classList.contains('jcalendar-focus')) {
            if (update !== false) {
                var element = calendar.querySelector('.jcalendar-selected');

                if (typeof(update) == 'string') {
                    var value = update;
                } else if (! element || element.classList.contains('jcalendar-disabled')) {
                    var value = obj.options.value
                } else {
                    var value = obj.getValue();
                }

                obj.setValue(value);
            }

            // Events
            if (! ignoreEvents && typeof(obj.options.onclose) == 'function') {
                obj.options.onclose(el);
            }
            // Hide
            calendar.classList.remove('jcalendar-focus');
            // Stop tracking
            jSuites.tracking(obj, false);
            // Current
            jSuites.calendar.current = null;
        }

        return obj.options.value;
    }

    obj.prev = function() {
        // Check if the visualization is the days picker or years picker
        if (obj.options.mode == 'years') {
            obj.date[0] = obj.date[0] - 12;

            // Update picker table of days
            obj.getYears();
        } else if (obj.options.mode == 'months') {
            obj.date[0] = parseInt(obj.date[0]) - 1;
            // Update picker table of months
            obj.getMonths();
        } else {
            // Go to the previous month
            if (obj.date[1] < 2) {
                obj.date[0] = obj.date[0] - 1;
                obj.date[1] = 12;
            } else {
                obj.date[1] = obj.date[1] - 1;
            }

            // Update picker table of days
            obj.getDays();
        }
    }

    obj.next = function() {
        // Check if the visualization is the days picker or years picker
        if (obj.options.mode == 'years') {
            obj.date[0] = parseInt(obj.date[0]) + 12;

            // Update picker table of days
            obj.getYears();
        } else if (obj.options.mode == 'months') {
            obj.date[0] = parseInt(obj.date[0]) + 1;
            // Update picker table of months
            obj.getMonths();
        } else {
            // Go to the previous month
            if (obj.date[1] > 11) {
                obj.date[0] = parseInt(obj.date[0]) + 1;
                obj.date[1] = 1;
            } else {
                obj.date[1] = parseInt(obj.date[1]) + 1;
            }

            // Update picker table of days
            obj.getDays();
        }
    }

    /**
     * Set today
     */
    obj.setToday = function() {
        // Today
        var value = new Date().toISOString().substr(0, 10);
        // Change value
        obj.setValue(value);
        // Value
        return value;
    }

    obj.setValue = function(val) {
        if (! val) {
            val = '' + val;
        }
        // Values
        var newValue = val;
        var oldValue = obj.options.value;

        if (oldValue != newValue) {
            // Set label
            if (! newValue) {
                obj.date = null;
                var val = '';
            } else {
                var value = obj.setLabel(newValue, obj.options);
                var date = newValue.split(' ');
                if (! date[1]) {
                    date[1] = '00:00:00';
                }
                var time = date[1].split(':')
                var date = date[0].split('-');
                var y = parseInt(date[0]);
                var m = parseInt(date[1]);
                var d = parseInt(date[2]);
                var h = parseInt(time[0]);
                var i = parseInt(time[1]);
                obj.date = [ y, m, d, h, i, 0 ];
                var val = obj.setLabel(newValue, obj.options);
            }

            // New value
            obj.options.value = newValue;

            if (typeof(obj.options.onchange) ==  'function') {
                obj.options.onchange(el, newValue, oldValue);
            }

            // Lemonade JS
            if (el.value != val) {
                el.value = val;
                if (typeof(el.onchange) == 'function') {
                    el.onchange({
                        type: 'change',
                        target: el,
                        value: el.value
                    });
                }
            }
        }

        obj.getDays();
    }

    obj.getValue = function() {
        if (obj.date) {
            if (obj.options.time) {
                return jSuites.two(obj.date[0]) + '-' + jSuites.two(obj.date[1]) + '-' + jSuites.two(obj.date[2]) + ' ' + jSuites.two(obj.date[3]) + ':' + jSuites.two(obj.date[4]) + ':' + jSuites.two(0);
            } else {
                return jSuites.two(obj.date[0]) + '-' + jSuites.two(obj.date[1]) + '-' + jSuites.two(obj.date[2]) + ' ' + jSuites.two(0) + ':' + jSuites.two(0) + ':' + jSuites.two(0);
            }
        } else {
            return "";
        }
    }

    /**
     *  Calendar
     */
    obj.update = function(element, v) {
        if (element.classList.contains('jcalendar-disabled')) {
            // Do nothing
        } else {
            var elements = calendar.querySelector('.jcalendar-selected');
            if (elements) {
                elements.classList.remove('jcalendar-selected');
            }
            element.classList.add('jcalendar-selected');

            if (element.classList.contains('jcalendar-set-month')) {
                obj.date[1] = v;
            } else {
                obj.date[2] = element.innerText;
            }

            if (! obj.options.time) {
                obj.close();
            } else {
                obj.date[3] = calendarSelectHour.value;
                obj.date[4] = calendarSelectMin.value;
            }
        }

        // Update
        updateActions();
    }

    /**
     * Set to blank
     */
    obj.reset = function() {
        // Close calendar
        obj.setValue('');
        obj.date = null;
        obj.close(false, false);
    }

    /**
     * Get calendar days
     */
    obj.getDays = function() {
        // Mode
        obj.options.mode = 'days';

        // Setting current values in case of NULLs
        var date = new Date();

        // Current selection
        var year = obj.date && jSuites.isNumeric(obj.date[0]) ? obj.date[0] : parseInt(date.getFullYear());
        var month = obj.date && jSuites.isNumeric(obj.date[1]) ? obj.date[1] : parseInt(date.getMonth()) + 1;
        var day = obj.date && jSuites.isNumeric(obj.date[2]) ? obj.date[2] : parseInt(date.getDate());
        var hour = obj.date && jSuites.isNumeric(obj.date[3]) ? obj.date[3] : parseInt(date.getHours());
        var min = obj.date && jSuites.isNumeric(obj.date[4]) ? obj.date[4] : parseInt(date.getMinutes());

        // Selection container
        obj.date = [ year, month, day, hour, min, 0 ];

        // Update title
        calendarLabelYear.innerHTML = year;
        calendarLabelMonth.innerHTML = obj.options.months[month - 1];

        // Current month and Year
        var isCurrentMonthAndYear = (date.getMonth() == month - 1) && (date.getFullYear() == year) ? true : false;
        var currentDay = date.getDate();

        // Number of days in the month
        var date = new Date(year, month, 0, 0, 0);
        var numberOfDays = date.getDate();

        // First day
        var date = new Date(year, month-1, 0, 0, 0);
        var firstDay = date.getDay() + 1;

        // Index value
        var index = obj.options.startingDay || 0;

        // First of day relative to the starting calendar weekday
        firstDay = firstDay - index;

        // Reset table
        calendarBody.innerHTML = '';

        // Weekdays Row
        var row = document.createElement('tr');
        row.setAttribute('align', 'center');
        calendarBody.appendChild(row);

        // Create weekdays row
        for (var i = 0; i < 7; i++) {
            var cell = document.createElement('td');
            cell.classList.add('jcalendar-weekday')
            cell.innerHTML = obj.options.weekdays_short[index];
            row.appendChild(cell);
            // Next week day
            index++;
            // Restart index
            if (index > 6) {
                index = 0;
            }
        }

        // Index of days
        var index = 0;
        var d = 0;
 
        // Calendar table
        for (var j = 0; j < 6; j++) {
            // Reset cells container
            var row = document.createElement('tr');
            row.setAttribute('align', 'center');
            // Data control
            var emptyRow = true;
            // Create cells
            for (var i = 0; i < 7; i++) {
                // Create cell
                var cell = document.createElement('td');
                cell.classList.add('jcalendar-set-day');

                if (index >= firstDay && index < (firstDay + numberOfDays)) {
                    // Day cell
                    d++;
                    cell.innerHTML = d;

                    // Selected
                    if (d == day) {
                        cell.classList.add('jcalendar-selected');
                    }

                    // Current selection day is today
                    if (isCurrentMonthAndYear && currentDay == d) {
                        cell.style.fontWeight = 'bold';
                    }

                    // Current selection day
                    var current = jSuites.calendar.now(new Date(year, month-1, d), true);

                    // Available ranges
                    if (obj.options.validRange) {
                        if (! obj.options.validRange[0] || current >= obj.options.validRange[0]) {
                            var test1 = true;
                        } else {
                            var test1 = false;
                        }

                        if (! obj.options.validRange[1] || current <= obj.options.validRange[1]) {
                            var test2 = true;
                        } else {
                            var test2 = false;
                        }

                        if (! (test1 && test2)) {
                            cell.classList.add('jcalendar-disabled');
                        }
                    }

                    // Control
                    emptyRow = false;
                }
                // Day cell
                row.appendChild(cell);
                // Index
                index++;
            }

            // Add cell to the calendar body
            if (emptyRow == false) {
                calendarBody.appendChild(row);
            }
        }

        // Show time controls
        if (obj.options.time) {
            calendarControlsTime.style.display = '';
        } else {
            calendarControlsTime.style.display = 'none';
        }

        // Update
        updateActions();
    }

    obj.getMonths = function() {
        // Mode
        obj.options.mode = 'months';

        // Loading month labels
        var months = obj.options.months;

        // Value
        var value = obj.options.value; 

        // Current date
        var date = new Date();
        var currentYear = parseInt(date.getFullYear());
        var currentMonth = parseInt(date.getMonth()) + 1;
        var selectedYear = obj.date && jSuites.isNumeric(obj.date[0]) ? obj.date[0] : currentYear;
        var selectedMonth = obj.date && jSuites.isNumeric(obj.date[1]) ? obj.date[1] : currentMonth;

        // Update title
        calendarLabelYear.innerHTML = obj.date[0];
        calendarLabelMonth.innerHTML = months[selectedMonth-1];

        // Table
        var table = document.createElement('table');
        table.setAttribute('width', '100%');

        // Row
        var row = null;

        // Calendar table
        for (var i = 0; i < 12; i++) {
            if (! (i % 4)) {
                // Reset cells container
                var row = document.createElement('tr');
                row.setAttribute('align', 'center');
                table.appendChild(row);
            }

            // Create cell
            var cell = document.createElement('td');
            cell.classList.add('jcalendar-set-month');
            cell.setAttribute('data-value', i+1);
            cell.innerText = months[i];

            if (obj.options.validRange) {
                var current = selectedYear + '-' + jSuites.two(i+1);
                if (! obj.options.validRange[0] || current >= obj.options.validRange[0].substr(0,7)) {
                    var test1 = true;
                } else {
                    var test1 = false;
                }

                if (! obj.options.validRange[1] || current <= obj.options.validRange[1].substr(0,7)) {
                    var test2 = true;
                } else {
                    var test2 = false;
                }

                if (! (test1 && test2)) {
                    cell.classList.add('jcalendar-disabled');
                }
            }

            if (i+1 == selectedMonth) {
                cell.classList.add('jcalendar-selected');
            }

            if (currentYear == selectedYear && i+1 == currentMonth) {
                cell.style.fontWeight = 'bold';
            }

            row.appendChild(cell);
        }

        calendarBody.innerHTML = '<tr><td colspan="7"></td></tr>';
        calendarBody.children[0].children[0].appendChild(table);

        // Update
        updateActions();
    }

    obj.getYears = function() { 
        // Mode
        obj.options.mode = 'years';

        // Current date
        var date = new Date();
        var currentYear = date.getFullYear();
        var selectedYear = obj.date && jSuites.isNumeric(obj.date[0]) ? obj.date[0] : parseInt(date.getFullYear());

        // Array of years
        var y = [];
        for (var i = 0; i < 25; i++) {
            y[i] = parseInt(obj.date[0]) + (i - 12);
        }

        // Assembling the year tables
        var table = document.createElement('table');
        table.setAttribute('width', '100%');

        for (var i = 0; i < 25; i++) {
            if (! (i % 5)) {
                // Reset cells container
                var row = document.createElement('tr');
                row.setAttribute('align', 'center');
                table.appendChild(row);
            }

            // Create cell
            var cell = document.createElement('td');
            cell.classList.add('jcalendar-set-year');
            cell.innerText = y[i];

            if (selectedYear == y[i]) {
                cell.classList.add('jcalendar-selected');
            }

            if (currentYear == y[i]) {
                cell.style.fontWeight = 'bold';
            }

            row.appendChild(cell);
        }

        calendarBody.innerHTML = '<tr><td colspan="7"></td></tr>';
        calendarBody.firstChild.firstChild.appendChild(table);

        // Update
        updateActions();
    }

    obj.setLabel = function(value, mixed) {
        return jSuites.calendar.getDateString(value, mixed);
    }

    obj.fromFormatted = function (value, format) {
        return jSuites.calendar.extractDateFromString(value, format);
    }

    var mouseUpControls = function(e) {
        var element = jSuites.findElement(e.target, 'jcalendar-container');
        if (element) {
            var action = e.target.className;

            // Object id
            if (action == 'jcalendar-prev') {
                obj.prev();
            } else if (action == 'jcalendar-next') {
                obj.next();
            } else if (action == 'jcalendar-month') {
                obj.getMonths();
            } else if (action == 'jcalendar-year') {
                obj.getYears();
            } else if (action == 'jcalendar-set-year') {
                obj.date[0] = e.target.innerText;
                if (obj.options.type == 'year-month-picker') {
                    obj.getMonths();
                } else {
                    obj.getDays();
                }
            } else if (e.target.classList.contains('jcalendar-set-month')) {
                var month = parseInt(e.target.getAttribute('data-value'));
                if (obj.options.type == 'year-month-picker') {
                    obj.update(e.target, month);
                } else {
                    obj.date[1] = month;
                    obj.getDays();
                }
            } else if (action == 'jcalendar-confirm' || action == 'jcalendar-update' || action == 'jcalendar-close') {
                obj.close();
            } else if (action == 'jcalendar-backdrop') {
                obj.close(false, false);
            } else if (action == 'jcalendar-reset') {
                obj.reset();
            } else if (e.target.classList.contains('jcalendar-set-day') && e.target.innerText) {
                obj.update(e.target);
            }
        } else {
            obj.close();
        }
    }

    var keyUpControls = function(e) {
        if (e.target.value && e.target.value.length > 3) {
            var test = jSuites.calendar.extractDateFromString(e.target.value, obj.options.format);
            if (test) {
                if (e.target.getAttribute('data-completed') == 'true') {
                    obj.setValue(test);
                }
            }
        }
    }

    // Update actions button
    var updateActions = function() {
        var currentDay = calendar.querySelector('.jcalendar-selected');

        if (currentDay && currentDay.classList.contains('jcalendar-disabled')) {
            calendarControlsUpdateButton.setAttribute('disabled', 'disabled');
            calendarSelectHour.setAttribute('disabled', 'disabled');
            calendarSelectMin.setAttribute('disabled', 'disabled');
        } else {
            calendarControlsUpdateButton.removeAttribute('disabled');
            calendarSelectHour.removeAttribute('disabled');
            calendarSelectMin.removeAttribute('disabled');
        }

        // Event
        if (typeof(obj.options.onupdate) == 'function') {
            obj.options.onupdate(el, obj.getValue());
        }
    }

    var calendar = null;
    var calendarReset = null;
    var calendarConfirm = null;
    var calendarContainer = null;
    var calendarContent = null;
    var calendarLabelYear = null;
    var calendarLabelMonth = null;
    var calendarTable = null;
    var calendarBody = null;

    var calendarControls = null;
    var calendarControlsTime = null;
    var calendarControlsUpdate = null;
    var calendarControlsUpdateButton = null;
    var calendarSelectHour = null;
    var calendarSelectMin = null;

    var init = function() {
        // Get value from initial element if that is an input
        if (el.tagName == 'INPUT' && el.value) {
            options.value = el.value;
        }

        // Calendar DOM elements
        calendarReset = document.createElement('div');
        calendarReset.className = 'jcalendar-reset';

        calendarConfirm = document.createElement('div');
        calendarConfirm.className = 'jcalendar-confirm';

        calendarControls = document.createElement('div');
        calendarControls.className = 'jcalendar-controls'
        calendarControls.style.borderBottom = '1px solid #ddd';
        calendarControls.appendChild(calendarReset);
        calendarControls.appendChild(calendarConfirm);

        calendarContainer = document.createElement('div');
        calendarContainer.className = 'jcalendar-container';

        calendarContent = document.createElement('div');
        calendarContent.className = 'jcalendar-content';
        calendarContainer.appendChild(calendarContent);

        // Main element
        if (el.tagName == 'DIV') {
            calendar = el;
            calendar.classList.add('jcalendar-inline');
        } else {
            // Add controls to the screen
            calendarContent.appendChild(calendarControls);

            calendar = document.createElement('div');
            calendar.className = 'jcalendar';
        }
        calendar.classList.add('jcalendar-container');
        calendar.appendChild(calendarContainer);

        // Table container
        var calendarTableContainer = document.createElement('div');
        calendarTableContainer.className = 'jcalendar-table';
        calendarContent.appendChild(calendarTableContainer);

        // Previous button
        var calendarHeaderPrev = document.createElement('td');
        calendarHeaderPrev.setAttribute('colspan', '2');
        calendarHeaderPrev.className = 'jcalendar-prev';

        // Header with year and month
        calendarLabelYear = document.createElement('span');
        calendarLabelYear.className = 'jcalendar-year';
        calendarLabelMonth = document.createElement('span');
        calendarLabelMonth.className = 'jcalendar-month';

        var calendarHeaderTitle = document.createElement('td');
        calendarHeaderTitle.className = 'jcalendar-header';
        calendarHeaderTitle.setAttribute('colspan', '3');
        calendarHeaderTitle.appendChild(calendarLabelMonth);
        calendarHeaderTitle.appendChild(calendarLabelYear);

        var calendarHeaderNext = document.createElement('td');
        calendarHeaderNext.setAttribute('colspan', '2');
        calendarHeaderNext.className = 'jcalendar-next';

        var calendarHeader = document.createElement('thead');
        var calendarHeaderRow = document.createElement('tr');
        calendarHeaderRow.appendChild(calendarHeaderPrev);
        calendarHeaderRow.appendChild(calendarHeaderTitle);
        calendarHeaderRow.appendChild(calendarHeaderNext);
        calendarHeader.appendChild(calendarHeaderRow);

        calendarTable = document.createElement('table');
        calendarBody = document.createElement('tbody');
        calendarTable.setAttribute('cellpadding', '0');
        calendarTable.setAttribute('cellspacing', '0');
        calendarTable.appendChild(calendarHeader);
        calendarTable.appendChild(calendarBody);
        calendarTableContainer.appendChild(calendarTable);

        calendarSelectHour = document.createElement('select');
        calendarSelectHour.className = 'jcalendar-select';
        calendarSelectHour.onchange = function() {
            obj.date[3] = this.value; 

            // Event
            if (typeof(obj.options.onupdate) == 'function') {
                obj.options.onupdate(el, obj.getValue());
            }
        }

        for (var i = 0; i < 24; i++) {
            var element = document.createElement('option');
            element.value = i;
            element.innerHTML = jSuites.two(i);
            calendarSelectHour.appendChild(element);
        }

        calendarSelectMin = document.createElement('select');
        calendarSelectMin.className = 'jcalendar-select';
        calendarSelectMin.onchange = function() {
            obj.date[4] = this.value;

            // Event
            if (typeof(obj.options.onupdate) == 'function') {
                obj.options.onupdate(el, obj.getValue());
            }
        }

        for (var i = 0; i < 60; i++) {
            var element = document.createElement('option');
            element.value = i;
            element.innerHTML = jSuites.two(i);
            calendarSelectMin.appendChild(element);
        }

        // Footer controls
        var calendarControlsFooter = document.createElement('div');
        calendarControlsFooter.className = 'jcalendar-controls';

        calendarControlsTime = document.createElement('div');
        calendarControlsTime.className = 'jcalendar-time';
        calendarControlsTime.style.maxWidth = '140px';
        calendarControlsTime.appendChild(calendarSelectHour);
        calendarControlsTime.appendChild(calendarSelectMin);

        calendarControlsUpdateButton = document.createElement('input');
        calendarControlsUpdateButton.setAttribute('type', 'button');
        calendarControlsUpdateButton.className = 'jcalendar-update';

        calendarControlsUpdate = document.createElement('div');
        calendarControlsUpdate.style.flexGrow = '10';
        calendarControlsUpdate.appendChild(calendarControlsUpdateButton);
        calendarControlsFooter.appendChild(calendarControlsTime);

        // Only show the update button for input elements
        if (el.tagName == 'INPUT') {
            calendarControlsFooter.appendChild(calendarControlsUpdate);
        }

        calendarContent.appendChild(calendarControlsFooter);

        var calendarBackdrop = document.createElement('div');
        calendarBackdrop.className = 'jcalendar-backdrop';
        calendar.appendChild(calendarBackdrop);

        // Handle events
        el.addEventListener("keyup", keyUpControls);

        // Add global events
        calendar.addEventListener("swipeleft", function(e) {
            jSuites.animation.slideLeft(calendarTable, 0, function() {
                obj.next();
                jSuites.animation.slideRight(calendarTable, 1);
            });
            e.preventDefault();
            e.stopPropagation();
        });

        calendar.addEventListener("swiperight", function(e) {
            jSuites.animation.slideRight(calendarTable, 0, function() {
                obj.prev();
                jSuites.animation.slideLeft(calendarTable, 1);
            });
            e.preventDefault();
            e.stopPropagation();
        });

        el.onmouseup = function() {
            obj.open();
        }

        if ('ontouchend' in document.documentElement === true) {
            calendar.addEventListener("touchend", mouseUpControls);
        } else {
            calendar.addEventListener("mouseup", mouseUpControls);
        }

        // Global controls
        if (! jSuites.calendar.hasEvents) {
            // Execute only one time
            jSuites.calendar.hasEvents = true;
            // Enter and Esc
            document.addEventListener("keydown", jSuites.calendar.keydown);
        }

        // Set configuration
        obj.setOptions(options);

        // Append element to the DOM
        if (el.tagName == 'INPUT') {
            el.parentNode.insertBefore(calendar, el.nextSibling);
            // Add properties
            el.setAttribute('autocomplete', 'off');
            // Element
            el.classList.add('jcalendar-input');
            // Value
            el.value = obj.setLabel(obj.getValue(), obj.options);
        } else {
            // Get days
            obj.getDays();
            // Hour
            if (obj.options.time) {
                calendarSelectHour.value = obj.date[3];
                calendarSelectMin.value = obj.date[4];
            }
        }

        // Default opened
        if (obj.options.opened == true) {
            obj.open();
        }

        // Change method
        calendar.change = obj.setValue;

        // Keep object available from the node
        el.calendar = calendar.calendar = obj;
    }

    init();

    return obj;
});

jSuites.calendar.keydown = function(e) {
    var calendar = null;
    if (calendar = jSuites.calendar.current) { 
        if (e.which == 13) {
            // ENTER
            calendar.close(false, true);
        } else if (e.which == 27) {
            // ESC
            calendar.close(false, false);
        }
    }
}

jSuites.calendar.prettify = function(d, texts) {
    if (! texts) {
        var texts = {
            justNow: 'Just now',
            xMinutesAgo: '{0}m ago',
            xHoursAgo: '{0}h ago',
            xDaysAgo: '{0}d ago',
            xWeeksAgo: '{0}w ago',
            xMonthsAgo: '{0} mon ago',
            xYearsAgo: '{0}y ago',
        }
    }

    var d1 = new Date();
    var d2 = new Date(d);
    var total = parseInt((d1 - d2) / 1000 / 60);

    String.prototype.format = function(o) {
        return this.replace('{0}', o);
    }

    if (total == 0) {
        var text = texts.justNow;
    } else if (total < 90) {
        var text = texts.xMinutesAgo.format(total);
    } else if (total < 1440) { // One day
        var text = texts.xHoursAgo.format(Math.round(total/60));
    } else if (total < 20160) { // 14 days
        var text = texts.xDaysAgo.format(Math.round(total / 1440));
    } else if (total < 43200) { // 30 days
        var text = texts.xWeeksAgo.format(Math.round(total / 10080));
    } else if (total < 1036800) { // 24 months
        var text = texts.xMonthsAgo.format(Math.round(total / 43200));
    } else { // 24 months+
        var text = texts.xYearsAgo.format(Math.round(total / 525600));
    }

    return text;
}

jSuites.calendar.prettifyAll = function() {
    var elements = document.querySelectorAll('.prettydate');
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].getAttribute('data-date')) {
            elements[i].innerHTML = jSuites.calendar.prettify(elements[i].getAttribute('data-date'));
        } else {
            elements[i].setAttribute('data-date', elements[i].innerHTML);
            elements[i].innerHTML = jSuites.calendar.prettify(elements[i].innerHTML);
        }
    }
}

jSuites.calendar.now = function(date, dateOnly) {
    if (! date) {
        var date = new Date();
    }
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var h = date.getHours();
    var i = date.getMinutes();
    var s = date.getSeconds();

    if (dateOnly == true) {
        return jSuites.two(y) + '-' + jSuites.two(m) + '-' + jSuites.two(d);
    } else {
        return jSuites.two(y) + '-' + jSuites.two(m) + '-' + jSuites.two(d) + ' ' + jSuites.two(h) + ':' + jSuites.two(i) + ':' + jSuites.two(s);
    }
}

jSuites.calendar.toArray = function(value) {
    var date = value.split(((value.indexOf('T') !== -1) ? 'T' : ' '));
    var time = date[1];
    var date = date[0].split('-');
    var y = parseInt(date[0]);
    var m = parseInt(date[1]);
    var d = parseInt(date[2]);

    if (time) {
        var time = time.split(':');
        var h = parseInt(time[0]);
        var i = parseInt(time[1]);
    } else {
        var h = 0;
        var i = 0;
    }
    return [ y, m, d, h, i, 0 ];
}

// Helper to extract date from a string
jSuites.calendar.extractDateFromString = function(date, format) {
    if (date > 0 && Number(date) == date) {
        var d = new Date(Math.round((date - 25569)*86400*1000));
        return d.getFullYear() + "-" + jSuites.two(d.getMonth()) + "-" + jSuites.two(d.getDate()) + ' 00:00:00';
    }

    var v1 = '' + date;
    var v2 = format.replace(/[0-9]/g,'');

    var test = 1;

    // Get year
    var y = v2.search("YYYY");
    y = v1.substr(y,4);
    if (parseInt(y) != y) {
        test = 0;
    }

    // Get month
    var m = v2.search("MM");
    m = v1.substr(m,2);
    if (parseInt(m) != m || m > 12) {
        test = 0;
    }

    // Get day
    var d = v2.search("DD");
    d = v1.substr(d,2);
    if (parseInt(d) != d  || d > 31) {
        test = 0;
    }

    // Get hour
    var h = v2.search("HH");
    if (h >= 0) {
        h = v1.substr(h,2);
        if (! parseInt(h) || h > 23) {
            h = '00';
        }
    } else {
        h = '00';
    }

    // Get minutes
    var i = v2.search("MI");
    if (i >= 0) {
        i = v1.substr(i,2);
        if (! parseInt(i) || i > 59) {
            i = '00';
        }
    } else {
        i = '00';
    }

    // Get seconds
    var s = v2.search("SS");
    if (s >= 0) {
        s = v1.substr(s,2);
        if (! parseInt(s) || s > 59) {
            s = '00';
        }
    } else {
        s = '00';
    }

    if (test == 1 && date.length == v2.length) {
        // Update source
        return y + '-' + m + '-' + d + ' ' + h + ':' +  i + ':' + s;
    }

    return '';
}

// Helper to convert date into string
jSuites.calendar.getDateString = function(value, options) {
    if (! options) {
        var options = {};
    }

    // Labels
    if (typeof(options) == 'string') {
        var format = options;
    } else {
        var format = options.format;
    }

    // Labels
    if (options && options.weekdays) {
        var weekdays = options.weekdays;
    } else {
        var weekdays = [ 'Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday' ];
    }

    // Labels
    if (options && options.months) {
        var months = options.months;
    } else {
        var months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
    }

    // Labels
    if (options && options.months) {
        var monthsFull = options.monthsFull;
    } else {
        var monthsFull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    }

    // Default date format
    if (! format) {
        format = 'DD/MM/YYYY';
    }

    if (value) {
        var d = ''+value;
        var splitStr = (d.indexOf('T') !== -1) ? 'T' : ' ';
        d = d.split(splitStr);

        var h = '';
        var m = '';
        var s = '';

        if (d[1]) {
            h = d[1].split(':');
            m = h[1] ? h[1] : '00';
            s = h[2] ? h[2] : '00';
            h = h[0] ? h[0] : '00';
        } else {
            h = '00';
            m = '00';
            s = '00';
        }

        d = d[0].split('-');

        if (d[0] && d[1] && d[2] && d[0] > 0 && d[1] > 0 && d[1] < 13 && d[2] > 0 && d[2] < 32) {
            var calendar = new Date(d[0], d[1]-1, d[2]);

            d[1] = (d[1].length < 2 ? '0' : '') + d[1];
            d[2] = (d[2].length < 2 ? '0' : '') + d[2];
            h = (h.length < 2 ? '0' : '') + h;
            m = (m.length < 2 ? '0' : '') + m;
            s = (s.length < 2 ? '0' : '') + s;

            // New value
            value = format;
            // Legacy
            value = value.replace('MMM', 'MON');

            // Extract tokens
            var tokens = [ 'YYYY', 'YYY', 'YY', 'Y', 'MM', 'DD', 'DY', 'DAY', 'WD', 'D', 'Q', 'HH24', 'HH12', 'HH', 'PM', 'AM', 'MI', 'SS', 'MS', 'MONTH', 'MON'];
            var pieces = [];
            var tmp = value;

            while (tmp) {
                var t = 0;
                for (var i = 0; i < tokens.length; i++) {
                    if (t == 0 && tmp.toUpperCase().indexOf(tokens[i]) === 0) {
                        t = tokens[i].length;
                    }
                }
                if (t == 0) {
                    pieces.push(tmp.substr(0, 1));
                    tmp = tmp.substr(1);
                } else {
                    pieces.push(tmp.substr(0, t));
                    tmp = tmp.substr(t);
                }
            }

            // Replace tokens per values
            var replace = function(k, v, c) {
                if (c == true) {
                    for (var i = 0; i < pieces.length; i++) {
                        if (pieces[i].toUpperCase() == k) {
                            pieces[i] = v;
                        }
                    }
                } else {
                    for (var i = 0; i < pieces.length; i++) {
                        if (pieces[i] == k) {
                            pieces[i] = v;
                        }
                    }
                }
            }

            replace('YYYY', d[0], true);
            replace('YYY', d[0].substring(1,4), true);
            replace('YY', d[0].substring(2,4), true);
            replace('Y', d[0].substring(3,4), true);

            replace('MM', d[1], true);
            replace('DD', d[2], true);
            replace('Q', Math.floor((calendar.getMonth() + 3) / 3), true);

            if (h) {
                replace('HH24', h);
            }

            if (h > 12) {
                replace('HH12', h - 12, true);
                replace('HH', h - 12, true);
                replace('AM', 'pm', true);
                replace('PM', 'pm', true);
            } else {
                replace('HH12', h, true);
                replace('HH', h, true);
                replace('AM', 'am', true);
                replace('PM', 'am', true);
            }

            replace('MI', m, true);
            replace('SS', s, true);
            replace('MS', calendar.getMilliseconds(), true);

            // Textual tokens
            replace('MONTH', monthsFull[calendar.getMonth()].toUpperCase());
            replace('Month', monthsFull[calendar.getMonth()]);
            replace('month', monthsFull[calendar.getMonth()].toLowerCase());
            replace('MON', months[calendar.getMonth()].toUpperCase());
            replace('MMM', months[calendar.getMonth()].toUpperCase());
            replace('Mon', months[calendar.getMonth()]);
            replace('mon', months[calendar.getMonth()].toLowerCase());

            replace('DAY', weekdays[calendar.getDay()].toUpperCase());
            replace('Day', weekdays[calendar.getDay()]);
            replace('day', weekdays[calendar.getDay()].toLowerCase());
            replace('DY', weekdays[calendar.getDay()].substr(0,3).toUpperCase());
            replace('Dy', weekdays[calendar.getDay()].substr(0,3));
            replace('dy', weekdays[calendar.getDay()].substr(0,3).toLowerCase());
            replace('D', weekdays[calendar.getDay()]);
            replace('WD', weekdays[calendar.getDay()]);

            // Put pieces together
            value = pieces.join('');
        } else {
            value = '';
        }
    }

    return value;
}



jSuites.color = (function(el, options) {
    // Already created, update options
    if (el.color) {
        return el.color.setOptions(options, true);
    }

    // New instance
    var obj = { type: 'color' };
    obj.options = {};

    var container = null;
    var backdrop = null;
    var content = null;
    var resetButton = null;
    var closeButton = null;
    var tabs = null;
    var jsuitesTabs = null;

    /**
     * Update options
     */
    obj.setOptions = function(options, reset) {
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
            opened: false,
        }

        if (! options) {
            options = {};
        }

        if (options && ! options.palette) {
            // Default pallete
            options.palette = jSuites.palette();
        }

        // Loop through our object
        for (var property in defaults) {
            if (options && options.hasOwnProperty(property)) {
                obj.options[property] = options[property];
            } else {
                if (typeof(obj.options[property]) == 'undefined' || reset === true) {
                    obj.options[property] = defaults[property];
                }
            }
        }

        // Update the text of the controls, if they have already been created
        if (resetButton) {
            resetButton.innerHTML = obj.options.resetLabel;
        }
        if (closeButton) {
            closeButton.innerHTML = obj.options.doneLabel;
        }

        // Update the pallete
        if (obj.options.palette && jsuitesTabs) {
            jsuitesTabs.updateContent(0, table());
        }

        // Value
        if (typeof obj.options.value === 'string') {
            el.value = obj.options.value;
        }

        // Placeholder
        if (obj.options.placeholder) {
            el.setAttribute('placeholder', obj.options.placeholder);
        } else {
            if (el.getAttribute('placeholder')) {
                el.removeAttribute('placeholder');
            }
        }

        return obj;
    }

    /**
     * Open color pallete
     */
    obj.open = function() {
        if (! container.classList.contains('jcolor-focus')) {
            // Start tracking
            jSuites.tracking(obj, true);

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

            if (typeof(obj.options.onopen) == 'function') {
                obj.options.onopen(el);
            }

            jsuitesTabs.setBorder(jsuitesTabs.getActive());

            // Update sliders
            if (obj.options.value) {
                var rgb = HexToRgb(obj.options.value);

                rgbInputs.forEach(function(rgbInput, index) {
                    rgbInput.value = rgb[index];
                    rgbInput.dispatchEvent(new Event('input'));
                });
            }
        }
    }

    /**
     * Close color pallete
     */
    obj.close = function(ignoreEvents) {
        if (container.classList.contains('jcolor-focus')) {
            // Remove focus
            container.classList.remove('jcolor-focus');
            // Make sure backdrop is hidden
            backdrop.style.display = '';
            // Call related events
            if (! ignoreEvents && typeof(obj.options.onclose) == 'function') {
                obj.options.onclose(el);
            }
            // Stop  the object
            jSuites.tracking(obj, false);
        }

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
            slidersResult = color;

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

            // Changes
            if (el.value != obj.options.value) {
                // Set input value
                el.value = obj.options.value;
                // Element onchange native
                if (typeof(el.onchange) == 'function') {
                    el.onchange({
                        type: 'change',
                        target: el,
                        value: el.value
                    });
                }
            }

            if (obj.options.closeOnChange == true) {
                obj.close();
            }
        }
    }

    /**
     * Get value
     */
    obj.getValue = function() {
        return obj.options.value;
    }

    var backdropClickControl = false;

    // Converts a number in decimal to hexadecimal
    var decToHex = function(num) {
        var hex = num.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }

    // Converts a color in rgb to hexadecimal
    var rgbToHex = function(r, g, b) {
        return "#" + decToHex(r) + decToHex(g) + decToHex(b);
    }

    // Converts a number in hexadecimal to decimal
    var hexToDec = function(hex) {
        return parseInt('0x' + hex);
    }

    // Converts a color in hexadecimal to rgb
    var HexToRgb = function(hex) {
        return [hexToDec(hex.substr(1, 2)), hexToDec(hex.substr(3, 2)), hexToDec(hex.substr(5, 2))]
    }

    var table = function() {
        // Content of the first tab
        var tableContainer = document.createElement('div');
        tableContainer.className = 'jcolor-grid';

        // Cells
        obj.values = [];

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

        // Append to the table
        tableContainer.appendChild(table);

        // Select color
        tableContainer.addEventListener("mouseup", function(e) {
            if (e.target.tagName == 'TD') {
                var value = e.target.getAttribute('data-value');
                if (value) {
                    obj.setValue(value);
                }
            }
        });

        return tableContainer;
    }

    // Image used to show color options
    var spectrumImg = document.createElement('img');
    spectrumImg.src = 'data:image/png;base64,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tT327pnbOp2dpezqSt7vf5/8+m/9dX981uC11rVzf3PPt9V/iWfR3rv1+O/vy+t19vn+zj3f3C73t53+7FufXWvd7rM//dl/r29Off/vtu99/60/ffYpsq8r2Wf/zTfZP/9hfoZn7/x4Ez/StfF4+D16W5z9+FefTW9756MZLOgDj5ZbDNfx9BLNNHn+qwf70fZ4fPN4nxS3bYWvUdG2pW1HN8/8zjPM3jajgpg64zQGfmmplU2lRfbs21tLr5epGhTsUqr9plAkvZWgVvD3vqXOs6s3Z773/u1m2pbbwP799zuX08K2sn3nRbtbtcarzlrpeV83vzTW++rtdcfoePT7dass3n7df0ly67Zyr8Juf17W71/u2q5rw+VWdhvXqtWqqvpT7axWax22m3S7rP77O8DNVe3m7udHd8bzS+qu/z5sxr1+KXeZe93ywNgs7i3HC1zqud+WJv39ZHfCXXb4KfccJm71uafnkg3fe1w1Vv+e2MPbyWeu9m7Z9t09d9sm99a6dt/dc/a92fa6dviUc5e/p7QNFaxff/r49F9uv1dXV3e+55S1i9t6enfb6V4NSnXtU/at+3d3a71tW93aPK6jF2/bbrdt2/192BPbvN57d7ffe29t7y2w96y722a2Vh5v3B0v9LblbRvev21btQHgttE2AwB3x7AtttENx7zcq/bahhbmQlosd6duW7vae49t2wMsBhy+//7b1trW25a3bfsBgGGBYxwPSwMA4HiojxmOcQwvV0AFta0y62o2ABUAAAAAAEAFANiqVTkeYJXqrub6u+103DAAqNgnAAAAuzNwDKhMvpJSaldrGAAAubtty9/2o5Oq+70f0AAc7+5kWxs0jZN8G8zHgLcH4AbAttIIgG3SYKDaAJ8YgGpb1cioEiUAqIgwAFRtgqZaqUqVasYjbFMAKgYgRlVVJYpW3fepVadar4I9bKuAberv7+/1uuu20qrxf1+77q62rPmu5lbc3KodVG5VdXeVu2Wnbrk7tzpX+atf/6urlFp1+rJ1c1u5Vdjtvqtqrtout/FutT6v1qur3D2v6tZdbXfLytEbu6lu1apW8dy5artzm3Pubj2uct1xh8HJJHNz4r6EZ/bhfQYncE3XbePmpuvsCAwAAGwbb2/d26OBu+Oq6eku+jrdurmtddOy7d21AEoVDfCUgZ7d3XXNzdUZbANS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';

    // Canvas where the image will be rendered
    var spectrumCanvas = document.createElement('canvas');
    var canvasContext = spectrumCanvas.getContext("2d");

    var resizeCanvas = function() {
        // Specifications necessary to correctly obtain colors later in certain positions
        var measures = spectrumCanvas.getBoundingClientRect();

        spectrumCanvas.height = measures.height;
        spectrumCanvas.width = measures.width;

        canvasContext.drawImage(spectrumImg, 0, 0, spectrumImg.naturalWidth, spectrumImg.naturalHeight, 0, 0, spectrumCanvas.width, spectrumCanvas.height);
    }

    var spectrum = function() {
        // Content of the second tab
        var spectrumElement = document.createElement('div');
        spectrumElement.className = "jcolor-spectrum";

        var spectrumContainer = document.createElement('div');

        spectrumContainer.appendChild(spectrumCanvas);

        // Point that will demarcate the chosen color in the image
        var spectrumPoint = document.createElement('div');
        spectrumPoint.className = 'jcolor-moving-point';

        spectrumContainer.appendChild(spectrumPoint);

        // Moves the marquee point to the specified position
        var moveSpectrumPoint = function(buttons, x, y) {
            if (buttons === 1) {
                var rect = spectrumContainer.getBoundingClientRect();

                var left = x - rect.left;
                var top = y - rect.top;

                if (left < 0) {
                    left = 0;
                }
                if (top < 0) {
                    top = 0;
                }

                if (left > rect.width) {
                    left = rect.width;
                }
                if (top > rect.height) {
                    top = rect.height;
                }

                spectrumPoint.style.left = left + 'px';
                spectrumPoint.style.top = top + 'px';

                var pixel = canvasContext.getImageData(left, top, 1, 1).data;

                slidersResult = rgbToHex(pixel[0], pixel[1], pixel[2]);
            }
        }

        // Applies the point's motion function to the div that contains it
        spectrumContainer.addEventListener('mousedown', function(e) {
            moveSpectrumPoint(e.buttons, e.clientX, e.clientY);
        });

        spectrumContainer.addEventListener('mousemove', function(e) {
            moveSpectrumPoint(e.buttons, e.clientX, e.clientY);
        });

        spectrumContainer.addEventListener('touchmove', function(e) {
            moveSpectrumPoint(1, e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        });

        spectrumElement.appendChild(spectrumContainer);

        return spectrumElement;
    }

    var slidersResult = '';

    var rgbInputs = [];

    var changeInputColors = function() {
        if (slidersResult !== '') {
            for (var j = 0; j < rgbInputs.length; j++) {
                var currentColor = HexToRgb(slidersResult);

                currentColor[j] = 0;

                var newGradient = 'linear-gradient(90deg, rgb(';
                newGradient += currentColor.join(', ');
                newGradient += '), rgb(';

                currentColor[j] = 255;

                newGradient += currentColor.join(', ');
                newGradient += '))';

                rgbInputs[j].style.backgroundImage = newGradient;
            }
        }
    }

    var sliders = function() {
        // Content of the third tab
        var slidersElement = document.createElement('div');
        slidersElement.className = 'jcolor-sliders';

        var slidersBody = document.createElement('div');

        // Creates a range-type input with the specified name
        var createSliderInput = function(name) {
            var inputContainer = document.createElement('div');
            inputContainer.className = 'jcolor-sliders-input-container';

            var label = document.createElement('label');
            label.innerText = name;

            var subContainer = document.createElement('div');
            subContainer.className = 'jcolor-sliders-input-subcontainer';

            var input = document.createElement('input');
            input.type = 'range';
            input.min = 0;
            input.max = 255;
            input.value = 0;

            inputContainer.appendChild(label);
            subContainer.appendChild(input);

            var value = document.createElement('div');
            value.innerText = input.value;

            input.addEventListener('input', function() {
                value.innerText = input.value;
            });

            subContainer.appendChild(value);
            inputContainer.appendChild(subContainer);

            slidersBody.appendChild(inputContainer);

            return input;
        }

        // Creates red, green and blue inputs
        rgbInputs = [
            createSliderInput('Red'),
            createSliderInput('Green'),
            createSliderInput('Blue'),
        ];

        slidersElement.appendChild(slidersBody);

        // Element that prints the current color
        var slidersResultColor = document.createElement('div');
        slidersResultColor.className = 'jcolor-sliders-final-color';

        var resultElement = document.createElement('div');
        resultElement.style.visibility = 'hidden';
        resultElement.innerText = 'a';
        slidersResultColor.appendChild(resultElement)

        // Update the element that prints the current color
        var updateResult = function() {
            var resultColor = rgbToHex(parseInt(rgbInputs[0].value), parseInt(rgbInputs[1].value), parseInt(rgbInputs[2].value));

            resultElement.innerText = resultColor;
            resultElement.style.color = resultColor;
            resultElement.style.removeProperty('visibility');

            slidersResult = resultColor;
        }

        // Apply the update function to color inputs
        rgbInputs.forEach(function(rgbInput) {
            rgbInput.addEventListener('input', function() {
                updateResult();
                changeInputColors();
            });
        });

        slidersElement.appendChild(slidersResultColor);

        return slidersElement;
    }

    var init = function() {
        // Initial options
        obj.setOptions(options);

        // Add a proper input tag when the element is an input
        if (el.tagName == 'INPUT') {
            el.classList.add('jcolor-input');
            el.readOnly = true;
        }

        // Table container
        container = document.createElement('div');
        container.className = 'jcolor';

        // Table container
        backdrop = document.createElement('div');
        backdrop.className = 'jcolor-backdrop';
        container.appendChild(backdrop);

        // Content
        content = document.createElement('div');
        content.className = 'jcolor-content';

        // Controls
        var controls = document.createElement('div');
        controls.className = 'jcolor-controls';
        content.appendChild(controls);

        // Reset button
        resetButton  = document.createElement('div');
        resetButton.className = 'jcolor-reset';
        resetButton.innerHTML = obj.options.resetLabel;
        resetButton.onclick = function(e) {
            obj.setValue('');
            obj.close();
        }
        controls.appendChild(resetButton);

        // Close button
        closeButton  = document.createElement('div');
        closeButton.className = 'jcolor-close';
        closeButton.innerHTML = obj.options.doneLabel;
        closeButton.onclick = function(e) {
            if (jsuitesTabs.getActive() > 0) {
                obj.setValue(slidersResult);
            }
            obj.close();
        }
        controls.appendChild(closeButton);

        // Element that will be used to create the tabs
        tabs = document.createElement('div');
        content.appendChild(tabs);

        // Starts the jSuites tabs component
        jsuitesTabs = jSuites.tabs(tabs, {
            animation: true,
            data: [
                {
                    title: 'Grid',
                    contentElement: table(),
                },
                {
                    title: 'Spectrum',
                    contentElement: spectrum(),
                },
                {
                    title: 'Sliders',
                    contentElement: sliders(),
                }
            ],
            onchange: function(element, instance, index) {
                if (index === 1) {
                    resizeCanvas();
                } else {
                    var color = slidersResult !== '' ? slidersResult : obj.getValue();

                    if (index === 2 && color) {
                        var rgb = HexToRgb(color);

                        rgbInputs.forEach(function(rgbInput, index) {
                            rgbInput.value = rgb[index];
                            rgbInput.dispatchEvent(new Event('input'));
                        });
                    }
                }
            },
            palette: 'modern',
        });

        container.appendChild(content);

        // Insert picker after the element
        if (el.tagName == 'INPUT') {
            el.parentNode.insertBefore(container, el.nextSibling);
        } else {
            el.appendChild(container);
        }

        /**
         * If element is focus open the picker
         */
        el.addEventListener("mouseup", function(e) {
            obj.open();
        });

        backdrop.addEventListener("mousedown", function(e) {
            backdropClickControl = true;
        });

        backdrop.addEventListener("mouseup", function(e) {
            if (backdropClickControl) {
                obj.close();
                backdropClickControl = false;
            }
        });

        // If the picker is open on the spectrum tab, it changes the canvas size when the window size is changed
        window.addEventListener('resize', function() {
            if (container.classList.contains('jcolor-focus') && jsuitesTabs.getActive() == 1) {
                resizeCanvas();
            }
        });

        // Default opened
        if (obj.options.opened == true) {
            obj.open();
        }

        // Change
        el.change = obj.setValue;

        // Keep object available from the node
        el.color = obj;

        // Container shortcut
        container.color = obj;
    }

    init();

    return obj;
});



jSuites.contextmenu = (function(el, options) {
    var obj = {};
    obj.options = {};

    // Default configuration
    var defaults = {
        items: null,
        onclick: null,
    };

    // Loop through our object
    for (var property in defaults) {
        if (options && options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    // Class definition
    el.classList.add('jcontextmenu');
    // Focusable
    el.setAttribute('tabindex', '900');

    /**
     * Open contextmenu
     */
    obj.open = function(e, items) {
        if (items) {
            // Update content
            obj.options.items = items;
            // Create items
            obj.create(items);
        }

        // Coordinates
        if ((obj.options.items && obj.options.items.length > 0) || el.children.length) {
            if (e.target) {
                var x = e.clientX;
                var y = e.clientY;
            } else {
                var x = e.x;
                var y = e.y;
            }

            el.classList.add('jcontextmenu-focus');
            el.focus();

            var rect = el.getBoundingClientRect();

            if (window.innerHeight < y + rect.height) {
                var h = y - rect.height;
                if (h < 0) {
                    h = 0;
                }
                el.style.top = h + 'px';
            } else {
                el.style.top = y + 'px';
            }

            if (window.innerWidth < x + rect.width) {
                if (x - rect.width > 0) {
                    el.style.left = (x - rect.width) + 'px';
                } else {
                    el.style.left = '10px';
                }
            } else {
                el.style.left = x + 'px';
            }
        }
    }

    /**
     * Close menu
     */
    obj.close = function() {
        if (el.classList.contains('jcontextmenu-focus')) {
            el.classList.remove('jcontextmenu-focus');
        }
    }

    /**
     * Create items based on the declared objectd
     * @param {object} items - List of object
     */
    obj.create = function(items) {
        // Update content
        el.innerHTML = '';

        // Append items
        for (var i = 0; i < items.length; i++) {
            var itemContainer = createItemElement(items[i]);
            el.appendChild(itemContainer);
        }
    }
    
    /**
     * Private function for create a new Item element
     * @param {type} item
     * @returns {jsuitesL#15.jSuites.contextmenu.createItemElement.itemContainer}
     */
    function createItemElement(item) {
        if (item.type && (item.type == 'line' || item.type == 'divisor')) {
            var itemContainer = document.createElement('hr');
        } else {
            var itemContainer = document.createElement('div');
            var itemText = document.createElement('a');
            itemText.innerHTML = item.title;

            if (item.tooltip) {
                itemContainer.setAttribute('title', item.tooltip);
            }

            if (item.icon) {
                itemContainer.setAttribute('data-icon', item.icon);
            }

            if (item.id) {
                itemContainer.id = item.id;
            }

            if (item.disabled) {
                itemContainer.className = 'jcontextmenu-disabled';
            } else if (item.onclick) {
                itemContainer.method = item.onclick;
                itemContainer.addEventListener("mousedown", function(e) {
                    e.preventDefault();
                });
                itemContainer.addEventListener("mouseup", function() {
                    // Execute method
                    this.method(this);
                });
            }
            itemContainer.appendChild(itemText);

            if (item.submenu) {
                var itemIconSubmenu = document.createElement('span');
                itemIconSubmenu.innerHTML = "&#9658;";
                itemContainer.appendChild(itemIconSubmenu);
                itemContainer.classList.add('jcontexthassubmenu');
                var el_submenu = document.createElement('div');
                // Class definition
                el_submenu.classList.add('jcontextmenu');
                // Focusable
                el_submenu.setAttribute('tabindex', '900');
                
                // Append items
                var submenu = item.submenu;
                for (var i = 0; i < submenu.length; i++) {
                    var itemContainerSubMenu = createItemElement(submenu[i]);
                    el_submenu.appendChild(itemContainerSubMenu);
                }

                itemContainer.appendChild(el_submenu);
            } else if (item.shortcut) {
                var itemShortCut = document.createElement('span');
                itemShortCut.innerHTML = item.shortcut;
                itemContainer.appendChild(itemShortCut);
            }
        }
        return itemContainer;
    }

    if (typeof(obj.options.onclick) == 'function') {
        el.addEventListener('click', function(e) {
            obj.options.onclick(obj, e);
        });
    }

    // Create items
    if (obj.options.items) {
        obj.create(obj.options.items);
    }

    el.addEventListener('blur', function(e) {
        obj.close();
    });

    if (! jSuites.contextmenu.hasEvents) {
        window.addEventListener("mousewheel", function() {
            obj.close();
        });

        document.addEventListener("contextmenu", function(e) {
            var id = jSuites.contextmenu.getElement(e.target);
            if (id) {
                var element = document.querySelector('#' + id);
                if (! element) {
                    console.error('JSUITES: Contextmenu id not found');
                } else {
                    element.contextmenu.open(e);
                    e.preventDefault();
                }
            }
        });

        jSuites.contextmenu.hasEvents = true;
    }

    el.contextmenu = obj;

    return obj;
});

jSuites.contextmenu.getElement = function(element) {
    var foundId = 0;

    function path (element) {
        if (element.parentNode && element.getAttribute('aria-contextmenu-id')) {
            foundId = element.getAttribute('aria-contextmenu-id')
        } else {
            if (element.parentNode) {
                path(element.parentNode);
            }
        }
    }

    path(element);

    return foundId;
}

jSuites.dropdown = (function(el, options) {
    // Already created, update options
    if (el.dropdown) {
        return el.dropdown.setOptions(options, true);
    }

    // New instance
    var obj = { type: 'dropdown' };
    obj.options = {};

    // Success
    var success = function(data, value) {
        // Set data
        if (data) {
            obj.setData(data);

            // Onload method
            if (typeof(obj.options.onload) == 'function') {
                obj.options.onload(el, obj, data, value);
            }
        }

        // Set value
        if (value = extractValue(value)) {
            applyValue(value);
            // Component value
            el.value = obj.options.value;
        }

        // Open dropdown
        if (obj.options.opened == true) {
            obj.open();
        }
    }


    /**
     * Extract value from possible items in the dropdown
     */
    var extractValue = function(value) {
        var o = {};

        if (! Array.isArray(value)) {
            value = (''+value).split(';')
        }

        for (var i = 0; i < obj.items.length; i++) {
            for (var j = 0; j < value.length; j++) {
                if (obj.items[i].value == (''+value[j]).trim()) {
                    o[obj.items[i].value] = i;
                }
            }
        }

        return o;
    }

    /**
     * Reset the options for the dropdown
     */
    var resetValue = function() {
        // Remove selected
        for (var i = 0; i < obj.items.length; i++) {
            if (obj.items[i].selected == true) {
                if (obj.items[i].element) {
                    obj.items[i].element.classList.remove('jdropdown-selected')
                }
                obj.items[i].selected = null;
            }
        }
        // Reset container
        obj.value = [];
        // Reset options
        obj.options.value = '';
    }

    /**
     * Apply values to the dropdown
     */
    var applyValue = function(values) {
        // Reset the current values
        resetValue();
        // Read values
        if (values) {
            var k = Object.keys(values);
            if (k.length > 0) {
                for (var i = 0; i < k.length; i++) {
                    var item = values[k[i]];
                    if (obj.items[item].element) {
                        obj.items[item].element.classList.add('jdropdown-selected');
                    }
                    obj.items[item].selected = true;
                    // Push to the values container
                    obj.value[obj.items[item].value] = obj.items[item].text;
                }
            }
            // Value
            obj.options.value = Object.keys(obj.value).join(';');
        }

        // Update labels
        obj.header.value = obj.getText();
    }

    var getValue = function() {
        var value = [];
        for (var i = 0; i < obj.items.length; i++) {
            if (obj.items[i].selected == true) {
                value.push(obj.items[i].value)
            }
        }
        return value;
    }

    var getText = function() {
        var data = [];
        for (var i = 0; i < obj.items.length; i++) {
            if (obj.items[i].selected == true) {
                data.push(obj.items[i].text)
            }
        }
        return data;
    }

    obj.setOptions = function(options, reset) {
        if (! options) {
            options = {};
        }

        // Default configuration
        var defaults = {
            url: null,
            data: [],
            multiple: false,
            autocomplete: false,
            remoteSearch: false,
            lazyLoading: false,
            type: null,
            width: null,
            maxWidth: null,
            opened: false,
            value: null,
            placeholder: '',
            newOptions: false,
            position: false,
            onchange: null,
            onload: null,
            onopen: null,
            onclose: null,
            onfocus: null,
            onblur: null,
            oninsert: null,
        }

        // Loop through our object
        for (var property in defaults) {
            if (options && options.hasOwnProperty(property)) {
                obj.options[property] = options[property];
            } else {
                if (typeof(obj.options[property]) == 'undefined' || reset === true) {
                    obj.options[property] = defaults[property];
                }
            }
        }

        // Force autocomplete search
        if (obj.options.remoteSearch == true || obj.options.type === 'searchbar') {
            obj.options.autocomplete = true;
        }

        // New options
        if (obj.options.newOptions == true) {
            obj.header.classList.add('jdropdown-add');
        } else {
            obj.header.classList.remove('jdropdown-add');
        }

        // Autocomplete
        if (obj.options.autocomplete == true) {
            obj.header.removeAttribute('readonly');
        } else {
            obj.header.setAttribute('readonly', 'readonly');
        }

        // Place holder
        if (obj.options.placeholder) {
            obj.header.setAttribute('placeholder', obj.options.placeholder);
        } else {
            obj.header.removeAttribute('placeholder');
        }

        // Remove specific dropdown typing to add again
        el.classList.remove('jdropdown-searchbar');
        el.classList.remove('jdropdown-picker');
        el.classList.remove('jdropdown-list');

        if (obj.options.type == 'searchbar') {
            el.classList.add('jdropdown-searchbar');
        } else if (obj.options.type == 'list') {
            el.classList.add('jdropdown-list');
        } else if (obj.options.type == 'picker') {
            el.classList.add('jdropdown-picker');
        } else {
            if (jSuites.getWindowWidth() < 800) {
                if (obj.options.autocomplete) {
                    el.classList.add('jdropdown-searchbar');
                    obj.options.type = 'searchbar';
                } else {
                    el.classList.add('jdropdown-picker');
                    obj.options.type = 'picker';
                }
            } else {
                if (obj.options.width) {
                    el.style.width = obj.options.width;
                    el.style.minWidth = obj.options.width;
                } else {
                    el.style.removeProperty('width');
                    el.style.removeProperty('min-width');
                }

                el.classList.add('jdropdown-default');
                obj.options.type = 'default';
            }
        }

        // Close button
        if (obj.options.type == 'searchbar') {
            containerHeader.appendChild(closeButton);
        } else {
            container.insertBefore(closeButton, container.firstChild);
        }

        // Load the content
        if (options.url && ! options.data) {
            jSuites.ajax({
                url: options.url,
                method: 'GET',
                dataType: 'json',
                success: function(data) {
                    if (data) {
                        success(data, options.value);
                    }
                }
            });
        } else {
            success(options.data, options.value);
        }

        // Return the instance
        return obj;
    }

    // Helpers
    var containerHeader = null;
    var container = null;
    var content = null;
    var closeButton = null;
    var resetButton = null;
    var backdrop = null;

    var keyTimer = null;

    /**
     * Init dropdown
     */
    var init = function() {
        // Do not accept null
        if (! options) {
            options = {};
        }

        // If the element is a SELECT tag, create a configuration object
        if (el.tagName == 'SELECT') {
            var ret = jSuites.dropdown.extractFromDom(el, options);
            el = ret.el;
            options = ret.options;
        }

        // Place holder
        if (! options.placeholder && el.getAttribute('placeholder')) {
            options.placeholder = el.getAttribute('placeholder');
        }

        // Containers
        obj.items = [];
        obj.groups = [];
        obj.value = [];

        // Search options
        obj.search = '';
        obj.results = null;
        obj.numOfItems = 0;

        // Create dropdown
        el.classList.add('jdropdown');

        // Header container
        containerHeader = document.createElement('div');
        containerHeader.className = 'jdropdown-container-header';

        // Header
        obj.header = document.createElement('input');
        obj.header.className = 'jdropdown-header';
        obj.header.setAttribute('autocomplete', 'off');
        obj.header.onfocus = function() {
            if (typeof(obj.options.onfocus) == 'function') {
                obj.options.onfocus(el);
            }
        }

        obj.header.onblur = function() {
            if (typeof(obj.options.onblur) == 'function') {
                obj.options.onblur(el);
            }
        }

        obj.header.onkeyup = function(e) {
            if (obj.options.autocomplete == true && ! keyTimer) {
                if (obj.search != obj.header.value.trim()) {
                    keyTimer = setTimeout(function() {
                        obj.find(obj.header.value.trim());
                        keyTimer = null;
                    }, 400);
                }

                if (! el.classList.contains('jdropdown-focus')) {
                    obj.open();
                }
            } else {
                if (! obj.options.autocomplete) {
                    obj.next(e.key);
                }
            }
        }

        // Global controls
        if (! jSuites.dropdown.hasEvents) {
            // Execute only one time
            jSuites.dropdown.hasEvents = true;
            // Enter and Esc
            document.addEventListener("keydown", jSuites.dropdown.keydown);
        }

        // Container
        container = document.createElement('div');
        container.className = 'jdropdown-container';

        // Dropdown content
        content = document.createElement('div');
        content.className = 'jdropdown-content';

        // Close button
        closeButton = document.createElement('div');
        closeButton.className = 'jdropdown-close';
        closeButton.innerHTML = 'Done';

        // Reset button
        resetButton = document.createElement('div');
        resetButton.className = 'jdropdown-reset';
        resetButton.innerHTML = 'x';
        resetButton.onclick = function() {
            obj.reset();
            obj.close();
        }

        // Create backdrop
        backdrop = document.createElement('div');
        backdrop.className = 'jdropdown-backdrop';

        // Append elements
        containerHeader.appendChild(obj.header);

        container.appendChild(content);
        el.appendChild(containerHeader);
        el.appendChild(container);
        el.appendChild(backdrop);

        // Set the otiptions
        obj.setOptions(options);

        if ('ontouchsend' in document.documentElement === true) {
            el.addEventListener('touchsend', jSuites.dropdown.mouseup);
        } else {
            el.addEventListener('mouseup', jSuites.dropdown.mouseup);
        }

        // Lazyloading
        if (obj.options.lazyLoading == true) {
            jSuites.lazyLoading(content, {
                loadUp: obj.loadUp,
                loadDown: obj.loadDown,
            });
        }

        // Change method
        el.change = obj.setValue;

        // Keep object available from the node
        el.dropdown = obj;
    }

    /**
     * Get the current remote source of data URL
     */
    obj.getUrl = function() {
        return obj.options.url;
    }

    /**
     * Set the new data from a remote source
     * @param {string} url - url from the remote source
     */
    obj.setUrl = function(url) {
        obj.options.url = url;

        jSuites.ajax({
            url: obj.options.url,
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                obj.setData(data);
            }
        });
    }

    /**
     * Add a new item
     * @param {string} title - title of the new item
     */
    obj.add = function(title) {
        if (! title) {
            var current = obj.options.autocomplete == true ? obj.header.value : '';
            var title = prompt('Text', current);
            if (! title) {
                return false;
            }
        }

        // Create new item
        var item = {
            value: jSuites.guid(),
            text: title,
        };

        // Add item to the main list
        obj.options.data.push(item);

        var newItem = obj.createItem(item);

        // Append DOM to the list
        content.appendChild(newItem.element);

        // Callback
        if (typeof(obj.options.oninsert) == 'function') {
            obj.options.oninsert(obj, newItem, item)
        }

        // Show content
        if (content.style.display == 'none') {
            content.style.display = '';
        }

        return item;
    }

    /**
     * Create a new item
     */
    obj.createItem = function(data, group, groupName) {
        if (typeof(data.text) == 'undefined' && data.name) {
            data.text = data.name;
        }
        if (typeof(data.value) == 'undefined' && data.id) {
            data.value = data.id;
        }
        // Create item
        var item = {};
        item.element = document.createElement('div');
        item.element.className = 'jdropdown-item';
        item.element.indexValue = obj.items.length;
        item.value = data.value;
        item.text = data.text;

        // Id
        if (data.id) {
            item.element.setAttribute('id', data.id);
        }

        // Group reference
        if (group) {
            item.group = group;
            item.groupName = groupName;
        }

        // Image
        if (data.image) {
            var image = document.createElement('img');
            image.className = 'jdropdown-image';
            image.src = data.image;
            if (! data.title) {
               image.classList.add('jdropdown-image-small');
            }
            item.element.appendChild(image);
        } else if (data.color) {
            var color = document.createElement('div');
            color.className = 'jdropdown-color';
            color.style.backgroundColor = data.color;
            item.element.appendChild(color);
        }

        // Set content
        var node = document.createElement('div');
        node.className = 'jdropdown-description';
        if (data.text) {
            node.innerText = data.text;
        } else {
            node.innerHTML = '&nbsp;'; 
        }

        // Title
        if (data.title) {
            var title = document.createElement('div');
            title.className = 'jdropdown-title';
            title.innerText = data.title;
            node.appendChild(title);

            // Keep text reference
            item.title = data.title;
        }

        // Value
        if (obj.value && obj.value[data.value]) {
            item.element.classList.add('jdropdown-selected');
            item.selected = true;
        }

        // Keep DOM accessible
        obj.items.push(item);

        // Add node to item
        item.element.appendChild(node);

        return item;
    }

    obj.appendData = function(data) {
        // Create elements
        if (data.length) {
            // Reset counter
            obj.numOfItems = 0;

            // Helpers
            var items = [];
            var groups = [];

            // Prepare data
            for (var i = 0; i < data.length; i++) {
                // Process groups
                if (data[i].group) {
                    if (! groups[data[i].group]) {
                        groups[data[i].group] = [];
                    }
                    groups[data[i].group].push(i);
                } else {
                    items.push(i);
                }
            }

            // Groups
            var groupNames = Object.keys(groups);

            // Append groups in case exists
            if (groupNames.length > 0) {
                for (var i = 0; i < groupNames.length; i++) {
                    // Group container
                    var group = document.createElement('div');
                    group.className = 'jdropdown-group';
                    // Group name
                    var groupName = document.createElement('div');
                    groupName.className = 'jdropdown-group-name';
                    groupName.innerHTML = groupNames[i];
                    // Group arrow
                    var groupArrow = document.createElement('i');
                    groupArrow.className = 'jdropdown-group-arrow jdropdown-group-arrow-down';
                    groupName.appendChild(groupArrow);
                    // Group items
                    var groupContent = document.createElement('div');
                    groupContent.className = 'jdropdown-group-items';
                    for (var j = 0; j < groups[groupNames[i]].length; j++) {
                        var item = obj.createItem(data[groups[groupNames[i]][j]], group, groupNames[i]);

                        if (obj.options.lazyLoading == false || obj.numOfItems < 200) {
                            groupContent.appendChild(item.element);
                            obj.numOfItems++;
                        }
                    }
                    // Group itens
                    group.appendChild(groupName);
                    group.appendChild(groupContent);
                    // Keep group DOM
                    obj.groups.push(group);
                    // Only add to the screen if children on the group
                    if (groupContent.children.length > 0) {
                        // Add DOM to the content
                        content.appendChild(group);
                    }
                }
            }

            if (items.length) {
                for (var i = 0; i < items.length; i++) {
                    var item = obj.createItem(data[items[i]]);
                    if (obj.options.lazyLoading == false || obj.numOfItems < 200) {
                        content.appendChild(item.element);
                        obj.numOfItems++;
                    }
                }
            }
        }
    }

    obj.setData = function(data) {
        // Prepare data
        if (data.length) {
            for (var i = 0; i < data.length; i++) {
                // Compatibility
                if (typeof(data[i]) != 'object') {
                    // Correct format
                    data[i] = {
                        value: data[i],
                        text: data[i]
                    }
                }
            }

            // Make sure the content container is blank
            content.innerHTML = '';

            // Reset current value
            resetValue();

            // Reset
            obj.header.value = '';

            // Reset items
            obj.items = [];

            // Append data
            obj.appendData(data);

            // Update data
            obj.options.data = data;
        }
    }

    obj.getData = function() {
        return obj.options.data;
    }

    /**
     * Get position of the item
     */
    obj.getPosition = function(value) {
        for (var i = 0; i < obj.items.length; i++) {
            if (obj.items[i].value == value) {
                return i;
            }
        }

        return 0;
    }

    /**
     * Get dropdown current text
     */
    obj.getText = function(asArray) {
        var v = [];
        var k = Object.keys(obj.value);
        for (var i = 0; i < k.length; i++) {
            v.push(obj.value[k[i]]);
        }
        if (asArray) {
            return v;
        } else {
            return v.join('; ');
        }
    }

    /**
     * Get dropdown current value
     */
    obj.getValue = function(asArray) {
        if (asArray) {
            return Object.keys(obj.value);
        } else {
            return Object.keys(obj.value).join(';');
        }
    }

    /**
     * Set value
     */
    obj.setValue = function(value, ignoreEvents) {
        // Values
        var newValue = null;
        var oldValue = obj.getValue();

        // New value
        if (value) {
            var values = extractValue(value);
            if (values) {
                newValue = Object.keys(values).join(';')
            }
        }

        if (oldValue != newValue) {
            // Set value
            applyValue(values);

            // Events
            if (ignoreEvents !== true) {
                if (typeof(obj.options.onchange) == 'function') {
                    obj.options.onchange(el, obj, oldValue, obj.options.value);
                }
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
    }

    obj.resetSelected = function() {
        obj.setValue(null);
    } 

    obj.selectIndex = function(index) {
        // Make sure is a number
        var index = parseInt(index);

        // Only select those existing elements
        if (obj.items && obj.items[index]) {
            // Reset cursor to a new position
            obj.setCursor(index, false);

            // Behaviour
            if (! obj.options.multiple) {
                // Update value
                if (obj.items[index].selected) {
                    obj.setValue(null);
                } else {
                    obj.setValue(obj.items[index].value);
                }

                // Close component
                obj.close();
            } else {
                // Toggle option
                if (obj.items[index].selected) {
                    obj.items[index].element.classList.remove('jdropdown-selected');
                    obj.items[index].selected = false;
                } else {
                    // Select element
                    obj.items[index].element.classList.add('jdropdown-selected');
                    obj.items[index].selected = true;
                }

                // Update labels for multiple dropdown
                if (obj.options.autocomplete == false) {
                    obj.header.value = getText().join('; ');
                }
            }
        }
    }

    obj.selectItem = function(item) {
        obj.selectIndex(item.indexValue);
    }

    obj.find = function(str) {
        if (obj.search == str.trim()) {
            return false;
        }

        // Search term
        obj.search = str;

        // Results
        obj.numOfItems = 0;

        // Remove current items in the remote search
        if (obj.options.remoteSearch == true) {
            obj.currentIndex = null;
            obj.results = null;
            jSuites.ajax({
                url: obj.options.url + '?q=' + str,
                method: 'GET',
                dataType: 'json',
                success: function(result) {
                    // Reset items
                    obj.items = [];
                    content.innerHTML = '';
                    obj.appendData(result);

                    if (! result.length) {
                        content.style.display = 'none';
                    } else {
                        content.style.display = '';
                    }
                }
            });
        } else {
            // Search terms
            str = new RegExp(str, 'gi');

            // Reset search
            obj.results = [];

            // Append options
            for (var i = 0; i < obj.items.length; i++) {
                // Item label
                var label = obj.items[i].text;
                // Item title
                var title = obj.items[i].title || '';
                // Group name
                var groupName = obj.items[i].groupName || '';

                if (str == null || obj.value[obj.items[i].value] != undefined || label.match(str) || title.match(str) || groupName.match(str)) {
                    obj.results.push(obj.items[i]);

                    if (obj.items[i].group && obj.items[i].group.children[1].children[0]) {
                        // Remove all nodes
                        while (obj.items[i].group.children[1].children[0]) {
                            obj.items[i].group.children[1].removeChild(obj.items[i].group.children[1].children[0]);
                        }
                    }
                }
            }

            // Remove all nodes
            while (content.children[0]) {
                content.removeChild(content.children[0]);
            }

            // Show 200 items at once
            var number = obj.results.length || 0;

            // Lazyloading
            if (obj.options.lazyLoading == true && number > 200) {
                number = 200;
            }

            for (var i = 0; i < number; i++) {
                if (obj.results[i].group) {
                    if (! obj.results[i].group.parentNode) {
                        content.appendChild(obj.results[i].group);
                    }
                    obj.results[i].group.children[1].appendChild(obj.results[i].element);
                } else {
                    content.appendChild(obj.results[i].element);
                }
                obj.numOfItems++;
            }

            if (! obj.results.length) {
                content.style.display = 'none';
            } else {
                content.style.display = '';
            }
        }
    }

    obj.open = function() {
        // Focus
        if (! el.classList.contains('jdropdown-focus')) {
            // Current dropdown
            jSuites.dropdown.current = obj;

            // Start tracking
            jSuites.tracking(obj, true);

            // Add focus
            el.classList.add('jdropdown-focus');

            // Animation
            if (jSuites.getWindowWidth() < 800) {
                if (obj.options.type == null || obj.options.type == 'picker') {
                    jSuites.animation.slideBottom(container, 1);
                }
            }

            // Filter
            if (obj.options.autocomplete == true) {
                obj.header.value = obj.search;
                obj.header.focus();
            }

            // Set cursor for the first or first selected element
            var k = Object.keys(obj.value);
            if (k[0]) {
                var cursor = obj.getPosition(k[0]);
                if (cursor) {
                    obj.setCursor(cursor);
                }
            }

            // Container Size
            if (! obj.options.type || obj.options.type == 'default') {
                var rect = el.getBoundingClientRect();
                var rectContainer = container.getBoundingClientRect();

                if (obj.options.position) {
                    container.style.position = 'fixed';
                    if (window.innerHeight < rect.bottom + rectContainer.height) {
                        container.style.top = '';
                        container.style.bottom = (window.innerHeight - rect.top ) + 1 + 'px';
                    } else {
                        container.style.top = rect.bottom + 'px';
                        container.style.bottom = '';
                    }
                    container.style.left = rect.left + 'px';
                } else {
                    if (window.innerHeight < rect.bottom + rectContainer.height) {
                        container.style.top = '';
                        container.style.bottom = rect.height + 1 + 'px';
                    } else {
                        container.style.top = '';
                        container.style.bottom = '';
                    }
                }

                container.style.minWidth = rect.width + 'px';

                if (obj.options.maxWidth) {
                    container.style.maxWidth = obj.options.maxWidth;
                }

                if (! obj.items.length && obj.options.autocomplete == true) {
                    content.style.display = 'none';
                } else {
                    content.style.display = '';
                }
            }
        }

        // Events
        if (typeof(obj.options.onopen) == 'function') {
            obj.options.onopen(el);
        }
    }

    obj.close = function(ignoreEvents) {
        if (el.classList.contains('jdropdown-focus')) {
            if (obj.options.multiple == true) {
                obj.setValue(getValue());
            }
            // Update labels
            obj.header.value = obj.getText();
            // Remove cursor
            obj.setCursor();
            // Events
            if (! ignoreEvents && typeof(obj.options.onclose) == 'function') {
                obj.options.onclose(el);
            }
            // Blur
            if (obj.header.blur) {
                obj.header.blur();
            }
            // Remove focus
            el.classList.remove('jdropdown-focus');
            // Start tracking
            jSuites.tracking(obj, false);
            // Current dropdown
            jSuites.dropdown.current = null;
        }

        return obj.getValue();
    }

    /**
     * Set cursor
     */
    obj.setCursor = function(index, setPosition) {
        // Remove current cursor
        if (obj.currentIndex != null) {
            // Remove visual cursor
            if (obj.items && obj.items[obj.currentIndex]) {
                obj.items[obj.currentIndex].element.classList.remove('jdropdown-cursor');
            }
        }

        if (index == undefined) {
            obj.currentIndex = null;
        } else {
            parseInt(index);

            obj.items[index].element.classList.add('jdropdown-cursor');
            obj.currentIndex = index;

            // Update scroll to the cursor element
            if (setPosition !== false && obj.items[obj.currentIndex].element) {
                var container = content.scrollTop;
                var element = obj.items[obj.currentIndex].element;
                content.scrollTop = element.offsetTop - element.scrollTop + element.clientTop - 95;
            }
        }
    }

    // Compatibility
    obj.resetCursor = obj.setCursor;
    obj.updateCursor = obj.setCursor;

    /**
     * Reset cursor and selected items
     */
    obj.reset = function() {
        // Reset cursor
        obj.setCursor();

        // Reset selected
        obj.setValue(null);
    }

    /**
     * First visible item
     */
    obj.firstVisible = function() {
        var newIndex = null;
        for (var i = 0; i < obj.items.length; i++) {
            if (obj.items && obj.items[i] && obj.items[i].element.parentNode && obj.items[i].element.style.display != 'none') {
                newIndex = i;
                break;
            }
        }

        if (newIndex == null) {
            return false;
        }

        obj.setCursor(newIndex);
    }

    /**
     * Navigation
     */
    obj.first = function() {
        var newIndex = null;
        for (var i = obj.currentIndex - 1; i >= 0; i--) {
            if (obj.items && obj.items[i] && obj.items[i].element.parentNode && obj.items[i].element.style.display != 'none') {
                newIndex = i;
            }
        }

        if (newIndex == null) {
            return false;
        }

        obj.setCursor(newIndex);
    }

    obj.last = function() {
        var newIndex = null;
        for (var i = obj.currentIndex + 1; i < obj.items.length; i++) {
            if (obj.items && obj.items[i] && obj.items[i].element.parentNode && obj.items[i].element.style.display != 'none') {
                newIndex = i;
            }
        }

        if (newIndex == null) {
            return false;
        }

        obj.setCursor(newIndex);
    }

    var next = function(index, letter) {
        for (var i = index; i < obj.items.length; i++) {
            if (obj.items && obj.items[i] && obj.items[i].element.parentNode && (! letter || obj.items[i].text[0].toLowerCase() == letter)) {
                return i;
            }
        }

        return null;
    }

    obj.next = function(letter) {
        if (letter && letter.length == 1) {
            letter = letter.toLowerCase();
        }

        if (obj.currentIndex === null) {
            var index = obj.currentIndex = 0;
        } else {
            var index = obj.currentIndex + 1;
        }

        // Try to find the next from the current position
        var newIndex = next(index, letter);

        if (newIndex == null && letter) {
            // Trying to find from the begining
            newIndex = next(0, letter);
            // Did not find
            if (newIndex == null) {
                return false;
            }
        }

        // Set cursor
        obj.setCursor(newIndex);
    }

    obj.prev = function() {
        var newIndex = null;
        for (var i = obj.currentIndex - 1; i >= 0; i--) {
            if (obj.items && obj.items[i] && obj.items[i].element.parentNode) {
                newIndex = i;
                break;
            }
        }

        if (newIndex == null) {
            return false;
        }

        obj.setCursor(newIndex);
    }

    obj.loadUp = function() {
        return false;
    }

    obj.loadDown = function() {
        var test = false;

        // Search
        if (obj.results) {
            var results = obj.results;
        } else {
            var results = obj.items;
        }

        if (results.length > obj.numOfItems) {
            var numberOfItems = obj.numOfItems;
            var number = results.length - numberOfItems;
            if (number > 200) {
                number = 200;
            }

            for (var i = numberOfItems; i < numberOfItems + number; i++) {
                if (results[i].group) {
                    if (! results[i].group.parentNode) {
                        content.appendChild(results[i].group);
                    }
                    results[i].group.children[2].appendChild(results[i].element);
                } else {
                    content.appendChild(results[i].element);
                }

                obj.numOfItems++;
            }

            // New item added
            test = true;
        }

        return test;
    }

    init();

    return obj;
});

jSuites.dropdown.keydown = function(e) {
    var dropdown = null;
    if (dropdown = jSuites.dropdown.current) {
        if (e.which == 13) {
            dropdown.selectIndex(dropdown.currentIndex);
        } else if (e.which == 38) {
            if (dropdown.currentIndex == null) {
                dropdown.firstVisible();
            } else if (dropdown.currentIndex > 0) {
                dropdown.prev();
            }
            e.preventDefault();
        } else if (e.which == 40) {
            if (dropdown.currentIndex == null) {
                dropdown.firstVisible();
            } else if (dropdown.currentIndex + 1 < dropdown.items.length) {
                dropdown.next();
            }
            e.preventDefault();
        } else if (e.which == 36) {
            dropdown.first();
        } else if (e.which == 35) {
            dropdown.last();
        } else if (e.which == 27) {
            dropdown.close();
        }
    }
}

jSuites.dropdown.mouseup = function(e) {
    var element = jSuites.findElement(e.target, 'jdropdown');
    if (element) {
        var dropdown = element.dropdown;
        if (e.target.classList.contains('jdropdown-header')) {
            if (element.classList.contains('jdropdown-focus') && element.classList.contains('jdropdown-default')) {
                var rect = element.getBoundingClientRect();

                if (e.changedTouches && e.changedTouches[0]) {
                    var x = e.changedTouches[0].clientX;
                    var y = e.changedTouches[0].clientY;
                } else {
                    var x = e.clientX;
                    var y = e.clientY;
                }

                if (rect.width - (x - rect.left) < 30) {
                    if (e.target.classList.contains('jdropdown-add')) {
                        dropdown.add();
                    } else {
                        dropdown.close();
                    }
                } else {
                    if (dropdown.options.autocomplete == false) {
                        dropdown.close();
                    }
                }
            } else {
                dropdown.open();
            }
        } else if (e.target.classList.contains('jdropdown-group-name')) {
            var items = e.target.nextSibling.children;
            if (e.target.nextSibling.style.display != 'none') {
                for (var i = 0; i < items.length; i++) {
                    if (items[i].style.display != 'none') {
                        dropdown.selectItem(items[i]);
                    }
                }
            }
        } else if (e.target.classList.contains('jdropdown-group-arrow')) {
            if (e.target.classList.contains('jdropdown-group-arrow-down')) {
                e.target.classList.remove('jdropdown-group-arrow-down');
                e.target.classList.add('jdropdown-group-arrow-up');
                e.target.parentNode.nextSibling.style.display = 'none';
            } else {
                e.target.classList.remove('jdropdown-group-arrow-up');
                e.target.classList.add('jdropdown-group-arrow-down');
                e.target.parentNode.nextSibling.style.display = '';
            }
        } else if (e.target.classList.contains('jdropdown-item')) {
            dropdown.selectItem(e.target);
        } else if (e.target.classList.contains('jdropdown-image')) {
            dropdown.selectItem(e.target.parentNode);
        } else if (e.target.classList.contains('jdropdown-description')) {
            dropdown.selectItem(e.target.parentNode);
        } else if (e.target.classList.contains('jdropdown-title')) {
            dropdown.selectItem(e.target.parentNode.parentNode);
        } else if (e.target.classList.contains('jdropdown-close') || e.target.classList.contains('jdropdown-backdrop')) {
            dropdown.close();
        }
    }
}

jSuites.dropdown.extractFromDom = function(el, options) {
    // Keep reference
    var select = el;
    if (! options) {
        options = {};
    }
    // Prepare configuration
    if (el.getAttribute('multiple') && (! options || options.multiple == undefined)) {
        options.multiple = true;
    }
    if (el.getAttribute('placeholder') && (! options || options.placeholder == undefined)) {
        options.placeholder = el.getAttribute('placeholder');
    }
    if (el.getAttribute('data-autocomplete') && (! options || options.autocomplete == undefined)) {
        options.autocomplete = true;
    }
    if (! options || options.width == undefined) {
        options.width = el.offsetWidth;
    }
    if (el.value && (! options || options.value == undefined)) {
        options.value = el.value;
    }
    if (! options || options.data == undefined) {
        options.data = [];
        for (var j = 0; j < el.children.length; j++) {
            if (el.children[j].tagName == 'OPTGROUP') {
                for (var i = 0; i < el.children[j].children.length; i++) {
                    options.data.push({
                        value: el.children[j].children[i].value,
                        text: el.children[j].children[i].innerHTML,
                        group: el.children[j].getAttribute('label'),
                    });
                }
            } else {
                options.data.push({
                    value: el.children[j].value,
                    text: el.children[j].innerHTML,
                });
            }
        }
    }
    if (! options || options.onchange == undefined) {
        options.onchange = function(a,b,c,d) {
            if (options.multiple == true) {
                if (obj.items[b].classList.contains('jdropdown-selected')) {
                    select.options[b].setAttribute('selected', 'selected');
                } else {
                    select.options[b].removeAttribute('selected');
                }
            } else {
                select.value = d;
            }
        }
    }
    // Create DIV
    var div = document.createElement('div');
    el.parentNode.insertBefore(div, el);
    el.style.display = 'none';
    el = div;

    return { el:el, options:options };
}

jSuites.editor = (function(el, options) {
    var obj = {};
    obj.options = {};

    // If element is textarea, then replace by div editor
    if (el.tagName == 'TEXTAREA' || el.tagName == 'INPUT') {
        // Current element
        var element = el;
        element.style.display = 'none';
        // New Element
        el = document.createElement('div');
        // Value
        if (! options.value) {
            options.value = element.value;
        }
        // Event to populate the textarea
        options.onblur = function(a,b,c) {
            element.value = b.getData()
        }
        element.insertBefore(el);
    }

    // Default configuration
    var defaults = {
        // Initial HTML content
        value: null,
        // Initial snippet
        snippet: null,
        // Add toolbar
        toolbar: null,
        // Website parser is to read websites and images from cross domain
        remoteParser: null,
        // Placeholder
        placeholder: null,
        // Parse URL
        parseURL: false,
        filterPaste: true,
        // Accept drop files
        dropZone: false,
        dropAsAttachment: false,
        acceptImages: false,
        acceptFiles: false,
        maxFileSize: 5000000,
        allowImageResize: true,
        // Style
        border: true,
        padding: true,
        maxHeight: null,
        height: null,
        focus: false,
        // Events
        onclick: null,
        onfocus: null,
        onblur: null,
        onload: null,
        onkeyup: null,
        onkeydown: null,
        onchange: null,
    };

    // Loop through our object
    for (var property in defaults) {
        if (options && options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    // Private controllers
    var imageResize = 0;
    var editorTimer = null;
    var editorAction = null;

    // Make sure element is empty
    el.innerHTML = '';

    if (typeof(obj.options.onclick) == 'function') {
        el.onclick = function(e) {
            obj.options.onclick(el, obj, e);
        }
    }

    // Prepare container
    el.classList.add('jeditor-container');

    // Padding
    if (obj.options.padding == true) {
        el.classList.add('jeditor-padding');
    }

    // Placeholder
    if (obj.options.placeholder) {
        el.setAttribute('data-placeholder', obj.options.placeholder);
    }

    // Border
    if (obj.options.border == false) {
        el.style.border = '0px';
    }

    // Snippet
    var snippet = document.createElement('div');
    snippet.className = 'jsnippet';
    snippet.setAttribute('contenteditable', false);

    // Toolbar
    var toolbar = document.createElement('div');
    toolbar.className = 'jeditor-toolbar';

    // Create editor
    var editor = document.createElement('div');
    editor.setAttribute('contenteditable', true);
    editor.setAttribute('spellcheck', false);
    editor.className = 'jeditor';

    // Max height
    if (obj.options.maxHeight || obj.options.height) {
        editor.style.overflowY = 'auto';

        if (obj.options.maxHeight) {
            editor.style.maxHeight = obj.options.maxHeight;
        }
        if (obj.options.height) {
            editor.style.height = obj.options.height;
        }
    }

    // Set editor initial value
    if (obj.options.value) {
        var value = obj.options.value;
    } else {
        var value = el.innerHTML ? el.innerHTML : ''; 
    }

    if (! value) {
        var value = '<br>';
    }

    /**
     * Onchange event controllers
     */
    var change = function(e) {
        if (typeof(obj.options.onchange) == 'function') { 
            obj.options.onchange(el, obj, e);
        }

        // Update value
        obj.options.value = obj.getData();

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

    /**
     * Extract images from a HTML string
     */
    var extractImageFromHtml = function(html) {
        // Create temp element
        var div = document.createElement('div');
        div.innerHTML = html;

        // Extract images
        var img = div.querySelectorAll('img');

        if (img.length) {
            for (var i = 0; i < img.length; i++) {
                obj.addImage(img[i].src);
            }
        }
    }

    /**
     * Insert node at caret
     */
    var insertNodeAtCaret = function(newNode) {
        var sel, range;

        if (window.getSelection) {
            sel = window.getSelection();
            if (sel.rangeCount) {
                range = sel.getRangeAt(0);
                var selectedText = range.toString();
                range.deleteContents();
                range.insertNode(newNode); 
                // move the cursor after element
                range.setStartAfter(newNode);
                range.setEndAfter(newNode); 
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    }

    /**
     * Append snippet or thumbs in the editor
     * @Param object data
     */
    var appendElement = function(data) {
        // Reset snippet
        snippet.innerHTML = '';

        if (data.image) {
            var div = document.createElement('div');
            div.className = 'jsnippet-image';
            div.setAttribute('data-k', 'image');
            snippet.appendChild(div);

            var image = document.createElement('img');
            image.src = data.image;
            div.appendChild(image);
        }

        var div = document.createElement('div');
        div.className = 'jsnippet-title';
        div.setAttribute('data-k', 'title');
        div.innerHTML = data.title;
        snippet.appendChild(div);

        var div = document.createElement('div');
        div.className = 'jsnippet-description';
        div.setAttribute('data-k', 'description');
        div.innerHTML = data.description;
        snippet.appendChild(div);

        var div = document.createElement('div');
        div.className = 'jsnippet-host';
        div.setAttribute('data-k', 'host');
        div.innerHTML = data.host;
        snippet.appendChild(div);

        var div = document.createElement('div');
        div.className = 'jsnippet-url';
        div.setAttribute('data-k', 'url');
        div.innerHTML = data.url;
        snippet.appendChild(div);

        editor.appendChild(snippet);
    }

    var verifyEditor = function() {
        clearTimeout(editorTimer);
        editorTimer = setTimeout(function() {
            var snippet = editor.querySelector('.jsnippet');
            var thumbsContainer = el.querySelector('.jeditor-thumbs-container');

            if (! snippet && ! thumbsContainer) {
                var html = editor.innerHTML.replace(/\n/g, ' ');
                var container = document.createElement('div');
                container.innerHTML = html;
                var thumbsContainer = container.querySelector('.jeditor-thumbs-container');
                if (thumbsContainer) {
                    thumbsContainer.remove();
                }
                var text = container.innerText; 
                var url = jSuites.editor.detectUrl(text);

                if (url) {
                    if (url[0].substr(-3) == 'jpg' || url[0].substr(-3) == 'png' || url[0].substr(-3) == 'gif') {
                        if (jSuites.editor.getDomain(url[0]) == window.location.hostname) {
                            obj.importImage(url[0], '');
                        } else {
                            obj.importImage(obj.options.remoteParser + url[0], '');
                        }
                    } else {
                        var id = jSuites.editor.youtubeParser(url[0]);
                        obj.parseWebsite(url[0], id);
                    }
                }
            }
        }, 1000);
    }

    obj.parseContent = function() {
        verifyEditor();
    }

    obj.parseWebsite = function(url, youtubeId) {
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
                    // Image
                    if (result.image) {
                        p.image = result.image;
                    } else if (result['og:image']) {
                        p.image = result['og:image'];
                    }
                    // Host
                    if (result.host) {
                        p.host = result.host;
                    }
                    // Url
                    if (result.url) {
                        p.url = result.url;
                    }

                    appendElement(p);
                }
            });
        }
    }

    /**
     * Set editor value
     */
    obj.setData = function(html) {
        editor.innerHTML = html;
        jSuites.editor.setCursor(editor, true);
    }

    obj.getText = function() {
        return editor.innerText;
    }

    /**
     * Get editor data
     */
    obj.getData = function(json) {
        if (! json) {
            var data = editor.innerHTML;
        } else {
            var data = {
                content : '',
            }

            // Get tag users
            var tagged = editor.querySelectorAll('.post-tag');
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

            if (snippet.innerHTML) {
                var index = 0;
                data.snippet = {};
                for (var i = 0; i < snippet.children.length; i++) {
                    // Get key from element
                    var key = snippet.children[i].getAttribute('data-k');
                    if (key) {
                        if (key == 'image') {
                            data.snippet.image = snippet.children[i].children[0].getAttribute('src');
                        } else {
                            data.snippet[key] = snippet.children[i].innerHTML;
                        }
                    }
                }

                snippet.innerHTML = '';
                snippet.remove();
            }

            var text = editor.innerHTML;
            text = text.replace(/<br>/g, "\n");
            text = text.replace(/<\/div>/g, "<\/div>\n");
            text = text.replace(/<(?:.|\n)*?>/gm, "");
            data.content = text.trim();
            data = JSON.stringify(data);
        }

        return data;
    }

    // Reset
    obj.reset = function() {
        editor.innerHTML = '';
    }

    obj.addPdf = function(data) {
        if (data.result.substr(0,4) != 'data') {
            console.error('Invalid source');
        } else {
            var canvas = document.createElement('canvas');
            canvas.width = 60;
            canvas.height = 60;

            var img = new Image();
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            canvas.toBlob(function(blob) {
                var newImage = document.createElement('img');
                newImage.src = window.URL.createObjectURL(blob);
                newImage.setAttribute('data-extension', 'pdf');
                if (data.name) {
                    newImage.setAttribute('data-name', data.name);
                }
                if (data.size) {
                    newImage.setAttribute('data-size', data.size);
                }
                if (data.date) {
                    newImage.setAttribute('data-date', data.date);
                }
                newImage.className = 'jfile pdf';

                insertNodeAtCaret(newImage);

                // Image content
                newImage.content = data.result.substr(data.result.indexOf(',') + 1);
            });
        }
    }

    obj.getFiles = function() {
        return jSuites.files(editor).get();
    }

    obj.addImage = function(src, name, size, date) {
        if (src.substr(0,4) != 'data' && ! obj.options.remoteParser) {
            console.error('remoteParser not defined in your initialization');
        } else {
            // This is to process cross domain images
            if (src.substr(0,4) == 'data') {
                var extension = src.split(';')
                extension = extension[0].split('/');
                extension = extension[1];
            } else {
                var extension = src.substr(src.lastIndexOf('.') + 1);
                // Work for cross browsers
                src = obj.options.remoteParser + src;
            }

            var img = new Image();

            img.onload = function onload() {
                var canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;

                var ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                canvas.toBlob(function(blob) {
                    var newImage = document.createElement('img');
                    newImage.src = window.URL.createObjectURL(blob);
                    newImage.setAttribute('tabindex', '900');
                    newImage.setAttribute('data-extension', extension);
                    if (name) {
                        newImage.setAttribute('data-name', name);
                    }
                    if (size) {
                        newImage.setAttribute('data-size', size);
                    }
                    if (date) {
                        newImage.setAttribute('data-date', date);
                    }
                    newImage.className = 'jfile';
                    var content = canvas.toDataURL();
                    insertNodeAtCaret(newImage);

                    // Image content
                    newImage.content = content.substr(content.indexOf(',') + 1);

                    change();
                });
            };

            img.src = src;
        }
    }

    obj.addFile = function(files) {
        var reader = [];

        for (var i = 0; i < files.length; i++) {
            if (files[i].size > obj.options.maxFileSize) {
                alert('The file is too big');
            } else {
                // Only PDF or Images
                var type = files[i].type.split('/');

                if (type[0] == 'image') {
                    type = 1;
                } else if (type[1] == 'pdf') {
                    type = 2;
                } else {
                    type = 0;
                }

                if (type) {
                    // Create file
                    reader[i] = new FileReader();
                    reader[i].index = i;
                    reader[i].type = type;
                    reader[i].name = files[i].name;
                    reader[i].date = files[i].lastModified;
                    reader[i].size = files[i].size;
                    reader[i].addEventListener("load", function (data) {
                        // Get result
                        if (data.target.type == 2) {
                            if (obj.options.acceptFiles == true) {
                                obj.addPdf(data.target);
                            }
                        } else {
                            obj.addImage(data.target.result, data.target.name, data.total, data.target.lastModified);
                        }
                    }, false);

                    reader[i].readAsDataURL(files[i])
                } else {
                    alert('The extension is not allowed');
                }
            }
        }
    }

    // Destroy
    obj.destroy = function() {
        editor.removeEventListener('mouseup', editorMouseUp);
        editor.removeEventListener('mousedown', editorMouseDown);
        editor.removeEventListener('mousemove', editorMouseMove);
        editor.removeEventListener('keyup', editorKeyUp);
        editor.removeEventListener('keydown', editorKeyDown);
        editor.removeEventListener('dragstart', editorDragStart);
        editor.removeEventListener('dragenter', editorDragEnter);
        editor.removeEventListener('dragover', editorDragOver);
        editor.removeEventListener('drop', editorDrop);
        editor.removeEventListener('paste', editorPaste);

        if (typeof(obj.options.onblur) == 'function') {
            editor.removeEventListener('blur', editorBlur);
        }
        if (typeof(obj.options.onfocus) == 'function') {
            editor.removeEventListener('focus', editorFocus);
        }

        el.editor = null;
        el.classList.remove('jeditor-container');

        toolbar.remove();
        snippet.remove();
        editor.remove();
    }

    var isLetter = function (str) {
        var regex = /([\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]+)/g;
        return str.match(regex) ? 1 : 0;
    }

    // Event handlers
    var editorMouseUp = function(e) {
        editorAction = false;
    }

    var editorMouseDown = function(e) {
        var close = function(snippet) {
            var rect = snippet.getBoundingClientRect();
            if (rect.width - (e.clientX - rect.left) < 40 && e.clientY - rect.top < 40) {
                snippet.innerHTML = '';
                snippet.remove();
            }
        }

        if (e.target.tagName == 'IMG') {
            if (e.target.style.cursor) {
                var rect = e.target.getBoundingClientRect();
                editorAction = {
                    e: e.target,
                    x: e.clientX,
                    y: e.clientY,
                    w: rect.width,
                    h: rect.height,
                    d: e.target.style.cursor,
                }

                if (! e.target.style.width) {
                    e.target.style.width = rect.width + 'px';
                }

                if (! e.target.style.height) {
                    e.target.style.height = rect.height + 'px';
                }

                var s = window.getSelection();
                if (s.rangeCount) {
                    for (var i = 0; i < s.rangeCount; i++) {
                        s.removeRange(s.getRangeAt(i));
                    }
                }
            } else {
                editorAction = true;
            }
        } else { 
            if (e.target.classList.contains('jsnippet')) {
                close(e.target);
            } else if (e.target.parentNode.classList.contains('jsnippet')) {
                close(e.target.parentNode);
            }

            editorAction = true;
        }
    }

    var editorMouseMove = function(e) {
        if (e.target.tagName == 'IMG' && obj.options.allowImageResize == true) {
            if (e.target.getAttribute('tabindex')) {
                var rect = e.target.getBoundingClientRect();
                if (e.clientY - rect.top < 5) {
                    if (rect.width - (e.clientX - rect.left) < 5) {
                        e.target.style.cursor = 'ne-resize';
                    } else if (e.clientX - rect.left < 5) {
                        e.target.style.cursor = 'nw-resize';
                    } else {
                        e.target.style.cursor = 'n-resize';
                    }
                } else if (rect.height - (e.clientY - rect.top) < 5) {
                    if (rect.width - (e.clientX - rect.left) < 5) {
                        e.target.style.cursor = 'se-resize';
                    } else if (e.clientX - rect.left < 5) {
                        e.target.style.cursor = 'sw-resize';
                    } else {
                        e.target.style.cursor = 's-resize';
                    }
                } else if (rect.width - (e.clientX - rect.left) < 5) {
                    e.target.style.cursor = 'e-resize';
                } else if (e.clientX - rect.left < 5) {
                    e.target.style.cursor = 'w-resize';
                } else {
                    e.target.style.cursor = '';
                }
            }
        }

        // Move
        if (e.which == 1 && editorAction && editorAction.d) {
            if (editorAction.d == 'e-resize' || editorAction.d == 'ne-resize' ||  editorAction.d == 'se-resize') {
                editorAction.e.style.width = (editorAction.w + (e.clientX - editorAction.x)) + 'px';

                if (e.shiftKey) {
                    var newHeight = (e.clientX - editorAction.x) * (editorAction.h / editorAction.w);
                    editorAction.e.style.height = editorAction.h + newHeight + 'px';
                } else {
                    var newHeight =  null;
                }
            }

            if (! newHeight) {
                if (editorAction.d == 's-resize' || editorAction.d == 'se-resize' || editorAction.d == 'sw-resize') {
                    if (! e.shiftKey) {
                        editorAction.e.style.height = editorAction.h + (e.clientY - editorAction.y) + 'px';
                    }
                }
            }
        }
    }

    var editorKeyUp = function(e) {
        if (! editor.innerHTML) {
            editor.innerHTML = '<div><br></div>';
        }

        if (typeof(obj.options.onkeyup) == 'function') { 
            obj.options.onkeyup(el, obj, e);
        }
    }


    var editorKeyDown = function(e) {
        // Check for URL
        if (obj.options.parseURL == true) {
            verifyEditor();
        }

        if (typeof(obj.options.onkeydown) == 'function') { 
            obj.options.onkeydown(el, obj, e);
        }
    }

    var editorPaste = function(e) {
        if (obj.options.filterPaste == true) {
            if (e.clipboardData || e.originalEvent.clipboardData) {
                var html = (e.originalEvent || e).clipboardData.getData('text/html');
                var text = (e.originalEvent || e).clipboardData.getData('text/plain');
                var file = (e.originalEvent || e).clipboardData.files
            } else if (window.clipboardData) {
                var html = window.clipboardData.getData('Html');
                var text = window.clipboardData.getData('Text');
                var file = window.clipboardData.files
            }

            if (file.length) {
                // Paste a image from the clipboard
                obj.addFile(file);
            } else {
                // Paste text
                text = text.split('\r\n');
                var str = '';
                if (e.target.nodeName == 'DIV' && e.target.classList.contains('jeditor')) {
                    for (var i = 0; i < text.length; i++) {
                        var tmp = document.createElement('div');
                        if (text[i]) {
                            tmp.innerText = text[i];
                        } else {
                            tmp.innerHTML = '<br/>';
                        }
                        e.target.appendChild(tmp);
                    }
                } else {
                    var content = document.createElement('div');
                    for (var i = 0; i < text.length; i++) {
                        if (text[i]) {
                            var div = document.createElement('div');
                            div.innerText = text[i];
                            content.appendChild(div);
                        }
                    }
                    // Insert text
                    document.execCommand('insertHtml', false, content.innerHTML);
                }

                // Extra images from the paste
                if (obj.options.acceptImages == true) {
                    extractImageFromHtml(html);
                }
            }

            e.preventDefault();
        }
    }

    var editorDragStart = function(e) {
        if (editorAction && editorAction.e) {
            e.preventDefault();
        }
    }

    var editorDragEnter = function(e) {
        if (editorAction || obj.options.dropZone == false) {
            // Do nothing
        } else {
            el.classList.add('jeditor-dragging');
        }
    }

    var editorDragOver = function(e) {
        if (editorAction || obj.options.dropZone == false) {
            // Do nothing
        } else {
            if (editorTimer) {
                clearTimeout(editorTimer);
            }

            editorTimer = setTimeout(function() {
                el.classList.remove('jeditor-dragging');
            }, 100);
        }
    }

    var editorDrop = function(e) {
        if (editorAction || obj.options.dropZone == false) {
            // Do nothing
        } else {
            // Position caret on the drop
            var range = null;
            if (document.caretRangeFromPoint) {
                range=document.caretRangeFromPoint(e.clientX, e.clientY);
            } else if (e.rangeParent) {
                range=document.createRange();
                range.setStart(e.rangeParent,e.rangeOffset);
            }
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
            sel.anchorNode.parentNode.focus();

            var html = (e.originalEvent || e).dataTransfer.getData('text/html');
            var text = (e.originalEvent || e).dataTransfer.getData('text/plain');
            var file = (e.originalEvent || e).dataTransfer.files;
    
            if (file.length) {
                obj.addFile(file);
            } else if (text) {
                extractImageFromHtml(html);
            }

            el.classList.remove('jeditor-dragging');
            e.preventDefault();
        }
    }

    var editorBlur = function(e) {
        // Blur
        if (typeof(obj.options.onblur) == 'function') {
            obj.options.onblur(el, obj, e);
        }

        change(e);
    }

    var editorFocus = function(e) {
        // Focus
        if (typeof(obj.options.onfocus) == 'function') {
            obj.options.onfocus(el, obj, e);
        }
    }

    editor.addEventListener('mouseup', editorMouseUp);
    editor.addEventListener('mousedown', editorMouseDown);
    editor.addEventListener('mousemove', editorMouseMove);
    editor.addEventListener('keyup', editorKeyUp);
    editor.addEventListener('keydown', editorKeyDown);
    editor.addEventListener('dragstart', editorDragStart);
    editor.addEventListener('dragenter', editorDragEnter);
    editor.addEventListener('dragover', editorDragOver);
    editor.addEventListener('drop', editorDrop);
    editor.addEventListener('paste', editorPaste);
    editor.addEventListener('focus', editorFocus);
    editor.addEventListener('blur', editorBlur);

    // Onload
    if (typeof(obj.options.onload) == 'function') {
        obj.options.onload(el, obj, editor);
    }

    // Set value to the editor
    editor.innerHTML = value;

    // Append editor to the containre
    el.appendChild(editor);

    // Snippet
    if (obj.options.snippet) {
        appendElement(obj.options.snippet);
    }

    // Default toolbar
    if (obj.options.toolbar == null) {
        obj.options.toolbar = jSuites.editor.getDefaultToolbar();
    }

    // Add toolbar
    if (obj.options.toolbar) {
        // Create toolbar
        jSuites.toolbar(toolbar, {
            container: true,
            items: obj.options.toolbar
        });
        // Append to the DOM
        el.appendChild(toolbar);
    }

    // Focus to the editor
    if (obj.options.focus) {
        jSuites.editor.setCursor(editor, obj.options.focus == 'initial' ? true : false);
    }

    // Change method
    el.change = obj.setData;

    el.editor = obj;

    return obj;
});

jSuites.editor.setCursor = function(element, first) {
    element.focus();
    document.execCommand('selectAll');
    var sel = window.getSelection();
    var range = sel.getRangeAt(0);
    if (first == true) {
        var node = range.startContainer;
        var size = 0;
    } else {
        var node = range.endContainer;
        var size = node.length;
    }
    range.setStart(node, size);
    range.setEnd(node, size);
    sel.removeAllRanges();
    sel.addRange(range);
}

jSuites.editor.getDomain = function(url) {
    return url.replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/)[0].split(/:/g)[0];
}

jSuites.editor.detectUrl = function(text) {
    var expression = /(((https?:\/\/)|(www\.))[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|]+)/ig;
    var links = text.match(expression);

    if (links) {
        if (links[0].substr(0,3) == 'www') {
            links[0] = 'http://' + links[0];
        }
    }

    return links;
}

jSuites.editor.youtubeParser = function(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);

    return (match && match[7].length == 11) ? match[7] : false;
}

jSuites.editor.getDefaultToolbar = function() { 
    return [
        {
            content: 'undo',
            onclick: function() {
                document.execCommand('undo');
            }
        },
        {
            content: 'redo',
            onclick: function() {
                document.execCommand('redo');
            }
        },
        {
            type:'divisor'
        },
        {
            content: 'format_bold',
            onclick: function(a,b,c) {
                document.execCommand('bold');

                if (document.queryCommandState("bold")) {
                    c.classList.add('selected');
                } else {
                    c.classList.remove('selected');
                }
            }
        },
        {
            content: 'format_italic',
            onclick: function(a,b,c) {
                document.execCommand('italic');

                if (document.queryCommandState("italic")) {
                    c.classList.add('selected');
                } else {
                    c.classList.remove('selected');
                }
            }
        },
        {
            content: 'format_underline',
            onclick: function(a,b,c) {
                document.execCommand('underline');

                if (document.queryCommandState("underline")) {
                    c.classList.add('selected');
                } else {
                    c.classList.remove('selected');
                }
            }
        },
        {
            type:'divisor'
        },
        {
            content: 'format_list_bulleted',
            onclick: function(a,b,c) {
                document.execCommand('insertUnorderedList');

                if (document.queryCommandState("insertUnorderedList")) {
                    c.classList.add('selected');
                } else {
                    c.classList.remove('selected');
                }
            }
        },
        {
            content: 'format_list_numbered',
            onclick: function(a,b,c) {
                document.execCommand('insertOrderedList');

                if (document.queryCommandState("insertOrderedList")) {
                    c.classList.add('selected');
                } else {
                    c.classList.remove('selected');
                }
            }
        },
        {
            content: 'format_indent_increase',
            onclick: function(a,b,c) {
                document.execCommand('indent', true, null);

                if (document.queryCommandState("indent")) {
                    c.classList.add('selected');
                } else {
                    c.classList.remove('selected');
                }
            }
        },
        {
            content: 'format_indent_decrease',
            onclick: function() {
                document.execCommand('outdent');

                if (document.queryCommandState("outdent")) {
                    this.classList.add('selected');
                } else {
                    this.classList.remove('selected');
                }
            }
        }/*,
        {
            icon: ['format_align_left', 'format_align_right', 'format_align_center'],
            onclick: function() {
                document.execCommand('justifyCenter');

                if (document.queryCommandState("justifyCenter")) {
                    this.classList.add('selected');
                } else {
                    this.classList.remove('selected');
                }
            }
        }
        {
            type:'select',
            items: ['Verdana','Arial','Courier New'],
            onchange: function() {
            }
        },
        {
            type:'select',
            items: ['10px','12px','14px','16px','18px','20px','22px'],
            onchange: function() {
            }
        },
        {
            icon:'format_align_left',
            onclick: function() {
                document.execCommand('JustifyLeft');

                if (document.queryCommandState("JustifyLeft")) {
                    this.classList.add('selected');
                } else {
                    this.classList.remove('selected');
                }
            }
        },
        {
            icon:'format_align_center',
            onclick: function() {
                document.execCommand('justifyCenter');

                if (document.queryCommandState("justifyCenter")) {
                    this.classList.add('selected');
                } else {
                    this.classList.remove('selected');
                }
            }
        },
        {
            icon:'format_align_right',
            onclick: function() {
                document.execCommand('justifyRight');

                if (document.queryCommandState("justifyRight")) {
                    this.classList.add('selected');
                } else {
                    this.classList.remove('selected');
                }
            }
        },
        {
            icon:'format_align_justify',
            onclick: function() {
                document.execCommand('justifyFull');

                if (document.queryCommandState("justifyFull")) {
                    this.classList.add('selected');
                } else {
                    this.classList.remove('selected');
                }
            }
        },
        {
            icon:'format_list_bulleted',
            onclick: function() {
                document.execCommand('insertUnorderedList');

                if (document.queryCommandState("insertUnorderedList")) {
                    this.classList.add('selected');
                } else {
                    this.classList.remove('selected');
                }
            }
        }*/
    ];
}


jSuites.focus = function(el) {
    if (el.innerText.length) {
        var range = document.createRange();
        var sel = window.getSelection();
        var node = el.childNodes[el.childNodes.length-1];
        range.setStart(node, node.length)
        range.collapse(true)
        sel.removeAllRanges()
        sel.addRange(range)
        el.scrollLeft = el.scrollWidth;
    }
}

jSuites.isNumeric = (function (num) {
    return !isNaN(num) && num !== null && num !== '';
});

jSuites.guid = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 * Generate hash from a string
 */
jSuites.hash = function(str) {
    var hash = 0, i, chr;

    if (str.length === 0) {
        return hash;
    } else {
        for (i = 0; i < str.length; i++) {
            chr = str.charCodeAt(i);
            if (chr > 32) {
                hash = ((hash << 5) - hash) + chr;
                hash |= 0;
            }
        }
    }
    return hash;
}

/**
 * Generate a random color
 */
jSuites.randomColor = function(h) {
    var lum = -0.25;
    var hex = String('#' + Math.random().toString(16).slice(2, 8).toUpperCase()).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    var rgb = [], c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb.push(("00" + c).substr(c.length));
    }

    // Return hex
    if (h == true) {
        return '#' + jSuites.two(rgb[0].toString(16)) + jSuites.two(rgb[1].toString(16)) + jSuites.two(rgb[2].toString(16));
    }

    return rgb;
}

jSuites.getWindowWidth = function() {
    var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth;
    return x;
}

jSuites.getWindowHeight = function() {
    var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;
    return  y;
}

jSuites.getPosition = function(e) {
    if (e.changedTouches && e.changedTouches[0]) {
        var x = e.changedTouches[0].pageX;
        var y = e.changedTouches[0].pageY;
    } else {
        var x = (window.Event) ? e.pageX : e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
        var y = (window.Event) ? e.pageY : e.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
    }

    return [ x, y ];
}

jSuites.click = function(el) {
    if (el.click) {
        el.click();
    } else {
        var evt = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
        });
        el.dispatchEvent(evt);
    }
}

jSuites.findElement = function(element, condition) {
    var foundElement = false;

    function path (element) {
        if (element && ! foundElement) {
            if (typeof(condition) == 'function') {
                foundElement = condition(element)
            } else if (typeof(condition) == 'string') {
                if (element.classList && element.classList.contains(condition)) {
                    foundElement = element;
                }
            }
        }

        if (element.parentNode && ! foundElement) {
            path(element.parentNode);
        }
    }

    path(element);

    return foundElement;
}

// Two digits
jSuites.two = function(value) {
    value = '' + value;
    if (value.length == 1) {
        value = '0' + value;
    }
    return value;
}

jSuites.sha512 = (function(str) {
    function int64(msint_32, lsint_32) {
        this.highOrder = msint_32;
        this.lowOrder = lsint_32;
    }

    var H = [new int64(0x6a09e667, 0xf3bcc908), new int64(0xbb67ae85, 0x84caa73b),
        new int64(0x3c6ef372, 0xfe94f82b), new int64(0xa54ff53a, 0x5f1d36f1),
        new int64(0x510e527f, 0xade682d1), new int64(0x9b05688c, 0x2b3e6c1f),
        new int64(0x1f83d9ab, 0xfb41bd6b), new int64(0x5be0cd19, 0x137e2179)];

    var K = [new int64(0x428a2f98, 0xd728ae22), new int64(0x71374491, 0x23ef65cd),
        new int64(0xb5c0fbcf, 0xec4d3b2f), new int64(0xe9b5dba5, 0x8189dbbc),
        new int64(0x3956c25b, 0xf348b538), new int64(0x59f111f1, 0xb605d019),
        new int64(0x923f82a4, 0xaf194f9b), new int64(0xab1c5ed5, 0xda6d8118),
        new int64(0xd807aa98, 0xa3030242), new int64(0x12835b01, 0x45706fbe),
        new int64(0x243185be, 0x4ee4b28c), new int64(0x550c7dc3, 0xd5ffb4e2),
        new int64(0x72be5d74, 0xf27b896f), new int64(0x80deb1fe, 0x3b1696b1),
        new int64(0x9bdc06a7, 0x25c71235), new int64(0xc19bf174, 0xcf692694),
        new int64(0xe49b69c1, 0x9ef14ad2), new int64(0xefbe4786, 0x384f25e3),
        new int64(0x0fc19dc6, 0x8b8cd5b5), new int64(0x240ca1cc, 0x77ac9c65),
        new int64(0x2de92c6f, 0x592b0275), new int64(0x4a7484aa, 0x6ea6e483),
        new int64(0x5cb0a9dc, 0xbd41fbd4), new int64(0x76f988da, 0x831153b5),
        new int64(0x983e5152, 0xee66dfab), new int64(0xa831c66d, 0x2db43210),
        new int64(0xb00327c8, 0x98fb213f), new int64(0xbf597fc7, 0xbeef0ee4),
        new int64(0xc6e00bf3, 0x3da88fc2), new int64(0xd5a79147, 0x930aa725),
        new int64(0x06ca6351, 0xe003826f), new int64(0x14292967, 0x0a0e6e70),
        new int64(0x27b70a85, 0x46d22ffc), new int64(0x2e1b2138, 0x5c26c926),
        new int64(0x4d2c6dfc, 0x5ac42aed), new int64(0x53380d13, 0x9d95b3df),
        new int64(0x650a7354, 0x8baf63de), new int64(0x766a0abb, 0x3c77b2a8),
        new int64(0x81c2c92e, 0x47edaee6), new int64(0x92722c85, 0x1482353b),
        new int64(0xa2bfe8a1, 0x4cf10364), new int64(0xa81a664b, 0xbc423001),
        new int64(0xc24b8b70, 0xd0f89791), new int64(0xc76c51a3, 0x0654be30),
        new int64(0xd192e819, 0xd6ef5218), new int64(0xd6990624, 0x5565a910),
        new int64(0xf40e3585, 0x5771202a), new int64(0x106aa070, 0x32bbd1b8),
        new int64(0x19a4c116, 0xb8d2d0c8), new int64(0x1e376c08, 0x5141ab53),
        new int64(0x2748774c, 0xdf8eeb99), new int64(0x34b0bcb5, 0xe19b48a8),
        new int64(0x391c0cb3, 0xc5c95a63), new int64(0x4ed8aa4a, 0xe3418acb),
        new int64(0x5b9cca4f, 0x7763e373), new int64(0x682e6ff3, 0xd6b2b8a3),
        new int64(0x748f82ee, 0x5defb2fc), new int64(0x78a5636f, 0x43172f60),
        new int64(0x84c87814, 0xa1f0ab72), new int64(0x8cc70208, 0x1a6439ec),
        new int64(0x90befffa, 0x23631e28), new int64(0xa4506ceb, 0xde82bde9),
        new int64(0xbef9a3f7, 0xb2c67915), new int64(0xc67178f2, 0xe372532b),
        new int64(0xca273ece, 0xea26619c), new int64(0xd186b8c7, 0x21c0c207),
        new int64(0xeada7dd6, 0xcde0eb1e), new int64(0xf57d4f7f, 0xee6ed178),
        new int64(0x06f067aa, 0x72176fba), new int64(0x0a637dc5, 0xa2c898a6),
        new int64(0x113f9804, 0xbef90dae), new int64(0x1b710b35, 0x131c471b),
        new int64(0x28db77f5, 0x23047d84), new int64(0x32caab7b, 0x40c72493),
        new int64(0x3c9ebe0a, 0x15c9bebc), new int64(0x431d67c4, 0x9c100d4c),
        new int64(0x4cc5d4be, 0xcb3e42b6), new int64(0x597f299c, 0xfc657e2a),
        new int64(0x5fcb6fab, 0x3ad6faec), new int64(0x6c44198c, 0x4a475817)];

    var W = new Array(64);
    var a, b, c, d, e, f, g, h, i, j;
    var T1, T2;
    var charsize = 8;

    function utf8_encode(str) {
        return unescape(encodeURIComponent(str));
    }

    function str2binb(str) {
        var bin = [];
        var mask = (1 << charsize) - 1;
        var len = str.length * charsize;
    
        for (var i = 0; i < len; i += charsize) {
            bin[i >> 5] |= (str.charCodeAt(i / charsize) & mask) << (32 - charsize - (i % 32));
        }
    
        return bin;
    }

    function binb2hex(binarray) {
        var hex_tab = "0123456789abcdef";
        var str = "";
        var length = binarray.length * 4;
        var srcByte;

        for (var i = 0; i < length; i += 1) {
            srcByte = binarray[i >> 2] >> ((3 - (i % 4)) * 8);
            str += hex_tab.charAt((srcByte >> 4) & 0xF) + hex_tab.charAt(srcByte & 0xF);
        }

        return str;
    }

    function safe_add_2(x, y) {
        var lsw, msw, lowOrder, highOrder;

        lsw = (x.lowOrder & 0xFFFF) + (y.lowOrder & 0xFFFF);
        msw = (x.lowOrder >>> 16) + (y.lowOrder >>> 16) + (lsw >>> 16);
        lowOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

        lsw = (x.highOrder & 0xFFFF) + (y.highOrder & 0xFFFF) + (msw >>> 16);
        msw = (x.highOrder >>> 16) + (y.highOrder >>> 16) + (lsw >>> 16);
        highOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

        return new int64(highOrder, lowOrder);
    }

    function safe_add_4(a, b, c, d) {
        var lsw, msw, lowOrder, highOrder;

        lsw = (a.lowOrder & 0xFFFF) + (b.lowOrder & 0xFFFF) + (c.lowOrder & 0xFFFF) + (d.lowOrder & 0xFFFF);
        msw = (a.lowOrder >>> 16) + (b.lowOrder >>> 16) + (c.lowOrder >>> 16) + (d.lowOrder >>> 16) + (lsw >>> 16);
        lowOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

        lsw = (a.highOrder & 0xFFFF) + (b.highOrder & 0xFFFF) + (c.highOrder & 0xFFFF) + (d.highOrder & 0xFFFF) + (msw >>> 16);
        msw = (a.highOrder >>> 16) + (b.highOrder >>> 16) + (c.highOrder >>> 16) + (d.highOrder >>> 16) + (lsw >>> 16);
        highOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

        return new int64(highOrder, lowOrder);
    }

    function safe_add_5(a, b, c, d, e) {
        var lsw, msw, lowOrder, highOrder;

        lsw = (a.lowOrder & 0xFFFF) + (b.lowOrder & 0xFFFF) + (c.lowOrder & 0xFFFF) + (d.lowOrder & 0xFFFF) + (e.lowOrder & 0xFFFF);
        msw = (a.lowOrder >>> 16) + (b.lowOrder >>> 16) + (c.lowOrder >>> 16) + (d.lowOrder >>> 16) + (e.lowOrder >>> 16) + (lsw >>> 16);
        lowOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

        lsw = (a.highOrder & 0xFFFF) + (b.highOrder & 0xFFFF) + (c.highOrder & 0xFFFF) + (d.highOrder & 0xFFFF) + (e.highOrder & 0xFFFF) + (msw >>> 16);
        msw = (a.highOrder >>> 16) + (b.highOrder >>> 16) + (c.highOrder >>> 16) + (d.highOrder >>> 16) + (e.highOrder >>> 16) + (lsw >>> 16);
        highOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

        return new int64(highOrder, lowOrder);
    }

    function maj(x, y, z) {
        return new int64(
            (x.highOrder & y.highOrder) ^ (x.highOrder & z.highOrder) ^ (y.highOrder & z.highOrder),
            (x.lowOrder & y.lowOrder) ^ (x.lowOrder & z.lowOrder) ^ (y.lowOrder & z.lowOrder)
        );
    }

    function ch(x, y, z) {
        return new int64(
            (x.highOrder & y.highOrder) ^ (~x.highOrder & z.highOrder),
            (x.lowOrder & y.lowOrder) ^ (~x.lowOrder & z.lowOrder)
        );
    }

    function rotr(x, n) {
        if (n <= 32) {
            return new int64(
             (x.highOrder >>> n) | (x.lowOrder << (32 - n)),
             (x.lowOrder >>> n) | (x.highOrder << (32 - n))
            );
        } else {
            return new int64(
             (x.lowOrder >>> n) | (x.highOrder << (32 - n)),
             (x.highOrder >>> n) | (x.lowOrder << (32 - n))
            );
        }
    }

    function sigma0(x) {
        var rotr28 = rotr(x, 28);
        var rotr34 = rotr(x, 34);
        var rotr39 = rotr(x, 39);

        return new int64(
            rotr28.highOrder ^ rotr34.highOrder ^ rotr39.highOrder,
            rotr28.lowOrder ^ rotr34.lowOrder ^ rotr39.lowOrder
        );
    }

    function sigma1(x) {
        var rotr14 = rotr(x, 14);
        var rotr18 = rotr(x, 18);
        var rotr41 = rotr(x, 41);

        return new int64(
            rotr14.highOrder ^ rotr18.highOrder ^ rotr41.highOrder,
            rotr14.lowOrder ^ rotr18.lowOrder ^ rotr41.lowOrder
        );
    }

    function gamma0(x) {
        var rotr1 = rotr(x, 1), rotr8 = rotr(x, 8), shr7 = shr(x, 7);

        return new int64(
            rotr1.highOrder ^ rotr8.highOrder ^ shr7.highOrder,
            rotr1.lowOrder ^ rotr8.lowOrder ^ shr7.lowOrder
        );
    }

    function gamma1(x) {
        var rotr19 = rotr(x, 19);
        var rotr61 = rotr(x, 61);
        var shr6 = shr(x, 6);

        return new int64(
            rotr19.highOrder ^ rotr61.highOrder ^ shr6.highOrder,
            rotr19.lowOrder ^ rotr61.lowOrder ^ shr6.lowOrder
        );
    }

    function shr(x, n) {
        if (n <= 32) {
            return new int64(
                x.highOrder >>> n,
                x.lowOrder >>> n | (x.highOrder << (32 - n))
            );
        } else {
            return new int64(
                0,
                x.highOrder << (32 - n)
            );
        }
    }

    var str = utf8_encode(str);
    var strlen = str.length*charsize;
    str = str2binb(str);

    str[strlen >> 5] |= 0x80 << (24 - strlen % 32);
    str[(((strlen + 128) >> 10) << 5) + 31] = strlen;

    for (var i = 0; i < str.length; i += 32) {
        a = H[0];
        b = H[1];
        c = H[2];
        d = H[3];
        e = H[4];
        f = H[5];
        g = H[6];
        h = H[7];

        for (var j = 0; j < 80; j++) {
            if (j < 16) {
                W[j] = new int64(str[j*2 + i], str[j*2 + i + 1]);
            } else {
                W[j] = safe_add_4(gamma1(W[j - 2]), W[j - 7], gamma0(W[j - 15]), W[j - 16]);
            }

            T1 = safe_add_5(h, sigma1(e), ch(e, f, g), K[j], W[j]);
            T2 = safe_add_2(sigma0(a), maj(a, b, c));
            h = g;
            g = f;
            f = e;
            e = safe_add_2(d, T1);
            d = c;
            c = b;
            b = a;
            a = safe_add_2(T1, T2);
        }

        H[0] = safe_add_2(a, H[0]);
        H[1] = safe_add_2(b, H[1]);
        H[2] = safe_add_2(c, H[2]);
        H[3] = safe_add_2(d, H[3]);
        H[4] = safe_add_2(e, H[4]);
        H[5] = safe_add_2(f, H[5]);
        H[6] = safe_add_2(g, H[6]);
        H[7] = safe_add_2(h, H[7]);
    }

    var binarray = [];
    for (var i = 0; i < H.length; i++) {
        binarray.push(H[i].highOrder);
        binarray.push(H[i].lowOrder);
    }

    return binb2hex(binarray);
});

if (! jSuites.login) {
    jSuites.login = {};
    jSuites.login.sha512 = jSuites.sha512;
}

jSuites.image = (function(el, options) {
    var obj = {};
    obj.options = {};

    // Default configuration
    var defaults = {
        input: false,
        minWidth: false,
        maxWidth: null,
        maxHeight: null,
        maxJpegSizeBytes: null, // For example, 350Kb would be 350000
        onchange: null,
        singleFile: true,
        remoteParser: null,
        text:{
            extensionNotAllowed:'The extension is not allowed',
            imageTooSmall:'The resolution is too low, try a image with a better resolution. width > 800px',
        }
    };

    // Loop through our object
    for (var property in defaults) {
        if (options && options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    // Upload icon
    el.classList.add('jupload');

    if (obj.options.input == true) {
        el.classList.add('input');
    }

    // Add image
    obj.addImage = function(file) {
        return jSuites.image.create(file);
    }

    // Add image
    obj.addImages = function(files) {
        if (obj.options.singleFile == true) {
            el.innerHTML = '';
        }

        for (var i = 0; i < files.length; i++) {
            el.appendChild(obj.addImage(files[i]));
        }
    }

    obj.addFromFile = function(file) {
        var type = file.type.split('/');
        if (type[0] == 'image') {
            if (obj.options.singleFile == true) {
                el.innerHTML = '';
            }

            var imageFile = new FileReader();
            imageFile.addEventListener("load", function (v) {

                var img = new Image();

                img.onload = function onload() {
                    var canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;

                    var ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                    var data = {
                        file: obj.getDataURL(canvas, file.type),
                        extension: file.name.substr(file.name.lastIndexOf('.') + 1),
                        name: file.name,
                        size: file.size,
                        lastmodified: file.lastModified,
                    }

                    // Content
                    if (this.src.substr(0,5) == 'data:') {
                        var content = this.src.split(',');
                        data.content = content[1];
                    }

                    // Add image
                    var newImage = obj.addImage(data);
                    el.appendChild(newImage);

                    // Onchange
                    if (typeof(obj.options.onchange) == 'function') {
                        obj.options.onchange(newImage, data);
                    }
                };

                img.src = v.srcElement.result;
            });

            imageFile.readAsDataURL(file);
        } else {
            alert(text.extentionNotAllowed);
        }
    }

    obj.addFromUrl = function(src) {
        if (src.substr(0,4) != 'data' && ! obj.options.remoteParser) {
            console.error('remoteParser not defined in your initialization');
        } else {
            // This is to process cross domain images
            if (src.substr(0,4) == 'data') {
                var extension = src.split(';')
                extension = extension[0].split('/');
                extension = extension[1];
            } else {
                var extension = src.substr(src.lastIndexOf('.') + 1);
                // Work for cross browsers
                src = obj.options.remoteParser + src;
            }

            var img = new Image();

            img.onload = function onload() {
                var canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;

                var ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                canvas.toBlob(function(blob) {
                    var data = {
                        file: window.URL.createObjectURL(blob),
                        extension: extension
                    }

                    // Content to be uploaded
                    data.content = canvas.toDataURL();
                    data.content = data.content.split(',');
                    data.content = data.content[1];

                    // Add image
                    var newImage = obj.addImage(data);
                    el.appendChild(newImage);

                    // Onchange
                    if (typeof(obj.options.onchange) == 'function') {
                        obj.options.onchange(newImage, data);
                    }
                });
            };

            img.src = src;
        }
    }

    obj.getCanvas = function(img) {
        var canvas = document.createElement('canvas');
        var r1 = (obj.options.maxWidth  || img.width ) / img.width;
        var r2 = (obj.options.maxHeight || img.height) / img.height;
        var r = Math.min(r1, r2, 1);
        canvas.width = img.width * r;
        canvas.height = img.height * r;
        return canvas;
    }

    obj.getDataURL = function(canvas, type) {
        var compression = 0.92;
        var lastContentLength = null;
        var content = canvas.toDataURL(type, compression);
        while (obj.options.maxJpegSizeBytes && type === 'image/jpeg' &&
               content.length > obj.options.maxJpegSizeBytes && content.length !== lastContentLength) {
            // Apply the compression
            compression *= 0.9;
            lastContentLength = content.length;
            content = canvas.toDataURL(type, compression);
        }
        return content;
    }

    var attachmentInput = document.createElement('input');
    attachmentInput.type = 'file';
    attachmentInput.setAttribute('accept', 'image/*');
    attachmentInput.onchange = function() {
        for (var i = 0; i < this.files.length; i++) {
            obj.addFromFile(this.files[i]);
        }
    }

    el.addEventListener("click", function(e) {
        jSuites.click(attachmentInput);
    });

    el.addEventListener('dragenter', function(e) {
        el.style.border = '1px dashed #000';
    });

    el.addEventListener('dragleave', function(e) {
        el.style.border = '1px solid #eee';
    });

    el.addEventListener('dragstop', function(e) {
        el.style.border = '1px solid #eee';
    });

    el.addEventListener('dragover', function(e) {
        e.preventDefault();
    });

    el.addEventListener('drop', function(e) {
        e.preventDefault();  
        e.stopPropagation();


        var html = (e.originalEvent || e).dataTransfer.getData('text/html');
        var file = (e.originalEvent || e).dataTransfer.files;

        if (file.length) {
            for (var i = 0; i < e.dataTransfer.files.length; i++) {
                obj.addFromFile(e.dataTransfer.files[i]);
            }
        } else if (html) {
            if (obj.options.singleFile == true) {
                el.innerHTML = '';
            }

            // Create temp element
            var div = document.createElement('div');
            div.innerHTML = html;

            // Extract images
            var img = div.querySelectorAll('img');

            if (img.length) {
                for (var i = 0; i < img.length; i++) {
                    obj.addFromUrl(img[i].src);
                }
            }
        }

        el.style.border = '1px solid #eee';

        return false;
    });

    el.image = obj;

    return obj;
});

jSuites.image.create = function(file) {
    if (! file.date) {
        file.date = '';
    }
    var img = document.createElement('img');
    img.setAttribute('data-date', file.lastmodified ? file.lastmodified : file.date);
    img.setAttribute('data-name', file.name);
    img.setAttribute('data-size', file.size);
    img.setAttribute('data-small', file.small ? file.small : '');
    img.setAttribute('data-cover', file.cover ? 1 : 0);
    img.setAttribute('data-extension', file.extension);
    img.setAttribute('src', file.file);
    img.className = 'jfile';
    img.style.width = '100%';

    if (file.content) {
        img.content = file.content;
    }

    return img;
}

jSuites.lazyLoading = (function(el, options) {
    var obj = {}

    // Mandatory options
    if (! options.loadUp || typeof(options.loadUp) != 'function') {
        options.loadUp = function() {
            return false;
        }
    }
    if (! options.loadDown || typeof(options.loadDown) != 'function') {
        options.loadDown = function() {
            return false;
        }
    }
    // Timer ms
    if (! options.timer) {
        options.timer = 100;
    }

    // Timer
    var timeControlLoading = null;

    // Controls
    var scrollControls = function(e) {
        if (timeControlLoading == null) {
            var scrollTop = el.scrollTop;
            if (el.scrollTop + (el.clientHeight * 2) >= el.scrollHeight) {
                if (options.loadDown()) {
                    if (scrollTop == el.scrollTop) {
                        el.scrollTop = el.scrollTop - (el.clientHeight);
                    }
                }
            } else if (el.scrollTop <= el.clientHeight) {
                if (options.loadUp()) {
                    if (scrollTop == el.scrollTop) {
                        el.scrollTop = el.scrollTop + (el.clientHeight);
                    }
                }
            }

            timeControlLoading = setTimeout(function() {
                timeControlLoading = null;
            }, options.timer);
        }
    }

    // Onscroll
    el.onscroll = function(e) {
        scrollControls(e);
    }

    el.onwheel = function(e) {
        scrollControls(e);
    }

    return obj;
});

jSuites.loading = (function() {
    var obj = {};

    var loading = null;

    obj.show = function() {
        if (! loading) {
            loading = document.createElement('div');
            loading.className = 'jloading';
        }
        document.body.appendChild(loading);
    }

    obj.hide = function() {
        if (loading && loading.parentNode) {
            document.body.removeChild(loading);
        }
    }

    return obj;
})();

jSuites.mask = (function() {
    var obj = {};
    var index = 0;
    var values = []
    var pieces = [];

    /**
     * Apply a mask over a value considering a custom decimal representation. Default: '.'
     */
    obj.run = function(value, mask, decimal) {
        if (value.toString().length && mask.toString().length) {
            // Default decimal separator
            if (typeof(decimal) == 'undefined') {
                decimal = '.';
            }

            if (jSuites.isNumeric(value)) {
                if (typeof(value) == 'number') {
                    var number = (''+value).split('.');
                } else {
                    var number = (''+value).split(decimal);
                }
                var value = number[0];
                var valueDecimal = number[1];
            } else {
                value = '' + value;
            }

            // Helpers
            index = 0;
            values = [];
            // Create mask token
            obj.prepare(mask);
            // Current value
            var currentValue = value;
            if (currentValue) {
                // Checking current value
                for (var i = 0; i < currentValue.length; i++) {
                    if (currentValue[i] != null) {
                        obj.process(currentValue[i]);
                    }
                }
            }
            if (valueDecimal) {
                obj.process(decimal);
                var currentValue = valueDecimal;
                if (currentValue) {
                    // Checking current value
                    for (var i = 0; i < currentValue.length; i++) {
                        if (currentValue[i] != null) {
                            obj.process(currentValue[i]);
                        }
                    }
                }
            }
            // Formatted value
            return values.join('');
        } else {
            return '';
        }
    }

    obj.apply = function(e) {
        if (e.target && ! e.target.getAttribute('readonly')) {
            var mask = e.target.getAttribute('data-mask');
            if (mask && e.key && e.key.length < 2) {
                index = 0;
                values = [];
                // Create mask token
                obj.prepare(mask);
                // Current value
                var currentValue = '';
                // Process selection
                if (e.target.tagName == 'DIV') {
                    if (e.target.innerText) {
                        var s = window.getSelection();
                        if (s && s.anchorOffset != s.focusOffset) {
                            var offset = s.anchorOffset > s.focusOffset ? s.focusOffset : s.anchorOffset;
                            var currentValue = e.target.innerText.substring(0, offset);
                        } else {
                            var currentValue = e.target.innerText;
                        }
                    }
                } else {
                    if (e.target.selectionStart < e.target.selectionEnd) {
                        var currentValue = e.target.value.substring(0, e.target.selectionStart); 
                    } else {
                        var currentValue = e.target.value;
                    }
                }

                if (currentValue) {
                    // Checking current value
                    for (var i = 0; i < currentValue.length; i++) {
                        if (currentValue[i] != null) {
                            obj.process(currentValue[i]);
                        }
                    }
                }

                // Process input
                var ret = obj.process(obj.fromKeyCode(e));

                // Prevent default
                e.preventDefault();

                // New value 
                var value = values.join('');

                // Update value to the element
                if (e.target.tagName == 'DIV') {
                    if (value != e.target.innerText) {
                        e.target.innerText = value;
                        // Set focus
                        jSuites.focus(e.target);
                    }
                } else {
                    e.target.value = value;
                }

                // Completed attribute
                if (pieces.length == values.length && pieces[pieces.length-1].length == values[values.length-1].length) {
                    e.target.setAttribute('data-completed', 'true');
                } else {
                    e.target.setAttribute('data-completed', 'false');
                }
            }
        }
    }

    /**
     * Process inputs and save to values
     */
    obj.process = function(input) {
        do {
            if (pieces[index] == 'mm') {
                if (values[index] == null || values[index] == '') {
                    if (parseInt(input) > 1 && parseInt(input) < 10) {
                        values[index] = '0' + input;
                        index++;
                        return true;
                    } else if (parseInt(input) < 10) {
                        values[index] = input;
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    if (values[index] == 1 && values[index] < 2 && parseInt(input) < 3) {
                        values[index] += input;
                        index++;
                        return true;
                    } else if (values[index] == 0 && values[index] < 10) {
                        values[index] += input;
                        index++;
                        return true;
                    } else {
                        return false
                    }
                }
            } else if (pieces[index] == 'dd') {
                if (values[index] == null || values[index] == '') {
                    if (parseInt(input) > 3 && parseInt(input) < 10) {
                        values[index] = '0' + input;
                        index++;
                        return true;
                    } else if (parseInt(input) < 10) {
                        values[index] = input;
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    if (values[index] == 3 && parseInt(input) < 2) {
                        values[index] += input;
                        index++;
                        return true;
                    } else if (values[index] < 3 && parseInt(input) < 10) {
                        values[index] += input;
                        index++;
                        return true;
                    } else {
                        return false
                    }
                }
            } else if (pieces[index] == 'hh24') {
                if (values[index] == null || values[index] == '') {
                    if (parseInt(input) > 2 && parseInt(input) < 10) {
                        values[index] = '0' + input;
                        index++;
                        return true;
                    } else if (parseInt(input) < 10) {
                        values[index] = input;
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    if (values[index] == 2 && parseInt(input) < 4) {
                        values[index] += input;
                        index++;
                        return true;
                    } else if (values[index] < 2 && parseInt(input) < 10) {
                        values[index] += input;
                        index++;
                        return true;
                    } else {
                        return false
                    }
                }
            } else if (pieces[index] == 'hh') {
                if (values[index] == null || values[index] == '') {
                    if (parseInt(input) > 1 && parseInt(input) < 10) {
                        values[index] = '0' + input;
                        index++;
                        return true;
                    } else if (parseInt(input) < 10) {
                        values[index] = input;
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    if (values[index] == 1 && parseInt(input) < 3) {
                        values[index] += input;
                        index++;
                        return true;
                    } else if (values[index] < 1 && parseInt(input) < 10) {
                        values[index] += input;
                        index++;
                        return true;
                    } else {
                        return false
                    }
                }
            } else if (pieces[index] == 'mi' || pieces[index] == 'ss') {
                if (values[index] == null || values[index] == '') {
                    if (parseInt(input) > 5 && parseInt(input) < 10) {
                        values[index] = '0' + input;
                        index++;
                        return true;
                    } else if (parseInt(input) < 10) {
                        values[index] = input;
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    if (parseInt(input) < 10) {
                        values[index] += input;
                        index++;
                        return true;
                     } else {
                        return false
                    }
                }
            } else if (pieces[index] == 'yy' || pieces[index] == 'yyyy') {
                if (parseInt(input) < 10) {
                    if (values[index] == null || values[index] == '') {
                        values[index] = input;
                    } else {
                        values[index] += input;
                    }
                    
                    if (values[index].length == pieces[index].length) {
                        index++;
                    }
                    return true;
                } else {
                    return false;
                }
            } else if (pieces[index] == '#' || pieces[index] == '#.##' || pieces[index] == '#,##' || pieces[index] == '# ##' || pieces[index] == "#'##") {
                if (input.match(/[0-9]/g)) {
                    if (pieces[index] == '#.##') {
                        var separator = '.';
                    } else if (pieces[index] == '#,##') {
                        var separator = ',';
                    } else if (pieces[index] == '# ##') {
                        var separator = ' ';
                    } else if (pieces[index] == "#'##") {
                        var separator = "'";
                    } else {
                        var separator = '';
                    }
                    if (values[index] == null || values[index] == '') {
                        values[index] = input;
                    } else {
                        values[index] += input;
                        if (separator) {
                            values[index] = values[index].match(/[0-9]/g).join('');
                            var t = [];
                            var s = 0;
                            for (var j = values[index].length - 1; j >= 0 ; j--) {
                                t.push(values[index][j]);
                                s++;
                                if (! (s % 3)) {
                                    t.push(separator);
                                }
                            }
                            t = t.reverse();
                            values[index] = t.join('');
                            if (values[index].substr(0,1) == separator) {
                                values[index] = values[index].substr(1);
                            } 
                        }
                    }
                    return true;
                } else {
                    if (pieces[index] == '#.##' && input == '.') {
                        // Do nothing
                    } else if (pieces[index] == '#,##' && input == ',') {
                        // Do nothing
                    } else if (pieces[index] == '# ##' && input == ' ') {
                        // Do nothing
                    } else if (pieces[index] == "#'##" && input == "'") {
                        // Do nothing
                    } else {
                        if (values[index]) {
                            index++;
                            if (pieces[index]) {
                                if (pieces[index] == input) {
                                    values[index] = input;
                                    return true;
                                } else {
                                    if (pieces[index] == '0' && pieces[index+1] == input) {
                                        index++;
                                        values[index] = input;
                                        return true;
                                    }
                                }
                            }
                        }
                    }

                    return false;
                }
            } else if (pieces[index] == '0') {
                if (input.match(/[0-9]/g)) {
                    values[index] = input;
                    index++;
                    return true;
                } else {
                    return false;
                }
            } else if (pieces[index] == 'a') {
                if (input.match(/[a-zA-Z]/g)) {
                    values[index] = input;
                    index++;
                    return true;
                } else {
                    return false;
                }
            } else {
                if (pieces[index] != null) {
                    if (pieces[index] == '\\a') {
                        var v = 'a';
                    } else if (pieces[index] == '\\0') {
                        var v = '0';
                    } else if (pieces[index] == '[-]') {
                        if (input == '-' || input == '+') {
                            var v = input;
                        } else {
                            var v = ' ';
                        }
                    } else {
                        var v = pieces[index];
                    }
                    values[index] = v;
                    if (input == v) {
                        index++;
                        return true;
                    }
                }
            }

            index++;
        } while (pieces[index]);
    }

    /**
     * Create tokens for the mask
     */
    obj.prepare = function(mask) {
        pieces = [];
        for (var i = 0; i < mask.length; i++) {
            if (mask[i].match(/[0-9]|[a-z]|\\/g)) {
                if (mask[i] == 'y' && mask[i+1] == 'y' && mask[i+2] == 'y' && mask[i+3] == 'y') {
                    pieces.push('yyyy');
                    i += 3;
                } else if (mask[i] == 'y' && mask[i+1] == 'y') {
                    pieces.push('yy');
                    i++;
                } else if (mask[i] == 'm' && mask[i+1] == 'm' && mask[i+2] == 'm' && mask[i+3] == 'm') {
                    pieces.push('mmmm');
                    i += 3;
                } else if (mask[i] == 'm' && mask[i+1] == 'm' && mask[i+2] == 'm') {
                    pieces.push('mmm');
                    i += 2;
                } else if (mask[i] == 'm' && mask[i+1] == 'm') {
                    pieces.push('mm');
                    i++;
                } else if (mask[i] == 'd' && mask[i+1] == 'd') {
                    pieces.push('dd');
                    i++;
                } else if (mask[i] == 'h' && mask[i+1] == 'h' && mask[i+2] == '2' && mask[i+3] == '4') {
                    pieces.push('hh24');
                    i += 3;
                } else if (mask[i] == 'h' && mask[i+1] == 'h') {
                    pieces.push('hh');
                    i++;
                } else if (mask[i] == 'm' && mask[i+1] == 'i') {
                    pieces.push('mi');
                    i++;
                } else if (mask[i] == 's' && mask[i+1] == 's') {
                    pieces.push('ss');
                    i++;
                } else if (mask[i] == 'a' && mask[i+1] == 'm') {
                    pieces.push('am');
                    i++;
                } else if (mask[i] == 'p' && mask[i+1] == 'm') {
                    pieces.push('pm');
                    i++;
                } else if (mask[i] == '\\' && mask[i+1] == '0') {
                    pieces.push('\\0');
                    i++;
                } else if (mask[i] == '\\' && mask[i+1] == 'a') {
                    pieces.push('\\a');
                    i++;
                } else {
                    pieces.push(mask[i]);
                }
            } else {
                if (mask[i] == '#' && mask[i+1] == '.' && mask[i+2] == '#' && mask[i+3] == '#') {
                    pieces.push('#.##');
                    i += 3;
                } else if (mask[i] == '#' && mask[i+1] == ',' && mask[i+2] == '#' && mask[i+3] == '#') {
                    pieces.push('#,##');
                    i += 3;
                } else if (mask[i] == '#' && mask[i+1] == ' ' && mask[i+2] == '#' && mask[i+3] == '#') {
                    pieces.push('# ##');
                    i += 3;
                } else if (mask[i] == '#' && mask[i+1] == "'" && mask[i+2] == '#' && mask[i+3] == '#') {
                    pieces.push("#'##");
                    i += 3;
                } else if (mask[i] == '[' && mask[i+1] == '-' && mask[i+2] == ']') {
                    pieces.push('[-]');
                    i += 2;
                } else {
                    pieces.push(mask[i]);
                }
            }
        }
    }

    /** 
     * Thanks for the collaboration
     */
    obj.fromKeyCode = function(e) {
        var _to_ascii = {
            '188': '44',
            '109': '45',
            '190': '46',
            '191': '47',
            '192': '96',
            '220': '92',
            '222': '39',
            '221': '93',
            '219': '91',
            '173': '45',
            '187': '61', //IE Key codes
            '186': '59', //IE Key codes
            '189': '45'  //IE Key codes
        }

        var shiftUps = {
            "96": "~",
            "49": "!",
            "50": "@",
            "51": "#",
            "52": "$",
            "53": "%",
            "54": "^",
            "55": "&",
            "56": "*",
            "57": "(",
            "48": ")",
            "45": "_",
            "61": "+",
            "91": "{",
            "93": "}",
            "92": "|",
            "59": ":",
            "39": "\"",
            "44": "<",
            "46": ">",
            "47": "?"
        };

        var c = e.which;

        if (_to_ascii.hasOwnProperty(c)) {
            c = _to_ascii[c];
        }

        if (!e.shiftKey && (c >= 65 && c <= 90)) {
            c = String.fromCharCode(c + 32);
        } else if (e.shiftKey && shiftUps.hasOwnProperty(c)) {
            c = shiftUps[c];
        } else if (96 <= c && c <= 105) {
            c = String.fromCharCode(c - 48);
        } else {
            c = String.fromCharCode(c);
        }

        return c;
    }

    if (typeof document !== 'undefined') {
        document.addEventListener('keydown', obj.apply);
    }

    return obj;
})();


jSuites.notification = (function(options) {
    var obj = {};
    obj.options = {};

    // Default configuration
    var defaults = {
        icon: null,
        name: 'Notification',
        date: null,
        error: null,
        title: null,
        message: null,
        timeout: 4000,
        autoHide: true,
        closeable: true,
    };

    // Loop through our object
    for (var property in defaults) {
        if (options && options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    var notification = document.createElement('div');
    notification.className = 'jnotification';

    if (obj.options.error) {
        notification.classList.add('jnotification-error');
    }

    var notificationContainer = document.createElement('div');
    notificationContainer.className = 'jnotification-container';
    notification.appendChild(notificationContainer);

    var notificationHeader = document.createElement('div');
    notificationHeader.className = 'jnotification-header';
    notificationContainer.appendChild(notificationHeader);

    var notificationImage = document.createElement('div');
    notificationImage.className = 'jnotification-image';
    notificationHeader.appendChild(notificationImage);

    if (obj.options.icon) {
        var notificationIcon = document.createElement('img');
        notificationIcon.src = obj.options.icon;
        notificationImage.appendChild(notificationIcon);
    }

    var notificationName = document.createElement('div');
    notificationName.className = 'jnotification-name';
    notificationName.innerHTML = obj.options.name;
    notificationHeader.appendChild(notificationName);

    if (obj.options.closeable == true) {
        var notificationClose = document.createElement('div');
        notificationClose.className = 'jnotification-close';
        notificationClose.onclick = function() {
            obj.hide();
        }
        notificationHeader.appendChild(notificationClose);
    }

    var notificationDate = document.createElement('div');
    notificationDate.className = 'jnotification-date';
    notificationHeader.appendChild(notificationDate);

    var notificationContent = document.createElement('div');
    notificationContent.className = 'jnotification-content';
    notificationContainer.appendChild(notificationContent);

    if (obj.options.title) {
        var notificationTitle = document.createElement('div');
        notificationTitle.className = 'jnotification-title';
        notificationTitle.innerHTML = obj.options.title;
        notificationContent.appendChild(notificationTitle);
    }

    var notificationMessage = document.createElement('div');
    notificationMessage.className = 'jnotification-message';
    notificationMessage.innerHTML = obj.options.message;
    notificationContent.appendChild(notificationMessage);

    obj.show = function() {
        document.body.appendChild(notification);
        if (jSuites.getWindowWidth() > 800) { 
            jSuites.animation.fadeIn(notification);
        } else {
            jSuites.animation.slideTop(notification, 1);
        }
    }

    obj.hide = function() {
        if (jSuites.getWindowWidth() > 800) { 
            jSuites.animation.fadeOut(notification, function() {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                    if (notificationTimeout) {
                        clearTimeout(notificationTimeout);
                    }
                }
            });
        } else {
            jSuites.animation.slideTop(notification, 0, function() {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                    if (notificationTimeout) {
                        clearTimeout(notificationTimeout);
                    }
                }
            });
        }
    };

    obj.show();

    if (obj.options.autoHide == true) {
        var notificationTimeout = setTimeout(function() {
            obj.hide();
        }, obj.options.timeout);
    }

    if (jSuites.getWindowWidth() < 800) {
        notification.addEventListener("swipeup", function(e) {
            obj.hide();
            e.preventDefault();
            e.stopPropagation();
        });
    }

    return obj;
});

jSuites.notification.isVisible = function() {
    var j = document.querySelector('.jnotification');
    return j && j.parentNode ? true : false;
}

jSuites.picker = (function(el, options) {
    // Already created, update options
    if (el.picker) {
        return el.picker.setOptions(options, true);
    }

    // New instance
    var obj = { type: 'picker' };
    obj.options = {};

    var dropdownHeader = null;
    var dropdownContent = null;

    /**
     * Create the content options
     */
    var createContent = function() {
        dropdownContent.innerHTML = '';

        // Create items
        var keys = Object.keys(obj.options.data);

        // Go though all options
        for (var i = 0; i < keys.length; i++) {
            // Item
            var dropdownItem = document.createElement('div');
            dropdownItem.k = keys[i];
            dropdownItem.v = obj.options.data[keys[i]];
            // Label
            dropdownItem.innerHTML = obj.getLabel(keys[i]);

            // Onchange
            dropdownItem.onclick = function() {
                // Update label
                obj.setValue(this.k);

                // Call method
                if (typeof(obj.options.onchange) == 'function') {
                    obj.options.onchange.call(obj, el, obj, 'reserved', this.v, this.k);
                }
            }

            // Append
            dropdownContent.appendChild(dropdownItem);
        }
    }

    /**
     * Set or reset the options for the picker
     */
    obj.setOptions = function(options, reset) {
        // Default configuration
        var defaults = {
            value: 0,
            data: null,
            render: null,
            onchange: null,
            onselect: null,
            onopen: null,
            onclose: null,
            onload: null,
            width: null,
            header: true,
            right: false,
            content: false,
            columns: null,
        }

        // Legacy purpose only
        if (options && options.options) {
            options.data = options.options;
        }

        // Loop through the initial configuration
        for (var property in defaults) {
            if (options && options.hasOwnProperty(property)) {
                obj.options[property] = options[property];
            } else {
                if (typeof(obj.options[property]) == 'undefined' || reset === true) {
                    obj.options[property] = defaults[property];
                }
            }
        }

        // Start using the options
        if (obj.options.header === false) {
            dropdownHeader.style.display = 'none';
        } else {
            dropdownHeader.style.display = '';
        }

        // Width
        if (obj.options.width) {
            dropdownHeader.style.width = parseInt(obj.options.width) + 'px';
        } else {
            dropdownHeader.style.width = '';
        }

        if (obj.options.columns > 0) {
            dropdownContent.classList.add('jpicker-columns');
            dropdownContent.style.width =  obj.options.width ? obj.options.width : 36 * obj.options.columns + 'px';
        }

        if (isNaN(obj.options.value)) {
            obj.options.value = '0';
        }

        // Create list from data
        createContent();

        // Set value
        obj.setValue(obj.options.value);

        // Set options all returns the own instance
        return obj;
    }

    obj.getValue = function() {
        return obj.options.value;
    }

    obj.setValue = function(v) {
        // Set label
        obj.setLabel(v);

        // Update value
        obj.options.value = String(v);

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

        if (dropdownContent.children[v].getAttribute('type') !== 'generic') {
            obj.close();
        }
    }

    obj.getLabel = function(v) {
        var label = obj.options.data[v] || null;
        if (typeof(obj.options.render) == 'function') {
            label = obj.options.render(label);
        }
        return label;
    }

    obj.setLabel = function(v) {
        if (obj.options.content) {
            var label = '<i class="material-icons">' + obj.options.content + '</i>';
        } else {
            var label = obj.getLabel(v);
        }

        dropdownHeader.innerHTML = label;
    }

    obj.open = function() {
        if (! el.classList.contains('jpicker-focus')) {
            // Start tracking the element
            jSuites.tracking(obj, true);

            // Open picker
            el.classList.add('jpicker-focus');
            el.focus();

            var rectHeader = dropdownHeader.getBoundingClientRect();
            var rectContent = dropdownContent.getBoundingClientRect();
            if (window.innerHeight < rectHeader.bottom + rectContent.height) {
                dropdownContent.style.marginTop = -1 * (rectContent.height + 4) + 'px';
            } else {
                dropdownContent.style.marginTop = rectHeader.height + 2 + 'px';
            }

            if (obj.options.right === true) {
                dropdownContent.style.marginLeft = -1 * rectContent.width + 24 + 'px';
            }

            if (typeof obj.options.onopen == 'function') {
                obj.options.onopen(el, obj);
            }
        }
    }

    obj.close = function() {
        if (el.classList.contains('jpicker-focus')) {
            el.classList.remove('jpicker-focus');

            // Start tracking the element
            jSuites.tracking(obj, false);

            if (typeof obj.options.onclose == 'function') {
                obj.options.onclose(el, obj);
            }
        }
    }

    /**
     * Create floating picker
     */
    var init = function() {
        // Class
        el.classList.add('jpicker');
        el.setAttribute('tabindex', '900');

        // Dropdown Header
        dropdownHeader = document.createElement('div');
        dropdownHeader.classList.add('jpicker-header');
        dropdownHeader.onmouseup = function(e) {
            if (! el.classList.contains('jpicker-focus')) {
                obj.open();
            } else {
                obj.close();
            }
        }

        // Dropdown content
        dropdownContent = document.createElement('div');
        dropdownContent.classList.add('jpicker-content');

        // Append content and header
        el.appendChild(dropdownHeader);
        el.appendChild(dropdownContent);

        // Default value
        el.value = options.value || 0;

        // Set options
        obj.setOptions(options);

        if (typeof(obj.options.onload) == 'function') {
            obj.options.onload(el, obj);
        }

        // Change
        el.change = obj.setValue;

        // Reference
        el.picker = obj;
    }

    init();

    return obj;
});

jSuites.rating = (function(el, options) {
    // Already created, update options
    if (el.rating) {
        return el.rating.setOptions(options, true);
    }

    // New instance
    var obj = {};
    obj.options = {};

    obj.setOptions = function(options, reset) {
        // Default configuration
        var defaults = {
            number: 5,
            value: 0,
            tooltip: [ 'Very bad', 'Bad', 'Average', 'Good', 'Very good' ],
            onchange: null,
        };

        // Loop through the initial configuration
        for (var property in defaults) {
            if (options && options.hasOwnProperty(property)) {
                obj.options[property] = options[property];
            } else {
                if (typeof(obj.options[property]) == 'undefined' || reset === true) {
                    obj.options[property] = defaults[property];
                }
            }
        }

        // Make sure the container is empty
        el.innerHTML = '';

        // Add elements
        for (var i = 0; i < obj.options.number; i++) {
            var div = document.createElement('div');
            div.setAttribute('data-index', (i + 1))
            div.setAttribute('title', obj.options.tooltip[i])
            el.appendChild(div);
        }

        // Selected option
        if (obj.options.value) {
            for (var i = 0; i < obj.options.number; i++) {
                if (i < obj.options.value) {
                    el.children[i].classList.add('jrating-selected');
                }
            }
        }

        return obj;
    }

    // Set value
    obj.setValue = function(index) {
        for (var i = 0; i < obj.options.number; i++) {
            if (i < index) {
                el.children[i].classList.add('jrating-selected');
            } else {
                el.children[i].classList.remove('jrating-over');
                el.children[i].classList.remove('jrating-selected');
            }
        }

        obj.options.value = index;

        if (typeof(obj.options.onchange) == 'function') {
            obj.options.onchange(el, index);
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

    obj.getValue = function() {
        return obj.options.value;
    }

    var init = function() {
        // Start plugin
        obj.setOptions(options);

        // Class
        el.classList.add('jrating');

        // Events
        el.addEventListener("click", function(e) {
            var index = e.target.getAttribute('data-index');
            if (index != undefined) {
                if (index == obj.options.value) {
                    obj.setValue(0);
                } else {
                    obj.setValue(index);
                }
            }
        });

        el.addEventListener("mouseover", function(e) {
            var index = e.target.getAttribute('data-index');
            for (var i = 0; i < obj.options.number; i++) {
                if (i < index) {
                    el.children[i].classList.add('jrating-over');
                } else {
                    el.children[i].classList.remove('jrating-over');
                }
            }
        });

        el.addEventListener("mouseout", function(e) {
            for (var i = 0; i < obj.options.number; i++) {
                el.children[i].classList.remove('jrating-over');
            }
        });

        // Change
        el.change = obj.setValue;

        // Reference
        el.rating = obj;
    }

    init();

    return obj;
});


jSuites.sorting = (function(el, options) {
    var obj = {};
    obj.options = {};

    var defaults = {
        pointer: null,
        direction: null,
        ondragstart: null,
        ondragend: null,
        ondrop: null,
    }

    var dragElement = null;

    // Loop through the initial configuration
    for (var property in defaults) {
        if (options && options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    el.classList.add('jsorting');

    el.addEventListener('dragstart', function(e) {
        var position = Array.prototype.indexOf.call(e.target.parentNode.children, e.target);
        dragElement = {
            element: e.target,
            o: position,
            d: position
        }
        e.target.style.opacity = '0.25';

        if (typeof(obj.options.ondragstart) == 'function') {
            obj.options.ondragstart(el, e.target, e);
        }
    });

    el.addEventListener('dragover', function(e) {
        e.preventDefault();

        if (getElement(e.target) && dragElement) {
            if (e.target.getAttribute('draggable') == 'true' && dragElement.element != e.target) {
                if (! obj.options.direction) {
                    var condition = e.target.clientHeight / 2 > e.offsetY;
                } else {
                    var condition = e.target.clientWidth / 2 > e.offsetX;
                }

                if (condition) {
                    e.target.parentNode.insertBefore(dragElement.element, e.target);
                } else {
                    e.target.parentNode.insertBefore(dragElement.element, e.target.nextSibling);
                }

                dragElement.d = Array.prototype.indexOf.call(e.target.parentNode.children, dragElement.element);
            }
        }
    });

    el.addEventListener('dragleave', function(e) {
        e.preventDefault();
    });

    el.addEventListener('dragend', function(e) {
        e.preventDefault();

        if (dragElement) {
            if (typeof(obj.options.ondragend) == 'function') {
                obj.options.ondragend(el, dragElement.element, e);
            }

            // Cancelled put element to the original position
            if (dragElement.o < dragElement.d) {
                e.target.parentNode.insertBefore(dragElement.element, e.target.parentNode.children[dragElement.o]);
            } else {
                e.target.parentNode.insertBefore(dragElement.element, e.target.parentNode.children[dragElement.o].nextSibling);
            }

            dragElement.element.style.opacity = '';
            dragElement = null;
        }
    });

    el.addEventListener('drop', function(e) {
        e.preventDefault();

        if (dragElement && (dragElement.o != dragElement.d)) {
            if (typeof(obj.options.ondrop) == 'function') {
                obj.options.ondrop(el, dragElement.o, dragElement.d, dragElement.element, e.target, e);
            }
        }

        dragElement.element.style.opacity = '';
        dragElement = null;
    });

    var getElement = function(element) {
        var sorting = false;

        function path (element) {
            if (element.className) {
                if (element.classList.contains('jsorting')) {
                    sorting = true;
                }
            }

            if (! sorting) {
                path(element.parentNode);
            }
        }

        path(element);

        return sorting;
    }

    for (var i = 0; i < el.children.length; i++) {
        if (! el.children[i].hasAttribute('draggable')) {
            el.children[i].setAttribute('draggable', 'true');
        }
    }

    return el;
});

jSuites.tabs = (function(el, options) {
    var obj = {};
    obj.options = {};

    // Default configuration
    var defaults = {
        data: [],
        position: null,
        allowCreate: false,
        allowChangePosition: false,
        onclick: null,
        onload: null,
        onchange: null,
        oncreate: null,
        ondelete: null,
        onbeforecreate: null,
        onchangeposition: null,
        animation: false,
        hideHeaders: false,
        padding: null,
        palette: null,
    }

    // Loop through the initial configuration
    for (var property in defaults) {
        if (options && options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    // Class
    el.classList.add('jtabs');

    var prev = null;
    var next = null;
    var border = null;

    // Helpers
    var setBorder = function(index) {
        var rect = obj.headers.children[index].getBoundingClientRect();

        if (obj.options.palette == 'modern') {
            border.style.width = rect.width - 4 + 'px';
            border.style.left = obj.headers.children[index].offsetLeft + 2 + 'px';
        } else {
            border.style.width = rect.width + 'px';
            border.style.left = obj.headers.children[index].offsetLeft + 'px';
        }

        border.style.bottom = '0px';
    }

    var updateControls = function(x) {
        if (typeof(obj.headers.scrollTo) == 'function') {
            obj.headers.scrollTo({
                left: x,
                behavior: 'smooth',
            });
        } else {
            obj.headers.scrollLeft = x;
        }

        if (x <= 1) {
            prev.classList.add('disabled');
        } else {
            prev.classList.remove('disabled');
        }

        if (x >= obj.headers.scrollWidth - obj.headers.offsetWidth) {
            next.classList.add('disabled');
        } else {
            next.classList.remove('disabled');
        }

        if (obj.headers.scrollWidth <= obj.headers.offsetWidth) {
            prev.style.display = 'none';
            next.style.display = 'none';
        } else {
            prev.style.display = '';
            next.style.display = '';
        }
    }

    // Set value
    obj.open = function(index) {
        var previous = null;
        for (var i = 0; i < obj.headers.children.length; i++) {
            if (obj.headers.children[i].classList.contains('jtabs-selected')) {
                // Current one
                previous = i;
            }
            // Remote selected
            obj.headers.children[i].classList.remove('jtabs-selected');
            if (obj.content.children[i]) {
                obj.content.children[i].classList.remove('jtabs-selected');
            }
        }

        obj.headers.children[index].classList.add('jtabs-selected');
        if (obj.content.children[index]) {
            obj.content.children[index].classList.add('jtabs-selected');
        }

        if (previous != index && typeof(obj.options.onchange) == 'function') {
            if (obj.content.children[index]) {
                obj.options.onchange(el, obj, index, obj.headers.children[index], obj.content.children[index]);
            }
        }

        // Hide
        if (obj.options.hideHeaders == true && (obj.headers.children.length < 3 && obj.options.allowCreate == false)) {
            obj.headers.parentNode.style.display = 'none';
        } else {
            // Set border
            if (obj.options.animation == true) {
                setBorder(index);
            }

            obj.headers.parentNode.style.display = '';

            var x1 = obj.headers.children[index].offsetLeft;
            var x2 = x1 + obj.headers.children[index].offsetWidth;
            var r1 = obj.headers.scrollLeft;
            var r2 = r1 + obj.headers.offsetWidth;

            if (! (r1 <= x1 && r2 >= x2)) {
                // Out of the viewport
                updateControls(x1 - 1);
            }
        }
    }

    obj.selectIndex = function(a) {
        var index = Array.prototype.indexOf.call(obj.headers.children, a);
        if (index >= 0) {
            obj.open(index);
        }

        return index;
    }

    obj.rename = function(i, title) {
        if (! title) {
            title = prompt('New title', obj.headers.children[i].innerText);
        }
        obj.headers.children[i].innerText = title;
        obj.open(i);
    }

    obj.create = function(title, url) {
        if (typeof(obj.options.onbeforecreate) == 'function') {
            var ret = obj.options.onbeforecreate(el);
            if (ret === false) {
                return false;
            } else {
                title = ret;
            }
        }

        var div = obj.appendElement(title);

        if (typeof(obj.options.oncreate) == 'function') {
            obj.options.oncreate(el, div)
        }

        return div;
    }

    obj.remove = function(index) {
        return obj.deleteElement(index);
    }

    obj.nextNumber = function() {
        var num = 0;
        for (var i = 0; i < obj.headers.children.length; i++) {
            var tmp = obj.headers.children[i].innerText.match(/[0-9].*/);
            if (tmp > num) {
                num = parseInt(tmp);
            }
        }
        if (! num) {
            num = 1;
        } else {
            num++;
        }

        return num;
    }

    obj.deleteElement = function(index) {
        if (! obj.headers.children[index]) {
            return false;
        } else {
            obj.headers.removeChild(obj.headers.children[index]);
            obj.content.removeChild(obj.content.children[index]);
        }

        obj.open(0);

        if (typeof(obj.options.ondelete) == 'function') {
            obj.options.ondelete(el, index)
        }
    }

    obj.appendElement = function(title) {
        if (! title) {
            var title = prompt('Title?', '');
        }

        if (title) {
            // Add content
            var div = document.createElement('div');
            obj.content.appendChild(div);

            // Add headers
            var h = document.createElement('div');
            h.innerHTML = title;
            h.content = div;
            obj.headers.insertBefore(h, obj.headers.lastChild);

            // Sortable
            if (obj.options.allowChangePosition) {
                h.setAttribute('draggable', 'true');
            }
            // Open new tab
            obj.selectIndex(h);

            // Return element
            return div;
        }
    }

    obj.getActive = function() {
        for (var i = 0; i < obj.headers.children.length; i++) {
            if (obj.headers.children[i].classList.contains('jtabs-selected')) {
                return i
            }
        }
        return 0;
    }

    obj.updateContent = function(position, newContent) {
        if (typeof newContent !== 'string') {
            var contentItem = newContent;
        } else {
            var contentItem = document.createElement('div');
            contentItem.innerHTML = newContent;
        }

        if (obj.content.children[position].classList.contains('jtabs-selected')) {
            newContent.classList.add('jtabs-selected');
        }

        obj.content.replaceChild(newContent, obj.content.children[position]);
    }

    obj.updatePosition = function(f, t) {
        // Ondrop update position of content
        if (f > t) {
            obj.content.insertBefore(obj.content.children[f], obj.content.children[t]);
        } else {
            obj.content.insertBefore(obj.content.children[f], obj.content.children[t].nextSibling);
        }

        // Open destination tab
        obj.open(t);

        // Call event
        if (typeof(obj.options.onchangeposition) == 'function') {
            obj.options.onchangeposition(obj.headers, f, t);
        }
    }

    obj.move = function(f, t) {
        if (f > t) {
            obj.headers.insertBefore(obj.headers.children[f], obj.headers.children[t]);
        } else {
            obj.headers.insertBefore(obj.headers.children[f], obj.headers.children[t].nextSibling);
        }

        obj.updatePosition(f, t);
    }

    obj.setBorder = setBorder;

    obj.init = function() {
        el.innerHTML = '';

        // Make sure the component is blank
        obj.headers = document.createElement('div');
        obj.content = document.createElement('div');
        obj.headers.classList.add('jtabs-headers');
        obj.content.classList.add('jtabs-content');

        if (obj.options.palette) {
            el.classList.add('jtabs-modern');
        } else {
            el.classList.remove('jtabs-modern');
        }

        // Padding
        if (obj.options.padding) {
            obj.content.style.padding = parseInt(obj.options.padding) + 'px';
        }

        // Header
        var header = document.createElement('div');
        header.className = 'jtabs-headers-container';
        header.appendChild(obj.headers);

        // Controls
        var controls = document.createElement('div');
        controls.className = 'jtabs-controls';
        controls.setAttribute('draggable', 'false');
        header.appendChild(controls);

        // Append DOM elements
        if (obj.options.position == 'bottom') {
            el.appendChild(obj.content);
            el.appendChild(header);
        } else {
            el.appendChild(header);
            el.appendChild(obj.content);
        }

        // New button
        if (obj.options.allowCreate == true) {
            var add = document.createElement('div');
            add.className = 'jtabs-add';
            add.onclick = function() {
                obj.create();
            }
            controls.appendChild(add);
        }

        prev = document.createElement('div');
        prev.className = 'jtabs-prev';
        prev.onclick = function() {
            updateControls(obj.headers.scrollLeft - obj.headers.offsetWidth);
        }
        controls.appendChild(prev);

        next = document.createElement('div');
        next.className = 'jtabs-next';
        next.onclick = function() {
            updateControls(obj.headers.scrollLeft + obj.headers.offsetWidth);
        }
        controls.appendChild(next);

        // Data
        for (var i = 0; i < obj.options.data.length; i++) {
            // Title
            if (obj.options.data[i].titleElement) {
                var headerItem = obj.options.data[i].titleElement;
            } else {
                var headerItem = document.createElement('div');
            }
            // Icon
            if (obj.options.data[i].icon) {
                var iconContainer = document.createElement('div');
                var icon = document.createElement('i');
                icon.classList.add('material-icons');
                icon.innerHTML = obj.options.data[i].icon;
                iconContainer.appendChild(icon);
                headerItem.appendChild(iconContainer);
            }
            // Title
            if (obj.options.data[i].title) {
                var title = document.createTextNode(obj.options.data[i].title);
                headerItem.appendChild(title);
            }
            // Width
            if (obj.options.data[i].width) {
                headerItem.style.width = obj.options.data[i].width;
            }
            // Content
            if (obj.options.data[i].contentElement) {
                var contentItem = obj.options.data[i].contentElement;
            } else {
                var contentItem = document.createElement('div');
                contentItem.innerHTML = obj.options.data[i].content;
            }
            obj.headers.appendChild(headerItem);
            obj.content.appendChild(contentItem);
        }

        // Animation
        border = document.createElement('div');
        border.className = 'jtabs-border';
        obj.headers.appendChild(border);

        if (obj.options.animation) {
            el.classList.add('jtabs-animation');
        }

        // Events
        obj.headers.addEventListener("click", function(e) {
            if (e.target.parentNode.classList.contains('jtabs-headers')) {
                var target = e.target;
            } else {
                if (e.target.tagName == 'I') {
                    var target = e.target.parentNode.parentNode;
                } else {
                    var target = e.target.parentNode;
                }
            }

            var index = obj.selectIndex(target);

            if (typeof(obj.options.onclick) == 'function') {
                obj.options.onclick(el, obj, index, obj.headers.children[index], obj.content.children[index]);
            }
        });

        obj.headers.addEventListener("contextmenu", function(e) {
            obj.selectIndex(e.target);
        });

        if (obj.headers.children.length) {
            // Open first tab
            obj.open(0);
        }

        // Update controls
        updateControls(0);

        if (obj.options.allowChangePosition == true) {
            jSuites.sorting(obj.headers, {
                direction: 1,
                ondrop: function(a,b,c) {
                    obj.updatePosition(b,c);
                },
            });
        }

        if (typeof(obj.options.onload) == 'function') {
            obj.options.onload(el, obj);
        }
    }

    // Loading existing nodes as the data
    if (el.children[0] && el.children[0].children.length) {
        // Create from existing elements
        for (var i = 0; i < el.children[0].children.length; i++) {
            var item = obj.options.data && obj.options.data[i] ? obj.options.data[i] : {};

            if (el.children[1] && el.children[1].children[i]) {
                item.titleElement = el.children[0].children[i];
                item.contentElement = el.children[1].children[i];
            } else {
                item.contentElement = el.children[0].children[i];
            }

            obj.options.data[i] = item;
        }
    }

    // Remote controller flag
    var loadingRemoteData = false;

    // Create from data
    if (obj.options.data) {
        // Append children
        for (var i = 0; i < obj.options.data.length; i++) {
            if (obj.options.data[i].url) {
                jSuites.ajax({
                    url: obj.options.data[i].url,
                    type: 'GET',
                    dataType: 'text/html',
                    index: i,
                    success: function(result) {
                        obj.options.data[this.index].content = result;
                    },
                    complete: function() {
                        obj.init();
                    }
                });

                // Flag loading
                loadingRemoteData = true;
            }
        }
    }

    if (! loadingRemoteData) {
        obj.init();
    }

    el.tabs = obj;

    return obj;
});

jSuites.toolbar = (function(el, options) {
    var obj = {};
    obj.options = {};

    // Default configuration
    var defaults = {
        app: null,
        container: false,
        badge: false,
        title: false,
        items: [],
    }

    // Loop through our object
    for (var property in defaults) {
        if (options && options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    if (! el && options.app && options.app.el) {
        el = document.createElement('div');
        options.app.el.appendChild(el);
    }

    // Arrow
    var toolbarArrow = document.createElement('div');
    toolbarArrow.classList.add('jtoolbar-item');
    toolbarArrow.classList.add('jtoolbar-arrow');

    var toolbarFloating = document.createElement('div');
    toolbarFloating.classList.add('jtoolbar-floating');
    toolbarArrow.appendChild(toolbarFloating);

    obj.selectItem = function(element) {
        var elements = toolbarContent.children;
        for (var i = 0; i < elements.length; i++) {
            if (element != elements[i]) {
                elements[i].classList.remove('jtoolbar-selected');
            }
        }
        element.classList.add('jtoolbar-selected');
    }

    obj.hide = function() {
        jSuites.animation.slideBottom(el, 0, function() {
            el.style.display = 'none';
        });
    }

    obj.show = function() {
        el.style.display = '';
        jSuites.animation.slideBottom(el, 1);
    }

    obj.get = function() {
        return el;
    }

    obj.setBadge = function(index, value) {
        toolbarContent.children[index].children[1].firstChild.innerHTML = value;
    }

    obj.destroy = function() {
        toolbar.remove();
        el.innerHTML = '';
    }

    var toggleState = function() {
        if (this.classList.contains('jtoolbar-active')) {
            this.classList.remove('jtoolbar-active');
        } else {
            this.classList.add('jtoolbar-active');
        }
    }

    obj.create = function(items) {
        // Reset anything in the toolbar
        toolbarContent.innerHTML = '';
        // Create elements in the toolbar
        for (var i = 0; i < items.length; i++) {
            var toolbarItem = document.createElement('div');
            toolbarItem.classList.add('jtoolbar-item');

            if (items[i].width) {
                toolbarItem.style.width = parseInt(items[i].width) + 'px'; 
            }

            if (items[i].k) {
                toolbarItem.k = items[i].k;
            }

            if (items[i].tooltip) {
                toolbarItem.setAttribute('title', items[i].tooltip);
            }

            // Id
            if (items[i].id) {
                toolbarItem.setAttribute('id', items[i].id);
            }

            // Selected
            if (items[i].state) {
                toolbarItem.toggleState = toggleState;
            }

            if (items[i].active) {
                toolbarItem.classList.add('jtoolbar-active');
            }

            if (items[i].type == 'select' || items[i].type == 'dropdown') {
                jSuites.picker(toolbarItem, items[i]);
            } else if (items[i].type == 'divisor') {
                toolbarItem.classList.add('jtoolbar-divisor');
            } else if (items[i].type == 'label') {
                toolbarItem.classList.add('jtoolbar-label');
                toolbarItem.innerHTML = items[i].content;
            } else {
                // Material icons
                var toolbarIcon = document.createElement('i');
                if (typeof(items[i].class) === 'undefined') {
                    toolbarIcon.classList.add('material-icons');
                } else {
                    var c = items[i].class.split(' ');
                    for (var j = 0; j < c.length; j++) {
                        toolbarIcon.classList.add(c[j]);
                    }
                }
                toolbarIcon.innerHTML = items[i].content ? items[i].content : '';
                toolbarItem.appendChild(toolbarIcon);

                // Badge options
                if (obj.options.badge == true) {
                    var toolbarBadge = document.createElement('div');
                    toolbarBadge.classList.add('jbadge');
                    var toolbarBadgeContent = document.createElement('div');
                    toolbarBadgeContent.innerHTML = items[i].badge ? items[i].badge : '';
                    toolbarBadge.appendChild(toolbarBadgeContent);
                    toolbarItem.appendChild(toolbarBadge);
                }

                // Title
                if (items[i].title) {
                    if (obj.options.title == true) {
                        var toolbarTitle = document.createElement('span');
                        toolbarTitle.innerHTML = items[i].title;
                        toolbarItem.appendChild(toolbarTitle);
                    } else {
                        toolbarItem.setAttribute('title', items[i].title);
                    }
                }

                if (obj.options.app && items[i].route) {
                    // Route
                    toolbarItem.route = items[i].route;
                    // Onclick for route
                    toolbarItem.onclick = function() {
                        obj.options.app.pages(this.route);
                    }
                    // Create pages
                    obj.options.app.pages(items[i].route, {
                        toolbarItem: toolbarItem,
                        closed: true
                    });
                }
            }

            if (items[i].onclick) {
                toolbarItem.onclick = items[i].onclick.bind(this, el, obj, toolbarItem);
            }

            toolbarContent.appendChild(toolbarItem);
        }
    }

    obj.resize = function() {
        el.style.width = el.parentNode.offsetWidth;

        toolbarContent.appendChild(toolbarArrow);
    }

    el.classList.add('jtoolbar');

    if (obj.options.container == true) {
        el.classList.add('jtoolbar-container');
    }

    el.innerHTML = '';
    el.onclick = function(e) {
        var element = jSuites.findElement(e.target, 'jtoolbar-item');
        if (element) {
            obj.selectItem(element);
        }

        if (e.target.classList.contains('jtoolbar-arrow')) {
            e.target.classList.add('jtoolbar-arrow-selected');
            e.target.children[0].focus();
        }
    }

    var toolbarContent = document.createElement('div');
    el.appendChild(toolbarContent);

    if (obj.options.app) {
        el.classList.add('jtoolbar-mobile');
    } else {
        // Not a mobile version
    }

    obj.create(obj.options.items);

    el.toolbar = obj;

    return obj;
});



    return jSuites;

})));