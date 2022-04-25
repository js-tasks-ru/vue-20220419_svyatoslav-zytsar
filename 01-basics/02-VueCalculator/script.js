import { createApp } from './vendor/vue.esm-browser.js';

const OPERATIONS = {
  SUM: 'sum',
  SUBSTRACT: 'subtract',
  MULTIPLY: 'multiply',
  DIVIDE: 'divide',
};

// Создайте Vue приложение
createApp({
  data() {
    return {
      operator: '',
      firstOperand: 0,
      secondOperand: 0,
    };
  },
  computed: {
    result() {
      switch (this.operator) {
        case OPERATIONS.SUM:
          return this.firstOperand + this.secondOperand;

        case OPERATIONS.SUBSTRACT:
          return this.firstOperand - this.secondOperand;

        case OPERATIONS.MULTIPLY:
          return this.firstOperand * this.secondOperand;

        case OPERATIONS.DIVIDE:
          return this.firstOperand / this.secondOperand;

        default:
          return 0;
      }
    },
  },
}).mount('#app');
