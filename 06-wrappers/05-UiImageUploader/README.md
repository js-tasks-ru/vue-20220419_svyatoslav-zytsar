# UiImageUploader

Для получения изображения требуется обработать событие `@change` у поля ввода. Файл с выбранным изображением можно найти
в `$event.target.files[0]`.

Ещё одна проблема может быть, если при удалении изображения не сбрасывать значения поля ввода. Для удаления выбранного
изображения можно, например, установить пустую строку или `null` в качестве значения.

При клике на "Удалить изображение" важно также вызывать `$event.preventDefault();`, чтобы не открыть диалог выбора
файла.

В остальном сложность задачи сводится к реализации его состояний.

```html
<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': state === $options.States.LOADING }"
      :style="previewSrc && `--bg-url: url('${previewSrc}')`"
    >
      <span class="image-uploader__text">{{ stateText }}</span>
      <input
        ref="input"
        type="file"
        accept="image/*"
        class="image-uploader__input"
        v-bind="$attrs"
        @change="handleFileSelect"
        @click="handleClick"
      />
    </label>
  </div>
</template>

<script>
  const States = {
    EMPTY: 'empty',
    LOADING: 'loading',
    FILLED: 'filled',
  };

  export default {
    name: 'UiImageUploader',
    inheritAttrs: false,

    States,

    props: {
      uploader: {
        type: Function,
      },

      preview: {
        type: String,
      },
    },

    emits: ['upload', 'select', 'error', 'remove'],

    data() {
      return {
        // Храним текущее состояние
        // Начальное состояние зависит от того, передан ли preview
        state: this.preview ? States.FILLED : States.EMPTY,
        selectedImage: null,
      };
    },

    computed: {
      previewSrc() {
        return this.selectedImage ?? this.preview;
      },

      // Текст от текущего состояния
      stateText() {
        return {
          [States.EMPTY]: 'Загрузить изображение',
          [States.LOADING]: 'Загрузка...',
          [States.FILLED]: 'Удалить изображение',
        }[this.state];
      },
    },

    methods: {
      handleFileSelect($event) {
        const file = $event.target.files[0];
        // Выводим текущий файл через URL.createObjectURL
        this.selectedImage = URL.createObjectURL(file);
        this.$emit('select', file);

        // Если загрузчика нет - сразу считаем файл выбранным
        if (!this.uploader) {
          this.state = States.FILLED;
          return;
        }

        const lastState = this.state;
        this.state = States.LOADING;

        return this.uploader(file)
          .then((result) => {
            this.state = States.FILLED;
            this.$emit('upload', result);
          })
          .catch((error) => {
            this.state = States.EMPTY;
            // Не забываем сбросить файл в случае не успешной загрузки
            // Иначе нельзя будет выбрать тот же файл
            this.removeFile();
            this.$emit('error', error);
          })
          .finally(() => {
            this.selectedImage = null;
          });
      },

      handleClick($event) {
        if (this.state === States.LOADING) {
          // Игнорируем клик во время загрузки
          $event.preventDefault();
        } else if (this.state === States.FILLED) {
          $event.preventDefault();
          this.removeFile();
          this.state = States.EMPTY;
          this.$emit('remove');
        }
        // Когда ничего не выбрано, клик обрабатывается по умолчанию, открывая диалог выбора файла
      },

      removeFile() {
        this.$refs.input.value = '';
      },
    },
  };
</script>
```
