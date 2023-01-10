export default function Tracking(component, state) {
    if (state == true) {
        document.jsuitesComponents = document.jsuitesComponents.filter(function(v) {
            return v !== null;
        });

        // Start after all events
        setTimeout(function() {
            document.jsuitesComponents.push(component);
        }, 0);

    } else {
        var index = document.jsuitesComponents.indexOf(component);
        if (index >= 0) {
            document.jsuitesComponents.splice(index, 1);
        }
    }
}
