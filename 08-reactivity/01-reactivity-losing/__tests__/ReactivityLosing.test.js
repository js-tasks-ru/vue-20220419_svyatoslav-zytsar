const { mount } = require('@vue/test-utils');
const { nextTick } = require('vue');
const { default: SensorsDataView } = require(global.getSolutionPath('components/SensorsDataView'));

describe('reactivity/reactivity-losing', () => {
  describe('SensorsDataView', () => {
    it('SensorsDataView должен обновляться после получения новых данных', async () => {
      jest.useFakeTimers();
      const wrapper = mount(SensorsDataView);
      jest.advanceTimersByTime(1500);
      await nextTick();
      const oldValues = wrapper.findAll('.sensor-data__value').map((element) => element.text());
      jest.advanceTimersByTime(1500);
      await nextTick();
      const values = wrapper.findAll('.sensor-data__value').map((element) => element.text());
      expect(values).not.toEqual(oldValues);
    });
  });
});
