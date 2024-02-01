import { h } from 'vue';
import jSuites from "../../src/jsuites.js";


export default {
    inheritAttrs: false,
    mounted() {
        let options = {
            ...this.$attrs
        };

        this.el = this.$refs.container;

        this.current = jSuites.calendar(this.$refs.container, options);
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