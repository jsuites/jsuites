
/**
 * (c) jSuites Javascript Web Components (v2.7)
 *
 * Author: Paul Hodel <paul.hodel@gmail.com>
 * Website: https://bossanova.uk/jsuites/
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

    obj.init = function() {
        // Find root element
        var app = document.querySelector('.japp');

        // Root element
        if (app) {
            obj.el = app;
        } else {
            obj.el = document.body;
        }
    }

    obj.guid = function() {
        var guid = '';
        for (var i = 0; i < 32; i++) {
            guid += Math.floor(Math.random()*0xF).toString(0xF);
        }
        return guid;
    }

    obj.getWindowWidth = function() {
        var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth;
        return x;
    }

    obj.getWindowHeight = function() {
        var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        y = w.innerHeight|| e.clientHeight|| g.clientHeight;
        return  y;
    }

    obj.getPosition = function(e) {
        if (e.changedTouches && e.changedTouches[0]) {
            var x = e.changedTouches[0].pageX;
            var y = e.changedTouches[0].pageY;
        } else {
            var x = (window.Event) ? e.pageX : e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
            var y = (window.Event) ? e.pageY : e.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
        }

        return [ x, y ];
    }

    obj.click = function(el) {
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

    obj.getElement = function(element, className) {
        var foundElement = false;

        function path (element) {
            if (element.className) {
                if (element.classList.contains(className)) {
                    foundElement = element;
                }
            }

            if (element.parentNode) {
                path(element.parentNode);
            }
        }

        path(element);

        return foundElement;
    }

    obj.getLinkElement = function(element) {
        var targetElement = false;

        function path (element) {
            if ((element.tagName == 'A' || element.tagName == 'DIV') && element.getAttribute('data-href')) {
                targetElement = element;
            }

            if (element.parentNode) {
                path(element.parentNode);
            }
        }

        path(element);

        return targetElement;
    }

    obj.getFormElements = function(formObject) {
        var ret = {};

        if (formObject) {
            var elements = formObject.querySelectorAll("input, select, textarea");
        } else {
            var elements = document.querySelectorAll("input, select, textarea");
        }

        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            var name = element.name;
            var value = element.value;

            if (name) {
                ret[name] = value;
            }
        }

        return ret;
    }

    obj.exists = function(url, __callback) {
        var http = new XMLHttpRequest();
        http.open('HEAD', url, false);
        http.send();
        if (http.status) {
            __callback(http.status);
        }
    }

    obj.getFiles = function(element) {
        if (! element) {
            console.error('No element defined in the arguments of your method');
        }

        // Get attachments
        var files = element.querySelectorAll('.jfile');

        if (files.length > 0) {
            var data = [];
            for (var i = 0; i < files.length; i++) {
                var file = {};

                var src = files[i].getAttribute('src');

                if (files[i].classList.contains('jremove')) {
                    file.remove = 1;
                } else {
                    if (src.substr(0,4) == 'data') {
                        file.content = src.substr(src.indexOf(',') + 1);
                        file.extension = files[i].getAttribute('data-extension');
                    } else {
                        file.file = src;
                        file.extension = files[i].getAttribute('data-extension');
                        if (! file.extension) {
                            file.extension =  src.substr(src.lastIndexOf('.') + 1);
                        }
                        if (jSuites.files[file.file]) {
                            file.content = jSuites.files[file.file];
                        }
                    }

                    // Optional file information
                    if (files[i].getAttribute('data-name')) {
                        file.name = files[i].getAttribute('data-name');
                    }

                    if (files[i].getAttribute('data-file')) {
                        file.file = files[i].getAttribute('data-file');
                    }

                    if (files[i].getAttribute('data-size')) {
                        file.size = files[i].getAttribute('data-size');
                    }

                    if (files[i].getAttribute('data-date')) {
                        file.date = files[i].getAttribute('data-date');
                    }

                    if (files[i].getAttribute('data-cover')) {
                        file.cover = files[i].getAttribute('data-cover');
                    }
                }

                // TODO SMALL thumbs?

                data[i] = file;
            }

            return data;
        }
    }

    obj.ajax = function(options) {
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

        if (options.method == 'POST') {
            httpRequest.setRequestHeader('Accept', 'application/json');
            httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        } else {
            if (options.dataType == 'json') {
                httpRequest.setRequestHeader('Content-Type', 'text/json');
            }
        }

        // No cache
        httpRequest.setRequestHeader('pragma', 'no-cache');
        httpRequest.setRequestHeader('cache-control', 'no-cache');

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
    }

    obj.ajax.requests = [];

    obj.slideLeft = function(element, direction, done) {
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

    obj.slideRight = function(element, direction, done) {
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

    obj.slideTop = function(element, direction, done) {
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

    obj.slideBottom = function(element, direction, done) {
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

    obj.fadeIn = function(element, done) {
        element.classList.add('fade-in');
        setTimeout(function() {
            element.classList.remove('fade-in');
            if (typeof(done) == 'function') {
                done();
            }
        }, 2000);
    }

    obj.fadeOut = function(element, done) {
        element.classList.add('fade-out');
        setTimeout(function() {
            element.classList.remove('fade-out');
            if (typeof(done) == 'function') {
                done();
            }
        }, 1000);
    }

    obj.keyDownControls = function(e) {
        if (e.which == 27) {
            var nodes = document.querySelectorAll('.jslider');
            if (nodes.length > 0) {
                for (var i = 0; i < nodes.length; i++) {
                    nodes[i].slider.close();
                }
            }

            if (document.querySelector('.jdialog')) {
                jSuites.dialog.close();
            }
        } else if (e.which == 13) {
            if (document.querySelector('.jdialog')) {
                if (typeof(jSuites.dialog.options.onconfirm) == 'function') {
                    jSuites.dialog.options.onconfirm();
                }
                jSuites.dialog.close();
            }
        }

        // Verify mask
        if (jSuites.mask) {
            jSuites.mask.apply(e);
        }
    }

    var actionUpControl = function(e) {
        var element = null;
        if (element = jSuites.getLinkElement(e.target)) {
            var link = element.getAttribute('data-href');
            if (link == '#back') {
                window.history.back();
            } else if (link == '#panel') {
                jSuites.panel();
            } else {
                jSuites.pages(link);
            }
        }
    }

    var controlSwipeLeft = function(e) {
        var element = jSuites.getElement(e.target, 'option');

        if (element && element.querySelector('.option-actions')) {
            element.scrollTo({
                left: 100,
                behavior: 'smooth'
            });
        } else {
            var element = jSuites.getElement(e.target, 'jcalendar');
            if (element && jSuites.calendar.current) {
                jSuites.calendar.current.prev();
            } else {
                if (jSuites.panel) {
                    var element = jSuites.panel.get();
                    if (element) {
                        if (element.style.display != 'none') {
                            jSuites.panel.close();
                        }
                    }
                }
            }
        }
    }

    var controlSwipeRight = function(e) {
        var element = jSuites.getElement(e.target, 'option');
        if (element && element.querySelector('.option-actions')) {
            element.scrollTo({
                left: 0,
                behavior: 'smooth'
            });
        } else {
            var element = jSuites.getElement(e.target, 'jcalendar');
            if (element && jSuites.calendar.current) {
                jSuites.calendar.current.next();
            } else {
                if (jSuites.panel) {
                    var element = jSuites.panel.get();
                    if (element) {
                        if (element.style.display == 'none') {
                            jSuites.panel();
                        }
                    }
                }
            }
        }
    }

    var actionOverControl = function(e) {
        // Tooltip
        if (jSuites.tooltip) {
            jSuites.tooltip(e);
        }
    }

    var actionOutControl = function(e) {
        // Tooltip
        if (jSuites.tooltip) {
            jSuites.tooltip.hide();
        }
    }

    // Create page container
    document.addEventListener('swipeleft', controlSwipeLeft);
    document.addEventListener('swiperight', controlSwipeRight);
    document.addEventListener('keydown', obj.keyDownControls);

    if ('ontouchend' in document.documentElement === true) {
        document.addEventListener('touchend', actionUpControl);
    } else {
        document.addEventListener('mouseup', actionUpControl);
    }

    // Onmouseover
    document.addEventListener('mouseover', actionOverControl);
    document.addEventListener('mouseout', actionOutControl);
    document.addEventListener('DOMContentLoaded', function() {
        obj.init();
    });

    // Pop state control
    window.onpopstate = function(e) {
        if (e.state && e.state.route) {
            if (jSuites.pages.get(e.state.route)) {
                jSuites.pages(e.state.route, { ignoreHistory:true });
            }
        }
    }

    return obj;
}();

jSuites.files = [];

jSuites.calendar = (function(el, options) {
    var obj = {};
    obj.options = {};

    // Global container
    if (! jSuites.calendar.current) {
        jSuites.calendar.current = null;
    }

    // Default configuration
    var defaults = {
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
        weekdays: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
        weekdays_short: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        // Value
        value: null,
        // Events
        onclose: null,
        onchange: null,
        // Fullscreen (this is automatic set for screensize < 800)
        fullscreen: false,
        // Internal mode controller
        mode: null,
        position: null,
        // Create the calendar closed as default
        opened: false,
    };

    // Loop through our object
    for (var property in defaults) {
        if (options && options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    // Value
    if (! obj.options.value && el.value) {
        obj.options.value = el.value;
    }

    // Make sure use upper case in the format
    obj.options.format = obj.options.format.toUpperCase();

    if (obj.options.value) {
        var date = obj.options.value.split(' ');
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
    } else {
        var date = new Date();
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        var h = date.getHours();
        var i = date.getMinutes();
    }

    // Current value
    obj.date = [ y, m, d, h, i, 0 ];

    // Two digits
    var two = function(value) {
        value = '' + value;
        if (value.length == 1) {
            value = '0' + value;
        }
        return value;
    }

    // Element
    el.classList.add('jcalendar-input');

    // Calendar elements
    var calendarReset = document.createElement('div');
    calendarReset.className = 'jcalendar-reset';
    calendarReset.innerHTML = 'Reset';

    var calendarConfirm = document.createElement('div');
    calendarConfirm.className = 'jcalendar-confirm';
    calendarConfirm.innerHTML = 'Done';

    var calendarControls = document.createElement('div');
    calendarControls.className = 'jcalendar-controls'
    if (obj.options.resetButton) {
        calendarControls.appendChild(calendarReset);
    }
    calendarControls.appendChild(calendarConfirm);

    var calendarContainer = document.createElement('div');
    calendarContainer.className = 'jcalendar-container';

    var calendarContent = document.createElement('div');
    calendarContent.className = 'jcalendar-content';
    calendarContent.appendChild(calendarControls);
    calendarContainer.appendChild(calendarContent);

    // Main element
    var calendar = document.createElement('div');
    calendar.className = 'jcalendar';
    calendar.appendChild(calendarContainer);

    // Previous button
    var calendarHeaderPrev = document.createElement('td');
    calendarHeaderPrev.setAttribute('colspan', '2');
    calendarHeaderPrev.className = 'jcalendar-prev';

    // Header with year and month
    var calendarLabelYear = document.createElement('span');
    calendarLabelYear.className = 'jcalendar-year';

    var calendarLabelMonth = document.createElement('span');
    calendarLabelMonth.className = 'jcalendar-month';

    var calendarHeaderTitle = document.createElement('td');
    calendarHeaderTitle.className = 'jcalendar-header';
    calendarHeaderTitle.setAttribute('colspan', '3');
    calendarHeaderTitle.appendChild(calendarLabelMonth);
    calendarHeaderTitle.appendChild(calendarLabelYear);

    var calendarHeaderNext = document.createElement('td');
    calendarHeaderNext.setAttribute('colspan', '2');
    calendarHeaderNext.className = 'jcalendar-next';

    var calendarHeaderRow = document.createElement('tr');
    calendarHeaderRow.appendChild(calendarHeaderPrev);
    calendarHeaderRow.appendChild(calendarHeaderTitle);
    calendarHeaderRow.appendChild(calendarHeaderNext);

    var calendarHeader = document.createElement('thead');
    calendarHeader.appendChild(calendarHeaderRow);

    var calendarBody = document.createElement('tbody');
    var calendarFooter = document.createElement('tfoot');

    // Calendar table
    var calendarTable = document.createElement('table');
    calendarTable.setAttribute('cellpadding', '0');
    calendarTable.setAttribute('cellspacing', '0');
    calendarTable.appendChild(calendarHeader);
    calendarTable.appendChild(calendarBody);
    calendarTable.appendChild(calendarFooter);
    calendarContent.appendChild(calendarTable);

    var calendarSelectHour = document.createElement('select');
    calendarSelectHour.className = 'jcalendar-select';
    calendarSelectHour.onchange = function() {
        obj.date[3] = this.value; 
    }

    for (var i = 0; i < 24; i++) {
        var element = document.createElement('option');
        element.value = i;
        element.innerHTML = two(i);
        calendarSelectHour.appendChild(element);
    }

    var calendarSelectMin = document.createElement('select');
    calendarSelectMin.className = 'jcalendar-select';
    calendarSelectMin.onchange = function() {
        obj.date[4] = this.value; 
    }

    for (var i = 0; i < 60; i++) {
        var element = document.createElement('option');
        element.value = i;
        element.innerHTML = two(i);
        calendarSelectMin.appendChild(element);
    }

    // Footer controls
    var calendarControls = document.createElement('div');
    calendarControls.className = 'jcalendar-controls';

    var calendarControlsTime = document.createElement('div');
    calendarControlsTime.className = 'jcalendar-time';
    calendarControlsTime.style.maxWidth = '140px';
    calendarControlsTime.appendChild(calendarSelectHour);
    calendarControlsTime.appendChild(calendarSelectMin);

    var calendarControlsUpdate = document.createElement('div');
    calendarControlsUpdate.style.flexGrow = '10';
    calendarControlsUpdate.innerHTML = '<input type="button" class="jcalendar-update" value="Update">'
    calendarControls.appendChild(calendarControlsTime);
    calendarControls.appendChild(calendarControlsUpdate);
    calendarContent.appendChild(calendarControls);

    var calendarBackdrop = document.createElement('div');
    calendarBackdrop.className = 'jcalendar-backdrop';
    calendar.appendChild(calendarBackdrop);

    // Methods
    obj.open = function (value) {
        if (! calendar.classList.contains('jcalendar-focus')) {
            if (jSuites.calendar.current) {
                jSuites.calendar.current.close();
            }
            // Current
            jSuites.calendar.current = obj;
            // Show calendar
            calendar.classList.add('jcalendar-focus');
            // Get days
            obj.getDays();
            // Hour
            if (obj.options.time) {
                calendarSelectHour.value = obj.date[3];
                calendarSelectMin.value = obj.date[4];
            }

            // Get the position of the corner helper
            if (jSuites.getWindowWidth() < 800 || obj.options.fullscreen) {
                // Full
                calendar.classList.add('jcalendar-fullsize');
                // Animation
                jSuites.slideBottom(calendarContent, 1);
            } else {
                const rect = el.getBoundingClientRect();
                const rectContent = calendarContent.getBoundingClientRect();

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
        }
    }

    obj.close = function (ignoreEvents, update) {
        // Current
        jSuites.calendar.current = null;

        if (update != false && el.tagName == 'INPUT') {
            obj.setValue(obj.getValue());
        }

        // Animation
        if (! ignoreEvents && typeof(obj.options.onclose) == 'function') {
            obj.options.onclose(el);
        }

        // Hide
        calendar.classList.remove('jcalendar-focus');

        return obj.getValue(); 
    }

    obj.prev = function() {
        // Check if the visualization is the days picker or years picker
        if (obj.options.mode == 'years') {
            obj.date[0] = obj.date[0] - 12;

            // Update picker table of days
            obj.getYears();
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
        } else {
            // Go to the previous month
            if (obj.date[1] > 11) {
                obj.date[0] = obj.date[0] + 1;
                obj.date[1] = 1;
            } else {
                obj.date[1] = obj.date[1] + 1;
            }

            // Update picker table of days
            obj.getDays();
        }
    }

    obj.setValue = function(val) {
        if (val) {
            // Keep value
            obj.options.value = val;
            // Set label
            var value = obj.setLabel(val, obj.options.format);
            var date = obj.options.value.split(' ');
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
            var val = obj.setLabel(val, obj.options.format);

            if (el.value != val) {
                el.value = val;
                // On change
                if (typeof(obj.options.onchange) ==  'function') {
                    obj.options.onchange(el, val, obj.date);
                }
            }

            obj.getDays();
        }
    }

    obj.getValue = function() {
        if (obj.date) {
            if (obj.options.time) {
                return two(obj.date[0]) + '-' + two(obj.date[1]) + '-' + two(obj.date[2]) + ' ' + two(obj.date[3]) + ':' + two(obj.date[4]) + ':' + two(0);
            } else {
                return two(obj.date[0]) + '-' + two(obj.date[1]) + '-' + two(obj.date[2]) + ' ' + two(0) + ':' + two(0) + ':' + two(0);
            }
        } else {
            return "";
        }
    }

    /**
     * Update calendar
     */
    obj.update = function(element) {
        obj.date[2] = element.innerText;

        if (! obj.options.time) {
            obj.close();
        } else {
            obj.date[3] = calendarSelectHour.value;
            obj.date[4] = calendarSelectMin.value;
        }

        var elements = calendar.querySelector('.jcalendar-selected');
        if (elements) {
            elements.classList.remove('jcalendar-selected');
        }
        element.classList.add('jcalendar-selected')
    }

    /**
     * Set to blank
     */
    obj.reset = function() {
        // Clear element
        obj.date = null;
        // Reset element
        el.value = '';
        // Close calendar
        obj.close();
    }

    /**
     * Get calendar days
     */
    obj.getDays = function() {
        // Mode
        obj.options.mode = 'days';

        // Variables
        var d = 0;
        var today = 0;
        var today_d = 0;
        var calendar_day;

        // Setting current values in case of NULLs
        var date = new Date();

        var year = obj.date && obj.date[0] ? obj.date[0] : parseInt(date.getFullYear());
        var month = obj.date && obj.date[1] ? obj.date[1] : parseInt(date.getMonth()) + 1;
        var day = obj.date && obj.date[2] ? obj.date[2] : parseInt(date.getDay());
        var hour = obj.date && obj.date[3] ? obj.date[3] : parseInt(date.getHours());
        var min = obj.date && obj.date[4] ? obj.date[4] : parseInt(date.getMinutes());

        obj.date = [year, month, day, hour, min, 0 ];

        // Update title
        calendarLabelYear.innerHTML = year;
        calendarLabelMonth.innerHTML = obj.options.months[month - 1];

        // Flag if this is the current month and year
        if ((date.getMonth() == month-1) && (date.getFullYear() == year)) {
            today = 1;
            today_d = date.getDate();
        }

        var date = new Date(year, month, 0, 0, 0);
        var nd = date.getDate();

        var date = new Date(year, month-1, 0, hour, min);
        var fd = date.getDay() + 1;

        // Reset table
        calendarBody.innerHTML = '';

        // Weekdays Row
        var row = document.createElement('tr');
        row.setAttribute('align', 'center');
        calendarBody.appendChild(row);

        for (var i = 0; i < 7; i++) {
            var cell = document.createElement('td');
            cell.setAttribute('width', '30');
            cell.classList.add('jcalendar-weekday')
            cell.innerHTML = obj.options.weekdays_short[i];
            row.appendChild(cell);
        }

        // Avoid a blank line
        if (fd == 7) {
            var j = 7;
        } else {
            var j = 0;
        }

        // Days inside the table
        var row = document.createElement('tr');
        row.setAttribute('align', 'center');
        calendarBody.appendChild(row);

        // Days in the month
        for (var i = j; i < (Math.ceil((nd + fd) / 7) * 7); i++) {
            // Create row
            if ((i > 0) && (!(i % 7))) {
                var row = document.createElement('tr');
                row.setAttribute('align', 'center');
                calendarBody.appendChild(row);
            }

            if ((i >= fd) && (i < nd + fd)) {
                d += 1;
            } else {
                d = 0;
            }

            // Create cell
            var cell = document.createElement('td');
            cell.setAttribute('width', '30');
            cell.classList.add('jcalendar-set-day');
            row.appendChild(cell);

            if (d == 0) {
                cell.innerHTML = '';
            } else {
                if (d < 10) {
                    cell.innerHTML = 0 + d;
                } else {
                    cell.innerHTML = d;
                }
            }

            // Selected
            if (d && d == day) {
                cell.classList.add('jcalendar-selected');
            }

            // Sundays
            if (! (i % 7)) {
                cell.style.color = 'red';
            }

            // Today
            if ((today == 1) && (today_d == d)) {
                cell.style.fontWeight = 'bold';
            }
        }

        // Show time controls
        if (obj.options.time) {
            calendarControlsTime.style.display = '';
        } else {
            calendarControlsTime.style.display = 'none';
        }
    }

    obj.getMonths = function() {
        // Mode
        obj.options.mode = 'months';

        // Loading month labels
        var months = obj.options.months;

        // Update title
        calendarLabelYear.innerHTML = obj.date[0];
        calendarLabelMonth.innerHTML = '';

        // Create months table
        var html = '<td colspan="7"><table width="100%"><tr align="center">';

        for (i = 0; i < 12; i++) {
            if ((i > 0) && (!(i % 4))) {
                html += '</tr><tr align="center">';
            }

            var month = parseInt(i) + 1;
            html += '<td class="jcalendar-set-month" data-value="' + month + '">' + months[i] +'</td>';
        }

        html += '</tr></table></td>';

        calendarBody.innerHTML = html;
    }

    obj.getYears = function() { 
        // Mode
        obj.options.mode = 'years';

        // Array of years
        var y = [];
        for (i = 0; i < 25; i++) {
            y[i] = parseInt(obj.date[0]) + (i - 12);
        }

        // Assembling the year tables
        var html = '<td colspan="7"><table width="100%"><tr align="center">';

        for (i = 0; i < 25; i++) {
            if ((i > 0) && (!(i % 5))) {
                html += '</tr><tr align="center">';
            }
            html += '<td class="jcalendar-set-year">'+ y[i] +'</td>';
        }

        html += '</tr></table></td>';

        calendarBody.innerHTML = html;
    }

    obj.setLabel = function(value, format) {
        return jSuites.calendar.getDateString(value, format);
    }

    obj.fromFormatted = function (value, format) {
        return jSuites.calendar.extractDateFromString(value, format);
    }

    // Add properties
    el.setAttribute('autocomplete', 'off');
    el.setAttribute('data-mask', obj.options.format.toLowerCase());

    if (obj.options.readonly) {
        el.setAttribute('readonly', 'readonly');
    }

    if (obj.options.placeholder) {
        el.setAttribute('placeholder', obj.options.placeholder);
    }

    var mouseUpControls = function(e) {
        var action = e.target.className;

        // Object id
        if (action == 'jcalendar-prev') {
            obj.prev();
            e.stopPropagation();
            e.preventDefault();
        } else if (action == 'jcalendar-next') {
            obj.next();
            e.stopPropagation();
            e.preventDefault();
        } else if (action == 'jcalendar-month') {
            obj.getMonths();
            e.stopPropagation();
            e.preventDefault();
        } else if (action == 'jcalendar-year') {
            obj.getYears();
            e.stopPropagation();
            e.preventDefault();
        } else if (action == 'jcalendar-set-year') {
            obj.date[0] = e.target.innerText;
            obj.getDays();
            e.stopPropagation();
            e.preventDefault();
        } else if (action == 'jcalendar-set-month') {
            obj.date[1] = parseInt(e.target.getAttribute('data-value'));
            obj.getDays();
            e.stopPropagation();
            e.preventDefault();
        } else if (action == 'jcalendar-confirm' || action == 'jcalendar-update') {
            obj.close();
            e.stopPropagation();
            e.preventDefault();
        } else if (action == 'jcalendar-close') {
            obj.close();
            e.stopPropagation();
            e.preventDefault();
        } else if (action == 'jcalendar-backdrop') {
            obj.close(false, false);
            e.stopPropagation();
            e.preventDefault();
        } else if (action == 'jcalendar-reset') {
            obj.reset();
            e.stopPropagation();
            e.preventDefault();
        } else if (e.target.classList.contains('jcalendar-set-day')) {
            if (e.target.innerText) {
                obj.update(e.target);
                e.stopPropagation();
                e.preventDefault();
            }
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

    var verifyControls = function(e) {
        console.log(e.target.className)
    }

    // Handle events
    el.addEventListener("keyup", keyUpControls);

    // Add global events
    calendar.addEventListener("swipeleft", function(e) {
        jSuites.slideLeft(calendarTable, 0, function() {
            obj.next();
            jSuites.slideRight(calendarTable, 1);
        });
        e.preventDefault();
        e.stopPropagation();
    });

    calendar.addEventListener("swiperight", function(e) {
        jSuites.slideRight(calendarTable, 0, function() {
            obj.prev();
            jSuites.slideLeft(calendarTable, 1);
        });
        e.preventDefault();
        e.stopPropagation();
    });

    if ('ontouchend' in document.documentElement === true) {
        calendar.addEventListener("touchend", mouseUpControls);

        el.addEventListener("touchend", function(e) {
            obj.open();
        });
    } else {
        calendar.addEventListener("mouseup", mouseUpControls);

        el.addEventListener("mouseup", function(e) {
            obj.open();
        });
    }

    // Append element to the DOM
    el.parentNode.insertBefore(calendar, el.nextSibling);

    // Keep object available from the node
    el.calendar = obj;

    if (obj.options.opened == true) {
        obj.open();
    }

    return obj;
});

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

