<template>
  <ui-container class="sample">
    <sensors-data-container />
  </ui-container>
</template>

<script>
import UiContainer from './components/UiContainer';
import SensorsDataContainer from './components/SensorsDataView';

export default {
  name: 'App',

  components: { SensorsDataContainer, UiContainer },
};
</script>

<style></style>
