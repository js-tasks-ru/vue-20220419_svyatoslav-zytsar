const fs = require('fs');
const { join, resolve } = require('path');
const { fileURLToPath, URL } = require('url');

const { defineConfig } = require('vite');
const vue = require('@vitejs/plugin-vue');
const vueJsx = require('@vitejs/plugin-vue-jsx');

/**
 * @param {string} dirname - Path to task directory in Taskbook, ex 0-module/1-task
 * @return {string} Path to task directory depending on ENV
 */
function getTaskDir(dirname) {
  return process.env.TASK_DEV ? `${dirname}/${process.env.SOLUTION ? 'solution' : 'src'}` : dirname;
}

/**
 * @typedef Task
 * @property task {string}
 * @property module {string}
 * @property path {string}
 */

/**
 * Discovers all tasks in Taskbook
 *
 * @param {string} rootDir - Path to Taskbook root
 * @returns {Task[]} Array of tasks data
 */
function discoverTaskDirs(rootDir = __dirname) {
  const isDir = (filepath) => fs.lstatSync(filepath).isDirectory();
  const getSubDirs = (dir) => fs.readdirSync(dir).filter((name) => isDir(join(dir, name)));
  const isModuleOrTaskDir = (dirname) => /^\d+-/.test(dirname);

  return getSubDirs(rootDir)
    .filter(isModuleOrTaskDir)
    .flatMap((module) =>
      getSubDirs(join(rootDir, module))
        .filter(isModuleOrTaskDir)
        .map((task) => ({ module, task, path: getTaskDir(`${module}/${task}`) })),
    );
}

/**
 * Generates pages config for building.
 * Each page is served by index.html on /module/task.
 *
 * @param {Task[]} taskList - Array of tasks data
 * @return {Object} Pages config for vite.config.js build.rollupOptions.input
 */
function generatePagesConfig(taskList) {
  return taskList.reduce((pages, { module, task, path }) => {
    pages[`${module}/${task}`] = resolve(join(__dirname, path), 'index.html');
    return pages;
  }, {});
}

// All tasks for Taskbook's Index page
const tasks = discoverTaskDirs(__dirname);

module.exports = defineConfig({
  plugins: [vue(), vueJsx()],

  resolve: {
    alias: [
      // Migration from @vue/cli Taskbook: support for ~@ alias in css
      { find: '~@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      // Migration from @vue/cli Taskbook: support for @ alias
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      // Migration from @vue/cli Taskbook: support public assets and icons
      { find: /^\/(assets|icons)\/(.*)/, replacement: '/src/$1/$2' },
    ],
    // Migration from @vue/cli Taskbook: add .vue extension resolve
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },

  define: {
    // Inject tasks to generate index page
    'import.meta.env.TASKBOOK_TASKS': JSON.stringify(tasks),
  },

  // Taskbook doesn't actually need to be built... But why not?
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ...generatePagesConfig(tasks),
      },
    },
  },
});
