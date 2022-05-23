const UiImageUploader = require(global.getSolutionPath('components/UiImageUploader.vue')).default;
import { shallowMount, flushPromises } from '@vue/test-utils';
import { nextTick } from 'vue';

if (typeof window.URL.createObjectURL === 'undefined') {
  Object.defineProperty(window.URL, 'createObjectURL', { value: () => 'blob' });
}

function createInputFileMock(input) {
  let FileBrowseMock;
  let fileValue = '';

  Object.defineProperty(input.element, 'files', {
    get: (FileBrowseMock = jest.fn()),
    set: () => {},
  });

  Object.defineProperty(input.element, 'value', {
    get: () => fileValue,
    set: (newValue) => {
      fileValue = newValue;
    },
  });

  return async () => {
    fileValue = '/fake_path/image.png';
    const file = new File([], 'image.png');
    FileBrowseMock.mockReturnValue([file]);
    await input.trigger('change');
    return { file };
  };
}

describe('wrappers/UiImageUploader', () => {
  describe('UiImageUploader', () => {
    const LOADING_TEXT = 'Загрузка...';
    const EMPTY_TEXT = 'Загрузить изображение';
    const DELETE_TEXT = 'Удалить изображение';

    const IMAGE_ID = 42;

    let mockUploaderResponse;
    let mockUploader;

    beforeEach(() => {
      mockUploaderResponse = { id: IMAGE_ID, image: 'link.jpeg' };
      mockUploader = jest.fn().mockResolvedValue(mockUploaderResponse);
    });

    it(`UiImageUploader должен иметь текст "${EMPTY_TEXT}", когда изображение не выбрано и preview не задан`, async () => {
      const wrapper = shallowMount(UiImageUploader, { props: { preview: undefined } });
      expect(wrapper.text()).toContain(EMPTY_TEXT);
    });

    it(`UiImageUploader должен иметь текст "${DELETE_TEXT}", когда изображение не выбрано, но preview задан`, async () => {
      const wrapper = shallowMount(UiImageUploader, { props: { preview: 'preview.jpeg' } });
      expect(wrapper.text()).toContain(DELETE_TEXT);
    });

    it(`UiImageUploader не должен иметь класс image-uploader__preview-loading изначально`, async () => {
      const wrapper = shallowMount(UiImageUploader, { props: { preview: undefined } });
      expect(wrapper.find('label').classes('image-uploader__preview-loading')).toBeFalsy();
    });

    it('UiImageUploader должен порождать событие select с выбранным файлом после выбора', async () => {
      const wrapper = shallowMount(UiImageUploader);
      const mockFile = createInputFileMock(wrapper.get('input'));
      const { file } = await mockFile();
      await flushPromises();
      expect(wrapper.emitted('select')).toBeDefined();
      expect(wrapper.emitted('select')).toHaveLength(1);
      expect(wrapper.emitted('select')[0][0]).toBe(file);
    });

    it('UiImageUploader должен загружать выбранный файл через uploader', async () => {
      const wrapper = shallowMount(UiImageUploader, { props: { preview: undefined, uploader: mockUploader } });
      const mockFile = createInputFileMock(wrapper.get('input'));
      const { file } = await mockFile();
      await flushPromises();
      await nextTick();
      expect(mockUploader).toHaveBeenLastCalledWith(file);
    });

    it(`UiImageUploader должен выводить "${LOADING_TEXT}" и иметь .image-uploader__preview-loading после выбора изображения на время загрузки через uploader`, async () => {
      let finishUploading;
      mockUploader.mockResolvedValueOnce(new Promise((resolve) => (finishUploading = resolve)));
      const wrapper = shallowMount(UiImageUploader, { props: { uploader: mockUploader } });
      const mockFile = createInputFileMock(wrapper.get('input'));
      await mockFile();
      expect(wrapper.text()).toContain(LOADING_TEXT);
      expect(wrapper.find('label').classes('image-uploader__preview-loading')).toBe(true);
      finishUploading(mockUploaderResponse);
    });

    it(`UiImageUploader не должен реагировать на клик во время загрузки через uploader`, async () => {
      let finishUploading;
      mockUploader.mockResolvedValueOnce(new Promise((resolve) => (finishUploading = resolve)));
      const wrapper = shallowMount(UiImageUploader, { props: { uploader: mockUploader } });
      const mockFile = createInputFileMock(wrapper.get('input'));
      const { file } = await mockFile();
      await wrapper.find('label').trigger('click');
      expect(wrapper.text()).toContain(LOADING_TEXT);
      expect(wrapper.find('label').classes('image-uploader__preview-loading')).toBe(true);
      expect(wrapper.get('input').element.files[0]).toBe(file);
      expect(wrapper.emitted('remove')).not.toBeDefined();
      finishUploading(mockUploaderResponse);
    });

    it('UiImageUploader должен порождать событие error с ошибкой uploader-а после не успешного окончания загрузки', async () => {
      const mockError = new Error();
      mockUploader.mockRejectedValueOnce(mockError);
      const wrapper = shallowMount(UiImageUploader, { props: { uploader: mockUploader } });
      const mockFile = createInputFileMock(wrapper.get('input'));
      await mockFile();
      await flushPromises();
      await nextTick();
      expect(wrapper.emitted('error')).toBeDefined();
      expect(wrapper.emitted('error')).toHaveLength(1);
      expect(wrapper.emitted('error')[0][0]).toBe(mockError);
    });

    it(`UiImageUploader должен вновь иметь текст "${EMPTY_TEXT}", когда изображение не удалось загрузить через uploader и preview не задан`, async () => {
      const mockError = new Error();
      mockUploader.mockRejectedValueOnce(mockError);
      const wrapper = shallowMount(UiImageUploader, { props: { uploader: mockUploader } });
      const mockFile = createInputFileMock(wrapper.get('input'));
      await mockFile();
      await flushPromises();
      await nextTick();
      expect(wrapper.text()).toContain(EMPTY_TEXT);
    });

    it(`UiImageUploader должен сбрасывать value у input когда изображение не удалось загрузить через uploader`, async () => {
      mockUploader.mockRejectedValueOnce(new Error());
      const wrapper = shallowMount(UiImageUploader, { props: { uploader: mockUploader } });
      const mockFile = createInputFileMock(wrapper.get('input'));
      await mockFile();
      await flushPromises();
      await nextTick();
      expect(wrapper.find('input').element.value).toBeFalsy();
    });

    it('UiImageUploader должен порождать событие upload с результатом uploader-а после успешного окончания загрузки', async () => {
      const wrapper = shallowMount(UiImageUploader, { props: { uploader: mockUploader } });
      const mockFile = createInputFileMock(wrapper.get('input'));
      await mockFile();
      await flushPromises();
      await nextTick();
      expect(wrapper.emitted('upload')).toBeDefined();
      expect(wrapper.emitted('upload')).toHaveLength(1);
      expect(wrapper.emitted('upload')[0][0]).toBe(mockUploaderResponse);
    });

    it(`UiImageUploader должен иметь текст "${DELETE_TEXT}" после выбора изображения без uploader`, async () => {
      const wrapper = shallowMount(UiImageUploader, { props: { uploader: undefined } });
      const mockFile = createInputFileMock(wrapper.get('input'));
      await mockFile();
      expect(wrapper.text()).toContain(DELETE_TEXT);
    });

    it(`UiImageUploader должен порождать событие remove при удалении выбранного изображения кликом по input`, async () => {
      const wrapper = shallowMount(UiImageUploader, { props: { uploader: undefined } });
      const mockFile = createInputFileMock(wrapper.get('input'));
      await mockFile();
      await wrapper.find('label').trigger('click');
      expect(wrapper.emitted('remove')).toBeDefined();
      expect(wrapper.emitted('remove')).toHaveLength(1);
    });

    it(`UiImageUploader должен иметь текст на ${EMPTY_TEXT} после удаления выбранного изображения`, async () => {
      const wrapper = shallowMount(UiImageUploader);
      const mockFile = createInputFileMock(wrapper.get('input'));
      await mockFile();
      await wrapper.find('label').trigger('click');
      expect(wrapper.text()).toContain(EMPTY_TEXT);
    });

    it(`UiImageUploader должен иметь текст на ${EMPTY_TEXT} после удаления изображения из preview`, async () => {
      const wrapper = shallowMount(UiImageUploader, { props: { preview: 'preview.jpeg' } });
      await wrapper.find('label').trigger('click');
      expect(wrapper.text()).toContain(EMPTY_TEXT);
    });

    it(`UiImageUploader должен сбрасывать value у input при удалении выбранного изображения`, async () => {
      const wrapper = shallowMount(UiImageUploader);
      const mockFile = createInputFileMock(wrapper.get('input'));
      await mockFile();
      await wrapper.find('label').trigger('click');
      expect(wrapper.find('input').element.value).toBeFalsy();
    });

    it(`UiImageUploader должен передавать атрибуты на input`, async () => {
      const attrs = { name: 'image-file', 'data-test': 'input' };
      const wrapper = shallowMount(UiImageUploader, { attrs });
      expect(wrapper.get('input').attributes()).toMatchObject(attrs);
    });
  });
});
