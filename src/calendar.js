jSuites.calendar = (function(el, options) {
    var obj = {};
    obj.options = {};

    // Global container
    if (! jSuites.calendar.current) {
        jSuites.calendar.current = null;
    }

    // Default configuration
    var defaults = {
        // Data
        data: null,
        // Inline or not
        type: null,
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
            obj.options[property] = defaults[property];
        }
    }

    // Value
    if (! obj.options.value) {
        if (el.tagName == 'INPUT' && el.value) {
            obj.options.value = el.value;
        }
    }

    // Make sure use upper case in the format
    obj.options.format = obj.options.format.toUpperCase();

    // Date
    obj.date = null;

    if (obj.options.value) {
        obj.date = jSuites.calendar.toArray(obj.options.value);
    } else {
        if (obj.options.today) {
            var date = new Date();
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            var d = date.getDate();
            var h = date.getHours();
            var i = date.getMinutes();

            obj.date = [ y, m, d, h, i, 0 ];
        }
    }

    // Calendar elements
    var calendarReset = document.createElement('div');
    calendarReset.className = 'jcalendar-reset';
    calendarReset.innerHTML = obj.options.textReset;

    var calendarConfirm = document.createElement('div');
    calendarConfirm.className = 'jcalendar-confirm';
    calendarConfirm.innerHTML = obj.options.textDone;

    var calendarControls = document.createElement('div');
    calendarControls.className = 'jcalendar-controls'
    calendarControls.style.borderBottom = '1px solid #ddd';

    if (obj.options.resetButton) {
        calendarControls.appendChild(calendarReset);
    }
    calendarControls.appendChild(calendarConfirm);

    var calendarContainer = document.createElement('div');
    calendarContainer.className = 'jcalendar-container';

    var calendarContent = document.createElement('div');
    calendarContent.className = 'jcalendar-content';

    if (el.tagName == 'INPUT') {
        calendarContent.appendChild(calendarControls);
    }

    calendarContainer.appendChild(calendarContent);

    // Table container
    var calendarTableContainer = document.createElement('div');
    calendarTableContainer.className = 'jcalendar-table';
    calendarContent.appendChild(calendarTableContainer);

    // Main element
    if (el.tagName == 'INPUT') {
        var calendar = document.createElement('div');
        calendar.className = 'jcalendar';
    } else {
        var calendar = el;
        calendar.className = 'jcalendar-inline';
    }
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
    calendarTableContainer.appendChild(calendarTable);

    var calendarSelectHour = document.createElement('select');
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

    var calendarSelectMin = document.createElement('select');
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

    var calendarControlsTime = document.createElement('div');
    calendarControlsTime.className = 'jcalendar-time';
    calendarControlsTime.style.maxWidth = '140px';
    calendarControlsTime.appendChild(calendarSelectHour);
    calendarControlsTime.appendChild(calendarSelectMin);

    var calendarControlsUpdateButton = document.createElement('input');
    calendarControlsUpdateButton.setAttribute('type', 'button');
    calendarControlsUpdateButton.className = 'jcalendar-update';
    calendarControlsUpdateButton.value = obj.options.textUpdate;

    var calendarControlsUpdate = document.createElement('div');
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
    }

    /**
     * Open the calendar
     */
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
                jSuites.animation.slideBottom(calendarContent, 1);
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

            // Events
            if (typeof(obj.options.onopen) == 'function') {
                obj.options.onopen(el);
            }
        }
    }

    obj.close = function (ignoreEvents, update) {
        if (jSuites.calendar.current) {
            // Current
            jSuites.calendar.current = null;

            if (update !== false) {
                var element = calendar.querySelector('.jcalendar-selected');

                if (typeof(update) == 'string') {
                    var value = update;
                } else if (element && element.classList.contains('jcalendar-disabled')) {
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
        }

        return obj.options.value;
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
                obj.date[0] = parseInt(obj.date[0]) + 1;
                obj.date[1] = 1;
            } else {
                obj.date[1] = parseInt(obj.date[1]) + 1;
            }

            // Update picker table of days
            obj.getDays();
        }
    }

    obj.setValue = function(val) {
        if (! val) {
            val = '' + val;
        }
        // Values
        var newValue = val;
        var oldValue = obj.options.value;
        // Set label
        var value = obj.setLabel(newValue, obj.options.format);
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
        var val = obj.setLabel(newValue, obj.options.format);

        if (oldValue != newValue) {
            // Input value
            if (el.tagName == 'INPUT') {
                el.value = val;
            }
            // New value
            obj.options.value = newValue;
            // On change
            if (typeof(obj.options.onchange) ==  'function') {
                obj.options.onchange(el, newValue, oldValue);
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
    obj.update = function(element) {
        if (element.classList.contains('jcalendar-disabled')) {
            // Do nothing
        } else {
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
            element.classList.add('jcalendar-selected');

            // Event
            if (typeof(obj.options.onupdate) == 'function') {
                obj.options.onupdate(el, obj.getValue());
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
        var year = obj.date && obj.date[0] ? obj.date[0] : parseInt(date.getFullYear());
        var month = obj.date && obj.date[1] ? obj.date[1] : parseInt(date.getMonth()) + 1;
        var day = obj.date && obj.date[2] ? obj.date[2] : parseInt(date.getDate());
        var hour = obj.date && obj.date[3] ? obj.date[3] : parseInt(date.getHours());
        var min = obj.date && obj.date[4] ? obj.date[4] : parseInt(date.getMinutes());

        // Selection container
        obj.date = [year, month, day, hour, min, 0 ];

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

    if (! jSuites.calendar.hasEvents) {
        if ('ontouchstart' in document.documentElement === true) {
            document.addEventListener("touchstart", jSuites.calendar.isOpen);
        } else {
            document.addEventListener("mousedown", jSuites.calendar.isOpen);
        }

        document.addEventListener("keydown", function(e) {
            if (e.which == 13) {
                // ENTER
                if (jSuites.calendar.current) {
                    jSuites.calendar.current.close(false, true);
                }
            } else if (e.which == 27) {
                // ESC
                if (jSuites.calendar.current) {
                    jSuites.calendar.current.close(false, false);
                }
            }
        });

        jSuites.calendar.hasEvents = true;
    }

    // Append element to the DOM
    if (el.tagName == 'INPUT') {
        el.parentNode.insertBefore(calendar, el.nextSibling);
        // Add properties
        el.setAttribute('autocomplete', 'off');
        el.setAttribute('data-mask', obj.options.format.toLowerCase());

        if (obj.options.readonly) {
            el.setAttribute('readonly', 'readonly');
        }
        if (obj.options.placeholder) {
            el.setAttribute('placeholder', obj.options.placeholder);
        }
        // Element
        el.classList.add('jcalendar-input');
        // Value
        el.value = obj.setLabel(obj.getValue(), obj.options.format);
    } else {
        // Get days
        obj.getDays();
        // Hour
        if (obj.options.time) {
            calendarSelectHour.value = obj.date[3];
            calendarSelectMin.value = obj.date[4];
        }
    }

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
jSuites.calendar.getDateString = function(value, format) {
    // Default calendar
    if (! format) {
        var format = 'DD/MM/YYYY';
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
            value = value.replace('MON', months[parseInt(d[1])-1].toUpperCase());
            value = value.replace('MMM', months[parseInt(d[1])-1].toUpperCase());
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

jSuites.calendar.isOpen = function(e) {
    if (jSuites.calendar.current) {
        if (! e.target.className || e.target.className.indexOf('jcalendar') == -1) {
            jSuites.calendar.current.close(false, false);
        }
    }
}
