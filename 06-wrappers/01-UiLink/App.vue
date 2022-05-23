<template>
  <div class="sample container">
    <p>
      <ui-link tag="router-link" to="/">tag="router-link" to="/"</ui-link>
    </p>
    <p>
      <ui-link :tag="RouterLink" :to="{ name: 'page-a' }">:tag="RouterLink" :to="{ name: 'page-a' }"</ui-link>
    </p>
    <p>
      <ui-link :to="{ name: 'page-b' }">RouterLink by default with :to="{ name: 'page-b' }</ui-link>
    </p>
    <p>
      <ui-link tag="a" href="https://learn.javascript.ru">tag="a" with href</ui-link>
    </p>
    <p>
      <ui-link tag="a" href="https://learn.javascript.ru" target="_blank">tag="a" with href and _blank</ui-link>
    </p>
    <router-view />
  </div>
</template>

<script>
import { RouterLink } from 'vue-router';
import UiLink from './components/UiLink';

export default {
  name: 'App',

  components: { UiLink },

  computed: {
    RouterLink() {
      return RouterLink;
    },
  },
};
</script>

<style>
@import '@/assets/styles/_container.css';
</style>