jSuites.calendar.now = function() {
    var date = new Date();
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var h = date.getHours();
    var i = date.getMinutes();
    var s = date.getSeconds();

    // Two digits
    var two = function(value) {
        value = '' + value;
        if (value.length == 1) {
            value = '0' + value;
        }
        return value;
    }

    return two(y) + '-' + two(m) + '-' + two(d) + ' ' + two(h) + ':' + two(i) + ':' + two(s);
}

// Helper to extract date from a string
jSuites.calendar.extractDateFromString = function(date, format) {
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
    if (parseInt(m) != m || d > 12) {
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
        var data = y + '-' + m + '-' + d + ' ' + h + ':' +  i + ':' + s;

        return data;
    }

    return '';
}

// Helper to convert date into string
jSuites.calendar.getDateString = function(value, format) {
    // Default calendar
    if (! format) {
        var format = 'DD/MM/YYYY';
    }

    if (value) {
        var d = ''+value;
        d = d.split(' ');

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
            var weekday = new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday');
            var months = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');

            d[1] = (d[1].length < 2 ? '0' : '') + d[1];
            d[2] = (d[2].length < 2 ? '0' : '') + d[2];
            h = (h.length < 2 ? '0' : '') + h;
            m = (m.length < 2 ? '0' : '') + m;
            s = (s.length < 2 ? '0' : '') + s;

            value = format;
            value = value.replace('WD', weekday[calendar.getDay()]);
            value = value.replace('DD', d[2]);
            value = value.replace('MM', d[1]);
            value = value.replace('YYYY', d[0]);
            value = value.replace('YY', d[0].substring(2,4));
            value = value.replace('MON', months[parseInt(d[1])-1].toUpperCase());

            if (h) {
                value = value.replace('HH24', h);
            }

            if (h > 12) {
                value = value.replace('HH12', h - 12);
                value = value.replace('HH', h);
            } else {
                value = value.replace('HH12', h);
                value = value.replace('HH', h);
            }

            value = value.replace('MI', m);
            value = value.replace('MM', m);
            value = value.replace('SS', s);
        } else {
            value = '';
        }
    }

    return value;
}

