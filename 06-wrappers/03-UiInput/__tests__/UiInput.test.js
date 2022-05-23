import { shallowMount } from '@vue/test-utils';
const UiInput = require(global.getSolutionPath('components/UiInput.vue')).default;

const findInput = (wrapper) => wrapper.find('input,textarea');

describe('wrappers/UiInput', () => {
  describe('UiInput', () => {
    it('UiInput должен рендерить поле ввода с классом form-control внутри блока input-group', () => {
      const wrapper = shallowMount(UiInput);
      expect(wrapper.find('.input-group').exists()).toBeTruthy();
      expect(wrapper.find('.input-group input.form-control').exists()).toBeTruthy();
    });

    it('UiInput не должен иметь класс form-control_sm без параметра small', async () => {
      const wrapper = shallowMount(UiInput);
      expect(findInput(wrapper).classes('form-control_sm')).toBeFalsy();
    });

    it('UiInput должен иметь класс form-control_sm с параметром small', async () => {
      const wrapper = shallowMount(UiInput, { props: { small: true } });
      expect(findInput(wrapper).classes('form-control_sm')).toBeTruthy();
    });

    it('UiInput не должен иметь класс form-control_rounded без параметра rounded', async () => {
      const wrapper = shallowMount(UiInput);
      expect(findInput(wrapper).classes('form-control_rounded')).toBeFalsy();
    });

    it('UiInput должен иметь класс form-control_rounded с параметром rounded', async () => {
      const wrapper = shallowMount(UiInput, { props: { rounded: true } });
      expect(findInput(wrapper).classes('form-control_rounded')).toBeTruthy();
    });

    it('UiInput без параметра multiline должен рендерить обычное поле ввода', () => {
      const wrapper = shallowMount(UiInput);
      expect(findInput(wrapper).exists()).toBeTruthy();
      expect(findInput(wrapper).element.tagName).toBe('INPUT');
    });

    it('UiInput с параметром multiline должен рендерить многострочное поле ввода', () => {
      const wrapper = shallowMount(UiInput, {
        props: { multiline: true },
      });
      expect(findInput(wrapper).exists()).toBeTruthy();
      expect(findInput(wrapper).element.tagName).toBe('TEXTAREA');
    });

    it('UiInput должен передавать атрибуты на поле ввода и не дублировать их на корневом элементе', () => {
      const attrs = {
        id: 'id',
        type: 'email',
        placeholder: 'demo@email',
        maxlength: '100',
      };
      const wrapper = shallowMount(UiInput, { attrs });
      expect(wrapper.attributes()).not.toMatchObject(attrs);
      expect(findInput(wrapper).attributes()).toMatchObject(attrs);
    });

    it.each([false, true])('UiInput должен выводить текущее значение модели (multiline=%s)', async (multiline) => {
      const modelValue = 'Sample Test Text';
      const wrapper = shallowMount(UiInput, { props: { multiline } });
      await wrapper.setProps({ modelValue });
      expect(findInput(wrapper).element.value).toBe(modelValue);
    });

    it('UiInput должен обновлять значение модели при вводе', async () => {
      const modelValue = 'SampleText';
      const wrapper = shallowMount(UiInput);
      const formControl = findInput(wrapper);
      formControl.element.value = modelValue;
      await formControl.trigger('input');
      expect(wrapper.emitted('update:modelValue')).toBeDefined();
      expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
      expect(wrapper.emitted('update:modelValue')[0]).toEqual([modelValue]);
    });

    it('UiInput должен выводить блоки для иконок и иметь классы input-group_icon input-group_icon-left input-group_icon-right', async () => {
      const wrapper = shallowMount(UiInput);
      expect(wrapper.classes()).not.toContain(['input-group_icon', 'input-group_icon-left', 'input-group_icon-right']);
      expect(wrapper.find('.input-group__icon').exists()).toBeFalsy();
    });

    it('UiInput должен выводить левую иконку и добавлять классы input-group_icon input-group_icon-left', async () => {
      const iconSlot = '<img class="icon icon-search">';
      const wrapper = shallowMount(UiInput, {
        slots: { 'left-icon': iconSlot },
      });
      expect(wrapper.find('.input-group').classes().slice().sort()).toMatchObject([
        'input-group',
        'input-group_icon',
        'input-group_icon-left',
      ]);
      expect(wrapper.find('.input-group__icon').exists()).toBeTruthy();
      expect(wrapper.find('.input-group__icon').html()).toContain(iconSlot);
    });

    it('UiInput должен выводить правую иконку и добавлять классы input-group_icon input-group_icon-right', async () => {
      const iconSlot = '<img class="icon icon-trash">';
      const wrapper = shallowMount(UiInput, {
        slots: { 'right-icon': iconSlot },
      });
      expect(wrapper.classes().slice().sort()).toMatchObject([
        'input-group',
        'input-group_icon',
        'input-group_icon-right',
      ]);
      expect(wrapper.find('.input-group__icon').exists()).toBeTruthy();
      expect(wrapper.find('.input-group__icon').html()).toContain(iconSlot);
    });

    it('UiInput должен устанавливать ref="input" на поле ввода', async () => {
      const wrapper = shallowMount(UiInput);
      const input = wrapper.find('input').element;
      expect(wrapper.vm.$refs['input']).toBe(input);
    });

    it('UiInput должен устанавливать фокус на поле ввода методом focus', async () => {
      const wrapper = shallowMount(UiInput, { attachTo: document.body });
      wrapper.vm.focus();
      expect(findInput(wrapper).element === document.activeElement).toBeTruthy();
    });

    describe('Дополнительная часть - модификатор lazy', () => {
      it('UiInput не должен обновлять значение модели в процессе ввода с модификатором lazy', async () => {
        const modelValue = 'SampleText';
        const wrapper = shallowMount(UiInput, { props: { modelModifiers: { lazy: true } } });
        const formControl = findInput(wrapper);
        formControl.element.value = modelValue;
        await formControl.trigger('input');
        expect(wrapper.emitted('update:modelValue')).not.toBeDefined();
      });

      it('UiInput должен обновлять значение модели после изменения в поле ввода с модификатором lazy', async () => {
        const modelValue = 'SampleText';
        const wrapper = shallowMount(UiInput, { props: { modelModifiers: { lazy: true } } });
        const formControl = findInput(wrapper);
        await formControl.setValue(modelValue);
        expect(wrapper.emitted('update:modelValue')).toBeDefined();
        expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
        expect(wrapper.emitted('update:modelValue')[0]).toEqual([modelValue]);
      });
    });
  });
});
