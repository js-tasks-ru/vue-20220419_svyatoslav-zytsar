<!-- STUB: ЭТО ЗАГЛУШКА ДЛЯ РУЧНОГО ТЕСТИРОВАНИЯ -->
<!-- ВЫ МОЖЕТЕ ИСПОЛЬЗОВАТЬ ПОЛНУЮ ВЕРСИЮ КОМПОНЕНТА, ЕСЛИ УЖЕ РЕАЛИЗОВАЛИ ЕГО -->

<template>
  <div class="image-uploader">
    <label class="image-uploader__preview" :style="src && `--bg-url: url('${src}')`" @click.stop.prevent="handleClick">
      <span class="image-uploader__text">{{ src ? 'Удалить' : 'Загрузить изображение' }}</span>
      <input
        ref="input"
        type="file"
        accept="image/*"
        class="image-uploader__input"
        v-bind="$attrs"
        @change="mockFileSelect"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',
  inheritAttrs: false,

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
      src: this.preview,
    };
  },

  methods: {
    mockFileSelect() {
      this.src = 'https://course-vue.javascript.ru/api/images/1';
      const file = new File(['abc'], 'abc.jpeg', {
        type: 'image/jpeg',
      });
      this.$emit('select', this.$refs.input.files[0] || file);
    },

    mockRemoveFile() {
      this.src = null;
      this.$refs.input.value = '';
      this.$emit('remove');
    },

    handleClick() {
      if (this.src && this.src !== this.preview) {
        this.mockRemoveFile();
      } else {
        this.mockFileSelect();
      }
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
