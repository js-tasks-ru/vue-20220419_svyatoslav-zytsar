import { createRouter, createWebHistory } from 'vue-router';

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
    {
      path: '/:unknownPath(.*)',
      component: () => import('../views/PageNotFound'),
    },
  ],
});
