<template>
  <div :class="classes">
    <ui-icon class="toast__icon" :icon="icon" />
    <span>{{ message }}</span>
    <button v-if="isShowClose" class="toast__close" type="button" @click="hide">x</button>
  </div>
</template>

<script>
import UiIcon from './UiIcon';
import { toastTypes } from './shared';

export default {
  name: 'UiToast',
  components: {
    UiIcon,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
      default: 'success',
      validator: (v) => Object.values(toastTypes).includes(v),
    },
    message: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    timeout: {
      type: Number,
      default: 5000,
    },
    isShowClose: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['hide'],
  data() {
    return {
      timer: null,
    };
  },
  computed: {
    classes() {
      return ['toast', `toast_${this.type}`];
    },
  },
  mounted() {
    this.timer = setTimeout(this.hide, this.timeout);
  },
  beforeUnmount() {
    clearTimeout(this.timer);
  },
  methods: {
    hide() {
      this.$emit('hide', this.id);
    },
  },
};
</script>

<style scoped>
.toast {
  position: relative;
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}

.toast__close {
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 16px;
  background: none;
  border: none;
  cursor: pointer;
}
</style>
