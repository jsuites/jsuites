jSuites.notification = (function(options) {
    var obj = {};
    obj.options = {};

    // Default configuration
    var defaults = {
        title:'Notification',
        message:null,
        timeOut:4000,
        closeable:true,
    };

    // Loop through our object
    for (var property in defaults) {
        if (options && options.hasOwnProperty(property)) {
            obj.options[property] = options[property];
        } else {
            obj.options[property] = defaults[property];
        }
    }

    var notification = document.createElement('div');
    notification.className = 'jnotification fade-in';

    var notificationTitle = document.createElement('div');
    notificationTitle.innerHTML = obj.options.title;
    notification.appendChild(notificationTitle);

    var notificationMessage = document.createElement('div');
    notificationMessage.innerHTML = obj.options.message;
    notification.appendChild(notificationMessage);

    obj.show = function() {
        document.body.appendChild(notification);
    }

    obj.hide = function() {
        notification.classList.remove('fade-in');
        notification.classList.add('fade-out');
        setTimeout(function() {
            notification.remove();
            notification = null;
        }, 1000);
    };

    obj.show();

    //setTimeout(obj.hide, obj.options.timeOut)

    return obj;
});