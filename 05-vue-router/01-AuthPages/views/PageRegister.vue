<template>
  <div class="page-auth">
    <ui-container>
      <h2 class="title page-auth__title">Регистрация</h2>
      <form class="form" @submit.prevent="handleSubmit">
        <ui-form-group label="Email">
          <div class="input-group">
            <input name="email" type="email" class="form-control" />
          </div>
        </ui-form-group>
        <ui-form-group label="Имя">
          <div class="input-group">
            <input name="fullname" type="text" class="form-control" />
          </div>
        </ui-form-group>
        <ui-form-group label="Пароль">
          <div class="input-group">
            <input name="password" type="password" class="form-control" />
          </div>
        </ui-form-group>
        <ui-form-group label="Повтор пароля">
          <div class="input-group">
            <input type="password" class="form-control" />
          </div>
        </ui-form-group>
        <ui-form-group>
          <label class="checkbox">
            <input type="checkbox" class="checkbox__input" />
            <span class="checkbox__box"></span>
            Я согласен с условиями
          </label>
        </ui-form-group>
        <div class="form__buttons">
          <button type="submit" class="button button_primary">Зарегистрироваться</button>
        </div>
        <div class="form__append">
          Уже есть аккаунт? <router-link :to="{ name: 'login' }" class="link">Войдите</router-link>
        </div>
      </form>
    </ui-container>
  </div>
</template>

<script>
import UiFormGroup from '../components/UiFormGroup';
import UiContainer from '../components/UiContainer';

export default {
  name: 'PageRegister',

  components: {
    UiFormGroup,
    UiContainer,
  },

  methods: {
    handleSubmit() {
      this.$router.push({ name: 'login' });
    },
  },
};
</script>

<style></style>
