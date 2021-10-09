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
            months: jSuites.calendar.monthsShort,
            monthsFull: jSuites.calendar.months,
            weekdays: jSuites.calendar.weekdays,
            weekdays_short: jSuites.calendar.weekdays,
            textDone: jSuites.translate('Done'),
            textReset: jSuites.translate('Reset'),
            textUpdate: jSuites.translate('Update'),
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
            // Data type
            dataType: null,
        }

        for (var i = 0; i < defaults.weekdays_short.length; i++) {
            defaults.weekdays_short[i] = defaults.weekdays_short[i].substr(0,1);
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

        if (jSuites.isNumeric(obj.options.value) && obj.options.value > 0) {
            obj.options.value = jSuites.calendar.numToDate(obj.options.value);
            // Data type numberic
            obj.options.dataType = 'numeric';
        }

        // Texts
        calendarReset.innerHTML = obj.options.textReset;
        calendarConfirm.innerHTML = obj.options.textDone;
        calendarControlsUpdateButton.innerHTML = obj.options.textUpdate;

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
                            var d = -1 * (rect.height + rectContent.height + 2);
                            if (d + rect.top < 0) {
                                d = -1 * (rect.top + rect.height);
                            }
                            calendarContainer.style.top = d + 'px';
                        } else {
                            calendarContainer.style.top = 2 + 'px'; 
                        }

                        if (window.innerWidth < rect.left + rectContent.width) {
                            var d = window.innerWidth - (rect.left + rectContent.width + 20);
                            calendarContainer.style.left = d + 'px';
                        } else {
                            calendarContainer.style.left = '0px'; 
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
                obj.setValue(test);
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

        calendarControlsUpdateButton = document.createElement('button');
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
        el.change = obj.setValue;

        // Global generic value handler
        el.val = function(val) {
            if (val === undefined) {
                return obj.getValue();
            } else {
                obj.setValue(val);
            }
        }

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
            if (elements[i].innerHTML) {
                elements[i].setAttribute('data-date', elements[i].innerHTML);
                elements[i].innerHTML = jSuites.calendar.prettify(elements[i].innerHTML);
            }
        }
    }
}

jSuites.calendar.now = function(date, dateOnly) {
    if (Array.isArray(date)) {
        var y = date[0];
        var m = date[1];
        var d = date[2];
        var h = date[3];
        var i = date[4];
        var s = date[5];
    } else {
        if (! date) {
            var date = new Date();
        }
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        var h = date.getHours();
        var i = date.getMinutes();
        var s = date.getSeconds();
    }

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

    var o = jSuites.mask(date, { mask: format }, true);
    if (o.date[0] && o.date[1]) {
        if (! o.date[2]) {
            o.date[2] = 1;
        }

        return o.date[0] + '-' + jSuites.two(o.date[1]) + '-' + jSuites.two(o.date[2]) + ' ' + jSuites.two(o.date[3]) + ':' + jSuites.two(o.date[4])+ ':' + jSuites.two(o.date[5]);
    }
    return '';
}

/**
 * Date to number
 */
jSuites.calendar.dateToNum = function(a, b) {
    a = new Date(a);
    if (! b) {
        b = '1899-12-30 ' + a.getHours() + ':' + a.getMinutes() + ':' + a.getSeconds();
    }
    b = new Date(b);
    var v = a.getTime() - b.getTime();
    return Math.round(v / 86400000);
}

/**
 * Number to date
 */
jSuites.calendar.numToDate = function(value) {
    var d = new Date(Math.round((value - 25569)*86400*1000));
    return d.getFullYear() + "-" + jSuites.two(d.getMonth()+1) + "-" + jSuites.two(d.getDate()) + ' 00:00:00';
}

