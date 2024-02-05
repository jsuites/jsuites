import { h } from 'vue';
import jSuites from "../../dist/jsuites";


export default {
    inheritAttrs: false,
    mounted() {
        let options = {
            ...this.$attrs
        };

        this.el = this.$refs.container;

        this.current = jSuites.editor(this.$refs.container, options);
    },
    setup() {
        let containerProps = {
            ref: 'container',
            style: {
                width: '100%',
                height: '100%',
            }
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