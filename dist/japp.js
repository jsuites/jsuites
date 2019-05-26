var jApp = function(options) {
    var obj = {}

    // Find root element
    obj.el = document.querySelector('.app');
    // Backdrop
    obj.backdrop = document.createElement('div');
    obj.backdrop.classList.add('jbackdrop');

    // Default behavior
    document.addEventListener('keydown', function(e) {
        if (e.which == 27) {
            var nodes = document.querySelectorAll('.jmodal');
            if (nodes.length > 0) {
                for (var i = 0; i < nodes.length; i++) {
                    nodes[i].modal.close();
                }
            }

            var nodes = document.querySelectorAll('.jslider');
            if (nodes.length > 0) {
                for (var i = 0; i < nodes.length; i++) {
                    nodes[i].slider.close();
                }
            }
        }

        // Verify mask
        if (jApp.mask) {
            jApp.mask.apply(e);
        }
    });
    
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
        var x = (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
        var y = (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);

        return [ x, y ];
    }

    obj.click = function(el) {
        // Create our event (with options)
        var evt = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
        });
        // If cancelled, don't dispatch our event
        var canceled = !el.dispatchEvent(evt);
    }

    obj.getFiles = function(element) {
        if (! element) {
            console.error('No element defined in the arguments of your method');
        }
        // Clear current data
        var inputs = element.querySelectorAll('input');
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].remove();
        }

        // Get attachments
        var files = element.querySelectorAll('.jfile');

        if (files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                var extension = files[i].getAttribute('data-name').toLowerCase().split('.');
                var input = document.createElement('input');
                input.setAttribute('type', 'hidden');
                input.setAttribute('name', 'files[' + i + '][name]');
                input.value = files[i].getAttribute('data-name').toLowerCase()
                files[i].parentNode.appendChild(input);

                var input = document.createElement('input');
                input.setAttribute('type', 'hidden');
                input.setAttribute('name', 'files[' + i + '][extension]');
                input.value = extension[1];
                files[i].parentNode.appendChild(input);

                var input = document.createElement('input');
                input.setAttribute('type', 'hidden');
                input.setAttribute('name', 'files[' + i + '][size]');
                input.value = files[i].getAttribute('data-size');
                files[i].parentNode.appendChild(input);

                var input = document.createElement('input');
                input.setAttribute('type', 'hidden');
                input.setAttribute('name', 'files[' + i + '][lastmodified]');
                input.value = files[i].getAttribute('data-lastmodified');
                files[i].parentNode.appendChild(input);

                if (files[i].getAttribute('data-cover')) {
                    var input = document.createElement('input');
                    input.setAttribute('type', 'hidden');
                    input.setAttribute('name', 'files[' + i + '][cover]');
                    input.value = 1;
                    files[i].parentNode.appendChild(input);
                }

                // File thumbs
                var content = files[i].getAttribute('data-thumbs');

                if (content) {
                    if (content.substr(0,4) == 'data') {
                        var content = files[i].getAttribute('data-thumbs').split(',');

                        var input = document.createElement('input');
                        input.setAttribute('type', 'hidden');
                        input.setAttribute('name', 'files[' + i + '][thumbs]');
                        input.value = content[1];
                        files[i].parentNode.appendChild(input);
                    } else {
                        var input = document.createElement('input');
                        input.setAttribute('type', 'hidden');
                        input.setAttribute('name', 'files[' + i + '][thumbs]');
                        input.value = content;
                        files[i].parentNode.appendChild(input);
                    }
                }

                // File content
                var content = files[i].getAttribute('src');

                if (content.substr(0,4) == 'data') {
                    var content = files[i].getAttribute('src').split(',');

                    var input = document.createElement('input');
                    input.setAttribute('type', 'hidden');
                    input.setAttribute('name', 'files[' + i + '][content]');
                    input.value = content[1];
                    files[i].parentNode.appendChild(input);
                } else {
                    if (files[i].classList.contains('jremove')) {
                        var input = document.createElement('input');
                        input.setAttribute('type', 'hidden');
                        input.setAttribute('name', 'files[' + i + '][remove]');
                        input.value = 1;
                        files[i].parentNode.appendChild(input);
                    }
                }
            }
        }
    }

    return obj;
}();


/**
 * Date & Datetime picker v1.0.1
 * Author: paul.hodel@gmail.com
 * https://github.com/paulhodel/jtools
 */