// Helper to convert date into string
jSuites.calendar.getDateString = function(value, options) {
    if (! options) {
        var options = {};
    }

    // Labels
    if (options && typeof(options) == 'object') {
        var format = options.format;
    } else {
        var format = options;
    }

    if (! format) {
        format = 'YYYY-MM-DD';
    }

    // Convert to number of hours
    if (typeof(value) == 'number' && format.indexOf('[h]') >= 0) {
        var result = parseFloat(24 * Number(value));
        if (format.indexOf('mm') >= 0) {
            var h = (''+result).split('.');
            if (h[1]) {
                var d = 60 * parseFloat('0.' + h[1])
                d = parseFloat(d.toFixed(2));
            } else {
                var d = 0;
            }
            result = parseInt(h[0]) + ':' + jSuites.two(d);
        }
        return result;
    }

    // Date instance
    if (value instanceof Date) {
        value = jSuites.calendar.now(value);
    } else if (value && jSuites.isNumeric(value)) {
        value = jSuites.calendar.numToDate(value);
    }

    // Tokens
    var tokens = [ 'DAY', 'WD', 'DDDD', 'DDD', 'DD', 'D', 'Q', 'HH24', 'HH12', 'HH', 'H', 'AM/PM', 'MI', 'SS', 'MS', 'YYYY', 'YYY', 'YY', 'Y', 'MONTH', 'MON', 'MMMMM', 'MMMM', 'MMM', 'MM', 'M', '.' ];

    // Expression to extract all tokens from the string
    var e = new RegExp(tokens.join('|'), 'gi');
    // Extract
    var t = format.match(e);

    // Compatibility with excel
    for (var i = 0; i < t.length; i++) {
        if (t[i].toUpperCase() == 'MM') {
            // Not a month, correct to minutes
            if (t[i-1] && t[i-1].toUpperCase().indexOf('H') >= 0) {
                t[i] = 'mi';
            } else if (t[i-2] && t[i-2].toUpperCase().indexOf('H') >= 0) {
                t[i] = 'mi';
            } else if (t[i+1] && t[i+1].toUpperCase().indexOf('S') >= 0) {
                t[i] = 'mi';
            } else if (t[i+2] && t[i+2].toUpperCase().indexOf('S') >= 0) {
                t[i] = 'mi';
            }
        }
    }

    // Object
    var o = {
        tokens: t
    }

    // Value
    if (value) {
        var d = ''+value;
        var splitStr = (d.indexOf('T') !== -1) ? 'T' : ' ';
        d = d.split(splitStr);
 
        var h = 0;
        var m = 0;
        var s = 0;

        if (d[1]) {
            h = d[1].split(':');
            m = h[1] ? h[1] : 0;
            s = h[2] ? h[2] : 0;
            h = h[0] ? h[0] : 0;
        }

        d = d[0].split('-');

        if (d[0] && d[1] && d[2] && d[0] > 0 && d[1] > 0 && d[1] < 13 && d[2] > 0 && d[2] < 32) {

            // Data
            o.data = [ d[0], d[1], d[2], h, m, s ];

            // Value
            o.value = [];

            // Calendar instance
            var calendar = new Date(o.data[0], o.data[1]-1, o.data[2], o.data[3], o.data[4], o.data[5]);

            // Get method
            var get = function(i) {
                // Token
                var t = this.tokens[i];
                // Case token
                var s = t.toUpperCase();
                var v = null;

                if (s === 'YYYY') {
                    v = this.data[0];
                } else if (s === 'YYY') {
                    v = this.data[0].substring(1,4);
                } else if (s === 'YY') {
                    v = this.data[0].substring(2,4);
                } else if (s === 'Y') {
                    v = this.data[0].substring(3,4);
                } else if (t === 'MON') {
                    v = jSuites.calendar.months[calendar.getMonth()].substr(0,3).toUpperCase();
                } else if (t === 'mon') {
                    v = jSuites.calendar.months[calendar.getMonth()].substr(0,3).toLowerCase();
                } else if (t === 'MONTH') {
                    v = jSuites.calendar.months[calendar.getMonth()].toUpperCase();
                } else if (t === 'month') {
                    v = jSuites.calendar.months[calendar.getMonth()].toLowerCase();
                } else if (s === 'MMMMM') {
                    v = jSuites.calendar.months[calendar.getMonth()].substr(0, 1);
                } else if (s === 'MMMM' || t === 'Month') {
                    v = jSuites.calendar.months[calendar.getMonth()];
                } else if (s === 'MMM' || t == 'Mon') {
                    v = jSuites.calendar.months[calendar.getMonth()].substr(0,3);
                } else if (s === 'MM') {
                    v = jSuites.two(this.data[1]);
                } else if (s === 'M') {
                    v = calendar.getMonth()+1;
                } else if (t === 'DAY') {
                    v = jSuites.calendar.weekdays[calendar.getDay()].toUpperCase();
                } else if (t === 'day') {
                    v = jSuites.calendar.weekdays[calendar.getDay()].toLowerCase();
                } else if (s === 'DDDD' || t == 'Day') {
                    v = jSuites.calendar.weekdays[calendar.getDay()];
                } else if (s === 'DDD') {
                    v = jSuites.calendar.weekdays[calendar.getDay()].substr(0,3);
                } else if (s === 'DD') {
                    v = jSuites.two(this.data[2]);
                } else if (s === 'D') {
                    v = this.data[2];
                } else if (s === 'Q') {
                    v = Math.floor((calendar.getMonth() + 3) / 3);
                } else if (s === 'HH24' || s === 'HH') {
                    v = jSuites.two(this.data[3]);
                } else if (s === 'HH12') {
                    if (this.data[3] > 12) {
                        v = jSuites.two(this.data[3] - 12);
                    } else {
                        v = jSuites.two(this.data[3]);
                    }
                } else if (s === 'H') {
                    v = this.data[3];
                } else if (s === 'MI') {
                    v = jSuites.two(this.data[4]);
                } else if (s === 'SS') {
                    v = jSuites.two(this.data[5]);
                } else if (s === 'MS') {
                    v = calendar.getMilliseconds();
                } else if (s === 'AM/PM') {
                    if (this.data[3] >= 12) {
                        v = 'PM';
                    } else {
                        v = 'AM';
                    }
                } else if (s === 'WD') {
                    v = jSuites.calendar.weekdays[calendar.getDay()];
                }

                if (v === null) {
                    this.value[i] = this.tokens[i];
                } else {
                    this.value[i] = v;
                }
            }

            for (var i = 0; i < o.tokens.length; i++) {
                get.call(o, i);
            }
            // Put pieces together
            value = o.value.join('');
        } else {
            value = '';
        }
    }

    return value;
}

// Jsuites calendar labels
jSuites.calendar.weekdays = [ 'Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday' ];
jSuites.calendar.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
jSuites.calendar.weekdaysShort = [ 'Sun','Mon','Tue','Wed','Thu','Fri','Sat' ];
jSuites.calendar.monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
