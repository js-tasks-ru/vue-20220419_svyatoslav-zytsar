import { computed, unref } from 'vue';

/**
 * @template T
 * @param {function(...[*]): T} func - Исходная функция вычисления
 * @returns {function(...[*]): ComputedRef<T>} - Функция вычисления от ref-ов, возвращающая вычисляемое значение computed
 */
export function reactify(func) {
  // Вспомогательная функция, которая из массива возможно ref-ов получает массив их значений
  const unrefArray = (items) => items.map((item) => unref(item));
  // Возвращаем функцию для генерации вычисляемого свойства
  return (...args) => computed(() => func(...unrefArray(args)));
}
