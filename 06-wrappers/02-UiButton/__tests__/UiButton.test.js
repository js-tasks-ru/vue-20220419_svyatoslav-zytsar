const { shallowMount, config } = require('@vue/test-utils');
const UiButton = require(global.getSolutionPath('components/UiButton.vue')).default;

config.renderStubDefaultSlot = true;

describe('wrappers/UiButton', () => {
  const slots = { default: '<div>Test Slot Content</div>' };
  const TestComponent = { name: 'TestComponent', template: '<div><slot /></div>' };

  describe('UiButton', () => {
    it('UiButton должен рендерить кнопку c tag="button"', () => {
      const wrapper = shallowMount(UiButton, { props: { tag: 'button' } });
      expect(wrapper.element.tagName).toBe('BUTTON');
    });

    it('UiButton должен рендерить ссылку c tag="a"', () => {
      const wrapper = shallowMount(UiButton, { props: { tag: 'a' } });
      expect(wrapper.element.tagName).toBe('A');
    });

    it('UiButton должен рендерить div c tag="div"', () => {
      const wrapper = shallowMount(UiButton, { props: { tag: 'div' } });
      expect(wrapper.element.tagName).toBe('DIV');
    });

    it('UiButton должен рендерить переданный в tag компонент', () => {
      const wrapper = shallowMount(UiButton, {
        props: { tag: TestComponent },
        globals: {
          stubs: { TestComponent },
        },
      });
      expect(wrapper.findComponent(TestComponent).exists()).toBeTruthy();
    });
    it('UiButton должен рендерить кнопку button по умолчанию', () => {
      const wrapper = shallowMount(UiButton);
      expect(wrapper.element.tagName).toBe('BUTTON');
    });

    it('UiButton должен рендерить своё содержимое', () => {
      const wrapper = shallowMount(UiButton, { slots });
      expect(wrapper.html()).toContain(slots.default);
    });

    it('UiButton не должен иметь класс button_block по умолчанию', async () => {
      const wrapper = shallowMount(UiButton);
      expect(wrapper.classes('button_block')).toBeFalsy();
    });

    it('UiButton не должен иметь класс button_block с block="false"', async () => {
      const wrapper = shallowMount(UiButton, { props: { block: false } });
      expect(wrapper.classes('button_block')).toBeFalsy();
    });

    it('UiButton должен иметь класс button_block с block="true"', async () => {
      const wrapper = shallowMount(UiButton, { props: { block: true } });
      expect(wrapper.classes('button_block')).toBe(true);
    });

    it('UiButton должен рендерить ссылку с tag="a" c переданными href и target', () => {
      const attrs = {
        href: 'https://learn.javascript.ru',
        target: '_blank',
      };
      const wrapper = shallowMount(UiButton, {
        props: { tag: 'a' },
        attrs,
        slots,
      });
      expect(wrapper.attributes('href')).toBe(attrs.href);
      expect(wrapper.attributes('target')).toBe(attrs.target);
    });

    it('UiButton должен рендерить переданный в tag компонент и передавать на него параметры', () => {
      const attrs = {
        text: 'TEXT',
        rounded: true,
      };
      const ComponentButton = {
        name: 'ComponentButton',
        props: ['text', 'rounded'],
        template: `<button>{{ text }}</button>`,
      };
      const wrapper = shallowMount(UiButton, {
        props: { tag: ComponentButton },
        attrs,
        slots,
        globals: {
          stubs: { ComponentButton },
        },
      });
      const button = wrapper.findComponent(ComponentButton);
      expect(button.exists()).toBeTruthy();
      expect(button.props()).toMatchObject(attrs);
    });

    it.each`
      variant        | buttonClass
      ${'primary'}   | ${'button_primary'}
      ${'secondary'} | ${'button_secondary'}
      ${'danger'}    | ${'button_danger'}
    `(
      `UiButton c variant=$variant" должен рендерить кнопку с классом $buttonClass`,
      async ({ variant, buttonClass }) => {
        const wrapper = shallowMount(UiButton, {
          props: { variant },
        });
        expect(wrapper.classes(buttonClass)).toBeTruthy();
      },
    );

    it(`UiButton должен рендерить кнопку с классом button_secondary по умолчанию`, async () => {
      const wrapper = shallowMount(UiButton);
      expect(wrapper.classes('button_secondary')).toBeTruthy();
    });

    it('UiButton должен устанавливать type="button" на HTML button, если он не определён явно', async () => {
      const wrapper = shallowMount(UiButton, { props: { tag: 'button' } });
      expect(wrapper.attributes('type')).toBe('button');
    });

    it('UiButton должен устанавливать переданный type="submit" на HTML button, если он определён явно', async () => {
      const wrapper = shallowMount(UiButton, { props: { tag: 'button' }, attrs: { type: 'submit' } });
      expect(wrapper.attributes('type')).toBe('submit');
    });

    it('UiButton должен устанавливать переданный type="button" на HTML button, если он определён явно', async () => {
      const wrapper = shallowMount(UiButton, { props: { tag: 'button' }, attrs: { type: 'button' } });
      expect(wrapper.attributes('type')).toBe('button');
    });

    it('UiButton не должен устанавливать type="button" на не HTML button', async () => {
      const wrapper = shallowMount(UiButton, { props: { tag: 'div' } });
      expect(wrapper.attributes('type')).not.toBeDefined();
    });
  });
});
