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

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
