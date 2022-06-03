import { ref, watchSyncEffect } from 'vue';

/**
 * @template T
 * @param {Ref<T>} source - Отслеживаемый ref
 * @returns {Object<{ history: Ref<T[]> }>} - История изменения source
 */
export function refHistory(source) {
  const history = ref([]);

  watchSyncEffect(() => {
    history.value.push(source.value);
  });

  return { history };
}
