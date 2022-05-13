import { defineComponent } from './vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import MeetupView from './MeetupView.js';
import { fetchMeetupById } from './meetupService.js';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  props: {
    meetupId: Number,
  },

  data() {
    return {
      isLoading: false,
      meetup: null,
      errMsg: '',
    };
  },

  watch: {
    meetupId: {
      immediate: true,
      handler() {
        this.fetchData();
      },
    },
  },

  methods: {
    async fetchData() {
      try {
        this.isLoading = true;
        this.errMsg = '';

        this.meetup = await fetchMeetupById(this.meetupId);
      } catch ({ message }) {
        this.errMsg = message;
      } finally {
        this.isLoading = false;
      }
    },
  },

  template: `
    <div class="page-meetup">
      <meetup-view
        v-if="!isLoading && !errMsg"
        :meetup="meetup"
      />

      <ui-container v-else-if="isLoading">
        <ui-alert>Загрузка...</ui-alert>
      </ui-container>

      <ui-container v-else>
        <ui-alert>{{ errMsg }}</ui-alert>
      </ui-container>
    </div>`,
});
