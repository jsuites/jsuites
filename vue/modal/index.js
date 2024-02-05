import { h } from 'vue';
import jSuites from "../../dist/jsuites";

export const Modal = {
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
};

export default Modal;