jApp.calendar = (function(el, options) {
    var obj = {};
    obj.options = {};

    // Global container
    if (! jApp.dropdown.current) {
        jApp.dropdown.current = null;
    }

    // Default configuration
    var defaults = {
        // Date format
        format:'DD/MM/YYYY',
        // Allow keyboard date entry
        readonly:0,
        // Today is default
        today:0,
        // Show timepicker
        time:0,
        // Show the reset button
        resetButton:true,
        // Placeholder
        placeholder:'',
        // Translations can be done here
        months:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        weekdays:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
        weekdays_short:['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        // Value
        value:null,
        // Events
        onclose:null,
        onchange:null,
        // Fullscreen (this is automatic set for screensize < 800)
        fullscreen:false,
        // Internal mode controller
        mode:null,
        position:null,
    };

    // Loop through our object
    for (var prop in defaults) {
        if (defaults.hasOwnProperty(prop)) {
            obj.options[prop] = options && options[prop] ? options[prop] : defaults[prop];
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
    calendarSelectHour.className = 'jcalendar-hour';
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
    calendarSelectMin.className = 'jcalendar-min';
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
        if (jApp.calendar.current) {
            if (jApp.calendar.current != obj) {
                jApp.calendar.current.close();
            }
        }

        if (! jApp.calendar.current) {
            jApp.calendar.current = obj;
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
            if (jApp.getWindowWidth() < 800 || obj.options.fullscreen) {
                // Full
                calendar.classList.add('jcalendar-fullsize');
                // Animation
                calendarContent.classList.add('slide-bottom-in');
            } else {
                const rect = el.getBoundingClientRect();
                const rectContent = calendarContent.getBoundingClientRect();

                if (obj.options.position) {
                    calendarContainer.style.position = 'fixed';
                    if (window.innerHeight < rect.bottom + rectContent.height) {
                        calendarContainer.style.top = rect.top - (rectContent.height + 2);
                    } else {
                        calendarContainer.style.top = rect.top + rect.height + 2;
                    }
                } else {
                    if (window.innerHeight < rect.bottom + rectContent.height) {
                        calendarContainer.style.bottom = (1 * rect.height + rectContent.height + 2);
                    } else {
                        calendarContainer.style.top = 2; 
                    }
                }
            }
        }
    }

    obj.close = function (ignoreEvents, update) {
        if (jApp.calendar.current) {
            jApp.calendar.current =  null;

            if (update != false && el.tagName == 'INPUT') {
                obj.setValue(obj.getValue());
            }

            if (! ignoreEvents && typeof(obj.options.onclose) == 'function') {
                obj.options.onclose(el);
            }

            // Animation
            calendarContainer.classList.remove('slide-bottom-in');
            calendar.classList.remove('jcalendar-focus');
        }

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
                obj.date[1] = 1;
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
        nd = date.getDate();

        var date = new Date(year, month-1, 0, hour, min);
        fd = date.getDay() + 1;

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
            month = parseInt(i) + 1;
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
        return jApp.calendar.getDateString(value, format);
    }

    obj.fromFormatted = function (value, format) {
        return jApp.calendar.extractDateFromString(value, format);
    }

    // Element
    el.setAttribute('autocomplete', 'off');
    el.setAttribute('data-mask', obj.options.format.toLowerCase());
    if (obj.options.readonly) {
        el.setAttribute('readonly', 'readonly');
    }
    if (obj.options.placeholder) {
        el.setAttribute('placeholder', obj.options.placeholder);
    }
    el.addEventListener("focus", function(e) {
        obj.open();
    });
    el.addEventListener("keyup", function(e) {
        if (e.target.value && e.target.value.length > 3) {
            var test = jApp.calendar.extractDateFromString(e.target.value, obj.options.format);
            if (test) {
                console.log(test);
                if (e.target.getAttribute('data-completed') == 'true') {
                    obj.setValue(test);
                }
            }
        }
    });
    el.parentNode.insertBefore(calendar, el.nextSibling);

    el.calendar = obj;

    return obj;
});

// Helper to extract date from a string
jApp.calendar.extractDateFromString = function(date, format) {
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

    if (test == 1 && date.length == format.length) {
        // Update source
        var data = y + '-' + m + '-' + d + ' ' + h + ':' +  i + ':' + s;

        return data;
    }

    return '';
}

// Helper to convert date into string
jApp.calendar.getDateString = function(value, format) {
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
            m = h[1];
            s = h[2];
            h = h[0];
        } else {
            h = '00';
            m = '00';
            s = '00';
        }

        d = d[0].split('-');

        if (d[0] && d[1] && d[2] && d[0] > 0 && d[1] > 0 && d[1] < 13 && d[2] > 0 && d[2] < 32) {
            var calendar = new Date(d[0], d[1]-1, d[2]);
            var weekday = new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday');

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

jApp.calendar.getElement = function(element) {
    var jcalendarElement = false;

    function path (element) {
        if (element.className) {
            if (element.classList.contains('jcalendar')) {
                jcalendarElement = true;
            }
        }

        if (element.parentNode) {
            path(element.parentNode);
        }
    }

    path(element);

    return jcalendarElement;
}

jApp.calendar.mouseDownControls = function(e) {
    if (! jApp.calendar.getElement(e.target)) {
        if (jApp.calendar.current) {
            jApp.calendar.current.close(false, false);
        }
    } else {
        if (jApp.calendar.current) {
            var action = e.target.className;

            // Object id
            if (action == 'jcalendar-prev') {
                jApp.calendar.current.prev();
            } else if (action == 'jcalendar-next') {
                jApp.calendar.current.next();
            } else if (action == 'jcalendar-month') {
                jApp.calendar.current.getMonths();
            } else if (action == 'jcalendar-year') {
                jApp.calendar.current.getYears();
            } else if (action == 'jcalendar-set-year') {
                jApp.calendar.current.date[0] = e.target.innerText;
                jApp.calendar.current.getDays();
            } else if (action == 'jcalendar-set-month') {
                jApp.calendar.current.date[1] = parseInt(e.target.getAttribute('data-value'));
                jApp.calendar.current.getDays();
            } else if (action == 'jcalendar-confirm' || action == 'jcalendar-update') {
                jApp.calendar.current.close();
            } else if (action == 'jcalendar-close') {
                jApp.calendar.current.close();
            } else if (action == 'jcalendar-reset') {
                jApp.calendar.current.reset();
            } else if (e.target.classList.contains('jcalendar-set-day')) {
                if (e.target.innerText) {
                    // Keep selected day
                    jApp.calendar.current.update(e.target);
                }
            }

            e.stopImmediatePropagation();
        }
    }
}

document.addEventListener("mousedown", jApp.calendar.mouseDownControls);


/**
 * Color Picker v1.0.1
 * Author: paul.hodel@gmail.com
 * https://github.com/paulhodel/jtools
 */

jApp.color = (function(el, options) {
    var obj = {};
    obj.options = {};
    obj.values = [];

    // Global container
    if (! jApp.color.current) {
        jApp.color.current = null;
    }

    // Default configuration
    var defaults = {
        placeholder:'',
        value:null,
        onclose:null,
        onchange:null,
        position:null,
    };

    // Loop through our object
    for (var prop in defaults) {
        if (defaults.hasOwnProperty(prop)) {
            obj.options[prop] = options && options[prop] ? options[prop] : defaults[prop];
        }
    }

    var x = 0;
    var y = 0;
    var z = 0;

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
          "deeppurple": {
            "50": "#ede7f6",
            "100": "#d1c4e9",
            "200": "#b39ddb",
            "300": "#9575cd",
            "400": "#7e57c2",
            "500": "#673ab7",
            "600": "#5e35b1",
            "700": "#512da8",
            "800": "#4527a0",
            "900": "#311b92",
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
          "lightblue": {
            "50": "#e1f5fe",
            "100": "#b3e5fc",
            "200": "#81d4fa",
            "300": "#4fc3f7",
            "400": "#29b6f6",
            "500": "#03a9f4",
            "600": "#039be5",
            "700": "#0288d1",
            "800": "#0277bd",
            "900": "#01579b",
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

    Object.keys(palette).forEach(function(col) {
        y = 0;
        Object.keys(palette[col]).forEach(function(shade) {
            if (! colors[y]) {
                colors[y] = [];
            }
            colors[y][x] = palette[col][shade];
            y++;
        });
        x++;
    });

    // Table container
    var container = document.createElement('div');
    container.className = 'jcolor';

    // Content
    var content = document.createElement('div');
    content.className = 'jcolor-content';

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
        if (jApp.color.current) {
            if (jApp.color.current != obj) {
                jApp.color.current.close();
            }
        }

        if (! jApp.color.current) {
            // Persist element
            jApp.color.current = obj;
            // Show colorpicker
            container.classList.add('jcolor-focus');

            const rect = el.getBoundingClientRect();
            const rectContent = content.getBoundingClientRect();

            if (obj.options.position) {
                content.style.position = 'fixed';
                if (window.innerHeight < rect.bottom + rectContent.height) {
                    content.style.top = rect.top - (rectContent.height + 2);
                } else {
                    content.style.top = rect.top + rect.height + 2;
                }
            } else {
                if (window.innerHeight < rect.bottom + rectContent.height) {
                    content.style.top = -1 * (rectContent.height + 2);
                } else {
                    content.style.top = rect.height + 2; 
                }
            }

            container.focus();
        }
    }

    /**
     * Close color pallete
     */
    obj.close = function(ignoreEvents) {
        if (jApp.color.current) {
            jApp.color.current = null;
            if (! ignoreEvents && typeof(obj.options.onclose) == 'function') {
                obj.options.onclose(el);
            }
            container.classList.remove('jcolor-focus');
        }

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

    // Select color
    container.addEventListener("click", function(e) {
        if (e.target.tagName == 'TD') {
            jApp.color.current.setValue(e.target.getAttribute('data-value'));
            jApp.color.current.close();
        }
    });

    // Possible to focus the container
    container.setAttribute('tabindex', '900');
    // Append to the table
    content.appendChild(table);
    container.appendChild(content);
    container.onblur = function(e) {
        if (jApp.color.current) {
            jApp.color.current.close();
        }
    }
    // Insert picker after the element
    el.parentNode.insertBefore(container, el);
    // Keep object available thought the node
    el.color = obj;

    if (obj.options.placeholder) {
        el.setAttribute('placeholder', obj.options.placeholder);
    }

    return obj;
});

jApp.combo = (function(el, options) {
    var obj = {};

    if (options) {
        obj.options = options;
    }

    // Reset
    if (obj.options.reset == true) {
        el.innerHTML = '';
    }

    // Blank option?
    if (obj.options.blankOption) {
        var option = document.createElement('option');
        option.value = '';
        el.appendChild(option);
    }

    // Load options from a remote URL
    if (obj.options.url) {
        fetch(obj.options.url, { headers: new Headers({ 'content-type': 'text/json' }) })
            .then(function(data) {
                data.json().then(function(data) {
                    obj.options.data = data;

                    Object.keys(data).forEach(function(k) {
                        var option = document.createElement('option');

                        if (data[k].id) {
                            option.value = data[k].id;
                            option.innerHTML = data[k].name;
                        } else {
                            option.value = k;
                            option.innerHTML = data[k];
                        }

                        el.appendChild(option);
                    });

                    if (obj.options.value) {
                        $(select).val(obj.options.value);
                    }

                    if (typeof(obj.options.onload) == 'function') {
                        obj.options.onload(el);
                    }
                })
            });
    } else if (options.numeric) {
        for (var i = obj.options.numeric[0]; i <= obj.options.numeric[1]; i++) {
            var option = document.createElement('option');
            option.value = i;
            option.innerHTML = i;
            el.appendChild(option);
        }
    }

    el.combo = obj;

    return obj;
});


/**
 * Contextmenu v1.0.1
 * Author: paul.hodel@gmail.com
 * https://github.com/paulhodel/jtools
 */

jApp.contextmenu = (function(el, options) {
    var obj = {};
    obj.options = {};
    obj.options.items = options.items && options.items.length ? options.items : {};

    obj.menu = document.createElement('ul');
    obj.menu.classList.add('jcontextmenu');
    obj.menu.setAttribute('tabindex', '900');
    obj.menu.addEventListener('blur', (e) => {
        obj.menu.classList.remove('jcontextmenu-focus');
    });

    if (typeof(options.onclick) == 'function') {
        obj.menu.onclick = options.onclick;
    }

    /**
     * Open contextmenu
     */
    obj.open = function(e, items) {
        e = e || window.event;

        if (items) {
            obj.options.items = items;
        }

        // Reset content
        obj.menu.innerHTML = '';

        // Append items
        for (var i = 0; i < obj.options.items.length; i++) {
            if (obj.options.items[i].type && obj.options.items[i].type == 'line') {
                var itemContainer = document.createElement('hr');
            } else {
                var itemContainer = document.createElement('li');
                var itemText = document.createElement('a');
                itemText.innerHTML = obj.options.items[i].title;

                if (obj.options.items[i].disabled) {
                    itemContainer.className = 'jcontextmenu-disabled';
                } else if (obj.options.items[i].onclick) {
                    itemContainer.onclick = obj.options.items[i].onclick;
                }
                itemContainer.appendChild(itemText);

                if (obj.options.items[i].shortcut) {
                    var itemShortCut = document.createElement('span');
                    itemShortCut.innerHTML = obj.options.items[i].shortcut;
                    itemContainer.appendChild(itemShortCut);
                }
            }

            obj.menu.appendChild(itemContainer);
        }

        let position = jApp.getPosition(e);

        obj.menu.classList.add('jcontextmenu-focus');
        obj.menu.style.top = position[1];
        obj.menu.style.left = position[0];
        obj.menu.focus();
    }

    /**
     * Close
     */
    obj.close = function() {
        obj.menu.classList.remove('jcontextmenu-focus');
    }

    el.appendChild(obj.menu);
    el.contextmenu = obj;

    return obj;
});

/**
 * Dialog v1.0.1
 * Author: paul.hodel@gmail.com
 * https://github.com/paulhodel/jtools
 */
 
jApp.dialog = (function() {
    var obj = {};
    obj.options = {};

    var dialog = document.createElement('div');
    dialog.className = 'jdialog';
    dialog.id = 'dialog';

    var dialogHeader = document.createElement('div');
    dialogHeader.className = 'jdialog-header';

    var dialogTitle = document.createElement('div');
    dialogTitle.className = 'jdialog-title';
    dialogHeader.appendChild(dialogTitle);

    var dialogMessage = document.createElement('div');
    dialogMessage.className = 'jdialog-message';
    dialogHeader.appendChild(dialogMessage);

    var dialogFooter = document.createElement('div');
    dialogFooter.className = 'jdialog-footer';

    var dialogContainer = document.createElement('div');
    dialogContainer.className = 'jdialog-container';
    dialogContainer.appendChild(dialogHeader);
    dialogContainer.appendChild(dialogFooter);

    // Confirm
    var dialogConfirm = document.createElement('div');
    var dialogConfirmButton = document.createElement('input');
    dialogConfirmButton.value = obj.options.confirmLabel;
    dialogConfirmButton.type = 'button';
    dialogConfirmButton.onclick = function() {
        if (typeof(obj.options.onconfirm) == 'function') {
            obj.options.onconfirm();
        }
        obj.close();
    };
    dialogConfirm.appendChild(dialogConfirmButton);
    dialogFooter.appendChild(dialogConfirm);

    // Cancel
    var dialogCancel = document.createElement('div');
    var dialogCancelButton = document.createElement('input');
    dialogCancelButton.value = obj.options.cancelLabel;
    dialogCancelButton.type = 'button';
    dialogCancelButton.onclick = function() {
        if (typeof(obj.options.oncancel) == 'function') {
            obj.options.oncancel();
        }
        obj.close();
    }
    dialogCancel.appendChild(dialogCancelButton);
    dialogFooter.appendChild(dialogCancel);

    // Dialog
    dialog.appendChild(dialogContainer);

    obj.open = function(options) {
        obj.options = options;

        if (obj.options.title) {
            dialogTitle.innerHTML = obj.options.title;
        }

        if (obj.options.message) {
            dialogMessage.innerHTML = obj.options.message;
        }

        if (! obj.options.confirmLabel) {
            obj.options.confirmLabel = 'OK';
        }
        dialogConfirmButton.value = obj.options.confirmLabel;

        if (! obj.options.cancelLabel) {
            obj.options.cancelLabel = 'Cancel';
        }
        dialogCancelButton.value = obj.options.cancelLabel;

        if (obj.options.type == 'confirm') {
            dialogCancelButton.parentNode.style.display = '';
        } else {
            dialogCancelButton.parentNode.style.display = 'none';
        }

        // Append element to the app
        dialog.style.opacity = 100;
        jApp.el.appendChild(dialog);

        // Show
        setTimeout(function() {
            dialogContainer.style.opacity = 100;
        }, 0);
    };

    obj.close = function() {
        dialog.style.opacity = 0;
        dialogContainer.style.opacity = 0;
        setTimeout(function() {
            dialog.remove();
        }, 100);
    };

    return obj;
})();

/**
 * (c) 2013 jDropdown
 * http://www.github.com/paulhodel/jdropdown
 *
 * @author: Paul Hodel <paul.hodel@gmail.com>
 * @description: Custom dropdowns
 */

jApp.dropdown = (function(el, options) {
    var obj = {};
    obj.options = {};
    obj.items = [];
    obj.groups = [];

    if (options) {
        obj.options = options;
    }

    // Global container
    if (! jApp.dropdown.current) {
        jApp.dropdown.current = null;
    }

    // Default configuration
    var defaults = {
        data: [],
        multiple: false,
        autocomplete: false,
        type:null,
        width:'200px',
        opened:false,
        onchange:null,
        onopen:null,
        onclose:null,
        onblur:null,
        value:null,
        placeholder:'',
    };

    // Loop through our object
    for (var prop in defaults) {
        if (defaults.hasOwnProperty(prop)) {
            obj.options[prop] = options && options[prop] ? options[prop] : defaults[prop];
        }
    }

    // Create dropdown
    el.classList.add('jdropdown');
 
    if (obj.options.type == 'searchbar') {
        el.classList.add('jdropdown-searchbar');
    } else if (obj.options.type == 'list') {
        el.classList.add('jdropdown-list');
    } else if (obj.options.type == 'picker') {
        el.classList.add('jdropdown-picker');
    } else {
        if (jApp.getWindowWidth() < 800) {
            el.classList.add('jdropdown-picker');
            obj.options.type = 'picker';
        } else {
            if (obj.options.width) {
                el.style.width = obj.options.width;
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
        header.addEventListener('keyup', function(e) {
            obj.find(header.value);
        });
    } else {
        header.setAttribute('readonly', 'readonly');
    }

    // Place holder
    if (obj.options.placeholder) {
        header.setAttribute('placeholder', obj.options.placeholder);
    }

    // Append elements
    containerHeader.appendChild(header);
    container.appendChild(closeButton);
    container.appendChild(content);
    el.appendChild(containerHeader);
    el.appendChild(container);
    el.appendChild(backdrop);

    obj.init = function() {
        if (obj.options.url) {
            fetch(obj.options.url, { headers: new Headers({ 'content-type': 'text/json' }) })
                .then(function(data) {
                    data.json().then(function(data) {
                        if (data) {
                            obj.options.data = data;
                            obj.setData();
                        }
                    })
                });
        } else {
            obj.setData();
        }

        // Values
        obj.setValue(obj.options.value);

        if (obj.options.opened == true) {
            obj.open();
        }

        // Fix width - Workaround important to get the correct width
        if (obj.options.type == 'default') {
            setTimeout(() => container.style.minWidth = header.outerWidth, 0);
        }
    }

    obj.setUrl = function(url) {
        obj.options.url = url;
        fetch(obj.options.url, { headers: new Headers({ 'content-type': 'text/json' }) })
            .then(function(data) {
                data.json().then(function(data) {
                    obj.setData(data);
                })
            });
    }

    obj.setData = function(data) {
        if (data) {
            obj.options.data = data;
        } else {
            var data = obj.options.data;
        }

        // Make sure the content container is blank
        content.innerHTML = '';

        // Containers
        var items = [];
        var groups = [];

        // Foreach in the data to create all items
        if (data.length) {
            data.forEach(function(v, k) {
                // Compatibility
                if (typeof(v) != 'object') {
                    var value = v;
                    v = {}
                    v.id = value;
                    v.name = value;

                    // Fix array
                    obj.options.data[k] = v;
                }

                // Create item
                items[k] = document.createElement('div');
                items[k].className = 'jdropdown-item';
                items[k].value = v.id;
                items[k].text = v.name;

                // Image
                if (v.image) {
                    var image = document.createElement('img');
                    image.className = 'jdropdown-image';
                    image.src = v.image;
                    if (! v.title) {
                       image.classList.add('jdropdown-image-small');
                    }
                    items[k].appendChild(image);
                }

                // Set content
                var node = document.createElement('div');
                node.className = 'jdropdown-description';
                node.innerHTML = v.name;
                items[k].appendChild(node);

                // Title
                if (v.title) {
                    var title = document.createElement('div');
                    title.className = 'jdropdown-title';
                    title.innerHTML = v.title;
                    node.appendChild(title);
                }

                // Append to the container
                if (v.group) {
                    if (! groups[v.group]) {
                        groups[v.group] = document.createElement('div');
                        groups[v.group].className = 'jdropdown-group-items';
                    }
                    groups[v.group].appendChild(items[k]);
                } else {
                    content.appendChild(items[k]);
                }
            });

            // Append groups in case exists
            if (Object.keys(groups).length > 0) {
                Object.keys(groups).forEach(function(v, k) {
                    var group = document.createElement('div');
                    group.className = 'jdropdown-group';
                    group.innerHTML = '<div class="jdropdown-group-name">' + v + '<i class="jdropdown-group-arrow jdropdown-group-arrow-down"></i></div>';
                    group.appendChild(groups[v]);
                    obj.groups.push(group);
                    content.appendChild(group);
                });
            }

            // Add index property
            var items = content.querySelectorAll('.jdropdown-item');
            [...items].forEach(function(v, k) {
                obj.items[k] = v;
                v.setAttribute('data-index', k);
            });
        }

        // Reset value
        obj.setValue(obj.options.value ? obj.options.value : '');
    }

    obj.getText = function(asArray) {
        // Result
        var result = [];
        // Get selected items
        var items = el.querySelectorAll('.jdropdown-selected');
        // Append options
        [...items].forEach(function(v) {
            result.push(v.text);
        });

        if (asArray) {
            return result
        } else {
            return result.join('; ');
        }
    }

    obj.getValue = function(asArray) {
        // Result
        var result = [];
        // Get selected items
        var items = el.querySelectorAll('.jdropdown-selected');
        // Append options
        [...items].forEach(function(v) {
            result.push(v.value);
        });

        if (asArray) {
            return result;
        } else {
            return result.join(';');
        }
    }

    obj.setValue = function(value) {
        // Remove values
        var items = el.querySelectorAll('.jdropdown-selected');
        for (var j = 0; j < items.length; j++) {
            items[j].classList.remove('jdropdown-selected')
        } 

        // Set values
        if (value) {
            if (typeof(value.forEach) == 'function') {
                for (var i = 0; i < obj.items.length; i++) {
                    value.forEach(function(val) {
                        if (obj.items[i].value == val) {
                            obj.items[i].classList.add('jdropdown-selected');
                        }
                    });
                }
            } else {
                for (var i = 0; i < obj.items.length; i++) {
                    if (obj.items[i].value == value) {
                        obj.items[i].classList.add('jdropdown-selected');
                    }
                }
            }
        }

        // Update labels
        obj.updateLabel();
    }

    obj.selectIndex = function(index) {
        // Focus behaviour
        if (! obj.options.multiple) {
            // Update selected item
            obj.items.forEach(function(v) {
                v.classList.remove('jdropdown-cursor');
                v.classList.remove('jdropdown-selected');
            });
            obj.items[index].classList.add('jdropdown-selected');
            obj.items[index].classList.add('jdropdown-cursor');
            // Close
            obj.close();
        } else {
            // Toggle option
            if (obj.items[index].classList.contains('jdropdown-selected')) {
                obj.items[index].classList.remove('jdropdown-selected');
                obj.items[index].classList.remove('jdropdown-cursor');
            } else {
                obj.items.forEach(function(v) {
                    v.classList.remove('jdropdown-cursor');
                });
                obj.items[index].classList.add('jdropdown-selected');
                obj.items[index].classList.add('jdropdown-cursor');
            }
            // Update cursor position
            obj.currentIndex = index;

            // Update labels for multiple dropdown
            if (! obj.options.autocomplete) {
                obj.updateLabel();
            }
        }

        // Events
        if (typeof(obj.options.onchange) == 'function') {
            var oldValue = obj.getValue();
            var newValue = obj.items[index].value;

            obj.options.onchange(el, index, oldValue, newValue);
        }
    }

    obj.selectItem = function(item) {
        var index = item.getAttribute('data-index');
        if (jApp.dropdown.current) {
            obj.selectIndex(item.getAttribute('data-index'));
        } else {
            // List
            if (obj.options.type == 'list') {
                if (! obj.options.multiple) {
                    obj.items.forEach(function(k, v) {
                        v.classList.remove('jdropdown-cursor');
                        v.classList.remove('jdropdown-selected');
                    });
                    obj.items[index].classList.add('jdropdown-selected');
                    obj.items[index].classList.add('jdropdown-cursor');
                } else {
                    // Toggle option
                    if (obj.items[index].classList.contains('jdropdown-selected')) {
                        obj.items[index].classList.remove('jdropdown-selected');
                        obj.items[index].classList.remove('jdropdown-cursor');
                    } else {
                        obj.items.forEach(function(v) {
                            v.classList.remove('jdropdown-cursor');
                        });
                        obj.items[index].classList.add('jdropdown-selected');
                        obj.items[index].classList.add('jdropdown-cursor');
                    }
                    // Update cursor position
                    obj.currentIndex = index;
                }
            }
        }
    }

    obj.find = function(str) {
        // Append options
        for (var i = 0; i < obj.items.length; i++) {
            if (str == null || obj.items[i].classList.contains('jdropdown-selected') || obj.items[i].innerHTML.toLowerCase().indexOf(str.toLowerCase()) != -1) {
                obj.items[i].style.display = '';
            } else {
                obj.items[i].style.display = 'none';
            }
        };

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
        for (var i = 0; i < obj.groups.length; i++) {
            if (numVisibleItems(obj.groups[i].querySelectorAll('.jdropdown-item'))) {
                obj.groups[i].children[0].style.display = '';
            } else {
                obj.groups[i].children[0].style.display = 'none';
            }
        }
    }

    obj.updateLabel = function() {
        // Update label
        header.value = obj.getText();
    }

    obj.open = function() {
        if (jApp.dropdown.current != el) {
            if (jApp.dropdown.current) {
                jApp.dropdown.current.dropdown.close();
            }
            jApp.dropdown.current = el;
        }

        // Focus
        if (! el.classList.contains('jdropdown-focus')) {
            // Add focus
            el.classList.add('jdropdown-focus');

            // Animation
            if (jApp.getWindowWidth() < 800) {
                if (obj.options.type == null || obj.options.type == 'picker') {
                    container.classList.add('slide-bottom-in');
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

            // Selected
            var selected = el.querySelector('.jdropdown-selected');
            // Update cursor position
            if (selected) {
                obj.updateCursor(selected.getAttribute('data-index'));
            }
            // Container Size
            if (! obj.options.type || obj.options.type == 'default') {
                const rect = el.getBoundingClientRect();
                const rectContainer = container.getBoundingClientRect();
                container.style.minWidth = rect.width + 'px';
                container.style.maxWidth = '100%';

                if (obj.options.position) {
                    container.style.position = 'fixed';
                    if (window.innerHeight < rect.bottom + rectContainer.height) {
                        container.style.top = rect.top - rectContainer.height - 2;
                    } else {
                        container.style.top = rect.top + rect.height + 1;
                    }
                } else {
                    if (window.innerHeight < rect.bottom + rectContainer.height) {
                        container.style.top = -1 * (rectContainer.height);
                    } else {
                        container.style.top = '';
                    }
                }
            }

            if (obj.options.type == 'searchbar') {
                container.style.height = (document.body.offsetHeight) + 'px';
            }
        }

        // Events
        if (typeof(obj.options.onopen) == 'function') {
            obj.options.onopen(el);
        }
    }

    obj.close = function(ignoreEvents) {
        if (jApp.dropdown.current) {
            // Remove controller
            jApp.dropdown.current = null
            // Remove cursor
            var cursor = el.querySelector('.jdropdown-cursor');
            if (cursor) {
                cursor.classList.remove('jdropdown-cursor');
            }
            // Update labels
            obj.updateLabel();
            // Events
            if (! ignoreEvents && typeof(obj.options.onclose) == 'function') {
                obj.options.onclose(el);
            }
            // Reset
            obj.currentIndex = null;
            // Blur
            header.blur();
            // Remove focus
            el.classList.remove('jdropdown-focus');
        }

        return obj.getValue();
    }

    obj.reset = function() {
        // Remove current cursor
        var cursor = el.querySelector('.jdropdown-cursor');
        if (cursor) {
            cursor.classList.remove('jdropdown-cursor');
        }
        // Unselected all
        obj.items.forEach(function(v) {
            v.classList.remove('jdropdown-selected');
        });
        // Update labels
        obj.updateLabel();
    }

    obj.first = function() {
        var newIndex = null;
        for (var i = obj.currentIndex - 1; i >= 0; i--) {
            if (obj.items[i].style.display != 'none') {
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
        for (var i = obj.currentIndex + 1; i < obj.options.data.length; i++) {
            if (obj.items[i].style.display != 'none') {
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
        for (var i = obj.currentIndex + 1; i < obj.options.data.length; i++) {
            if (obj.items[i].style.display != 'none') {
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
            if (obj.items[i].style.display != 'none') {
                newIndex = i;
                break;
            }
        }

        if (newIndex == null) {
            return false;
        }

        obj.updateCursor(newIndex);
    }

    obj.updateCursor = function(index) {
        // Update cursor
        if (obj.items[obj.currentIndex]) {
            obj.items[obj.currentIndex].classList.remove('jdropdown-cursor');
        }
        if (obj.items && obj.items[index]) {
            obj.items[index].classList.add('jdropdown-cursor');

            // Update position
            obj.currentIndex = parseInt(index);
    
            // Update scroll
            var container = content.scrollTop;
            var element = obj.items[obj.currentIndex];
            content.scrollTop = element.offsetTop - element.scrollTop + element.clientTop - 95;
        }
    }

    obj.init();

    el.dropdown = obj;

    return obj;
});

jApp.dropdown.getElement = function(element) {
    var jdropdownElement = false;

    function path (element) {
        if (element.className) {
            if (element.classList.contains('jdropdown')) {
                jdropdownElement = element;
            }
        }

        if (element.parentNode) {
            path(element.parentNode);
        }
    }

    path(element);

    return jdropdownElement;
}

jApp.dropdown.onclick = function(e) {
    var element = jApp.dropdown.getElement(e.target);

    if (element) {
        dropdown = element.dropdown;
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
        if (jApp.dropdown.current) {
            jApp.dropdown.current.dropdown.close();
        }
    }
}


// Keydown controls
jApp.dropdown.onkeydown = function(e) {
    if (jApp.dropdown.current) {
        // Element
        var element = jApp.dropdown.current.dropdown;
        // Index
        var index = element.currentIndex;

        if (e.shiftKey) {

        } else {
            if (e.which == 13 || e.which == 35 || e.which == 36 || e.which == 38 || e.which == 40) {
                // Move cursor
                if (e.which == 13) {
                    element.selectIndex(index)
                } else if (e.which == 38) {
                    if (index == null) {
                        element.updateCursor(0);
                    } else if (index > 0) {
                        element.prev();
                    }
                } else if (e.which == 40) {
                    if (index == null) {
                        element.updateCursor(0);
                    } else if (index + 1 < element.options.data.length) {
                        element.next();
                    }
                } else if (e.which == 36) {
                    element.first();
                } else if (e.which == 35) {
                    element.last();
                }

                e.stopPropagation();
                e.preventDefault();
            }
        }
    }
}

document.addEventListener('click', jApp.dropdown.onclick);
document.addEventListener('keydown', jApp.dropdown.onkeydown);

/**
 * (c) jTools Text Editor
 * https://github.com/paulhodel/jtools
 *
 * @author: Paul Hodel <paul.hodel@gmail.com>
 * @description: Inline richtext editor
 */

jApp.editor = (function(el, options) {
    if (! options) {
        options = {};
    }

    if (options.value) {
        var value = options.value;
    } else {
        var value = el.innerHTML ? el.innerHTML : ''; 
    }

    // Prepare container
    el.innerHTML = '';
    el.classList.add('jeditor-container');

    // Create editor
    var editor = document.createElement('div');
    editor.setAttribute('contenteditable', true);
    editor.setAttribute('spellcheck', false);
    editor.className = 'jeditor';
    el.appendChild(editor);

    el.setData = function(html) {
        editor.innerHTML = html;
    }

    el.getData = function() {
        return editor.innerHTML;
    }

    // Filter HTML
    el.clearHTML = function(input) {
        var stringStripper = /(class=(")?Mso[a-zA-Z]+(")?)/g;
        var output = input.replace(stringStripper, ' ');
        var commentSripper = new RegExp('<!--(.*?)-->','g');
        var output = output.replace(commentSripper, '');
        var tagStripper = new RegExp('<(/)*(meta|link|span|\\?xml:|st1:|o:|font)(.*?)>','gi');
        output = output.replace(tagStripper, '');
        var badTags = ['style', 'script','applet','embed','noframes','noscript'];
        for (var i=0; i< badTags.length; i++) {
          tagStripper = new RegExp('<'+badTags[i]+'.*?'+badTags[i]+'(.*?)>', 'gi');
          output = output.replace(tagStripper, '');
        }
        var badAttributes = ['style', 'start'];
        for (var i=0; i< badAttributes.length; i++) {
          var attributeStripper = new RegExp(' ' + badAttributes[i] + '="(.*?)"','gi');
          output = output.replace(attributeStripper, '');
        }
        return output;
    }

    // Toolbar defaults
    el.getToolbar = function() {
        if (! options.toolbar) {
            options.toolbar = [
                {
                    icon:'undo',
                    onclick: function() {
                        document.execCommand('undo');
                    }
                },
                {
                    icon:'redo',
                    onclick: function() {
                        document.execCommand('redo');
                    }
                },
                {
                    type:'divisor'
                },
                {
                    icon:'format_bold',
                    onclick: function() {
                        document.execCommand('bold');

                        if (document.queryCommandState("bold")) {
                            this.classList.add('selected');
                        } else {
                            this.classList.remove('selected');
                        }
                    }
                },
                {
                    icon:'format_italic',
                    onclick: function() {
                        document.execCommand('italic');

                        if (document.queryCommandState("italic")) {
                            this.classList.add('selected');
                        } else {
                            this.classList.remove('selected');
                        }
                    }
                },
                {
                    icon:'format_underline',
                    onclick: function() {
                        document.execCommand('underline');

                        if (document.queryCommandState("underline")) {
                            this.classList.add('selected');
                        } else {
                            this.classList.remove('selected');
                        }
                    }
                },
                /*{
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

        var toolbar = document.createElement('div');
        toolbar.className = 'jeditor-toolbar';
        //toolbar.style.visibility = 'hidden';

        for (var i = 0; i < options.toolbar.length; i++) {
            if (options.toolbar[i].icon) {
                var item = document.createElement('div');
                item.style.userSelect = 'none';
                var itemIcon = document.createElement('i');
                itemIcon.className = 'material-icons';
                itemIcon.innerHTML = options.toolbar[i].icon;
                itemIcon.onclick = options.toolbar[i].onclick;
                item.appendChild(itemIcon);
                toolbar.appendChild(item);
            } else {
                if (options.toolbar[i].type == 'divisor') {
                    var divisor = document.createElement('div');
                    divisor.className = 'jeditor-toolbar-divisor';
                    toolbar.appendChild(divisor);
                }
            }
        }

        return toolbar;
    }

    // Tooolbar
    if (options.allowToolbar) {
        var toolbar = el.getToolbar();
        el.appendChild(toolbar);
    }

    // Set value
    editor.innerHTML = value;

    // Click
    if (typeof(options.onclick) == 'function') {
        el.addEventListener('click', options.onclick);
    }

    // Show Toolbar
    editor.addEventListener('focus', function(e) {
        if (toolbar) {
            //toolbar.style.visibility = '';
        }
    });

    // Hide Toolbar
    editor.addEventListener('blur', function(e) {
        if (toolbar) {
            //toolbar.style.visibility = 'hidden';
        }
    });

    // Paste
    el.addEventListener('paste', function(e) {
        let paste = (e.clipboardData || window.clipboardData).getData('text');
        paste = el.clearHTML(paste);
        paste = paste.split('\r\n');
        var str = '';
        if (e.path[0].nodeName == 'DIV' && ! e.path[0].classList.contains('editor')) {
            for (var i = 0; i < paste.length; i++) {
                if (paste[i]) {
                    str += paste[i] + "\n";
                }
            }
        } else {
            for (var i = 0; i < paste.length; i++) {
                if (paste[i]) {
                    str += '<div>' + paste[i] + '</div>';
                } else {
                    str += '<div><br></div>';
                }
            }
        }
        document.execCommand('insertHtml', false, str);
        e.preventDefault();
    });

    el.options = options;

    return el;
});

jApp.image = (function(el, options) {
    var obj = {};
    obj.options = {};

    // Default configuration
    var defaults = {
        minWidth:false,
        onchange:null,
        singleFile:true,
        text:{
            extensionNotAllowed:'The extension is not allowed',
            imageTooSmall:'The resolution is too low, try a image with a better resolution. width > 800px',
        }
    };

    // Loop through our object
    for (var prop in defaults) {
        if (defaults.hasOwnProperty(prop)) {
            obj.options[prop] = options && options[prop] ? options[prop] : defaults[prop];
        }
    }

    // Upload icon
    el.classList.add('jupload');

    // Add image
    obj.addImage = function(file) {
        var img = document.createElement('img');
        img.setAttribute('data-lastmodified', file.size);
        img.setAttribute('data-name', file.name);
        img.setAttribute('data-size', file.size);
        img.setAttribute('data-thumbs', file.thumbs);
        img.setAttribute('data-cover', file.cover ? 1 : 0);
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
        if (obj.options.singleFile == true) {
            el.innerHTML = '';
        }

        var type = file.type.split('/');
        if (type[0] == 'image') {
            var image = new FileReader();
            image.addEventListener("load", function (v) {

                var img = document.createElement('img');
                img.setAttribute('data-lastModified', file.lastModified);
                img.setAttribute('data-name', file.name);
                img.setAttribute('data-size', file.size);
                img.setAttribute('src', v.srcElement.result);
                el.appendChild(img);

                setTimeout(function() {
                    if (obj.options.minWidth && (parseInt(img.width) < parseInt(obj.options.minWidth))) {
                        img.remove();
                        alert(obj.options.text.imageTooSmall);
                    } else {
                        if (typeof(obj.options.onchange) == 'function') {
                            obj.options.onchange(img);
                        }
                    }
                }, 0);
            }, false);

            image.readAsDataURL(file);
        } else {
            alert(text.extentionNotAllowed);
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

    el.addEventListener("dblclick", (e) => {
        var evt = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
        });

        attachmentInput.dispatchEvent(evt);
    });

    el.addEventListener('dragenter', (e) => {
        el.style.border = '1px dashed #000';
    });

    el.addEventListener('dragleave', (e) => {
        el.style.border = '1px solid #eee';
    });

    el.addEventListener('dragstop', (e) => {
        el.style.border = '1px solid #eee';
    });

    el.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    el.addEventListener('drop', (e) => {
        e.preventDefault();  
        e.stopPropagation();

        var data = e.dataTransfer.getData('text/html');
        if (! data) {
            for (var i = 0; i < e.dataTransfer.files.length; i++) {
                obj.addFromFile(e.dataTransfer.files[i]);
            }
        } else {
            if (obj.options.singleFile == true) {
                el.innerHTML = '';
            }

            var template = document.createElement('template');
            template.innerHTML = data.trim();
            data = template.content.firstChild;

            var img = document.createElement('img');
            img.setAttribute('data-lastModified', '');
            img.setAttribute('data-name', '');
            img.setAttribute('data-size', '');
            el.appendChild(img);

            if (data.src.substr(0,4) == 'data') {
                img.setAttribute('src', data.src);
                img.setAttribute('data-size', data.src.length);

                if (typeof(obj.options.onchange) == 'function') {
                    obj.options.onchange(img);
                }
            } else {
                var name = data.src.split('/');
                name = name[name.length-1];
                img.setAttribute('data-name', name);

                const toDataURL = url => fetch(url)
                    .then(response => response.blob())
                    .then(blob => new Promise((resolve, reject) => {
                          const reader = new FileReader();
                          reader.onloadend = () => resolve(reader.result);
                          reader.onerror = reject;
                          reader.readAsDataURL(blob);
                    }));

                toDataURL(obj.options.parser + data.src).then(dataUrl => {
                    img.setAttribute('src', dataUrl);
                    img.setAttribute('data-size', dataUrl.length);

                    setTimeout(function() {
                        if (parseInt(img.width) < 800) {
                            img.remove();
                            alert(obj.options.imageTooSmall);
                        } else {
                            if (typeof(obj.options.onchange) == 'function') {
                                obj.options.onchange(img);
                            }
                        }
                    }, 0);
                });
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

jApp.loading = (function() {
    var obj = {};

    var loading = document.createElement('div');
    loading.className = 'jloading';

    obj.show = function() {
        document.body.appendChild(loading);
    };

    obj.hide = function() {
        loading.remove();
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

jApp.mask = (function() {
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
            var currentValue = e.target.value;
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
            } else if (pieces[index] == '#' || pieces[index] == '#.##' || pieces[index] == '#,##') {
                if (input.match(/[0-9]/g)) {
                    if (pieces[index] == '#.##') {
                        var separator = '.';
                    } else if (pieces[index] == '#,##') {
                        var separator = ',';
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
                                    t.push('.');
                                }
                            }
                            t = t.reverse();
                            values[index] = t.join('');
                            if (values[index].substr(0,1) == '.') {
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
                    values[index] = pieces[index];
                    if (input == pieces[index]) {
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
            if (mask[i].match(/[0-9]|[a-z]|[A-Z]/g)) {
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
                } else if (mask[i] == 'h' && mask[i+1] == 'h' && mask[i] == '2' && mask[i+1] == '4') {
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

jApp.mobile = (function(el, options) {
    var obj = {};
    obj.options = {};

    return obj;
});

jApp.page = (function() {
    var obj = {};

    obj.create = function(options) {
        obj.el = document.createElement('div');
        obj.el.id = options.id;
        jApp.el.appendChild(loading);
    };

    obj.hide = function() {
        loading.remove();
    };

    return obj;
});

jApp.toolbar = (function(el, options) {
    var obj = {};
    obj.options = options;

    var toolbar = document.createElement('div');
    toolbar.classList.add('toolbar');
    toolbar.onclick = function(e) {
        var element = toolbarContent.children;
        for (var i = 0; i < element.length; i++) {
            element[i].classList.remove('selected');
        }
        if (element = getElement(e.target)) {
            element.classList.add('selected');
        }
    }

    var toolbarContent = document.createElement('div');
    toolbar.appendChild(toolbarContent);

    for (var i = 0; i < options.items.length; i++) {
        var toolbarItem = document.createElement('div');
        toolbarItem.classList.add('toolbar-item');
        var toolbarLink = document.createElement('a');
        //toolbarLink.setAttribute('href', options.items[i].route);

        if (options.items[i].icon) {
            var toolbarIcon = document.createElement('i');
            toolbarIcon.classList.add('material-icons');
            toolbarIcon.innerHTML = options.items[i].icon;
            toolbarLink.appendChild(toolbarIcon);
        }
        if (options.items[i].badge) {
            var toolbarBadge = document.createElement('div');
            toolbarBadge.classList.add('badge');
            var toolbarBadgeContent = document.createElement('div');
            toolbarBadgeContent.innerHTML = options.items[i].badge;
            toolbarBadge.appendChild(toolbarBadgeContent);
            toolbarLink.appendChild(toolbarBadge);
        }
        if (options.items[i].title) {
            var toolbarTitle = document.createElement('span');
            toolbarTitle.innerHTML = options.items[i].title;
            toolbarLink.appendChild(toolbarTitle);
        }

        toolbarItem.appendChild(toolbarLink);
        toolbarContent.appendChild(toolbarItem);
    }

    var getElement = function(element) {
        var item = null;

        function path (element) {
            if (element.className) {
                if (element.classList.contains('toolbar-item')) {
                    item = element;
                }
            }

            if (element.parentNode) {
                path(element.parentNode);
            }
        }

        path(element);

        return item;
    }

    el.appendChild(toolbar);

    return obj;
});

jApp.actionsheet = (function() {
    var obj = {};
    obj.options = {};

     var actionsheet = document.createElement('div');
     actionsheet.className = 'jactionsheet';

    var actionContent = document.createElement('div');
    actionContent.className = 'jactionsheet-content';
    actionsheet.appendChild(actionContent);

    obj.open = function(options) {
       obj.options = options;

       obj.options.groups.forEach(function(group) {
            var actionGroup = document.createElement('div');
            actionGroup.className = 'jactionsheet-group';

            group.forEach(function(v) {
                var actionItem = document.createElement('div');
                var actionInput = document.createElement('input');
                actionInput.type = 'button';
                actionInput.value = v.title;
                if (v.className) {
                    actionInput.className = v.className; 
                }
                if (v.onclick) {
                    actionInput.onclick = v.onclick; 
                }
                actionItem.appendChild(actionInput);
                actionGroup.appendChild(actionItem);
            });

            actionContent.appendChild(actionGroup);
        });

        // Append
        actionsheet.style.opacity = 100;
        jApp.el.appendChild(actionsheet);

        // Animation
        actionContent.classList.add('slide-bottom-in');
    }

    obj.close = function() {
        actionsheet.style.opacity = 0;
        // Remove any existing actionsheet
        actionContent.classList.add('slide-bottom-out');

        // Wait for the animation and remove any actionsheet
        setTimeout(function() {
            actionsheet.remove();
        }, 400);
    }

    return obj;
})();

/**
 * (c) jTools Modal page
 * https://github.com/paulhodel/jtools
 *
 * @author: Paul Hodel <paul.hodel@gmail.com>
 * @description: Modal page
 */

jApp.modal = (function(el, options) {
    var obj = {};
    obj.options = {};

    // Default configuration
    var defaults = {
        // Events
        onopen:null,
        onclose:null,
        closed:false,
        width:null,
        height:null,
        title:null,
    };

    // Loop through our object
    for (var prop in defaults) {
        if (defaults.hasOwnProperty(prop)) {
            obj.options[prop] = options && options[prop] ? options[prop] : defaults[prop];
        }
    }

    el.classList.add('jmodal');

    if (obj.options.title) {
        el.setAttribute('title', obj.options.title);
    }
    if (obj.options.width) {
        el.style.width = obj.options.width;
    }
    if (obj.options.height) {
        el.style.height = obj.options.height;
    }

    var container = document.createElement('div');
    for (var i = 0; i < el.children.length; i++) {
        container.appendChild(el.children[i]);
    }
    el.appendChild(container);

    // Title
    if (! el.getAttribute('title')) {
        el.classList.add('no-title');
    }

    if (! obj.options.closed) {
        el.style.display = 'block';
    }

    obj.open = function() {
        el.style.display = 'block';

        if (typeof(obj.options.onopen) == 'function') {
            obj.options.onopen(el);
        }
        // Backdrop
        document.body.appendChild(jApp.backdrop);
    }

    obj.close = function() {
        el.style.display = 'none';

        if (typeof(obj.options.onclose) == 'function') {
            obj.options.onclose(el);
        }
        // Backdrop
        jApp.backdrop.remove();
    }

    el.addEventListener('mousedown', (e) => {
        obj.position = [];

        if (e.path[0].classList.contains('jmodal')) {
            setTimeout(function() {
                if (e.target.clientWidth - e.offsetX < 50 && e.offsetY < 50) {
                    obj.close();
                } else {
                    if (el.getAttribute('title') && e.offsetY < 50) {
                        if (document.selection) {
                            document.selection.empty();
                        } else if ( window.getSelection ) {
                            window.getSelection().removeAllRanges();
                        }

                        var rect = el.getBoundingClientRect();
                        obj.position = [
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
    });

    el.addEventListener('mousemove', (e) => {
        if (obj.position) {
            if (e.which == 1 || e.which == 3) {
                el.style.top = obj.position[1] + (e.clientY - obj.position[3]) + (obj.position[5] / 2);
                el.style.left = obj.position[0] + (e.clientX - obj.position[2]) + (obj.position[4] / 2);
                el.style.cursor = 'move';
            } else {
                el.style.cursor = 'auto';
            }
        }
    });

    el.addEventListener('mouseup', (e) => {
        obj.position = [];

        el.style.cursor = 'auto';
    });

    el.modal = obj;

    return obj;
});

/**
 * (c) Image slider
 * https://github.com/paulhodel/jtools
 *
 * @author: Paul Hodel <paul.hodel@gmail.com>
 * @description: Image Slider
 */

jApp.slider = (function(el, options) {
    var obj = {};
    obj.options = {};
    obj.currentImage = null;

    if (options) {
        obj.options = options;
    }

    // Items
    obj.options.items = [];

    if (! el.classList.contains('jslider')) {
        el.classList.add('jslider');

        // Create container
        var container = document.createElement('div');
        container.className = 'jslider-container';
        // Move children inside
        if (el.children.length > 0) {
            // Keep children items
            for (var i = 0; i < el.children.length; i++) {
                obj.options.items.push(el.children[i]);
            }
        }
        if (obj.options.items.length > 0) {
            for (var i = 0; i < obj.options.items.length; i++) {
                obj.options.items[i].classList.add('jfile');
                var index = obj.options.items[i].src.lastIndexOf('/');
                if (index < 0) {
                    obj.options.items[i].setAttribute('data-name', obj.options.items[i].src);
                } else {
                    obj.options.items[i].setAttribute('data-name', obj.options.items[i].src.substr(index + 1));
                }
                var index = obj.options.items[i].src.lastIndexOf('/');

                container.appendChild(obj.options.items[i]);
            }
        }
        el.appendChild(container);
        // Add close buttom
        var close = document.createElement('div');
        close.className = 'jslider-close';
        close.innerHTML = 'close';
        close.onclick =  function() {
            obj.close();
        }
        el.appendChild(close);
    }

    obj.show = function(target) {
        if (! target) {
            var target = container.children[0];
        }

        if (! container.classList.contains('jslider-preview')) {
            container.classList.add('jslider-preview');
            close.style.display = 'block';
        }

        // Hide all images
        [...container.children].forEach(function(v) {
            v.style.display = 'none';
        });

        // Show clicked only
        target.style.display = 'block';

        // Is there any previous
        if (target.previousSibling) {
            container.classList.add('jslider-left');
        } else {
            container.classList.remove('jslider-left');
        }

        // Is there any next
        if (target.nextSibling) {
            container.classList.add('jslider-right');
        } else {
            container.classList.remove('jslider-right');
        }

        obj.currentImage = target;
    }

    // Allow insert
    if (obj.options.allowAttachment) {
        var attachmentInput = document.createElement('input');
        attachmentInput.type = 'file';
        attachmentInput.className = 'slider-attachment';
        attachmentInput.setAttribute('accept', 'image/*');
        attachmentInput.style.display = 'none';
        attachmentInput.onchange = function() {
            var reader = [];

            for (var i = 0; i < this.files.length; i++) {
                var type = this.files[i].type.split('/');

                if (type[0] == 'image') {
                    var file = {
                        size: this.files[i].size,
                        name: this.files[i].name,
                        lastmodified: this.files[i].lastModified,
                    }

                    reader[i] = new FileReader();
                    reader[i].addEventListener("load", function (e) {
                        file.file = e.target.result;
                        obj.addFile(file);
                    }, false);

                    reader[i].readAsDataURL(this.files[i]);
                } else {
                    alert('The extension is not allowed');
                }
            };
        }

        var attachmentIcon = document.createElement('i');
        attachmentIcon.innerHTML = 'attachment';
        attachmentIcon.className = 'jslider-attach material-icons';
        attachmentIcon.onclick = function() {
            jApp.click(attachmentInput);
        }

        el.appendChild(attachmentInput);
        el.appendChild(attachmentIcon);
    }

    obj.open = function() {
        obj.show();

        // Event
        if (typeof(obj.options.onopen) == 'function') {
            obj.options.onopen(el);
        }
    }

    obj.close = function() {
        container.classList.remove('jslider-preview');
        container.classList.remove('jslider-left');
        container.classList.remove('jslider-right');

        [...container.children].forEach(function(v) {
            v.style.display = '';
        });

        close.style.display = '';

        obj.currentImage = null;

        // Event
        if (typeof(obj.options.onclose) == 'function') {
            obj.options.onclose(el);
        }
    }

    obj.addFile = function(v) {
        var img = document.createElement('img');
        img.setAttribute('data-lastmodified', v.lastmodified);
        img.setAttribute('data-name', v.name);
        img.setAttribute('data-size', v.size);
        img.setAttribute('src', v.file);
        img.className = 'jfile';
        container.appendChild(img);
        obj.options.items.push(img);

        // Onchange
        if (typeof(obj.options.onchange) == 'function') {
            obj.options.onchange(el, v);
        }
    }

    obj.addFiles = function(files) {
        for (var i = 0; i < files.length; i++) {
            obj.addFile(files[i]);
        }
    }

    obj.next = function() {
        if (obj.currentImage.nextSibling) {
            obj.show(obj.currentImage.nextSibling);
        }
    }
    
    obj.prev = function() {
        if (obj.currentImage.previousSibling) {
            obj.show(obj.currentImage.previousSibling);
        }
    }

    obj.getData = function() {
        var files = jApp.getFiles(container);

        const values = {};
        const inputs = container.children;

        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].name) {
                values[inputs[i].name] = inputs[i].value;
            }
        }
        return values;
    }

    // Push to refresh
    var longTouchTimer = null;

    var mouseDown = function(e) {
        if (e.target.tagName == 'IMG') {
            // Remove
            var targetImage = e.target;
            longTouchTimer = setTimeout(function() {
                if (e.target.src.substr(0,4) == 'data') {
                    e.target.remove();
                } else {
                    if (e.target.classList.contains('jremove')) {
                        e.target.classList.remove('jremove');
                    } else {
                        e.target.classList.add('jremove');
                    }
                }

                // Onchange
                if (typeof(obj.options.onchange) == 'function') {
                    obj.options.onchange(el, e.target);
                }
            }, 1000);
        }
    }

    var mouseUp = function(e) {
        if (longTouchTimer) {
            clearTimeout(longTouchTimer);
        }

        // Open slider
        if (e.target.tagName == 'IMG') {
            if (! e.target.classList.contains('jremove')) {
                obj.show(e.target);
            }
        } else {
            // Arrow controls
            if (e.target.clientWidth - e.offsetX < 40) {
                // Show next image
                obj.next();
            } else if (e.offsetX < 40) {
                // Show previous image
                obj.prev();
            }
        }
    }

    container.addEventListener('mousedown', mouseDown);
    container.addEventListener('touchstart', mouseDown);
    container.addEventListener('mouseup', mouseUp);
    container.addEventListener('touchend', mouseUp);

    el.slider = obj;

    return obj;
});

/**
 * (c) jTools v1.0.1 - Element sorting
 * https://github.com/paulhodel/jtools
 *
 * @author: Paul Hodel <paul.hodel@gmail.com>
 * @description: Element drag and drop sorting
 */

jApp.sorting = (function(el, options) {
    el.classList.add('jsorting');

    el.addEventListener('dragstart', (e) => {
        e.target.classList.add('dragging');
    });

    el.addEventListener('dragover', (e) => {
        e.preventDefault();

        if (e.target.clientHeight / 2 > e.offsetY) {
            e.path[0].style.borderTop = '1px dotted #ccc';
            e.path[0].style.borderBottom = '';
        } else {
            e.path[0].style.borderTop = '';
            e.path[0].style.borderBottom = '1px dotted #ccc';
        }
    });

    el.addEventListener('dragleave', (e) => {
        e.path[0].style.borderTop = '';
        e.path[0].style.borderBottom = '';
    });

    el.addEventListener('dragend', (e) => {
        e.path[1].querySelector('.dragging').classList.remove('dragging');
    });

    el.addEventListener('drop', (e) => {
        var element = e.path[1].querySelector('.dragging');

        if (e.target.clientHeight / 2 > e.offsetY) {
            e.path[1].insertBefore(element, e.path[0]);
        } else {
            e.path[1].insertBefore(element, e.path[0].nextSibling);
        }

        e.path[0].style.borderTop = '';
        e.path[0].style.borderBottom = '';
    });

    [...el.children].forEach(function(v) {
        v.setAttribute('draggable', 'true');
    });

    return el;
});

/**
 * (c) jTools Element template render
 * https://github.com/paulhodel/jtools
 *
 * @author: Paul Hodel <paul.hodel@gmail.com>
 * @description: Template renderer
 */

jApp.template = (function(el, options) {
    options.getData = function(pageNumber, query) {
        // Node container
        var container = '';

        // Filter data
        if (query) {
            var test = function(obj, query) {
                for (var key in obj) {
                    var value = obj[key];

                    if ((''+value).toLowerCase().search(query) >= 0) {
                        return true;
                    }
                }
                return false;
            }

            var data = options.data.filter(function(item) {
                return test(item, query);
            });
        } else {
            var data = options.data;
        }

        // Method filter
        if (options.filter) {
            data = options.filter(data);
        }

        if (! data.length) {
            container.innerHTML = 'No records found';
        } else {
            var component = options.template[Object.keys(options.template)[0]];

            if (options.pagination) {
                if (! pageNumber) {
                    pageNumber = 1;
                }
                var quantityPerPage = options.pagination;
                startNumber = (options.pagination * (pageNumber - 1));
                finalNumber = (options.pagination * (pageNumber - 1)) + options.pagination;

                if (data.length < finalNumber) {
                    finalNumber = data.length;
                }
            } else {
                var startNumber = 0;
                var finalNumber = data.length;
            }

            // Append itens
            for (var i = startNumber; i < finalNumber; i++) {
                container += component(data[i]).trim();
            }

            // Create pagination
            if (options.pagination && data.length > options.pagination) {
                // Pagination container
                var pagination = document.createElement('div');
                pagination.className = 'jtemplate-pagination';

                var quantyOfPages = parseInt(data.length / options.pagination);

                if (pageNumber < 6) {
                    startNumber = 1;
                    finalNumber = quantyOfPages < 10 ? quantyOfPages + 1 : 10;
                } else if (quantyOfPages - pageNumber < 6) {
                    startNumber = quantyOfPages - 9;
                    finalNumber = quantyOfPages;
                } else {
                    startNumber = pageNumber - 4;
                    finalNumber = pageNumber + 5;
                }

                // First
                if (startNumber > 1) {
                    var paginationItem = document.createElement('div');
                    paginationItem.innerHTML = '<';
                    paginationItem.title = 1;
                    pagination.appendChild(paginationItem);
                }

                // Get page links
                for (var i = startNumber; i <= finalNumber; i++) {
                    var paginationItem = document.createElement('div');
                    paginationItem.innerHTML = i;
                    pagination.appendChild(paginationItem);

                    if (pageNumber == i) {
                        paginationItem.style.fontWeight = 'bold';
                    }
                }

                // Last
                if (finalNumber < quantyOfPages) {
                    var paginationItem = document.createElement('div');
                    paginationItem.innerHTML = '>';
                    paginationItem.title = quantyOfPages;
                    pagination.appendChild(paginationItem);
                }

                container = pagination.outerHTML + container;
            }
        }

        return container;
    };

    if (options.search) {
        var searchContainer = document.createElement('div');
        searchContainer.className = 'jtemplate-results';
        var searchInput = document.createElement('input');
        searchInput.onkeyup = function(e) {
            el.innerHTML = options.getData(1, this.value.toLowerCase());
        }
        searchContainer.appendChild(searchInput);
        el.parentNode.insertBefore(searchContainer, el);
    }

    options.reset = function() {
        el.innerHTML = '';
    }

    options.refresh = function() {
        el.innerHTML = options.render();
    }

    if (options.url) {
        fetch(options.url, { headers: new Headers({ 'content-type': 'text/json' }) })
            .then(function(data) {
                data.json().then(function(data) {
                    options.data = data;

                    el.innerHTML = options.render();
                })
            });
    } else {
        el.innerHTML = options.render();
    }

    el.addEventListener('mousedown', (e) => {
        if (e.path[1].classList.contains('jtemplate-pagination')) {
            var index = e.path[0].innerText;
            if (index == '<') {
                el.innerHTML = options.getData(1);
            } else if (index == '>') {
                el.innerHTML = options.getData(e.path[0].getAttribute('title'));
            } else {
                el.innerHTML = options.getData(parseInt(index));
            }
        }
        e.preventDefault();
    });

    el.template = options;

    return options;
});

/**
 * (c) jTools Timeline
 * https://github.com/paulhodel/jtools
 *
 * @author: Paul Hodel <paul.hodel@gmail.com>
 * @description: Timeline
 */

jApp.timeline = (function(el, options) {
    var obj = {};
    obj.options = {};

    // Two digits
    var two = function(value) {
        value = '' + value;
        if (value.length == 1) {
            value = '0' + value;
        }
        return value;
    }

    // Default date format
    if (! options.date) {
        var date = new Date();
        y = date.getFullYear();
        m = two(date.getMonth() + 1);
        date = y + '-' + m;
    }

    // Default configurations
    var defaults = {
        data: [],
        date: date,
        months: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
        monthsFull: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ],
        text: {
            noInformation: '<div class="jtimeline-message">No information for this period</div>',
        }
    };

    // Loop through our object
    for (var prop in defaults) {
        if (defaults.hasOwnProperty(prop)) {
            obj.options[prop] = options && options[prop] ? options[prop] : defaults[prop];
        }
    }

    // Add class
    el.classList.add('jtimeline');

    // Header
    var timelineHeader = document.createElement('div');
    timelineHeader.className = 'jtimeline-header';

    var timelineLabel = document.createElement('div');
    timelineLabel.className = 'jtimeline-label';

    var timelineNavigation = document.createElement('div');
    timelineNavigation.className = 'jtimeline-navigation';

    // Labels 
    var timelineMonth = document.createElement('div');
    timelineMonth.className = 'jtimeline-month';
    timelineMonth.innerHTML = '';
    timelineLabel.appendChild(timelineMonth);

    var timelineYear = document.createElement('div');
    timelineYear.className = 'jtimeline-year';
    timelineYear.innerHTML = '';
    timelineLabel.appendChild(timelineYear);

    // Navigation
    var timelinePrev = document.createElement('div');
    timelinePrev.className = 'jtimeline-prev';
    timelinePrev.innerHTML = '<i class="material-icons">keyboard_arrow_left</i>';
    timelineNavigation.appendChild(timelinePrev);

    var timelineNext = document.createElement('div');
    timelineNext.className = 'jtimeline-next';
    timelineNext.innerHTML = '<i class="material-icons">keyboard_arrow_right</i>';
    timelineNavigation.appendChild(timelineNext);

    timelineHeader.appendChild(timelineLabel);
    timelineHeader.appendChild(timelineNavigation);

    // Data container
    var timelineContainer = document.createElement('div');
    timelineContainer.className = 'jtimeline-container';

    // Append headers
    el.appendChild(timelineHeader);
    el.appendChild(timelineContainer);

    // Date
    if (obj.options.date.length > 7) {
        obj.options.date = obj.options.date.substr(0, 7)
    }

    obj.setData = function(rows) {
        var data = [];
        for (var i = 0; i < rows.length; i++) {
            var d = rows[i].date.substr(0,7);

            // Create the object if not exists
            if (! data[d]) {
                data[d] = [];
            }

            // Create array
            data[d].push(rows[i]);
        };
        obj.options.data = data;
        obj.render(obj.options.date);
    }

    obj.render = function(date) {
        // Filter
        if (date.length > 7) {
            var date = date.substr(0,7);
        }

        // Update current date
        obj.options.date = date;

        // Reset data
        timelineContainer.innerHTML = '';

        // Days
        var timelineDays = [];

        // Itens
        if (! obj.options.data[date]) {
            timelineContainer.innerHTML = obj.options.text.noInformation;
        } else {
            for (var i = 0; i < obj.options.data[date].length; i++) {
                var v = obj.options.data[date][i];
                var d = v.date.split('-');

                // Item container
                var timelineItem = document.createElement('div');
                timelineItem.className = 'jtimeline-item';

                // Date
                var timelineDateContainer = document.createElement('div');
                timelineDateContainer.className = 'jtimeline-date-container';

                var timelineDate = document.createElement('div');
                if (! timelineDays[d[2]]) {
                    timelineDate.className = 'jtimeline-date jtimeline-date-bullet';
                    timelineDate.innerHTML = d[2];

                    if (! v.title) {
                        v.title = v.subtitle ? v.subtitle : 'Information';
                    }
                } else {
                    timelineDate.className = 'jtimeline-date';
                    timelineDate.innerHTML = '';
                }
                timelineDateContainer.appendChild(timelineDate);

                var timelineContent = document.createElement('div');
                timelineContent.className = 'jtimeline-content';

                var timelineTitle = document.createElement('div');
                timelineTitle.className = 'jtimeline-title';
                timelineTitle.innerHTML = v.title;
                timelineContent.appendChild(timelineTitle);

                var timelineSubtitle = document.createElement('div');
                timelineSubtitle.className = 'jtimeline-subtitle';
                timelineSubtitle.innerHTML = v.subtitle ? v.subtitle : '';
                timelineContent.appendChild(timelineSubtitle);

                // Text
                var timelineText = document.createElement('div');
                timelineText.className = 'jtimeline-text';
                timelineText.innerHTML = v.text;
                timelineContent.appendChild(timelineText);

                // Tag
                if (v.tag) {
                    var timelineTag = document.createElement('div');
                    timelineTag.className = 'jtimeline-tag';
                    if (typeof(v.tag) == 'string') {
                        timelineTag.innerHTML = v.tag;
                    } else {
                        timelineTag.innerHTML = v.tag.text;
                        timelineTag.style.backgroundColor = v.tag.color;
                    }
                    timelineContent.appendChild(timelineTag);
                }

                // Day
                timelineDays[d[2]] = true;

                // Append Item
                timelineItem.appendChild(timelineDateContainer);
                timelineItem.appendChild(timelineContent);
                timelineContainer.appendChild(timelineItem);
            };
        }

        // Update labels
        var d = date.split('-');
        timelineYear.innerHTML = d[0];
        timelineMonth.innerHTML = obj.options.monthsFull[parseInt(d[1]) - 1];
    }

    obj.next = function() {
        // Update current date
        var d = obj.options.date.split('-');
        // Next month
        d[1]++;
        // Next year
        if (d[1] > 12) {
            d[0]++;
            d[1] = 1;
        }
        date = d[0] + '-' + (d[1] < 10 ? '0' + d[1] : d[1]);
        obj.render(date);
    }

    obj.prev = function() {
        // Update current date
        var d = obj.options.date.split('-');
        // Next month
        d[1]--;
        // Next year
        if (d[1] < 1) {
            d[0]--;
            d[1] = 12;
        }
        date = d[0] + '-' + (d[1] < 10 ? '0' + d[1] : d[1]);
        obj.render(date);
    }

    // Init
    if (obj.options.url) {
        $.ajax({
            url: obj.options.url,
            type: 'GET',
            dataType:'json',
            success: function(data) {
                // Timeline data
                obj.setData(data);
            }
        });
    } else {
        // Timeline data
        obj.setData(obj.options.data);
    }

    var timelineMouseDownControls = function(e) {
        if (e.target.classList.contains('jtimeline-next') || e.target.parentNode.classList.contains('jtimeline-next')) {
            obj.next();
        } else if (e.target.classList.contains('jtimeline-prev') || e.target.parentNode.classList.contains('jtimeline-prev')) {
            obj.prev();
        }
    }

    el.addEventListener("mousedown", timelineMouseDownControls);

    el.timeline = obj;

    return obj;
});

jApp.tracker = (function(el, options) {
    var obj = {};
    obj.options = {};
    
    if (options) {
        obj.options = options;
    }

    // Do not ignore changes
    obj.options.ignore = false;

    // Default message. Depending on the browser, the message can be customized.
    if (obj.options.message) {
        obj.options.message = 'Are you sure? There are unsaved information in your form';
    }

    // Return the form hash
    obj.setHash = function() {
        return obj.getHash(obj.getElements());
    }

    // Get the form hash
    obj.getHash = function(str) {
        return str.split('').reduce((prevHash, currVal) => ((prevHash << 5) - prevHash) + currVal.charCodeAt(0), 0);
    }

    // Is there any change in the form since start tracking?
    obj.isChanged = function() {
        var hash = obj.setHash();
        return (obj.options.currentHash != hash);
    }

    // Change the ignore flag
    obj.setIgnore = function(option) {
        obj.options.ignore = option;
    }

    // Restart tracking
    obj.resetTracker = function() {
        obj.options.currentHash = obj.setHash();
        obj.options.ignore = false;
    }

    // Ignore flag
    obj.setIgnore = function(ignoreFlag) {
        obj.options.ignore = ignoreFlag ? true : false;
    }

    // Get form elements
    obj.getElements = function() {
        var ret = {};
        var elements = el.querySelectorAll("input, select, textarea");

        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            var name = element.name;
            var value = element.value;

            if (name) {
                ret[name] = value;
            }
        }

        return JSON.stringify(ret);
    }

    // Start tracking in one second
    setTimeout(function() {
        obj.options.currentHash = obj.setHash();
    }, 1000);

    // Alert
    window.addEventListener("beforeunload", function (e) {
        if (obj.isChanged() && obj.options.ignore == false) {
            var confirmationMessage =  obj.options.message? obj.options.message : "\o/";

            if (confirmationMessage) {
                if (typeof e == 'undefined') {
                    e = window.event;
                }

                if (e) {
                    e.returnValue = confirmationMessage;
                }

                return confirmationMessage;
            } else {
                return void(0);
            }
        }
    });

    el.tracker = obj;

    return obj;
});

