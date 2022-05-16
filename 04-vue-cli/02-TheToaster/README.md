# TheToaster

## Компонент UiToast

Создадим для тоста отдельный компонент с параметрами `type` с типом тоста и `message` - с сообщением. Для сообщения
можно предоставить как слот, так и входной параметр. Этот компонент будет выводить один тост. В него также нужно
перенести часть стилей непосредственно тоста.

Такой компонент можно будет использовать для вывода тоста независимо от тостера.

```html
<template>
  <div class="toast" :class="markup.class">
    <ui-icon class="toast__icon" :icon="markup.icon" />
    <span>
      <slot>{{ message }}</slot>
    </span>
  </div>
</template>

<script>
  import UiIcon from './UiIcon';

  export default {
    name: 'UiToast',

    components: { UiIcon },

    props: {
      type: {
        type: String,
        default: 'success',
        validator: (value) => ['success', 'error'].includes(value),
      },

      message: {
        type: String,
      },
    },

    computed: {
      markup() {
        // Будем хранить класс и иконку для каждого типа тоста
        // Легко добавить новый тип при необходимости
        const toastTypesMarkup = {
          success: {
            class: 'toast_success',
            icon: 'check-circle',
          },

          error: {
            class: 'toast_error',
            icon: 'alert-circle',
          },
        };

        return toastTypesMarkup[this.type];
      },
    },
  };
</script>

<style scoped>
  .toast {
    display: flex;
    flex: 0 0 auto;
    flex-direction: row;
    align-items: center;
    padding: 16px;
    background: #ffffff;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    font-size: 18px;
    line-height: 28px;
    width: auto;
  }

  .toast + .toast {
    margin-top: 20px;
  }

  .toast__icon {
    margin-right: 12px;
  }

  .toast.toast_success {
    color: var(--green);
  }

  .toast.toast_error {
    color: var(--red);
  }
</style>
```

## UiToaster

Добавим ещё один глупый UI компонент - для вывода списка тостов. Фактически он содержит только стили для всего списка
тостов.

Его можно делать либо со слотом, в который пользователь компонента будет передавать `UiToast`, либо передавать массив с
данными тостов, чтобы он выводил их самостоятельно. Допустимы оба варианта, но первый проще в использовании.

```html
<template>
  <div class="toasts">
    <slot />
  </div>
</template>

<script>
  export default {
    name: 'UiToaster',
  };
</script>

<style scoped>
  .toasts {
    position: fixed;
    bottom: 8px;
    right: 8px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    white-space: pre-wrap;
    z-index: 999;
  }

  @media all and (min-width: 992px) {
    .toasts {
      bottom: 72px;
      right: 112px;
    }
  }
</style>
```

## Компонент TheToaster

Теперь можно переходить к главному компоненту - тостеру. Он будет отвечать за управление тостами, их хранение и вывод.

### Хранение тостов

Требуется добавить компоненту свойство для хранения данных о текущих выводящихся тостах. Добавим свойство `toasts` в
`data`. Это может быть массив для очереди тостов, тогда новые тосты можно добавлять в конец с `push`, а удалять из
начала с `unshift`. Либо можно использовать более подходящую структуру - множество `Set` или `Map`. Тогда можно будет
просто добавлять тост и удалять его, не трогая остальные тосты.

Каждый тост можно хранить объектом с разными данными о нём - сообщением, типом.

### Методы success, error

Осталось только реализовать методы добавления тостов. Для этого достаточно добавить новый объект с данными тоста в
массив или множество тостов и запустить таймер с `setTimeout` для удаления добавленного тоста через 5 секунд после его
добавления.

### key списка тостов

Мы пока плохо знаем, что делает `key`. Но, если вы читали Style Guide, или используете линтер (возможно, встроенные в
вашу среду разработки), то могли видеть ошибки об отсутствии `key` на элементе с директивой `v-for`.

Нет какого-либо естественного идентификатора у тоста. Можно создать случайный, счётчик, либо использовать, например,
идентификатор его таймера.

### Отчистка

Маловероятно, что такой компонент на странице будет появляться и исчезать. Но вдруг будет? Если компонент будет
уничтожен при наличии текущих тостов, то в памяти останутся висеть таймеры на их удаление, выполнение которых может
приводить к ошибкам.

Добавим хук жизненного цикла `beforeUnmount` с удалением всех таймеров.

### Решение

```html
<template>
  <ui-toaster>
    <ui-toast v-for="toast in toasts" :key="toast.id" :type="toast.type"> {{ toast.message }} </ui-toast>
  </ui-toaster>
</template>

<script>
  import UiToaster from './UiToaster';
  import UiToast from './UiToast';

  const DELAY = 5000;

  let lastToastId = 1;

  export default {
    name: 'TheToaster',

    components: { UiToaster, UiToast },

    data() {
      return {
        // Можно было бы хранить тосты в массиве, добавлять новые тосты в конец с
        // push, а удалять из начала через unshift.
        // При поддержке удаления тоста без фиксированной задержки пришлось бы
        // перебирать массив и удалять через splice. Уже не так удобно и оптимально.
        // Идеальная структура - множество Set с объектами тостов,
        // либо хэш-таблица Map тостов по ID.
        // Разница в производительности при единицах тостов - отсутствует...
        // Но почему бы не использовать наиболее подходящую структуру :)
        toasts: new Set(),
      };
    },

    // Если вдруг компонент будет уничтожен при наличии тостов, в памяти останутся висеть таймеры для их удаления.
    // Чистим перед уничтожением компонента
    beforeUnmount() {
      for (const toast of this.toasts) {
        clearTimeout(toast.timeoutId);
      }
    },

    methods: {
      success(message) {
        this.addToast('success', message);
      },

      error(message) {
        this.addToast('error', message);
      },

      // Добавим универсальный метод, который может показывать тост любого типа
      addToast(type, message, delay = DELAY) {
        // Добавим искусственный ID с авто инкрементом
        const id = lastToastId++;

        const toast = { id, type, message };

        // По таймеру удаляем тост после его добавления.
        // Сохраним id таймера для удаления при необходимости.
        toast.timeoutId = setTimeout(() => {
          this.toasts.delete(toast);
        }, delay);

        this.toasts.add(toast);
      },
    },
  };
</script>

<style></style>
```
