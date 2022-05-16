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

    <select v-model="selectModel" style="display: none">
      <option v-for="option in options" :key="option.value" :value="option.value">{{ option.text }}</option>
    </select>
  </div>
</template>

<script>
import UiIcon from './UiIcon';

export default {
  name: 'UiDropdown',

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

    selectModel: {
      get() {
        return this.modelValue;
      },

      set(value) {
        this.select(value);
      },
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

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown__toggle {
  display: inline-block;
  background-color: var(--white);
  background-position: calc(100% - 10px) calc(100% - 10px);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  position: relative;
  padding: 10px 56px 10px 24px;
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  color: initial;
  text-align: center;
  transition-duration: 0.2s;
  transition-property: background-color, fill, color;
  outline: none;
  box-shadow: none;
  cursor: pointer;
  text-decoration: none;
}

.dropdown__toggle:after {
  content: '';
  position: absolute;
  top: 15px;
  right: 16px;
  transform: none;
  background: url('~@/assets/icons/icon-chevron-down.svg') no-repeat;
  background-size: cover;
  display: block;
  width: 24px;
  height: 24px;
  transition: 0.2s transform;
}

.dropdown__toggle.dropdown__toggle_icon {
  padding-left: 56px;
}

.dropdown_opened .dropdown__toggle {
  border-color: var(--blue);
  border-bottom-color: transparent;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.dropdown_opened .dropdown__toggle:after {
  transform: rotate(180deg);
}

.dropdown__menu {
  margin: 0;
  width: 100%;
  padding: 0;
  border-radius: 0 0 8px 8px;
  left: 0;
  z-index: 95;
  background-clip: padding-box;
  display: none;
  flex-direction: column;
  border: 2px solid var(--blue);
  border-top: none;
  overflow: hidden;
}

.dropdown_opened .dropdown__menu {
  display: flex;
  position: absolute;
  transform: translate3d(0px, 52px, 0px);
  top: -1px;
  left: 0;
  will-change: transform;
  right: auto;
  bottom: auto;
}

.dropdown__item {
  padding: 8px 16px;
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  background-color: var(--white);
  box-shadow: none;
  border: none;
  cursor: pointer;
  text-align: left;
  transition-duration: 0.2s;
  transition-property: background-color, border-color, color;
  outline: none;
  text-decoration: none;
}

.dropdown__item:hover,
.dropdown__item:focus {
  background-color: var(--grey-light);
}

.dropdown__item.dropdown__item_icon {
  padding-left: 56px;
  position: relative;
}

.dropdown__item.dropdown__item_icon .dropdown__icon,
.dropdown__toggle_icon .dropdown__icon {
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translate(0, -50%);
}
</style>
