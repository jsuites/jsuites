jSuites.timeline = (function(el, options) {
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
        var y = date.getFullYear();
        var m = two(date.getMonth() + 1);
        date = y + '-' + m;
    }

    // Default configurations
    var defaults = {
        url: null,  
        data: [],
        date: date,
        months: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
        monthsFull: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ],
        onaction: null,
        text: {
            noInformation: '<div class="jtimeline-message">No information for this period</div>',
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

    // Add class
    el.classList.add('jtimeline');

    obj.options.container = el;

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

    // Action
    var action = function(o) {
        // Get item
        var item = o.parentNode.parentNode.parentNode.parentNode;
        // Get id
        var id = item.getAttribute('data-id');

    }

    // Get item by date 
    var getEventByDate = function(date) {
        return obj.options.data.filter(function(evt) {
            return (evt.date.length > 7 ? evt.date.substr(0,7) : evt.date) == date;
        });
    }

    obj.setData = function(rows) {
        obj.options.data = rows;
        obj.render(obj.options.date);
    }

    obj.add = function(data) {
        var date = data.date.substr(0,7);

        // Format date
        data.date = data.date.substr(0,10);

        // Append data
        obj.options.data.push(data);

        // Reorder
        obj.options.data[obj.options.data.indexOf(data)] = data.order();

        // Render
        obj.render(date);
    }

    obj.remove = function(item) {
        var index = item.getAttribute('data-index');
        var date = item.getAttribute('data-date');

        jSuites.animation.fadeOut(item, function() {
            item.remove();
        });

        var data = getEventByDate(date)[0];
        data.splice(index, 1);
    }

    obj.reload = function() {
        var date = obj.options.date
        obj.render(date);
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
        var events = getEventByDate(date);
        console.log(events);

        // Itens
        if (! events.length) {
            timelineContainer.innerHTML = obj.options.text.noInformation;
        } else {
            for (var i = 0; i < events.length; i++) {
                var v = events[i];
                var d = v.date.length > 10 ? v.date.substr(0,10).split('-') : v.date.split('-');

                // Item container
                var timelineItem = document.createElement('div');
                timelineItem.className = 'jtimeline-item';
                timelineItem.setAttribute('data-id', v.id);
                timelineItem.setAttribute('data-index', i);
                timelineItem.setAttribute('data-date', date);

                // Date
                var timelineDateContainer = document.createElement('div');
                timelineDateContainer.className = 'jtimeline-date-container';

                var timelineDate = document.createElement('div');
                if (! timelineDays[d[2]]) {
                    timelineDate.className = 'jtimeline-date jtimeline-date-bullet';
                    timelineDate.innerHTML = d[2];
                } else {
                    timelineDate.className = 'jtimeline-date';
                    timelineDate.innerHTML = '';
                }
                timelineDateContainer.appendChild(timelineDate);

                var timelineContent = document.createElement('div');
                timelineContent.className = 'jtimeline-content';

                // Title
                if (! v.title) {
                    v.title = v.subtitle ? v.subtitle : 'Information';
                }

                var timelineTitleContainer = document.createElement('div');
                timelineTitleContainer.className = 'jtimeline-title-container';
                timelineContent.appendChild(timelineTitleContainer);

                var timelineTitle = document.createElement('div');
                timelineTitle.className = 'jtimeline-title';
                timelineTitle.innerHTML = v.title;
                timelineTitleContainer.appendChild(timelineTitle);

                var timelineControls = document.createElement('div');
                timelineControls.className = 'jtimeline-controls';
                timelineTitleContainer.appendChild(timelineControls);

                var timelineEdit = document.createElement('i');
                timelineEdit.className = 'material-icons timeline-edit';
                timelineEdit.innerHTML = 'edit';
                timelineEdit.onclick = function() {
                    if (typeof(obj.options.onaction) == 'function') {
                        obj.options.onaction(obj, this);
                    }
                }
                if (v.author == 1) {
                    timelineControls.appendChild(timelineEdit);
                }

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
                var timelineTags = document.createElement('div');
                timelineTags.className = 'jtimeline-tags';
                timelineContent.appendChild(timelineTags);

                if (v.tags) {
                    var createTag = function(name, color) {
                        var timelineTag = document.createElement('div');
                        timelineTag.className = 'jtimeline-tag';
                        timelineTag.innerHTML = name;
                        if (color) {
                            timelineTag.style.backgroundColor = color;
                        }
                        return timelineTag; 
                    }

                    if (typeof(v.tags) == 'string') {
                        var t = createTag(v.tags);
                        timelineTags.appendChild(t);
                    } else {
                        for (var j = 0; j < v.tags.length; j++) {
                            var t = createTag(v.tags[j].text, v.tags[j].color);
                            timelineTags.appendChild(t);
                        }
                    }
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

        // Animation
        jSuites.animation.slideLeft(timelineContainer, 0, function() {
            obj.render(date);
            jSuites.animation.slideRight(timelineContainer, 1);
        });
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

        // Animation
        jSuites.animation.slideRight(timelineContainer, 0, function() {
            obj.render(date);
            jSuites.animation.slideLeft(timelineContainer, 1);
        });
    }

    obj.load = function() {
        // Init
        if (obj.options.url) {
            jSuites.ajax({
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
    }

    obj.reload = function() {
        obj.load();
    }

    obj.load();

    var timelineMouseUpControls = function(e) {
        if (e.target.classList.contains('jtimeline-next') || e.target.parentNode.classList.contains('jtimeline-next')) {
            obj.next();
        } else if (e.target.classList.contains('jtimeline-prev') || e.target.parentNode.classList.contains('jtimeline-prev')) {
            obj.prev();
        }
    }

    if ('ontouchend' in document.documentElement === true) {
        el.addEventListener("touchend", timelineMouseUpControls);
    } else {
        el.addEventListener("mouseup", timelineMouseUpControls);
    }

    // Add global events
    el.addEventListener("swipeleft", function(e) {
        obj.next();
        e.preventDefault();
        e.stopPropagation();
    });

    el.addEventListener("swiperight", function(e) {
        obj.prev();
        e.preventDefault();
        e.stopPropagation();
    });

    // Orderby
    Array.prototype.order = function() {
        return this.slice(0).sort(function(a, b) {
            var valueA = a.date;
            var valueB = b.date;

            return (valueA > valueB) ? 1 : (valueA < valueB) ? -1 : 0;
        });
    }

    el.timeline = obj;

    return obj;
});