class JsuitesRating extends HTMLElement {
    constructor() {
        // always call super() first
        super();
    }

    init(o) {
        // Initial values
        var value = o.getAttribute('value') ? o.getAttribute('value') : null;
        var number = o.getAttribute('number') ? o.getAttribute('number') : 5;
        var tooltip = o.getAttribute('tooltip') ? o.getAttribute('tooltip') : null;
        if (tooltip) {
            tooltip = tooltip.split(',');
        } else {
            tooltip = [ 'Very bad', 'Bad', 'Average', 'Good', 'Very good' ];
        }

        jSuites.rating(o, {
            value: value,
            number: number,
            tooltip: tooltip,
            onchange: function(el, v) {
                // Change value of the element
                o.setAttribute('value', v);
                o.value = v;
                // Basic HTML event
                var s = o.getAttribute('onchange');
                if (s) {
                    eval(s);
                }
                // Trigger event
                var e = new CustomEvent("onchange");
                el.dispatchEvent(e);
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

window.customElements.define('jsuites-rating', JsuitesRating);