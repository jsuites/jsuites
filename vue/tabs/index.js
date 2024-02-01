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
    setup() {
        let containerProps = {
            ref: 'container',
        };
        return () => h('div', containerProps);
    },
}