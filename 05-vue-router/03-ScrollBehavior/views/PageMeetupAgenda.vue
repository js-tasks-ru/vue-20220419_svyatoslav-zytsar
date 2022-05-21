<template>
  <ul>
    <li v-for="agendaItem in meetup.agenda" :key="agendaItem.key">
      <p>{{ agendaItem.startsAt }} - {{ agendaItem.endsAt }}</p>
      <p>{{ agendaItem.title }}</p>
      <p>{{ agendaItem.description }}</p>
      <hr />
    </li>
  </ul>
</template>

<script>
export default {
  name: 'PageMeetupAgenda',

  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style></style>
