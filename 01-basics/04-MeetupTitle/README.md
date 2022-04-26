# MeetupTitle

В данных приложения будем хранить 2 свойства:

1. `meetupId` с текущим выбранным `id`;
2. `meetup` с данными текущего митапа.

У обоих свойств начальное значение - `null`.

Добавим метод получения с API данных митапа по ID.

Будем отслеживать через `watch` изменение `meetupId` и обновлять данные митапа, используя этот метод.

```javascript
// 📁 script.js
createApp({
  data() {
    return {
      meetupId: null,
      meetup: null,
    };
  },

  watch: {
    meetupId(newMeetupId) {
      this.meetup = null;
      this.fetchMeetup(newMeetupId);
    },
  },

  methods: {
    fetchMeetup(id) {
      fetchMeetupById(id).then((meetup) => {
        this.meetup = meetup;
      });
    },
  },
}).mount('#app');
```

В шаблоне выведем директивой `v-for` 5 радиокнопок. Каждой установим значение `value`, а значение через `v-model`
привяжем к `meetupId`.

```html
<!-- 📁 index.html -->
<div id="app">
  <div>
    <label v-for="i in 5"> <input v-model.number="meetupId" type="radio" name="meetupId" :value="i" /> {{ i }} </label>
    <hr />
    <h3 v-if="meetup">{{ meetup.title }}</h3>
  </div>
</div>
```
