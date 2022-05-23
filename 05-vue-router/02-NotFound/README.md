# 404 - NotFound

Требуется описать маршрут в соответствии с разделом документации из условия:

```javascript
export const router = createRouter({
  history: createWebHistory('/05-vue-router/02-NotFound'),
  routes: [
    {
      path: '/page-a',
      alias: '/',
      component: () => import('../views/PageA'),
    },
    {
      path: '/page-b',
      component: () => import('../views/PageB'),
    },
    // Новый маршрут совпадает с любым путём
    // Важно описано новый маршрут в конце списка
    {
      path: '/:unknownPath(.*)',
      component: () => import('../views/PageNotFound'),
    },
  ],
});
```
