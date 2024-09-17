import { h } from 'vue';
import player from "./player";


export default {
    inheritAttrs: false,
    mounted() {
        let options = {
            ...this.$attrs
        };

        this.el = this.$refs.container;

        this.current = player(this.$refs.container, options);
    },
    setup() {
        let containerProps = {
            ref: 'container',
        };
        return () => h('div', containerProps);
    },
}