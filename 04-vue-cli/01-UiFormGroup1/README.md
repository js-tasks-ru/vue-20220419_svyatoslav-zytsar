# UiFormGroup1

Задача не сложная, требуется только реализовать все пункты из условия.

Класс привязывается через `v-bind`. `<label>` выводится через текстовую интерполяцию с проверкой `v-if`. Под `<label>` -
слот по умолчанию для содержимого.

## Решение

```html
<template>
  <div class="form-group" :class="{ 'form-group_inline': inline }">
    <label v-if="label" class="form-group__label">{{ label }}</label>
    <slot />
  </div>
</template>

<script>
  export default {
    name: 'UiFormGroup',

    props: {
      inline: {
        type: Boolean,
        default: false,
      },

      label: String,
    },
  };
</script>
```
