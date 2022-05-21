<template>
  <a class="link">Link!</a>
</template>

<script>
export default {
  name: 'UiLink',
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
