import { defineComponent } from './vendor/vue.esm-browser.js';
import MeetupAgendaItem from './MeetupAgendaItem.js';

export default defineComponent({
  name: 'MeetupAgenda',

  components: {
    MeetupAgendaItem,
  },

  props: {
    agenda: {
      type: Array,
      default: () => [],
    },
  },

  template: `
    <ul class="agenda">
      <li
        v-for="item in agenda"
        :key="item.id"
        class="agenda__item"
      >
        <meetup-agenda-item :agenda-item="item" />
      </li>
    </ul>`,
});
