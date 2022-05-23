<template>
  <div class="wrapper">
    <header>
      <nav>
        <ul>
          <li><router-link to="/page-a">[EXISTS] /page-a</router-link></li>
          <li><router-link to="/page-b">[EXISTS] /page-b</router-link></li>
          <li><router-link to="/page-unknown">[404] /page-unknown</router-link></li>
          <li><router-link to="/this-page-does-not-exists">[404] /this-page-does-not-exists</router-link></li>
          <li><router-link to="/page-b/b">[404] /page-b/b</router-link></li>
        </ul>
      </nav>
    </header>

    <main class="main">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
@import '@/assets/styles/_fonts.css';
@import '@/assets/styles/_variables.css';
@import '@/assets/styles/_common.css';

.wrapper {
  background-color: var(--grey-light);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main {
  flex: 1 0 auto;
}
</style>
