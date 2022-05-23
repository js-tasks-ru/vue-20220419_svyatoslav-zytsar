<template>
  <div class="sample container">
    <p>
      <ui-checkbox v-model="checked"> Checked ({{ checked }})</ui-checkbox>
    </p>
    <p><ui-checkbox v-model="checkedArray" value="A">Check A</ui-checkbox></p>
    <p><ui-checkbox v-model="checkedArray" value="B">Check B</ui-checkbox></p>
    <p><ui-checkbox v-model="checkedArray" value="C">Check C</ui-checkbox></p>
    <p>Checked: {{ checkedArray }}</p>
    <p>
      <button @click="checked = !checked">Update Bool</button>
    </p>
    <p>
      <button @click="!checkedArray.includes('A') ? checkedArray.push('A') : checkedArray.pop()">Update Array</button>
    </p>
  </div>
</template>

<script>
import UiCheckbox from './components/UiCheckbox';

export default {
  name: 'App',
  components: { UiCheckbox },

  data() {
    return {
      checked: false,
      checkedArray: [],
    };
  },
};
</script>

<style>
@import '@/assets/styles/_container.css';
</style>
