# CounterButtonIndependent

В этот раз компоненту требуется иметь локальное состояние. Например, `localCount`. Именно это значение выводится в
содержимом кнопки. При клике на кнопку требуется не только порождать событие обновления, но и изменять локальное
состояние.

Порождать событие можно как по клику на кнопку, так и отслеживая изменение локального счётчика.

Требуется также добавить отслеживание параметра и обновление локального состояния при его обновлении. Можно также
добавить `immediate: true`, чтобы не было необходимости устанавливать начальное локальное состояние отдельно.

Клонирования значения при этом не требуется, так как число — иммутабельного типа с примитивным значением.

```html
<template>
  <button type="button" @click="increment">{{ localCount }}</button>
</template>

<script>
  export default {
    name: 'CounterButton',

    props: {
      count: {
        type: Number,
        default: 0,
      },
    },

    emits: ['update:count'],

    data() {
      return {
        localCount: undefined,
      };
    },

    watch: {
      count: {
        immediate: true,
        handler() {
          this.localCount = this.count;
        },
      },

      localCount() {
        this.$emit('update:count', this.localCount);
      },
    },

    methods: {
      increment() {
        this.localCount += 1;
      },
    },
  };
</script>
```
