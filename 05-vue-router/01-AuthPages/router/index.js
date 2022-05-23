import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHistory('/05-vue-router/01-AuthPages'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/PageIndex'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/PageLogin'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/PageRegister'),
    },
  ],
});
