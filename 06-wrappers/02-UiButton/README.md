# UiButton

Задача похожа на предыдущую. Чуть сложнее в работе с классами и атрибутами.

```html
<template>
  <component :is="tag" class="button" :class="[variantClass, { button_block: block }]" :type="type">
    <slot />
  </component>
</template>

<script>
  // Опишем отдельно соотношение между вариантами кнопок и классами.
  // Если бы вёрстка не была готовой, проще было бы делать классы эквивалентными вариантам,
  // но работаем с тем, что имеем.
  const buttonClasses = {
    primary: 'button_primary',
    secondary: 'button_secondary',
    danger: 'button_danger',
  };

  export default {
    name: 'UiButton',

    props: {
      tag: {
        type: [String, Object, Function],
        default: 'button',
      },

      block: {
        type: Boolean,
        default: false,
      },

      variant: {
        type: String,
        default: 'secondary',
        validator: (value) => Object.keys(buttonClasses).includes(value),
      },
    },

    computed: {
      variantClass() {
        return buttonClasses[this.variant];
      },

      // Вычисляем атрибут type при необходимости
      type() {
        if (this.tag === 'button') {
          return this.$attrs.type ?? 'button';
        }
        // Значение undefined позволяет не устанавливать тип
        return undefined;
      },
    },
  };
</script>
```
