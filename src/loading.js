jSuites.loading = (function() {
    var obj = {};

    var loading = document.createElement('div');
    loading.className = 'jloading';

    obj.show = function() {
        document.body.appendChild(loading);
    };

    obj.hide = function() {
        document.body.removeChild(loading);
    };

    return obj;
})();