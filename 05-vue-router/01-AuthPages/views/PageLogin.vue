<template>
  <div class="page-auth">
    <ui-container>
      <h2 class="title page-auth__title">Вход</h2>
      <form class="form" @submit.prevent="handleSubmit">
        <ui-form-group label="Email">
          <div class="input-group">
            <input name="email" type="email" placeholder="demo@email" class="form-control" />
          </div>
        </ui-form-group>
        <ui-form-group label="Пароль">
          <div class="input-group">
            <input name="password" type="password" placeholder="password" class="form-control" />
          </div>
        </ui-form-group>
        <div class="form__buttons">
          <button type="submit" class="button button_primary button_block">Войти</button>
        </div>
        <div class="form__append">
          Нет аккаунта? <router-link :to="{ name: 'register' }" class="link">Зарегистрируйтесь</router-link>
        </div>
      </form>
    </ui-container>
  </div>
</template>

<script>
import UiFormGroup from '../components/UiFormGroup';
import UiContainer from '../components/UiContainer';

export default {
  name: 'PageLogin',

  components: {
    UiFormGroup,
    UiContainer,
  },

  // Добавим параметр и настроим роутер на передачу в него query параметра
  props: {
    from: {
      type: [String, Object],
      // Можно сразу добавить значение по умолчанию
      default: () => ({ name: 'index' }),
    },
  },

  methods: {
    handleSubmit() {
      this.$router.push(this.from);
      // Простой вариант напрямую из $route.query:
      // this.$router.push(this.$route.query.from ?? { name: 'index' });
    },
  },
};
</script>

<style></style>
