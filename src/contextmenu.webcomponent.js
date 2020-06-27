class JsuitesContextmenu extends HTMLElement {
    constructor() {
        // always call super() first
        super();
    }

    init(o) {
        this.el = jSuites.contextmenu(o, {
            items: null,
            onclick: function(a) {
                a.close();
            }
        });
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

window.customElements.define('jsuites-contextmenu', JsuitesContextmenu);