jSuites.calendar = (function(el, options) {
    var obj = {};
    obj.options = {};

    // Global container
    if (! jSuites.dropdown.current) {
        jSuites.dropdown.current = null;
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
        if (jSuites.calendar.current) {
            if (jSuites.calendar.current != obj) {
                jSuites.calendar.current.close();
            }
        }

        if (! jSuites.calendar.current) {
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
                calendarContent.classList.add('slide-bottom-in');
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
        if (jSuites.calendar.current) {
            jSuites.calendar.current =  null;

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

    // Handle events
    el.addEventListener("focus", function(e) {
        obj.open();
    });

    el.addEventListener("mousedown", function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        obj.open();
    });

    el.addEventListener("keyup", function(e) {
        if (e.target.value && e.target.value.length > 3) {
            var test = jSuites.calendar.extractDateFromString(e.target.value, obj.options.format);
            if (test) {
                console.log(test);
                if (e.target.getAttribute('data-completed') == 'true') {
                    obj.setValue(test);
                }
            }
        }
    });

    if (! jSuites.calendar.hasEvents) {
        // Add global events
        document.addEventListener("swipeleft", function(e) {
            if (calendar.classList.contains('jcalendar-focus')) {
                obj.prev();
            }
        });

        document.addEventListener("swiperight", function(e) {
            if (calendar.classList.contains('jcalendar-focus')) {
                obj.next();
            }
        });

        document.addEventListener("mousedown", jSuites.calendar.mouseDownControls);

        // Has events
        jSuites.calendar.hasEvents = true;
    }

    // Append element to the DOM
    el.parentNode.insertBefore(calendar, el.nextSibling);

    // Keep object available from the node
    el.calendar = obj;

    return obj;
});

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

    if (test == 1 && date.length == format.length) {
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

jSuites.calendar.mouseDownControls = function(e) {
    if (! jSuites.getElement(e.target, 'jcalendar')) {
        if (jSuites.calendar.current) {
            jSuites.calendar.current.close(false, false);
        }
    } else {
        if (jSuites.calendar.current) {
            var action = e.target.className;

            // Object id
            if (action == 'jcalendar-prev') {
                jSuites.calendar.current.prev();
            } else if (action == 'jcalendar-next') {
                jSuites.calendar.current.next();
            } else if (action == 'jcalendar-month') {
                jSuites.calendar.current.getMonths();
            } else if (action == 'jcalendar-year') {
                jSuites.calendar.current.getYears();
            } else if (action == 'jcalendar-set-year') {
                jSuites.calendar.current.date[0] = e.target.innerText;
                jSuites.calendar.current.getDays();
            } else if (action == 'jcalendar-set-month') {
                jSuites.calendar.current.date[1] = parseInt(e.target.getAttribute('data-value'));
                jSuites.calendar.current.getDays();
            } else if (action == 'jcalendar-confirm' || action == 'jcalendar-update') {
                jSuites.calendar.current.close();
            } else if (action == 'jcalendar-close') {
                jSuites.calendar.current.close();
            } else if (action == 'jcalendar-backdrop') {
                jSuites.calendar.current.close(false, false);
            } else if (action == 'jcalendar-reset') {
                jSuites.calendar.current.reset();
            } else if (e.target.classList.contains('jcalendar-set-day')) {
                if (e.target.innerText) {
                    // Keep selected day
                    jSuites.calendar.current.update(e.target);
                }
            }

            if (action.substr(0,9) == 'jcalendar') {
                e.preventDefault();
                e.stopImmediatePropagation();
            }
        }
    }
}