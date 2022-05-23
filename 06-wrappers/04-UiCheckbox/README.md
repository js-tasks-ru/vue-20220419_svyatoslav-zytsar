# UiCheckbox

Задача решается путём создания обёртки над `input[type=checkbox]` аналогично предыдущей задаче.

Сложность может быть в поддержки как `Boolean`, так и `Array` значении модели, но эта особенность не создаёт
дополнительной работы, если проксировать значение модели через вычисляемое свойство с геттером и сеттером.

```html
<template>
  <label class="checkbox">
    <input v-model="customModel" type="checkbox" class="checkbox__input" v-bind="$attrs" />
    <span class="checkbox__box"></span>
    <slot />
  </label>
</template>

<script>
  export default {
    name: 'UiCheckbox',
    inheritAttrs: false,

    props: {
      modelValue: {
        type: [Boolean, Array],
        default: false,
      },
    },

    emits: {
      'update:modelValue': null,
    },

    computed: {
      customModel: {
        get() {
          return this.modelValue;
        },
        set(value) {
          this.$emit('update:modelValue', value);
        },
      },
    },
  };
</script>
```
