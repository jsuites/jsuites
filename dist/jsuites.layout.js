jSuites.login = (function(el, options) {
    var obj = {};
    obj.options = {};

    // Default configuration
    var defaults = {
        url: window.location.href,
        prepareRequest: null,
        accessToken: null,
        deviceToken: null,
        facebookUrl: null,
        facebookAuthentication: null,
        maxHeight: null,
        onload: null,
        onsuccess: null,
        onerror: null,
        message: null,
        logo: null,
        newProfile: false,
        newProfileUrl: false,
        newProfileLogin: false,
        fullscreen: false,
        newPasswordValidation: null,
    };

    // Loop through our object
    for (var property in defaults) {
        if (options && options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    // Message console container
    if (! obj.options.message) {
        var messageElement = document.querySelector('.message');
        if (messageElement) {
            obj.options.message = messageElement;
        }
    }

    // Action
    var action = null;

    // Container
    var container = document.createElement('form');
    el.appendChild(container);

    // Logo
    var divLogo = document.createElement('div');
    divLogo.className = 'jlogin-logo'
    container.appendChild(divLogo);

    if (obj.options.logo) {
        var logo = document.createElement('img');
        logo.src = obj.options.logo;
        divLogo.appendChild(logo);
    }

    // Code
    var labelCode = document.createElement('label');
    labelCode.innerHTML = 'Please enter here the code received';
    var inputCode = document.createElement('input');
    inputCode.type = 'number';
    inputCode.id = 'code';
    inputCode.setAttribute('maxlength', 6);
    var divCode = document.createElement('div');
    divCode.appendChild(labelCode);
    divCode.appendChild(inputCode);

    // Hash
    var inputHash = document.createElement('input');
    inputHash.type = 'hidden';
    inputHash.name = 'h';
    var divHash = document.createElement('div');
    divHash.appendChild(inputHash);

    // Recovery
    var inputRecovery = document.createElement('input');
    inputRecovery.type = 'hidden';
    inputRecovery.name = 'recovery';
    inputRecovery.value = '1';
    var divRecovery = document.createElement('div');
    divRecovery.appendChild(inputRecovery);

    // Login
    var labelLogin = document.createElement('label');
    labelLogin.innerHTML = 'Login';
    var inputLogin = document.createElement('input');
    inputLogin.type = 'text';
    inputLogin.name = 'login';
    inputLogin.setAttribute('autocomplete', 'off');
    inputLogin.onkeyup = function() {
        this.value = this.value.toLowerCase().replace(/[^a-zA-Z0-9_+]+/gi, '');
    } 
    var divLogin = document.createElement('div');
    divLogin.appendChild(labelLogin);
    divLogin.appendChild(inputLogin);

    // Name
    var labelName = document.createElement('label');
    labelName.innerHTML = 'Name';
    var inputName = document.createElement('input');
    inputName.type = 'text';
    inputName.name = 'name';
    var divName = document.createElement('div');
    divName.appendChild(labelName);
    divName.appendChild(inputName);

    // Email
    var labelUsername = document.createElement('label');
    labelUsername.innerHTML = 'E-mail';
    var inputUsername = document.createElement('input');
    inputUsername.type = 'text';
    inputUsername.name = 'username';
    inputUsername.setAttribute('autocomplete', 'new-username');
    var divUsername = document.createElement('div');
    divUsername.appendChild(labelUsername);
    divUsername.appendChild(inputUsername);

    // Password
    var labelPassword = document.createElement('label');
    labelPassword.innerHTML = 'New password';
    var inputPassword = document.createElement('input');
    inputPassword.type = 'password';
    inputPassword.name = 'password';
    inputPassword.setAttribute('autocomplete', 'new-password');
    var divPassword = document.createElement('div');
    divPassword.appendChild(labelPassword);
    divPassword.appendChild(inputPassword);
    divPassword.onkeydown = function(e) {
        if (e.keyCode == 13) {
            obj.execute();
        }
    }

    // Repeat password
    var labelRepeatPassword = document.createElement('label');
    labelRepeatPassword.innerHTML = 'Repeat the new password';
    var inputRepeatPassword = document.createElement('input');
    inputRepeatPassword.type = 'password';
    inputRepeatPassword.name = 'password';
    var divRepeatPassword = document.createElement('div');
    divRepeatPassword.appendChild(labelRepeatPassword);
    divRepeatPassword.appendChild(inputRepeatPassword);

    // Remember checkbox
    var labelRemember = document.createElement('label');
    labelRemember.innerHTML = 'Remember me on this device';
    var inputRemember = document.createElement('input');
    inputRemember.type = 'checkbox';
    inputRemember.name = 'remember';
    inputRemember.value = '1';
    labelRemember.appendChild(inputRemember);
    var divRememberButton = document.createElement('div');
    divRememberButton.className = 'rememberButton';
    divRememberButton.appendChild(labelRemember);

    // Login button
    var actionButton = document.createElement('input');
    actionButton.type = 'button';
    actionButton.value = 'Log In';
    actionButton.onclick = function() {
        obj.execute();
    }
    var divActionButton = document.createElement('div');
    divActionButton.appendChild(actionButton);

    // Cancel button
    var cancelButton = document.createElement('div');
    cancelButton.innerHTML = 'Cancel';
    cancelButton.className = 'cancelButton';
    cancelButton.onclick = function() {
        obj.requestAccess();
    }
    var divCancelButton = document.createElement('div');
    divCancelButton.appendChild(cancelButton);

    // Captcha
    var labelCaptcha = document.createElement('label');
    labelCaptcha.innerHTML = 'Please type here the code below';
    var inputCaptcha = document.createElement('input');
    inputCaptcha.type = 'text';
    inputCaptcha.name = 'captcha';
    var imageCaptcha = document.createElement('img');
    var divCaptcha = document.createElement('div');
    divCaptcha.className = 'jlogin-captcha';
    divCaptcha.appendChild(labelCaptcha);
    divCaptcha.appendChild(inputCaptcha);
    divCaptcha.appendChild(imageCaptcha);

    // Facebook
    var facebookButton = document.createElement('div');
    facebookButton.innerHTML = 'Login with Facebook';
    facebookButton.className = 'facebookButton';
    var divFacebookButton = document.createElement('div');
    divFacebookButton.appendChild(facebookButton);
    divFacebookButton.onclick = function() {
        obj.requestLoginViaFacebook();
    }
    // Forgot password
    var inputRequest = document.createElement('span');
    inputRequest.innerHTML = 'Request a new password';
    var divRequestButton = document.createElement('div');
    divRequestButton.className = 'requestButton';
    divRequestButton.appendChild(inputRequest);
    divRequestButton.onclick = function() {
        obj.requestNewPassword();
    }
    // Create a new Profile
    var inputNewProfile = document.createElement('span');
    inputNewProfile.innerHTML = 'Create a new profile';
    var divNewProfileButton = document.createElement('div');
    divNewProfileButton.className = 'newProfileButton';
    divNewProfileButton.appendChild(inputNewProfile);
    divNewProfileButton.onclick = function() {
        obj.newProfile();
    }

    el.className = 'jlogin';

    if (obj.options.fullscreen == true) {
        el.classList.add('jlogin-fullscreen');
    }

    /** 
     * Show message
     */
    obj.showMessage = function(data) {
        var message = (typeof(data) == 'object') ? data.message : data;

        if (typeof(obj.options.showMessage) == 'function') {
            obj.options.showMessage(data);
        } else {
            jSuites.alert(data);
        }
    }

    /**
     * New profile
     */
    obj.newProfile = function() {
        container.innerHTML = '';
        container.appendChild(divLogo);
        if (obj.options.newProfileLogin) {
            container.appendChild(divLogin);
        }
        container.appendChild(divName);
        container.appendChild(divUsername);
        container.appendChild(divActionButton);
        if (obj.options.facebookAuthentication == true) {
            container.appendChild(divFacebookButton);
        }
        container.appendChild(divCancelButton);

        // Reset inputs
        inputLogin.value = '';
        inputUsername.value = '';
        inputPassword.value = '';

        // Button
        actionButton.value = 'Create new profile';

        // Action
        action = 'newProfile';
    }

    /**
     * Request the email with the recovery instructions
     */
    obj.requestNewPassword = function() {
        if (Array.prototype.indexOf.call(container.children, divCaptcha) >= 0) {
            var captcha = true;
        }

        container.innerHTML = '';
        container.appendChild(divLogo);
        container.appendChild(divRecovery);
        container.appendChild(divUsername);
        if (captcha) {
            container.appendChild(divCaptcha);
        }
        container.appendChild(divActionButton);
        container.appendChild(divCancelButton);
        actionButton.value = 'Request a new password';
        inputRecovery.value = 1;

        // Action
        action = 'requestNewPassword';
    }

    /**
     * Confirm recovery code
     */
    obj.codeConfirmation = function() {
        container.innerHTML = '';
        container.appendChild(divLogo);
        container.appendChild(divHash);
        container.appendChild(divCode);
        container.appendChild(divActionButton);
        container.appendChild(divCancelButton);
        actionButton.value = 'Confirm code';
        inputRecovery.value = 2;

        // Action
        action = 'codeConfirmation';
    }

    /**
     * Update my password
     */
    obj.changeMyPassword = function(hash) {
        container.innerHTML = '';
        container.appendChild(divLogo);
        container.appendChild(divHash);
        container.appendChild(divPassword);
        container.appendChild(divRepeatPassword);
        container.appendChild(divActionButton);
        container.appendChild(divCancelButton);
        actionButton.value = 'Change my password';
        inputHash.value = hash;

        // Action
        action = 'changeMyPassword';
    }

    /**
     * Request access default method
     */
    obj.requestAccess = function() {
        container.innerHTML = '';
        container.appendChild(divLogo);
        container.appendChild(divUsername);
        container.appendChild(divPassword);
        container.appendChild(divActionButton);
        if (obj.options.facebookAuthentication == true) {
            container.appendChild(divFacebookButton);
        }
        container.appendChild(divRequestButton);
        container.appendChild(divRememberButton);
        container.appendChild(divRequestButton);
        if (obj.options.newProfile == true) {
            container.appendChild(divNewProfileButton);
        }

        // Button
        actionButton.value = 'Login';

        // Password
        inputPassword.value = '';

        // Email persistence
        if (window.localStorage.getItem('username')) {
            inputUsername.value = window.localStorage.getItem('username');
            inputPassword.focus();
        } else {
            inputUsername.focus();
        }

        // Action
        action = 'requestAccess';
    }

    /**
     * Request login via facebook
     */
    obj.requestLoginViaFacebook = function() {
        if (typeof(deviceNotificationToken) == 'undefined') {
            FB.getLoginStatus(function(response) {
                if (! response.status || response.status != 'connected') {
                    FB.login(function(response) {
                        if (response.authResponse) {
                            obj.execute({ f:response.authResponse.accessToken });
                        } else {
                            obj.showMessage('Not authorized by facebook');
                        }
                    }, {scope: 'public_profile,email'});
                } else {
                    obj.execute({ f:response.authResponse.accessToken });
                }
            }, true);
        } else {
            jDestroy = function() {
                fbLogin.removeEventListener('loadstart', jStart);
                fbLogin.removeEventListener('loaderror', jError);
                fbLogin.removeEventListener('exit', jExit);
                fbLogin.close();
                fbLogin = null;
            }

            jStart = function(event) {
                var url = event.url;
                if (url.indexOf("access_token") >= 0) {
                    setTimeout(function(){
                        var u = url.match(/=(.*?)&/);
                        if (u[1].length > 32) {
                            obj.execute({ f:u[1] });
                        }
                        jDestroy();
                   },500);
                }

                if (url.indexOf("error=access_denied") >= 0) {
                   setTimeout(jDestroy ,500);
                   // Not authorized by facebook
                   obj.showMessage('Not authorized by facebook');
                }
            }

            jError = function(event) {
                jDestroy();
            }
        
            jExit = function(event) {
                jDestroy();
            }

            fbLogin = window.open(obj.options.facebookUrl, "_blank", "location=no,closebuttoncaption=Exit,disallowoverscroll=yes,toolbar=no");
            fbLogin.addEventListener('loadstart', jStart);
            fbLogin.addEventListener('loaderror', jError);
            fbLogin.addEventListener('exit', jExit);
        }

        // Action
        action = 'requestLoginViaFacebook';
    }

    // Perform request
    obj.execute = function(data) {
        // New profile
        if (action == 'newProfile') {
            var pattern = new RegExp(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/);
            if (! inputUsername.value || ! pattern.test(inputUsername.value)) {
                var message = 'Invalid e-mail address'; 
            }

            var pattern = new RegExp(/^[a-zA-Z0-9\_\-\.\s+]+$/);
            if (! inputLogin.value || ! pattern.test(inputLogin.value)) {
                var message = 'Invalid username, please use only characters and numbers';
            }

            if (message) {
                obj.showMessage(message);
                return false;
            }
        } else if (action == 'changeMyPassword') {
            if (inputPassword.value.length < 3) {
                var message = 'Password is too short';
            } else  if (inputPassword.value != inputRepeatPassword.value) {
                var message = 'Password should match';
            } else {
                if (typeof(obj.options.newPasswordValidation) == 'function') {
                    var val = obj.options.newPasswordValidation(obj, inputPassword.value, inputPassword.value);
                    if (val != undefined) {
                        message = val;
                    }
                }
            }

            if (message) {
                obj.showMessage(message);
                return false;
            }
        }

        // Keep email
        if (inputUsername.value != '') {
            window.localStorage.setItem('username', inputUsername.value);
        }

        // Captcha
        if (Array.prototype.indexOf.call(container.children, divCaptcha) >= 0) {
            if (inputCaptcha.value == '') {
                obj.showMessage('Please enter the captch code below');
                return false;
            }
        }

        // Url
        var url = obj.options.url;

        // Device token
        if (obj.options.deviceToken) {
            url += '?token=' + obj.options.deviceToken;
        }

        // Callback
        var onsuccess = function(result) {
            if (result) {
                // Successfully response
                if (result.success == 1) {
                    // Recovery process
                    if (action == 'requestNewPassword') {
                        obj.codeConfirmation();
                    } else if (action == 'codeConfirmation') {
                        obj.requestAccess();
                    } else if (action == 'newProfile') {
                        obj.requestAccess();
                        // New profile
                        result.newProfile = true;
                    }

                    // Token
                    if (result.token) {
                        // Set token
                        obj.options.accessToken = result.token;
                        // Save token
                        window.localStorage.setItem('Access-Token', result.token);
                    }
                }

                // Show message
                if (result.message) {
                    // Show message
                    obj.showMessage(result.message)
                }

                // Request captcha code
                if (! result.data) {
                    if (Array.prototype.indexOf.call(container.children, divCaptcha) >= 0) {
                        divCaptcha.remove();
                    }
                } else {
                    container.insertBefore(divCaptcha, divActionButton);
                    imageCaptcha.setAttribute('src', 'data:image/png;base64,' + result.data);
                }

                // Give time to user see the message
                if (result.hash) {
                    // Change password
                    obj.changeMyPassword(result.hash);
                } else if (result.url) {
                    // App initialization
                    if (result.success == 1) {
                        if (typeof(obj.options.onsuccess) == 'function') {
                            obj.options.onsuccess(result);
                        } else {
                            if (result.message) {
                                setTimeout(function() { window.location.href = result.url; }, 2000);
                            } else {
                                window.location.href = result.url;
                            }
                        }
                    } else {
                        if (typeof(obj.options.onerror) == 'function') {
                            obj.options.onerror(result);
                        }
                    }
                }
            }
        }

        // Password
        if (! data) {
            var data = jSuites.form.getElements(el, true);
            // Encode passworfd
            if (data.password) {
                data.password = jSuites.sha512(data.password);
            }
            // Recovery code
            if (Array.prototype.indexOf.call(container.children, divCode) >= 0 && inputCode.value) {
                data.h = jSuites.sha512(inputCode.value);
            }
        }

        // Loading
        el.classList.add('jlogin-loading');

        // Url
        var url = (action == 'newProfile' && obj.options.newProfileUrl) ? obj.options.newProfileUrl : obj.options.url;

        // Remote call
        jSuites.ajax({
            url: url,
            method: 'POST',
            dataType: 'json',
            data: data,
            success: function(result) {
                // Remove loading
                el.classList.remove('jlogin-loading');
                // Callback
                onsuccess(result);
            },
            error: function(result) {
                // Error
                el.classList.remove('jlogin-loading');

                if (typeof(obj.options.onerror) == 'function') {
                    obj.options.onerror(result);
                }
            }
        });
    }

    var queryString = window.location.href.split('?');
    if (queryString[1] && queryString[1].length == 130 && queryString[1].substr(0,2) == 'h=') {
        obj.changeMyPassword(queryString[1].substr(2));
    } else {
        obj.requestAccess();
    }

    return obj;
});

jSuites.login.sha512 = jSuites.sha512;

try {
    jSuites.component = class {
        constructor() {
        }

        refresh(element) {
            var k = Object.keys(this);
            for (var i = i; i < k.length; i++) {
                if (this.indexOf(k[i]) > -1) {
                    k[i];
                    return truel
                }
            }
            return false;
        }

        create() {
            var element = jSuites.element(this.render(), this);

            if (typeof(this.onload) == 'function') {
                this.onload(element, this);
            }

            return element;
        }
    }
} catch {
    // Do nothing
    jSuites.component = function() {
    }
}


jSuites.render = function(o, el, self) {
    if (! self) {
        self = {};
    }

    if (jSuites.isClass(o)) {
        var o = new o();
        el.appendChild(o.create());
    } else {
        el.appendChild(o(self));
    }

    return o;
}

jSuites.isClass = function(func) {
    return typeof func === 'function' && /^class\s/.test(Function.prototype.toString.call(func));
}

jSuites.element = (function() {
    var obj = function(html, s) {
        // Self
        var self = s ? s : {};
        // Make sure existing containers
        if (! self.state) {
            self.state = {};
        }
        if (! self.tracking) {
            self.tracking = {};
        }

        // Create the root element
        var div = document.createElement('div');

        // Get the DOM content
        div.innerHTML = html.trim();

        // Parse the content
        parse(div, self);

        return div;
    }

    var bind = function(property, self) {
        // If exists get the current value
        var tmp = self[property] || '';

        // Refresh
        var refreshProperty = function() {
            // Tracking
            if (self.tracking[property]) {
                for (var i = 0; i < self.tracking[property].length; i++) {
                    var value = eval(self.tracking[property][i].v);
                    if (self.tracking[property][i].property == 'html') {
                        self.tracking[property][i].element.innerHTML = value;
                    } else if (self.tracking[property][i].property == 'textContent') {
                        self.tracking[property][i].element.textContent = value;
                    } else if (self.tracking[property][i].property == 'value') {
                        self.tracking[property][i].element.value = value;
                    } else if (self.tracking[property][i].property == 'checked') {
                        self.tracking[property][i].element.checked = value;
                    } else {
                        self.tracking[property][i].element.setAttribute(self.tracking[property][i].property, value);
                    }
                }
            }
        }

        // Save as state
        if (Array.isArray(self[property])) {
            Array.prototype.refresh = refreshProperty;
        } else {
            Object.defineProperty(self, property, {
                set: function(val) {
                    // Update val
                    self.state[property] = val;
                    // Refresh binded elements
                    refreshProperty(val);
                },
                get: function() {
                    // Get value
                    return self.state[property];
                }
            });
        }

        // Set valuke
        self[property] = tmp;

        // Create tracking container for the property
        self.tracking[property] = [];
    }

    var create = function(element, res, type, self) {
        var tokens = res.v.match(/self\.([a-zA-Z0-9_].*?)*/g);
        if (tokens.length) {
            // Value
            var value = eval(res.v);
            // Create text node
            if (type == 'textContent') {
                var e = document.createTextNode(value);
                if (element.childNodes[0]) {
                    element.insertBefore(e, element.childNodes[0].splitText(res.p));
                } else {
                    element.appendChild(e);
                }
            } else {
                if (typeof(element[type]) !== 'undefined') {
                    e = element;
                    e[type] = value;
                }
            }

            for (var i = 0; i < tokens.length; i++) {
                // Get property name
                var token = tokens[i].replace('self.', '');

                if (! self.tracking[token]) {
                    // Create tracker
                    bind(token, self);
                }

                // Add to the tracking
                    self.tracking[token].push({
                    element: e,
                    property: type,
                    v: res.v
                });
            }
        }
    }

    var attributes = function(element, attr, type, self) {
        // Content
        var result = [];
        var index = 0;

        if (element.getAttribute && element.getAttribute(type)) {
            element.setAttribute(type, element.getAttribute(type).replace(/\{\{(.*?)\}\}/g, function (a,b,c,d) {
                result.push({ p: c - index, v: b });
                index = index + a.length;
                return '';
            }));
        } else {
            if (typeof(element[type]) == 'string') {
                element[type] = element[type].replace(/\{\{(.*?)\}\}/g, function (a,b,c,d) {
                    result.push({ p: c - index, v: b });
                    index = index + a.length;
                    return '';
                });
            }
        }

        if (result.length) {
            for (var i = result.length - 1; i >= 0; i--) {
                create(element, result[i], type, self);
            }
        }
    }
    
    var parse = function(element, self) {
        // Attributes
        var attr = {};

        if (element.attributes.length) {
            for (var i = 0; i < element.attributes.length; i++) {
                attr[element.attributes[i].name] = element.attributes[i].value;
            }
        }

        // Keys
        var k = Object.keys(attr);

        if (k.length) {
            for (var i = 0; i < k.length; i++) {
                // Parse events
                if (k[i].substring(0,2) == 'on') {
                    // Get event
                    var event = k[i].toLowerCase();
                    var value = attr[k[i]];

                    // Get action
                    element.removeAttribute(event);
                    if (! element.events) {
                        element.events = []
                    }
                    element.events[event.substring(2)] = value;
                    element[event] = function(e) {
                        eval(this.events[e.type]);
                    }
                    // Other properties
                } else {
                    if (k[i] == '@ready') {
                        var expression = attr[k[i]].replace('this', 'element');
                    } else if (k[i] == '@ref') {
                        var expression = attr[k[i]] + ' = element';
                    } else if (k[i] == '@checked') {
                        if (element.type == 'checkbox') {
                            if (! element.events) {
                                element.events = []
                            }
                            element.events.change = attr[k[i]] + ' = this.checked';
                            element.checked = eval(attr[k[i]]);
                            element.onchange = function(e) {
                                eval(this.events[e.type]);
                            }
                            element.checked = eval(attr[k[i]] + ' == true ? true : false');
                            element.removeAttribute(k[i]);
                        } else if (element.type == 'radio') {
                            if (! element.events) {
                                element.events = []
                            }
                            element.events.change = attr[k[i]] + ' = this.value';
                            element.onchange = function(e) {
                                eval(this.events[e.type]);
                            }
                            element.checked = eval(attr[k[i]]) == element.value ? true : false;
                            element.removeAttribute(k[i]);
                        }
                    } else {
                        attributes(element, attr[k[i]], k[i], self)
                    }

                    if (expression) {
                        element.removeAttribute(k[i]);
                        eval(expression);
                        expression = null;
                    }
                }
            }
        }

        // Check the children
        if (element.children.length) {
            for (var i = 0; i < element.children.length; i++) {
                parse(element.children[i], self);
            }
        } else {
            attributes(element, 'innerText', 'textContent', self);
        }

        // Create instances
        if (element.constructor == HTMLUnknownElement) {
            var m = element.tagName;
            m = m.charAt(0).toUpperCase() + m.slice(1).toLowerCase();
            m = eval(m);
            if (typeof(m) == 'function') {
                if (element.getAttribute('extended') == 'true') {
                    var e = self;
                } else {
                    var e = {};
                }

                for (var i = 0; i < element.attributes.length; i++) {
                    e[element.attributes[i].name] = element.attributes[i].value;
                }
                if (jSuites.isClass(m)) {
                    var instance = new m();
                    element.appendChild(instance.create());
                } else {
                    element.appendChild(m(e));
                }
            }
        }
    }

    return obj;
})();

/**
 * (c) jSuites template renderer
 * https://github.com/paulhodel/jsuites
 *
 * @author: Paul Hodel <paul.hodel@gmail.com>
 * @description: Template renderer
 */

jSuites.template = (function(el, options) {
    var obj = {};
    obj.options = {};

    // Default configuration
    var defaults = {
        url: null,
        data: null,
        filter: null,
        pageNumber: 0,
        numberOfPages: 0,
        template: null,
        render: null,
        noRecordsFound: 'No records found',
        // Searchable
        search: null,
        searchInput: true,
        searchPlaceHolder: '',
        searchValue: '',
        // Remote search
        remoteData: null,
        // Pagination page number of items
        pagination: null,
        onload: null,
        onchange: null,
        onsearch: null,
    }

    // Loop through our object
    for (var property in defaults) {
        if (options && options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    // Reset content
    el.innerHTML = '';

    // Input search
    if (obj.options.search && obj.options.searchInput == true) {
        // Timer
        var searchTimer = null;

        // Search container
        var searchContainer = document.createElement('div');
        searchContainer.className = 'jtemplate-results';
        obj.searchInput = document.createElement('input');
        obj.searchInput.value = obj.options.searchValue;
        obj.searchInput.onkeyup = function(e) {
            // Clear current trigger
            if (searchTimer) {
                clearTimeout(searchTimer);
            }
            // Prepare search
            searchTimer = setTimeout(function() {
                obj.search(obj.searchInput.value.toLowerCase());
                searchTimer = null;
            }, 300)
        }
        searchContainer.appendChild(obj.searchInput);
        el.appendChild(searchContainer);

        if (obj.options.searchPlaceHolder) {
            obj.searchInput.setAttribute('placeholder', obj.options.searchPlaceHolder);
        }
    }

    // Pagination container
    if (obj.options.pagination) {
        var pagination = document.createElement('div');
        pagination.className = 'jtemplate-pagination';
        el.appendChild(pagination);
    }

    // Content
    var container = document.createElement('div');
    container.className = 'jtemplate-content';
    el.appendChild(container);

    // Data container
    var searchResults = null;

    obj.updatePagination = function() {
        // Reset pagination container
        if (pagination) {
            pagination.innerHTML = '';
        }

        // Create pagination
        if (obj.options.pagination > 0 && obj.options.numberOfPages > 1) {
            // Number of pages
            var numberOfPages = obj.options.numberOfPages;

            // Controllers
            if (obj.options.pageNumber < 6) {
                var startNumber = 1;
                var finalNumber = numberOfPages < 10 ? numberOfPages : 10;
            } else if (numberOfPages - obj.options.pageNumber < 5) {
                var startNumber = numberOfPages - 9;
                var finalNumber = numberOfPages;
                if (startNumber < 1) {
                    startNumber = 1;
                }
            } else {
                var startNumber = obj.options.pageNumber - 4;
                var finalNumber = obj.options.pageNumber + 5;
            }

            // First
            if (startNumber > 1) {
                var paginationItem = document.createElement('div');
                paginationItem.innerHTML = '<';
                paginationItem.title = 1;
                pagination.appendChild(paginationItem);
            }

            // Get page links
            for (var i = startNumber; i <= finalNumber; i++) {
                var paginationItem = document.createElement('div');
                paginationItem.innerHTML = i;
                pagination.appendChild(paginationItem);

                if (obj.options.pageNumber == i - 1) {
                    paginationItem.style.fontWeight = 'bold';
                }
            }

            // Last
            if (finalNumber < numberOfPages) {
                var paginationItem = document.createElement('div');
                paginationItem.innerHTML = '>';
                paginationItem.title = numberOfPages - 1;
                pagination.appendChild(paginationItem);
            }
        }
    }

    obj.addItem = function(data, beginOfDataSet) {
        // Append itens
        var content = document.createElement('div');
        // Append data
        if (beginOfDataSet) {
            obj.options.data.unshift(data);
        } else {
            obj.options.data.push(data);
        }
        // If is empty remove indication
        if (container.classList.contains('jtemplate-empty')) {
            container.classList.remove('jtemplate-empty');
            container.innerHTML = '';
        }
        // Get content
        content.innerHTML = obj.options.template[Object.keys(options.template)[0]](data);
        // Add animation
        jSuites.animation.fadeIn(content.children[0]);
        // Add and do the animation
        if (beginOfDataSet) {
            container.prepend(content.children[0]);
        } else {
            container.append(content.children[0]);
        }
        // Onchange method
        if (typeof(obj.options.onchange) == 'function') {
            obj.options.onchange(el, obj.options.data);
        }
    }

    obj.removeItem = function(element) {
        if (Array.prototype.indexOf.call(container.children, element) > -1) {
            // Remove data from array
            var index = obj.options.data.indexOf(element.dataReference);
            if (index > -1) {
                obj.options.data.splice(index, 1);
            }
            // Remove element from DOM
            jSuites.animation.fadeOut(element, function() {
                element.parentNode.removeChild(element);

                if (! container.innerHTML) {
                    container.classList.add('jtemplate-empty');
                    container.innerHTML = obj.options.noRecordsFound;
                }
            });
        } else {
            console.error('Element not found');
        }
    }

    obj.setData = function(data) {
        if (data) {
            obj.options.pageNumber = 1;
            obj.options.searchValue = '';
            // Set data
            obj.options.data = data;
            // Reset any search results
            searchResults = null;

            // Render new data
            obj.render();

            // Onchange method
            if (typeof(obj.options.onchange) == 'function') {
                obj.options.onchange(el, obj.options.data);
            }
        }
    }

    obj.appendData = function(data, pageNumber) {
        if (pageNumber) {
            obj.options.pageNumber = pageNumber;
        }

        var execute = function(data) {
            // Concat data
            obj.options.data.concat(data);
            // Number of pages
            if (obj.options.pagination > 0) {
                obj.options.numberOfPages = Math.ceil(obj.options.data.length / obj.options.pagination);
            }
            var startNumber = 0;
            var finalNumber = data.length;
            // Append itens
            var content = document.createElement('div');
            for (var i = startNumber; i < finalNumber; i++) {
                content.innerHTML = obj.options.template[Object.keys(obj.options.template)[0]](data[i]);
                content.children[0].dataReference = data[i]; 
                container.appendChild(content.children[0]);
            }
        }

        if (obj.options.url && obj.options.remoteData == true) {
            // URL
            var url = obj.options.url;
            // Data
            var ajaxData = {};
            // Options for backend search
            if (obj.options.remoteData) {
                // Search value
                if (obj.options.searchValue) {
                    ajaxData.q = obj.options.searchValue;
                }
                // Page number
                if (obj.options.pageNumber) {
                    ajaxData.p = obj.options.pageNumber;
                }
                // Number items per page
                if (obj.options.pagination) {
                    ajaxData.t = obj.options.pagination;
                }
            }
            // Remote loading
            jSuites.ajax({
                url: url,
                method: 'GET',
                data: ajaxData,
                dataType: 'json',
                success: function(data) {
                    execute(data);
                }
            });
        } else {
            if (! obj.options.data) {
                console.log('TEMPLATE: no data or external url defined');
            } else {
                execute(data);
            }
        }
    }

    obj.renderTemplate = function() {
        // Data container
        var data = searchResults ? searchResults : obj.options.data;

        // Reset pagination
        obj.updatePagination();

        if (! data.length) {
            container.innerHTML = obj.options.noRecordsFound;
            container.classList.add('jtemplate-empty');
        } else {
            // Reset content
            container.classList.remove('jtemplate-empty');

            // Create pagination
            if (obj.options.pagination && data.length > obj.options.pagination) {
                var startNumber = (obj.options.pagination * obj.options.pageNumber);
                var finalNumber = (obj.options.pagination * obj.options.pageNumber) + obj.options.pagination;

                if (data.length < finalNumber) {
                    var finalNumber = data.length;
                }
            } else {
                var startNumber = 0;
                var finalNumber = data.length;
            }

            // Append itens
            var content = document.createElement('div');
            for (var i = startNumber; i < finalNumber; i++) {
                content.innerHTML = obj.options.template[Object.keys(obj.options.template)[0]](data[i]);
                content.children[0].dataReference = data[i]; 
                container.appendChild(content.children[0]);
            }
        }
    }

    obj.render = function(pageNumber, forceLoad) {
        // Update page number
        if (pageNumber != undefined) {
            obj.options.pageNumber = pageNumber;
        } else {
            if (! obj.options.pageNumber && obj.options.pagination > 0) {
                obj.options.pageNumber = 0;
            }
        }

        // Render data into template
        var execute = function() {
            // Render new content
            if (typeof(obj.options.render) == 'function') {
                container.innerHTML = obj.options.render(obj);
            } else {
                container.innerHTML = '';
            }

            // Load data
            obj.renderTemplate();

            // Onload
            if (forceLoad && typeof(obj.options.onload) == 'function') {
                obj.options.onload(el, obj);
            }
        }

        if (obj.options.url && (obj.options.remoteData == true || forceLoad)) {
            // URL
            var url = obj.options.url;
            // Data
            var ajaxData = {};
            // Options for backend search
            if (obj.options.remoteData) {
                // Search value
                if (obj.options.searchValue) {
                    ajaxData.q = obj.options.searchValue;
                }
                // Page number
                if (obj.options.pageNumber) {
                    ajaxData.p = obj.options.pageNumber;
                }
                // Number items per page
                if (obj.options.pagination) {
                    ajaxData.t = obj.options.pagination;
                }
            }
            // Remote loading
            jSuites.ajax({
                url: url,
                method: 'GET',
                dataType: 'json',
                data: ajaxData,
                success: function(data) {
                    // Search and keep data in the client side
                    if (data.hasOwnProperty("total")) {
                        obj.options.numberOfPages = Math.ceil(data.total / obj.options.pagination);
                        obj.options.data = data.data;
                    } else {
                        // Number of pages
                        if (obj.options.pagination > 0) {
                            obj.options.numberOfPages = Math.ceil(data.length / obj.options.pagination);
                        }
                        obj.options.data = data;
                    }

                    // Load data for the user
                    execute();
                }
            });
        } else {
            if (! obj.options.data) {
                console.log('TEMPLATE: no data or external url defined');
            } else {
                // Number of pages
                if (obj.options.pagination > 0) {
                    if (searchResults) {
                        obj.options.numberOfPages = Math.ceil(searchResults.length / obj.options.pagination);
                    } else {
                        obj.options.numberOfPages = Math.ceil(obj.options.data.length / obj.options.pagination);
                    }
                }
                // Load data for the user
                execute();
            }
        }
    }

    obj.search = function(query) {
        obj.options.pageNumber = 0;
        obj.options.searchValue = query ? query : '';

        // Filter data
        if (obj.options.remoteData == true || ! query) {
            searchResults = null;
        } else {
            var test = function(o, query) {
                for (var key in o) {
                    var value = o[key];

                    if ((''+value).toLowerCase().search(query) >= 0) {
                        return true;
                    }
                }
                return false;
            }

            if (typeof(obj.options.filter) == 'function') {
                searchResults = obj.options.filter(obj.options.data, query);
            } else {
                searchResults = obj.options.data.filter(function(item) {
                    return test(item, query);
                });
            }
        }

        obj.render();

        if (typeof(obj.options.onsearch) == 'function') {
            obj.options.onsearch(el, obj, query);
        }
    }

    obj.refresh = function() {
        obj.render();
    }

    obj.reload = function() {
        obj.render(0, true);
    }

    el.addEventListener('mousedown', function(e) {
        if (e.target.parentNode.classList.contains('jtemplate-pagination')) {
            var index = e.target.innerText;
            if (index == '<') {
                obj.render(0);
            } else if (index == '>') {
                obj.render(e.target.getAttribute('title'));
            } else {
                obj.render(parseInt(index)-1);
            }
            e.preventDefault();
        }
    });

    el.template = obj;

    // Render data
    obj.render(0, true);

    return obj;
});