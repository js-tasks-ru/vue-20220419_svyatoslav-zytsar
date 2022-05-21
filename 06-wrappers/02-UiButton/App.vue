<template>
  <div class="sample container">
    <p style="display: flex; justify-content: space-between">
      <ui-button variant="primary">Primary Button</ui-button>
      <ui-button variant="secondary">Secondary Button</ui-button>
      <ui-button variant="danger">Danger Button</ui-button>
    </p>
    <p>
      <ui-button @click="clicked">Click Me</ui-button>
    </p>
    <p>
      <ui-button block>Block</ui-button>
    </p>
    <p>
      <ui-button tag="a" href="#">Button Link</ui-button>
    </p>
    <p>
      <ui-button tag="router-link" to="/">Button RouterLink</ui-button>
    </p>
  </div>
</template>

<script>
import UiButton from './components/UiButton';

export default {
  name: 'App',
  components: { UiButton },
  methods: {
    clicked() {
      alert('Clicked');
    },
  },
};
</script>

<style>
@import '@/assets/styles/_container.css';
</style>
