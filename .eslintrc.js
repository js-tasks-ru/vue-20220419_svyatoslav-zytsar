const taskbookDevelopmentRules = {
  // Vue / Priority C: Recommended
  'vue/attributes-order': 'error',
  'vue/order-in-components': 'error',
  'vue/new-line-between-multi-line-property': 'error',
  // Vue / Uncategorized
  'vue/match-component-file-name': 'error',
  'vue/no-duplicate-attr-inheritance': 'error',
  'vue/no-useless-v-bind': 'error',
  'vue/padding-line-between-blocks': 'error',
  'vue/component-name-in-template-casing': ['error', 'PascalCase']
};

module.exports = {
  root: true,

  ignorePatterns: ['**/vendor/*.js'],

  env: {
    browser: true,
    es2022: true,
    'vue/setup-compiler-macros': true,
  },

  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'prettier',
    'plugin:@typescript-eslint/eslint-recommended',
  ],

  parser: 'vue-eslint-parser',

  parserOptions: {
    parser: {
      js: 'espree',
      jsx: 'espree',
      ts: '@typescript-eslint/parser',
      tsx: '@typescript-eslint/parser',
    },
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2022,
  },

  rules: {
    // Basic
    'no-unused-vars': 'off', // For task start code
    '@typescript-eslint/no-unused-vars': 'off', // For task start code
    '@typescript-eslint/no-empty-function': 'off', // For task start code
    'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
    'no-debugger': 'warn',
    'no-var': 'error',
    // Vue / Priority A: Essential Essential
    'vue/no-unused-components': 'off', // For task start code
    'vue/require-v-for-key': 'warn', // Unknown error in the beginning
    'vue/valid-template-root': 'off', // For task start code
    // Vue / Priority B: Strongly Recommended
    'vue/v-bind-style': 'error',
    'vue/v-on-style': 'error',
    'vue/v-slot-style': 'error',
    'vue/require-explicit-emits': 'warn',
    'vue/mustache-interpolation-spacing': 'warn',
    'vue/no-template-shadow': 'warn',
    // Vue / Priority C: Recommended
    'vue/this-in-template': 'error',
    // Vue / Uncategorized
    'vue/no-duplicate-attr-inheritance': 'error',
    'vue/v-for-delimiter-style': 'error',

    ...process.env.TASK_DEV ? taskbookDevelopmentRules : {},
  },

  overrides: [
    {
      files: ['**/__tests__/*.js?(x)'],
      env: {
        jest: true,
        node: true,
      },
    },
    {
      files: ['./*.js', 'utility_modules/*.js'],
      env: {
        node: true,
      },
    },
  ],
};
