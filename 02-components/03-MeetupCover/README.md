# MeetupCover

Требуется добавить два входных параметра, вывести заголовок и добавить инлайн-стиль для установки изображения митапа
через пользовательское CSS свойство.

Важно не забыть, что ссылки может не быть. В этом случае стиля устанавливаться не должно (в `style` должно привязываться
ложное значение).

Можно вынести вычисление стилей в вычисляемое свойство, чтобы облегчить шаблон.

```javascript
import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'MeetupCover',

  props: {
    title: { type: String },
    image: { type: String },
  },

  template: `
    <div class="meetup-cover" :style="image && { '--bg-url': \`url('\${image}')\` }">
        <h1 class="meetup-cover__title">{{ title }}</h1>
    </div>`,
});
```
