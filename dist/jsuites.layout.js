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
    labelPassword.innerHTML = 'Password';
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

jSuites.menu = (function(el, options) {
    var obj = {};

    obj.show = function() {
        el.style.display = 'block';
        jSuites.animation.slideLeft(el, 1);
    }

    obj.hide = function() {
        jSuites.animation.slideLeft(el, 0, function() {
            el.style.display = '';
        });
    }

    obj.load = function() {
        if (localStorage) {
            var menu = el.querySelectorAll('nav');
            for (var i = 0; i < menu.length; i++) {
                menu[i].classList.remove('selected');
                if (menu[i].getAttribute('data-id')) {
                    var state = localStorage.getItem('jmenu-' + menu[i].getAttribute('data-id'));
                    if (state === null || state == 1) {
                        menu[i].classList.add('selected');
                    }
                }
            }
            var href = localStorage.getItem('jmenu-href');
            if (href) {
                var menu = document.querySelector('.jmenu a[href="'+ href +'"]');
                if (menu) {
                    menu.classList.add('selected');
                }
            }
        }
    }

    obj.select = function(o) {
        var menu = el.querySelectorAll('nav a');
        for (var i = 0; i < menu.length; i++) {
            menu[i].classList.remove('selected');
        }
        o.classList.add('selected');
    }

    var actionDown = function(e) {
        if (e.target.tagName == 'H2') {
            if (e.target.parentNode.classList.contains('selected')) {
                e.target.parentNode.classList.remove('selected');
                localStorage.setItem('jmenu-' + e.target.parentNode.getAttribute('data-id'), 0);
            } else {
                e.target.parentNode.classList.add('selected');
                localStorage.setItem('jmenu-' + e.target.parentNode.getAttribute('data-id'), 1);
            }
        } else if (e.target.tagName == 'A') {
            // Mark link as selected
            obj.select(e.target);
            // Keep the refernce in case load the page again
            localStorage.setItem('jmenu-href', e.target.getAttribute('href'));
            // Close menu if is oped
            obj.hide();
        }
    }

    if ('ontouchstart' in document.documentElement === true) {
        el.addEventListener('touchstart', actionDown);
    } else {
        el.addEventListener('mousedown', actionDown);
    }

    // Add close action
    var i = document.createElement('i');
    i.className = 'material-icons small-screen-only close';
    i.innerText = 'close';
    i.onclick = function() {
        obj.hide();
    }
    el.appendChild(i);

    // Add menu class
    el.classList.add('jmenu');

    /*var h1 = window.innerHeight;
    var h2 = el.offsetTop;

    // Add the scroll
    jSuites.scroll(el, {
        //height: (h1 - h2) + 'px'
        height: '1000px',
    });*/

    // Load state
    obj.load();

    // Keep reference
    el.menu = obj;

    return obj;
});


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
        containerClass: null,
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
        onclick: null,
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
    if (obj.options.containerClass) {
        container.className = obj.options.containerClass;
    }
    container.classList.add ('jtemplate-content');
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

    /**
     * Append data to the template and add to the DOMContainer
     * @param data
     * @param contentDOMContainer
     */
    obj.setContent = function(a, b) {
        var c = obj.options.template[Object.keys(obj.options.template)[0]](a);
        if ((c instanceof Element || c instanceof HTMLDocument)) {
            b.appendChild(c);
        } else {
            b.innerHTML = c;
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
        obj.setContent(data, content);
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
                obj.setContent(data[i], content)
                content.children[0].dataReference = data[i]; // TODO: data[i] or i?
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

        // Data filtering
        if (typeof(obj.options.filter) == 'function') {
            data = obj.options.filter(data);
        }

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
                // Get content
                obj.setContent(data[i], content);
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
            if (typeof(obj.options.onload) == 'function') {
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

            searchResults = obj.options.data.filter(function(item) {
                return test(item, query);
            });
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

    el.addEventListener('click', function(e) {
        if (typeof(obj.options.onclick) == 'function') {
            obj.options.onclick(el, obj, e);
        }
    });

    el.template = obj;

    // Render data
    obj.render(0, true);

    return obj;
});

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

    obj.add = function(data) {
        var date = data.date.substr(0,7);

        // Create the object if not exists
        if (! obj.options.data[date]) {
            obj.options.data[date] = [];
        }

        // Format date
        data.date = data.date.substr(0,10);

        // Append data
        obj.options.data[date].push(data);

        // Reorder
        obj.options.data[date] = obj.options.data[date].order();

        // Render
        obj.render(date);
    }

    obj.remove = function(item) {
        var index = item.getAttribute('data-index');
        var date = item.getAttribute('data-date');

        jSuites.animation.fadeOut(item, function() {
            item.remove();
        });

        obj.options.data[date].splice(index, 1);
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
