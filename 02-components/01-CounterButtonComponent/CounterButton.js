import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'CounterButton',

  props: {
    count: {
      type: Number,
      default: 0,
      validator: (value) => value >= 0,
    },
  },

  emits: ['update:count'],

  data() {
    return {
      value: this.count,
    };
  },

  watch: {
    count(value) {
      this.value = value;
    },
  },

  methods: {
    onClick() {
      this.$emit('update:count', ++this.value);
    },
  },

  template: `
    <button
      type="button"
      @click="onClick"
    >
      {{ value }}
    </button>`,
});
