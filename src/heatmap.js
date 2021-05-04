jSuites.heatmap = (function(el, options) {
    // New instance
    var obj = {};
    obj.options = {};

    // Create and apply the plugin body
    var createBody = function() {
        // Highest value in the data list
        var maxValue = obj.options.data.reduce(function(max, current) {
            return max > current.value ? max : current.value;
        }, 0);

        // Represents the date currently being used
        var date = new Date(obj.options.date);
        date.setDate(date.getDate() + 1);

        // Variable that stores the month currently being used
        var month = date.getMonth();

        // Array that stores the tds that correspond to the days until these tds are added to their respective table
        var setOfDays = [
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ];

        // Month name abbreviations
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        // Variable that stores the html that will later be inserted in the body of the plugin
        var pluginBody = `
          <table>
            <tbody>
              <tr>
                <td rowspan="2">Sun</td>
              </tr>
              <tr>
                <td></td>
              </tr>
              <tr>
                <td></td>
              </tr>
              <tr>
                <td></td>
              </tr>
              <tr>
                <td></td>
              </tr>
              <tr>
                <td></td>
              </tr>
              <tr>
                <td>Sat</td>
              </tr>
            </tbody>
          </table>
        `;

        pluginBody += `
          <table>
            <thead>
              <tr>
                <td colspan="6">${monthNames[date.getMonth()]}</td>
              </tr>
            </thead>
            <tbody>
        `;

        // Add empty tds to create an offset if the month doesn't start on Sunday
        var aux = 0;
        for (var aux = 0; aux < date.getDay(); aux++) {
            setOfDays[aux].push('<td class="blank-day"></td>');
        }

        // Last date that the plugin should show
        var finalDate = new Date(obj.options.date);
        finalDate.setFullYear(finalDate.getFullYear() + 1);

        var timeFinalDate = finalDate.getTime();

        // Function that checks the condition of the cycle
        var isValidDate = function() {
            return date.getTime() <= timeFinalDate;
        }

        // Cycle that spans one year from the date entered in the date parameter
        while (isValidDate()) {
            // Adaptation due to the difference of one day when creating a date object with a string
            var adaptedDate = new Date(date.getTime());
            adaptedDate.setDate(adaptedDate.getDate() - 1);

            var textAdaptedDate = adaptedDate.toISOString().slice(0, 10);

            // Object in the data array that corresponds to the date currently being treated
            var currentDay = obj.options.data.find(function(day) {
                return day.date === textAdaptedDate;
            });

            // If currentDay exists, a TD referring to it is added with a color resulting from its value
            if (currentDay) {
                var percentage = Math.trunc((currentDay.value * 100) / maxValue);

                var colorPosition = Math.trunc((percentage / 10) / 2);
                if (colorPosition > 4) {
                    colorPosition = 4;
                }

                setOfDays[date.getDay()].push(`<td style="background-color: ${obj.options.colors[colorPosition]}"></td>`);

                // If currentDay does not exist, a date with the day-not-informed class is added
            } else {
                setOfDays[date.getDay()].push(`<td class="day-not-informed"></td>`);
            }

            // Increment the date being treated by one day
            date.setDate(date.getDate() + 1);

            // If the date used in the next cycle is a different month from the treaty until then, fill in and close the month table
            if (date.getMonth() !== month) {
                setOfDays.forEach(function(days) {
                    pluginBody += '<tr>';

                    days.forEach(function(day) {
                        pluginBody += day;
                    })

                    pluginBody += '</tr>';
                });

                // Reset variable setOfDays
                setOfDays = [
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    []
                ];

                pluginBody += '</tbody></table>';

                // If the new date value is valid for entering the cycle again, a new table starts
                if (isValidDate()) {
                    pluginBody += `
                        <table>
                          <thead>
                            <tr>
                              <td colspan="6">${monthNames[date.getMonth()]}</td>
                            </tr>
                          </thead>
                          <tbody>
                      `;

                    // Add empty tds to create an offset if the month doesn't start on Sunday
                    var aux = 0;
                    for (var aux = 0; aux < date.getDay(); aux++) {
                        setOfDays[aux].push('<td class="blank-day"></td>');
                    }

                    // Update the variable that stores the current month
                    month = date.getMonth();
                }
            }
        }

        // Fill in and close the last month table
        setOfDays.forEach(function(days) {
            pluginBody += '<tr>';

            days.forEach(function(day) {
                pluginBody += day;
            });

            pluginBody += '</tr>';
        });

        pluginBody += '</tbody></table>';

        // Apply the plugin body to the tag passed as an argument
        el.getElementsByClassName('jheatmap-body')[0].innerHTML = pluginBody;
    }

    obj.setData = function(data) {
        obj.options.data = data;

        createBody();
    }

    obj.getData = function() {
        return obj.options.data.map(function(element) {
            return element;
        });
    }

    // Initializes the plugin
    var init = (function() {
        var defaults = {
            title: '',
            tooltip: false,
            colors: ['#FFECB3', '#FFD54F', '#FFC107', '#FFA000', '#FF6F00'],
            data: [],
            date: new Date().toISOString().slice(0, 10),
            onload: null,
        }

        // Fill the obj.options object
        for (var property in defaults) {
            if (options && options.hasOwnProperty(property)) {
                obj.options[property] = options[property];
            } else {
                obj.options[property] = defaults[property];
            }
        }

        // Add the plugin class to the tag that will receive it
        el.classList.add('jheatmap');

        // Apply the plugin header if it was passed as an argument
        if (obj.options.title !== '') {
            var pluginHeader = `
                <div class="jheatmap-header">${obj.options.title}</div>
              `;

            el.innerHTML = pluginHeader;
        }

        // Apply the plugin body if it was passed as an argument
        if (obj.options.data) {
            el.innerHTML += '<div class="jheatmap-body"></div>';
            createBody();
        }

        // Apply the plugin tooltip if it was passed as an argument
        if (obj.options.tooltip) {
            var pluginFooter = `
                <div class="jheatmap-footer">
                  <div>Less</div>
                  <table>
                    <tr>
                      <td style="background-color: ${obj.options.colors[0]}"></td>
                      <td style="background-color: ${obj.options.colors[1]}"></td>
                      <td style="background-color: ${obj.options.colors[2]}"></td>
                      <td style="background-color: ${obj.options.colors[3]}"></td>
                      <td style="background-color: ${obj.options.colors[4]}"></td>
                    </tr>
                  </table>
                  <div>More</div>
                </div>
              `;

            el.innerHTML += pluginFooter;
        }

        // Call the onload function, if it was passed as an argument
        if (obj.options.onload) {
            obj.options.onload(el, obj);
        }
    })();

    return obj;
});