<template>
  <ui-input ref="inputHolder" v-model="selfModel" :type="type">
    <template v-for="(_, name) in $slots" #[name]>
      <slot :name="name" />
    </template>
  </ui-input>
</template>

<script>
import UiInput from './UiInput';

const types = {
  DATE: 'date',
  TIME: 'time',
  DATETIME_LOCAL: 'datetime-local',
};

const offsets = {
  [types.DATE]: [0, 10],
  [types.TIME]: [11, 16],
  [types.DATETIME_LOCAL]: [0, 16],
};

export default {
  name: 'UiInputDate',
  components: { UiInput },
  props: {
    type: {
      type: String,
      default: 'date',
      validator: (v) => Object.values(types).includes(v),
    },
    modelValue: {
      type: Number,
      default: null,
    },
  },
  emits: ['update:modelValue'],
  computed: {
    selfModel: {
      get() {
        if (!this.modelValue) return '';

        return new Date(this.modelValue).toISOString().substring(...offsets[this.type]);
      },

      set(value) {
        this.$emit('update:modelValue', value ? this.$refs.inputHolder.$refs.input.valueAsNumber : '');
      },
    },
  },
};
</script>
