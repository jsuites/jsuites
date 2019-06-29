/**
 * Dialog v1.0.1
 * Author: paul.hodel@gmail.com
 * https://github.com/paulhodel/jtools
 */
 
jSuites.dialog = (function() {
    var obj = {};
    obj.options = {};

    var dialog = document.createElement('div');
    dialog.setAttribute('tabindex', '901');
    dialog.className = 'jdialog';
    dialog.id = 'dialog';

    var dialogHeader = document.createElement('div');
    dialogHeader.className = 'jdialog-header';

    var dialogTitle = document.createElement('div');
    dialogTitle.className = 'jdialog-title';
    dialogHeader.appendChild(dialogTitle);

    var dialogMessage = document.createElement('div');
    dialogMessage.className = 'jdialog-message';
    dialogHeader.appendChild(dialogMessage);

    var dialogFooter = document.createElement('div');
    dialogFooter.className = 'jdialog-footer';

    var dialogContainer = document.createElement('div');
    dialogContainer.className = 'jdialog-container';
    dialogContainer.appendChild(dialogHeader);
    dialogContainer.appendChild(dialogFooter);

    // Confirm
    var dialogConfirm = document.createElement('div');
    var dialogConfirmButton = document.createElement('input');
    dialogConfirmButton.value = obj.options.confirmLabel;
    dialogConfirmButton.type = 'button';
    dialogConfirmButton.onclick = function() {
        if (typeof(obj.options.onconfirm) == 'function') {
            obj.options.onconfirm();
        }
        obj.close();
    };
    dialogConfirm.appendChild(dialogConfirmButton);
    dialogFooter.appendChild(dialogConfirm);

    // Cancel
    var dialogCancel = document.createElement('div');
    var dialogCancelButton = document.createElement('input');
    dialogCancelButton.value = obj.options.cancelLabel;
    dialogCancelButton.type = 'button';
    dialogCancelButton.onclick = function() {
        if (typeof(obj.options.oncancel) == 'function') {
            obj.options.oncancel();
        }
        obj.close();
    }
    dialogCancel.appendChild(dialogCancelButton);
    dialogFooter.appendChild(dialogCancel);

    // Dialog
    dialog.appendChild(dialogContainer);

    obj.open = function(options) {
        obj.options = options;

        if (obj.options.title) {
            dialogTitle.innerHTML = obj.options.title;
        }

        if (obj.options.message) {
            dialogMessage.innerHTML = obj.options.message;
        }

        if (! obj.options.confirmLabel) {
            obj.options.confirmLabel = 'OK';
        }
        dialogConfirmButton.value = obj.options.confirmLabel;

        if (! obj.options.cancelLabel) {
            obj.options.cancelLabel = 'Cancel';
        }
        dialogCancelButton.value = obj.options.cancelLabel;

        if (obj.options.type == 'confirm') {
            dialogCancelButton.parentNode.style.display = '';
        } else {
            dialogCancelButton.parentNode.style.display = 'none';
        }

        // Append element to the app
        dialog.style.opacity = 100;

        // Append to the page
        if (jSuites.el) {
            jSuites.el.appendChild(dialog);
        } else {
            document.body.appendChild(dialog);
        }

        // Focus
        dialog.focus();

        // Show
        setTimeout(function() {
            dialogContainer.style.opacity = 100;
        }, 0);
    };

    obj.close = function() {
        dialog.style.opacity = 0;
        dialogContainer.style.opacity = 0;
        setTimeout(function() {
            dialog.remove();
        }, 100);
    };

    return obj;
})();

jSuites.confirm = (function(message, onconfirm) {
    if (jSuites.getWindowWidth() < 800) {
        jSuites.dialog.open({
            type:'confirm',
            message:message,
            title:'Confirmation',
            onconfirm:onconfirm,
        });
    } else {
        if (confirm('message')) {
            onconfirm();
        }
    }
});

jSuites.alert = function(message) {
    if (jSuites.getWindowWidth() < 800) {
        jSuites.dialog.open({
            title:'Alert',
            message:message,
        });
    } else {
        alert(message);
    }
}
