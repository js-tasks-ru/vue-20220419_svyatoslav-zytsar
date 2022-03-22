const config = {
  modulePaths: ['utility_modules'],

  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'vue'],

  transform: {
    // process *.vue files with vue-jest
    '^.+\\.vue$': require.resolve('vue-jest'),
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': require.resolve('jest-transform-stub'),
    '^.+\\.jsx?$': require.resolve('babel-jest'),
    '^.+\\.tsx?$': require.resolve('ts-jest'),
  },
  transformIgnorePatterns: ['/node_modules/'],

  moduleNameMapper: {
    // Support the same @ -> src alias mapping in source code
    '^@/(.*)$': '<rootDir>/src/$1',
    // Use commonjs version of lodash in tests
    '^lodash-es$': 'lodash',
  },

  testEnvironment: 'jsdom',

  // Serializer for Vue snapshots
  snapshotSerializers: ['jest-serializer-vue'],

  // Add taskbook utilities
  setupFilesAfterEnv: ['<rootDir>/utility_modules/taskbook-jest-setup.js'],

  testMatch: ['**/[0-9][0-9]*/[0-9][0-9]*/**/__tests__/**/*.(spec|test|student-test).[jt]s?(x)'],
  // https://github.com/facebook/jest/issues/6766
  testURL: 'http://localhost/',
  // watchPlugins: [require.resolve('jest-watch-typeahead/filename'), require.resolve('jest-watch-typeahead/testname')],

  globals: {
    'ts-jest': {
      babelConfig: true,
    },
  },

  clearMocks: true,
};

if (process.env.TASK_MONITOR) {
  Object.assign(config, {
    testResultsProcessor: '<rootDir>/utility_modules/taskbook-test-results-processor.js',
    reporters: [],
  });
}

module.exports = config;
