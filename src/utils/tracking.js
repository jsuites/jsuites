 const Tracking = function(component, state) {
    if (state === true) {
        Tracking.state = Tracking.state.filter(function(v) {
            return v !== null;
        });

        // Start after all events
        setTimeout(function() {
            Tracking.state.push(component);
        }, 0);

    } else {
        var index = Tracking.state.indexOf(component);
        if (index >= 0) {
            Tracking.state.splice(index, 1);
        }
    }
}

export default Tracking;