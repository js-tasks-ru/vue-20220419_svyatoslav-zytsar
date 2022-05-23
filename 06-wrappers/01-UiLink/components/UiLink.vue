<template>
  <component :is="tag" class="link"><slot /></component>
</template>

<script>
export default {
  name: 'UiLink',

  props: {
    tag: {
      type: [String, Object, Function],
      default: 'router-link',
    },
  },
};
</script>

<style scoped>
.link {
  color: var(--blue);
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
</style>
