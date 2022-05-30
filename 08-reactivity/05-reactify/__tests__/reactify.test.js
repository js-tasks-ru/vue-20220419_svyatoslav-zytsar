const { ref, isRef, nextTick } = require('vue');
const { reactify } = require(global.getSolutionPath('utils/reactify'));

describe('reactivity/reactify', () => {
  describe('reactify', () => {
    it('reactify должен возвращать функцию, которая возвращает computed', async () => {
      const sum = (a, b) => a + b;
      const reactiveSum = reactify(sum);
      expect(reactiveSum).toBeInstanceOf(Function);
      const isComputed = (value) => isRef(value) && !!value.effect;
      expect(isComputed(reactiveSum())).toBeTruthy();
    });

    it('reactify должен создавать реактивную функцию для вычисления квадрата числа', async () => {
      const sqr = (a) => a ** 2;
      const reactiveSqr = reactify(sqr);
      const a = ref(0);
      const sqrA = reactiveSqr(a);
      a.value = 10;
      await nextTick();
      expect(sqrA.value).toBe(sqr(a.value));
    });

    it('reactify должен создавать реактивную функцию для вычисления суммы двух чисел', async () => {
      const sum = (a, b) => a + b;
      const reactiveSum = reactify(sum);
      const a = ref(0);
      const b = ref(0);
      const sumAB = reactiveSum(a, b);
      a.value = 1;
      b.value = 2;
      await nextTick();
      expect(sumAB.value).toBe(sum(a.value, b.value));
    });

    it('reactify должен создавать реактивную функцию для вычисления суммы всех аргументов', async () => {
      const sum = (...arr) => arr.reduce((acc, val) => acc + val, 0);
      const reactiveSum = reactify(sum);
      const arr = Array.from(Array(100), () => ref(0));
      const sumArr = reactiveSum(...arr);
      arr.forEach((item, index) => (item.value = index * 10));
      await nextTick();
      expect(sumArr.value).toBe(sum(...arr.map((item) => item.value)));
    });

    it('reactify должен создавать реактивную функцию для вычисления суммы двух чисел, где только одно число реактивное', async () => {
      const sum = (a, b) => a + b;
      const reactiveSum = reactify(sum);
      const a = ref(0);
      const b = 2;
      const sumAB = reactiveSum(a, b);
      a.value = 1;
      await nextTick();
      expect(sumAB.value).toBe(sum(a.value, b));
    });
  });
});
