# refHistory

Для реализации функции потребуется создать ref, в котором и будет храниться массив истории. Начальным значением может
быть как пустой массив, так и массив сразу с текущим значением `source`. Зависит от дальнейшей работы с отслеживанием,
например, использованием `immediate`.

```javascript
const history = ref([]);
```

Затем требуется добавить отслеживание за `source` для обновления истории. При этом отслеживание требуется синхронное
(`flush: 'sync'`). Все нижеприведённые варианты допустимы.

```javascript
// 1. Обычный watch за source с указанием flush
watch(
  source,
  () => {
    history.value.push(source.value);
  },
  {
    flush: 'sync',
  },
);

// 2. watchEffect сам поймёт, что следить надо за source
watchEffect(
  () => {
    history.value.push(source.value);
  },
  {
    flush: 'sync',
  },
);

// 3. Новый watchSyncEffect позволит сократить код и не указывать flush
watchSyncEffect(() => {
  history.value.push(source.value);
});
```

Итого получается небольшая несложная функция.

```javascript
export function refHistory(source) {
  const history = ref([]);

  watchSyncEffect(() => {
    history.value.push(source.value);
  });

  return { history };
}
```
