/**
 * (c) jLogin
 * https://github.com/paulhodel/jtools
 *
 * @author: Paul Hodel <paul.hodel@gmail.com>
 * @description: Login helper
 */

jSuites.login = (function(el, options) {
    var obj = {};
    obj.options = {};

    // Default configuration
    var defaults = {
        url:window.location.href,
        prepareRequest:null,
        accessToken:null,
        deviceToken:null,
        facebookUrl:null,
        maxHeight:null,
        onload:null,
        message:null,
        logo:null,
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

    // Container
    var container = document.createElement('div');
    el.appendChild(container);

    // Logo
    var divLogo = document.createElement('div');
    divLogo.className = 'logo'
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

    // Email
    var labelUsername = document.createElement('label');
    labelUsername.innerHTML = 'E-mail';
    var inputUsername = document.createElement('input');
    inputUsername.type = 'text';
    inputUsername.name = 'username';
    var divUsername = document.createElement('div');
    divUsername.appendChild(labelUsername);
    divUsername.appendChild(inputUsername);

    // Password
    var labelPassword = document.createElement('label');
    labelPassword.innerHTML = 'Password';
    var inputPassword = document.createElement('input');
    inputPassword.type = 'password';
    inputPassword.name = 'password';
    var divPassword = document.createElement('div');
    divPassword.appendChild(labelPassword);
    divPassword.appendChild(inputPassword);

    // Repeat password
    var labelRepeatPassword = document.createElement('label');
    labelRepeatPassword.innerHTML = 'Password';
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

    el.className = 'jlogin';

    /** 
     * Show message
     */
    obj.showMessage = function(data) {
        var message = (typeof(data) == 'object') ? data.message : data;

        if (typeof(obj.options.showMessage) == 'function') {
            obj.options.showMessage(data);
        } else {
            alert(data);
        }
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
        container.appendChild(divFacebookButton);
        container.appendChild(divRequestButton);
        container.appendChild(divRememberButton);
        container.appendChild(divRequestButton);
        actionButton.value = 'Login';

        // Email persistence
        if (window.localStorage.getItem('username')) {
            inputUsername.value = window.localStorage.getItem('username');
            inputPassword.focus();
        } else {
            inputUsername.focus();
        }
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

            fbLogin = window.open(this.facebookUrl, "_blank", "location=no,closebuttoncaption=Exit,disallowoverscroll=yes,toolbar=no");
            fbLogin.addEventListener('loadstart', jStart);
            fbLogin.addEventListener('loaderror', jError);
            fbLogin.addEventListener('exit', jExit);
        }
    }

    // Perform request
    obj.execute = function(data) {
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
                    if (Array.prototype.indexOf.call(container.children, divRecovery) >= 0) {
                        if (inputRecovery.value == 1) {
                            obj.codeConfirmation();
                        } else {
                            obj.requestAccess();
                        }
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
                        if (typeof(obj.options.onload) == 'function') {
                            obj.options.onload(result);
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
            var data = jSuites.getFormElements(el);
            // Encode passworfd
            if (data.password) {
                data.password = jSuites.login.sha512(data.password);
            }
            // Recovery code
            if (Array.prototype.indexOf.call(container.children, divCode) >= 0 && inputCode.value) {
                data.h = jSuites.login.sha512(inputCode.value);
            }
        }
        var data = new URLSearchParams(data);

        // Remote call
        fetch(obj.options.url, {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }),
            body: data
        })
        .then(function(data) {
            data.json().then(function(result) {
                onsuccess(result);
            })
        });
    }

    obj.requestAccess();

    return obj;
});

