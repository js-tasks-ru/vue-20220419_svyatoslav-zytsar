<template>
  <div class="wrapper bg-grey page">
    <div class="container">
      <p>
        <button @click="fill">Показать заполненную</button>
      </p>
      <meetup-form
        :key="meetup.id"
        :meetup="meetup"
        submit-text="Сохранить"
        @submit="handleSubmit"
        @cancel="handleCancel"
      />
    </div>
  </div>
</template>

<script>
import MeetupForm from './components/MeetupForm';
import { createAgendaItem, createMeetup } from './meetupService';

export default {
  name: 'App',

  components: { MeetupForm },

  data() {
    return {
      meetup: createMeetup(),
      filled: false,
    };
  },

  methods: {
    handleSubmit(meetup) {
      this.meetup = meetup;
      alert(JSON.stringify(this.meetup, null, 2));
    },

    handleCancel() {
      this.meetup = createMeetup();
      alert('Cancel');
    },

    fill() {
      this.filled = true;
      this.meetup = {
        id: 42,
        title: 'Demo Title',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusamus, beatae corporis dignissimos esse, facere, fugiat laudantium maxime minus nam natus odit optio perferendis quae quisquam quos soluta veritatis voluptate?',
        image: 'https://course-vue.javascript.ru/api/images/2',
        date: Date.UTC(2022, 4 - 1, 4),
        place: 'Meetup Place',
        agenda: [createAgendaItem(), createAgendaItem()],
      };
    },
  },
};
</script>

<style>
@import '@/assets/styles/_container.css';
</style>
