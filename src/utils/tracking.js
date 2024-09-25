 const Tracking = function(component, state) {
    if (state === true) {
        window['jSuitesStateControl'] = window['jSuitesStateControl'].filter(function(v) {
            return v !== null;
        });

        // Start after all events
        setTimeout(function() {
            window['jSuitesStateControl'].push(component);
        }, 0);

    } else {
        var index = window['jSuitesStateControl'].indexOf(component);
        if (index >= 0) {
            window['jSuitesStateControl'].splice(index, 1);
        }
    }
}

export default Tracking;