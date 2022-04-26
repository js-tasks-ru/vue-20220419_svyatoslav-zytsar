# VueCalculator

Данные приложения (его состояние) — это два операнда (два числа) и текущая операция.

Все значения привязываются к элементам формы в шаблоне через `v-model`.

Выводить значение выражения требуется не в результате какого-то действия, а всегда. В приложении всегда должно быть
вычисленное значение выражения. При этом результат вычисления зависит от двух чисел операндов и от выбранного оператора.
Здесь идеально подходит вычисляемое свойство.

Для удобства можно сохранить отдельно доступные функции.

```html
<!-- 📁 index.html -->
<div class="row">
  <div class="col">
    <input type="number" v-model="a" />
  </div>

  <div class="col" style="display: flex; flex-direction: column; font-family: emoji">
    <label><input type="radio" name="operator" v-model="operator" value="sum" /> ➕</label>
    <label><input type="radio" name="operator" v-model="operator" value="subtract" /> ➖</label>
    <label><input type="radio" name="operator" v-model="operator" value="multiply" /> ✖</label>
    <label><input type="radio" name="operator" v-model="operator" value="divide" /> ➗</label>
  </div>

  <div class="col">
    <input type="number" v-model="b" />
  </div>

  <div class="col">=</div>

  <output class="col">{{ result }}</output>
</div>
```

```javascript
// 📁 script.js
const calculatorOperators = {
  sum: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b,
};

createApp({
  data() {
    return {
      a: 10,
      b: 0,
      operator: 'sum',
    };
  },

  computed: {
    result() {
      return calculatorOperators[this.operator]?.(this.a, this.b);
    },
  },
}).mount('#app');
```

Решение можно сделать более универсальным, если описать доступные операции также в данных приложения, что позволит
динамически добавлять новые операции и выводить их динамически.

```html
<!-- 📁 index.html -->
<div class="row">
  <div class="col">
    <input type="number" v-model="operands[0]" />
  </div>

  <div class="col" style="display: flex; flex-direction: column; font-family: emoji">
    <label v-for="operation in operations">
      <input type="radio" name="operator" v-model="operator" :value="operation.operator" /> {{ operation.text }}
    </label>
  </div>

  <div class="col">
    <input type="number" v-model="operands[1]" />
  </div>

  <div class="col">=</div>

  <output class="col">{{ result }}</output>
</div>
```

```javascript
// 📁 script.js
import { createApp } from './vendor/vue.esm-browser.js';

const calculatorOperators = {
  sum: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b,
};

createApp({
  data() {
    return {
      operands: [0, 0],
      operator: 'sum',
      operations: [
        {
          operator: 'sum',
          text: '➕',
        },
        {
          operator: 'subtract',
          text: '➖',
        },
        {
          operator: 'multiply',
          text: '✖',
        },
        {
          operator: 'divide',
          text: '➗',
        },
      ],
    };
  },

  computed: {
    result() {
      return calculatorOperators[this.operator]?.(...this.operands);
    },
  },
}).mount('#app');
```
