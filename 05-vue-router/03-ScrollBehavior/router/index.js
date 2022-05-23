import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHistory('/05-vue-router/03-ScrollBehavior'),

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

  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('../views/PageMeetups'),
    },
    {
      path: '/meetups',
      name: 'meetups',
      redirect: { name: 'index' },
    },
    {
      path: '/meetups/:meetupId(\\d+)',
      name: 'meetup',
      meta: {
        showReturnToMeetups: true,
        saveScrollPosition: true,
      },
      props: true,
      redirect: (to) => ({ name: 'meetup.description', params: to.params }),
      component: () => import('../views/PageMeetup'),
      children: [
        {
          path: '',
          alias: 'description',
          name: 'meetup.description',
          props: true,
          component: () => import('../views/PageMeetupDescription'),
        },
        {
          path: 'agenda',
          name: 'meetup.agenda',
          props: true,
          component: () => import('../views/PageMeetupAgenda'),
        },
      ],
    },
  ],
});
