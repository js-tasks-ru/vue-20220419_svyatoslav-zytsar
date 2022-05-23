<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': isLoading }"
      :style="computedStyles"
      @click="onClick"
    >
      <span class="image-uploader__text">{{ computedText }}</span>
      <input
        ref="input"
        v-bind="$attrs"
        type="file"
        accept="image/*"
        class="image-uploader__input"
        @change="onChangeFile"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',
  inheritAttrs: false,
  props: {
    preview: String,
    uploader: Function,
  },
  emits: ['select', 'upload', 'error', 'remove'],
  data() {
    return {
      isLoading: false,
      selfPreview: this.preview,
    };
  },
  computed: {
    computedStyles() {
      if (this.selfPreview) {
        return {
          '--bg-url': `url(${this.selfPreview})`,
        };
      }

      return null;
    },
    computedText() {
      if (this.selfPreview) return 'Удалить изображение';

      if (this.isLoading) return 'Загрузка...';

      return 'Загрузить изображение';
    },
  },
  watch: {
    preview(value) {
      this.selfPreview = value;
    },
  },
  methods: {
    onClick(e) {
      if (this.selfPreview) {
        this.selfPreview = null;

        this.$emit('remove');

        e.preventDefault();
      }
    },
    async onChangeFile(e) {
      try {
        const [file] = e.target.files;

        this.$emit('select', file);

        if (this.uploader) {
          this.isLoading = true;

          const response = await this.uploader(file);

          this.$emit('upload', response);
        } else {
          this.selfPreview = URL.createObjectURL(file);
        }
      } catch (e) {
        this.$emit('error', e);
      } finally {
        this.isLoading = false;

        this.$refs.input.value = '';
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
