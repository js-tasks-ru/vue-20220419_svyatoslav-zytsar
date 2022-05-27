<template>
  <div class="sample wrapper bg-grey page">
    <div class="container">
      <pre><code>{{ agendaItem }}</code></pre>
      <meetup-agenda-item-form v-model:agenda-item="agendaItem" @remove="handleRemove" />
    </div>
  </div>
</template>

<script>
import MeetupAgendaItemForm from './components/MeetupAgendaItemForm';

export default {
  name: 'App',

  components: { MeetupAgendaItemForm },

  data() {
    return {
      agendaItem: {
        id: 0,
        startsAt: '00:00',
        endsAt: '00:00',
        type: 'other',
        title: null,
        description: null,
        speaker: null,
        language: null,
      },
    };
  },

  methods: {
    handleRemove() {
      alert('removed');
    },
  },
};
</script>

<style>
@import '@/assets/styles/_layout.css';
@import '@/assets/styles/_container.css';
</style>
