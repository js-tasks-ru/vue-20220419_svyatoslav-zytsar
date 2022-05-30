const { ref, isRef, nextTick } = require('vue');
const { debouncedRef } = require(global.getSolutionPath('utils/debouncedRef'));
const debounce = require('lodash/debounce');

jest.mock('lodash/debounce');

debounce.mockImplementation((callback, timeout) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => callback(...args), timeout);
  };
});

describe('reactivity/debouncedRef', () => {
  describe('debouncedRef', () => {
    it('debouncedRef должен возвращать Ref со значением оригинального ref-а', async () => {
      const VALUE = 42;
      const foo = ref(VALUE);
      const debouncedFoo = debouncedRef(foo, 100);
      expect(isRef(debouncedFoo)).toBeTruthy();
      expect(debouncedFoo.value).toBe(VALUE);
    });

    it('debouncedRef должен обновлять возвращённый ref при изменении оригинального значения в соответствии с debounce', async () => {
      jest.useFakeTimers();
      const INITIAL = 42;
      const foo = ref(INITIAL);
      const debouncedFoo = debouncedRef(foo, 100);

      foo.value += 1;
      await nextTick();
      expect(debouncedFoo.value).toBe(INITIAL);

      await nextTick();
      jest.advanceTimersByTime(60);
      expect(debouncedFoo.value).toBe(INITIAL); // Just 60ms

      foo.value += 1; // Restart timer
      await nextTick();
      jest.advanceTimersByTime(60); // Just 60ms
      expect(debouncedFoo.value).toBe(INITIAL);

      await nextTick();
      jest.advanceTimersByTime(60); // already 120ms > 100
      expect(debouncedFoo.value).toBe(foo.value);
    });
  });
});
