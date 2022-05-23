import { mount } from '@vue/test-utils';
import { createMemoryHistory, createRouter } from 'vue-router';
import PageA from '../views/PageA';
import PageB from '../views/PageB';
import PageNotFound from '../views/PageNotFound';
const { router } = require(global.getSolutionPath('router/index.js'));

describe('vue-router/NotFound', () => {
  describe('404 - NotFound', () => {
    let appRouter;
    let appWrapper;

    beforeEach(() => {
      appRouter = createRouter({
        history: createMemoryHistory(),
        routes: router.options.routes,
      });
      appWrapper = mount(
        { template: '<router-view />' },
        {
          global: {
            plugins: [appRouter],
          },
        },
      );
    });

    it('PageNotFound не должен отображаться на известном маршруте page-a', async () => {
      await appRouter.replace('/page-a');
      expect(appWrapper.findComponent(PageA).exists()).toBeTruthy();
      expect(appWrapper.findComponent(PageB).exists()).toBeFalsy();
      expect(appWrapper.findComponent(PageNotFound).exists()).toBeFalsy();
    });

    it('PageNotFound не должен отображаться на известном маршруте page-b', async () => {
      await appRouter.replace('/page-b');
      await appRouter.isReady();
      expect(appWrapper.findComponent(PageA).exists()).toBeFalsy();
      expect(appWrapper.findComponent(PageB).exists()).toBeTruthy();
      expect(appWrapper.findComponent(PageNotFound).exists()).toBeFalsy();
    });

    it('PageNotFound должен отображаться для неизвестного маршрута', async () => {
      await appRouter.replace('/some-page-that-does-not-exist');
      expect(appWrapper.findComponent(PageA).exists()).toBeFalsy();
      expect(appWrapper.findComponent(PageB).exists()).toBeFalsy();
      expect(appWrapper.findComponent(PageNotFound).exists()).toBeTruthy();
    });
  });
});
