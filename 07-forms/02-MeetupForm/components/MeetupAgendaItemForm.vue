<!-- STUB: ЭТО ЗАГЛУШКА ДЛЯ РУЧНОГО ТЕСТИРОВАНИЯ -->

<template>
  <fieldset class="agenda-item-form">
    <button type="button" class="agenda-item-form__remove-button" @click="$emit('remove')">
      <ui-icon icon="trash" />
    </button>

    <div class="agenda-item-form__row">
      <div class="agenda-item-form__col">
        <ui-form-group label="Начало">
          <ui-input
            name="startsAt"
            type="time"
            placeholder="00:00"
            :model-value="agendaItem.startsAt"
            @change="
              $emit('update:agendaItem', {
                ...agendaItem,
                startsAt: $event.target.value,
              })
            "
          />
        </ui-form-group>
      </div>
      <div class="agenda-item-form__col">
        <ui-form-group label="Окончание">
          <ui-input
            name="endsAt"
            type="time"
            placeholder="00:00"
            :model-value="agendaItem.endsAt"
            @change="
              $emit('update:agendaItem', {
                ...agendaItem,
                endsAt: $event.target.value,
              })
            "
          />
        </ui-form-group>
      </div>
    </div>
  </fieldset>
</template>

<script>
import UiFormGroup from './UiFormGroup';
import UiIcon from './UiIcon';
import UiInput from './UiInput';

export default {
  name: 'MeetupAgendaItemForm',

  components: { UiInput, UiIcon, UiFormGroup },

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  emits: ['update:agendaItem', 'remove'],
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
