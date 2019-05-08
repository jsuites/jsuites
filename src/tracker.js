jApp.tracker = (function(el, options) {
    if (! options) {
        options = {};
    }

    // Set options
    el.options = options;

    // Do not ignore changes
    el.options.ignore = false;

    // Return the form hash
    el.setHash = function() {
        return el.getHash(el.getElements());
    }

    // Get the form hash
    el.getHash = function(str) {
        return str.split('').reduce((prevHash, currVal) => ((prevHash << 5) - prevHash) + currVal.charCodeAt(0), 0);
    }

    // Is there any change in the form since start tracking?
    el.isChanged = function() {
        var hash = el.setHash();
        return (el.options.currentHash != hash);
    }

    // Change the ignore flag
    el.setIgnore = function(option) {
        el.options.ignore = option;
    }

    // Restart tracking
    el.resetTracker = function() {
        el.options.currentHash = el.setHash();
        el.options.ignore = false;
    }

    // Get form elements
    el.getElements = function() {
        var obj = {};
        var elements = el.querySelectorAll("input, select, textarea");
        for( var i = 0; i < elements.length; ++i ) {
            var element = elements[i];
            var name = element.name;
            var value = element.value;

            if (name) {
                obj[name] = value;
            }
        }

        return JSON.stringify(obj);
    }

    // Start tracking in one second
    setTimeout(function() {
        el.options.currentHash = el.setHash();
    }, 1000);

    // Alert
    window.addEventListener("beforeunload", function (e) {
        if (el.isChanged()) {
            var confirmationMessage =  el.options.message? el.options.message : "\o/";

            if (confirmationMessage && el.options.ignore == false) {
                if (typeof e == 'undefined') {
                    e = window.event;
                }

                if (e) {
                    e.returnValue = message;
                }

                return confirmationMessage;
            } else {
                return void(0);
            }
        }
    });

    return el;
});