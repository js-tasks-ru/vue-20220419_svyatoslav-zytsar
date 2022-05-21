<template>
  <header class="header">
    <meetups-logo />
    <meetups-nav />
  </header>
</template>

<script>
import { defineComponent } from 'vue';
import MeetupsLogo from './MeetupsLogo';
import MeetupsNav from './MeetupsNav';

export default defineComponent({
  name: 'MeetupsHeader',
  components: { MeetupsNav, MeetupsLogo },
});
</script>

<style scoped>
.header {
  padding: 44px 0 32px;
  background-color: var(--white);
}
</style>
