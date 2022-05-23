const { router } = require(global.getSolutionPath('router/index.js'));
const scrollBehavior = router.options.scrollBehavior;

/**
 * @param {object} record
 * @returns {import('vue-router').RouteLocationNormalizedLoaded}
 */
function createRouteMock(record = {}) {
  const route = {
    path: '/',
    fullPath: '/',
    query: {},
    hash: record.hash,
    name: undefined,
    params: {},
    redirectedFrom: undefined,
    meta: record.meta ?? {},
    matched: [],
  };
  route.matched.push(route);
  return route;
}

describe('vue-router/ScrollBehavior', () => {
  describe('ScrollBehavior', () => {
    it('При переходе по умолчанию положение должно быть в начале страницы', async () => {
      const to = createRouteMock();
      const from = createRouteMock();
      expect(scrollBehavior(to, from)).toMatchObject({ left: 0, top: 0 });
    });

    it('При переходе назад/вперёд с savedPosition положение на странице должно оставаться на savedPosition', async () => {
      const to = createRouteMock();
      const from = createRouteMock();
      const savedPosition = { left: 1, top: 2 };
      expect(scrollBehavior(to, from, savedPosition)).toMatchObject(savedPosition);
    });

    it('При переходе на маршрут с hash положение на странице должно определяться блоком с идентификатором hash', async () => {
      const hash = 'some-test-hash';
      const to = createRouteMock({ hash });
      const from = createRouteMock();
      expect(scrollBehavior(to, from)).toMatchObject({ el: hash });
    });

    it('При переходе между маршрутами c истинными meta свойствами saveScrollPosition у обоих маршрутов положение на странице не должно изменяться', async () => {
      const to = createRouteMock({ meta: { saveScrollPosition: true } });
      const from = createRouteMock({ meta: { saveScrollPosition: true } });
      expect(scrollBehavior(to, from)).toBe(false);
    });

    it('При переходе между маршрутами c истинным meta свойством saveScrollPosition только у одного маршрута положение на странице должно оставаться поведение по умолчанию', async () => {
      const to = createRouteMock({ meta: { saveScrollPosition: true } });
      const from = createRouteMock();
      expect(scrollBehavior(to, from)).toMatchObject({ left: 0, top: 0 });
    });
  });
});
