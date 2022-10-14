/**
 * (c) jSuites Javascript Plugins and Web Components (v4)
 *
 * Website: https://jsuites.net
 * Description: Create amazing web based applications.
 * Plugin: Signature pad
 *
 * MIT License
 */

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.login = factory();
}(this, (function () {

    'use strict';

    // Load jSuites
    if (typeof(jSuites) == 'undefined') {
        if (typeof(require) === 'function') {
            var jSuites = require('jsuites');
        } else if (window.jSuites) {
            var jSuites = window.jSuites;
        } else {
            var jSuites = null;
        }
    }

    var sha512 = (function(str) {
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

        var str = utf8_encode(str);
        var strlen = str.length*charsize;
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

    var Plugin = (function(el, options) {
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
            googleAuthentication: null,
            googleClientId: null,
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

        // Action
        var action = null;
        var social = null;

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

        // Instructions
        var divInstructions = document.createElement('div');
        divInstructions.classList.add('jlogin-instructions');

        // Code
        var labelCode = document.createElement('label');
        labelCode.innerHTML = jSuites.translate('Please enter here the code received by email');
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
        labelLogin.innerHTML = jSuites.translate('Login');
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
        labelName.innerHTML = jSuites.translate('Name');
        var inputName = document.createElement('input');
        inputName.type = 'text';
        inputName.name = 'name';
        var divName = document.createElement('div');
        divName.appendChild(labelName);
        divName.appendChild(inputName);

        // Email
        var labelUsername = document.createElement('label');
        labelUsername.innerHTML = jSuites.translate('E-mail');
        var inputUsername = document.createElement('input');
        inputUsername.type = 'text';
        inputUsername.name = 'username';
        inputUsername.setAttribute('autocomplete', 'new-username');
        var divUsername = document.createElement('div');
        divUsername.appendChild(labelUsername);
        divUsername.appendChild(inputUsername);

        // Password
        var labelPassword = document.createElement('label');
        labelPassword.innerHTML = jSuites.translate('Password');
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
        labelRepeatPassword.innerHTML = jSuites.translate('Repeat the new password');
        var inputRepeatPassword = document.createElement('input');
        inputRepeatPassword.type = 'password';
        inputRepeatPassword.name = 'password';
        var divRepeatPassword = document.createElement('div');
        divRepeatPassword.appendChild(labelRepeatPassword);
        divRepeatPassword.appendChild(inputRepeatPassword);

        // Remember checkbox
        var labelRemember = document.createElement('label');
        labelRemember.innerHTML = jSuites.translate('Remember me on this device');
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
        cancelButton.innerHTML = jSuites.translate('Cancel');
        cancelButton.className = 'cancelButton';
        cancelButton.onclick = function() {
            obj.requestAccess();
        }
        var divCancelButton = document.createElement('div');
        divCancelButton.appendChild(cancelButton);

        // Captcha
        var labelCaptcha = document.createElement('label');
        labelCaptcha.innerHTML = jSuites.translate('Please type here the code shown below');
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
        var facebookButton = document.createElement('input');
        facebookButton.type = 'button';
        facebookButton.value = jSuites.translate('Login with Facebook');
        facebookButton.className = 'facebookButton';
        var divFacebookButton = document.createElement('div');
        divFacebookButton.appendChild(facebookButton);
        facebookButton.onclick = function() {
            obj.requestLoginViaFacebook();
        }

        // Google
        var googleButton = document.createElement('input');
        googleButton.type = 'button';
        googleButton.value = jSuites.translate('Login with Google');
        googleButton.className = 'googleButton';
        var divGoogleButton = document.createElement('div');
        divGoogleButton.appendChild(googleButton);
        divGoogleButton.onclick = function() {
            obj.requestLoginViaGoogle();
        }

        // Forgot password
        var inputRequest = document.createElement('span');
        inputRequest.innerHTML = jSuites.translate('Request a new password');
        var divRequestButton = document.createElement('div');
        divRequestButton.className = 'requestButton';
        divRequestButton.appendChild(inputRequest);
        divRequestButton.onclick = function() {
            obj.requestNewPassword();
        }
        // Create a new Profile
        var inputNewProfile = document.createElement('span');
        inputNewProfile.innerHTML = jSuites.translate('Create a new profile');
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

            if (typeof(obj.options.message) == 'function') {
                obj.options.message(data);
            } else {
                jSuites.alert(data);
            }
        }

        /**
         * New profile
         */
        obj.newProfile = function() {
            container.innerHTML = '';
            divInstructions.innerText = jSuites.translate('You will receive an email message to confirm your email address.');
            container.appendChild(divLogo);
            container.appendChild(divInstructions);

            if (obj.options.newProfileLogin == true) {
                container.appendChild(divLogin);
            }

            container.appendChild(divName);
            container.appendChild(divUsername);
            container.appendChild(divActionButton);
            if (obj.options.facebookAuthentication == true) {
                container.appendChild(divFacebookButton);
            }
            if (obj.options.googleAuthentication == true) {
                container.appendChild(divGoogleButton);
            }
            container.appendChild(divCancelButton);

            // Reset inputs
            inputLogin.value = '';
            inputUsername.value = '';
            inputPassword.value = '';

            // Button
            actionButton.value = jSuites.translate('Create a new profile');

            // Action
            action = 'newProfile';
        }

        /**
         * Request the email with the recovery instructions
         */
        obj.requestNewPassword = function() {
            if (Array.prototype.indexOf.call(container.children, divCaptcha) >= 0) {
                var captcha = true;
            } else {
                var captcha = false;
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
            actionButton.value = jSuites.translate('Request a new password');
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
            actionButton.value = jSuites.translate('Confirm the code');
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
            actionButton.value = jSuites.translate('Change my password');
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
            if (obj.options.googleAuthentication == true) {
                container.appendChild(divGoogleButton);
            }
            container.appendChild(divRequestButton);
            container.appendChild(divRememberButton);
            container.appendChild(divRequestButton);
            if (obj.options.newProfile == true) {
                container.appendChild(divNewProfileButton);
            }

            // Button
            actionButton.value = jSuites.translate('Login');

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

        var fbLogin = null;

        obj.bindSocialAccount = function() {
            container.innerHTML = '';
            divInstructions.innerText = jSuites.translate('Please enter your password to bind your account.');

            container.appendChild(divLogo);
            container.appendChild(divInstructions);
            container.appendChild(divPassword);
            container.appendChild(divActionButton);
            container.appendChild(divCancelButton);
            actionButton.value = jSuites.translate('Bind accounts');

            // Action
            action = 'bindSocialAccount';
        }

        /**
         * Request login via facebook
         */
        obj.requestLoginViaGoogle = function() {
            google.accounts.id.initialize({
                client_id: obj.options.googleClientId,
                auto_select: true,
                callback: function(response) {
                    social = { social: 'google', token: response.credential };

                    obj.execute(social);
                }
            });

            google.accounts.id.prompt(function(notification) {
                if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
                    google.accounts.id.renderButton(
                        divGoogleButton, // Ensure the element exist and it is a div to display correcctly
                        {
                            theme: "outline",
                            size: "large",
                            width: divGoogleButton.offsetWidth,
                            text: 'signin_with',
                        }  // Customization attributes
                    );
                }
            });

            // Action
            action = 'requestLoginViaGoogle';
        }

        /**
         * Request login via facebook
         */
        obj.requestLoginViaFacebook = function() {
            FB.getLoginStatus(function(response) {
                if (! response.status || response.status != 'connected') {
                    FB.login(function(response) {
                        if (response.authResponse) {
                            social = { social: 'facebook', token: response.authResponse.accessToken };

                            obj.execute(social);
                        } else {
                            obj.showMessage(jSuites.translate('Not authorized by facebook'));
                        }
                    }, {scope: 'public_profile,email'});
                } else {
                    social = { social: 'facebook', token: response.authResponse.accessToken };

                    obj.execute(social);
                }
            }, true);

            // Action
            action = 'requestLoginViaFacebook';
        }

        // Perform request
        obj.execute = function(data) {
            var message = null;

            // New profile
            if (action == 'newProfile') {
                if (! jSuites.validations.email(inputUsername.value)) {
                    message = jSuites.translate('Invalid e-mail address');
                }
                if (! jSuites.validations.login(inputLogin.value)) {
                    message = jSuites.translate('Invalid username, please use only characters and numbers');
                }
            } else if (action == 'changeMyPassword') {
                if (inputPassword.value.length < 3) {
                    message = jSuites.translate('Password is too short');
                } else  if (inputPassword.value != inputRepeatPassword.value) {
                    message = jSuites.translate('Password should match');
                } else {
                    if (typeof(obj.options.newPasswordValidation) == 'function') {
                        var val = obj.options.newPasswordValidation(obj, inputPassword.value, inputPassword.value);
                        if (val != undefined) {
                            message = val;
                        }
                    }
                }
            } else if (action == 'bindSocialAccount') {
                data = social;
                if (! inputPassword.value) {
                    message = jSuites.translate('Password is mandatory');
                } else {
                    data.password = sha512(inputPassword.value);
                }
            }

            if (message) {
                obj.showMessage(message);
                return false;
            }

            // Keep email
            if (inputUsername.value != '') {
                window.localStorage.setItem('username', inputUsername.value);
            }

            // Captcha
            if (Array.prototype.indexOf.call(container.children, divCaptcha) >= 0) {
                if (inputCaptcha.value == '') {
                    obj.showMessage(jSuites.translate('Please enter the captch code below'));
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
            var onsuccess = function(result, data) {
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
                    if (result.action === 'bindSocialAccount') {
                        // Change password
                        obj.bindSocialAccount(result.hash);
                    } else if (result.action === 'resetPassword') {
                        // Change password
                        obj.changeMyPassword(result.hash);
                    } else {
                        // App initialization
                        if (result.success == 1) {
                            if (typeof(obj.options.onsuccess) == 'function') {
                                obj.options.onsuccess.call(obj, result, data);
                            } else if (result.url) {
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
                // Encode password
                if (data.password) {
                    data.password = sha512(data.password);
                }
                // Recovery code
                if (Array.prototype.indexOf.call(container.children, divCode) >= 0 && inputCode.value) {
                    data.h = sha512(inputCode.value);
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
                beforeSend: function(xhr) {
                    xhr.withCredentials = true;
                },
                success: function(result) {
                    // Remove loading
                    el.classList.remove('jlogin-loading');
                    // Callback
                    onsuccess(result, data);
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

        var params = new URLSearchParams(window.location.search);
        var hash = null;
        if (hash = params.get('h')) {
            obj.changeMyPassword(hash);
        } else {
            obj.requestAccess();
        }

        return obj;
    });

    if (window.jSuites) {
        jSuites.setExtensions({ login: Plugin });
    }

    return Plugin;
})));