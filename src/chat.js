/**
 * (c) jTools Chat
 * https://github.com/paulhodel/jtools
 *
 * @author: Paul Hodel <paul.hodel@gmail.com>
 * @description: Timeline
 */

jSuites.chat = (function(el, options) {
    var obj = {};
    obj.options = {};

    // Default configuration
    var defaults = {
        url:null,
        data:null,
    };

    // Loop through our object
    for (var property in defaults) {
        if (options && options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    // Add class
    el.classList.add('jchat');

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