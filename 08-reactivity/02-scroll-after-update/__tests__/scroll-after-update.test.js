const path = require('path');
const fs = require('fs/promises');
const { default: MiniMessenger } = require(global.getSolutionPath('components/MiniMessenger'));

describe('reactivity/scroll-after-update', () => {
  describe('MiniMessenger', () => {
    it('MiniMessenger определён, но требует ручной проверки', () => {
      expect(MiniMessenger).toBeDefined();
    });

    it('Исходный код components/MiniMessenger.vue должен включать подстроку "scroll"', async () => {
      const solutionText = await fs.readFile(
        path.join(__dirname, global.getSolutionPath('components/MiniMessenger.vue')),
        'utf8',
      );
      // Решение так или иначе будет включать в себя что-то с названием scroll, например: scrollHeight или новые функции
      expect(solutionText).toMatch(/scroll/i);
    });
  });
});
