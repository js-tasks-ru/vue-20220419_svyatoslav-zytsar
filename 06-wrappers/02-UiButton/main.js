import '@/assets/styles/app.css';
import '@/assets/styles/taskbook.css';

import { createApp, defineComponent, h } from 'vue';
import App from './App';

// Заглушка для router-link
const RouterLink = defineComponent({
  name: 'RouterLink',
  props: ['to'],
  render() {
    return h('a', { href: this.to }, this.$slots.default());
  },
});

createApp(App).component('RouterLink', RouterLink).mount('#app');
