<template>
  <the-toaster ref="toaster" />
  <p>
    <button @click="success">Add Success Message</button>
    <button @click="error">Add Error Message</button>
  </p>
</template>

<script>
import TheToaster from './components/TheToaster';

export default {
  name: 'App',

  components: { TheToaster },

  methods: {
    success() {
      this.$refs.toaster.success({
        message: 'Success ' + new Date().toLocaleTimeString(),
        timeout: 4000,
        isShowClose: true,
      });
    },

    error() {
      this.$refs.toaster.error('Error ' + new Date().toLocaleTimeString());
    },
  },
};
</script>

<style></style>
