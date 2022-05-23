import { createRouter, createWebHistory } from 'vue-router';
import { h } from 'vue';

export const router = createRouter({
  history: createWebHistory('/06-wrappers/01-UiLink'),

  routes: [
    {
      path: '/',
      name: 'index',
      component: { name: 'PageIndex', render: () => h('div', 'Page Index') },
    },
    {
      path: '/page-a',
      name: 'page-a',
      component: { name: 'PageB', render: () => h('div', 'Page A') },
    },
    {
      path: '/page-b',
      name: 'page-b',
      component: { name: 'PageB', render: () => h('div', 'Page B') },
    },
  ],
});
