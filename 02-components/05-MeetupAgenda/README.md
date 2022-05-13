# MeetupAgenda

Компонент `MeetupAgenda` достаточно простой, требуется лишь вывести второй компонент в цикле

```javascript
// 📁 MeetupAgenda.js
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
      required: true,
    },
  },

  template: `
    <ul class="agenda">
      <li v-for="agendaItem in agenda" :key="agendaItem.id" class="agenda__item">
        <meetup-agenda-item :agenda-item="agendaItem" />
      </li>
    </ul>`,
});
```

В `MeetupAgendaItem` понадобится добавить пару вычисляемых свойств.

```javascript
// 📁 MeetupAgendaItem.js
import { defineComponent } from './vendor/vue.esm-browser.js';
import { agendaItemIcons, agendaItemDefaultTitles } from './meetupService.js';

export default defineComponent({
  name: 'MeetupAgendaItem',

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  computed: {
    title() {
      return this.agendaItem.title ?? agendaItemDefaultTitles[this.agendaItem.type];
    },

    icon() {
      return agendaItemIcons[this.agendaItem.type];
    },

    iconSrc() {
      return `/assets/icons/icon-${this.icon}.svg`;
    },
  },

  template: `
    <div class="agenda-item">
      <div class="agenda-item__col">
        <img :src="iconSrc" class="icon" :alt="icon" />
      </div>
      <div class="agenda-item__col">{{ agendaItem.startsAt }} - {{ agendaItem.endsAt }}</div>
      <div class="agenda-item__col">
        <h3 class="agenda-item__title">{{ title }}</h3>
        <p v-if="agendaItem.speaker" class="agenda-item__talk">
          <span>{{ agendaItem.speaker }}</span>
          <span class="agenda-item__dot"></span>
          <span class="agenda-item__lang">{{ agendaItem.language }}</span>
        </p>
        <p v-if="agendaItem.description">{{ agendaItem.description }}</p>
      </div>
    </div>`,
});
```
