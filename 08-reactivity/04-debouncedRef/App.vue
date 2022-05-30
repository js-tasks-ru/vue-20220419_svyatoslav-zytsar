<template>
  <div class="sample container">
    <p>source = <input v-model="source.value" type="number" /></p>
    <p>Debounced source (wait=1000ms) = {{ debouncedSource.value }}</p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { debouncedRef } from './utils/debouncedRef';

export default {
  name: 'App',

  created() {
    // Здесь лучше использовать Composition API, но мы с ним пока не знакомы
    // Для примера и ручного тестирования подойдёт и такое нетипичное решение

    this.source = ref(0);

    this.debouncedSource = debouncedRef(this.source, 1000);
  },
};
</script>

<style></style>
