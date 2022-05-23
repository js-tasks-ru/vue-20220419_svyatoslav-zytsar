<template>
  <div class="sample container">
    <p><b>Model Value:</b> {{ date }}</p>
    <p><b>Date:</b> {{ new Date(date).toDateString() }}</p>
    <p><b>Time:</b> {{ new Date(date).toTimeString() }}</p>

    <ui-form-group label="[type=date]">
      <ui-input-date v-model="date" />
    </ui-form-group>

    <ui-form-group label="[type=time]">
      <ui-input-date v-model="date" type="time" />
    </ui-form-group>

    <ui-form-group label="[type=time][step=30]">
      <ui-input-date v-model="date" type="time" step="30" />
    </ui-form-group>

    <ui-form-group label="[type=datetime-local]">
      <ui-input-date v-model="date" type="datetime-local" />
    </ui-form-group>

    <ui-form-group label="With Icons">
      <button @click="showIcons = !showIcons">Toggle Icons</button>
      <ui-input-date v-model="date">
        <template v-if="showIcons" #left-icon>
          <ui-icon icon="search" />
        </template>
        <template v-if="showIcons" #right-icon>
          <ui-icon icon="pen-tool" />
        </template>
      </ui-input-date>
    </ui-form-group>
  </div>
</template>

<script>
import UiIcon from './components/UiIcon';
import UiInputDate from './components/UiInputDate';
import UiFormGroup from './components/UiFormGroup';

export default {
  name: 'App',

  components: { UiFormGroup, UiIcon, UiInputDate },

  data() {
    return {
      date: Date.UTC(2013, 11, 11, 14, 15, 16),
      showIcons: true,
    };
  },
};
</script>

<style>
@import '@/assets/styles/_container.css';
</style>
