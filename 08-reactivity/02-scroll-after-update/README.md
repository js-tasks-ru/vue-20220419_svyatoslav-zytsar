# Скроллинг после обновления

Чтобы прокрутить список вниз, требуется изменить его DOM свойство `scrollTop`.

```javascript
messagesElement.scrollTop = messagesElement.scrollHeight - messagesElement.clientHeight;
```

Для прямого взаимодействия с элементом с сообщениями требуется установить на него `Template Ref`.

```html
<ul ref="messages" class="messages">
  <!--...-->
</ul>
```

Затем можно обращаться к элементу через `this.$refs`.

```javascript
const messagesElement = this.$refs['messages'];
```

Но сделать это сразу после добавления сообщения нельзя, так как реакция на обновление - асинхронная. DOM ещё не
обновился после получения новых сообщений. Требуется дожидаться с помощью `nextTick`.

```javascript
import { nextTick } from 'vue';

export default {
  // <...>

  methods: {
    async handleSendSubmit() {
      this.send();
      // Ждём реакции на обновление данных (списка сообщений) и обновления DOM после рендеринга
      await nextTick();
      // Прокручиваем список сообщений
      this.scrollMessagesToBottom();
    },

    scrollMessagesToBottom() {
      // Обращаемся через ref к DOM элементу для прокручивания
      const messagesElement = this.$refs['messages'];
      messagesElement.scrollTop = messagesElement.scrollHeight - messagesElement.clientHeight;
    },

    // <...>
  },
};
```
