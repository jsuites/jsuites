jSuites.loading = (function() {
    var obj = {};

    var loading = null;

    obj.show = function(timeout) {
        if (! loading) {
            loading = document.createElement('div');
            loading.className = 'jloading';
        }
        document.body.appendChild(loading);

        // Max timeout in seconds
        if (timeout > 0) {
            setTimeout(function() {
                obj.hide();
            }, timeout * 1000)
        }
    }

    obj.hide = function() {
        if (loading && loading.parentNode) {
            document.body.removeChild(loading);
        }
    }

    return obj;
})();