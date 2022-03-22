const fs = require('fs');
const path = require('path');

/**
 * @param {string} dirname - path to task directory, ex 0-module/1-task
 * @return {string} path to real task directory depending on ENV
 */
function getTaskDir(dirname) {
  return process.env.TASK_DEV ? path.join(dirname, 'src') : dirname;
}

/**
 * @param dirname - path to task directory (for ex. 0-module/1-task)
 * @param filename
 * @return {string} - path to file in task directory depending on ENV
 */
function getTaskFile(dirname, filename) {
  return path.join(getTaskDir(dirname), filename);
}

/**
 * Discovers all tasks in taskbook required vue-serve for development.
 *
 * @param {string} rootDir - path to taskbook root
 * @return {Object<task,module>[]} - array of objects with module and task numbers
 */
function discoverVueServeTasksDirs(rootDir = __dirname) {
  const isDir = (filepath) => fs.lstatSync(filepath).isDirectory();
  const getSubDirs = (dir) => fs.readdirSync(dir).filter((name) => isDir(path.join(dir, name)));
  const isModuleOrTaskDir = (dirname) => /^\d+-/.test(dirname);
  const isVueTaskDir = (dir) => fs.existsSync(getTaskFile(dir, 'App.vue'));

  return getSubDirs(rootDir)
    .filter(isModuleOrTaskDir)
    .map((dirname) => ({
      dirname,
      path: path.join(rootDir, dirname),
    }))
    .flatMap((moduleDir) =>
      getSubDirs(moduleDir.path)
        .filter(isModuleOrTaskDir)
        .map((dirname) => ({
          dirname,
          path: path.join(moduleDir.path, dirname),
        }))
        .filter(({ path }) => isVueTaskDir(path))
        .map((taskDir) => ({
          module: moduleDir.dirname,
          task: taskDir.dirname,
        })),
    );
}

/**
 * Generates pages config for vue-cli-service depends on task.
 * Each page serves main.js on path /module-task.
 *
 * @param taskList - array of objects with module and task numbers
 * @return {Object} pages config for vue.config.js
 */
function generatePagesConfig(taskList) {
  return taskList.reduce((pages, { module, task }) => {
    pages[`${module}/${task}`] = {
      template: './src/index.html',
      entry: getTaskFile(`./${module}/${task}`, 'main.js'),
      title: task,
    };
    return pages;
  }, {});
}

const tasks = discoverVueServeTasksDirs(__dirname);
const taskPages = generatePagesConfig(tasks);

module.exports = {
  pages: {
    index: {
      template: 'src/root.html',
      entry: 'src/root.ts',
    },
    ...taskPages,
  },
  chainWebpack: (config) => {
    config.plugin('define').tap((args) => {
      args[0]['process.env.TASKBOOK_TASKS'] = JSON.stringify(tasks);
      return args;
    });
  },
};
