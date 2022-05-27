<template>
  <button @click="onClick">{{ selfCount }}</button>
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
      selfCount: this.count,
    };
  },
  watch: {
    count(value) {
      this.selfCount = value;
    },
  },
  methods: {
    onClick() {
      this.selfCount++;

      this.$emit('update:count', this.selfCount);
    },
  },
};
</script>
