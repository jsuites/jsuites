class JsuitesCalendar extends HTMLElement {
    constructor() {
        // always call super() first
        super();
    }

    init(o) {
        // Create element
        this.input = document.createElement('input');
        // Append to the DOM
        o.appendChild(this.input);
        // Place holder
        var placeholder = o.getAttribute('placeholder');
        // Place holder
        var format = o.getAttribute('format');
        // Place holder
        var time = o.getAttribute('time');
        // Initial value
        var value = o.getAttribute('value');
        if (value) {
            this.input.value = value;
            o.value = value;
        }
        // Component
        jSuites.calendar(this.input, {
            value: value ? value : null,
            placeholder: placeholder ? placeholder : null,
            format: format ? format : 'YYYY-MM-DD',
            time: time ? true : false,
            onchange: function(el, val) {
                // Change value of the element
                el.setAttribute('value', val);
                o.setAttribute('value', val);
                o.value = val;
                // Basic HTML event
                var s = o.getAttribute('onchange');
                if (s) {
                    eval(s);
                }
                // Trigger event
                var e = new CustomEvent("onchange");
                el.parentNode.dispatchEvent(e);
            },
            onclose: function(el) {
                // Basic HTML event
                var s = o.getAttribute('onclose');
                if (s) {
                    eval(s);
                }
                // Trigger event
                var e = new CustomEvent("onclose");
                el.parentNode.dispatchEvent(e);
            }
        });
    }

    connectedCallback() {
        if (! this.input) {
            this.init(this);
        }
    }

    disconnectedCallback() {
    }

    attributeChangedCallback(name, oldVal, newVal) {
    }
}

window.customElements.define('jsuites-calendar', JsuitesCalendar);