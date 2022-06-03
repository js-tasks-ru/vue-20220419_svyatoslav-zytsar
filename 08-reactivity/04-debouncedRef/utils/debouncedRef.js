import { ref, watch } from 'vue';
import debounce from 'lodash/debounce';

/**
 * @template T
 * @param {Ref<T>} source - Исходный ref
 * @param {number} wait - Ожидание в миллисекундах для debounce
 * @returns {Ref<T>} - Новый ref, обновляющийся с debounce при обновлении исходного ref-а
 */
export function debouncedRef(source, wait) {
  // Создаём новый ref с начальным значением
  const debounced = ref(source.value);
  // Создаём с помощью lodash.debounce функцию обновления значения с заданной задержкой
  const debouncedWatchHandler = debounce((newValue) => {
    debounced.value = newValue;
  }, wait);
  // Отслеживаем исходное значение и используем deounced функцию для обновления значения
  watch(source, debouncedWatchHandler);
  // Возвращаем ref, обновляемый с задержкой
  return debounced;
}
