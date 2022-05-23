const { shallowMount, RouterLinkStub, mount, config } = require('@vue/test-utils');
const { default: UiLink } = require(global.getSolutionPath('components/UiLink'));

config.global.stubs = { RouterLink: RouterLinkStub };
config.global.renderStubDefaultSlot = true;

describe('wrappers/UiLink', () => {
  describe('UiLink', () => {
    it('UiLink должен рендерить ссылку с tag="a"', () => {
      const wrapper = shallowMount(UiLink, { props: { tag: 'a' } });
      expect(wrapper.element.tagName).toBe('A');
    });

    it('UiLink должен рендерить RouterLink с tag="router-link"', () => {
      const wrapper = shallowMount(UiLink, {
        props: { tag: 'router-link' },
        attrs: { to: '/' },
      });
      expect(wrapper.findComponent(RouterLinkStub).exists()).toBeTruthy();
    });

    it('UiLink должен рендерить RouterLink по умолчанию', () => {
      const wrapper = shallowMount(UiLink, {
        attrs: { to: '/' },
      });
      expect(wrapper.findComponent(RouterLinkStub).exists()).toBeTruthy();
    });

    it('UiLink должен рендерить содержимое слота по умолчанию', () => {
      const SLOT_CONTENT = '<div>TestContent</div>';
      const wrapper = mount(UiLink, {
        attrs: { to: '/' },
        slots: { default: SLOT_CONTENT },
      });
      expect(wrapper.html()).toContain(SLOT_CONTENT);
    });

    it('UiLink должен получать все переданные атрибуты', () => {
      const ATTRS = {
        href: '#',
        target: '_blank',
        title: 'TestTitle',
        'data-x': 'x',
      };
      const wrapper = shallowMount(UiLink, {
        props: { tag: 'a' },
        attrs: ATTRS,
      });
      expect(wrapper.attributes()).toMatchObject(ATTRS);
    });
  });
});