jSuites.login.sha512 = (function(str) {
    function int64(msint_32, lsint_32) {
        this.highOrder = msint_32;
        this.lowOrder = lsint_32;
    }

    var H = [new int64(0x6a09e667, 0xf3bcc908), new int64(0xbb67ae85, 0x84caa73b),
        new int64(0x3c6ef372, 0xfe94f82b), new int64(0xa54ff53a, 0x5f1d36f1),
        new int64(0x510e527f, 0xade682d1), new int64(0x9b05688c, 0x2b3e6c1f),
        new int64(0x1f83d9ab, 0xfb41bd6b), new int64(0x5be0cd19, 0x137e2179)];

    var K = [new int64(0x428a2f98, 0xd728ae22), new int64(0x71374491, 0x23ef65cd),
        new int64(0xb5c0fbcf, 0xec4d3b2f), new int64(0xe9b5dba5, 0x8189dbbc),
        new int64(0x3956c25b, 0xf348b538), new int64(0x59f111f1, 0xb605d019),
        new int64(0x923f82a4, 0xaf194f9b), new int64(0xab1c5ed5, 0xda6d8118),
        new int64(0xd807aa98, 0xa3030242), new int64(0x12835b01, 0x45706fbe),
        new int64(0x243185be, 0x4ee4b28c), new int64(0x550c7dc3, 0xd5ffb4e2),
        new int64(0x72be5d74, 0xf27b896f), new int64(0x80deb1fe, 0x3b1696b1),
        new int64(0x9bdc06a7, 0x25c71235), new int64(0xc19bf174, 0xcf692694),
        new int64(0xe49b69c1, 0x9ef14ad2), new int64(0xefbe4786, 0x384f25e3),
        new int64(0x0fc19dc6, 0x8b8cd5b5), new int64(0x240ca1cc, 0x77ac9c65),
        new int64(0x2de92c6f, 0x592b0275), new int64(0x4a7484aa, 0x6ea6e483),
        new int64(0x5cb0a9dc, 0xbd41fbd4), new int64(0x76f988da, 0x831153b5),
        new int64(0x983e5152, 0xee66dfab), new int64(0xa831c66d, 0x2db43210),
        new int64(0xb00327c8, 0x98fb213f), new int64(0xbf597fc7, 0xbeef0ee4),
        new int64(0xc6e00bf3, 0x3da88fc2), new int64(0xd5a79147, 0x930aa725),
        new int64(0x06ca6351, 0xe003826f), new int64(0x14292967, 0x0a0e6e70),
        new int64(0x27b70a85, 0x46d22ffc), new int64(0x2e1b2138, 0x5c26c926),
        new int64(0x4d2c6dfc, 0x5ac42aed), new int64(0x53380d13, 0x9d95b3df),
        new int64(0x650a7354, 0x8baf63de), new int64(0x766a0abb, 0x3c77b2a8),
        new int64(0x81c2c92e, 0x47edaee6), new int64(0x92722c85, 0x1482353b),
        new int64(0xa2bfe8a1, 0x4cf10364), new int64(0xa81a664b, 0xbc423001),
        new int64(0xc24b8b70, 0xd0f89791), new int64(0xc76c51a3, 0x0654be30),
        new int64(0xd192e819, 0xd6ef5218), new int64(0xd6990624, 0x5565a910),
        new int64(0xf40e3585, 0x5771202a), new int64(0x106aa070, 0x32bbd1b8),
        new int64(0x19a4c116, 0xb8d2d0c8), new int64(0x1e376c08, 0x5141ab53),
        new int64(0x2748774c, 0xdf8eeb99), new int64(0x34b0bcb5, 0xe19b48a8),
        new int64(0x391c0cb3, 0xc5c95a63), new int64(0x4ed8aa4a, 0xe3418acb),
        new int64(0x5b9cca4f, 0x7763e373), new int64(0x682e6ff3, 0xd6b2b8a3),
        new int64(0x748f82ee, 0x5defb2fc), new int64(0x78a5636f, 0x43172f60),
        new int64(0x84c87814, 0xa1f0ab72), new int64(0x8cc70208, 0x1a6439ec),
        new int64(0x90befffa, 0x23631e28), new int64(0xa4506ceb, 0xde82bde9),
        new int64(0xbef9a3f7, 0xb2c67915), new int64(0xc67178f2, 0xe372532b),
        new int64(0xca273ece, 0xea26619c), new int64(0xd186b8c7, 0x21c0c207),
        new int64(0xeada7dd6, 0xcde0eb1e), new int64(0xf57d4f7f, 0xee6ed178),
        new int64(0x06f067aa, 0x72176fba), new int64(0x0a637dc5, 0xa2c898a6),
        new int64(0x113f9804, 0xbef90dae), new int64(0x1b710b35, 0x131c471b),
        new int64(0x28db77f5, 0x23047d84), new int64(0x32caab7b, 0x40c72493),
        new int64(0x3c9ebe0a, 0x15c9bebc), new int64(0x431d67c4, 0x9c100d4c),
        new int64(0x4cc5d4be, 0xcb3e42b6), new int64(0x597f299c, 0xfc657e2a),
        new int64(0x5fcb6fab, 0x3ad6faec), new int64(0x6c44198c, 0x4a475817)];

    var W = new Array(64);
    var a, b, c, d, e, f, g, h, i, j;
    var T1, T2;
    var charsize = 8;

    function utf8_encode(str) {
        return unescape(encodeURIComponent(str));
    }

    function str2binb(str) {
        var bin = [];
        var mask = (1 << charsize) - 1;
        var len = str.length * charsize;
    
        for (var i = 0; i < len; i += charsize) {
            bin[i >> 5] |= (str.charCodeAt(i / charsize) & mask) << (32 - charsize - (i % 32));
        }
    
        return bin;
    }

    function binb2hex(binarray) {
        var hex_tab = "0123456789abcdef";
        var str = "";
        var length = binarray.length * 4;
        var srcByte;

        for (var i = 0; i < length; i += 1) {
            srcByte = binarray[i >> 2] >> ((3 - (i % 4)) * 8);
            str += hex_tab.charAt((srcByte >> 4) & 0xF) + hex_tab.charAt(srcByte & 0xF);
        }

        return str;
    }

    function safe_add_2(x, y) {
        var lsw, msw, lowOrder, highOrder;

        lsw = (x.lowOrder & 0xFFFF) + (y.lowOrder & 0xFFFF);
        msw = (x.lowOrder >>> 16) + (y.lowOrder >>> 16) + (lsw >>> 16);
        lowOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

        lsw = (x.highOrder & 0xFFFF) + (y.highOrder & 0xFFFF) + (msw >>> 16);
        msw = (x.highOrder >>> 16) + (y.highOrder >>> 16) + (lsw >>> 16);
        highOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

        return new int64(highOrder, lowOrder);
    }

    function safe_add_4(a, b, c, d) {
        var lsw, msw, lowOrder, highOrder;

        lsw = (a.lowOrder & 0xFFFF) + (b.lowOrder & 0xFFFF) + (c.lowOrder & 0xFFFF) + (d.lowOrder & 0xFFFF);
        msw = (a.lowOrder >>> 16) + (b.lowOrder >>> 16) + (c.lowOrder >>> 16) + (d.lowOrder >>> 16) + (lsw >>> 16);
        lowOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

        lsw = (a.highOrder & 0xFFFF) + (b.highOrder & 0xFFFF) + (c.highOrder & 0xFFFF) + (d.highOrder & 0xFFFF) + (msw >>> 16);
        msw = (a.highOrder >>> 16) + (b.highOrder >>> 16) + (c.highOrder >>> 16) + (d.highOrder >>> 16) + (lsw >>> 16);
        highOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

        return new int64(highOrder, lowOrder);
    }

    function safe_add_5(a, b, c, d, e) {
        var lsw, msw, lowOrder, highOrder;

        lsw = (a.lowOrder & 0xFFFF) + (b.lowOrder & 0xFFFF) + (c.lowOrder & 0xFFFF) + (d.lowOrder & 0xFFFF) + (e.lowOrder & 0xFFFF);
        msw = (a.lowOrder >>> 16) + (b.lowOrder >>> 16) + (c.lowOrder >>> 16) + (d.lowOrder >>> 16) + (e.lowOrder >>> 16) + (lsw >>> 16);
        lowOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

        lsw = (a.highOrder & 0xFFFF) + (b.highOrder & 0xFFFF) + (c.highOrder & 0xFFFF) + (d.highOrder & 0xFFFF) + (e.highOrder & 0xFFFF) + (msw >>> 16);
        msw = (a.highOrder >>> 16) + (b.highOrder >>> 16) + (c.highOrder >>> 16) + (d.highOrder >>> 16) + (e.highOrder >>> 16) + (lsw >>> 16);
        highOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

        return new int64(highOrder, lowOrder);
    }

    function maj(x, y, z) {
        return new int64(
            (x.highOrder & y.highOrder) ^ (x.highOrder & z.highOrder) ^ (y.highOrder & z.highOrder),
            (x.lowOrder & y.lowOrder) ^ (x.lowOrder & z.lowOrder) ^ (y.lowOrder & z.lowOrder)
        );
    }

    function ch(x, y, z) {
        return new int64(
            (x.highOrder & y.highOrder) ^ (~x.highOrder & z.highOrder),
            (x.lowOrder & y.lowOrder) ^ (~x.lowOrder & z.lowOrder)
        );
    }

    function rotr(x, n) {
        if (n <= 32) {
            return new int64(
             (x.highOrder >>> n) | (x.lowOrder << (32 - n)),
             (x.lowOrder >>> n) | (x.highOrder << (32 - n))
            );
        } else {
            return new int64(
             (x.lowOrder >>> n) | (x.highOrder << (32 - n)),
             (x.highOrder >>> n) | (x.lowOrder << (32 - n))
            );
        }
    }

    function sigma0(x) {
        var rotr28 = rotr(x, 28);
        var rotr34 = rotr(x, 34);
        var rotr39 = rotr(x, 39);

        return new int64(
            rotr28.highOrder ^ rotr34.highOrder ^ rotr39.highOrder,
            rotr28.lowOrder ^ rotr34.lowOrder ^ rotr39.lowOrder
        );
    }

    function sigma1(x) {
        var rotr14 = rotr(x, 14);
        var rotr18 = rotr(x, 18);
        var rotr41 = rotr(x, 41);

        return new int64(
            rotr14.highOrder ^ rotr18.highOrder ^ rotr41.highOrder,
            rotr14.lowOrder ^ rotr18.lowOrder ^ rotr41.lowOrder
        );
    }

    function gamma0(x) {
        var rotr1 = rotr(x, 1), rotr8 = rotr(x, 8), shr7 = shr(x, 7);

        return new int64(
            rotr1.highOrder ^ rotr8.highOrder ^ shr7.highOrder,
            rotr1.lowOrder ^ rotr8.lowOrder ^ shr7.lowOrder
        );
    }

    function gamma1(x) {
        var rotr19 = rotr(x, 19);
        var rotr61 = rotr(x, 61);
        var shr6 = shr(x, 6);

        return new int64(
            rotr19.highOrder ^ rotr61.highOrder ^ shr6.highOrder,
            rotr19.lowOrder ^ rotr61.lowOrder ^ shr6.lowOrder
        );
    }

    function shr(x, n) {
        if (n <= 32) {
            return new int64(
                x.highOrder >>> n,
                x.lowOrder >>> n | (x.highOrder << (32 - n))
            );
        } else {
            return new int64(
                0,
                x.highOrder << (32 - n)
            );
        }
    }

    str = utf8_encode(str);
    strlen = str.length*charsize;
    str = str2binb(str);

    str[strlen >> 5] |= 0x80 << (24 - strlen % 32);
    str[(((strlen + 128) >> 10) << 5) + 31] = strlen;

    for (var i = 0; i < str.length; i += 32) {
        a = H[0];
        b = H[1];
        c = H[2];
        d = H[3];
        e = H[4];
        f = H[5];
        g = H[6];
        h = H[7];

        for (var j = 0; j < 80; j++) {
            if (j < 16) {
                W[j] = new int64(str[j*2 + i], str[j*2 + i + 1]);
            } else {
                W[j] = safe_add_4(gamma1(W[j - 2]), W[j - 7], gamma0(W[j - 15]), W[j - 16]);
            }

            T1 = safe_add_5(h, sigma1(e), ch(e, f, g), K[j], W[j]);
            T2 = safe_add_2(sigma0(a), maj(a, b, c));
            h = g;
            g = f;
            f = e;
            e = safe_add_2(d, T1);
            d = c;
            c = b;
            b = a;
            a = safe_add_2(T1, T2);
        }

        H[0] = safe_add_2(a, H[0]);
        H[1] = safe_add_2(b, H[1]);
        H[2] = safe_add_2(c, H[2]);
        H[3] = safe_add_2(d, H[3]);
        H[4] = safe_add_2(e, H[4]);
        H[5] = safe_add_2(f, H[5]);
        H[6] = safe_add_2(g, H[6]);
        H[7] = safe_add_2(h, H[7]);
    }

    var binarray = [];
    for (var i = 0; i < H.length; i++) {
        binarray.push(H[i].highOrder);
        binarray.push(H[i].lowOrder);
    }

    return binb2hex(binarray);
});