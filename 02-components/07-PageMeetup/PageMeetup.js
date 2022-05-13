import { defineComponent } from './vendor/vue.esm-browser.js';
import MeetupView from './MeetupView.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import { fetchMeetupById } from './meetupService.js';

const States = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};

export default defineComponent({
  name: 'PageMeetup',

  States,

  components: {
    MeetupView,
    UiAlert,
    UiContainer,
  },

  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      state: States.IDLE,
      meetup: null,
      error: null,
    };
  },

  watch: {
    meetupId() {
      this.fetch();
    },
  },

  mounted() {
    this.fetch();
  },

  methods: {
    fetch() {
      // Переходим в состояние загрузки. Чистим данные и ошибку
      this.state = States.LOADING;
      this.meetup = null;
      this.error = null;

      fetchMeetupById(this.meetupId)
        .then((meetup) => {
          // Данные успешно получены
          this.state = States.SUCCESS;
          this.meetup = meetup;
        })
        .catch((error) => {
          // Произошла ошибка при получении данных
          this.state = States.ERROR;
          this.error = error.message;
        });
    },
  },

  template: `
    <div class="page-meetup">
      <meetup-view v-if="state === $options.States.SUCCESS" :meetup="meetup" />

      <ui-container v-if="state === $options.States.LOADING">
        <ui-alert >Загрузка...</ui-alert>
      </ui-container>

      <ui-container v-if="state === $options.States.ERROR">
        <ui-alert>{{ error }}</ui-alert>
      </ui-container>
    </div>`,
});
