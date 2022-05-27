<template>
  <ui-input :model-value="value" @input="handleInput" />
</template>

<script>
import UiInput from './UiInput';

export default {
  name: 'UiInputDate',

  components: { UiInput },

  props: {
    modelValue: Number,
  },

  emits: ['update:modelValue'],

  computed: {
    value() {
      if (!this.modelValue) {
        return '';
      }
      return new Date(this.modelValue).toISOString().substring(0, 10);
    },
  },

  methods: {
    handleInput($event) {
      this.$emit('update:modelValue', $event.target.value === '' ? null : $event.target.valueAsNumber);
    },
  },
};
</script>
