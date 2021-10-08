class JsuitesModal extends HTMLElement {
    constructor() {
        // always call super() first
        super();
    }

    init(o) {
        this.el = document.createElement('div');

        // Options
        var options = {};
        // Initial values
        var title = o.getAttribute('title');
        if (title) {
            options.title = title;
        }
        var width = o.getAttribute('width');
        if (width) {
            options.width = width;
        }
        var height = o.getAttribute('height');
        if (height) {
            options.height = height;
        }
        var closed = o.getAttribute('closed');
        if (closed) {
            options.closed = closed;
        }

        // Events
        options.onopen = function(el, obj) {
            // Basic HTML event
            var s = o.getAttribute('onopen');
            if (s) {
                eval(s);
            }
            // Trigger event
            var e = new CustomEvent("onopen");
            el.dispatchEvent(e);
        }

        options.onclose = function(el, obj) {
            // Basic HTML event
            var s = o.getAttribute('onclose');
            if (s) {
                eval(s);
            }
            // Trigger event
            var e = new CustomEvent("onclose");
            el.dispatchEvent(e);
        }

        setTimeout(function() {
            jSuites.modal(o, options);
        }, 0);
    }

    connectedCallback() {
        if (! this.el) {
            this.init(this);
        }
    }

    disconnectedCallback() {
    }

    attributeChangedCallback(name, oldVal, newVal) {
    }
}

window.customElements.define('jsuites-modal', JsuitesModal);