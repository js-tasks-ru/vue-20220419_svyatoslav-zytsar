<template>
  <form class="meetup-form" @submit.prevent="handleSubmit">
    <div class="meetup-form__content">
      <fieldset class="meetup-form__section">
        <ui-form-group label="Название">
          <ui-input v-model="localMeetup.title" name="title" />
        </ui-form-group>
        <ui-form-group label="Дата">
          <ui-input-date v-model="localMeetup.date" type="date" name="date" />
        </ui-form-group>
        <ui-form-group label="Место">
          <ui-input v-model="localMeetup.place" name="place" />
        </ui-form-group>
        <ui-form-group label="Описание">
          <ui-input v-model="localMeetup.description" multiline rows="3" name="description" />
        </ui-form-group>
        <ui-form-group label="Изображение">
          <ui-image-uploader
            name="image"
            :preview="localMeetup.image"
            @select="localMeetup.imageToUpload = $event"
            @remove="localMeetup.imageToUpload = null"
          />
        </ui-form-group>
      </fieldset>

      <h3 class="meetup-form__agenda-title">Программа</h3>
      <meetup-agenda-item-form
        v-for="(agendaItem, index) in localMeetup.agenda"
        :key="agendaItem.id"
        v-model:agenda-item="localMeetup.agenda[index]"
        class="meetup-form__agenda-item"
        @remove="removeAgendaItem(index)"
      />

      <div class="meetup-form__append">
        <button class="meetup-form__append-button" type="button" data-test="addAgendaItem" @click="addAgendaItem">
          + Добавить этап программы
        </button>
      </div>
    </div>

    <div class="meetup-form__aside">
      <div class="meetup-form__aside-stick">
        <!-- data-test атрибуты используются для поиска нужного элемента в тестах, не удаляйте их -->
        <ui-button
          class="meetup-form__aside-button"
          block
          data-test="cancel"
          variant="secondary"
          @click="$emit('cancel')"
          >Отмена</ui-button
        >
        <ui-button variant="primary" block class="meetup-form__aside-button" type="submit" data-test="submit">{{
          submitText
        }}</ui-button>
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

  emits: ['submit', 'cancel'],

  data() {
    return {
      localMeetup: cloneDeep(this.meetup),
    };
  },

  methods: {
    addAgendaItem() {
      const newItem = createAgendaItem();
      if (this.localMeetup.agenda.length) {
        newItem.startsAt = this.localMeetup.agenda[this.localMeetup.agenda.length - 1].endsAt;
      }
      this.localMeetup.agenda.push(newItem);
    },

    removeAgendaItem(index) {
      this.localMeetup.agenda.splice(index, 1);
    },

    handleSubmit() {
      this.$emit('submit', cloneDeep(this.localMeetup));
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
