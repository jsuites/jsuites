import { h } from 'vue';
import jSuites from "../../dist/jsuites";


export default {
    inheritAttrs: false,
    mounted() {
        let options = {
            ...this.$attrs
        };

        this.el = this.$refs.container;

        this.current = jSuites.rating(this.$refs.container, options);
    },
    setup() {
        let containerProps = {
            ref: 'container',
        };
        return () => h('div', containerProps);
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
            if (this.$attrs["value"] !== this.current["value"]) {
                this.current.setValue(this.$attrs["value"])
            }
        }
    }
}