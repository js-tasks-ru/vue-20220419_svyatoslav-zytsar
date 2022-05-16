<template>
  <ui-toaster>
    <ui-toast v-for="toast in toasts" :key="toast.id" :type="toast.type">
      {{ toast.message }}
    </ui-toast>
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
