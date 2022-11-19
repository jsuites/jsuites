class JsuitesColor extends HTMLElement {
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
        // Initial value
        var value = o.getAttribute('value');
        if (value) {
            o.value = value;
        }
        // Component
        jSuites.color(this.input, {
            value: value ? value : null,
            placeholder: placeholder ? placeholder : null, 
            onchange: function(el, color) {
                // Change value of the element
                o.setAttribute('value', color);
                o.value = color;
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

window.customElements.define('jsuites-color', JsuitesColor);