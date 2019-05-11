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