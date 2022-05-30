<template>
  <button type="button" @click="increment">{{ localCount }}</button>
</template>

<script>
export default {
  name: 'CounterButton',

  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  emits: ['update:count'],

  data() {
    return {
      localCount: undefined,
    };
  },

  watch: {
    count: {
      immediate: true,
      handler() {
        this.localCount = this.count;
      },
    },

    localCount() {
      this.$emit('update:count', this.localCount);
    },
  },

  methods: {
    increment() {
      this.localCount += 1;
    },
  },
};
</script>
