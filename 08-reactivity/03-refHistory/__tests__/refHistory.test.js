const { ref, isRef } = require('vue');
const { refHistory } = require(global.getSolutionPath('utils/refHistory'));

describe('reactivity/refHistory', () => {
  describe('refHistory', () => {
    it('refHistory должен возвращать объект с history', async () => {
      const foo = ref(undefined);
      const fooHistory = refHistory(foo);
      expect(fooHistory).toBeInstanceOf(Object);
      expect(fooHistory.history).toBeDefined();
    });

    it('refHistory должен возвращать реактивный (ref) массив в history', async () => {
      const foo = ref(undefined);
      const fooHistory = refHistory(foo);
      expect(isRef(fooHistory.history)).toBeTruthy();
      expect(fooHistory.history.value).toBeInstanceOf(Array);
    });

    it('refHistory должен изначально иметь начальное значение исходного ref-а в истории', async () => {
      const INITIAL = 42;
      const foo = ref(INITIAL);
      const { history } = refHistory(foo);
      expect(history.value).toEqual([INITIAL]);
    });

    it('refHistory должен синхронно добавлять новое значение исходного ref-а в историю', async () => {
      const V0 = 42;
      const V1 = 1;
      const V2 = 2;
      const V3 = 'banana';
      const foo = ref(V0);
      const { history } = refHistory(foo);
      expect(history.value).toEqual([V0]);
      foo.value = V1;
      expect(history.value).toEqual([V0, V1]);
      foo.value = V2;
      expect(history.value).toEqual([V0, V1, V2]);
      foo.value = V3;
      expect(history.value).toEqual([V0, V1, V2, V3]);
    });

    it('refHistory должен добавлять новое значение в массив истории при изменении, а не создавать новый массив с историей', async () => {
      const foo = ref(0);
      const { history } = refHistory(foo);
      const oldHistory = history;
      foo.value += 1;
      expect(oldHistory).toBe(history);
    });
  });
});
