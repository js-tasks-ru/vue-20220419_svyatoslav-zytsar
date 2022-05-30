<template>
  <div class="sample container">
    <p>foo = <input v-model="foo.value" type="number" /></p>
    <p>bar = {{ bar }}</p>
    <p>sqr(foo) = {{ computedSqrFoo.value }}</p>
    <p>sum(foo, bar) = {{ computedSumFooBar.value }}</p>
    <p>minutesToHHMM(foo) = {{ computedMinutesToHHMMFoo.value }}</p>
    <p>minutesToHHMM(sqr(foo)) = {{ computedMinutesToHHMMSqrFoo.value }}</p>
    <p></p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { reactify } from './utils/reactify';

export default {
  name: 'App',

  created() {
    // Здесь лучше использовать Composition API, но мы с ним пока не знакомы
    // Для примера и ручного тестирования подойдёт и такое нетипичное решение

    // Исходные обычные чистые функции
    const sum = (a, b) => a + b;
    const sqr = (num) => num ** 2;
    const minutesToHHMM = (minutes) =>
      `${Math.floor(minutes / 60)
        .toString()
        .padStart(2, '0')}:${(minutes % 60).toString().padStart(2, '0')}`;

    // Реактивные версии исходных функций
    const reactiveSqr = reactify(sqr);
    const reactiveSum = reactify(sum);
    const reactiveMinutesToHHMM = reactify(minutesToHHMM);

    // Значения для тестрования
    this.foo = ref(0);
    this.bar = 10;

    // Вычисляемые свойства в результате использования реактивных функций
    this.computedSqrFoo = reactiveSqr(this.foo);
    this.computedSumFooBar = reactiveSum(this.foo, this.bar);
    this.computedMinutesToHHMMFoo = reactiveMinutesToHHMM(this.foo);
    this.computedMinutesToHHMMSqrFoo = reactiveMinutesToHHMM(this.computedSqrFoo);
    // this.computedStringLength = reactiveSum(a, b);
  },
};
</script>

<style></style>
