const { mount } = require('@vue/test-utils');
const UiInputDate = require(global.getSolutionPath('components/UiInputDate.vue')).default;

describe('wrappers/UiInputDate', () => {
  describe('UiInputDate', () => {
    let dateStrings = {
      'YYYY-MM-DD': '2020-02-01',
      'HH:MM': '23:32',
      'HH:MM:SS': '23:32:50',
      'YYYY-MM-DDTHH:MM': '2020-02-01T23:32',
      'YYYY-MM-DDTHH:MM:SS': '2020-02-01T23:32:50',
      'YYYY-MM-DDTHH:MM:SSZ': '2020-02-01T23:32:50Z',
    };
    let dates = {
      'YYYY-MM-DD': Date.parse(`${dateStrings['YYYY-MM-DD']}T00:00:00Z`),
      'HH:MM': Date.parse(`1970-01-01T${dateStrings['HH:MM']}:00Z`),
      'HH:MM:SS': Date.parse(`1970-01-01T${dateStrings['HH:MM:SS']}Z`),
      'YYYY-MM-DDTHH:MM': Date.parse(`${dateStrings['YYYY-MM-DDTHH:MM']}:00Z`),
      'YYYY-MM-DDTHH:MM:SS': Date.parse(dateStrings['YYYY-MM-DDTHH:MM:SSZ']),
      'YYYY-MM-DDTHH:MM:SSZ': Date.parse(dateStrings['YYYY-MM-DDTHH:MM:SSZ']),
    };

    it.each(['date', 'time', 'datetime-local'])('UiInputDate должен рендерить UiInput[type=%s]', (type) => {
      const wrapper = mount(UiInputDate, { props: { type } });
      expect(wrapper.get('input').attributes('type')).toBe(type);
    });

    it('UiInputDate должен передавать атрибуты на input', () => {
      const attrs = { name: 'Name', 'data-test': 'test' };
      const wrapper = mount(UiInputDate, { attrs });
      expect(wrapper.get('input').attributes()).toMatchObject(attrs);
    });

    it('UiInputDate[type=date] должен выводить input с пустым значением при отсутствии значения модели', async () => {
      const wrapper = mount(UiInputDate);
      expect(wrapper.get('input').element.value).toBe('');
    });

    it('UiInputDate[type=date] должен выводить input с пустым значением при null значения модели', async () => {
      const wrapper = mount(UiInputDate);
      await wrapper.setProps({ modelValue: null });
      expect(wrapper.get('input').element.value).toBe('');
    });

    it('UiInputDate[type=date] должен выводить input со значением модели в формате yyyy-mm-dd', async () => {
      const wrapper = mount(UiInputDate, { props: { type: 'date' } });
      await wrapper.setProps({ modelValue: dates['YYYY-MM-DD'] });
      expect(wrapper.get('input').element.value).toBe(dateStrings['YYYY-MM-DD']);
    });

    it('UiInputDate[type=time] должен выводить input со значением модели в формате hh:mm', async () => {
      const wrapper = mount(UiInputDate, { props: { type: 'time' } });
      await wrapper.setProps({ modelValue: dates['HH:MM'] });
      expect(wrapper.get('input').element.value).toBe(dateStrings['HH:MM']);
    });

    it('UiInputDate[type=time] должен выводить input со значением модели в формате hh:mm, если атрибут step кратен 60', async () => {
      const wrapper = mount(UiInputDate, { props: { type: 'time' }, attrs: { step: 120 } });
      await wrapper.setProps({ modelValue: dates['HH:MM'] });
      expect(wrapper.get('input').element.value).toBe(dateStrings['HH:MM']);
    });

    it('UiInputDate[type=datetime-local] должен выводить input со значением модели в формате yyyy-mm-ddThh:mm', async () => {
      const wrapper = mount(UiInputDate, {
        props: { type: 'datetime-local' },
      });
      await wrapper.setProps({ modelValue: dates['YYYY-MM-DDTHH:MM'] });
      expect(wrapper.get('input').element.value).toBe(dateStrings['YYYY-MM-DDTHH:MM']);
    });

    it('UiInputDate[type=date] должен порождать событие обновления модели с новым значением при выборе даты', async () => {
      const wrapper = mount(UiInputDate, { props: { type: 'date' } });
      await wrapper.setProps({ modelValue: 0 });
      wrapper.get('input').element.value = dateStrings['YYYY-MM-DD'];
      wrapper.get('input').element.valueAsDate = new Date(dates['YYYY-MM-DD']);
      wrapper.get('input').element.valueAsNumber = dates['YYYY-MM-DD'];
      await wrapper.get('input').trigger('input');
      await wrapper.get('input').trigger('change');
      expect(wrapper.emitted('update:modelValue')).toBeDefined();
      expect(wrapper.emitted('update:modelValue')[0]).toEqual([dates['YYYY-MM-DD']]);
    });

    it('UiInputDate[type=time] должен порождать событие обновления модели с новым значением при выборе даты', async () => {
      const wrapper = mount(UiInputDate, { props: { type: 'time' } });
      await wrapper.setProps({ modelValue: 0 });
      wrapper.get('input').element.value = dateStrings['HH:MM'];
      wrapper.get('input').element.valueAsNumber = dates['HH:MM'];
      await wrapper.get('input').trigger('input');
      await wrapper.get('input').trigger('change');
      expect(wrapper.emitted('update:modelValue')).toBeDefined();
      expect(wrapper.emitted('update:modelValue')[0]).toEqual([dates['HH:MM']]);
    });

    it('UiInputDate[type=datetime-local] должен порождать change с новым значением при выборе даты', async () => {
      const wrapper = mount(UiInputDate, { props: { type: 'datetime-local' } });
      await wrapper.setProps({ modelValue: 0 });
      wrapper.get('input').element.value = dateStrings['YYYY-MM-DDTHH:MM'];
      wrapper.get('input').element.valueAsNumber = dates['YYYY-MM-DDTHH:MM'];
      await wrapper.get('input').trigger('input');
      await wrapper.get('input').trigger('change');
      expect(wrapper.emitted('update:modelValue')).toBeDefined();
      expect(wrapper.emitted('update:modelValue')[0]).toEqual([dates['YYYY-MM-DDTHH:MM']]);
    });

    it('UiInputDate должен выводить левую иконку в UiInput через слот left-icon', async () => {
      const wrapper = mount(UiInputDate, {
        slots: { 'left-icon': '<img class="icon icon-search" />' },
      });
      expect(wrapper.find('.input-group__icon > img.icon-search').exists()).toBeTruthy();
    });
  });
});
