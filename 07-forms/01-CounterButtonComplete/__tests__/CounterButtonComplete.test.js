const CounterButton = require(global.getSolutionPath('components/CounterButton.vue')).default;
import { shallowMount } from '@vue/test-utils';

describe('forms/CounterButtonComplete', () => {
  describe('CounterButton', () => {
    it('CounterButton должен рендерить кнопку с текстом count', () => {
      const COUNT = 42;
      const wrapper = shallowMount(CounterButton, { props: { count: COUNT } });
      expect(wrapper.find('button').exists()).toBe(true);
      expect(wrapper.text()).toBe(COUNT.toString());
    });

    it('CounterButton должен рендерить кнопку с текстом 0 по умолчанию', () => {
      const wrapper = shallowMount(CounterButton);
      expect(wrapper.text()).toBe('0');
    });

    it('CounterButton должен порождать событие update:count с увеличенным на 1 значением по клику на кнопку', async () => {
      const COUNT = 1;
      const wrapper = shallowMount(CounterButton, {
        props: { count: COUNT },
      });
      const button = wrapper.get('button');

      await button.trigger('click');

      expect(wrapper.emitted('update:count')).toBeTruthy();
      expect(wrapper.emitted('update:count').length).toBe(1);
      expect(wrapper.emitted('update:count')[0]).toEqual([COUNT + 1]);
    });

    it('CounterButton должен обновлять текст на кнопке при обновлении входного параметра', async () => {
      const INITIAL_COUNT = 1;
      const NEW_COUNT = 100;
      const wrapper = shallowMount(CounterButton, { props: { count: INITIAL_COUNT } });
      await wrapper.setProps({ count: NEW_COUNT });
      expect(wrapper.text()).toBe(NEW_COUNT.toString());
    });

    it('CounterButton должен увеличивать значение счётчика три раза увеличиться после трёх кликов без участия родительского компонента', async () => {
      const wrapper = shallowMount(CounterButton);
      const button = wrapper.get('button');
      await button.trigger('click');
      await button.trigger('click');
      await button.trigger('click');
      expect(wrapper.text()).toBe('3');
      expect(wrapper.emitted('update:count')).toBeTruthy();
      expect(wrapper.emitted('update:count').length).toBe(3);
      expect(wrapper.emitted('update:count')).toEqual([[1], [2], [3]]);
    });

    it('CounterButton должен выводить новое значение счётчика при обновления параметра count, несмотря на свои обновления', async () => {
      const wrapper = shallowMount(CounterButton, { props: { count: 2 } });
      const button = wrapper.get('button');
      await button.trigger('click');
      await button.trigger('click');
      await button.trigger('click');
      await wrapper.setProps({ count: 1 });
      expect(wrapper.text()).toBe('1');
    });
  });
});
