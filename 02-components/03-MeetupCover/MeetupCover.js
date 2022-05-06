import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'MeetupCover',

  template: `
    <div class="meetup-cover" style="--bg-url: url('https://course-vue.javascript.ru/api/images/2')">
        <h1 class="meetup-cover__title">Title</h1>
    </div>`,
});
