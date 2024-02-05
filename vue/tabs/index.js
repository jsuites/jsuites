import { h } from 'vue';
import jSuites from "../../dist/jsuites";


export default {
    inheritAttrs: false,
    mounted() {
        let options = {
            ...this.$attrs
        };

        this.el = this.$refs.container;

        this.current = jSuites.tabs(this.$refs.container, options);
    },
    setup(_, context) {
        let containerProps = {
            ref: 'container',
        };

        let vnode = []; 

        if (context.slots.default && typeof(context.slots.default) === 'function') {
            vnode = context.slots.default()
        }

        return () =>  h('div', containerProps, vnode);
    },
}