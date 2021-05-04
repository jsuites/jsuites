jSuites.validations = {};

jSuites.validations.email = function(data) {
    var reg = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    return data && reg.test(data) ? true : false; 
}

jSuites.validations.length = function(data, element) {
    var len = element.getAttribute('data-length') || 5;
    return (data.length >= len) ? true : false;
}

jSuites.validations.required = function(data) {
    return data.trim() ? true : false;
}

jSuites.validations.number = function(data) {
    return jSuites.isNumber(data);
}

