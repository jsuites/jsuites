jSuites.form = (function(el, options) {
    var obj = {};
    obj.options = {};

    // Default configuration
    var defaults = {
        url: null,
        message: 'Are you sure? There are unsaved information in your form',
        ignore: false,
        currentHash: null,
        submitButton:null,
        validations: null,
        onload: null,
        onbeforesave: null,
        onsave: null,
        onerror: function(el, message) {
            jSuites.alert(message);
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

    // Validations
    if (! obj.options.validations) {
        obj.options.validations = {};
    }

    // submitButton
    if (obj.options.submitButton && obj.options.url) {
        obj.options.submitButton.onclick = function() {
            obj.save();
        }
    }

    if (! obj.options.validations.email) {
        obj.options.validations.email = function(data) {
            var reg = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
            return data && reg.test(data) ? true : false; 
        }
    }

    if (! obj.options.validations.length) {
        obj.options.validations.length = function(data, element) {
            var len = element.getAttribute('data-length') || 5;
            return (data.length >= len) ? true : false;
        }
    }

    if (! obj.options.validations.required) {
        obj.options.validations.required = function(data) {
            return data.trim() ? true : false;
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
                jSuites.form.setElements(el, data);

                if (typeof(obj.options.onload) == 'function') {
                    obj.options.onload(el, data);
                }
            }
        });
    }

    obj.save = function() {
        var test = obj.validate();

        if (test) {
            obj.options.onerror(el, test);
        } else {
            var data = jSuites.form.getElements(el, true);

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
                    if (typeof(obj.options.onsave) == 'function') {
                        obj.options.onsave(el, data, result);
                    }

                    obj.reset();
                }
            });
        }
    }

    var addError = function(element) {
        // Add error in the element
        element.classList.add('error');
        // Submit button
        if (obj.options.submitButton) {
            obj.options.submitButton.setAttribute('disabled', true);
        }
        // Return error message
        var error = element.getAttribute('data-error') || 'There is an error in the form';
        element.setAttribute('title', error);
        return error;
    }

    var delError = function(element) {
        var error = false;
        // Remove class from this element
        element.classList.remove('error');
        element.removeAttribute('title');
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

    obj.validateElement = function(element) {
        // Test results
        var test = false;
        // Validation
        var validation = element.getAttribute('data-validation');
        // Parse
        if (typeof(obj.options.validations[validation]) == 'function' && ! obj.options.validations[validation](element.value, element)) {
            // Not passed in the test
            test = addError(element);
        } else {
            if (element.classList.contains('error')) {
                delError(element);
            }
        }

        return test;
    }

    obj.reset = function() {
        // Get elements in the form
        var elements = el.querySelectorAll("input, select, textarea");
        // Run all elements 
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].tagName == 'INPUT' && elements[i].type == 'checkbox') {
                elements[i].removeAttribute('checked');
            } else {
                elements[i].value = '';
            }
        }
    }

    // Run form validation
    obj.validate = function() {
        var test = [];
        // Get elements in the form
        var elements = el.querySelectorAll("input, select, textarea");
        // Run all elements 
        for (var i = 0; i < elements.length; i++) {
            // Required
            if (elements[i].getAttribute('data-validation')) {
                var res = obj.validateElement(elements[i]);
                if (res) {
                    test.push(res);
                }
            }
        }
        if (test.length > 0) {
            return test.join('<br>');
        } else {
            return false;
        }
    }

    // Check the form
    obj.getError = function() {
        // Validation
        return obj.validation() ? true : false;
    }

    // Return the form hash
    obj.setHash = function() {
        return obj.getHash(jSuites.form.getElements(el));
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

    // Start tracking in one second
    setTimeout(function() {
        obj.options.currentHash = obj.setHash();
    }, 1000);

    // Validations
    el.addEventListener("keyup", function(e) {
        if (e.target.getAttribute('data-validation')) {
            obj.validateElement(e.target);
        }
    });

    // Alert
    if (! jSuites.form.hasEvents) {
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

        jSuites.form.hasEvents = true;
    }

    el.form = obj;

    return obj;
});

// Get form elements
jSuites.form.getElements = function(el, asArray) {
    var data = {};
    var elements = el.querySelectorAll("input, select, textarea");

    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        var name = element.name;
        var value = element.value;

        if (name) {
            if (elements[i].type == 'checkbox' || elements[i].type == 'radio') {
                value = elements[i].checked;
            }
            data[name] = value;
        }
    }

    return asArray == true ? data : JSON.stringify(data);
}

//Get form elements
jSuites.form.setElements = function(el, data) {
    var elements = el.querySelectorAll("input, select, textarea");

    for (var i = 0; i < elements.length; i++) {
        var name = elements[i].getAttribute('name');
        if (data[name]) {
            elements[i].value = data[name];
        }
    }
}

// Legacy
jSuites.tracker = jSuites.form;