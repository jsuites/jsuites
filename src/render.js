jSuites.render = (function() {

    var obj = function(elements) {
        
    }

    obj.convert = function(text) {
        var parser = new DOMParser();
        return obj.parse(parser.parseFromString(text, "text/xml"));
    }

    obj.parse = function(xml) {
        // Create the return object
        var o = {};

        if (xml.nodeType == 1) { // element
            // do attributes
            if (xml.attributes.length > 0) {
            o["@attributes"] = {};
                for (var j = 0; j < xml.attributes.length; j++) {
                    var attribute = xml.attributes.item(j);
                    o["@attributes"][attribute.nodeName] = attribute.nodeValue;
                }
            }
        } else if (xml.nodeType == 3) { // text
            o = xml.nodeValue;
        }

        // do children
        if (xml.hasChildNodes()) {
            for(var i = 0; i < xml.childNodes.length; i++) {
                var item = xml.childNodes.item(i);
                var nodeName = item.nodeName;
                if (typeof(o[nodeName]) == "undefined") {
                    o[nodeName] = xmlToJson(item);
                } else {
                    if (typeof(o[nodeName].push) == "undefined") {
                        var old = o[nodeName];
                        o[nodeName] = [];
                        o[nodeName].push(old);
                    }
                    o[nodeName].push(xmlToJson(item));
                }
            }
        }

        return o;
    }

    return obj;
})();