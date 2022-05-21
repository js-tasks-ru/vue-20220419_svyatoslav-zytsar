import '@/assets/styles/taskbook.css';
import '@/assets/styles/app.css';

import { createApp } from 'vue';
import App from './App';
import { router } from './router';

createApp(App).use(router).mount('#app');
