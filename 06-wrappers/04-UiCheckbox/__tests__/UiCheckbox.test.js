import { shallowMount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
const UiCheckbox = require(global.getSolutionPath('components/UiCheckbox.vue')).default;

describe('wrappers/UiCheckbox', () => {
  describe('UiCheckbox', () => {
    const slots = { default: '<span>Default Slot</span>' };
    const value = 'CheckBoxValue';

    it('UiCheckbox должен рендерить слот по умолчанию', () => {
      const wrapper = shallowMount(UiCheckbox, { slots });
      expect(wrapper.html()).toContain(slots.default);
    });

    it('UiCheckbox должен наследовать атрибуты на input', async () => {
      const attrs = { disabled: '', name: 'test_input' };
      const wrapper = shallowMount(UiCheckbox, { attrs });
      expect(wrapper.attributes()).not.toMatchObject(attrs);
      expect(wrapper.find('input').attributes()).toMatchObject(attrs);
    });

    it('UiCheckbox должен выводить неустановленный checkbox при значении false', async () => {
      const wrapper = shallowMount(UiCheckbox);
      expect(wrapper.find('input').element.checked).toBeFalsy();
    });

    it('UiCheckbox должен выводить установленный checkbox при значении true', async () => {
      const wrapper = shallowMount(UiCheckbox, { props: { modelValue: true } });
      expect(wrapper.find('input').element.checked).toBeTruthy();
    });

    it('UiCheckbox должен обновлять checkbox при обновлении логического значения', async () => {
      const wrapper = shallowMount(UiCheckbox);
      await wrapper.setProps({ checked: true });
      expect(wrapper.find('input').element.checked).toBeTruthy();
    });

    it('UiCheckbox должен выводить неустановленный checkbox при отсутствии value в массиве значений', async () => {
      const wrapper = shallowMount(UiCheckbox, { props: { modelValue: [] }, attrs: { value } });
      expect(wrapper.find('input').element.checked).toBeFalsy();
    });

    it('UiCheckbox должен выводить установленный checkbox при наличии value в массиве значений', async () => {
      const wrapper = shallowMount(UiCheckbox, { props: { modelValue: [value] }, attrs: { value } });
      expect(wrapper.find('input').element.checked).toBeTruthy();
    });

    it('UiCheckbox должен выводить установленный checkbox при добавлении value в массив значений', async () => {
      const values = ref([]);
      const wrapper = shallowMount(UiCheckbox, { props: { modelValue: values }, attrs: { value } });
      values.value.push(value);
      await nextTick();
      expect(wrapper.find('input').element.checked).toBeTruthy();
    });

    it('UiCheckbox должен выводить неустановленный checkbox при удалении value из массива значений', async () => {
      const values = ref([value]);
      const wrapper = shallowMount(UiCheckbox, { props: { modelValue: values }, attrs: { value } });
      values.value.splice(0, 1);
      await nextTick();
      expect(wrapper.find('input').element.checked).toBeFalsy();
    });

    it('UiCheckbox должен порождать событие обновления значения с новым логическим значением при установке checkbox', async () => {
      const wrapper = shallowMount(UiCheckbox, { props: { modelValue: false }, attrs: { value } });
      await wrapper.find('input').setValue(true);
      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')[0]).toEqual([true]);
    });

    it('UiCheckbox должен порождать событие обновления значения с новым логическим значением при снятии checkbox', async () => {
      const wrapper = shallowMount(UiCheckbox, { props: { modelValue: true }, attrs: { value } });
      await wrapper.find('input').setValue(false);
      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')[0]).toEqual([false]);
    });

    it('UiCheckbox должен порождать событие обновления значения с обновлённым массивом значений новым значением при установке checkbox', async () => {
      const values = ['1', '2', '3'];
      const wrapper = shallowMount(UiCheckbox, { props: { modelValue: values }, attrs: { value } });
      await wrapper.find('input').setValue(true);
      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')[0]).toEqual([[...values, value]]);
    });

    it('UiCheckbox должен порождать событие обновления значения с обновлённым массивом значений без убранного значения при отмене checkbox', async () => {
      const values = ['1', '2', value, '3'];
      const wrapper = shallowMount(UiCheckbox, { props: { modelValue: values }, attrs: { value } });
      await wrapper.find('input').setValue(false);
      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')[0]).toEqual([['1', '2', '3']]);
    });
  });
});
