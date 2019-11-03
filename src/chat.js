jSuites.chat = (function(el, options) {
    var obj = {};
    obj.options = {};

    // Default configuration
    var defaults = {
        id: null,
        url: null,
        cache: false,
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
        jSuites.fadeIn(chatMessage);

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
    obj.init = function() {
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
    }

    obj.updateDate = function() {
        jSuites.calendar.prettifyAll();
    }

    obj.update = function() {
        // Verify new messages
        obj.loadData(true, function() {
            obj.scrollToBottom(1);
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
            var element = jSuites.getElement(e.target, 'jchat-message');
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

jSuites.chat.manager = (function() {
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
})();

