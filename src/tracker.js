jSuites.tracker = (function(el, options) {
    var obj = {};
    obj.options = {};

    // Default configuration
    var defaults = {
        url: null,
        message: 'Are you sure? There are unsaved information in your form',
        ignore: false,
        currentHash: null,
        submitButton:null,
        onload: null,
        onbeforesave: null,
        onsave: null,
    };

    // Loop through our object
    for (var property in defaults) {
        if (options && options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    obj.setUrl = function(url) {
        obj.options.url = url;
    }

    obj.load = function() {
        jSuites.ajax({
            url: obj.options.url,
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                var elements = el.querySelectorAll("input, select, textarea");
 
                for (var i = 0; i < elements.length; i++) {
                    var name = elements[i].getAttribute('name');
                    if (data[name]) {
                        elements[i].value = data[name];
                    }
                }

                if (typeof(obj.options.onload) == 'function') {
                    obj.options.onload(el, data);
                }
            }
        });
    }

    obj.save = function() {
        var test = obj.validate();

        if (test) {
            jSuites.alert(test);
        } else {
            var data = obj.getElements(true);

            if (typeof(obj.options.onbeforesave) == 'function') {
                var data = obj.options.onbeforesave(el, data);

                if (data === false) {
                    console.log('Onbeforesave returned false');
                    return; 
                }
            }

            jSuites.ajax({
                url: obj.options.url,
                method: 'POST',
                dataType: 'json',
                data: data,
                success: function(result) {
                    jSuites.alert(result.message);

                    if (typeof(obj.options.onsave) == 'function') {
                        var data = obj.options.onsave(el, result);
                    }

                    obj.reset();
                }
            });
        }
    }

    obj.validateElement = function(element) {
        var emailChecker = function(data) {
            var pattern = new RegExp(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/);
            return pattern.test(data) ? true : false; 
        }

        var passwordChecker = function(data) {
            return (data.length > 5) ? true : false;
        }

        var addError = function(element) {
            // Add error in the element
            element.classList.add('error');
            // Submit button
            if (obj.options.submitButton) {
                obj.options.submitButton.setAttribute('disabled', true);
            }
            // Return error message
            return element.getAttribute('data-error') || 'There is an error in the form';
        }

        var delError = function(element) {
            var error = false;
            // Remove class from this element
            element.classList.remove('error');
            // Get elements in the form
            var elements = el.querySelectorAll("input, select, textarea");
            // Run all elements 
            for (var i = 0; i < elements.length; i++) {
                if (elements[i].getAttribute('data-validation')) {
                    if (elements[i].classList.contains('error')) {
                        error = true;
                    }
                }
            }

            if (obj.options.submitButton) {
                if (error) {
                    obj.options.submitButton.setAttribute('disabled', true);
                } else {
                    obj.options.submitButton.removeAttribute('disabled');
                }
            }
        }

        // Blank
        var test = '';
        if (! element.value) {
            test = addError(element);
        } else if (element.getAttribute('data-email') && ! emailChecker(element.value)) {
            test = addError(element);
        } else if (element.getAttribute('data-password') && ! emailChecker(element.value)) {
            test = addError(element);
        } else {
            if (element.classList.contains('error')) {
                delError(element);
            }
        }

        return test;
    }

    // Run form validation
    obj.validate = function() {
        var test = '';
        // Get elements in the form
        var elements = el.querySelectorAll("input, select, textarea");
        // Run all elements 
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].getAttribute('data-validation')) {
                if (test) {
                    test += "<br>\r\n";
                }
                test += obj.validateElement(elements[i]);
            }
        }
        return test;
    }

    // Check the form
    obj.getError = function() {
        // Validation
        return obj.validation() ? true : false;
    }

    // Return the form hash
    obj.setHash = function() {
        return obj.getHash(obj.getElements());
    }

    // Get the form hash
    obj.getHash = function(str) {
        var hash = 0, i, chr;

        if (str.length === 0) {
            return hash;
        } else {
            for (i = 0; i < str.length; i++) {
              chr = str.charCodeAt(i);
              hash = ((hash << 5) - hash) + chr;
              hash |= 0;
            }
        }

        return hash;
    }

    // Is there any change in the form since start tracking?
    obj.isChanged = function() {
        var hash = obj.setHash();
        return (obj.options.currentHash != hash);
    }

    // Restart tracking
    obj.resetTracker = function() {
        obj.options.currentHash = obj.setHash();
        obj.options.ignore = false;
    }

    obj.reset = function() {
        obj.options.currentHash = obj.setHash();
        obj.options.ignore = false;
    }

    // Ignore flag
    obj.setIgnore = function(ignoreFlag) {
        obj.options.ignore = ignoreFlag ? true : false;
    }

    // Get form elements
    obj.getElements = function(asArray) {
        var data = {};
        var elements = el.querySelectorAll("input, select, textarea");

        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            var name = element.name;
            var value = element.value;

            if (name) {
                data[name] = value;
            }
        }

        return asArray == true ? data : JSON.stringify(data);
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

    // Validations
    el.addEventListener("keyup", function(e) {
        if (e.target.getAttribute('data-validation')) {
            obj.validateElement(e.target);
        }
    });

    el.tracker = obj;

    return obj;
});