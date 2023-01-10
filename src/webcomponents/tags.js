class JsuitesTags extends HTMLElement {
    constructor() {
        // always call super() first
        super();
    }

    init(o) {
        // Initial values
        var value = o.getAttribute('value') ? o.getAttribute('value') : null;
        var limit = o.getAttribute('limit') ? o.getAttribute('limit') : null;
        var search = o.getAttribute('search') ? o.getAttribute('search') : null;
        var placeholder = o.getAttribute('placeholder') ? o.getAttribute('placeholder') : null;

        jSuites.tags(o, {
            value: value,
            limit: limit,
            search: search,
            placeholder: placeholder,
            onbeforechange: function(el, obj, v) {
                // Basic HTML event
                var s = o.getAttribute('onbeforechange');
                if (s) {
                    var newValue = eval(s);
                    if (newValue != null) {
                        return newValue;
                    }
                } else {
                    // Trigger event
                    var e = new CustomEvent("onbeforechange");
                    el.dispatchEvent(e);
                }
            },
            onchange: function(el, obj, v) {
                var newValue = obj.getValue();
                // Change value of the element
                o.setAttribute('value', newValue);
                o.value = newValue;
                // Basic HTML event
                var s = o.getAttribute('onchange');
                if (s) {
                    eval(s);
                } else {
                    // Trigger event
                    var e = new CustomEvent("onchange");
                    el.dispatchEvent(e);
                }
            },
            onfocus: function(el, obj, v) {
                // Basic HTML event
                var s = o.getAttribute('onfocus');
                if (s) {
                    eval(s);
                } else {
                    // Trigger event
                    var e = new CustomEvent("onfocus");
                    el.dispatchEvent(e);
                }
            },
            onblur: function(el, obj, v) {
                var newValue = obj.getValue();
                // Change value of the element
                o.setAttribute('value', newValue);
                o.value = newValue;
                // Basic HTML event
                var s = o.getAttribute('onblur');
                if (s) {
                    eval(s);
                } else {
                    // Trigger event
                    var e = new CustomEvent("onblur");
                    el.dispatchEvent(e);
                }
            },
            onload: function(el, obj) {
                // Basic HTML event
                var s = o.getAttribute('onload');
                if (s) {
                    eval(s);
                } else {
                    // Trigger event
                    var e = new CustomEvent("onload");
                    el.dispatchEvent(e);
                }
            }
        });

        // Initiated
        this.initiated = true;
    }

    connectedCallback() {
        if (! this.initiated) {
            this.init(this);
        }
    }

    disconnectedCallback() {
    }

    attributeChangedCallback(name, oldVal, newVal) {
    }
}

window.customElements.define('jsuites-tags', JsuitesTags);