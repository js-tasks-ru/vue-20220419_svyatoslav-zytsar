<template>
  <div class="page-error">
    <ui-container>
      <h2 class="page-error__title">
        <span class="page_error__status-text">Страница не найдена</span>
        <span class="page-error__status-code">404</span>
      </h2>
    </ui-container>
  </div>
</template>

<script>
import UiContainer from '../components/UiContainer';

export default {
  name: 'PageNotFound',
  components: {
    UiContainer,
  },
};
</script>

<style scoped>
.page-error {
  padding: 100px 0;
}

.page-error__title {
  font-family: Nunito, sans-serif;
  font-weight: 700;
  font-size: 52px;
  line-height: 1.2;
  text-align: center;
  color: var(--body-color);
}

.page-error__status-code {
  display: block;
  font-size: 144px;
}

@media all and (max-width: 767px) {
  .page-error__title {
    font-size: 36px;
  }

  .page-error__status-code {
    font-size: 108px;
  }
}
</style>
