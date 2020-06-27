jSuites.loading = (function() {
    var obj = {};

    var loading = null;

    obj.show = function() {
        if (! loading) {
            loading = document.createElement('div');
            loading.className = 'jloading';
        }
        document.body.appendChild(loading);
    }

    obj.hide = function() {
        if (loading) {
            document.body.removeChild(loading);
        }
    }

    return obj;
})();