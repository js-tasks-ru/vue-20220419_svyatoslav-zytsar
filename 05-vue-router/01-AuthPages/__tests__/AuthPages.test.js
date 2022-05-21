import { flushPromises, mount } from '@vue/test-utils';
import { createMemoryHistory, createRouter } from 'vue-router';
const { router } = require(global.getSolutionPath('router/index.js'));
const App = require(global.getSolutionPath('App')).default;
const MeetupsLogo = require(global.getSolutionPath('components/MeetupsLogo')).default;
const MeetupsNav = require(global.getSolutionPath('components/MeetupsNav')).default;
const PageIndex = require(global.getSolutionPath('views/PageIndex')).default;
const PageLogin = require(global.getSolutionPath('views/PageLogin')).default;
const PageRegister = require(global.getSolutionPath('views/PageRegister')).default;

const filterWrappersByNodeText = (wrappers, text) =>
  wrappers.find((wrapper) => wrapper.element.textContent.includes(text));

describe('vue-router/AuthPages', () => {
  let appRouter;
  let appWrapper;

  beforeEach(() => {
    appRouter = createRouter({
      history: createMemoryHistory(),
      routes: router.options.routes,
    });
    appWrapper = mount(App, {
      global: {
        plugins: [appRouter],
      },
    });
  });

  describe('Router', () => {
    it('PageIndex должен рендериться на странице /', async () => {
      await appRouter.replace('/').catch(() => {});
      expect(appWrapper.findComponent(PageIndex).exists()).toBeTruthy();
    });

    it('PageLogin должен рендериться на странице /login', async () => {
      await appRouter.replace('/login');
      expect(appWrapper.findComponent(PageLogin).exists()).toBeTruthy();
    });

    it('PageRegister должен рендериться на странице /register', async () => {
      await appRouter.replace('/register');
      expect(appWrapper.findComponent(PageRegister).exists()).toBeTruthy();
    });
  });

  describe('Navigation', () => {
    it('MeetupsLogo должен содержать ссылку на главную страницу', async () => {
      await appRouter.replace('/login');
      await appWrapper.getComponent(MeetupsLogo).get('a').trigger('click');
      await flushPromises();
      expect(appRouter.currentRoute.value.path).toBe('/');
    });

    it('MeetupsNav должен содержать ссылку Вход на страницу авторизации', async () => {
      await appRouter.replace('/');
      await filterWrappersByNodeText(appWrapper.getComponent(MeetupsNav).findAll('a'), 'Вход').trigger('click');
      await flushPromises();
      expect(appRouter.currentRoute.value.path).toBe('/login');
    });

    it('MeetupsNav должен содержать ссылку Регистрация на страницу регистрации', async () => {
      await appRouter.replace('/');
      await filterWrappersByNodeText(appWrapper.getComponent(MeetupsNav).findAll('a'), 'Регистрация').trigger('click');
      await flushPromises();
      expect(appRouter.currentRoute.value.path).toBe('/register');
    });
  });

  describe('PageRegister', () => {
    it('PageRegister должен содержать SPA ссылку на страницу авторизации', async () => {
      await appRouter.replace({ path: '/register' });
      const link = filterWrappersByNodeText(appWrapper.getComponent(PageRegister).findAll('a'), 'Войдите');
      await link.trigger('click');
      await flushPromises();
      expect(appRouter.currentRoute.value.path).toBe('/login');
    });

    it('PageRegister должен перенаправлять на страницу авторизации при сабмите формы', async () => {
      await appRouter.replace({ path: '/register' });
      await appWrapper.getComponent(PageRegister).get('form').trigger('submit');
      await flushPromises();
      expect(appRouter.currentRoute.value.path).toBe('/login');
    });
  });

  describe('PageLogin', () => {
    it('PageLogin должен содержать SPA ссылку на страницу регистрации', async () => {
      await appRouter.replace({ path: '/login' });
      const link = filterWrappersByNodeText(
        await appWrapper.getComponent(PageLogin).get('form').findAll('a'),
        'Зарегистрируйтесь',
      );
      await link.trigger('click');
      await flushPromises();
      expect(appRouter.currentRoute.value.path).toBe('/register');
    });

    it('PageLogin должен перенаправлять на главную страницу при сабмите формы, если отсутствует query параметр from', async () => {
      await appRouter.replace({ path: '/login' });
      await appWrapper.getComponent(PageLogin).get('form').trigger('submit');
      await flushPromises();
      expect(appRouter.currentRoute.value.path).toBe('/');
    });

    it('PageLogin должен перенаправлять на маршрут из query параметра from при сабмите формы', async () => {
      await appRouter.replace({ path: '/login', query: { from: '/register' } });
      await appWrapper.getComponent(PageLogin).get('form').trigger('submit');
      await flushPromises();
      expect(appRouter.currentRoute.value.path).toBe('/register');
    });
  });
});
