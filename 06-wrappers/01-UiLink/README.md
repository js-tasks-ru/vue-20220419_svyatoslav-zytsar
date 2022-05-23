# UiLink

Для решения задачи требуется добавить входной параметр `tag` со значением `router-link` по умолчанию, и использовать
динамический компонент для вывода переданного элемента со слотом по умолчанию.

Обратите внимание, что передавать отдельно `v-bind="$attrs"` не требуется, так как элемент является корневым: все
атрибуты наследуются по умолчанию.

```html
<template>
  <component :is="tag" class="link"><slot /></component>
</template>

<script>
  export default {
    name: 'UiLink',

    props: {
      tag: {
        type: [String, Object, Function],
        default: 'router-link',
      },
    },
  };
</script>
```
