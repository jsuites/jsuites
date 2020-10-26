jSuites.chat = (function(el, options) {
    var obj = {};
    obj.options = {};

    var container = null;

    // Default configuration
    var defaults = {
        id: null,
        url: null,
        cache: false,
        template: null,
        data: [],
    };

    // Loop through our object
    for (var property in defaults) {
        if (options && options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    // Elements
    var chatUsers = document.createElement('div');
    var chatSearch = document.createElement('div');
    var chatContainer = document.createElement('div');
    var inputSearch = document.createElement('input');
    inputSearch.type = 'text';
    chatSearch.classList.add('top-search');
    chatSearch.appendChild(inputSearch);

    /**
     * Reset the data from the chat
     */
    obj.resetData = function() {
        // Reset data content
        obj.options.data = [];

        // Clear any cache
        var key = 'jsuites.chat.' + obj.options.id;
        localStorage.setItem(key, null);
    }

    /**
     * Append data to the chat
     */
    obj.appendData = function(data, newDataFlag) {
        if (! newDataFlag) {
            for (var i = 0; i < data.length; i++) {
                obj.options.data.push(data[i]);
            }
        } else {
             var newData = [];
             if (data.length > 0) {
                 for (var i = 0; i < data.length; i++) {
                     newData.push(data[i]);
                 }
             }

             if (obj.options.data.length > 0) {
                 for (var i = 0; i < obj.options.data.length; i++) {
                     newData.push(obj.options.data[i]);
                 }
             }

             obj.options.data = newData;
        }

        // Cache most recent
        var cache = [];
        for (var i = 0; i < obj.options.data.length; i++) {
            if (i < 20) {
                cache.push(obj.options.data[i]);
            }
        }

        if (cache.length) {
            obj.cache(cache);
        }

        // Render
        obj.render(data, newData);

        // Back to bottom
        if (newDataFlag) {
            obj.scrollToBottom();
        }
    }

    obj.appendMessage = function(data, append) {
        var chatMessage = document.createElement('div');
        chatMessage.classList.add('jchat-message');
        if (data.mine) {
            chatMessage.classList.add('jchat-right');
        } else {
            chatMessage.classList.add('jchat-left');
        }

        var chatIcon = document.createElement('div');
        chatIcon.classList.add('jchat-icon');
        if (data.icon) {
            var icon = document.createElement('img');
            icon.src = data.icon;
        }

        var chatName = document.createElement('div');
        chatName.classList.add('jchat-name');
        chatName.innerText = data.name;

        var chatWhen = document.createElement('div');
        chatWhen.classList.add('jchat-when');
        chatWhen.classList.add('prettydate');
        chatWhen.innerText = data.date;

        var chatStatus = document.createElement('div');
        chatStatus.classList.add('jchat-status');
        if (data.status == 1) {
            chatStatus.classList.add('received');
        } else if (data.status == 2) {
            chatStatus.classList.add('read');
        }

        var chatText = document.createElement('div');
        chatText.classList.add('jchat-text');
        if (data.message == '👍') {
            data.message = '<span style="font-size:2em;">' + data.message + '<span>';
        }
        chatText.innerHTML = data.message;

        // Header
        var chatHeader = document.createElement('div');
        chatHeader.classList.add('jchat-header');
        chatHeader.appendChild(chatIcon);
        chatHeader.appendChild(chatName);
        chatHeader.appendChild(chatWhen);
        chatHeader.appendChild(chatStatus);
        chatMessage.appendChild(chatHeader);

        // Body
        var chatBody = document.createElement('div');
        chatBody.classList.add('jchat-body');
        chatBody.appendChild(chatText);
        chatMessage.appendChild(chatBody);

        // Append message
        if (append) {
            chatContainer.appendChild(chatMessage);
        } else {
            chatContainer.insertBefore(chatMessage, chatContainer.firstChild);
        }

        // Animation
        jSuites.animation.fadeIn(chatMessage);

        // Update date
        jSuites.calendar.prettifyAll();
    }

    obj.cache = function(value) {
        if (obj.options.id && obj.options.cache == true && window.localStorage) {
            // Quick cache
            var key = 'jsuites.chat.' + obj.options.id;

            // Get or set
            if (value) {
                localStorage.setItem(key, JSON.stringify(value));
            } else {
                var value = localStorage.getItem(key);
                if (value) {
                    return JSON.parse(value);
                }
            }
        }
    }

    // Audio
    obj.beep = function() {
        sound.play();
    }

    // Scroll to the botton.
    obj.scrollToBottom = function(hard) {
        if (hard) {
            el.scrollTo(0, el.scrollHeight);
        } else {
            // Scroll bottom
            el.scrollTo({
                top: el.scrollHeight,
                behavior: 'smooth',
            });
        }
    }

    obj.render = function(data, newData) {
        if (newData && data.length > 0) {
            for (var i = data.length - 1; i >= 0; i--) {
                obj.appendMessage(data[i], true);
            }
        } else {
            if (! data) {
                var data = obj.options.data;
            }

            for (var i = 0; i < data.length; i++) {
                obj.appendMessage(data[i]);
            }
        }
    }

    // Load history
    obj.loadData = function(newData, __callback) {
        if (! newData) {
            var ajax = {
                date: obj.options.data[obj.options.data.length - 1].date,
                history: 1,
            }
        } else {
            var ajax = {
                date: obj.options.data && obj.options.data[0] && obj.options.data[0].date ? obj.options.data[0].date : '',
            }
        }

        jSuites.ajax({
            url: obj.options.url,
            type: 'GET',
            dataType: 'json',
            data: ajax,
            success: function(result) {
                // New data found
                if (result) {
                    obj.appendData(result, newData);
                }

                // Callback
                if (typeof(__callback) == 'function') {
                    __callback(result);
                }
            }
        });
    }

    obj.sendMessage = function() {
        var message = chatInput.value ? chatInput.value : '👍';

        jSuites.ajax({
            url: obj.options.url,
            method: 'POST',
            dataType:'json',
            data: { message: message },
            success: function(data) {
                // Reset input
                chatInput.value = '';
                chatSend.classList.remove('jchat-send');

                // Message
                var data = [{
                    name:  'Me',
                    date: jSuites.calendar.now(),
                    type: 0,
                    media: '',
                    message: message,
                    status: 2,
                    mine: 1,
                }];

                // Append Data
                obj.appendData(data, true);
            }
        });
    }

    // Init
    /*obj.init = function() {
        // Load data
        if (obj.options.url) {
            var data = obj.cache();
            if (data) {
                obj.options.data = data;
                obj.render();
            }
            // Most recent date
            obj.loadData(true, function() {
                obj.scrollToBottom(1);
            });
        } else {
            if (! obj.options.data) {
                console.error('No data defined'); 
            } else {
                obj.render();
            }
        }
    }*/

    obj.updateDate = function() {
        jSuites.calendar.prettifyAll();
    }

    obj.update = function() {
        // Verify new messages
        obj.loadData(true, function() {
            obj.scrollToBottom(1);
        });
    }

    /**
     * Create chat container
     */
    obj.init = function() {
        if (! obj.options.template) {
            console.log('jSuites.chat: template is mandatory');
            return;
        }

        // Container
        el.appendChild(chatUsers);
        el.appendChild(chatSearch);
        el.appendChild(chatContainer);

        jSuites.template(chatContainer, {
            url: obj.options.url,
            template: obj.options.template,
            noRecordsFound: 'No messages at this moment',
            onload: function() {
                obj.updateDate();
            }
        });

        jSuites.dropdown(chatUsers, {
            url: obj.options.users,
            type: 'searchbar',
            autocomplete: true,
            multiple: true,
            onclose: function() {
                // Create room
                /*obj.createRoom(listUsers.getValue());

                // Close users
                listUsers.reset();
                chatUsers.style.display = 'none';*/
            }
        });
    }

    // Audio file
    var sound = new Audio("data:audio/wav;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAGDgYtAgAyN+QWaAAihwMWm4G8QQRDiMcCBcH3Cc+CDv/7xA4Tvh9Rz/y8QADBwMWgQAZG/ILNAARQ4GLTcDeIIIhxGOBAuD7hOfBB3/94gcJ3w+o5/5eIAIAAAVwWgQAVQ2ORaIQwEMAJiDg95G4nQL7mQVWI6GwRcfsZAcsKkJvxgxEjzFUgfHoSQ9Qq7KNwqHwuB13MA4a1q/DmBrHgPcmjiGoh//EwC5nGPEmS4RcfkVKOhJf+WOgoxJclFz3kgn//dBA+ya1GhurNn8zb//9NNutNuhz31f////9vt///z+IdAEAAAK4LQIAKobHItEIYCGAExBwe8jcToF9zIKrEdDYIuP2MgOWFSE34wYiR5iqQPj0JIeoVdlG4VD4XA67mAcNa1fhzA1jwHuTRxDUQ//iYBczjHiTJcIuPyKlHQkv/LHQUYkuSi57yQT//uggfZNajQ3Vmz+Zt//+mm3Wm3Q576v////+32///5/EOgAAADVghQAAAAA//uQZAUAB1WI0PZugAAAAAoQwAAAEk3nRd2qAAAAACiDgAAAAAAABCqEEQRLCgwpBGMlJkIz8jKhGvj4k6jzRnqasNKIeoh5gI7BJaC1A1AoNBjJgbyApVS4IDlZgDU5WUAxEKDNmmALHzZp0Fkz1FMTmGFl1FMEyodIavcCAUHDWrKAIA4aa2oCgILEBupZgHvAhEBcZ6joQBxS76AgccrFlczBvKLC0QI2cBoCFvfTDAo7eoOQInqDPBtvrDEZBNYN5xwNwxQRfw8ZQ5wQVLvO8OYU+mHvFLlDh05Mdg7BT6YrRPpCBznMB2r//xKJjyyOh+cImr2/4doscwD6neZjuZR4AgAABYAAAABy1xcdQtxYBYYZdifkUDgzzXaXn98Z0oi9ILU5mBjFANmRwlVJ3/6jYDAmxaiDG3/6xjQQCCKkRb/6kg/wW+kSJ5//rLobkLSiKmqP/0ikJuDaSaSf/6JiLYLEYnW/+kXg1WRVJL/9EmQ1YZIsv/6Qzwy5qk7/+tEU0nkls3/zIUMPKNX/6yZLf+kFgAfgGyLFAUwY//uQZAUABcd5UiNPVXAAAApAAAAAE0VZQKw9ISAAACgAAAAAVQIygIElVrFkBS+Jhi+EAuu+lKAkYUEIsmEAEoMeDmCETMvfSHTGkF5RWH7kz/ESHWPAq/kcCRhqBtMdokPdM7vil7RG98A2sc7zO6ZvTdM7pmOUAZTnJW+NXxqmd41dqJ6mLTXxrPpnV8avaIf5SvL7pndPvPpndJR9Kuu8fePvuiuhorgWjp7Mf/PRjxcFCPDkW31srioCExivv9lcwKEaHsf/7ow2Fl1T/9RkXgEhYElAoCLFtMArxwivDJJ+bR1HTKJdlEoTELCIqgEwVGSQ+hIm0NbK8WXcTEI0UPoa2NbG4y2K00JEWbZavJXkYaqo9CRHS55FcZTjKEk3NKoCYUnSQ0rWxrZbFKbKIhOKPZe1cJKzZSaQrIyULHDZmV5K4xySsDRKWOruanGtjLJXFEmwaIbDLX0hIPBUQPVFVkQkDoUNfSoDgQGKPekoxeGzA4DUvnn4bxzcZrtJyipKfPNy5w+9lnXwgqsiyHNeSVpemw4bWb9psYeq//uQZBoABQt4yMVxYAIAAAkQoAAAHvYpL5m6AAgAACXDAAAAD59jblTirQe9upFsmZbpMudy7Lz1X1DYsxOOSWpfPqNX2WqktK0DMvuGwlbNj44TleLPQ+Gsfb+GOWOKJoIrWb3cIMeeON6lz2umTqMXV8Mj30yWPpjoSa9ujK8SyeJP5y5mOW1D6hvLepeveEAEDo0mgCRClOEgANv3B9a6fikgUSu/DmAMATrGx7nng5p5iimPNZsfQLYB2sDLIkzRKZOHGAaUyDcpFBSLG9MCQALgAIgQs2YunOszLSAyQYPVC2YdGGeHD2dTdJk1pAHGAWDjnkcLKFymS3RQZTInzySoBwMG0QueC3gMsCEYxUqlrcxK6k1LQQcsmyYeQPdC2YfuGPASCBkcVMQQqpVJshui1tkXQJQV0OXGAZMXSOEEBRirXbVRQW7ugq7IM7rPWSZyDlM3IuNEkxzCOJ0ny2ThNkyRai1b6ev//3dzNGzNb//4uAvHT5sURcZCFcuKLhOFs8mLAAEAt4UWAAIABAAAAAB4qbHo0tIjVkUU//uQZAwABfSFz3ZqQAAAAAngwAAAE1HjMp2qAAAAACZDgAAAD5UkTE1UgZEUExqYynN1qZvqIOREEFmBcJQkwdxiFtw0qEOkGYfRDifBui9MQg4QAHAqWtAWHoCxu1Yf4VfWLPIM2mHDFsbQEVGwyqQoQcwnfHeIkNt9YnkiaS1oizycqJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");

    if (! el.classList.contains('jchat')) {
        // Add class
        el.classList.add('jchat');

        // Container
        var chatContainer = document.createElement('div');
        chatContainer.classList.add('jchat-container');

        // Input
        var chatArrow = document.createElement('div');
        chatArrow.className = 'jchat-arrow';
        chatArrow.style.display = 'none';
        chatArrow.onclick = function() {
            obj.scrollToBottom();
        }

        // Input
        var chatInputContainer = document.createElement('div');
        chatInputContainer.className = 'jchat-input';

        var chatPhoto = document.createElement('div');
        chatPhoto.className = 'jchat-photo';

        var chatSend = document.createElement('div');
        chatSend.className = 'jchat-submit';
        chatSend.onclick = function(e) {
            obj.sendMessage();
        }

        var chatInput = document.createElement('textarea');
        chatInput.setAttribute('placeholder', 'Write a message');
        chatInput.onkeyup = function(e) {
            if (e.target.value) {
                chatSend.classList.add('jchat-send');
            } else {
                chatSend.classList.remove('jchat-send');
            }
        }

        chatInput.onfocus = function(e) {
            setTimeout(function() {
                document.body.scrollTop = document.body.scrollHeight;
            }, 200);
        }

        // Append input box
        chatInputContainer.appendChild(chatPhoto);
        chatInputContainer.appendChild(chatInput);
        chatInputContainer.appendChild(chatSend);

        // Append container to the element
        el.appendChild(chatContainer);
        el.appendChild(chatArrow);
        el.appendChild(chatInputContainer);

        jSuites.refresh(el, function() {
            obj.loadData(null, function() {
                jSuites.refresh.hide();
            });
        });

        el.addEventListener('scroll', function(e) {
            var scrollHeight = e.target.scrollHeight - e.target.clientHeight;
            if (scrollHeight - e.target.scrollTop > 800) {
                if (chatArrow.style.display == 'none') {
                    chatArrow.style.display = '';
                }
            } else {
                if (chatArrow.style.display != 'none') {
                    chatArrow.style.display = 'none';
                }
            }
        });
    
        // Add global events
        el.addEventListener("swipeleft", function(e) {
            e.preventDefault();
            e.stopPropagation();
        });

        el.addEventListener("swiperight", function(e) {
            var element = jSuites.findElement(e.target, 'jchat-message');
            element.classList.add('jchat-action');
            e.preventDefault();
            e.stopPropagation();
        });

        // DOM quick access
        el.chat = obj;
    }

    // Keep quick reference
    el.chat = obj;

    // Init
    obj.init();

    return obj;
});

/*jSuites.chat.manager = (function() {
    // Containers
    var chatUsers = document.createElement('div');
    var chatSearch = document.createElement('div');
    var chatContainer = document.createElement('div');
    chatContainer.classList.add('options');

    // Hide users
    chatUsers.style.display = 'none';

    // Elements
    var inputSearch = document.createElement('input');
    inputSearch.type = 'text';
    chatSearch.classList.add('top-search');
    chatSearch.appendChild(inputSearch);

    // Instances
    var history = null;
    var listUsers = null;

    var obj = function(el, options) {
        if (el) {
            if (el.innerHTML) {
                return obj;
            } else {
                el.innerHTML = '';

                // Options
                if (options) {
                    obj.options = options;
                }

                // Container
                el.appendChild(chatUsers);
                el.appendChild(chatSearch);
                el.appendChild(chatContainer);

                history = jSuites.template(chatContainer, {
                    url: obj.options.url,
                    template: obj.options.template,
                    noRecordsFound: 'No messages at this moment',
                    onload: function() {
                        // Date format
                        jSuites.calendar.prettifyAll();
                    }
                });

                listUsers = jSuites.dropdown(chatUsers, {
                    url: obj.options.users,
                    type: 'searchbar',
                    autocomplete: true,
                    multiple: true,
                    onclose: function() {
                        // Create room
                        obj.createRoom(listUsers.getValue());

                        // Close users
                        listUsers.reset();
                        chatUsers.style.display = 'none';
                    }
                });
            }
        }
    }

    obj.refresh = function() {
        history.reload();
    }

    obj.create = function() {
        chatUsers.style.display = '';
        listUsers.open();
    }

    obj.createRoom = function(users) {
        if (users) {
            // Show loading
            jSuites.loading.show();

            // Create room in the remote server
            jSuites.ajax({
                url: obj.options.url,
                method: 'POST',
                data: { users:users },
                dataType: 'json',
                success: function(data) {
                    // Refresh
                    obj.refresh();

                    // Hide loading
                    jSuites.loading.hide();

                    if (data.success == 1) {
                        // Open room
                        obj.openRoom(data.id);
                    } else {
                        jSuites.alert(data.message);
                    }
                }
            });
        }
    }

    obj.openRoom = function(id, o) {
        // Open room
        jSuites.pages(obj.options.url + '/room#' + id, {
            onload: function(p) {
                // Create chat component
                if (! p.children[1].classList.contains('jchat')) {
                    jSuites.chat(p.children[1], {
                        id: id,
                        url: obj.options.url + '/room/' + id,
                        cache: true,
                    });
                }

                // Header
                if (o) {
                    p.setTitle("<div class='round'>" + o.children[1].innerHTML + '</div><div>' + o.children[2].children[0].innerHTML + '</div>');
                } else {
                    p.setTitle('Chat');
                }
            },
            onenter: function(p) {
                if (p.children[1].chat) {
                    p.children[1].chat.update();
                }
                // Hide toolbar
                app.toolbar(0);
            },
            onleave: function(p) {
                app.toolbar(1);
            }
        });
    }

    return obj;
})();*/

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

jSuites.organogram = (function(el, options) {
    var obj = {};
    obj.options = {};

    // Default configuration
    var defaults = {
        data: null,
        zoom: 1,
        width: 800,
        height: 600,
        search: true,
        vertical: true,
    };

    // Loop through our object
    for (var property in defaults) {
        if (options && options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    var state = {
        x: 0,
        y: 0
    }

    var mountNodes = function(node, container) {
        var li = document.createElement('li');
        var span = document.createElement('span');
        span.className = 'jorg-tf-nc';
        span.innerHTML = `<div class="jorg-user-status" style="background:${node.status}"></div><div class="jorg-user-info"><div class='jorg-user-img'><img src="${node.img}"/></div><div class='jorg-user-content'><span>${node.name}</span><span>${node.role}</span></div>`;
        span.setAttribute('id',node.id);
        var ul = document.createElement('ul');
        li.appendChild(span);
        li.appendChild(ul);
        container.appendChild(li);
        return ul;
    }

    var setNodeVisibility = function(node) {
        var className = "jorg-node-icon";
        var icon = document.createElement('div');
        var ulNode = node.nextElementSibling;
        node.appendChild(icon);

        if (ulNode) {
            icon.className = className + ' remove';
        } else {
            icon.className = className + ' plus'
            return ;
        }

        icon.addEventListener('click', function(e) {

            if (node.nextElementSibling.style.display == 'none') {
                node.nextElementSibling.style.display = 'inline-flex';
                node.removeAttribute('visibility');
                e.target.className = className + ' remove';
            } else {
                node.nextElementSibling.style.display = 'none';
                node.setAttribute('visibility','hidden');
                e.target.className = className + ' plus';
            }
        });
    }

    // Updates tree container dimensions
    var updateTreeContainerDimensions = function(){
        var treeContainer = ul.children[0];
        treeContainer.style.width = treeContainer.children[1].offsetWidth * 4 + 'px';
        treeContainer.style.height = treeContainer.children[1].offsetHeight * 4 + 'px'
    }

    var render = function (parent, container) {
        for (var i = 0; i < obj.options.data.length; i ++) {
            if (obj.options.data[i].parent === parent) {
                var ul = mountNodes(obj.options.data[i],container);
                render(obj.options.data[i].id, ul);
            }
        }

        if (! container.childNodes.length) {
            container.remove();
        } else {
            if (container.previousElementSibling) {
                setNodeVisibility(container.previousElementSibling);
            }
        }

        if (parent === obj.options.data.length) {
            return 0;
        }
    }

    var zoom = function(e) {
        e = e || window.event;

        // Current zoom
        var currentZoom = el.children[0].style.zoom * 1;

        // Action
        if (e.target.classList.contains('jorg-zoom-in') || e.deltaY < 0) {
            ul.style.zoom = currentZoom + 0.05;
        } else if (currentZoom > .5) {
            ul.style.zoom = currentZoom - 0.05;
        }

        e.preventDefault();
    }

    var findNode = function(options){
        if(options) {
            for(property in options){
                var node = obj.options.data.find(node => node[property] === options[property]);
                if(node){
                    return Array.prototype.slice.call(document.querySelectorAll('.jorg-tf-nc'))
                    .find(n => n.getAttribute('id') == node.id);
                }else{
                    continue ;
                }
            }
        }
        return 0;
    }

    obj.refresh = function() {
        el.children[0].innerHTML = '';
        obj.render(0, el.children[0]);
        
        var rect = ul.getBoundingClientRect();
        ul.style.width = rect.width + 'px';
    }

    obj.show = function(id) {
        var node = Array.prototype.slice.call(document.querySelectorAll('.jorg-tf-nc')).find(node => node.getAttribute('id') == id);
        setNodeVisibility(node);
        return node;
    }

    obj.render = function(a, b) {
        render(a, b);
        updateTreeContainerDimensions();

        var topLevelNode = findNode({ parent: 0 });
        topLevelNode.scrollIntoView({
            behavior: "auto",
            block: "center" || "start",
            inline: "center" || "start"
        });

        ul.scrollTop += obj.options.height / 4;
    }

    /**
     * Search for any item with the string and centralize it.
     */
    obj.search = function(str) {
       var input = str.toLowerCase();

       if(options) {
            var data = obj.options.data;
            var searchedNode = data.find(node => node.name.toLowerCase() === input);
            
            if(searchedNode) {
                var node = findNode({ id: searchedNode.id });
                node.scrollIntoView({
                    behavior: "smooth" || "auto",
                    block: "center" || "start",
                    inline: "center" || "start"
                });
            }
        }
    }

    /**
     * Change the organogram dimensions
     */
    obj.setDimensions = function(width, height) {
        el.style.width = width + 'px';
        el.style.height = height + 'px';
    }

    // Create zoom action
    var zoomContainer = document.createElement('div');
    zoomContainer.className = 'jorg-zoom-container';

    var zoomIn = document.createElement('div');
    zoomIn.className = 'jorg-zoom-in';

    var zoomOut = document.createElement('div');
    zoomOut.className = 'jorg-zoom-out';

    zoomContainer.appendChild(zoomIn);
    zoomContainer.appendChild(zoomOut);

    zoomIn.addEventListener('click', zoom);
    zoomOut.addEventListener('click', zoom);

    // Create container
    var ul = document.createElement('ul');

    // Default zoom
    if (! ul.style.zoom) {
        ul.style.zoom = '1';
    }

    // Default classes
    el.classList.add('jorg');
    el.classList.add('jorg-tf-tree');
    el.classList.add('jorg-unselectable');
    ul.classList.add('jorg-disable-scrollbars');

    // Append elements
    el.appendChild(ul);
    el.appendChild(zoomContainer);

    // Set default dimensions
    obj.setDimensions(obj.options.width, obj.options.height);

    // Handle search
    if (obj.options.search) {
        var search = document.createElement('input');
        search.type = 'text';
        search.classList.add('jorg-search');
        el.appendChild(search);

        search.onkeyup = function(e) {
            obj.search(e.target.value);
        }
    }

    // Event handlers
    ul.addEventListener('wheel', zoom);

    ul.addEventListener('mousemove', function(e){
        e = event || window.event;

        var currentX = e.clientX || e.pageX;
        var currentY = e.clientY || e.pageY;

        if (e.which) {
            var x = state.x - currentX;
            var y = state.y - currentY;
            ul.scrollLeft = state.scrollLeft + x;
            ul.scrollTop = state.scrollTop + y;
        }
    });

    ul.addEventListener('mousedown', function(e){
        e = event || window.event;

        state.x = e.clientX || e.pageX;
        state.y = e.clientY || e.pageY;
        state.scrollLeft = ul.scrollLeft;
        state.scrollTop = ul.scrollTop;
    });

    // Render
    obj.render(0, ul);

    return el.organogram = obj;
});

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
    container.className = 'jtemplate-content options';
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

/**
 * (c) jSuites Timeline
 * https://github.com/paulhodel/jsuites
 *
 * @author: Paul Hodel <paul.hodel@gmail.com>
 * @description: Timeline
 */

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
