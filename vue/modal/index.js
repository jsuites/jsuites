import { h } from 'vue';
import jSuites from "../../dist/jsuites";


export default {
    inheritAttrs: false,
    mounted() {
        let options = {
            ...this.$attrs
        };

        this.el = this.$refs.container;

        this.current = jSuites.modal(this.$refs.container, options);
    },
    setup(_, context) {
        let containerProps = {
            ref: 'container',
            style: {
                width: '100%',
                height: '100%',
            }
        };

        let vnode = []; 

        if (context.slots.default && typeof(context.slots.default) === 'function') {
            vnode = context.slots.default()
        }

        return () =>  h('div', containerProps, vnode);
    },
    watch: {
        $attrs: {
            deep: true,
            handler() {
                this.updateState();
            }
        }
    },
    methods: {
        updateState() {
            for (let key in this.$attrs) {
                if (this.$attrs.hasOwnProperty(key) && this.current.hasOwnProperty(key)) {
                    if (this.$attrs[key] !== this.current[key]) {
                        this.current[key] = this.$attrs[key];
                    }
                }
            }
        }
    }
}