<template>
  <div class="toasts">
    <ui-toast v-for="toast in toasts" :key="toast.id" v-bind="toast" @hide="removeToast" />
  </div>
</template>

<script>
import UiToast from './UiToast.vue';
import { toastTypes, toastIcons } from './shared';

export default {
  name: 'TheToaster',
  components: {
    UiToast,
  },
  data() {
    return {
      toasts: [],
    };
  },
  methods: {
    getToastProps(props, additionalProps) {
      let localProps = {
        id: new Date().getTime(),
        ...additionalProps,
      };

      if (typeof props === 'object') {
        return {
          ...localProps,
          ...props,
        };
      } else {
        return {
          ...localProps,
          message: props,
        };
      }
    },
    addToast(type, props) {
      this.toasts.push(this.getToastProps(props, { type, icon: toastIcons[type] }));
    },
    removeToast(id) {
      this.toasts = this.toasts.filter((t) => t.id !== id);
    },
    success(props) {
      this.addToast(toastTypes.success, props);
    },
    error(props) {
      this.addToast(toastTypes.error, props);
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
