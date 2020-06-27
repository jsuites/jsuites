class JsuitesEditor extends HTMLElement {
    constructor() {
        // always call super() first
        super();
    }

    init(o) {
        this.el = document.createElement('div');

        // Options
        var options = {};
        // Initial values
        var toolbar = o.getAttribute('toolbar');
        if (toolbar) {
            options.toolbar = toolbar;
        }

        // Events
        options.onload = function(el, obj) {
            // Basic HTML event
            var s = o.getAttribute('onload');
            if (s) {
                eval(s);
            }
            // Trigger event
            var e = new CustomEvent("onload");
            el.dispatchEvent(e);
        }

        options.onclick = function(el, obj) {
            // Basic HTML event
            var s = o.getAttribute('onclick');
            if (s) {
                eval(s);
            }
            // Trigger event
            var e = new CustomEvent("onclick");
            el.dispatchEvent(e);
        }

        options.onfocus = function(el, obj) {
            // Basic HTML event
            var s = o.getAttribute('onfocus');
            if (s) {
                eval(s);
            }
            // Trigger event
            var e = new CustomEvent("onfocus");
            el.dispatchEvent(e);
        }

        options.onblur = function(el, obj) {
            // Basic HTML event
            var s = o.getAttribute('onblur');
            if (s) {
                eval(s);
            }
            // Trigger event
            var e = new CustomEvent("onblur");
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
            jSuites.editor(o, options);
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

window.customElements.define('jsuites-editor', JsuitesEditor);