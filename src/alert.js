jSuites.alert = function(message) {
    if (jSuites.getWindowWidth() < 800 && jSuites.dialog) {
        jSuites.dialog.open({
            title:'Alert',
            message:message,
        });
    } else {
        alert(message);
    }
}