jSuites.calendar.isOpen = function(e) {
    if (jSuites.calendar.current) {
        if (! e.target.className || e.target.className.indexOf('jcalendar') == -1) {
            jSuites.calendar.current.close();
        }
    }
}

if ('ontouchstart' in document.documentElement === true) {
    document.addEventListener("touchstart", jSuites.calendar.isOpen);
} else {
    document.addEventListener("mousedown", jSuites.calendar.isOpen);
}

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
     */
    var defaults = {
        placeholder: '',
        value: null,
        onclose: null,
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

    var palette = {
          "red": {
            "50": "#ffebee",
            "100": "#ffcdd2",
            "200": "#ef9a9a",
            "300": "#e57373",
            "400": "#ef5350",
            "500": "#f44336",
            "600": "#e53935",
            "700": "#d32f2f",
            "800": "#c62828",
            "900": "#b71c1c",
          },
          "pink": {
            "50": "#fce4ec",
            "100": "#f8bbd0",
            "200": "#f48fb1",
            "300": "#f06292",
            "400": "#ec407a",
            "500": "#e91e63",
            "600": "#d81b60",
            "700": "#c2185b",
            "800": "#ad1457",
            "900": "#880e4f",
          },
          "purple": {
            "50": "#f3e5f5",
            "100": "#e1bee7",
            "200": "#ce93d8",
            "300": "#ba68c8",
            "400": "#ab47bc",
            "500": "#9c27b0",
            "600": "#8e24aa",
            "700": "#7b1fa2",
            "800": "#6a1b9a",
            "900": "#4a148c",
          },
          "indigo": {
            "50": "#e8eaf6",
            "100": "#c5cae9",
            "200": "#9fa8da",
            "300": "#7986cb",
            "400": "#5c6bc0",
            "500": "#3f51b5",
            "600": "#3949ab",
            "700": "#303f9f",
            "800": "#283593",
            "900": "#1a237e",
          },
          "blue": {
            "50": "#e3f2fd",
            "100": "#bbdefb",
            "200": "#90caf9",
            "300": "#64b5f6",
            "400": "#42a5f5",
            "500": "#2196f3",
            "600": "#1e88e5",
            "700": "#1976d2",
            "800": "#1565c0",
            "900": "#0d47a1",
          },
          "cyan": {
            "50": "#e0f7fa",
            "100": "#b2ebf2",
            "200": "#80deea",
            "300": "#4dd0e1",
            "400": "#26c6da",
            "500": "#00bcd4",
            "600": "#00acc1",
            "700": "#0097a7",
            "800": "#00838f",
            "900": "#006064",
          },
          "teal": {
            "50": "#e0f2f1",
            "100": "#b2dfdb",
            "200": "#80cbc4",
            "300": "#4db6ac",
            "400": "#26a69a",
            "500": "#009688",
            "600": "#00897b",
            "700": "#00796b",
            "800": "#00695c",
            "900": "#004d40",
          },
          "green": {
            "50": "#e8f5e9",
            "100": "#c8e6c9",
            "200": "#a5d6a7",
            "300": "#81c784",
            "400": "#66bb6a",
            "500": "#4caf50",
            "600": "#43a047",
            "700": "#388e3c",
            "800": "#2e7d32",
            "900": "#1b5e20",
          },
          "lightgreen": {
            "50": "#f1f8e9",
            "100": "#dcedc8",
            "200": "#c5e1a5",
            "300": "#aed581",
            "400": "#9ccc65",
            "500": "#8bc34a",
            "600": "#7cb342",
            "700": "#689f38",
            "800": "#558b2f",
            "900": "#33691e",
          },
          "lime": {
            "50": "#f9fbe7",
            "100": "#f0f4c3",
            "200": "#e6ee9c",
            "300": "#dce775",
            "400": "#d4e157",
            "500": "#cddc39",
            "600": "#c0ca33",
            "700": "#afb42b",
            "800": "#9e9d24",
            "900": "#827717",
          },
          "yellow": {
            "50": "#fffde7",
            "100": "#fff9c4",
            "200": "#fff59d",
            "300": "#fff176",
            "400": "#ffee58",
            "500": "#ffeb3b",
            "600": "#fdd835",
            "700": "#fbc02d",
            "800": "#f9a825",
            "900": "#f57f17",
          },
          "amber": {
            "50": "#fff8e1",
            "100": "#ffecb3",
            "200": "#ffe082",
            "300": "#ffd54f",
            "400": "#ffca28",
            "500": "#ffc107",
            "600": "#ffb300",
            "700": "#ffa000",
            "800": "#ff8f00",
            "900": "#ff6f00",
          },
          "orange": {
            "50": "#fff3e0",
            "100": "#ffe0b2",
            "200": "#ffcc80",
            "300": "#ffb74d",
            "400": "#ffa726",
            "500": "#ff9800",
            "600": "#fb8c00",
            "700": "#f57c00",
            "800": "#ef6c00",
            "900": "#e65100",
          },
          "deeporange": {
            "50": "#fbe9e7",
            "100": "#ffccbc",
            "200": "#ffab91",
            "300": "#ff8a65",
            "400": "#ff7043",
            "500": "#ff5722",
            "600": "#f4511e",
            "700": "#e64a19",
            "800": "#d84315",
            "900": "#bf360c",
          },
          "brown": {
            "50": "#efebe9",
            "100": "#d7ccc8",
            "200": "#bcaaa4",
            "300": "#a1887f",
            "400": "#8d6e63",
            "500": "#795548",
            "600": "#6d4c41",
            "700": "#5d4037",
            "800": "#4e342e",
            "900": "#3e2723"
          },
          "grey": {
            "50": "#fafafa",
            "100": "#f5f5f5",
            "200": "#eeeeee",
            "300": "#e0e0e0",
            "400": "#bdbdbd",
            "500": "#9e9e9e",
            "600": "#757575",
            "700": "#616161",
            "800": "#424242",
            "900": "#212121"
          },
          "bluegrey": {
            "50": "#eceff1",
            "100": "#cfd8dc",
            "200": "#b0bec5",
            "300": "#90a4ae",
            "400": "#78909c",
            "500": "#607d8b",
            "600": "#546e7a",
            "700": "#455a64",
            "800": "#37474f",
            "900": "#263238"
          }
    };

    var x = 0;
    var y = 0;
    var colors = [];

    var col = Object.keys(palette);
    var shade = Object.keys(palette[col[0]]);

    for (var i = 0; i < col.length; i++) {
        for (var j = 0; j < shade.length; j++) {
            if (! colors[j]) {
                colors[j] = [];
            }
            colors[j][i] = palette[col[i]][shade[j]];
        }
    };

    // Value
    if (obj.options.value) {
        el.value = obj.options.value;
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

    // Close button
    var closeButton  = document.createElement('div');
    closeButton.className = 'jcolor-close';
    closeButton.innerHTML = 'Done';
    closeButton.onclick = function() {
        obj.close();
    }
    content.appendChild(closeButton);

    // Table pallete
    var table = document.createElement('table');
    table.setAttribute('cellpadding', '7');
    table.setAttribute('cellspacing', '0');

    for (var i = 0; i < colors.length; i++) {
        var tr = document.createElement('tr');
        for (var j = 0; j < colors[i].length; j++) {
            var td = document.createElement('td');
            td.style.backgroundColor = colors[i][j];
            td.setAttribute('data-value', colors[i][j]);
            td.innerHTML = '';
            tr.appendChild(td);

            // Selected color
            if (obj.options.value == colors[i][j]) {
                td.classList.add('jcolor-selected');
            }

            // Possible values
            obj.values[colors[i][j]] = td;
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

            const rectContent = content.getBoundingClientRect();

            if (jSuites.getWindowWidth() < 800) {
                content.style.top = '';
                content.classList.add('jcolor-fullscreen');
                jSuites.slideBottom(content, 1);
                backdrop.style.display = 'block';
            } else {
                if (content.classList.contains('jcolor-fullscreen')) {
                    content.classList.remove('jcolor-fullscreen');
                    backdrop.style.display = '';
                }

                const rect = el.getBoundingClientRect();

                if (window.innerHeight < rect.bottom + rectContent.height) {
                    content.style.top = -1 * (rectContent.height + 2) + 'px';
                } else {
                    content.style.top = rect.height + 'px';
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
        obj.values[color].classList.add('jcolor-selected');

        // Onchange
        if (typeof(obj.options.onchange) == 'function') {
            obj.options.onchange(el, color);
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
        obj.open();
    });

    // Select color
    container.addEventListener("mouseup", function(e) {
        if (e.target.tagName == 'TD') {
            jSuites.color.current.setValue(e.target.getAttribute('data-value'));
            jSuites.color.current.close();
        }
    });

    // Close controller
    document.addEventListener("mousedown", function(e) {
        if (jSuites.color.current) {
            var element = jSuites.getElement(e.target, 'jcolor');
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
    el.parentNode.insertBefore(container, el);

    // Keep object available from the node
    el.color = obj;

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
        if (e.target) {
            var x = e.clientX;
            var y = e.clientY;
        } else {
            var x = e.x;
            var y = e.y;
        }

        el.classList.add('jcontextmenu-focus');
        el.focus();

        const rect = el.getBoundingClientRect();

        if (window.innerHeight < y + rect.height) {
            el.style.top = (y - rect.height) + 'px';
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
            if (items[i].type && items[i].type == 'line') {
                var itemContainer = document.createElement('hr');
            } else {
                var itemContainer = document.createElement('div');
                var itemText = document.createElement('a');
                itemText.innerHTML = items[i].title;

                if (items[i].disabled) {
                    itemContainer.className = 'jcontextmenu-disabled';
                } else if (items[i].onclick) {
                    itemContainer.method = items[i].onclick;
                    itemContainer.addEventListener("mouseup", function() {
                        // Execute method
                        this.method(this);
                    });
                }
                itemContainer.appendChild(itemText);

                if (items[i].shortcut) {
                    var itemShortCut = document.createElement('span');
                    itemShortCut.innerHTML = items[i].shortcut;
                    itemContainer.appendChild(itemShortCut);
                }
            }

            el.appendChild(itemContainer);
        }
    }

    if (typeof(obj.options.onclick) == 'function') {
        el.addEventListener('click', function(e) {
            obj.options.onclick(obj);
        });
    }

    el.addEventListener('blur', function(e) {
        setTimeout(function() {
            obj.close();
        }, 120);
    });

    window.addEventListener("mousewheel", function() {
        obj.close();
    });

    // Create items
    if (obj.options.items) {
        obj.create(obj.options.items);
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

jSuites.dropdown = (function(el, options) {
    var obj = {};
    obj.options = {};

    // If the element is a SELECT tag, create a configuration object
    if (el.tagName == 'SELECT') {
        var ret = jSuites.dropdown.extractFromDom(el, options);
        el = ret.el;
        options = ret.options;
    }

    // Default configuration
    var defaults = {
        url: null,
        data: [],
        multiple: false,
        autocomplete: false,
        type: null,
        width: null,
        opened: false,
        value: null,
        placeholder: '',
        position: false,
        onchange: null,
        onload: null,
        onopen: null,
        onclose: null,
        onblur: null,
    };

    // Loop through our object
    for (var property in defaults) {
        if (options && options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    // Global container
    if (! jSuites.dropdown.current) {
        jSuites.dropdown.current = null;
    }

    // Containers
    obj.items = [];
    obj.groups = [];
    obj.selected = [];

    // Create dropdown
    el.classList.add('jdropdown');
 
    if (obj.options.type == 'searchbar') {
        el.classList.add('jdropdown-searchbar');
    } else if (obj.options.type == 'list') {
        el.classList.add('jdropdown-list');
    } else if (obj.options.type == 'picker') {
        el.classList.add('jdropdown-picker');
    } else {
        if (jSuites.getWindowWidth() < 800) {
            el.classList.add('jdropdown-picker');
            obj.options.type = 'picker';
        } else {
            if (obj.options.width) {
                el.style.width = obj.options.width;
                el.style.minWidth = obj.options.width;
            }
            el.classList.add('jdropdown-default');
            obj.options.type = 'default';
        }
    }

    // Header container
    var containerHeader = document.createElement('div');
    containerHeader.className = 'jdropdown-container-header';

    // Header
    var header = document.createElement('input');
    header.className = 'jdropdown-header';
    if (typeof(obj.options.onblur) == 'function') {
        header.onblur = function() {
            obj.options.onblur(el);
        }
    }

    // Container
    var container = document.createElement('div');
    container.className = 'jdropdown-container';

    // Dropdown content
    var content = document.createElement('div');
    content.className = 'jdropdown-content';

    // Close button
    var closeButton  = document.createElement('div');
    closeButton.className = 'jdropdown-close';
    closeButton.innerHTML = 'Done';

    // Create backdrop
    var backdrop  = document.createElement('div');
    backdrop.className = 'jdropdown-backdrop';

    // Autocomplete
    if (obj.options.autocomplete == true) {
        el.setAttribute('data-autocomplete', true);

        // Handler
        var keyTimer = null;
        header.addEventListener('keyup', function(e) {
            if (keyTimer) {
                clearTimeout(keyTimer);
            }
            keyTimer = setTimeout(function() {
                obj.find(header.value);
                keyTimer = null;
            }, 500);

            if (! el.classList.contains('jdropdown-focus')) {
                if (e.which > 65) {
                    obj.open();
                }
            }
        });
    } else {
        header.setAttribute('readonly', 'readonly');
    }

    // Place holder
    if (! obj.options.placeholder && el.getAttribute('placeholder')) {
        obj.options.placeholder = el.getAttribute('placeholder');
    }

    if (obj.options.placeholder) {
        header.setAttribute('placeholder', obj.options.placeholder);
    }

    // Append elements
    containerHeader.appendChild(header);
    if (obj.options.type == 'searchbar') {
        containerHeader.appendChild(closeButton);
    } else {
        container.appendChild(closeButton);
    }
    container.appendChild(content);
    el.appendChild(containerHeader);
    el.appendChild(container);
    el.appendChild(backdrop);

    /**
     * Init dropdown
     */
    obj.init = function() {
        if (obj.options.url) {
            jSuites.ajax({
                url: obj.options.url,
                method: 'GET',
                dataType: 'json',
                success: function(data) {
                    if (data) {
                        // Set data
                        obj.setData(data);
                        // Set value
                        if (obj.options.value != null) {
                            obj.setValue(obj.options.value);
                        }
                        // Onload method
                        if (typeof(obj.options.onload) == 'function') {
                            obj.options.onload(el, obj, data);
                        }
                    }
                }
            });
        } else {
            // Set data
            obj.setData();
            // Set value
            if (obj.options.value != null) {
                obj.setValue(obj.options.value);
            }
            // Onload
            if (typeof(obj.options.onload) == 'function') {
                obj.options.onload(el, obj, data);
            }
        }

        // Open dropdown
        if (obj.options.opened == true) {
            obj.open();
        }
    }

    obj.getUrl = function() {
        return obj.options.url;
    }

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
     * Create a new item
     */
    obj.createItem = function(data) {
        // Create item
        var item = {};
        item.element = document.createElement('div');
        item.element.className = 'jdropdown-item';
        item.value = data.id;
        item.text = data.name;
        item.textLowerCase = data.name.toLowerCase();

        // Image
        if (data.image) {
            var image = document.createElement('img');
            image.className = 'jdropdown-image';
            image.src = data.image;
            if (! data.title) {
               image.classList.add('jdropdown-image-small');
            }
            item.element.appendChild(image);
        }

        // Set content
        var node = document.createElement('div');
        node.className = 'jdropdown-description';
        node.innerHTML = data.name;

        // Title
        if (data.title) {
            var title = document.createElement('div');
            title.className = 'jdropdown-title';
            title.innerHTML = data.title;
            node.appendChild(title);
        }

        // Add node to item
        item.element.appendChild(node);

        return item;
    }

    obj.setData = function(data) {
        // Update data
        if (data) {
            obj.options.data = data;
        }

        // Data
        var data = obj.options.data;

        // Make sure the content container is blank
        content.innerHTML = '';

        // Reset
        obj.reset();

        // Reset items
        obj.items = [];

        // Helpers
        var items = [];
        var groups = [];

        // Create elements
        if (data.length) {
            // Prepare data
            for (var i = 0; i < data.length; i++) {
                // Compatibility
                if (typeof(data[i]) != 'object') {
                    // Correct format
                    obj.options.data[i] = data[i] = { id: data[i], name: data[i] };
                }

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
                        var item = obj.createItem(data[groups[groupNames[i]][j]]);
                        groupContent.appendChild(item.element);
                        // Items
                        obj.items.push(item);
                    }
                    // Group itens
                    group.appendChild(groupName);
                    group.appendChild(groupArrow);
                    group.appendChild(groupContent);
                    content.appendChild(group);
                }
            }

            if (items.length) {
                for (var i = 0; i < items.length; i++) {
                    var item = obj.createItem(data[items[i]]);
                    obj.items.push(item);
                    content.appendChild(item.element);
                }
            }

            // Create the Indexes
            for (var i = 0; i < obj.items.length; i++) {
                obj.items[i].element.setAttribute('data-index', i);
            }
        }
    }

    obj.getText = function(asArray) {
        // Result
        var result = [];
        // Append options
        for (var i = 0; i < obj.selected.length; i++) {
            if (obj.items[obj.selected[i]]) {
                result.push(obj.items[obj.selected[i]].text);
            }
        }

        if (asArray) {
            return result;
        } else {
            return result.join('; ');
        }
    }

    obj.getValue = function(asArray) {
        // Result
        var result = [];
        // Append options
        for (var i = 0; i < obj.selected.length; i++) {
            if (obj.items[obj.selected[i]]) {
                result.push(obj.items[obj.selected[i]].value);
            }
        }

        if (asArray) {
            return result;
        } else {
            return result.join(';');
        }
    }

    obj.setValue = function(value) {
        // Remove values
        for (var i = 0; i < obj.selected.length; i++) {
            obj.items[obj.selected[i]].element.classList.remove('jdropdown-selected')
        } 

        // Reset selected
        obj.selected = [];

        // Set values
        if (value != null) {
            if (Array.isArray(value)) {
                for (var i = 0; i < obj.items.length; i++) {
                    for (var j = 0; j < value.length; j++) {
                        if (obj.items[i].value == value[j]) {
                            // Keep index of the selected item
                            obj.selected.push(i);
                            // Visual selection
                            obj.items[i].element.classList.add('jdropdown-selected');
                        }
                    }
                }
            } else {
                for (var i = 0; i < obj.items.length; i++) {
                    if (obj.items[i].value == value) {
                        // Keep index of the selected item
                        obj.selected.push(i);
                        // Visual selection
                        obj.items[i].element.classList.add('jdropdown-selected');
                    }
                }
            }
        }

        // Update labels
        obj.updateLabel();
    }

    obj.selectIndex = function(index) {
        // Only select those existing elements
        if (obj.items && obj.items[index]) {
            var index = index = parseInt(index);
            // Current selection
            var oldValue = obj.getValue();
            var oldLabel = obj.getText();

            // Remove cursor style
            if (obj.currentIndex != null) {
                obj.items[obj.currentIndex].element.classList.remove('jdropdown-cursor');
            }
            // Set cursor style
            obj.items[index].element.classList.add('jdropdown-cursor');

            // Update cursor position
            obj.currentIndex = index;

            // Focus behaviour
            if (! obj.options.multiple) {
                // Unselect option
                if (obj.items[index].element.classList.contains('jdropdown-selected')) {
                    // Reset selected
                    obj.resetSelected();
                } else {
                    // Reset selected
                    obj.resetSelected();
                    // Update selected item
                    obj.items[index].element.classList.add('jdropdown-selected');
                    // Add to the selected list
                    obj.selected.push(index);
                    // Close
                    obj.close();
                }
            } else {
                // Toggle option
                if (obj.items[index].element.classList.contains('jdropdown-selected')) {
                    obj.items[index].element.classList.remove('jdropdown-selected');
                    // Remove from selected list
                    var indexToRemove = obj.selected.indexOf(index);
                    // Remove select
                    obj.selected.splice(indexToRemove, 1);
                } else {
                    // Select element
                    obj.items[index].element.classList.add('jdropdown-selected');
                    // Add to the selected list
                    obj.selected.push(index);
                }

                // Update labels for multiple dropdown
                if (! obj.options.autocomplete) {
                    obj.updateLabel();
                }
            }

            // Current selection
            var newValue = obj.getValue();
            var newLabel = obj.getText();

            // Events
            if (typeof(obj.options.onchange) == 'function') {
                obj.options.onchange(el, index, oldValue, newValue, oldLabel, newLabel);
            }
        }
    }

    obj.selectItem = function(item) {
        if (jSuites.dropdown.current) {
            var index = item.getAttribute('data-index');
            if (index != null) {
                obj.selectIndex(index);
            }
        }
    }

    obj.find = function(str) {
        // Force lowercase
        var str = str ? str.toLowerCase() : null;

        // Append options
        for (var i = 0; i < obj.items.length; i++) {
            if (str == null || obj.items[i].textLowerCase.indexOf(str) != -1) {
                obj.items[i].element.style.display = '';
            } else {
                if (obj.selected.indexOf(i) == -1) {
                    obj.items[i].element.style.display = 'none';
                } else {
                    obj.items[i].element.style.display = '';
                }
            }
        }

        var numVisibleItems = function(items) {
            var visible = 0;
            for (var j = 0; j < items.length; j++) {
                if (items[j].style.display != 'none') {
                    visible++;
                }
            }
            return visible;
        }

        // Hide groups
        /*for (var i = 0; i < obj.groups.length; i++) {
            if (numVisibleItems(obj.groups[i].querySelectorAll('.jdropdown-item'))) {
                obj.groups[i].children[0].style.display = '';
            } else {
                obj.groups[i].children[0].style.display = 'none';
            }
        }*/
    }

    obj.updateLabel = function() {
        // Update label
        header.value = obj.getText();
    }

    obj.open = function() {
        if (jSuites.dropdown.current != el) {
            if (jSuites.dropdown.current) {
                jSuites.dropdown.current.dropdown.close();
            }
            jSuites.dropdown.current = el;
        }

        // Focus
        if (! el.classList.contains('jdropdown-focus')) {
            // Add focus
            el.classList.add('jdropdown-focus');

            // Animation
            if (jSuites.getWindowWidth() < 800) {
                if (obj.options.type == null || obj.options.type == 'picker') {
                    jSuites.slideBottom(container, 1);
                }
            }

            // Filter
            if (obj.options.autocomplete == true) {
                // Redo search
                obj.find();
                // Clear search field
                header.value = '';
                header.focus();
            }

            // Set cursor for the first or first selected element
            var cursor = (obj.selected && obj.selected[0]) ? obj.selected[0] : 0;
            obj.updateCursor(cursor);

            // Container Size
            if (! obj.options.type || obj.options.type == 'default') {
                const rect = el.getBoundingClientRect();
                const rectContainer = container.getBoundingClientRect();

                if (obj.options.position) {
                    container.style.position = 'fixed';
                    if (window.innerHeight < rect.bottom + rectContainer.height) {
                        container.style.top = (rect.top - rectContainer.height - 2) + 'px';
                    } else {
                        container.style.top = (rect.top + rect.height + 1) + 'px';
                    }
                    container.style.left = rect.left + 'px';
                } else {
                    if (window.innerHeight < rect.bottom + rectContainer.height) {
                        container.style.bottom = (rect.height) + 'px';
                    } else {
                        container.style.top = '';
                        container.style.bottom = '';
                    }
                }

                container.style.minWidth = rect.width + 'px';
            }
        }

        // Events
        if (typeof(obj.options.onopen) == 'function') {
            obj.options.onopen(el);
        }
    }

    obj.close = function(ignoreEvents) {
        if (jSuites.dropdown.current) {
            // Remove controller
            jSuites.dropdown.current = null
            // Remove cursor
            obj.resetCursor();
            // Update labels
            obj.updateLabel();
            // Events
            if (! ignoreEvents && typeof(obj.options.onclose) == 'function') {
                obj.options.onclose(el);
            }
            // Blur
            if (header.blur) {
                header.blur();
            }
            // Remove focus
            el.classList.remove('jdropdown-focus');
        }

        return obj.getValue();
    }

    /**
     * Update position cursor
     */
    obj.updateCursor = function(index) {
        // Set new cursor
        if (obj.items && obj.items[index] && obj.items[index].element) {
            // Reset cursor
            obj.resetCursor();

            // Set new cursor
            obj.items[index].element.classList.add('jdropdown-cursor');

            // Update position
            obj.currentIndex = parseInt(index);
    
            // Update scroll to the cursor element
            var container = content.scrollTop;
            var element = obj.items[obj.currentIndex].element;
            content.scrollTop = element.offsetTop - element.scrollTop + element.clientTop - 95;
        }
    }

    /**
     * Reset cursor
     */
    obj.resetCursor = function() {
        // Remove current cursor
        if (obj.currentIndex != null) {
            // Remove visual cursor
            if (obj.items && obj.items[obj.currentIndex]) {
                obj.items[obj.currentIndex].element.classList.remove('jdropdown-cursor');
            }
            // Reset cursor
            obj.currentIndex = null;
        }
    }

    /**
     * Reset cursor
     */
    obj.resetSelected = function() {
        // Unselected all
        if (obj.selected) {
            // Remove visual selection
            for (var i = 0; i < obj.selected.length; i++) {
                if (obj.items[obj.selected[i]]) {
                    obj.items[obj.selected[i]].element.classList.remove('jdropdown-selected');
                }
            }
            // Reset current selected items
            obj.selected = [];
        }
    }

    /**
     * Reset cursor and selected items
     */
    obj.reset = function() {
        // Reset cursor
        obj.resetCursor();

        // Reset selected
        obj.resetSelected();

        // Update labels
        obj.updateLabel();
    }

    /**
     * First visible item
     */
    obj.firstVisible = function() {
        var newIndex = null;
        for (var i = 0; i < obj.items.length; i++) {
            if (obj.items[i].element.style.display != 'none') {
                newIndex = i;
                break;
            }
        }

        if (newIndex == null) {
            return false;
        }

        obj.updateCursor(newIndex);
    }

    /**
     * Navigation
     */
    obj.first = function() {
        var newIndex = null;
        for (var i = obj.currentIndex - 1; i >= 0; i--) {
            if (obj.items[i].element.style.display != 'none') {
                newIndex = i;
            }
        }

        if (newIndex == null) {
            return false;
        }

        obj.updateCursor(newIndex);
    }

    obj.last = function() {
        var newIndex = null;
        for (var i = obj.currentIndex + 1; i < obj.items.length; i++) {
            if (obj.items[i].element.style.display != 'none') {
                newIndex = i;
            }
        }

        if (newIndex == null) {
            return false;
        }

        obj.updateCursor(newIndex);
    }

    obj.next = function() {
        var newIndex = null;
        for (var i = obj.currentIndex + 1; i < obj.items.length; i++) {
            if (obj.items[i].element.style.display != 'none') {
                newIndex = i;
                break;
            }
        }

        if (newIndex == null) {
            return false;
        }

        obj.updateCursor(newIndex);
    }

    obj.prev = function() {
        var newIndex = null;
        for (var i = obj.currentIndex - 1; i >= 0; i--) {
            if (obj.items[i].element.style.display != 'none') {
                newIndex = i;
                break;
            }
        }

        if (newIndex == null) {
            return false;
        }

        obj.updateCursor(newIndex);
    }

    if (! jSuites.dropdown.hasEvents) {
        if ('ontouchsend' in document.documentElement === true) {
            document.addEventListener('touchsend', jSuites.dropdown.mouseup);
        } else {
            document.addEventListener('mouseup', jSuites.dropdown.mouseup);
        }
        document.addEventListener('keydown', jSuites.dropdown.onkeydown);

        jSuites.dropdown.hasEvents = true;
    }

    // Start dropdown
    obj.init();

    // Keep object available from the node
    el.dropdown = obj;

    return obj;
});

jSuites.dropdown.hasEvents = false;

jSuites.dropdown.mouseup = function(e) {
    var element = jSuites.getElement(e.target, 'jdropdown');
    if (element) {
        var dropdown = element.dropdown;
        if (e.target.classList.contains('jdropdown-header')) {
            if (element.classList.contains('jdropdown-focus') && element.classList.contains('jdropdown-default')) {
                dropdown.close();
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
            dropdown.selectIndex(e.target.parentNode.getAttribute('data-index'));
        } else if (e.target.classList.contains('jdropdown-description')) {
            dropdown.selectIndex(e.target.parentNode.getAttribute('data-index'));
        } else if (e.target.classList.contains('jdropdown-title')) {
            dropdown.selectIndex(e.target.parentNode.parentNode.getAttribute('data-index'));
        } else if (e.target.classList.contains('jdropdown-close') || e.target.classList.contains('jdropdown-backdrop')) {
            // Close
            dropdown.close();
        }

        e.stopPropagation();
        e.preventDefault();
    } else {
        if (jSuites.dropdown.current) {
            jSuites.dropdown.current.dropdown.close();
        }
    }
}


// Keydown controls
jSuites.dropdown.onkeydown = function(e) {
    if (jSuites.dropdown.current) {
        // Element
        var element = jSuites.dropdown.current.dropdown;
        // Index
        var index = element.currentIndex;

        if (e.shiftKey) {

        } else {
            if (e.which == 13 || e.which == 27 || e.which == 35 || e.which == 36 || e.which == 38 || e.which == 40) {
                // Move cursor
                if (e.which == 13) {
                    element.selectIndex(index)
                } else if (e.which == 38) {
                    if (index == null) {
                        element.firstVisible();
                    } else if (index > 0) {
                        element.prev();
                    }
                } else if (e.which == 40) {
                    if (index == null) {
                        element.firstVisible();
                    } else if (index + 1 < element.options.data.length) {
                        element.next();
                    }
                } else if (e.which == 36) {
                    element.first();
                } else if (e.which == 35) {
                    element.last();
                } else if (e.which == 27) {
                    element.close();
                }

                e.stopPropagation();
                e.preventDefault();
            }
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
                        id: el.children[j].children[i].value,
                        name: el.children[j].children[i].innerHTML,
                        group: el.children[j].getAttribute('label'),
                    });
                }
            } else {
                options.data.push({
                    id: el.children[j].value,
                    name: el.children[j].innerHTML,
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

jSuites.image = (function(el, options) {
    var obj = {};
    obj.options = {};

    // Default configuration
    var defaults = {
        minWidth: false,
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

    // Add image
    obj.addImage = function(file) {
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

        return img;
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
                        file: canvas.toDataURL(),
                        extension: file.name.substr(file.name.lastIndexOf('.') + 1),
                        name: file.name,
                        size: file.size,
                        lastmodified: file.lastModified,
                    }
                    var newImage = obj.addImage(data);
                    el.appendChild(newImage);

                    // Onchange
                    if (typeof(obj.options.onchange) == 'function') {
                        obj.options.onchange(newImage);
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
                    var newImage = obj.addImage(data);
                    el.appendChild(newImage);

                    // Keep base64 ready to go
                    var content = canvas.toDataURL();
                    jSuites.files[data.file] = content.substr(content.indexOf(',') + 1);

                    // Onchange
                    if (typeof(obj.options.onchange) == 'function') {
                        obj.options.onchange(newImage);
                    }
                });
            };

            img.src = src;
        }
    }

    var attachmentInput = document.createElement('input');
    attachmentInput.type = 'file';
    attachmentInput.setAttribute('accept', 'image/*');
    attachmentInput.onchange = function() {
        for (var i = 0; i < this.files.length; i++) {
            obj.addFromFile(this.files[i]);
        }
    }

    el.addEventListener("dblclick", function(e) {
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

/**
 * (c) jLoading
 * https://github.com/paulhodel/jtools
 *
 * @author: Paul Hodel <paul.hodel@gmail.com>
 * @description: Page loading spin
 */

jSuites.loading = (function() {
    var obj = {};

    var loading = document.createElement('div');
    loading.className = 'jloading';

    obj.show = function() {
        document.body.appendChild(loading);
    };

    obj.hide = function() {
        document.body.removeChild(loading);
    };

    return obj;
})();

/**
 * (c) jTools Input Mask
 * https://github.com/paulhodel/jtools
 *
 * @author: Paul Hodel <paul.hodel@gmail.com>
 * @description: Input mask
 */

jSuites.mask = (function() {
    var obj = {};
    var index = 0;
    var values = []
    var pieces = [];

    obj.run = function(value, mask, decimal) {
        if (value && mask) {
            if (! decimal) {
                decimal = '.';
            }
            if (value == Number(value)) {
                var number = (''+value).split('.');
                var value = number[0];
                var valueDecimal = number[1];
            } else {
                value = '' + value;
            }
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
        var mask = e.target.getAttribute('data-mask');
        if (mask && e.keyCode > 46) {
            index = 0;
            values = [];
            // Create mask token
            obj.prepare(mask);
            // Current value
            if (e.target.selectionStart < e.target.selectionEnd) {
                var currentValue = e.target.value.substring(0, e.target.selectionStart); 
            } else {
                var currentValue = e.target.value;
            }
            if (currentValue) {
                // Checking current value
                for (var i = 0; i < currentValue.length; i++) {
                    if (currentValue[i] != null) {
                        obj.process(currentValue[i]);
                    }
                }
            }
            // New input
            obj.process(obj.fromKeyCode(e));
            // Update value to the element
            e.target.value = values.join('');
            if (pieces.length == values.length && pieces[pieces.length-1].length == values[values.length-1].length) {
                e.target.setAttribute('data-completed', 'true');
            } else {
                e.target.setAttribute('data-completed', 'false');
            }
            // Prevent default
            e.preventDefault();
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
            } else if (pieces[index] == '#' || pieces[index] == '#.##' || pieces[index] == '#,##' || pieces[index] == '# ##') {
                if (input.match(/[0-9]/g)) {
                    if (pieces[index] == '#.##') {
                        var separator = '.';
                    } else if (pieces[index] == '#,##') {
                        var separator = ',';
                    } else if (pieces[index] == '# ##') {
                        var separator = ' ';
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

    return obj;
})();

/**
 * (c) jSuites modal
 * https://github.com/paulhodel/jsuites
 *
 * @author: Paul Hodel <paul.hodel@gmail.com>
 * @description: Modal
 */

jSuites.modal = (function(el, options) {
    var obj = {};
    obj.options = {};

    // Default configuration
    var defaults = {
        url: null,
        onopen: null,
        onclose: null,
        closed: false,
        width: null,
        height: null,
        title: null,
    };

    // Loop through our object
    for (var property in defaults) {
        if (options && options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    // Title
    if (! obj.options.title && el.getAttribute('title')) {
        obj.options.title = el.getAttribute('title');
    }

    var temp = document.createElement('div');
    for (var i = 0; i < el.children.length; i++) {
        temp.appendChild(el.children[i]);
    }

    obj.content = document.createElement('div');
    obj.content.className = 'jmodal_content';
    obj.content.innerHTML = el.innerHTML;

    for (var i = 0; i < temp.children.length; i++) {
        obj.content.appendChild(temp.children[i]);
    }

    obj.container = document.createElement('div');
    obj.container.className = 'jmodal';
    obj.container.appendChild(obj.content);

    if (obj.options.width) {
        obj.container.style.width = obj.options.width;
    }
    if (obj.options.height) {
        obj.container.style.height = obj.options.height;
    }
    if (obj.options.title) {
        obj.container.setAttribute('title', obj.options.title);
    } else {
        obj.container.classList.add('no-title');
    }
    el.innerHTML = '';
    el.style.display = 'none';
    el.appendChild(obj.container);

    // Backdrop
    var backdrop = document.createElement('div');
    backdrop.className = 'jmodal_backdrop';
    el.appendChild(backdrop);

    obj.open = function() {
        el.style.display = 'block';
        // Fullscreen
        const rect = obj.container.getBoundingClientRect();
        if (jSuites.getWindowWidth() < rect.width) {
            obj.container.style.top = '';
            obj.container.style.left = '';
            obj.container.classList.add('jmodal_fullscreen');
            jSuites.slideBottom(obj.container, 1);
        } else {
            backdrop.style.display = 'block';
        }
        // Current
        jSuites.modal.current = obj;
        // Event
        if (typeof(obj.options.onopen) == 'function') {
            obj.options.onopen(el, obj);
        }
    }

    obj.resetPosition = function() {
        obj.container.style.top = '';
        obj.container.style.left = '';
    }

    obj.isOpen = function() {
        return el.style.display != 'none' ? true : false;
    }

    obj.close = function() {
        el.style.display = 'none';
        // Backdrop
        backdrop.style.display = '';
        // Current
        jSuites.modal.current = null;
        // Remove fullscreen class
        obj.container.classList.remove('jmodal_fullscreen');
        // Event
        if (typeof(obj.options.onclose) == 'function') {
            obj.options.onclose(el, obj);
        }
    }

    if (! jSuites.modal.hasEvents) {
        jSuites.modal.current = obj;

        if ('ontouchstart' in document.documentElement === true) {
            document.addEventListener("touchstart", jSuites.modal.mouseDownControls);
        } else {
            document.addEventListener('mousedown', jSuites.modal.mouseDownControls);
            document.addEventListener('mousemove', jSuites.modal.mouseMoveControls);
            document.addEventListener('mouseup', jSuites.modal.mouseUpControls);
        }

        document.addEventListener('keydown', jSuites.modal.keyDownControls);

        jSuites.modal.hasEvents = true;
    }

    if (obj.options.url) {
        jSuites.ajax({
            url: obj.options.url,
            method: 'GET',
            success: function(data) {
                obj.content.innerHTML = data;

                if (! obj.options.closed) {
                    obj.open();
                }
            }
        });
    } else {
        if (! obj.options.closed) {
            obj.open();
        }
    }

    // Keep object available from the node
    el.modal = obj;

    return obj;
});

jSuites.modal.current = null;
jSuites.modal.position = null;

jSuites.modal.keyDownControls = function(e) {
    if (e.which == 27) {
        if (jSuites.modal.current) {
            jSuites.modal.current.close();
        }
    }
}

jSuites.modal.mouseUpControls = function(e) {
    if (jSuites.modal.current) {
        jSuites.modal.current.container.style.cursor = 'auto';
    }
    jSuites.modal.position = null;
}

jSuites.modal.mouseMoveControls = function(e) {
    if (jSuites.modal.current && jSuites.modal.position) {
        if (e.which == 1 || e.which == 3) {
            var position = jSuites.modal.position;
            jSuites.modal.current.container.style.top = (position[1] + (e.clientY - position[3]) + (position[5] / 2)) + 'px';
            jSuites.modal.current.container.style.left = (position[0] + (e.clientX - position[2]) + (position[4] / 2)) + 'px';
            jSuites.modal.current.container.style.cursor = 'move';
        } else {
            jSuites.modal.current.container.style.cursor = 'auto';
        }
    }
}

jSuites.modal.mouseDownControls = function(e) {
    jSuites.modal.position = [];

    if (e.target.classList.contains('jmodal')) {
        setTimeout(function() {
            // Get target info
            var rect = e.target.getBoundingClientRect();

            if (e.changedTouches && e.changedTouches[0]) {
                var x = e.changedTouches[0].clientX;
                var y = e.changedTouches[0].clientY;
            } else {
                var x = e.clientX;
                var y = e.clientY;
            }

            if (rect.width - (x - rect.left) < 50 && (y - rect.top) < 50) {
                setTimeout(function() {
                    jSuites.modal.current.close();
                }, 100);
            } else {
                if (e.target.getAttribute('title') && (y - rect.top) < 50) {
                    if (document.selection) {
                        document.selection.empty();
                    } else if ( window.getSelection ) {
                        window.getSelection().removeAllRanges();
                    }

                    jSuites.modal.position = [
                        rect.left,
                        rect.top,
                        e.clientX,
                        e.clientY,
                        rect.width,
                        rect.height,
                    ];
                }
            }
        }, 100);
    }
}




    return jSuites;

})));