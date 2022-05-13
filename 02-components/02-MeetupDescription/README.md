# MeetupDescription

Требуется добавить один входной параметр и выводить его значение в содержимом `.meetup-description` через текстовую
интерполяцию.

```javascript
import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'MeetupDescription',
  props: {
    description: {
      type: String,
    },
  },

  template: `<p class="meetup-description">{{ description }}</p>`,
});
```
