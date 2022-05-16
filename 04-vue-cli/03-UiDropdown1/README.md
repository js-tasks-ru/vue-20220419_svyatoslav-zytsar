# UiDropdown1

У компонента должно быть своё состояние - состояние открытости списка. Пусть это будет свойство `isOpen`. Именно от
этого свойства будет зависеть класс `dropdown_opened` на компоненте и отображение списка.

Показывать список вариантов можно с директивой `v-show`. Директива `v-if` здесь также будет работать, но не нужно
удалять из DOM список вариантов, когда список не раскрыт. Будет лучше, если список будет всегда, а отображаться быстро
через смену `display`.

Для изменения этого состояния можно добавить метод `toggleOpen`, который будет менять состояние на противоположное.

Нам также требуется знать, нужны ли классы `dropdown__toggle_icon` и `dropdown__item_icon`. Для этого надо проверить,
есть ли хотя бы один вариант с полем `icon`. Здесь поможет метод массива `some`.

```javascript
hasIcons() {
  return this.options.some((option) => option.icon);
}
```

Осталось научиться выводить выбранный вариант. Для этого достаточно добавить вычисляемое свойство, которое его находит,
например, так:

```javascript
selected() {
  return this.options.find((option) => option.value === this.value);
}
```

При выборе варианта (клик по кнопке) нужно не забыть закрыть список и породить событие `update:modelValue` с нужным
вариантом.

```html
<template>
  <div class="dropdown" :class="{ dropdown_opened: isOpen }">
    <button type="button" class="dropdown__toggle" :class="{ dropdown__toggle_icon: hasIcons }" @click="toggleOpen">
      <ui-icon v-if="selected?.icon" :icon="selected.icon" class="dropdown__icon" />
      <span>{{ modelValue ? selected?.text : title }}</span>
    </button>

    <div v-show="isOpen" class="dropdown__menu" role="listbox">
      <button
        v-for="option in options"
        :key="option.value"
        class="dropdown__item"
        :class="{ dropdown__item_icon: hasIcons }"
        role="option"
        type="button"
        @click="select(option.value)"
      >
        <ui-icon v-if="option.icon" :icon="option.icon" class="dropdown__icon" />
        {{ option.text }}
      </button>
    </div>
  </div>
</template>

<script>
  import UiIcon from './UiIcon';

  export default {
    name: 'DropdownButton',

    components: { UiIcon },

    props: {
      modelValue: {},

      options: {
        type: Array,
        required: true,
        validator: (options) =>
          options.every(
            (option) => typeof option === 'object' && option !== null && 'value' in option && 'text' in option,
          ),
      },

      title: {
        type: String,
        required: true,
      },
    },

    emits: ['update:modelValue'],

    data() {
      return {
        isOpen: false,
      };
    },

    computed: {
      selected() {
        return this.options.find((option) => option.value === this.modelValue);
      },

      hasIcons() {
        return this.options.some((option) => option.icon);
      },
    },

    methods: {
      toggleOpen() {
        this.isOpen = !this.isOpen;
      },

      select(value) {
        this.isOpen = false;
        this.$emit('update:modelValue', value);
      },
    },
  };
</script>
```

Дополнительно требовалось добавить скрытый `select`, дублирующий работу списка. Вывести его не сложно, а вот
синхронизировать состояние немного сложнее. Просто привязать `modelValue` к `<select>` через `v-model` нельзя -
получится мутация входного параметра.

Можно явно работать со значением `selected` у вариантов и обрабатывать событие изменения:

```html
<select style="display: none" @change="$emit('update:modelValue', $event.target.value)">
  <option
    v-for="option in options"
    :key="option.value"
    :value="option.value"
    :selected="option.value === selected?.value"
  >
    {{ option.text }}
  </option>
</select>
```

Либо сделать вычисляемое свойство с геттером и сеттером, которое будет брать значение из входного параметра, а при
изменении значения порождать событие его обновления.

```html
<select v-model="selectModel" style="display: none">
  <option v-for="option in options" :key="option.value" :value="option.value">{{ option.text }}</option>
</select>
```

```javascript
computed: {
  selectModel: {
    get() {
      return this.modelValue;
    },

    set(value) {
      this.$emit('update:modelValue', value);
    },
  },
},
```
