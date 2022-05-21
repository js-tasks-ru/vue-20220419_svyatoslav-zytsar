<template>
  <div class="sample container">
    <button type="button" @click="$refs['firstInput'].focus()">Focus first input</button>
    <button type="button" @click="$refs['firstInput'].$refs['input'].focus()">Focus first input 2</button>

    <ui-form-group>
      <ui-input ref="firstInput" v-model="value" />
    </ui-form-group>

    <ui-form-group label="Small">
      <ui-input v-model="value" small />
    </ui-form-group>

    <ui-form-group label="Rounded">
      <ui-input v-model="value" rounded />
    </ui-form-group>

    <ui-form-group label="Password">
      <ui-input v-model="value" type="password" />
    </ui-form-group>

    <ui-form-group label="Textarea">
      <ui-input v-model="value" multiline />
    </ui-form-group>

    <ui-form-group label="With Lazy">
      <ui-input v-model.lazy="value" />
    </ui-form-group>

    <ui-form-group>
      <label>
        <input v-model="showIcons" type="checkbox" />
        Toggle Icons
      </label>
    </ui-form-group>

    <ui-form-group label="With Icons">
      <ui-input v-model="value">
        <template v-if="showIcons" #left-icon>
          <ui-icon icon="search" />
        </template>

        <template v-if="showIcons" #right-icon>
          <ui-icon icon="check" />
        </template>
      </ui-input>
    </ui-form-group>
  </div>
</template>

<script>
import UiInput from './components/UiInput';
import UiIcon from './components/UiIcon';
import UiFormGroup from './components/UiFormGroup';

export default {
  name: 'App',

  components: { UiFormGroup, UiIcon, UiInput },

  data() {
    return {
      value: 'value',
      showIcons: true,
      focused: false,
    };
  },
};
</script>

<style>
@import '@/assets/styles/_container.css';
</style>
