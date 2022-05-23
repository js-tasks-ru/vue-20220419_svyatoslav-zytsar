/**
 * Загружает файл (mock)
 * @param {File} file - файл, который требуется загрузить
 * @return {Promise<Object>} - объект с ID и ссылкой на изображение
 */
export function uploadImage(file) {
  if (!(file instanceof File)) {
    throw new TypeError(`file should be instance of File`);
  }
  return new Promise((resolve) => {
    setTimeout(resolve, 500, {
      id: 42,
      image: URL.createObjectURL(file),
    });
  });
}
