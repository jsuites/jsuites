jSuites.combo = (function(el, options) {
    var obj = {};

    if (options) {
        obj.options = options;
    }

    // Reset
    if (obj.options.reset == true) {
        el.innerHTML = '';
    }

    // Blank option?
    if (obj.options.blankOption) {
        var option = document.createElement('option');
        option.value = '';
        el.appendChild(option);
    }

    // Load options from a remote URL
    if (obj.options.url) {
        fetch(obj.options.url, { headers: new Headers({ 'content-type': 'text/json' }) })
            .then(function(data) {
                data.json().then(function(data) {
                    obj.options.data = data;

                    Object.keys(data).forEach(function(k) {
                        var option = document.createElement('option');

                        if (data[k].id) {
                            option.value = data[k].id;
                            option.innerHTML = data[k].name;
                        } else {
                            option.value = k;
                            option.innerHTML = data[k];
                        }

                        el.appendChild(option);
                    });

                    if (obj.options.value) {
                        $(select).val(obj.options.value);
                    }

                    if (typeof(obj.options.onload) == 'function') {
                        obj.options.onload(el);
                    }
                })
            });
    } else if (options.numeric) {
        for (var i = obj.options.numeric[0]; i <= obj.options.numeric[1]; i++) {
            var option = document.createElement('option');
            option.value = i;
            option.innerHTML = i;
            el.appendChild(option);
        }
    }

    el.combo = obj;

    return obj;
});
