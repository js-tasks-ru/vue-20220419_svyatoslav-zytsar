<template>
  <div class="wrapper bg-grey">
    <main class="main container">
      <h1 style="margin: 1rem 0">Задачи c @Vue/CLI</h1>
      <nav style="font-size: 20px">
        <div v-for="(tasks, module) in taskTree" :key="module">
          <p>
            <span class="agenda__dot" />
            <b>{{ module }}</b>
          </p>
          <ul style="list-style-type: circle; margin-left: 2rem; color: var(--blue)">
            <li v-for="unit in tasks" :key="unit.task">
              <a :href="`/${unit.module}/${unit.task}`" class="link">{{ unit.task }}</a>
            </li>
          </ul>
        </div>
      </nav>
    </main>
  </div>
</template>

<script>
export default {
  computed: {
    taskTree() {
      return process.env.TASKBOOK_TASKS.reduce((result, unit) => {
        if (!result[unit.module]) {
          result[unit.module] = [];
        }
        result[unit.module].push(unit);
        return result;
      }, {});
    },
  },
};
</script>

<style>
@import url('~@/assets/styles/index.css');
</style>
