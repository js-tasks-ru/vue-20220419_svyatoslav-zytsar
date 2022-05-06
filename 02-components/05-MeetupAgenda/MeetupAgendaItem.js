import { defineComponent } from './vendor/vue.esm-browser.js';
import { agendaItemIcons, agendaItemDefaultTitles, agendaTypes } from './meetupService.js';

export default defineComponent({
  name: 'MeetupAgendaItem',

  props: {
    agendaItem: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    type() {
      return this.agendaItem.type;
    },
    icon() {
      return `icon-${agendaItemIcons[this.type]}`;
    },
    iconSrc() {
      return `/assets/icons/${this.icon}.svg`;
    },
    time() {
      const { startsAt, endsAt } = this.agendaItem;

      return `${startsAt} - ${endsAt}`;
    },
    computedTitle() {
      const { title } = this.agendaItem;

      if (title) return title;

      return agendaItemDefaultTitles[this.type] ?? '';
    },
    isTalk() {
      return this.type === agendaTypes.TALK;
    },
  },

  template: `
    <div class="agenda-item">
      <div class="agenda-item__col">
        <img
          :src="iconSrc"
          :alt="type"
          class="icon"
        />
      </div>
      <div class="agenda-item__col">{{ time }}</div>
      <div class="agenda-item__col">
        <h3 class="agenda-item__title">
          {{ computedTitle }}
        </h3>
        <p
          v-if="isTalk"
          class="agenda-item__talk"
        >
          <span>{{ agendaItem.speaker }}</span>
          <span class="agenda-item__dot"></span>
          <span class="agenda-item__lang">{{ agendaItem.language }}</span>
        </p>
        <p>{{ agendaItem.description }}</p>
      </div>
    </div>`,
});
