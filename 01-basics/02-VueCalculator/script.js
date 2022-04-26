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
