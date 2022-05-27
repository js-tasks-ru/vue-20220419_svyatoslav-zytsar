<template>
  <fieldset class="agenda-item-form">
    <button type="button" class="agenda-item-form__remove-button" @click="$emit('remove')">
      <ui-icon icon="trash" />
    </button>

    <ui-form-group>
      <ui-dropdown v-model="selfModel.type" title="Тип" :options="$options.agendaItemTypeOptions" name="type" />
    </ui-form-group>

    <div class="agenda-item-form__row">
      <div class="agenda-item-form__col">
        <ui-form-group label="Начало">
          <ui-input v-model="selfModel.startsAt" type="time" placeholder="00:00" name="startsAt" />
        </ui-form-group>
      </div>
      <div class="agenda-item-form__col">
        <ui-form-group label="Окончание">
          <ui-input v-model="selfModel.endsAt" type="time" placeholder="00:00" name="endsAt" @change="getTimeDiff" />
        </ui-form-group>
      </div>
    </div>

    <ui-form-group :label="titleLabel">
      <ui-input v-model="selfModel.title" name="title" />
    </ui-form-group>
    <ui-form-group v-if="isTalk" label="Докладчик">
      <ui-input v-model="selfModel.speaker" name="speaker" />
    </ui-form-group>
    <ui-form-group v-if="isTalk || isOther" label="Описание">
      <ui-input v-model="selfModel.description" multiline name="description" />
    </ui-form-group>
    <ui-form-group v-if="isTalk" label="Язык">
      <ui-dropdown v-model="selfModel.language" title="Язык" :options="$options.talkLanguageOptions" name="language" />
    </ui-form-group>
  </fieldset>
</template>

<script>
import UiIcon from './UiIcon';
import UiFormGroup from './UiFormGroup';
import UiInput from './UiInput';
import UiDropdown from './UiDropdown';

const agendaItemTypeIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

const agendaItemDefaultTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

const agendaItemTypeOptions = Object.entries(agendaItemDefaultTitles).map(([type, title]) => ({
  value: type,
  text: title,
  icon: agendaItemTypeIcons[type],
}));

const talkLanguageOptions = [
  { value: null, text: 'Не указано' },
  { value: 'RU', text: 'RU' },
  { value: 'EN', text: 'EN' },
];

const HOURS = 24;

export default {
  name: 'MeetupAgendaItemForm',
  agendaItemTypeOptions,
  talkLanguageOptions,
  components: { UiIcon, UiFormGroup, UiInput, UiDropdown },
  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },
  emits: ['remove', 'update:agendaItem'],
  data() {
    return {
      selfModel: { ...this.agendaItem },
      diff: 0,
    };
  },
  computed: {
    isTalk() {
      return this.selfModel.type === 'talk';
    },
    isOther() {
      return this.selfModel.type === 'other';
    },
    titleLabel() {
      if (this.isTalk) return 'Тема';

      if (this.isOther) return 'Заголовок';

      return 'Нестандартный текст (необязательно)';
    },
    startsAt() {
      return this.selfModel.startsAt;
    },
    endsAt() {
      return this.selfModel.endsAt;
    },
    startsHour() {
      return this.startsAt.substring(0, 2);
    },
    endsHour() {
      return this.endsAt.substring(0, 2);
    },
    startMinutes() {
      return this.startsAt.substring(3, 5);
    },
  },
  watch: {
    selfModel: {
      deep: true,
      handler() {
        this.$emit('update:agendaItem', { ...this.selfModel });
      },
    },
    startsAt() {
      const hour = (parseInt(this.startsHour, 10) + this.diff) % HOURS;
      this.selfModel.endsAt = `${String(hour).padStart(2, 0)}:${this.startMinutes}`;
    },
  },
  created() {
    this.getTimeDiff();
  },
  methods: {
    getTimeDiff() {
      const start = parseInt(this.startsHour, 10);
      const end = parseInt(this.endsHour, 10);

      this.diff = end - start;
    },
  },
};
</script>

<style scoped>
.agenda-item-form {
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  position: relative;
  padding: 20px 10% 0 16px;
}

.agenda-item-form__remove-button {
  position: absolute;
  top: 4px;
  right: 0;
  box-shadow: none;
  border: none;
  background-color: transparent;
  outline: none;
  padding: 4px;
  cursor: pointer;
  transition: 0.2s opacity;
}

.agenda-item-form__remove-button:hover {
  opacity: 0.6;
}

.agenda-item-form__row {
  display: flex;
  flex-direction: column;
}

.agenda-item-form__col + .agenda-item-form__col {
  margin-top: 16px;
}

.agenda-item-form__col:first-child {
  margin-left: 0;
}

@media all and (min-width: 992px) {
  .agenda-item-form {
    padding: 28px 25% 4px 24px;
  }

  .agenda-item-form__remove-button {
    top: 20px;
    right: 20px;
  }

  .agenda-item-form__row {
    flex-direction: row;
    justify-content: space-between;
    margin: 0 -12px;
  }

  .agenda-item-form__col {
    flex: 1 1 auto;
    padding: 0 12px;
  }

  .agenda-item-form__col + .agenda-item-form__col {
    margin-top: 0;
  }

  .agenda-item-form__col:first-child {
    margin-left: 0;
  }
}
</style>
