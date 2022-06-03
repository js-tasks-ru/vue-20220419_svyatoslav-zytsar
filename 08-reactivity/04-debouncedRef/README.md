# debouncedRef

Для решения задачи требуется создать новый `ref` и обновлять его при обновлении исходного. Для отслеживания подойдёт
обычный `watch`, но функция `handler` отслеживания должна срабатывать не сразу, а в соответствии с `debounce`. Для этого
обработчик отслеживания требуется создать, используя `debounce`.

```javascript
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
```
