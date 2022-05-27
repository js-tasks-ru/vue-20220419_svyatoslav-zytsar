<template>
  <form class="meetup-form" @submit.prevent="onSubmit">
    <div class="meetup-form__content">
      <fieldset class="meetup-form__section">
        <ui-form-group label="Название">
          <ui-input v-model="selfModel.title" name="title" />
        </ui-form-group>
        <ui-form-group label="Дата">
          <ui-input-date v-model="selfModel.date" type="date" name="date" />
        </ui-form-group>
        <ui-form-group label="Место">
          <ui-input v-model="selfModel.place" name="place" />
        </ui-form-group>
        <ui-form-group label="Описание">
          <ui-input v-model="selfModel.description" multiline rows="3" name="description" />
        </ui-form-group>
        <ui-form-group label="Изображение">
          <!--
               Предлагается сохранять файл для будущей загрузки во временное поле imageToUpload
               и передавать в объекте со всеми данными формы
          -->
          <ui-image-uploader
            name="image"
            :preview="meetup.image"
            @select="selfModel.imageToUpload = $event"
            @remove="selfModel.imageToUpload = null"
          />
        </ui-form-group>
      </fieldset>

      <h3 class="meetup-form__agenda-title">Программа</h3>

      <meetup-agenda-item-form
        v-for="(agendaItem, idx) in selfModel.agenda"
        :key="agendaItem.id"
        :agenda-item="agendaItem"
        class="meetup-form__agenda-item"
        @update:agendaItem="onUpdateAgendaItem(idx, $event)"
        @remove="onRemoveAgendaItem(idx)"
      />

      <div class="meetup-form__append">
        <button class="meetup-form__append-button" type="button" data-test="addAgendaItem" @click="onAddAgenda">
          + Добавить этап программы
        </button>
      </div>
    </div>

    <div class="meetup-form__aside">
      <div class="meetup-form__aside-stick">
        <!-- data-test атрибуты используются для поиска нужного элемента в тестах, не удаляйте их -->
        <ui-button variant="secondary" block class="meetup-form__aside-button" data-test="cancel" @click="onCancel"
          >Отмена</ui-button
        >
        <ui-button variant="primary" block class="meetup-form__aside-button" data-test="submit" type="submit">
          {{ submitText }}
        </ui-button>
      </div>
    </div>
  </form>
</template>

<script>
import { cloneDeep } from 'lodash-es';

import MeetupAgendaItemForm from './MeetupAgendaItemForm';
import UiButton from './UiButton';
import UiFormGroup from './UiFormGroup';
import UiImageUploader from './UiImageUploader';
import UiInput from './UiInput';
import UiInputDate from './UiInputDate';
import { createAgendaItem } from '../meetupService';

export default {
  name: 'MeetupForm',
  components: {
    MeetupAgendaItemForm,
    UiButton,
    UiFormGroup,
    UiImageUploader,
    UiInput,
    UiInputDate,
  },
  props: {
    meetup: {
      type: Object,
      required: true,
    },
    submitText: {
      type: String,
      default: '',
    },
  },
  emits: ['cancel', 'submit'],
  data() {
    return {
      selfModel: cloneDeep(this.meetup),
    };
  },
  methods: {
    onCancel() {
      this.$emit('cancel');
    },
    onSubmit() {
      this.$emit('submit', cloneDeep(this.selfModel));
    },
    onAddAgenda() {
      const [lastAgenda] = this.selfModel.agenda.slice(this.selfModel.agenda.length - 1);
      const lastAgendaEndTime = lastAgenda ? lastAgenda.endsAt : undefined;

      this.selfModel.agenda.push(createAgendaItem(lastAgendaEndTime));
    },
    onUpdateAgendaItem(idx, value) {
      this.selfModel.agenda.splice(idx, 1, value);
    },
    onRemoveAgendaItem(idx) {
      this.selfModel.agenda.splice(idx, 1);
    },
  },
};
</script>

<style scoped>
.meetup-form__section {
  border: none;
}

.meetup-form__agenda-title {
  font-weight: 700;
  font-size: 28px;
  line-height: 150%;
  color: var(--body-color);
  margin: 0 0 24px 0;
}

.meetup-form__aside {
  margin: 48px 0;
}

.meetup-form__aside-button {
  margin: 0 0 12px 0;
}

.meetup-form__agenda-item + .meetup-form__agenda-item {
  margin-top: 24px;
}

.meetup-form__append {
  margin-top: 24px;
}

.meetup-form__append-button {
  box-shadow: none;
  border: none;
  background-color: transparent;
  padding: 0;
  outline: none;
  color: var(--blue);
  cursor: pointer;
  font-size: 20px;
  line-height: 28px;
}

.meetup-form__append-button:hover {
  text-decoration: underline;
}

@media all and (min-width: 992px) {
  .meetup-form {
    display: flex;
    flex-direction: row;
  }

  .meetup-form__content {
    flex: 1 0 calc(100% - 320px);
  }

  .meetup-form__aside {
    flex: 1 0 320px;
    max-width: 320px;
    width: 100%;
    padding-left: 137px;
    margin: 0;
  }

  .meetup-form__aside-stick {
    position: sticky;
    top: 32px;
  }
}
</style>
