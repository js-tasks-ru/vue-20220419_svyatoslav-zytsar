# MeetupCover с v-bind

В стилях требуется заменить фон на `v-bind(val)`, где `val` - свойство с нужным фоном.

Фоном может быть либо ссылка на изображение `url('${this.image}')`, либо переменная с ихображением по умолчанию
`'var(--default-cover)'`.

Удобнее всего добавить вычисляемое свойство с проверкой:

```javascript
backgroundImage() {
  return this.image ? `url('${this.image}')` : 'var(--default-cover)';
}
```

Это выражение можно описать прямо в `v-bind` в стилях, но лучше не оставлять таких сложных выражений в стилях.

```css
.meetup-cover {
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), v-bind('image ? `url("${image}")` : "var(--default-cover)"');
}
```

Полное решение:

```html
<template>
  <div class="meetup-cover">
    <h1 class="meetup-cover__title">{{ title }}</h1>
  </div>
</template>

<script>
  export default {
    name: 'MeetupCover',

    props: {
      title: { type: String },
      image: { type: String },
    },

    computed: {
      backgroundImage() {
        return this.image ? `url('${this.image}')` : 'var(--default-cover)';
      },
    },
  };
</script>

<style scoped>
  .meetup-cover {
    background-size: cover;
    background-position: center;
    background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), v-bind(backgroundImage);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 410px;
    max-width: 1216px;
    margin: 0 auto;
  }

  .meetup-cover__title {
    color: var(--white);
    font-family: Roboto, sans-serif;
    font-weight: 700;
    font-size: 36px;
    line-height: 48px;
    padding: 0 16px;
    text-align: center;
  }

  @media all and (min-width: 992px) {
    .meetup-cover__title {
      font-size: 72px;
      line-height: 84px;
    }
  }
</style>
```
