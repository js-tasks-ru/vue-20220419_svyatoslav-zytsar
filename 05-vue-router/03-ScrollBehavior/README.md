# ScrollBehavior

Для решения задачи требуется разобрать каждый случай.

```javascript
// 📁 router/index.js

export const router = createRouter({
  //...

  scrollBehavior(to, from, savedPosition) {
    // Если есть hash, прокручиваем к элементу по нему
    if (to.hash) {
      return { el: to.hash };
    }

    // Если есть savedPosition, возвращаем его же (переход назад/вперёд)
    if (savedPosition) {
      return savedPosition;
    }

    // Если оба маршрута в мета свойствах имеют saveScrollPosition - не меняем положение
    if (to.meta.saveScrollPosition && from.meta.saveScrollPosition) {
      return false;
    }

    // По умолчанию возвращаемся в начало
    return { left: 0, top: 0 };
  },

  //...
});
```
